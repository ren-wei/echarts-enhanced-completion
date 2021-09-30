import * as vscode from 'vscode';
import * as assert from 'assert';
import * as path from 'path';

import { provideCompletionItems } from '../../extension';

suite('Extension Completion Series Option Test Suite', async() => {
    let document: vscode.TextDocument;
    let textEditor: vscode.TextEditor;
    let position: vscode.Position;

    async function init() {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n};\n',
        });
        textEditor = await vscode.window.showTextDocument(document);
        position = new vscode.Position(2, 17); // 光标位置
    }

    setup(async() => {
        await init();
    });

    test('顶级选项中series选项应该补全空数组');

    test('空数组中应该返回所有series选项');

    test('选项值应该是一个包含了必须属性和值的对象');

    test("type为'line'的对象中应该返回 series-line 中所有的直接子级选项");

    test('数组中已经存在的值不应该被过滤');

    test('对象格式应该触发对应的补全');
});
