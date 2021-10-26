import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { updateDiagnostics, collection } from '../../extension';

/** 获取json文件并解析为对象 */
export function getFileData(name: string): DescMsgObject {
    const fileName = path.resolve(__dirname + `../../../../assets/echarts-option/en/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}

/** 获取json文件并解析为数组 */
export function getFileArrayData(name: string = 'index'): BaseOption[] {
    const fileName = path.resolve(__dirname + `../../../../assets/echarts-option/init/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}

/** 输入文本，并返回 text 之间的位置 */
export async function inputText(text: [string, string], textEditor: vscode.TextEditor, position: vscode.Position): Promise<vscode.Position> {
    await textEditor.edit((editBuilder) => {
        editBuilder.insert(position, text.join(''));
    });
    const event = generateChangeEvent(textEditor.document, position, 0, text.join(''));
    updateDiagnostics(textEditor.document, collection, event);
    return textEditor.document.positionAt(textEditor.document.offsetAt(position) + text[0].length);
}

export function generateChangeEvent(document: vscode.TextDocument, position: vscode.Position, rangeLength: number, text: string) : vscode.TextDocumentChangeEvent {
    return {
        document,
        contentChanges: [{
            range: new vscode.Range(position, translate(document, position, rangeLength)),
            rangeOffset: document.offsetAt(position),
            rangeLength,
            text,
        }],
    };
}

export function translate(document: vscode.TextDocument, position: vscode.Position, offset: number): vscode.Position {
    return document.positionAt(document.offsetAt(position) + offset);
}
