export interface RequiredRule {
    key: string;
    value: string;
    valueRegExp: string;
}

export interface TreeNode {
    level: number; // 节点层级
    name: string; // 属性名称
    type: string | string[]; // 值类型
    desc: string; // 属性的 Markdown 文档
    default?: string; // 默认值
    options?: string; // 可选项
    min?: string; // 允许的最小值
    max?: string; // 允许的最大值
    step?: string; // 有效的步进
    dims?: string; // 向量类型的格式
    children: TreeNode[]; // 子节点
    parent: TreeNode | null; // 父节点
}

export interface NormalTree {
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
    children: Tree[]; // 子节点
}

export interface DetailTree {
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
    detailFileName: string; // 子属性所在的文件名
}

export type Tree = NormalTree | DetailTree;

/** 删除在数据中无用的属性 */
export function dealTree(t: TreeNode): Tree {
    // @ts-ignore
    delete t.parent;
    // @ts-ignore
    delete t.level;
    t.children.forEach(v => dealTree(v));
    return t as Tree;
};
