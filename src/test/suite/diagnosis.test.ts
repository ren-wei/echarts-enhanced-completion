import * as vscode from 'vscode';
import * as assert from 'assert';
import { ExtensionName, collection } from '../../extension';
import localize from '../../localize';
import Diagnosis from '../../diagnosis';

suite('Diagnosis class Test Suite', () => {
    test('单个顶级属性错误应该显示错误提示', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        type: 'category',",
                "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
                '    },',
                '    yAxis: {',
                "        type: 'value',",
                '    },',
                '    seriesa: [',
                '        {',
                '            data: [150, 230, 224, 218, 135, 147, 260],',
                "            type: 'line',",
                '        },',
                '    ],',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [{
            code: 'series',
            message: localize('message.unknown-property', 'seriesa', 'EChartsOption') + localize('message.fix-unknown-property', 'series'),
            range: new vscode.Range(10, 4, 10, 11),
            severity: vscode.DiagnosticSeverity.Warning,
            source: ExtensionName,
        }]);
    });

    test('单个次级属性错误应该显示错误提示', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        typa: 'category',",
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
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [{
            code: undefined,
            message: localize('message.unknown-property', 'typa', 'EChartsOption'),
            range: new vscode.Range(4, 8, 4, 12),
            severity: vscode.DiagnosticSeverity.Warning,
            source: ExtensionName,
        }]);
    });

    test('多个属性错误应该全部显示错误提示', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        type: 'category',",
                "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
                '    },',
                '    yAis: {',
                "        type: 'value',",
                '    },',
                '    series: [',
                '        {',
                '            date: [150, 230, 224, 218, 135, 147, 260],',
                "            type: 'line',",
                '        },',
                '    ],',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [
            {
                code: 'yAxis',
                message: localize('message.unknown-property', 'yAis', 'EChartsOption') + localize('message.fix-unknown-property', 'yAxis'),
                range: new vscode.Range(7, 4, 7, 8),
                severity: vscode.DiagnosticSeverity.Warning,
                source: ExtensionName,
            },
            {
                code: undefined,
                message: localize('message.unknown-property', 'date', 'EChartsOption'),
                range: new vscode.Range(12, 12, 12, 16),
                severity: vscode.DiagnosticSeverity.Warning,
                source: ExtensionName,
            },
        ]);
    });

    test('列表中的对象应该显示错误提示', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                '        data: [{',
                "            valuea: '周一',",
                '            textStyle: {',
                '                fontSize: 20,',
                "                color: 'red'",
                '            }',
                '        }],',
                '    },',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [{
            code: 'value',
            message: localize('message.unknown-property', 'valuea', 'EChartsOption') + localize('message.fix-unknown-property', 'value'),
            range: new vscode.Range(5, 12, 5, 18),
            severity: vscode.DiagnosticSeverity.Warning,
            source: ExtensionName,
        }]);
    });

    test('行内禁用注释应该让本行忽略属性错误', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        type: 'category',",
                "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
                '    },',
                '    yAis: { // echarts-disable-line',
                "        type: 'value',",
                '    },',
                '    series: [',
                '        {',
                '            date: [150, 230, 224, 218, 135, 147, 260],',
                "            type: 'line',",
                '        },',
                '    ],',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [
            {
                code: undefined,
                message: localize('message.unknown-property', 'date', 'EChartsOption'),
                range: new vscode.Range(12, 12, 12, 16),
                severity: vscode.DiagnosticSeverity.Warning,
                source: ExtensionName,
            },
        ]);
    });

    test('下行禁用注释应该让下行忽略属性错误', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        type: 'category',",
                "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
                '    },',
                '    // echarts-disable-next-line',
                '    yAis: {',
                "        type: 'value',",
                '    },',
                '    series: [',
                '        {',
                '            date: [150, 230, 224, 218, 135, 147, 260],',
                "            type: 'line',",
                '        },',
                '    ],',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [
            {
                code: undefined,
                message: localize('message.unknown-property', 'date', 'EChartsOption'),
                range: new vscode.Range(13, 12, 13, 16),
                severity: vscode.DiagnosticSeverity.Warning,
                source: ExtensionName,
            },
        ]);
    });

    test('块级禁用注释应该让其下所有行忽略属性错误', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        type: 'category',",
                "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
                '    },',
                '    // echarts-disable',
                '    yAis: {',
                "        type: 'value',",
                '    },',
                '    series: [',
                '        {',
                '            date: [150, 230, 224, 218, 135, 147, 260],',
                "            type: 'line',",
                '        },',
                '    ],',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), []);
    });

    test('块级启用注释应该让其下所有行启用校验属性错误', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    xAxis: {',
                "        type: 'category',",
                "        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],",
                '    },',
                '    // echarts-disable',
                '    yAis: {',
                "        type: 'value',",
                '    },',
                '    // echarts-enable',
                '    series: [',
                '        {',
                '            date: [150, 230, 224, 218, 135, 147, 260],',
                "            type: 'line',",
                '        },',
                '    ],',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), [
            {
                code: undefined,
                message: localize('message.unknown-property', 'date', 'EChartsOption'),
                range: new vscode.Range(14, 12, 14, 16),
                severity: vscode.DiagnosticSeverity.Warning,
                source: ExtensionName,
            },
        ]);
    });

    test('rich 下的 <style_name> 不应该校验是否存在', async() => {
        const document = await vscode.workspace.openTextDocument({
            language: 'javascript',
            content: [
                '// @ts-nocheck',
                '/** @type EChartsOption */',
                'const options = {',
                '    title: {',
                '        textStyle: {',
                '            rich: {',
                '                abc: {',
                '                    color: "#fff",',
                '                },',
                '            },',
                '        }',
                '    },',
                '};',
                '',
            ].join('\n'),
        });
        Diagnosis.update(document.uri, collection);
        assert.deepStrictEqual(collection.get(document.uri), []);
    });
});
