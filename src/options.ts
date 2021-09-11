import * as vscode from 'vscode';
import Store from './store';

export default class Options {
    private descObject: DescMsgObject = {};
    private store: Store;
    private keys: string[] = [];
    private root: AstNode;
    private node: AstNode;
    private record: RecordItem[];

    constructor(root: AstNode, node: AstNode, record: RecordItem[], store: Store) {
        this.store = store;
        this.root = root;
        this.node = node;
        this.record = record;
        this.parse();
    }

    public getCompletionItem(): vscode.CompletionItem[] {
        this.descObject = this.store.getOptionDesc(this.keys);
        return this.filterOptions(this.descObject, this.node).map((name, index) => {
            const typeOfValue = this.descObject[name].uiControl?.type;
            return {
                label: {
                    label: name,
                    description: String(typeOfValue || ''),
                },
                kind: vscode.CompletionItemKind.Property,
                detail: 'echarts options',
                preselect: true,
                documentation: new vscode.MarkdownString(this.descObject[name].desc),
                sortText: String(index).length > 1 ? String(index) : '0' + String(index),
                insertText: new vscode.SnippetString(`${name.split('-')[0]}: ${this.getInsertValue(name, this.descObject[name].uiControl)},`),
            };
        });
    }

    public getHover(): vscode.Hover | null {
        if (this.record.length && this.record[this.record.length - 1].key === 'key') {
            this.descObject = this.store.getOptionDesc(this.keys.slice(0, -1));
            return new vscode.Hover(new vscode.MarkdownString(this.descObject[this.node.name].desc));
        }
        return null;
    }

    private parse() {
        // 根据 record 获取对应的 key
        if (this.record.length) {
            let targetNode = this.root;
            let breakLoop = false;
            for (let i = 0; i < this.record.length; i++) {
                switch (this.record[i].key) {
                    case 'properties':
                        targetNode = targetNode.properties[this.record[i].index as number];
                        this.keys.push(targetNode.key.name);
                        break;
                    case 'value':
                        targetNode = targetNode.value;
                        break;
                    case 'elements':
                        targetNode = targetNode.elements[this.record[i].index as number];
                        break;
                    default:
                        breakLoop = true;
                }
                if (breakLoop) break;
            }
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
    private getInsertValue(prop: string, uiControl: UiControl | undefined = undefined): string {
        if (this.node.type === 'ArrayExpression') {
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
            if (uiControl.type === 'Object') {
                return '{$0}';
            }
            if (uiControl.type === 'Array') {
                return '[$0]';
            }
            if (uiControl.options) {
                return '\'${1|' + uiControl.options + '|}\'';
            } else if (defaultValue) {
                return defaultValue;
            }
        }
        return '${0}';
    }
}
