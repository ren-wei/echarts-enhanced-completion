/**
 * @name 模板解析引擎
 * @author ren-wei
 * @description 所有源码依次调用`parseSource`方法，然后调用`render`方法获取渲染结果，它的参数从`targets`属性获取
 * @extends 'implements'抽象类'Command'以扩展功能
 */

import * as os from 'os';

export default class Engine {
    public targets: Targets = {};
    public commandTypes: CommandTypes;
    public options: EngineOptions;
    public deps: string[] = []; // 需要导入的目标，长度为0时才能 render
    private analyseContext: AnalyseContext; // 语法分析环境对象

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
            ...commandExtends,
        };
        this.analyseContext = {
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
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
                        currentNode = this.autoCloseCommand(this.analyseContext, NodeType);
                    } else {
                        // @ts-ignore
                        currentNode = new NodeType(match[3], this);
                        (currentNode as Command).open(this.analyseContext);
                    }
                    this.analyseContext.current = currentNode;
                } else if (!/^\s*\/\//.test(text)) {
                    // 不是模板注释，作为普通文本写入缓冲区
                    this.analyseContext.textBuf.push(this.options.commandOpen, text, this.options.commandClose);
                }
            },
            (text) => {
                // 普通文本直接写入缓冲区
                this.analyseContext.textBuf.push(text);
            }
        );

        this.flushTextBuf(); // 解析完成之后，刷新缓冲区
        this.autoCloseCommand(this.analyseContext);
    }

    /**
     * 执行模板渲染，返回渲染后的字符串。
     * @param name target名称
     * @param vars 变量默认值
     * @returns 渲染结果
     */
    public render(name: string, vars: Vars = {}): string {
        return this.targets[name].children.map(child => child.getRendererBody(vars)).join('').trim() + os.EOL;
    }

    /**
     * `command use` 编译变量
     * @param source 源代码
     * @param vars 变量的值
     * @return 编译后的结果
     */
    public compileVariable(source: string, vars: Vars = {}): string {
        const reg = new RegExp(
            this.options.variableOpen
            + '(\\w+)'
            + '(?:\\|default\\('
            + '(' // 匹配括号内的默认值
            + exp.expression
            + ')'
            + '\\)'
            + ')?'
            + this.options.variableClose
            , 'g'
        );
        // 获取需要替换的位置和值
        const opers: Array<[start: number, end: number, replaceValue: string]> = [];
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
                        const value = eval(match[2]);
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
                opers.push([start, end, replaceValue]);
            }
        }
        // 源码所在的位置替换为值
        let oper: [start: number, end: number, replaceValue: string] | undefined;
        while ((oper = opers.pop())) {
            const [start, end, replaceValue] = oper;
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
    public parseString(source: string, vars: Vars) : string {
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
        const text: string = this.analyseContext.textBuf.join('');
        if (text) {
            const textNode = new TextNode(text, this);

            this.analyseContext.stack.top()?.addChild(textNode);
            this.analyseContext.textBuf = [];
            this.analyseContext.current = textNode;
        }
    }

    /**
     * 将指定节点类型之上的节点全部自动闭合，并且闭合找到的节点
     * @param content 语法分析环境对象
     * @param commandType 节点类型
     * @return 找到并且最后被闭合的节点
     */
    public autoCloseCommand(context: AnalyseContext, commandType: CommandType | null = null): Command | null {
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

export type EngineOptions = {
    commandOpen: string; // 命令语法起始串
    commandClose: string; // 命令语法结束串
    commandSyntax: RegExp; // 命令语法正则
    variableOpen: string; // 变量语法起始串
    variableClose: string; // 变量语法结束串
    namingConflict: 'override' | 'ignore' | 'error'; // target名字冲突时的处理策略：覆盖、忽略或报错
    missTarget: 'ignore' | 'error'; // target不存在时的处理策略
};

/** 语法分析环境对象 */
type AnalyseContext = {
    stack: Stack<Command>;
    deps: { [targetName: string]: string[] }; // target依赖的其他target名称
    target: TargetCommand | null; // 解析过程中正在解析的target
    textBuf: string[]; // 文本缓冲区
    current: Command | TextNode | null; // 解析过程中当前所在的节点
};

/** 当前的环境变量 */
type Vars = {
    [key: string]: string;
};

class Exp {
    /** 不同类型的值的正则表达式 */
    public exp: { [key: string]: string};
    /** 匹配所有的简单值 */
    public valueExp: string;
    /** 匹配?号表达式 */
    public questionExp: string;
    /** 匹配所有表达式 */
    public expression: string;

    constructor() {
        this.exp = {
            /** 单引号 */
            singleQuotaion: "(?:'[^']*')",
            /** 双引号 */
            doubleQuotaion: '(?:"[^"]*")',
            /** true、false等字面量值 */
            literal: '(?:true|false|null)',
            /** 数字 */
            digital: '(?:\\d+)',
            /** 形如 ${name} 的模板变量值 */
            template: '(?:\\$\\{\\w+\\})',
        };
        this.valueExp = '(?:' + Object.values(this.exp).join('|') + ')';
        this.questionExp = '(?:' + this.valueExp + '\\s*\\?\\s*' + this.valueExp + '\\s*:\\s*' + this.valueExp + ')';
        const simpleExp = '(?:(?:\\((?:' + this.questionExp + '|' + this.valueExp + ')\\))|(?:' + this.questionExp + '|' + this.valueExp + '))';
        this.expression = '(?:' + simpleExp + '(?:\\s*\\+\\s*' + simpleExp + ')*)';
    }
}

const exp = new Exp();

export class Stack<T> extends Array<T> {
    /** 获取顶部元素 */
    public top(): T {
        return this[this.length - 1];
    }

    /** 获取底部元素 */
    public bottom(): T {
        return this[0];
    }

    /** 从顶部向下找符合条件的元素 */
    public findTop(condition: (value: T) => boolean): T | null {
        let index = this.length;
        while (index--) {
            const item = this[index];
            if (condition(item)) {
                return item;
            }
        }
        return null;
    }
}

/** 普通文本节点 */
export class TextNode {
    public value: string;
    private engine: Engine;

    constructor(value: string, engine: Engine) {
        this.value = value;
        this.engine = engine;
    }

    public getRendererBody(vars: Vars): string {
        return this.engine.compileVariable(this.value, vars);
    }

    public clone(): TextNode {
        return new TextNode(this.value, this.engine);
    }
}

/** 所有命令的抽象基类 */
export abstract class Command {
    public abstract name: string; // 名称
    public abstract value: string; // 模板中命令之后的部分
    public abstract readonly type: string; // 命令类型，对应模板中的关键字
    public abstract children: Array<Command | TextNode>; // 子节点
    public abstract engine: Engine;

    /** 添加子节点 */
    public abstract addChild(node: Command | TextNode): void;

    /** 节点open，解析开始 */
    public abstract open(context: AnalyseContext) : void;

    /** 节点闭合，解析结束 */
    public abstract close(context: AnalyseContext): void;

    /** 自动闭合方法，实现此方法表示允许自动闭合 */
    public abstract autoClose?(context: AnalyseContext): void;

    /** 获取生成的代码 */
    public abstract getRendererBody(vars: Vars): string;
}

export type CommandType = Function; // Command的子类
export type CommandTypes = { [name: string]: CommandType };

type Targets = { [name: string]: TargetCommand };

/** 定义target，提供给其他命令使用 */
export class TargetCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'target';
    public children: Array<Command | TextNode> = [];
    public engine: Engine;

    constructor(value: string, engine: Engine) {
        const match = /\b([\w-]*)/.exec(value);
        this.name = match ? match[0] : value;
        this.value = match ? match[0] : value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {
        this.children.push(node);
    }

    public open(context: AnalyseContext) {
        this.engine.autoCloseCommand(context);
        context.stack.top()?.addChild(this);
        context.stack.push(this);

        // target已找到，从deps从移除
        const index = this.engine.deps.indexOf(this.name);
        if (index !== -1) {
            this.engine.deps.splice(index, 1);
        }

        // 将当前 target 添加到语法环境中
        context.target = this;
        if (this.engine.targets[this.name]) {
            switch (this.engine.options.namingConflict) {
                case 'override':
                    this.engine.targets[this.name] = this;
                case 'ignore':
                    break;
                default:
                    throw new Error('[TARGET_EXISTS]' + this.name);
            }
        } else {
            this.engine.targets[this.name] = this;
        }
    }

    public close(context: AnalyseContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalyseContext) {
        this.close(context);
    }

    public getRendererBody(vars: Vars): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}

/** use 命令用于将指定的 target 渲染后的内容复制到此处，并且可以传递参数作为变量 */
class UseCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'use';
    public children: Array<Command> = [];
    public engine: Engine;

    private argsStr: string;

    constructor(value: string, engine: Engine) {
        const reg = new RegExp(
            '\\b' // 单词边界
            + '(?<name>[\\w|-]*)' // 名称
            + '(?:' // 定义括号和内部的参数为非捕获组1
                + '\\(\\s*' // 参数前的括号
                + '(?<args>.*)'
                + '\\s*\\)' // 参数后的括号
            + ')?' // 非捕获组1允许不存在
            , 'ms'
        );
        const match = reg.exec(value);
        this.name = match?.groups?.name || value;
        this.argsStr = match?.groups?.args || '';
        this.value = value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {}

    public open(context: AnalyseContext) {
        // use命令打开完后立即闭合，不需要入栈
        context.stack.top()?.addChild(this);
        if (!this.engine.targets[this.name] && !this.engine.deps.includes(this.name)) {
            this.engine.deps.push(this.name);
        }
    }

    public close(context: AnalyseContext) {}

    public getRendererBody(vars: Vars): string {
        if (this.engine.targets[this.name]) {
            return this.engine.targets[this.name].getRendererBody(this.parseVars(vars));
        } else if (this.engine.options.missTarget === 'error') {
            throw new Error('[TARGET_NOT_EXISTS] ' + this.name);
        } else {
            return '';
        }
    }

    /** 解析参数 */
    private parseVars(vars: Vars): Vars {
        const reg = new RegExp(
            '(?:\\s*' // 开头空白
            + '(\\w+)' // 参数的key
            + '\\s?=\\s?' // =
            + '(' // 不同格式的参数
            + `${exp.valueExp}(?:\\s*\\+\\s*${exp.valueExp})?`
            + ')'
            + '\\s*)'
            , 'msg'
        );
        let match: RegExpExecArray | null;
        const raw: Vars = {};
        while ((match = reg.exec(this.argsStr))) {
            raw[match[1]] = match[2];
        }
        // 获取当前的参数和对应值
        const newVars: Vars = Object.fromEntries(Object.entries(raw).map(([k, v]) => {
            return [k, this.engine.parseString(v, vars)];
        }));
        Object.entries(newVars).forEach(([k, v]) => {
            try {
                // eslint-disable-next-line no-eval
                const value = eval(v);
                if (typeof value === 'string') {
                    newVars[k] = "'" + value.replace(/(?:=\\)'/g, "\\'") + "'";
                } else {
                    newVars[k] = String(value);
                }
            } catch (e) {
                newVars[k] = v;
            }
        });
        return newVars;
    }
}

/** import 命令用于将指定的 target 渲染后的内容复制到此处 */
class ImportCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'import';
    public children: Array<Command> = [];
    public engine: Engine;

    constructor(value: string, engine: Engine) {
        const match = /[\w-]+/.exec(value);
        this.name = match ? match[0] : value;
        this.value = value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {}

    public open(context: AnalyseContext) {
        // import命令打开完后立即闭合，不需要入栈
        context.stack.top()?.addChild(this);
        if (!this.engine.targets[this.name] && !this.engine.deps.includes(this.name)) {
            this.engine.deps.push(this.name);
        }
    }

    public close(context: AnalyseContext) {}

    public getRendererBody(vars: Vars): string {
        if (this.engine.targets[this.name]) {
            return this.engine.targets[this.name].getRendererBody(vars);
        } else if (this.engine.options.missTarget === 'error') {
            throw new Error('[TARGET_NOT_EXISTS] ' + this.name);
        } else {
            return '';
        }
    }
}

/** if 命令用于根据条件判断是否渲染，可以包含 elif 和 else 命令，需要闭合命令 */
class IfCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'if';
    public children: Array<BlockCommand | ElifCommand | ElseCommand> = [];
    public engine: Engine;

    constructor(value: string, engine: Engine) {
        this.name = '';
        this.value = value;
        this.engine = engine;
    }

    public addChild(node: BlockCommand | ElifCommand | ElseCommand) {
        this.children.push(node);
    }

    public open(context: AnalyseContext) {
        context.stack.top()?.addChild(this);
        context.stack.push(this);
        // 创建一个 block 节点来划分范围
        const node = new BlockCommand('', this.engine);
        node.open(context);
    }

    public close(context: AnalyseContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public getRendererBody(vars: Vars): string {
        if (this.validate(vars)) {
            return this.children[0].getRendererBody(vars);
        }
        for (let i = 1; i < this.children.length; i++) {
            const child = this.children[i];
            if (child instanceof ElifCommand && this.validate(vars, child.value) || child instanceof ElseCommand) {
                return child.getRendererBody(vars);
            }
        }
        return '';
    }

    /** 校验条件是否成立 */
    private validate(vars: Vars, value = this.value): boolean {
        try {
            return (new Function(`return ${this.engine.parseString(value, vars)}`))();
        } catch (e) {
            // TODO: 对于这种模式，暂时不清楚其含义
            if (value.includes('${extra}.hasOwnProperty(${name})')) {
                return false;
            }
            // eslint-disable-next-line no-eval
            return eval(this.engine.compileVariable(value, vars));
        }
    }
}

/** elif 命令是 if 命令的子命令，必须跟在 if 命令之后，允许自动闭合 */
class ElifCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'elif';
    public children: Array<Command | TextNode> = [];
    public engine: Engine;

    constructor(value: string, engine: Engine) {
        this.name = '';
        this.value = value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {
        this.children.push(node);
    }

    public open(context: AnalyseContext) {
        this.engine.autoCloseCommand(context, BlockCommand);
        this.engine.autoCloseCommand(context, ElifCommand);
        if (!context.stack.top() && (context.stack.top() instanceof IfCommand || context.stack.top() instanceof ElifCommand)) {
            throw new Error('[elif]命令必须位于[if]或[elif]命令之后:' + context);
        }
        context.stack.top().addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalyseContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalyseContext) {
        this.close(context);
    }

    public getRendererBody(vars: Vars): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}

/** else 命令是 if 的子命令，必须跟在 if 命令或 elif 命令之后，允许自动闭合 */
class ElseCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'else';
    public children: Array<Command | TextNode> = [];
    public engine: Engine;

    constructor(value: string, engine: Engine) {
        this.name = '';
        this.value = value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {
        this.children.push(node);
    }

    public open(context: AnalyseContext) {
        this.engine.autoCloseCommand(context, BlockCommand);
        this.engine.autoCloseCommand(context, ElifCommand);
        if (!context.stack.top() && (context.stack.top() instanceof IfCommand || context.stack.top() instanceof ElifCommand)) {
            throw new Error('[else]命令必须位于[if]或[elif]命令之后:' + context);
        }
        context.stack.top().addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalyseContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalyseContext) {
        this.close(context);
    }

    public getRendererBody(vars: Vars): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}

/** block 命令没有对应的命令关键词，仅作为其他的命令内部分块使用 */
export class BlockCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'else';
    public children: Array<Command | TextNode> = [];
    public engine: Engine;

    constructor(value: string, engine: Engine) {
        this.name = '';
        this.value = value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {
        this.children.push(node);
    }

    public open(context: AnalyseContext) {
        context.stack.top()?.addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalyseContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalyseContext) {
        this.close(context);
    }

    public getRendererBody(vars: Vars): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}
