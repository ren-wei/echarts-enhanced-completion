import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';

import { provideCompletionItems } from '../../extension';

suite('Extension Test Suite', async() => {
    const document = await vscode.workspace.openTextDocument(path.resolve(__dirname, '../../../src/test/template/index.js'));
    const textEditor = await vscode.window.showTextDocument(document);
    let position = new vscode.Position(2, 17); // 光标位置
    const token: vscode.CancellationToken = {
        isCancellationRequested: false,
        onCancellationRequested(e) {
            return new vscode.Disposable(() => {});
        },
    };
    const content: vscode.CompletionContext = {
        triggerKind: 0,
    };

    test('test function provideCompletionItems', async() => {
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\n\n');
            position = position.translate(1);
        });
        const result = await provideCompletionItems(document, position, token, content) as vscode.CompletionItem[];
        assert.strictEqual(0, result.length);
    });
});
