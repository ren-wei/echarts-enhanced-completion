import * as vscode from 'vscode';

export const ExtensionName = 'echarts-enhanced-completion';
export const collection = vscode.languages.createDiagnosticCollection('echarts-options-diagnostic');
export const keyword = '/** @type EChartsOption */';
export const supportedLanguageList = ['html', 'javascript', 'typescript', 'vue', 'php', 'razor', 'javascriptreact', 'typescriptreact']; // 支持的语言列表

import completionDisposables from './completion';
import hoverDisposables from './hover';
import fixDisposables from './fix';

import ast, { disposables as astDisposables } from './ast';
import Diagnosis, { disposables as diagDisposables } from './diagnosis';
import { disposables as rulesDisposables } from './rules';

// 插件被启用时此方法会被调用
export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.textDocuments.forEach(document => {
        if (supportedLanguageList.includes(document.languageId)) {
            ast.getAstItem(document, new vscode.Position(0, 0));
            Diagnosis.update(document.uri, collection);
        }
    });
    context.subscriptions.push(
        ...completionDisposables,
        ...hoverDisposables,
        ...fixDisposables,
    );
}

// 插件被停用时此方法会被调用
export function deactivate() {
    [
        ...astDisposables,
        ...diagDisposables,
        ...rulesDisposables,
    ].forEach(disposable => {
        disposable.dispose();
    });
}
