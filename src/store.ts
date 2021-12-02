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
    /** 获取选项下各项的描述数组 */
    public getOptionDesc(paths: Paths, isArray: boolean, astItem: AstItem): Tree[] {
        let descList: Tree[] = this.topOptionDesc;
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            let isRequired = false; // 标记当前是否是通过规则匹配
            // 找到当前路径匹配的项
            let target: Tree | undefined;
            if (typeof path === 'string') {
                target = descList.find(v => v.name === path || /^<.*>$/.test(v.name));
            } else {
                // 根据规则匹配
                target = descList.filter(v => v.required).find(v => v.required?.every(rule => new RegExp(rule.valueRegExp).test(String(path[rule.key]))));
                // 如果没有规则匹配，则跳过向下寻找
                if (!target) {
                    continue;
                }
                isRequired = true;
            }
            // 向下寻找
            if (target) {
                if (target.children) {
                    descList = target.children;
                } else if (target.detailFileName) {
                    descList = this.getFileData(target.detailFileName);
                } else {
                    return [];
                }
                // 如果是普通数组值中触发，返回空数组
                if (i === paths.length - 1 && !descList.some(v => v.required) && !isRequired && isArray) {
                    return [];
                }
            } else {
                return [];
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
