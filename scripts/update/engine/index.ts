/**
 * @name 模板解析引擎
 * @author ren-wei
 * @description 所有源码依次调用`parseSource`方法，然后调用`render`方法获取渲染结果，它的参数从`targets`属性获取
 * @extends 'implements'抽象类'Command'以扩展功能
 */

import * as os from 'os';
import { BlockCommand, Command, ElifCommand, ElseCommand, ForCommand, IfCommand, ImportCommand, TargetCommand, TextNode, UseCommand } from './command';
import { expression } from './exp';
import { Stack } from './stack';
import { AnalysesContext, EngineOptions } from './type';

export default class Engine {
    public targets: Targets = {};
    public commandTypes: CommandTypes;
    public options: EngineOptions;
    public deps: string[] = []; // 需要导入的目标，长度为0时才能 render
    private analysesContext: AnalysesContext; // 语法分析环境对象

    /**
     * 实例化模板引擎
     * @param options 模板引擎选项
     * @param commandExtends 扩展模板引擎命令
     */
    constructor(options: EngineOptions | {} = {}, commandExtends: CommandTypes = {}) {
        this.options = (Object.assign({
            commandOpen: '{{',
            commandClose: '}}',
            commandSyntax: /^\s*(\/)?([a-z]*)\s*(?::([\s\S]*))?$/,
            variableOpen: '\\$\\{',
            variableClose: '\\}',
            namingConflict: 'error',
            missTarget: 'error',
        }, options) as EngineOptions);
        this.commandTypes = {
            'target': TargetCommand,
            'use': UseCommand,
            'import': ImportCommand,
            'block': BlockCommand,
            'if': IfCommand,
            'elif': ElifCommand,
            'else': ElseCommand,
            'for': ForCommand,
            ...commandExtends,
        };
        this.analysesContext = {
            stack: new Stack<Command>(),
            deps: {},
            target: null,
            textBuf: [],
            current: null,
        };
    }

    /**
     * 解析模板。如果模板源代码分布在不同文件中时，需要多次调用
     * @param source 模板源代码
     */
    public parseSource(source: string) {
        let NodeType: CommandType;

        this.parseTextBlock(source, this.options.commandOpen, this.options.commandClose, false,
            (text) => {
                const match = this.options.commandSyntax.exec(text); // [0: '匹配的文本', 1: undefined | '/', 2: '命令类型' | undefined, 3: '参数']
                let nodeName: string;

                // 符合 command 语法规则，并且存在对应的 Command 类，则是合法的模板命令
                // 否则，是视为普通文本
                if (
                    match
                    && (nodeName = match[2])
                    && (NodeType = this.commandTypes[nodeName])
                    && typeof NodeType === 'function'
                ) {
                    // 将保存在缓冲区的文本写入文本节点
                    this.flushTextBuf();

                    let currentNode;
                    // match[1] 存在则是 close 命令，不存在则是 open 命令
                    if (match[1]) {
                        currentNode = this.autoCloseCommand(this.analysesContext, NodeType);
                    } else {
                        // @ts-ignore
                        currentNode = new NodeType(match[3], this);
                        (currentNode as Command).open(this.analysesContext);
                    }
                    this.analysesContext.current = currentNode;
                } else if (!/^\s*\/\//.test(text)) {
                    // 不是模板注释，作为普通文本写入缓冲区
                    this.analysesContext.textBuf.push(this.options.commandOpen, text, this.options.commandClose);
                }
            },
            (text) => {
                // 普通文本直接写入缓冲区
                this.analysesContext.textBuf.push(text);
            }
        );

        this.flushTextBuf(); // 解析完成之后，刷新缓冲区
        this.autoCloseCommand(this.analysesContext);
    }

    /**
     * 执行模板渲染，返回渲染后的字符串。
     * @param name target名称
     * @param vars 变量默认值
     * @returns 渲染结果
     */
    public render(name: string, vars: Record<string, string> = {}): string {
        return this.targets[name].children.map(child => child.getRendererBody(vars)).join('').trim() + os.EOL;
    }

