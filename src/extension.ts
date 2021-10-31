import * as vscode from 'vscode';
import Store from './store';
import Ast from './ast';
import Options from './options';
import Config from './config';

let store: Store;
let astMap: Map<vscode.Uri, Ast>;

export const collection = vscode.languages.createDiagnosticCollection('echarts-options-diagnostic');

export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null, context: vscode.CompletionContext | null = null): vscode.ProviderResult<vscode.CompletionItem[]> {
    const ast = astMap.get(document.uri);
    if (!ast?.validate) return [];
    const options = new Options(ast, store, position);
    const result = options.getCompletionItem();
    return result;
}

export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null): vscode.ProviderResult<vscode.Hover> {
    const ast = astMap.get(document.uri);
    if (!ast?.validate) return null;
    const options = new Options(ast, store, position);
    return options.getHover();
}

export function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection, textDocumentChangeEvent: vscode.TextDocumentChangeEvent | null = null): void {
    let ast: Ast;
    if (astMap.has(document.uri) && textDocumentChangeEvent) {
        ast = astMap.get(document.uri) as Ast;
        ast.patch(textDocumentChangeEvent.contentChanges);
    } else {
        const keyword = '/** @type EChartsOption */';
        ast = new Ast(keyword, document);
        astMap.set(document.uri, ast);
    }
    ast.updateDiagnostics(document.uri, collection);
}

export function start() {
    store = new Store('echarts-option', Config.language);
    astMap = new Map<vscode.Uri, Ast>();
}

export function activate(context: vscode.ExtensionContext) {
    start();
    vscode.workspace.onDidChangeConfiguration(start);

    // 自动补全
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['html', 'javascript', 'typescript', 'vue'], {
        provideCompletionItems,
    }, '\n'));

    // hover提示
    context.subscriptions.push(vscode.languages.registerHoverProvider(['html', 'javascript', 'typescript', 'vue'], {
        provideHover,
    }));

    // 配置项检查
    if (vscode.window.activeTextEditor) {
        updateDiagnostics(vscode.window.activeTextEditor.document, collection);
    }
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvent => {
        updateDiagnostics(textDocumentChangeEvent.document, collection, textDocumentChangeEvent);
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
    (store as unknown) = undefined;
}
