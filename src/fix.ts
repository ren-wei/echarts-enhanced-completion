import * as vscode from 'vscode';
import { ExtensionName } from './extension';
import localize from './localize';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const COMMAND = 'option-fix-code-actions.command';

export default class Fix implements vscode.CodeActionProvider {
    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix,
    ];

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
        return context.diagnostics
            .filter(diagnostic => diagnostic.source === ExtensionName)
            .map(diagnostic => this.createCommandCodeAction(document, diagnostic));
    }

    private createCommandCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction {
        const action = new vscode.CodeAction(localize('message.change-spelling', diagnostic.code as string), vscode.CodeActionKind.QuickFix);
        action.command = {
            command: COMMAND,
            title: 'Fix EchartsOption',
            arguments: [document, diagnostic.range, diagnostic.code],
        };
        if (!diagnostic.code) {
            action.disabled = {
                reason: 'No similar words found.',
            };
        }
        action.diagnostics = [diagnostic];
        action.isPreferred = true;
        return action;
    }
}

/** 修复命令 */
export async function fixCommand(document: vscode.TextDocument, range: vscode.Range, text: string) {
    const textEditor = await vscode.window.showTextDocument(document);
    await textEditor.edit((editBuilder) => {
        editBuilder.replace(range, text);
    });
}
