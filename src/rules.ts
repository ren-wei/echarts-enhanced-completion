/**
 * 从本地文件获取默认规则
 */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import Config from './config';

const cache = new Map<string, DependRules>(); // 缓存依赖规则的文件

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidChangeConfiguration(configurationChangeEvent => {
        if (configurationChangeEvent.affectsConfiguration(Config.name.language)) {
            cache.clear();
        }
    }),
];

/** 获取指定 key 的依赖规则 */
export default function(key: string): DependRules {
    let fileRules: DependRules = [];
    if (Config.defaultRule) {
        const name = key.split('.')[0];
        if (cache.has(name)) {
            fileRules = cache.get(name) as DependRules;
        } else {
            const fileName = path.resolve(__dirname + `../../assets/rules/${Config.language}/${name}.json`);
            if (fs.existsSync(fileName)) {
                const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
                cache.set(key, result);
                fileRules = result;
            } else {
                cache.set(key, []);
                fileRules = [];
            }
        }
    }
    fileRules.push(...Config.customRule);
    return fileRules.filter(item => item.key.includes(key));
};
