import * as vscode from 'vscode';
import * as assert from 'assert';
import Ast from '../../ast';
import { inputText, generateChangeEvent, translate } from './utils';

suite('Ast class Test Suite', () => {
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

    test('空对象中输入换行应该保持一致', async() => {
        const text = '\n';
        const actual = new Ast('/** @type EChartsOption */', document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);
        const expected = new Ast('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('空对象中输入按 Enter 键应该保持一致', async() => {
        let text = '\n    \n';
        let actual = new Ast('/** @type EChartsOption */', document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);
        let expected = new Ast('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);

        await init();
        text = '\r\n    \n';
        actual = new Ast('/** @type EChartsOption */', document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);
        expected = new Ast('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('在符合语法的位置输入单个字母应该保持一致', async() => {
        let text = [
            '',
            '    xAxis: {',
            "        type: 'category',",
            "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
            '    },',
            '    yAxis: {',
            "        type: 'value',",
            '    },',
            '    series: [',
            '        {',
            '            data: [150, 230, 224, 218, 135, 147, 260],',
            "            type: 'line',",
            '        },',
            '    ],',
            '',
        ].join('\n');
        const actual = new Ast('/** @type EChartsOption */', document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 8);
        text = 'a';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);

        const expected = new Ast('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('多次输入后应该保持一致', async() => {
        let text = [
            '',
            '    xAxis: {',
            "        type: 'category',",
            "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
            '    },',
            '    yAxis: {',
            "        type: 'value',",
            '    },',
            '    series: [',
            '        {',
            '            data: [150, 230, 224, 218, 135, 147, 260],',
            "            type: 'line',",
            '        },',
            '    ],',
            '',
        ].join('\n');
        const actual = new Ast('/** @type EChartsOption */', document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 8);
        text = 'ab';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 2);
        text = 'cd';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);

        const expected = new Ast('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('删除字符后应该保持一致', async() => {
        const text = [
            '',
            '    xAxis: {',
            "        type: 'category',",
            "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
            '    },',
            '    yAxis: {',
            "        type: 'value',",
            '    },',
            '    series: [',
            '        {',
            '            data: [150, 230, 224, 218, 135, 147, 260],',
            "            type: 'line',",
            '        },',
            '    ],',
            '',
        ].join('\n');
        const actual = new Ast('/** @type EChartsOption */', document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        actual.patch(generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 8);
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(position, position.translate(0, 2)));
        });
        actual.patch(generateChangeEvent(document, position, 2, '').contentChanges);

        const expected = new Ast('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });
});
