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
    /**
     * 获取选项下各项的描述对象
     * @param keys 选项的 key 列表
     */
    public getOptionDesc(keys: string[]): DescMsgObject {
        let data: DescMsgObject = this.topOptionDesc;
        let prop: string = '';
        for (let i = 0; i < keys.length; i++) {
            const detailFileName = data[keys[i]]?.uiControl?.detailFileName;
            if (detailFileName) {
                data = this.getFileData(detailFileName);
            } else {
                prop = keys.slice(i).join('.');
                break;
            }
        }
        const result: DescMsgObject = {};
        // 过滤其他层级的属性
        Object.entries(data).forEach(([key, item]) => {
            if (key.includes(prop) && (!prop && key.split('.').length === 1 || prop && key.split('.').length === prop.split('.').length + 1)) {
                const keyList = key.split('.');
                result[keyList[keyList.length - 1]] = item;
            }
        });
        return result;
    }
}
