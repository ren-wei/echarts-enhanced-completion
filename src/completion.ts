import * as vscode from 'vscode';
import Options from './options';
import { supportedLanguageList } from './extension';

/** 自动补全 */
export function provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null, context: vscode.CompletionContext | null = null): vscode.ProviderResult<vscode.CompletionItem[]> {
    const options = new Options(document, position);
    return options.getCompletionItem();
}

const disposables = [
    vscode.languages.registerCompletionItemProvider(supportedLanguageList, {
        provideCompletionItems,
    }, '\n'),
];

export default disposables;
