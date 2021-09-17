import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';

import { provideCompletionItems } from '../../extension';

suite('Extension Completion Series Option Test Suite', async() => {
    const document = await vscode.workspace.openTextDocument(path.resolve(__dirname, '../../../src/test/template/index.js'));
    const initText = document.getText();
    const textEditor = await vscode.window.showTextDocument(document);
    const position = new vscode.Position(2, 17); // 光标位置
    const token: vscode.CancellationToken = {
        isCancellationRequested: false,
        onCancellationRequested(e) {
            return new vscode.Disposable(() => {});
        },
    };
    const content: vscode.CompletionContext = {
        triggerKind: 0,
    };

    beforeEach(async() => {
        // 将文件还原为初始状态
        const startPosition = new vscode.Position(0, 0);
        const endTextLine = document.lineAt(document.getText().split('\n').length - 1);
        const endPosition = new vscode.Position(endTextLine.lineNumber, endTextLine.text.length + 1);
        await textEditor.edit((editBuilder) => {
            editBuilder.replace(new vscode.Range(startPosition, endPosition), initText);
        });
    });

    test('顶级选项中series选项应该补全空数组', async() => {
    });

    test('空数组中应该返回所有series选项', async() => {
    });

    test('选项值应该是一个包含了必须属性和值的对象', async() => {
    });

    test("type为'line'的对象中应该返回 series-line 中所有的直接子级选项", async() => {
    });

    test('数组中已经存在的值不应该被过滤', async() => {
    });
});
