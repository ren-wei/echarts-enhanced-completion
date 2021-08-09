import * as vscode from 'vscode';
import { getAstNode, getOptionsRange, checkNode, getCompletionItemList } from './tools';
const espree = require('espree');

function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[]> {
    const keyword = '/** @type EChartsOption */';
    if (document.getText().includes(keyword)) {
        const rows: string[] = document.getText().split('\n');
        // 获取options的开始行和结束行
        const [startRow, endRow] = getOptionsRange(rows, keyword);
        // 不在范围内或当前行有字符，直接返回
        if (rows[position.line].trim() || position.line < startRow || position.line > endRow) {
            return [];
        }
        // 根据开始行和结束行获取表示 options 对象的字符串
        const targetRows = rows.slice(startRow, endRow);
        targetRows[0] = targetRows[0].replace(/^[^{]*/, '');
        const options = '(' + targetRows.join('\n') + ')';
        // 计算光标位置
        let index = 0;
        for (let i = 0; i < targetRows.length; i++) {
            if (i < position.line - startRow) {
                index += targetRows[i].length + 1; // 加上去掉的'\n'
            } else {
                break;
            }
        }
        // 获取光标所在的最小Ast节点和访问节点的路径记录
        const ast = espree.parse(options, { ecmaVersion: 6 });
        const expression = ast.body[0].expression;
        const [targetAst, record] = getAstNode(expression, index);
        // 判断节点是否符合要求
        if (!checkNode(targetAst)) {
            return [];
        }

        // 根据所在的位置获取补全列表
        return getCompletionItemList(expression, targetAst, record);
    }

    return [];
}

function resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
    return null;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "echarts-enhanced-completion" is now active!');

    const disposable = vscode.languages.registerCompletionItemProvider('vue', {
        provideCompletionItems,
        resolveCompletionItem
    }, '\n');

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
