import * as vscode from 'vscode';
import Options from './options';
import { supportedLanguageList } from './extension';

/** hover 提示 */
export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null): vscode.ProviderResult<vscode.Hover> {
    const options = new Options(document, position);
    return options.getHover();
}

const disposables = [
    vscode.languages.registerHoverProvider(supportedLanguageList, {
        provideHover,
    }),
];
export default disposables;
