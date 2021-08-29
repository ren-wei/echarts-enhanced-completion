import * as vscode from 'vscode';
import Store from './store';
import Ast from './ast';
import Options from './options';

let store: Store;

export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[]> {
    const keyword = '/** @type EChartsOption */';
    const ast = new Ast(keyword, document, position);
    if (!ast.validate) return [];
    const options = new Options(ast.expression as AstNode, ast.minAst as AstNode, ast.record, store);
    return options.completionItems;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "echarts-enhanced-completion" is now active!');

    store = new Store();

    const disposable = vscode.languages.registerCompletionItemProvider('vue', {
        provideCompletionItems,
    }, '\n');

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    (store as unknown) = undefined;
}
