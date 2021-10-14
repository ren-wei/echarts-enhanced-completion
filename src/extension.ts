import * as vscode from 'vscode';
import Store from './store';
import Ast from './ast';
import Options from './options';
import Config from './config';

let store: Store;
let curTextDocumentChangeEvent: vscode.TextDocumentChangeEvent | null = null;
const collection = vscode.languages.createDiagnosticCollection('echarts-options-diagnostic');
let timer: NodeJS.Timeout | null = null;

export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null, context: vscode.CompletionContext | null = null): vscode.ProviderResult<vscode.CompletionItem[]> {
    const keyword = '/** @type EChartsOption */';
    const ast = new Ast(keyword, document, position);
    if (!ast.validate) return [];
    const options = new Options(ast, store);
    return options.getCompletionItem();
}

export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null): vscode.ProviderResult<vscode.Hover> {
    const keyword = '/** @type EChartsOption */';
    const ast = new Ast(keyword, document, position);
    if (!ast.validate) return null;
    const options = new Options(ast, store);
    return options.getHover();
}

export function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    // TODO: 下面是示例，需要更改
    if (document) {
        collection.set(document.uri, [{
            code: 'xAxis',
            message: 'cannot assign twice to immutable variable `x`',
            range: new vscode.Range(new vscode.Position(3, 5), new vscode.Position(3, 9)),
            severity: vscode.DiagnosticSeverity.Warning,
            source: 'echarts-enhanced-completion',
            // relatedInformation: [
            //     new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`'),
            // ],
        }]);
    } else {
        collection.clear();
    }
}

export function start() {
    store = new Store('echarts-option', Config.language);
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
        if (timer) {
            clearTimeout(timer);
            timer = null;
        };
        curTextDocumentChangeEvent = textDocumentChangeEvent;
        timer = setTimeout(() => {
            curTextDocumentChangeEvent = null;
            updateDiagnostics(textDocumentChangeEvent.document, collection);
        }, 500);
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
    (store as unknown) = undefined;
}
