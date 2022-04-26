/**
 * 从本地文件获取默认规则
 */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import Config from './config';

const cache = new Map<string, DependRules>();

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidChangeConfiguration(configurationChangeEvent => {
        if (configurationChangeEvent.affectsConfiguration(Config.name.language)) {
            cache.clear();
        }
    }),
];

export default function(key: string): DependRules {
    if (cache.has(key)) {
        return cache.get(key) as DependRules;
    }
    const fileName = path.resolve(__dirname + `../../assets/rules/${Config.language}/${key}.json`);
    if (fs.existsSync(fileName)) {
        const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
        cache.set(key, result);
        return result;
    } else {
        cache.set(key, []);
        return [];
    }
};
