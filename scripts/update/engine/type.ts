import { Command, TargetCommand, TextNode } from './command';
import { Stack } from './stack';

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
export type AnalysesContext = {
    stack: Stack<Command>;
    deps: Record<string, string[]>; // target依赖的其他target名称
    target: TargetCommand | null; // 解析过程中正在解析的target
    textBuf: string[]; // 文本缓冲区
    current: Command | TextNode | null; // 解析过程中当前所在的节点
};
