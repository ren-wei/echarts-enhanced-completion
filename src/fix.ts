import * as vscode from 'vscode';
import { ExtensionName } from './extension';
import CommandOwner from './command';

export default class Fix implements vscode.CodeActionProvider {
    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix,
    ];

    public commandOwner: CommandOwner = new CommandOwner();

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
        return context.diagnostics
            .filter(diagnostic => diagnostic.source === ExtensionName)
            .map(diagnostic => this.commandOwner.createCommandCodeAction(document, diagnostic)).flat();
    }
}
