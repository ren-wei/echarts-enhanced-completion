import * as vscode from 'vscode';
import Store from './store';
import Ast, { AstItem } from './ast';
import Config from './config';

export default class Options {
    private descObject: DescMsgObject = {};
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
                        description: Config.language === 'cn' ? item.title : undefined,
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
        this.descObject = this.store.getOptionDesc(this.paths, isArray, this.astItem);
        return completionItems.concat(...this.filterOptions(this.descObject, this.node).map((name, index) => {
            const typeOfValue = this.descObject[name].uiControl?.type;
            return {
                label: {
                    label: name,
                    description: String(typeOfValue || ''),
                },
                kind: vscode.CompletionItemKind.Property,
                detail: this.descObject[name].desc ? 'echarts options' : undefined,
                documentation: this.descObject[name].desc ? new vscode.MarkdownString(this.descObject[name].desc) : undefined,
                sortText: String(completionItems.length + index).length > 1 ? String(completionItems.length + index) : '0' + String(completionItems.length + index),
                insertText: new vscode.SnippetString(this.getInsertText(name, this.descObject[name].uiControl, isArray)),
            };
        }));
    }

    public getHover(): vscode.Hover | null {
        if (!this.node || !this.astItem) return null;
        if (this.node.type === 'Identifier') {
            this.descObject = this.store.getOptionDesc(this.paths.slice(0, -1), false, this.astItem);
            return new vscode.Hover(new vscode.MarkdownString(this.descObject[this.node.name].desc));
        } else if (this.node.type === 'Property') {
            this.descObject = this.store.getOptionDesc(this.paths.slice(0, -1), false, this.astItem);
            return new vscode.Hover(new vscode.MarkdownString(this.descObject[this.node.key.name].desc));
        }
        return null;
    }

    /** 过滤出现在node中的选项，返回允许的选项列表 */
    private filterOptions(descObject: DescMsgObject, node: AstNode): string[] {
        let hasKey: string[] = [];
        if (node.type === 'ObjectExpression') {
            hasKey = node.properties.map(v => v.key.name);
        }
        return Object.keys(descObject).filter(key => {
            return !hasKey.some(str => key === str);
        });
    }

    /**
     * 获取需要插入的代码片段
     * @param type 父级值类型
     * @param prop 当前属性名
     * @param uiControl 属性值的描述
     * @returns 插入值的代码片段
     */
    private getInsertText(prop: string, uiControl: UiControl | undefined = undefined, isArray: Boolean = false): string {
        if (/^<.*>$/.test(prop)) {
            prop = '$1';
        }
        let value = '${0}';
        if (uiControl) {
            // 如果存在默认值，则补全默认值
            if (uiControl.default) {
                value = `${uiControl.default},`;
            } else if (typeof uiControl.type === 'string') {
                switch (uiControl.type) {
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
                        // 将值作为数组补全
                        value = '[$0],';
                        break;
                    case 'enum':
                        value = '${1|' + uiControl.options + '|},';
                        break;
                    case 'Object':
                        if (uiControl.required) {
                            const result: string[] = ['{'];
                            uiControl.required.forEach((item, index, array) => {
                                let str = `\t${item.key}: ${item.value}`;
                                if (index === array.length - 1) {
                                    str += ',';
                                }
                                result.push(str);
                            });
                            result.push('},');
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
            } else if (uiControl.type?.includes('Array')) {
                value = '[$0],';
            } else if (uiControl.type?.includes('Object')) {
                if (uiControl.required) {
                    const result: string[] = ['{'];
                    uiControl.required.forEach((item, index, array) => {
                        let str = `\t${item.key}: ${item.value}`;
                        if (index === array.length - 1) {
                            str += ',';
                        }
                        result.push(str);
                    });
                    result.push('},');
                    value = result.join('\n');
                } else {
                    value = '{$0},';
                }
            }
        }
        return isArray ? value : `${prop}: ${value}`;
    }
}
