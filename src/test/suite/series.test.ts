import * as vscode from 'vscode';
import * as assert from 'assert';

import { provideCompletionItems, updateHandler, collection } from '../../extension';
import { getFileData, inputText, findTree } from './utils';

suite('Extension Completion Series Option Test Suite', async() => {
    let document: vscode.TextDocument;
    let textEditor: vscode.TextEditor;
    let position: vscode.Position;

    const seriesDescMsg = getFileData('series');

    async function init() {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n};\n',
        });
        textEditor = await vscode.window.showTextDocument(document);
        updateHandler(document, collection);
        position = new vscode.Position(2, 17); // 光标位置
    }

    setup(async() => {
        await init();
    });

    test('顶级选项中series选项应该补全空数组', async() => {
        position = await inputText(['\n', ''], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'series');
        assert.ok(target);
        assert.strictEqual((target.insertText as vscode.SnippetString).value, 'series: [$0],');
    });

    test('空数组中应该返回所有series选项', async() => {
        position = await inputText([[
            '',
            '    series: [',
            '        ',
        ].join('\n'), [
            '',
            '    ]',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, seriesDescMsg.length);
        seriesDescMsg.forEach(descMsg => {
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === descMsg.name);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });
    });

    test('选项值应该是一个包含了必须属性和值的对象', async() => {
        position = await inputText([[
            '',
            '    series: [',
            '        ',
        ].join('\n'), [
            '',
            '    ]',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, seriesDescMsg.length);
        seriesDescMsg.forEach(descMsg => {
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === descMsg.name);
            assert.ok(target);
            assert.strictEqual((target.insertText as vscode.SnippetString).value, `{\n\ttype: ${descMsg.required![0].value},\n},`);
        });
    });

    test("type为'line'的对象中应该返回 series-line 中所有的直接子级选项", async() => {
        position = await inputText([[
            '',
            '    series: [',
            '        {',
            '            type: "line",',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    ]',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const seriesLineDescMsg = getFileData('series.line');
        assert.strictEqual(result.length, seriesLineDescMsg.length - 1);
        seriesLineDescMsg.filter(item => item.name !== 'type').forEach(descMsg => {
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === descMsg.name);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });
    });

    test('数组中已经存在的值不应该被过滤', async() => {
        position = await inputText([[
            '',
            '    series: [',
            '        {',
            '            type: "line",',
            '        },',
            '        ',
        ].join('\n'), [
            '',
            '    ]',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, seriesDescMsg.length);
        seriesDescMsg.forEach(descMsg => {
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === descMsg.name);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
            assert.strictEqual((target.insertText as vscode.SnippetString).value, `{\n\ttype: ${descMsg.required![0].value},\n},`);
        });
    });

    test('对象格式应该触发对应的补全', async() => {
        position = await inputText([[
            '',
            '    series: {',
            '        type: "line",',
            '        ',
        ].join('\n'), [
            '',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const seriesLineDescMsg = getFileData('series.line');
        assert.strictEqual(result.length, seriesLineDescMsg.length - 1);
        seriesLineDescMsg.filter(item => item.name !== 'type').forEach(descMsg => {
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === descMsg.name);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });
    });
});
