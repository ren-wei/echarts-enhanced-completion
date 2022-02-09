import * as vscode from 'vscode';
import * as esprima from 'esprima';
import * as estree from 'estree';
import { supportedLanguageList, collection } from './extension';
import ast from './ast';
import { getOptionDesc } from './store';

/** hover 提示 */
export function provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken | null = null): vscode.ProviderResult<vscode.Hover> {
    // 当前位置存在校验错误时不显示提示
    const diags = collection.get(document.uri);
    if (diags?.some(diag => diag.range.contains(position))) {
        return null;
    }

    const astItem = ast.getAstItem(document, position);
    const [node, paths] = ast.getMinAstNode(astItem, position);
    if (!node || !astItem) return null;
    if (node.type === esprima.Syntax.Identifier) {
        const descTreeList = getOptionDesc(paths.slice(0, -1), astItem);
        return new vscode.Hover(new vscode.MarkdownString(descTreeList.find(v => v.name === node?.name)?.desc));
    } else if (node.type === esprima.Syntax.Property) {
        const descTreeList = getOptionDesc(paths.slice(0, -1), astItem);
        return new vscode.Hover(new vscode.MarkdownString(descTreeList.find(v => v.name === (node?.key as estree.Identifier)?.name)?.desc));
    }
    return null;
}

const disposables = [
    vscode.languages.registerHoverProvider(supportedLanguageList, {
        provideHover,
    }),
];
export default disposables;
