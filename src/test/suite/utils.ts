import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { collection } from '../../extension';
import Config from '../../config';

/** 获取json文件并解析为对象 */
export function getFileData(name: string): Tree[] {
    const fileName = path.resolve(__dirname + `../../../../assets/desc/${Config.language}/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}

/** 获取json文件并解析为数组 */
export function getFileArrayData(name: string = 'index'): BaseOption[] {
    const fileName = path.resolve(__dirname + `../../../../assets/desc/init/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}

/** 输入文本，并返回 text 之间的位置 */
export async function inputText(text: [string, string], textEditor: vscode.TextEditor, position: vscode.Position): Promise<vscode.Position> {
    await textEditor.edit((editBuilder) => {
        editBuilder.insert(position, text.join(''));
    });
    return textEditor.document.positionAt(textEditor.document.offsetAt(position) + text[0].length);
}

export function translate(document: vscode.TextDocument, position: vscode.Position, offset: number): vscode.Position {
    return document.positionAt(document.offsetAt(position) + offset);
}

export function findTree(root: Tree[], path: string): Tree {
    const keyList = path.split('.');
    const target = root?.find(v => v.name === keyList[0]) as Tree;
    if (keyList.length === 1) {
        return target;
    } else {
        return findTree(target.children as Tree[], keyList.slice(1).join('.'));
    }
}
