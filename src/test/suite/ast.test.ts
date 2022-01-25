import * as vscode from 'vscode';
import * as assert from 'assert';
import { keyword } from '../../extension';
import ast, { init as astInit } from '../../ast';
import { translate } from './utils';

suite('Ast Module Test Suite', () => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\n');
        });
        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('空对象中输入按 Enter 键应该保持一致', async() => {
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\n    \n');
        });
        let actual = ast.getAstItems(document.uri);
        let expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);

        await init();
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\r\n    \n');
        });
        actual = ast.getAstItems(document.uri);
        expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('输入换行应该保持一致', async() => {
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\n    ');
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('在符合语法的位置输入单个字母应该保持一致', async() => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });

        position = translate(document, position, 8);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, 'a');
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('多次输入后应该保持一致', async() => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });

        position = translate(document, position, 8);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, 'ab');
        });

        position = translate(document, position, 2);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, 'cd');
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });

        position = translate(document, position, 8);
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(position, position.translate(0, 2)));
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('先写配置项再写注释应该保持一致', async() => {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: "// @ts-nocheck\nconst options = {\n    xAxis: {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n    },\n    yAxis: {\n        type: 'value',\n    },\n    series: [\n        {\n            data: [150, 230, 224, 218, 135, 147, 260],\n            type: 'line',\n        },\n    ],\n}",
        });
        textEditor = await vscode.window.showTextDocument(document);
        position = new vscode.Position(0, 14); // 光标位置

        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, '\n/** @type EChartsOption */');
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('先输入 Enter 换行，再删除至原样应该保持一致', async() => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        const oldText = document.getText();

        // 模拟输入 Enter 换行
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(13, 25), '\n            ');
        });

        let actual = ast.getAstItems(document.uri);
        let expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected, '输入 Enter 换行后没有保持一致');

        // 删除至原样
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(13, 25, 14, 12));
        });

        assert.strictEqual(document.getText(), oldText);

        actual = ast.getAstItems(document.uri);
        expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected, '删除至原样没有保持一致');
    });

    test('输入后出现错误的结束行，然后删除至原样应该保持一致', async() => {
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
            "            id: '',",
            '        },',
            '    ],',
            '',
        ].join('\n');
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });

        // 在 id: '' 中的冒号之间输入 Enter 换行
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(14, 17), '\n            ');
        });

        // 删除空格
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(15, 0, 15, 12));
        });

        // 删除换行
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(14, 17, 15, 0));
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });

    test('从下往上交换两行，应该保持一致', async() => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });

        // 从下往上交换两行，先插入第一行到后面，再删除第一行
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(13, 25), '\n            data: [150, 230, 224, 218, 135, 147, 260],');
        });
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(12, 0, 13, 0));
        });

        const actual = ast.getAstItems(document.uri);
        const expected = astInit(keyword, document);
        assert.deepStrictEqual(actual, expected);
    });
});
