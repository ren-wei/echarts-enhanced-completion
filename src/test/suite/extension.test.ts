import * as vscode from 'vscode';
import * as assert from 'assert';

import { start, updateDiagnostics, collection, provideCompletionItems, provideHover } from '../../extension';
import { getFileData, getFileArrayData, inputText } from './utils';

start();

suite('Extension Completion Base Test Suite', () => {
    let document: vscode.TextDocument;
    let textEditor: vscode.TextEditor;
    let position: vscode.Position;

    async function init() {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n};\n',
        });
        textEditor = await vscode.window.showTextDocument(document);
        updateDiagnostics(document, collection);
        position = new vscode.Position(2, 17); // 光标位置
    }

    setup(async() => {
        await init();
    });

    test('test function inputText', async() => {
        position = await inputText(['\n', ''], textEditor, position);
        assert.strictEqual(document.getText().replaceAll('\r\n', '\n'), '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n\n};\n');
        assert.strictEqual(document.getText(new vscode.Range(new vscode.Position(0, 0), position)).replaceAll('\r\n', '\n'), '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n');

        await init();
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLine: {',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        assert.strictEqual(document.getText().replaceAll('\r\n', '\n'), '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n    angleAxis: {\n        axisLine: {\n            \n        }\n    }\n};\n');
        assert.strictEqual(document.getText(new vscode.Range(new vscode.Position(0, 0), position)).replaceAll('\r\n', '\n'), '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n    angleAxis: {\n        axisLine: {\n            ');

        await init();
        position = await inputText([[
            '',
            '    angle',
        ].join('\n'), [
            'Axis: {',
            '        axisLine: {',
            '            ',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        assert.strictEqual(document.getText().replaceAll('\r\n', '\n'), '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n    angleAxis: {\n        axisLine: {\n            \n        }\n    }\n};\n');
        assert.strictEqual(document.getText(new vscode.Range(new vscode.Position(0, 0), position)).replaceAll('\r\n', '\n'), '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n    angle');
    });

    test('空对象应该根据设置返回所有初始化选项和所有顶级选项', async() => {
        await vscode.workspace.getConfiguration().update('echarts-enhanced-completion.language', '中文', true);
        position = await inputText(['\n', ''], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const indexDescMsg = getFileData('index');
        const init = getFileArrayData();
        const initEnabled = vscode.workspace.getConfiguration().get('echarts-enhanced-completion.init.enabled');
        if (initEnabled) {
            assert.strictEqual(result.length, Object.keys(indexDescMsg).length + init.length);
        } else {
            assert.strictEqual(result.length, Object.keys(indexDescMsg).length);
        }
        Object.entries(indexDescMsg).forEach(([key, descMsg]) => {
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === key);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString)?.value || '', descMsg.desc);
        });
        if (initEnabled) {
            init.forEach(item => {
                const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === item.name);
                assert.ok(target);
                assert.strictEqual((target.label as vscode.CompletionItemLabel).description, item.title);
            });
        }
        await vscode.workspace.getConfiguration().update('echarts-enhanced-completion.language', 'auto', true);
    });

    test('对应层级的选项应该只包含对应的所有选项', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLine: {',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const angleAxisDescMsg = getFileData('angleAxis');
        assert.strictEqual(result.length, 5);
        ['show', 'symbol', 'symbolSize', 'symbolOffset', 'lineStyle'].forEach(key => {
            const descMsg = angleAxisDescMsg[`axisLine.${key}`];
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === key);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });
    });

    test('选项中应该过滤已存在的属性', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLine: {',
            '            symbol: "none",',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const angleAxisDescMsg = getFileData('angleAxis');
        assert.strictEqual(result.length, 4);
        assert.ok(!result.find(v => (v.label as vscode.CompletionItemLabel).label === 'symbol'));
        ['show', 'symbolSize', 'symbolOffset', 'lineStyle'].forEach(key => {
            const descMsg = angleAxisDescMsg[`axisLine.${key}`];
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === key);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });
    });

    test('多个被标记的对象中的每一个都应该能够触发补全', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLine: {',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    },',
            '}',
            '/** @type EChartsOption */',
            'const options1 = {',
            '    angleAxis: {',
            '    }',
        ].join('\n')], textEditor, position);
        let result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const angleAxisDescMsg = getFileData('angleAxis');
        assert.strictEqual(result.length, 5);
        ['show', 'symbol', 'symbolSize', 'symbolOffset', 'lineStyle'].forEach(key => {
            const descMsg = angleAxisDescMsg[`axisLine.${key}`];
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === key);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });

        await init();
        position = await inputText([[
            '',
            '    angleAxis: {',
            '    },',
            '}',
            '/** @type EChartsOption */',
            'const options1 = {',
            '    angleAxis: {',
            '        axisLine: {',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, 5);
        ['show', 'symbol', 'symbolSize', 'symbolOffset', 'lineStyle'].forEach(key => {
            const descMsg = angleAxisDescMsg[`axisLine.${key}`];
            const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === key);
            assert.ok(target);
            assert.strictEqual((target.documentation as vscode.MarkdownString).value, descMsg.desc);
        });
    });

    test('存在默认值的选项应该补全默认值', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLine: {',
            '            ',
        ].join('\n'), [
            '',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'show');
        assert.ok(target);
        assert.strictEqual(((target as vscode.CompletionItem).insertText as vscode.SnippetString).value, 'show: true,');
    });

    test('值为数组的选项应该补全空数组', async() => {
        position = await inputText(['\n', ''], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'color');
        assert.ok(target);
        assert.strictEqual(((target as vscode.CompletionItem).insertText as vscode.SnippetString).value, 'color: [$0],');
    });

    test('值为对象的选项应该补全空对象', async() => {
        position = await inputText(['\n', ''], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'title');
        assert.ok(target);
        assert.strictEqual(((target as vscode.CompletionItem).insertText as vscode.SnippetString).value, 'title: {$0},');
    });

    test('值为字符串的选项应该补全空字符串', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        ',
        ].join('\n'), [
            '',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'id');
        assert.ok(target);
        assert.strictEqual(((target as vscode.CompletionItem).insertText as vscode.SnippetString).value, "id: '$0',");
    });

    test('值为枚举的选项应该补全带有枚举的代码片段', async() => {
        position = await inputText(['\n', ''], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'animationEasing');
        assert.ok(target);
        assert.strictEqual(((target as vscode.CompletionItem).insertText as vscode.SnippetString).value, "animationEasing: ${1|'linear','quadraticIn','quadraticOut','quadraticInOut','cubicIn','cubicOut','cubicInOut','quarticIn','quarticOut','quarticInOut','quinticIn','quinticOut','quinticInOut','sinusoidalIn','sinusoidalOut','sinusoidalInOut','exponentialIn','exponentialOut','exponentialInOut','circularIn','circularOut','circularInOut','elasticIn','elasticOut','elasticInOut','backIn','backOut','backInOut','bounceIn','bounceOut','bounceInOut'|},");
    });

    test('"type"为"percent"的选项应该作为字符串补全', async() => {
        position = await inputText([[
            '',
            '    calendar: {',
            '        ',
        ].join('\n'), [
            '',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'left');
        assert.ok(target);
        assert.strictEqual((target.insertText as vscode.SnippetString).value, "left: '0%',");
    });

    test('"type"为"color"的选项应该作为字符串补全', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLine: {',
            '            lineStyle: {',
            '                ',
        ].join('\n'), [
            '',
            '            }',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        const target = result.find(v => (v.label as vscode.CompletionItemLabel).label === 'color');
        assert.ok(target);
        assert.strictEqual((target.insertText as vscode.SnippetString).value, "color: '$0',");
    });

    test('普通数组值中不应该触发补全', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        data: [',
            '            ',
        ].join('\n'), [
            '',
            '        ]',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, 0);
    });

    test('命名属性应该由用户自行填写', async() => {
        // 满足 /^<.*>$/.test(prop) 的属性为命名属性
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLabel: {',
            '            rich: {',
        ].join('\n'), [
            '',
            '            }',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, 1);
        const target = result[0];
        assert.strictEqual((target.label as vscode.CompletionItemLabel).label, '<style_name>');
        assert.strictEqual((target.insertText as vscode.SnippetString).value, '$1: {$0},');
    });

    test('命名属性中应该正常触发补全', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLabel: {',
            '            rich: {',
            '                a: {',
        ].join('\n'), [
            '',
            '                }',
            '            }',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideCompletionItems(document, position) as vscode.CompletionItem[];
        assert.strictEqual(result.length, 29);
        const angleAxisDescMsg = getFileData('angleAxis');
        const target = result[0];
        assert.strictEqual((target.label as vscode.CompletionItemLabel).label, 'color');
        assert.strictEqual((target.documentation as vscode.MarkdownString).value, angleAxisDescMsg['axisLabel.rich.<style_name>.color'].desc);
        assert.strictEqual((target.insertText as vscode.SnippetString).value, 'color: null,');
    });
});

