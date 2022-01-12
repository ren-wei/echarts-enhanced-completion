import * as vscode from 'vscode';

export const ExtensionName = 'echarts-enhanced-completion';
export const collection = vscode.languages.createDiagnosticCollection('echarts-options-diagnostic');
export const keyword = '/** @type EChartsOption */';
export const supportedLanguageList = ['html', 'javascript', 'typescript', 'vue']; // 支持的语言列表

import completionDisposables from './completion';
import hoverDisposables from './hover';
import Fix from './fix';

// 插件被启用时此方法会被调用
export function activate(context: vscode.ExtensionContext) {
    const fix = new Fix();
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(supportedLanguageList, fix, {
            providedCodeActionKinds: Fix.providedCodeActionKinds,
        }),
        ...fix.commandOwner.disposables,
        ...completionDisposables,
        ...hoverDisposables,
    );
}

import { disposables as astDisposables } from './ast';
import { disposables as diagDisposables } from './diagnosis';

// 插件被停用时此方法会被调用
export function deactivate() {
    [
        ...astDisposables,
        ...diagDisposables,
    ].forEach(disposable => {
        disposable.dispose();
    });
}
