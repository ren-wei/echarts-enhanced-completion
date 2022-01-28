import * as vscode from 'vscode';
import { ExtensionName, supportedLanguageList } from './extension';
import CommandOwner from './command';

class Fix implements vscode.CodeActionProvider {
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

const fix = new Fix();

export default [
    vscode.languages.registerCodeActionsProvider(supportedLanguageList, fix, {
        providedCodeActionKinds: Fix.providedCodeActionKinds,
    }),
    ...fix.commandOwner.disposables,
];
