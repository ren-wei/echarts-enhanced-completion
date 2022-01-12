import * as vscode from 'vscode';
import Diagnostic from './diagnosis';
import localize from './localize';

/** 管理所有命令 */
export default class CommandOwner {
    public disposables: vscode.Disposable[];
    private commands: BaseCommand[];

    constructor(allCommands = [ReplaceKeyCommand, IgnoreCommand]) {
        this.commands = allCommands.map(Command => new Command());
        this.disposables = this.commands.map(command => {
            return vscode.commands.registerCommand(command.command, command.execute, command);
        });
    }

    public createCommandCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction[] {
        return this.commands.map(command => command.createCommandCodeAction(document, diagnostic));
    }
}

/** 基本命令 */
abstract class BaseCommand {
    public abstract command: string; // 命令的唯一标识符
    public abstract execute(...args: any[]): any; // 命令处理函数
    public abstract createCommandCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction; // 创建命令对应的 CodeAction
}

/** 替换选项的 key 的命令 */
class ReplaceKeyCommand implements BaseCommand {
    public command: string = 'replace-key.command';

    public async execute(document: vscode.TextDocument, range: vscode.Range, text: string): Promise<void> {
        const textEditor = await vscode.window.showTextDocument(document);
        await textEditor.edit((editBuilder) => {
            editBuilder.replace(range, text);
        });
    }

    public createCommandCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction {
        const action = new vscode.CodeAction(localize('message.change-spelling', diagnostic.code as string), vscode.CodeActionKind.QuickFix);
        action.command = {
            command: this.command,
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
        return action;
    }
}

/** 忽略错误的命令 */
class IgnoreCommand implements BaseCommand {
    public command: string = 'ignore-key.command';

    public async execute(document: vscode.TextDocument, range: vscode.Range): Promise<void> {
        const textEditor = await vscode.window.showTextDocument(document);
        await textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(range.start.line, 0), `${Array(document.lineAt(range.start.line).firstNonWhitespaceCharacterIndex).fill(' ').join('')}// ${Diagnostic.disableNextLine}${['', '\n', '\r\n'][document.eol]}`);
        });
    }

    public createCommandCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction {
        const action = new vscode.CodeAction(localize('message.ignore-action-line', 'echarts-disable'), vscode.CodeActionKind.QuickFix);
        action.command = {
            command: this.command,
            title: 'Ignore EchartsOptions Warning',
            arguments: [document, diagnostic.range],
        };
        action.diagnostics = [diagnostic];
        return action;
    }
}
