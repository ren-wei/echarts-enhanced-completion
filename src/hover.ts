import * as vscode from 'vscode';
import Options from './options';
import { supportedLanguageList, collection } from './extension';

/** hover 提示 */
export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null): vscode.ProviderResult<vscode.Hover> {
    const options = new Options(document, position);
    // 当前位置存在校验错误时不提示
    const diags = collection.get(document.uri);
    if (diags?.some(diag => diag.range.contains(position))) {
        return null;
    }
    return options.getHover();
}

const disposables = [
    vscode.languages.registerHoverProvider(supportedLanguageList, {
        provideHover,
    }),
];
export default disposables;
