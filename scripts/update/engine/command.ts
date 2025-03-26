import Engine from '.';
import { templateExpWithDefault, valueExp } from './exp';
import { AnalysesContext } from './type';

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
    public abstract open(context: AnalysesContext) : void;

    /** 节点闭合，解析结束 */
    public abstract close(context: AnalysesContext): void;

    /** 自动闭合方法，实现此方法表示允许自动闭合 */
    public abstract autoClose?(context: AnalysesContext): void;

    /** 获取生成的代码 */
    public abstract getRendererBody(vars: Record<string, string>): string;
}

/** 普通文本节点 */
export class TextNode {
    public value: string;
    private engine: Engine;

    constructor(value: string, engine: Engine) {
        this.value = value;
        this.engine = engine;
    }

    public getRendererBody(vars: Record<string, string>): string {
        return this.engine.compileVariable(this.value, vars);
    }

    public clone(): TextNode {
        return new TextNode(this.value, this.engine);
    }
}

/** 定义target，提供给其他命令使用 */
export class TargetCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'target';
    public children: Array<Command | TextNode> = [];
    public engine: Engine;
    private cache: {[name:string]: string} = {};

    constructor(value: string, engine: Engine) {
        const match = /\b([\w-]*)/.exec(value);
        this.name = match ? match[0] : value;
        this.value = match ? match[0] : value;
        this.engine = engine;
    }

    public addChild(node: Command | TextNode) {
        this.children.push(node);
    }

    public open(context: AnalysesContext) {
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

    public close(context: AnalysesContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalysesContext) {
        this.close(context);
    }

    public getRendererBody(vars: Record<string, string>): string {
        const key = JSON.stringify(vars);
        if (this.cache[key]) {
            return this.cache[key];
        }
        const value = this.children.map(child => child.getRendererBody(vars)).join('');
        this.cache[key] = value;
        return value;
    }
}

/** use 命令用于将指定的 target 渲染后的内容复制到此处，并且可以传递参数作为变量 */
export class UseCommand implements Command {
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

    public open(context: AnalysesContext) {
        // use命令打开完后立即闭合，不需要入栈
        context.stack.top()?.addChild(this);
        if (!this.engine.targets[this.name] && !this.engine.deps.includes(this.name)) {
            this.engine.deps.push(this.name);
        }
    }

    public close(context: AnalysesContext) {}

    public getRendererBody(vars: Record<string, string>): string {
        if (this.engine.targets[this.name]) {
            return this.engine.targets[this.name].getRendererBody(this.parseVars(vars));
        } else if (this.engine.options.missTarget === 'error') {
            throw new Error('[TARGET_NOT_EXISTS] ' + this.name);
        } else {
            return '';
        }
    }

    /** 解析参数 */
    private parseVars(vars: Record<string, string>): Record<string, string> {
        const reg = new RegExp(
            '(?:\\s*' // 开头空白
            + '(\\w+)' // 参数的key
            + '\\s?=\\s?' // =
            + '(' // 不同格式的参数
            + `${valueExp}(?:\\s*\\+\\s*${valueExp})?`
            + ')'
            + '\\s*)'
            , 'msg'
        );
        let match: RegExpExecArray | null;
        const raw: Record<string, string> = {};
        while ((match = reg.exec(this.argsStr))) {
            raw[match[1]] = match[2];
            const m = (new RegExp(templateExpWithDefault)).exec(match[2]);
            if (m) {
                raw[match[1]] = `$\{${m[1]}\}||${m[2]}`;
            }
        }
        // 获取当前的参数和对应值
        const newVars: Record<string, string> = Object.fromEntries(Object.entries(raw).map(([k, v]) => {
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
export class ImportCommand implements Command {
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

    public open(context: AnalysesContext) {
        // import命令打开完后立即闭合，不需要入栈
        context.stack.top()?.addChild(this);
        if (!this.engine.targets[this.name] && !this.engine.deps.includes(this.name)) {
            this.engine.deps.push(this.name);
        }
    }

    public close(context: AnalysesContext) {}

    public getRendererBody(vars: Record<string, string>): string {
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
export class IfCommand implements Command {
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

    public open(context: AnalysesContext) {
        context.stack.top()?.addChild(this);
        context.stack.push(this);
        // 创建一个 block 节点来划分范围
        const node = new BlockCommand('', this.engine);
        node.open(context);
    }

    public close(context: AnalysesContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public getRendererBody(vars: Record<string, string>): string {
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
    private validate(vars: Record<string, string>, value = this.value): boolean {
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
export class ElifCommand implements Command {
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

    public open(context: AnalysesContext) {
        this.engine.autoCloseCommand(context, BlockCommand);
        this.engine.autoCloseCommand(context, ElifCommand);
        if (!context.stack.top() && (context.stack.top() instanceof IfCommand || context.stack.top() instanceof ElifCommand)) {
            throw new Error('[elif]命令必须位于[if]或[elif]命令之后:' + context);
        }
        context.stack.top().addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalysesContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalysesContext) {
        this.close(context);
    }

    public getRendererBody(vars: Record<string, string>): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}

/** else 命令是 if 的子命令，必须跟在 if 命令或 elif 命令之后，允许自动闭合 */
export class ElseCommand implements Command {
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

    public open(context: AnalysesContext) {
        this.engine.autoCloseCommand(context, BlockCommand);
        this.engine.autoCloseCommand(context, ElifCommand);
        if (!context.stack.top() && (context.stack.top() instanceof IfCommand || context.stack.top() instanceof ElifCommand)) {
            throw new Error('[else]命令必须位于[if]或[elif]命令之后:' + context);
        }
        context.stack.top().addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalysesContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalysesContext) {
        this.close(context);
    }

    public getRendererBody(vars: Record<string, string>): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}

/** block 命令没有对应的命令关键词，仅作为其他的命令内部分块使用 */
export class BlockCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'block';
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

    public open(context: AnalysesContext) {
        context.stack.top()?.addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalysesContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalysesContext) {
        this.close(context);
    }

    public getRendererBody(vars: Record<string, string>): string {
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}

export class ForCommand implements Command {
    public name: string;
    public value: string;
    public type: string = 'for';
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

    public open(context: AnalysesContext) {
        context.stack.top()?.addChild(this);
        context.stack.push(this);
    }

    public close(context: AnalysesContext) {
        if (context.stack.top() === this) {
            context.stack.pop();
        }
    }

    public autoClose(context: AnalysesContext) {
        this.close(context);
    }

    public getRendererBody(vars: Record<string, string>): string {
        // TODO: echarts-doc 中暂时没有解析的实例，暂时忽略
        return this.children.map(child => child.getRendererBody(vars)).join('');
    }
}
