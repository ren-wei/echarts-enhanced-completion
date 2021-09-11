import * as vscode from 'vscode';
import Store from './store';
import Ast from './ast';
import Options from './options';

let store: Store;

export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[]> {
    const keyword = '/** @type EChartsOption */';
    const ast = new Ast(keyword, document, position);
    if (!ast.validate) return [];
    const options = new Options(ast, store);
    return options.getCompletionItem();
}

export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
    const keyword = '/** @type EChartsOption */';
    const ast = new Ast(keyword, document, position);
    if (!ast.validate) return null;
    const options = new Options(ast, store);
    return options.getHover();
}

export function activate(context: vscode.ExtensionContext) {
    store = new Store('echarts-options');

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['html', 'javascript', 'typescript', 'vue'], {
        provideCompletionItems,
    }, '\n'));

    context.subscriptions.push(vscode.languages.registerHoverProvider(['html', 'javascript', 'typescript', 'vue'], {
        provideHover,
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
    (store as unknown) = undefined;
}
