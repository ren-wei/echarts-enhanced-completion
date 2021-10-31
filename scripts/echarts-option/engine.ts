/**
 * @name 模板解析引擎
 * @description 具体功能的实现是由继承了 Command 的子类组合而成；抽象类 Command 定义了命令的基本结构和功能
 */
export default class Engine {
    public targets: Targets = {};
    public commandTypes: CommandTypes;
    public options: EngineOptions;
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
            variableOpen: '${',
            variableClose: '}',
            namingConflict: 'error',
            missTarget: 'error',
        }, options) as EngineOptions);
        this.commandTypes = {
            'target': TargetCommand,
            'use': UseCommand,
            // 'block': BlockCommand,
            // 'import': ImportCommand,
            // 'var': VarCommand,
            // 'for': ForCommand,
            // 'if': IfCommand,
            // 'elif': ElifCommand,
            // 'else': ElseCommand,
            // 'filter': FilterCommand,
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
     * TODO: 编译变量访问和替换的代码
     * @param source 源代码
     * @param vars 变量的值
     */
    public compileVariable(source: string, vars: {[name: string]: string} = {}): string {
        return source;
    }

    /**
     * 执行模板渲染，返回渲染后的字符串。
     * @param name target名称
     * @returns 渲染结果
     */
    public render(name: string): string {
        return this.targets[name].children.map(child => child.getRendererBody()).join('');
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
                    if (!node.allowAutoClose) {
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

    public getRendererBody(): string {
        return this.value;
    }

    public clone(): TextNode {
        return new TextNode(this.value, this.engine);
    }
}

/** 所有命令的抽象基类 */
export abstract class Command {
    public name: string = ''; // 名称
    public value: string; // 模板中命令之后的部分
    public abstract readonly type: string; // 命令类型，对应模板中的关键字
    public abstract readonly allowAutoClose: boolean; // 是否允许自动闭合
    public children: Array<Command | TextNode> = []; // 子节点
    protected engine: Engine;

    constructor(value: string, engine: Engine) {
        this.value = value;
        this.engine = engine;
    }

    /** 添加子节点 */
    public addChild(node: Command | TextNode) {
        this.children.push(node);
    }

    /** 节点open，解析开始 */
    public open(context: AnalyseContext) {
        const parent = context.stack.top();
        parent?.addChild(this);
        context.stack.push(this);
    }

    /** 节点闭合，解析结束 */
    public close(context: AnalyseContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    /** allowAutoClose 为 true 时需要实现此函数 */
    public autoClose(context: AnalyseContext) {
        this.close(context);
    }

    /** 获取生成的代码 */
    public abstract getRendererBody(): string;

    public abstract clone(): Command;
}

export type CommandType = Function; // Command的子类
export type CommandTypes = { [name: string]: CommandType };

export enum TargetState {
    READY, // 读取前
    READING, // 读取中
    READED, // 读取完成，但还有依赖未找到
    APPLIED, // 所有依赖都已应用，可以调用渲染函数获取渲染结果
}

type Targets = { [name: string]: TargetCommand };

/** 用于定义命令处理的目标 */
export class TargetCommand extends Command {
    private state: TargetState;
    public type: string = 'target';
    public allowAutoClose: boolean = false;

    constructor(value: string, engine: Engine) {
        super(value, engine);
        this.name = this.value.trim();
        this.state = TargetState.READY;
    }

    public open(context: AnalyseContext) {
        super.open(context);
        this.state = TargetState.READING;

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
        super.close(context);
        this.engine.targets[this.name] = this;
        this.state = TargetState.READED;
    }

    public autoClose(context: AnalyseContext) {
        this.close(context);
    }

    public clone(): TargetCommand {
        // TODO: clone
        return new TargetCommand(this.value, this.engine);
    }

    public getRendererBody(): string {
        return this.children.map(child => child.getRendererBody()).join('');
    }
}

class UseCommand extends Command {
    public allowAutoClose: boolean = true;
    public type: string = 'use';

    public clone(): TargetCommand {
        return new TargetCommand(this.value, this.engine);
    }

    public getRendererBody(): string {
        return this.children.map(child => child.getRendererBody()).join('');
    }
}

// class BlockCommand extends Command {
//     public allowAutoClose: boolean = false;
//     public type: string = 'block';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class ImportCommand extends Command {
//     public allowAutoClose: boolean = true;
//     public type: string = 'import';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class VarCommand extends Command {
//     public allowAutoClose: boolean = true;
//     public type: string = 'var';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class ForCommand extends Command {
//     public allowAutoClose: boolean = false;
//     public type: string = 'for';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class IfCommand extends Command {
//     public allowAutoClose: boolean = false;
//     public type: string = 'if';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class ElifCommand extends Command {
//     public allowAutoClose: boolean = false;
//     public type: string = 'elif';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class ElseCommand extends Command {
//     public allowAutoClose: boolean = false;
//     public type: string = 'else';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }

// class FilterCommand extends Command {
//     public allowAutoClose: boolean = true;
//     public type: string = 'filter';

//     public clone(): TargetCommand {
//         return new TargetCommand(this.value);
//     }

//     public getRendererBody(): string {
//         return this.children.map(child => child.getRendererBody()).join('');
//     }
// }
