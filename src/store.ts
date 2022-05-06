/**
 * 从本地文件中获取数据
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { AstItem } from './ast';
import Config from './config';

const cache: Map<string, Tree[]> = new Map<string, Tree[]>(); // 缓存已获取的文件
let topOptionDesc: Tree[] = getFileData('index'); // 顶级选项的描述对象

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidChangeConfiguration(configurationChangeEvent => {
        if (configurationChangeEvent.affectsConfiguration(Config.name.language)) {
            cache.clear();
            topOptionDesc = getFileData('index');
        }
    }),
];

/** 获取文件的内容并解析为数组 */
function getFileData(name: string): Tree[] {
    if (cache.has(name)) {
        return cache.get(name) as Tree[];
    }
    const fileName = path.resolve(__dirname + `../../assets/desc/${Config.language}/${name}.json`);
    const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
    cache.set(name, result);
    return result;
}

function getChildren(target: Tree): Tree[] {
    if (target.children) {
        return target.children;
    } else if (target.detailFileName) {
        return getFileData(target.detailFileName);
    }
    return [];
}

/** 获取选项下各项的描述数组 */
export function getOptionDesc(paths: Paths, astItem: AstItem, isArray: boolean = false): Tree[] {
    let descList: Tree[] = topOptionDesc;
    let type: string | string[] = 'Object';
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if (type === 'Object') {
            const target = descList.find(v => v.name === path || /^<[^>]+>$/.test(v.name));
            if (target) {
                // 如果最后一个路径是数组，那么是普通数组
                if (i === paths.length - 1 && isArray && target.type === 'Array') return [];
                descList = getChildren(target);
                type = target.type;
            } else {
                return [];
            }
        } else if (type === 'Array') {
            if (i === paths.length - 1) return descList; // 如果当前是最后一个路径，则表示光标位于普通数组
            if (typeof path === 'string') return [];
            const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(path[rule.key]))));
            // 如果 target 存在，那么表示是通过规则匹配的；如果不存在则是普通数组直接跳过
            if (target) {
                descList = getChildren(target);
                type = target.type;
            } else {
                type = typeof path === 'object' ? 'Object' : type;
            }
        } else if (type.length === 2 && type.includes('Object') && type.includes('Array')) {
            // path 如果是字符串，那么当前是对象，否则是数组
            if (typeof path === 'string') {
                const simple = astItem.toSimpleObject(astItem.getNodeByPaths(paths.slice(0, i))); // 获取父节点的实际的对象
                const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(simple[rule.key]))));
                if (target) {
                    descList = getChildren(target);
                    i--; // 需要额外向下找一次
                    type = target.type;
                } else {
                    return [];
                }
            } else {
                const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(path[rule.key]))));
                // 如果 target 存在，那么表示是通过规则匹配的；如果不存在则是普通数组直接跳过
                if (target) {
                    descList = getChildren(target);
                    type = target.type;
                }
            }
        }
        // 没有获取到子项，则直接返回空数组
        if (!descList.length) return [];
    }
    // 如果处于对象中，并且同时允许对象和数组，那么需要判断是否是空对象
    if (!isArray && type.length === 2 && type.includes('Object') && type.includes('Array')) {
        const simple = astItem.toSimpleObject(astItem.getNodeByPaths(paths)); // 获取父节点的实际的对象
        const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(simple[rule.key]))));
        if (target) {
            descList = getChildren(target);
        }
    }
    return descList;
}

/** 获取初始化选项 */
export function getBaseOptions(): BaseOption[] {
    const fileName = path.resolve(__dirname + '../../assets/desc/init/index.json');
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}
