import * as vscode from 'vscode';
import Store from './store';
import Ast, { AstItem } from './ast';
import Config from './config';

export default class Options {
    private descTreeList: Tree[] = [];
    private store: Store;
    private astItem: AstItem | undefined;
    private node: AstNode | null;
    private paths: Paths = [];

    constructor(ast: Ast, store: Store, position: vscode.Position) {
        this.store = store;
        this.astItem = ast.getAstItem(position);
        [this.node, this.paths] = ast.getMinAstNode(this.astItem, position);
    }

    public getCompletionItem(): vscode.CompletionItem[] {
        if (!this.node || !this.astItem) return [];
        let completionItems: vscode.CompletionItem[] = [];
        if (Config.initEnabled && this.astItem.isEmpty) {
            // 空对象额外增加初始化选项
            completionItems = this.store.getBaseOptions().map((item, index) => {
                let insertText = item.code.slice(1, item.code.length - 1).split('\n').map(v => v.slice(4)).join('\n').trim();
                insertText = insertText.replaceAll('    ', Config.insertSpaces ? new Array(Config.tabSize).fill(' ').join('') : '\t');
                return {
                    label: {
                        label: item.name,
                        description: Config.language === 'zh' ? item.title : undefined,
                    },
                    kind: vscode.CompletionItemKind.Value,
                    documentation: new vscode.MarkdownString((Config.initShowPictures && item.imgSrc ? '![' + item.title + '](' + item.imgSrc + ')\n' : '') + '```javascript\n' + item.code + '\n```'),
                    sortText: String(index).length > 1 ? String(index) : '0' + String(index),
                    insertText,
                };
            });
        }
        if (Config.initEnabled && Config.onlyInit) {
            return completionItems;
        }
        const isArray = this.node.type === 'ArrayExpression';
        this.descTreeList = this.store.getOptionDesc(this.paths, isArray, this.astItem);
        return completionItems.concat(...this.filterOptions(this.descTreeList, this.node).map((tree, index) => {
            return {
                label: {
                    label: tree.name,
                    description: String(tree.type || ''),
                },
                kind: vscode.CompletionItemKind.Property,
                detail: tree.desc ? 'echarts options' : undefined,
                documentation: new vscode.MarkdownString(tree.desc),
                sortText: String(completionItems.length + index).length > 1 ? String(completionItems.length + index) : '0' + String(completionItems.length + index),
                insertText: new vscode.SnippetString(this.getInsertText(tree, isArray)),
            };
        }));
    }

    public getHover(): vscode.Hover | null {
        if (!this.node || !this.astItem) return null;
        if (this.node.type === 'Identifier') {
            this.descTreeList = this.store.getOptionDesc(this.paths.slice(0, -1), false, this.astItem);
            return new vscode.Hover(new vscode.MarkdownString(this.descTreeList.find(v => v.name === this.node?.name)?.desc));
        } else if (this.node.type === 'Property') {
            this.descTreeList = this.store.getOptionDesc(this.paths.slice(0, -1), false, this.astItem);
            return new vscode.Hover(new vscode.MarkdownString(this.descTreeList.find(v => v.name === this.node?.key?.name)?.desc));
        }
        return null;
    }

    /** 过滤出现在node中的选项，返回允许的选项列表 */
    private filterOptions(descTreeList: Tree[], node: AstNode): Tree[] {
        let hasKey: string[] = [];
        if (node.type === 'ObjectExpression') {
            hasKey = node.properties?.map(v => v.key?.name) as string[];
        }
        return descTreeList.filter(tree => {
            return !hasKey.some(str => tree.name === str);
        });
    }

    /**
     * 获取需要插入的代码片段
     * @returns 插入值的代码片段
     */
    private getInsertText(tree: Tree, isArray: Boolean = false): string {
        let prop = '';
        if (/^<.*>$/.test(tree.name)) {
            prop = '$1';
        } else {
            prop = tree.name;
        }
        let value = '${0}';
        // 如果存在默认值，则补全默认值
        if (tree.default) {
            if (typeof tree.type === 'string' && ['vector', 'percentvector'].includes(tree.type) && tree.default.includes(',')) {
                value = `[${tree.default}],`;
            } else {
                value = `${tree.default},`;
            }
        } else if (typeof tree.type === 'string') {
            switch (tree.type) {
                case 'string':
                case 'color':
                case 'icon':
                case 'text':
                    // 将值作为字符串补全
                    value = "'$0',";
                    break;
                case 'percent':
                    // 值为百分比时，没有'%'时是数字类型，有'%'时是字符串类型
                    value = '$0,';
                    break;
                case 'Array':
                case 'vector':
                case 'percentvector':
                    // 将值作为数组补全
                    value = '[$0],';
                    break;
                case 'enum':
                    value = '${1|' + tree.options + '|},';
                    break;
                case 'Object':
                    if (tree.required) {
                        // FIXME: 需要更通用的方法来判断
                        const pack = isArray || !tree.name.includes('.'); // 是否使用大括号包裹
                        const result: string[] = pack ? ['{'] : [];
                        tree.required.forEach((item, index, array) => {
                            let str = `${pack ? '\t' : ''}${item.key}: ${item.value}`;
                            if (index === array.length - 1) {
                                str += ',';
                            }
                            result.push(str);
                        });
                        if (pack) {
                            result.push('},');
                        }
                        value = result.join('\n');
                    } else {
                        value = '{$0},';
                    }
                    break;
                case 'number':
                case 'boolean':
                default:
                        // 仅补全默认值
            }
        } else if (tree.type.includes('Array')) {
            value = '[$0],';
        } else if (tree.type.includes('Object')) {
            if (tree.required) {
                // FIXME: 需要更通用的方法来判断
                const pack = !isArray && tree.name.includes('.'); // 是否使用大括号包裹
                const result: string[] = pack ? ['{'] : [];
                tree.required.forEach((item, index, array) => {
                    let str = `${pack ? '\t' : ''}${item.key}: ${item.value}`;
                    if (index === array.length - 1) {
                        str += ',';
                    }
                    result.push(str);
                });
                if (pack) {
                    result.push('},');
                }
                value = result.join('\n');
            } else {
                value = '{$0},';
            }
        }
        // FIXME: 需要更通用的方法来判断
        return isArray || tree.name.includes('.') ? value : `${prop}: ${value}`;
    }
}
