import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';

import { start, provideCompletionItems } from '../../extension';

start();

suite('Extension Completion Base Test Suite', () => {
    let document: vscode.TextDocument;
    let textEditor: vscode.TextEditor;
    let position: vscode.Position;
    let initText: string;
    const token: vscode.CancellationToken = {
        isCancellationRequested: false,
        onCancellationRequested(e) {
            return new vscode.Disposable(() => {});
        },
    };
    const content: vscode.CompletionContext = {
        triggerKind: 0,
    };

    setup(async() => {
        const uri = vscode.Uri.file(path.resolve(__dirname, '../../../src/test/template/index.js'));
        textEditor = await vscode.window.showTextDocument(uri);
        document = textEditor.document;
        if (!initText) initText = document.getText();
        position = new vscode.Position(2, 17); // 光标位置
        // 将内容还原为初始状态
        const startPosition = new vscode.Position(0, 0);
        const endTextLine = document.lineAt(document.getText().split('\n').length - 1);
        const endPosition = new vscode.Position(endTextLine.lineNumber, endTextLine.text.length + 1);
        await textEditor.edit((editBuilder) => {
            editBuilder.replace(new vscode.Range(startPosition, endPosition), initText);
        });
    });

    test('空对象应该返回所有顶级选项', async() => {
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\n\n');
            position = position.translate(1);
        });
        const result = await provideCompletionItems(document, position, token, content) as vscode.CompletionItem[];
        assert.strictEqual(43, result.length);
    });

    test('对应层级的选项应该只包含对应的所有选项', async() => {
    });

    test('选项中应该过滤已存在的属性', async() => {
    });

    test('多个被标记的对象中的每一个都应该能够触发补全', async() => {
    });

    test('存在默认值的选项应该补全默认值', async() => {
    });

    test('值为数组的选项应该补全空数组', async() => {
    });

    test('值为对象的选项应该补全空对象', async() => {
    });

    test('值为字符串的选项应该补全空字符串', async() => {
    });

    test('值为枚举的选项应该补全带有枚举的代码片段', async() => {
    });

    test('普通数组值中不应该触发补全', async() => {
    });
});
