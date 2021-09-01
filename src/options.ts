import * as vscode from 'vscode';
import Store from './store';

export default class Options {
    public completionItems: vscode.CompletionItem[] = [];
    private type: string;
    private store: Store;

    constructor(root: AstNode, node: AstNode, record: RecordItem[], store: Store) {
        this.store = store;
        this.type = node.type;
        if (node.type === 'ObjectExpression') {
            this.setCompletionItemListInObject(root, node, record);
        } else if (node.type === 'ArrayExpression') {
            this.setCompletionItemListInArray(root, node, record);
        }
    }

    private setCompletionItemListInObject(root: AstNode, node: AstNode, record: RecordItem[]) {
        // 根据 record 获取对应的 key
        const key: string[] = [];
        if (record.length) {
            let targetNode = root;
            for (let i = 0; i < record.length; i++) {
                switch (record[i].key) {
                    case 'properties':
                        targetNode = targetNode.properties[record[i].index as number];
                        key.push(targetNode.key.name);
                        break;
                    case 'value':
                        targetNode = targetNode.value;
                        break;
                    case 'elements':
                        targetNode = targetNode.elements[record[i].index as number];
                        break;
                    default:
                        return [];
                }
            }
        }

        const descObject = this.store.getOptionDesc(key, node);
        this.completionItems = this.filterOptions(descObject, node).map((name, index) => {
            const typeOfValue = descObject[name].uiControl?.type;
            return {
                label: {
                    label: name,
                    description: String(typeOfValue || ''),
                },
                kind: vscode.CompletionItemKind.Property,
                detail: 'echarts options',
                preselect: true,
                documentation: new vscode.MarkdownString(descObject[name].desc),
                sortText: String(index).length > 1 ? String(index) : '0' + String(index),
                insertText: new vscode.SnippetString(`${name.split('-')[0]}: ${this.getInsertValue(name, undefined, descObject[name].uiControl)},`),
            };
        });
    }

    private setCompletionItemListInArray(root: AstNode, node: AstNode, record: RecordItem[]) {
        if (record.length === 2 && record[0].key === 'properties' && record[1].key === 'value') {
            const name = root.properties[record[0].index as number].key.name;
            const descObject = this.store.getOptionDesc([], node);
            this.completionItems = Object.keys(descObject).filter(key => key.includes(name)).map((name, index) => {
                const typeOfValue = descObject[name].uiControl?.type;
                return {
                    label: {
                        label: name,
                        description: String(typeOfValue || ''),
                    },
                    kind: vscode.CompletionItemKind.Property,
                    detail: 'echarts options',
                    preselect: true,
                    documentation: new vscode.MarkdownString(descObject[name].desc),
                    sortText: String(index).length > 1 ? String(index) : '0' + String(index),
                    insertText: new vscode.SnippetString(`${this.getInsertValue(name)},`),
                };
            });
        }
    }

    /** 过滤出现在node中的选项，返回允许的选项列表 */
    private filterOptions(descObject: DescMsgObject, node: AstNode): string[] {
        let hasKey: string[] = [];
        if (node.type === 'ObjectExpression') {
            hasKey = node.properties.map(v => v.key.name);
        }
        return Object.keys(descObject).filter(key => {
            return !hasKey.some(str => key.includes(str));
        });
    }

    /** 获取需要插入的代码片段的值部分 */
    private getInsertValue(prop: string, typeMsg: TypeMsg | undefined = undefined, uiControl: UiControl | undefined = undefined): string {
        if (this.type === 'ArrayExpression') {
            return [
                '{',
                `\ttype: '${prop.split('-')[1]}',$0`,
                '}',
            ].join('\n');
        }
        if (prop.includes('-')) {
            return [
                '[',
                '\t{',
                `\t\ttype: '${prop.split('-')[1]}',$0`,
                '\t}',
                ']',
            ].join('\n');
        }
        if (uiControl) {
            let defaultValue = uiControl.default;
            if (uiControl.type === 'vector' && defaultValue) {
                defaultValue = '[' + defaultValue + ']';
            }
            if (uiControl.options) {
                return '\'${1|' + uiControl.options + '|}\'';
            } else if (defaultValue) {
                return defaultValue;
            }
        }
        // if (typeMsg) {
        //     if (typeMsg.isObject) {
        //         return '{$0}';
        //     } else if (typeMsg.isArray) {
        //         return '[$0]';
        //     } else if (typeMsg.default) {
        //         return '${0:' + typeMsg.default + '}';
        //     } else if (typeMsg && typeMsg.type === 'boolean') {
        //         return '${1|true,false|}';
        //     }
        // }
        return '${0}';
    }
}