    /**
     * `command use` 编译变量
     * @param source 源代码
     * @param vars 变量的值
     * @return 编译后的结果
     */
    public compileVariable(source: string, vars: Record<string, string> = {}): string {
        const reg = new RegExp(
            this.options.variableOpen
            + '(\\w+)'
            + '(?:\\|default\\('
            + '(' // 匹配括号内的默认值
            + expression
            + ')'
            + '\\)'
            + ')?'
            + this.options.variableClose
            , 'g'
        );
        // 获取需要替换的位置和值
        const operationList: Array<[start: number, end: number, replaceValue: string]> = [];
        let match: RegExpExecArray | null;
        while ((match = reg.exec(source))) {
            if (match[1]) {
                const start = match.index;
                const end = start + match[0].length;
                let replaceValue: string;
                if (vars[match[1]] !== undefined && vars[match[1]] !== 'null') {
                    replaceValue = vars[match[1]];
                } else if (match[2] !== undefined) {
                    try {
                        // eslint-disable-next-line no-eval
                        const value = eval(this.parseString(match[2], vars));
                        if (typeof value === 'string') {
                            replaceValue = "'" + value + "'";
                        } else {
                            replaceValue = String(value);
                        }
                    } catch (e) {
                        replaceValue = match[2];
                    }
                } else {
                    replaceValue = '';
                }
                // 如果取值后仍是变量，那么设置为默认值
                if (/^\$\{[^\}]+\}$/.test(replaceValue)) {
                    replaceValue = match[2] || '';
                }
                // 如果值是字符串，需要去掉前后的字符串标识
                if (/^((".*")|('.*'))$/.test(replaceValue)) {
                    replaceValue = replaceValue.slice(1, replaceValue.length - 1);
                }
                operationList.push([start, end, replaceValue]);
            }
        }
        // 源码所在的位置替换为值
        let operation: [start: number, end: number, replaceValue: string] | undefined;
        while ((operation = operationList.pop())) {
            const [start, end, replaceValue] = operation;
            source = `${source.slice(0, start)}${replaceValue}${source.slice(end)}`;
        }
        return source;
    }

    /**
     * `command use` 获取字符串表示的值，如果对应的环境变量不存在，那么返回 'null'
     * @param source 需要解析的字符串
     * @param vars 环境变量
     * @return 原始字符串表示的值
     */
    public parseString(source: string, vars: Record<string, string>) : string {
        try {
            return (new Function(`
                ${Object.entries(vars).map(([k, v]) => {
                    return 'const ' + k + ' = \`' + v.replace(/`/g, '\\`') + '\`;';
                }).join('\n')}
                return \`${source.replace(/`/g, '\\`')}\`;
            `))();
        } catch (e) {
            const match = /^ReferenceError: (\w+) is not defined$/.exec(String(e));
            if (match && match[1]) {
                const paramsVars = { ...vars };
                paramsVars[match[1]] = 'null';
                return this.parseString(source, paramsVars);
            } else {
                throw e;
            }
        }
    }

    /**
     * 解析文本片段中以固定字符串开头和结尾的包含块
     * @param source 要接卸的文本
     * @param open 包含块开头
     * @param close 包含块结束
     * @param greedy 是否贪婪匹配
     * @param onInBlock 包含块内文本的处理函数
     * @param onOutBlock 非包含块内的文本的处理函数
     */
    private parseTextBlock(source: string, open: string, close: string, greedy: boolean, onInBlock: (text: string) => void, onOutBlock: (text: string) => void) {
        const texts = source.split(open);
        let level = 0; // 贪婪匹配的层级，非贪婪模式只有0或一层
        let buf : string[] = []; // 文本缓冲区

        for (let i = 0; i < texts.length; i++) {
            let text = texts[i];
            if (i) {
                let openBegin = true; // 上一个标志是否是 open
                level++;
                while (true) {
                    const closeIndex = text.indexOf(close); // 关闭位置
                    if (closeIndex < 0) {
                        buf.push(level > 1 && openBegin ? open : '', text);
                        break;
                    }

                    level = greedy ? level - 1 : 0;
                    buf.push(
                        level > 0 && openBegin ? open : '', // 多层内的 open 标志需要被 onInBlock 处理，如果上一个标志不是 open 则 open 已经被添加了，不能重复添加
                        text.slice(0, closeIndex), // 包含块内的文本
                        level > 0 ? close : '', // 多层内的 close 标志需要被 onInBlock 处理
                    );
                    text = text.slice(closeIndex + close.length); // 包含块外的文本
                    openBegin = false;

                    if (!level) break;
                }

                if (!level) {
                    onInBlock(buf.join(''));
                    onOutBlock(text);
                    buf = [];
                }
            } else {
                text && onOutBlock(text);
            }
        }

        // 如果解析完成后还存在层级，则表示没有闭合，最后的 open 无效，需要被 onOutBlock 处理
        if (level && buf.length) {
            onOutBlock(open);
            onOutBlock(buf.join(''));
        }
    }

    /**
     * 刷新缓冲区
     */
    private flushTextBuf() {
        const text: string = this.analysesContext.textBuf.join('');
        if (text) {
            const textNode = new TextNode(text, this);

            this.analysesContext.stack.top()?.addChild(textNode);
            this.analysesContext.textBuf = [];
            this.analysesContext.current = textNode;
        }
    }

    /**
     * 将指定节点类型之上的节点全部自动闭合，并且闭合找到的节点
     * @param content 语法分析环境对象
     * @param commandType 节点类型
     * @return 找到并且最后被闭合的节点
     */
    public autoCloseCommand(context: AnalysesContext, commandType: CommandType | null = null): Command | null {
        const stack = context.stack;
        const closeEndCommand = commandType ? stack.findTop(item => item instanceof commandType) : stack.bottom();

        if (closeEndCommand) {
            let node;
            while ((node = stack.top()) !== closeEndCommand) {
                if (commandType) {
                    // 如果节点不支持自动闭合，需要抛出错误
                    if (!node.autoClose) {
                        throw new Error(node.type + ' must be closed manually: ' + node.value);
                    }
                    node.autoClose(context);
                } else {
                    node.close(context);
                }
            }
            closeEndCommand.close(context);
        }

        return closeEndCommand;
    }
}

export type CommandType = Function; // Command的子类
export type CommandTypes = { [name: string]: CommandType };

type Targets = { [name: string]: TargetCommand };
