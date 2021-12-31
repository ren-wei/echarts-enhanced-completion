import * as vscode from 'vscode';
import * as assert from 'assert';
import Diagnosis from '../../diagnosis';

suite('Diagnosis class Test Suite', async() => {
    let document: vscode.TextDocument;
    let textEditor: vscode.TextEditor;

    async function init() {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n};\n',
        });
        textEditor = await vscode.window.showTextDocument(document);
    }

    setup(async() => {
        await init();
    });

    test('单个顶级属性错误应该显示错误提示');

    test('单个次级属性错误应该显示错误提示');

    test('多个属性错误应该全部显示错误提示');

    test('不存在描述列表的对象不应该显示错误提示');

    test('行内禁用注释应该让本行忽略属性错误');

    test('下行禁用注释应该让下行忽略属性错误');

    test('块级禁用注释应该让其下所有行忽略属性错误');

    test('块级启用注释应该让其下所有行启用校验属性错误');
});
