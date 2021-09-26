import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/** 获取json文件并解析为对象 */
export function getFileData(name: string): DescMsgObject {
    const fileName = path.resolve(__dirname + `../../../../assets/echarts-option/${name}.json`);
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
        position = position.translate(text[0].length - text[0].replace(/\n/g, '').length);
    });
    return position;
}