suite('Extension Hover Base Test Suite', () => {
    let document: vscode.TextDocument;
    let textEditor: vscode.TextEditor;
    let position: vscode.Position;

    async function init() {
        document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: '// @ts-nocheck\n/** @type EChartsOption */\nconst options = {\n};\n',
        });
        textEditor = await vscode.window.showTextDocument(document);
        updateDiagnostics(document, collection);
        position = new vscode.Position(2, 17); // 光标位置
    }

    setup(async() => {
        await init();
    });

    test('顶级选项应该显示提示', async() => {
        position = await inputText([[
            '',
            '    angle',
        ].join('\n'), [
            'Axis: {',
            '        axisLine: {',
            '            ',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideHover(document, position);
        const indexDescMsg = getFileData('index');
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, indexDescMsg.angleAxis.desc);
    });

    test('次级选项应该显示提示', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axis',
        ].join('\n'), [
            'Line: {',
            '            ',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideHover(document, position);
        const angleAxisDescMsg = getFileData('angleAxis');
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, angleAxisDescMsg.axisLine.desc);
    });

    test('指向第一个字符应该显示提示', async() => {
        position = await inputText([[
            '',
            '    ',
        ].join('\n'), [
            'angleAxis: {',
            '        axisLine: {',
            '            ',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideHover(document, position);
        const indexDescMsg = getFileData('index');
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, indexDescMsg.angleAxis.desc);
    });

    test('指向最后一个字符应该显示提示', async() => {
        position = await inputText([[
            '',
            '    angleAxis',
        ].join('\n'), [
            ': {',
            '        axisLine: {',
            '            ',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideHover(document, position);
        const indexDescMsg = getFileData('index');
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, indexDescMsg.angleAxis.desc);
    });

    test('多个被标记的对象中的每一个都应该能够Hover显示提示', async() => {
        position = await inputText([[
            '',
            '    angle',
        ].join('\n'), [
            'Axis: {',
            '        axisLine: {',
            '            ',
            '        }',
            '    },',
            '}',
            '/** @type EChartsOption */',
            'const options1 = {',
            '    angleAxis: {',
            '    }',
        ].join('\n')], textEditor, position);
        let result = await provideHover(document, position);
        const indexDescMsg = getFileData('index');
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, indexDescMsg.angleAxis.desc);

        await init();
        position = await inputText([[
            '',
            '    angleAxis: {',
            '    },',
            '}',
            '/** @type EChartsOption */',
            'const options1 = {',
            '    angle',
        ].join('\n'), [
            'Axis: {',
            '        axisLine: {',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        result = await provideHover(document, position);
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, indexDescMsg.angleAxis.desc);
    });

    test('命名属性中的属性应该能够Hover显示提示', async() => {
        position = await inputText([[
            '',
            '    angleAxis: {',
            '        axisLabel: {',
            '            rich: {',
            '                a: {',
            '                    co',
        ].join('\n'), [
            'lor: null',
            '                }',
            '            }',
            '        }',
            '    }',
        ].join('\n')], textEditor, position);
        const result = await provideHover(document, position);
        const angleAxisDescMsg = getFileData('angleAxis');
        assert.ok(result);
        assert.strictEqual(result.contents.length, 1);
        assert.strictEqual((result.contents[0] as vscode.MarkdownString).value, angleAxisDescMsg['axisLabel.rich.<style_name>.color'].desc);
    });
});
