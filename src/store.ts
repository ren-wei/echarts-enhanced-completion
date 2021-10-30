/**
 * 从本地文件中获取数据
 */

import * as path from 'path';
import * as fs from 'fs';
import { AstItem } from './ast';

export default class Store {
    public topOptionDesc: DescMsgObject; // 顶级选项的描述对象
    private cache: Map<string, DescMsgObject> = new Map<string, DescMsgObject>(); // 缓存已获取的文件
    private assetsName: string;
    private lang: 'en' | 'zh'; // 语言，'en'表示英文，'zh'表示中文

    constructor(assetsName: string, lang: 'en' | 'zh' = 'en') {
        this.assetsName = assetsName;
        this.lang = lang;
        this.topOptionDesc = this.getFileData('index');
    }

    /** 获取文件的内容并解析为对象或数组 */
    private getFileData(name: string): DescMsgObject {
        if (this.cache.has(name)) {
            return this.cache.get(name) as DescMsgObject;
        }
        const fileName = path.resolve(__dirname + `../../assets/${this.assetsName}/${this.lang}/${name}.json`);
        const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
        this.cache.set(name, result);
        return result;
    }
    /** 获取选项下各项的描述对象 */
    public getOptionDesc(paths: Paths, isArray: boolean, astItem: AstItem): DescMsgObject {
        let data: DescMsgObject = this.topOptionDesc;
        let prop: string = '';
        for (let i = 0; i < paths.length; i++) {
            if (typeof paths[i] === 'string') {
                const path = paths[i] as string;
                const detailFileName = data[path].uiControl?.detailFileName;
                if (detailFileName) {
                    data = this.getFileData(detailFileName);
                    // FIXME: 判断条件可能存在bug
                    // 如果下一个路径不存在或者当前是最后的路径并且不是数组，则需要再次获取资源文件
                    if (i === paths.length - 1 && !isArray || i + 1 < paths.length && typeof paths[i + 1] === 'string' && !data[paths.slice(i + 1).filter(v => typeof v === 'string').join('.')]) {
                        const condition = astItem.getSimpleObjectByPaths(paths.slice(0, i + 1));
                        const target = Object.values(data).find(item => {
                            return item.uiControl?.required?.every(v => {
                                return RegExp(v.valueRegExp).test(String(condition[v.key]));
                            });
                        });
                        if (target?.uiControl?.detailFileName) {
                            data = this.getFileData(target.uiControl.detailFileName);
                        }
                    }
                } else {
                    prop = paths.slice(i).filter(v => typeof v === 'string').join('.');
                    break;
                }
            } else {
                const path = paths[i] as SimpleObject;
                const target = Object.values(data).find(item => {
                    return item.uiControl?.required?.every(v => {
                        return RegExp(v.valueRegExp).test(String(path[v.key]));
                    });
                });
                if (target?.uiControl?.detailFileName) {
                    data = this.getFileData(target.uiControl.detailFileName);
                } else {
                    return {};
                }
            }
        }
        // 从 data 中寻找符合的属性
        const result: DescMsgObject = {};
        Object.entries(data).forEach(([key, item]) => {
            // 如果父节点是数组，那么只有存在 required 时才显示
            const validate = isArray ? item.uiControl?.required !== undefined : true;
            const keyList = key.split('.');
            const propList = prop.split('.');
            // 判断是否是直接子属性
            let isChildren = true;
            if (prop && propList.length === keyList.length - 1) {
                for (let i = 0; i < propList.length; i++) {
                    if (!/^<.*>$/.test(keyList[i]) && propList[i] !== keyList[i]) {
                        // 不是命名属性并且相等
                        isChildren = false;
                        break;
                    }
                }
            } else if (prop) {
                isChildren = false;
            } else {
                isChildren = !key.includes('.');
            }

            // 满足所有条件才添加到结果中
            if (validate && isChildren) {
                result[keyList[keyList.length - 1]] = item;
            }
        });
        return result;
    }
    /** 获取初始化选项 */
    public getBaseOptions(): BaseOption[] {
        const fileName = path.resolve(__dirname + `../../assets/${this.assetsName}/init/index.json`);
        return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
    }
}
