import * as vscode from 'vscode';
import { getOptionType, getOptionDesc } from './store';

export function getCompletionItemListInArray(root: AstNode, node: AstNode, record: RecordItem[]): vscode.CompletionItem[] {
    if (record.length === 2 && record[0].key === 'properties' && record[1].key === 'value') {
        const name = root.properties[record[0].index as number].key.name;
        const typeMsgList = getOptionType();
        const descObject = getOptionDesc([], node);
        return Object.keys(descObject).filter(key => key.includes(name)).map((name, index) => {
            const typeMsg = typeMsgList.find(item => item.prop === name);
            const typeOfValue = typeMsg?.type || descObject[name].uiControl?.type;
            return {
                label: {
                    label: name,
                    description: typeOfValue,
                },
                kind: vscode.CompletionItemKind.Property,
                detail: 'echarts options',
                preselect: true,
                documentation: new vscode.MarkdownString(descObject[name].desc),
                sortText: String(index).length > 1 ? String(index) : '0' + String(index),
                insertText: new vscode.SnippetString(`${getInsertValue(name)},`),
            };
        });
    }
    return [];
}

/** 获取需要插入的代码片段的值部分 */
function getInsertValue(prop: string): string {
    return [
        '{',
        `\ttype: '${prop.split('-')[1]}',$0`,
        '}',
    ].join('\n');
}
