/**
 * 从本地文件中获取数据
 */

const path = require('path');
const fs = require('fs');

/** 获取文件的内容并解析为js值 */
export function getFileData(name: string, node: AstNode | null = null): any {
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
    const fileName = path.resolve(__dirname + `../../assets/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}

/**
 * 获取选项的类型信息
 * @param key 选项的key，多层使用时用 . 连接
 * @returns 类型信息列表
 */
export function getOptionType(key: string = ''): TypeMsg[] {
    const datas = getFileData('options_outline');
    return key.split('.').reduce((result, k) => {
        const target: TypeMsg = result.find((v: TypeMsg) => v.prop === k);
        if (target) {
            return target.children;
        } else {
            return result;
        }
    }, datas);
}

/**
 * 获取选项的描述信息
 * @param key 选项的key
 */
export function getOptionDesc(key: string[], node: AstNode): DescMsgObject {
    if (key.length) {
        const datas = getFileData(key[0], node);
        // 将返回的文件数据转换为options.json一致的格式
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
        return getFileData('option');
    }
}
