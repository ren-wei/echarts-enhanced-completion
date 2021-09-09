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
    private getFileData(name: string, node: AstNode | null = null): DescMsgObject {
        // TODO: 通用化处理
        if (['dataZoom', 'visualMap', 'series'].includes(name)) {
            if (node && node.type === 'ObjectExpression' && node.properties.length) {
                const typeName = node.properties.find(v => v.key.name === 'type')?.value.value;
                if (typeName) {
                    name += '-' + typeName;
                } else {
                    return {};
                }
            } else {
                return {};
            }
        }
        if (this.cache.has(name)) {
            return this.cache.get(name) as DescMsgObject;
        }
        const fileName = path.resolve(__dirname + `../../assets/${this.assetsName}/${name}.json`);
        const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
        this.cache.set(name, result);
        return result;
    }
    /**
     * 获取选项的描述信息
     * @param key 选项的key
     */
    public getOptionDesc(key: string[], node: AstNode | null = null): DescMsgObject {
        if (key.length) {
            const datas = this.getFileData(key[0], node);
            // 将返回的文件数据转换为 index.json 一致的格式
            if (key.length === 1) {
                const keyList = Object.keys(datas).filter(name => !name.includes('.'));
                const result: DescMsgObject = {};
                keyList.forEach(name => {
                    result[name] = datas[name];
                });
                return result;
            } else {
                key.shift();
                const keyList = Object.keys(datas).filter(name => name.includes(key.join('.')) && name.split('.').length === key.length + 1);
                const result: DescMsgObject = {};
                keyList.forEach(name => {
                    const nameList = name.split('.');
                    result[nameList[nameList.length - 1]] = datas[name];
                });
                return result;
            }
        } else {
            return this.topOptionDesc;
        }
    }
}
