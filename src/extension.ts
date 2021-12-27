import * as vscode from 'vscode';
import Store from './store';
import Ast from './ast';
import Diagnosis from './diagnosis';
import Options from './options';
import Config from './config';

let store: Store;
let astMap: Map<vscode.Uri, Ast>;
let diagMap: Map<vscode.Uri, Diagnosis>;

export const collection = vscode.languages.createDiagnosticCollection('echarts-options-diagnostic');
export const keyword = '/** @type EChartsOption */';

/** 自动补全 */
export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null, context: vscode.CompletionContext | null = null): vscode.ProviderResult<vscode.CompletionItem[]> {
    let ast: Ast | undefined;
    if (Config.patchUpdate) {
        ast = astMap.get(document.uri);
    } else {
        ast = new Ast(keyword, document);
    }
    if (!ast?.validate) return [];
    const options = new Options(ast, store, position);
    const result = options.getCompletionItem();
    return result;
}

/** hover 提示 */
export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null): vscode.ProviderResult<vscode.Hover> {
    let ast: Ast | undefined;
    if (Config.patchUpdate) {
        if (astMap.has(document.uri)) {
            ast = astMap.get(document.uri);
        } else {
            // 刚打开文件还未编辑时，ast不存在，需要初始化
            ast = new Ast(keyword, document);
            astMap.set(document.uri, ast);
        }
    } else {
        ast = new Ast(keyword, document);
    }
    if (!ast?.validate) return null;
    const options = new Options(ast, store, position);
    return options.getHover();
}

/** 更新诊断程序 */
export async function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection, ast: Ast | null) {
    if (!ast) ast = new Ast(keyword, document);
    let diag: Diagnosis;
    if (diagMap.has(document.uri)) {
        diag = diagMap.get(document.uri) as Diagnosis;
    } else {
        diag = new Diagnosis(ast, store);
        diagMap.set(document.uri, diag);
    }
    diag.update(document.uri, collection);
}

/** 文档更新处理函数 */
export function updateHandler(document: vscode.TextDocument, collection: vscode.DiagnosticCollection, textDocumentChangeEvent: vscode.TextDocumentChangeEvent | null = null): void {
    // 更新 Ast
    let ast: Ast | null = null;
    if (Config.patchUpdate) {
        if (astMap.has(document.uri) && textDocumentChangeEvent) {
            ast = astMap.get(document.uri) as Ast;
            // 将存在多行填充contentChange放在后面，以防止重新初始化后，ast结构被破坏
            ast.patch(Array.from(textDocumentChangeEvent.contentChanges).sort((a, b) => a.text.split('\n').length - b.text.split('\n').length));
        } else {
            ast = new Ast(keyword, document);
            astMap.set(document.uri, ast);
        }
    }
    updateDiagnostics(document, collection, ast);
}

/** 插件启用时初始化 */
export function start() {
    if (!store) store = new Store('echarts-option', Config.language);
    if (!astMap) astMap = new Map<vscode.Uri, Ast>();
}

export function activate(context: vscode.ExtensionContext) {
    start();
    vscode.workspace.onDidChangeConfiguration(start);
    vscode.workspace.onDidCloseTextDocument(document => {
        astMap.delete(document.uri);
    });

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
        updateHandler(vscode.window.activeTextEditor.document, collection);
    }
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvent => {
        updateHandler(textDocumentChangeEvent.document, collection, textDocumentChangeEvent);
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
    (store as unknown) = undefined;
}
