import * as vscode from 'vscode';
import * as assert from 'assert';
import ast, { init as astInit } from '../../ast';
import { generateChangeEvent, translate } from './utils';

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
        const text = '\n';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);
        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('空对象中输入按 Enter 键应该保持一致', async() => {
        let text = '\n    \n';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);
        let actual = ast.getAstItems(document.uri);
        let expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);

        await init();
        text = '\r\n    \n';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);
        actual = ast.getAstItems(document.uri);
        expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('输入换行应该保持一致', async() => {
        const text = '\n    ';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected,
            [
                '',
                document.getText(new vscode.Range(actual[0].positionAt(actual[0].expression!.start), actual[0].positionAt(actual[0].expression!.end))).split('\n').join('"\n') + '"',
                document.getText(new vscode.Range(expected[0].positionAt(expected[0].expression!.start), expected[0].positionAt(expected[0].expression!.end))).split('\n').join('"\n') + '"',
            ].join('\n')
        );
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 8);
        text = 'a';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 8);
        text = 'ab';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 2);
        text = 'cd';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
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
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        position = translate(document, position, 8);
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(position, position.translate(0, 2)));
        });
        ast.patch(document, generateChangeEvent(document, position, 2, '').contentChanges);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('先写配置项再写注释应该保持一致', async() => {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: "// @ts-nocheck\nconst options = {\n    xAxis: {\n        type: 'category',\n        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n    },\n    yAxis: {\n        type: 'value',\n    },\n    series: [\n        {\n            data: [150, 230, 224, 218, 135, 147, 260],\n            type: 'line',\n        },\n    ],\n}",
        });
        textEditor = await vscode.window.showTextDocument(document);
        position = new vscode.Position(0, 14); // 光标位置

        const text = '\n/** @type EChartsOption */';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected,
            [
                '',
                document.getText(new vscode.Range(actual[0].positionAt(actual[0].expression!.start), actual[0].positionAt(actual[0].expression!.end))).split('\n').join('"\n') + '"',
                document.getText(new vscode.Range(expected[0].positionAt(expected[0].expression!.start), expected[0].positionAt(expected[0].expression!.end))).split('\n').join('"\n') + '"',
            ].join('\n')
        );
    });

    test('先输入 Enter 换行，再删除至原样应该保持一致', async() => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);
        const oldText = document.getText();

        // 模拟输入 Enter 换行
        text = '\n            ';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(13, 25), text);
        });
        ast.patch(document, [{
            range: new vscode.Range(13, 25, 13, 25),
            rangeLength: 0,
            rangeOffset: 318,
            text: text,
        }]);

        let actual = ast.getAstItems(document.uri);
        let expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected, '输入 Enter 换行后没有保持一致');

        // 删除至原样
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(13, 25, 14, 12));
        });
        ast.patch(document, [{
            range: new vscode.Range(13, 25, 14, 12),
            rangeLength: 13,
            rangeOffset: 318,
            text: '',
        }]);

        assert.strictEqual(document.getText(), oldText);

        actual = ast.getAstItems(document.uri);
        expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected, '删除至原样没有保持一致');
    });

    test('输入后出现错误的结束行，然后删除至原样应该保持一致', async() => {
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
            "            id: '',",
            '        },',
            '    ],',
            '',
        ].join('\n');
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        // 在 id: '' 中的冒号之间输入 Enter 换行
        position = new vscode.Position(14, 17);
        text = '\n            ';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        // 删除空格
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(15, 0, 15, 12));
        });
        ast.patch(document, [{
            range: new vscode.Range(15, 0, 15, 12),
            rangeLength: 12,
            rangeOffset: 352,
            text: '',
        }]);

        // 删除换行
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(14, 17, 15, 0));
        });
        ast.patch(document, [{
            range: new vscode.Range(14, 17, 15, 0),
            rangeLength: 2,
            rangeOffset: 350,
            text: '',
        }]);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });

    test('从下往上交换两行，应该保持一致', async() => {
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
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(position, text);
        });
        ast.patch(document, generateChangeEvent(document, position, 0, text).contentChanges);

        // 从下往上交换两行，先插入第一行到后面，再删除第一行
        text = '\n            data: [150, 230, 224, 218, 135, 147, 260],';
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(13, 25), text);
        });
        await textEditor.edit((editBuilder) => {
            editBuilder.delete(new vscode.Range(12, 0, 13, 0));
        });
        ast.patch(document, [
            {
                range: new vscode.Range(12, 0, 13, 0),
                rangeLength: 55,
                rangeOffset: 238,
                text: '',
            },
            {
                range: new vscode.Range(13, 25, 13, 25),
                rangeLength: 0,
                rangeOffset: 318,
                text: text,
            },
        ]);

        const actual = ast.getAstItems(document.uri);
        const expected = astInit('/** @type EChartsOption */', document);
        assert.deepStrictEqual(actual, expected);
    });
});
