import * as vscode from 'vscode';
import { ExtensionName } from './extension';
import Diagnostic from './diagnosis';
import localize from './localize';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const COMMAND = 'option-fix-code-actions.command';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IgnoreCommand = 'ignore-fix-code-actions.command';

export default class Fix implements vscode.CodeActionProvider {
    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix,
    ];

    public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
        return context.diagnostics
            .filter(diagnostic => diagnostic.source === ExtensionName)
            .map(diagnostic => this.createCommandCodeAction(document, diagnostic)).flat();
    }

    private createCommandCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction[] {
        const action = new vscode.CodeAction(localize('message.change-spelling', diagnostic.code as string), vscode.CodeActionKind.QuickFix);
        action.command = {
            command: COMMAND,
            title: 'Fix EchartsOption',
            arguments: [document, diagnostic.range, diagnostic.code],
        };
        if (!diagnostic.code) {
            action.disabled = {
                reason: 'Not similar words found.',
            };
        }
        action.diagnostics = [diagnostic];
        action.isPreferred = true;
        return [action, ...this.getDefaultCodeAction(document, diagnostic)];
    }

    private getDefaultCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction[] {
        const ignoreAction = new vscode.CodeAction(localize('message.ignore-action-line', 'echarts-disable'), vscode.CodeActionKind.QuickFix);
        ignoreAction.command = {
            command: IgnoreCommand,
            title: 'Ignore EchartsOptions Warning',
            arguments: [document, diagnostic.range],
        };
        ignoreAction.diagnostics = [diagnostic];
        return [ignoreAction];
    }
}

export async function fixCommand(document: vscode.TextDocument, range: vscode.Range, text: string) {
    const textEditor = await vscode.window.showTextDocument(document);
    await textEditor.edit((editBuilder) => {
        editBuilder.replace(range, text);
    });
}

export async function ignoreCommand(document: vscode.TextDocument, range: vscode.Range) {
    const textEditor = await vscode.window.showTextDocument(document);
    await textEditor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(range.start.line, 0), `${Array(document.lineAt(range.start.line).firstNonWhitespaceCharacterIndex).fill(' ').join('')}// ${Diagnostic.disableNextLine}${['', '\n', '\r\n'][document.eol]}`);
    });
}
