import * as vscode from 'vscode';
import * as assert from 'assert';
import { start, keyword, collection, updateDiagnostics } from '../../extension';
import Ast from '../../ast';

start();

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
        updateDiagnostics(document, collection, new Ast(keyword, document));
        assert.deepStrictEqual(collection.get(document.uri), [{
            code: '',
            message: "未知的属性: 'seriesa'",
            range: new vscode.Range(10, 4, 10, 11),
            severity: vscode.DiagnosticSeverity.Warning,
            source: 'echarts-enhanced-completion',
        }]);
    });

    test('单个次级属性错误应该显示错误提示');

    test('多个属性错误应该全部显示错误提示');

    test('不存在描述列表的对象不应该显示错误提示');

    test('行内禁用注释应该让本行忽略属性错误');

    test('下行禁用注释应该让下行忽略属性错误');

    test('块级禁用注释应该让其下所有行忽略属性错误');

    test('块级启用注释应该让其下所有行启用校验属性错误');
});
