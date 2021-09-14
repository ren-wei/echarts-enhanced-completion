/**
 * 从本地文件中获取数据
 */

const path = require('path');
const fs = require('fs');

export default class Store {
    public topOptionDesc: DescMsgObject; // 顶级选项的描述对象
    private cache: Map<string, DescMsgObject> = new Map<string, DescMsgObject>(); // 缓存已获取的文件
    private assetsName: string;

    constructor(assetsName: string) {
        this.assetsName = assetsName;
        this.topOptionDesc = this.getFileData('index');
    }

    /** 获取文件的内容并解析为对象或数组 */
    private getFileData(name: string): DescMsgObject {
        if (this.cache.has(name)) {
            return this.cache.get(name) as DescMsgObject;
        }
        const fileName = path.resolve(__dirname + `../../assets/${this.assetsName}/${name}.json`);
        const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
        this.cache.set(name, result);
        return result;
    }
    /** 获取选项下各项的描述对象 */
    public getOptionDesc(paths: Paths, isArray: boolean = false): DescMsgObject {
        let data: DescMsgObject = this.topOptionDesc;
        let prop: string = '';
        for (let i = 0; i < paths.length; i++) {
            if (typeof paths[i] === 'string') {
                const path = paths[i] as string;
                const detailFileName = data[path]?.uiControl?.detailFileName;
                if (detailFileName) {
                    data = this.getFileData(detailFileName);
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
            // 必须是直接子属性
            const isChildren = prop ? key.slice(0, prop.length + 1) === prop + '.' && !key.slice(prop.length + 1).includes('.') : !key.includes('.');
            if (validate && isChildren) {
                const keyList = key.split('.');
                result[keyList[keyList.length - 1]] = item;
            }
        });
        return result;
    }
}
