/**
 * 从本地文件中获取数据
 */

import * as path from 'path';
import * as fs from 'fs';
import { AstItem } from './ast';

export default class Store {
    public topOptionDesc: Tree[]; // 顶级选项的描述对象
    private cache: Map<string, Tree[]> = new Map<string, Tree[]>(); // 缓存已获取的文件
    private assetsName: string;
    private lang: Languages; // 语言，'en'表示英文，'zh'表示中文

    constructor(assetsName: string, lang: Languages = 'en') {
        this.assetsName = assetsName;
        this.lang = lang;
        this.topOptionDesc = this.getFileData('index');
    }

    /** 获取文件的内容并解析为数组 */
    private getFileData(name: string): Tree[] {
        if (this.cache.has(name)) {
            return this.cache.get(name) as Tree[];
        }
        const fileName = path.resolve(__dirname + `../../assets/${this.assetsName}/${this.lang}/${name}.json`);
        const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
        this.cache.set(name, result);
        return result;
    }

    private getChildren(target: Tree): Tree[] {
        if (target.children) {
            return target.children;
        } else if (target.detailFileName) {
            return this.getFileData(target.detailFileName);
        }
        return [];
    }

    /** 获取选项下各项的描述数组 */
    public getOptionDesc(paths: Paths, astItem: AstItem, isArray: boolean = false): Tree[] {
        let descList: Tree[] = this.topOptionDesc;
        let type: string | string[] = 'Object';
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            if (type === 'Object') {
                const target = descList.find(v => v.name === path || /^<[^>]+>$/.test(v.name));
                if (target) {
                    // 如果最后一个路径是数组，那么是普通数组
                    if (i === paths.length - 1 && isArray && target.type === 'Array') return [];
                    descList = this.getChildren(target);
                    type = target.type;
                } else {
                    return [];
                }
            } else if (type === 'Array') {
                if (i === paths.length - 1) return []; // 如果当前是最后一个路径，则表示光标位于普通数组
                if (typeof path === 'string') return [];
                const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(path[rule.key]))));
                // 如果 target 存在，那么表示是通过规则匹配的；如果不存在则是普通数组直接跳过
                if (target) {
                    descList = this.getChildren(target);
                    type = target.type;
                }
            } else if (type.length === 2 && type.includes('Object') && type.includes('Array')) {
                // path 如果是字符串，那么当前是对象，否则是数组
                if (typeof path === 'string') {
                    const simple = astItem.getSimpleObjectByPaths(paths.slice(0, i)); // 获取父节点的实际的对象
                    const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(simple[rule.key]))));
                    if (target) {
                        descList = this.getChildren(target);
                        i--; // 需要额外向下找一次
                        type = target.type;
                    } else {
                        return [];
                    }
                } else {
                    const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(path[rule.key]))));
                    // 如果 target 存在，那么表示是通过规则匹配的；如果不存在则是普通数组直接跳过
                    if (target) {
                        descList = this.getChildren(target);
                        type = target.type;
                    }
                }
            }
            // 没有获取到子项，则直接返回空数组
            if (!descList.length) return [];
        }
        // 如果处于对象中，并且同时允许对象和数组，那么需要判断是否是空对象
        if (!isArray && type.length === 2 && type.includes('Object') && type.includes('Array')) {
            const simple = astItem.getSimpleObjectByPaths(paths); // 获取父节点的实际的对象
            const target = descList.find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(simple[rule.key]))));
            if (target) {
                descList = this.getChildren(target);
            }
        }
        return descList;
    }

    /** 获取初始化选项 */
    public getBaseOptions(): BaseOption[] {
        const fileName = path.resolve(__dirname + `../../assets/${this.assetsName}/init/index.json`);
        return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
    }
}
