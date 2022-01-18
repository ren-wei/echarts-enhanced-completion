interface AstNode {
    type: string;
    name?: string;
    start: number;
    end: number;
    properties?: [AstNode];
    elements?: [AstNode];
    key?: AstNode;
    value?: AstNode;
    raw?: string;
}

type Key = 'type' | 'start' | 'end' | 'properties' | 'elements' | 'key' | 'value';

type Paths = Array<string | SimpleObject>;

interface RequiredRule {
    key: string;
    value: string;
    valueRegExp: string;
}

interface Tree {
    name: string; // 属性名称
    type: string | string[]; // 值类型
    desc: string; // 属性的 Markdown 文档
    default?: string; // 默认值
    options?: string; // 可选项
    min?: string; // 允许的最小值
    max?: string; // 允许的最大值
    step?: string; // 有效的步进
    dims?: string; // 向量类型的格式
    required?: Array<RequiredRule>; // 对值的限制
    children?: Tree[]; // 子节点
    detailFileName?: string; // 子属性所在的文件名
}

interface PathMsg {
    name: string;
    target: AstNode
}

interface KeyFunc {
    [propName: string]: Function;
}

interface SimpleObject<T = string | number | boolean> {
    [propName: string]: T;
}

interface BaseOption {
    title: string;
    name: string;
    imgSrc: string;
    code: string;
}

type Languages = 'en' | 'zh';

/** 依赖规则 */

type DependRules = DependRule[];

interface DependRule {
    /** 目标key，以 . 连接 */
    key: string;
    /** 依赖提示信息 */
    msg: string;
    /** 依赖数组 */
    depends: DependItem[];
    /** 值的可选项 */
    options?: Array<string|number|boolean>;
    /** 禁用此规则 */
    disable?: boolean;
}

type DependItem = ExpectedDepend | ExcludeDepend;

/** 预期依赖 */
interface ExpectedDepend {
    /** 目标key，以 . 连接 */
    key: string;
    /** 目标默认值 */
    defaultValue: string | number | boolean | null;
    /** 目标预期值 */
    expectedValue: string | number | boolean | null;
    /** 依赖提示信息 */
    msg: string;
}

/** 排除依赖 */
interface ExcludeDepend {
    /** 目标key，以 . 连接 */
    key: string;
    /** 目标默认值 */
    defaultValue: string | number | boolean | null;
    /** 目标排除值 */
    excludeValue: string | number | boolean | null;
    /** 依赖提示信息 */
    msg: string;
}

declare module 'simillar-commands' {
    export function simillarCommands(commands: string[], word: string): string[];
}
