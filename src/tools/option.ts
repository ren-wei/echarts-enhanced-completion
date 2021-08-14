import * as vscode from 'vscode';

const path = require('path');
const fs = require('fs');

/** 获取选项字符串可能的范围，返回开始行和结束行 */
export function getOptionsRange(rows: string[], keyword: string): [number, number] {
    const startRow = rows.findIndex(row => row.includes(keyword)) + 1;
    const spaceNum = rows[startRow].length - rows[startRow].trimStart().length;
    let endRow = startRow;
    for (let i = startRow + 1; i < rows.length; i++) {
        const curSpaceNum = rows[i].length - rows[i].trimStart().length;
        if (curSpaceNum && spaceNum >= curSpaceNum) {
            endRow = i + 1;
            break;
        }
    }
    return [startRow, endRow];
}

/** 根据所在的位置获取补全列表 */
export function getCompletionItemList(root: AstNode, node: AstNode, record: RecordItem[]): vscode.CompletionItem[] {
    // 根据 record 获取对应的 key
    let key = [];
    if (record.length) {
        const mapping: KeyFunc = {
            'properties-value': (node: AstNode, recordItem0: RecordItem, recordItem1: RecordItem): PathMsg => {
                const targetNode = node.properties[recordItem0.index as number];
                return {
                    name: targetNode.key.name,
                    target: targetNode.value
                };
            }
        };
        let targetNode = root;
        for (let i = 0; i < record.length; i += 2) {
            const name = record.slice(i, i + 2).map(v => v.key).join('-');
            if (!mapping[name]) {
                return [];
            }
            const nodeMsg = mapping[name](targetNode, record[i], record[i + 1]);
            key.push(nodeMsg.name);
            targetNode = nodeMsg.target;
        }
    }

    const typeMsgList = getOptionType(key.join('.'));
    const descObject = getOptionDesc(key);
    return filterOptions(descObject, node).map((name, index) => {
        return {
            label: name,
            kind: vscode.CompletionItemKind.Property,
            detail: 'echarts options',
            documentation: new vscode.MarkdownString(descObject[name].desc),
            sortText: String(index).length > 1 ? String(index) : '0' + String(index),
            insertText: new vscode.SnippetString(`${name}: ${key.length ? getInsertValueForTop(name, typeMsgList) : getInsertValue(descObject[name].uiControl, typeMsgList)}`)
        };
    });
}

/**
 * 获取选项的类型信息
 * @param key 选项的key，多层使用时用 . 连接
 * @returns 类型信息列表
 */
function getOptionType(key: string = ''): TypeMsg[] {
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
function getOptionDesc(key: string[]): DescMsgObject {
    if (key.length) {
        const datas = getFileData(key[0]);
        // 将返回的文件数据转换为options.json一致的格式
        if (key.length === 1) {
            const keyList = Object.keys(datas).filter(name => !name.includes('.'));
            let result: DescMsgObject = {};
            keyList.forEach(name => {
                result[name] = datas[name];
            });
            return result;
        } else {
            key.shift();
            const keyList = Object.keys(datas).filter(name => name.includes(key.join('.')) && name.split('.').length === key.length + 1);
            let result: DescMsgObject = {};
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

/** 获取文件的内容并解析为js值 */
function getFileData(name: string): any {
    const fileName = path.resolve(__dirname + `../../assets/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}

/** 过滤出现在node中的选项，返回允许的选项列表 */
function filterOptions(descObject: DescMsgObject, node: AstNode): string[] {
    let hasKey: string[] = [];
    if (node.type === 'ObjectExpression') {
        hasKey = node.properties.map(v => v.key.name);
    }
    return Object.keys(descObject).filter(key => {
        return !hasKey.some(str => key.includes(str));
    });
}

/** 为顶级选项获取获取插入的代码片段的值部分 */
function getInsertValueForTop(prop: string, typeMsgList: TypeMsg[]): string {
    const target = typeMsgList.find(item => item.prop === prop);
    if (target && target.isObject) {
        return '{$0},';
    } else if (target && target.isArray) {
        return '[$0],';
    } else if (target && target.default) {
        return '${0:' + target.default + '},';
    } else if (target && target.type === 'boolean') {
        return '${0|true,false|},';
    } else {
        return '';
    }
}

/** 获取需要插入的代码片段的值部分，非顶级选项 */
function getInsertValue(uiControl: UiControl | undefined, typeMsgList: TypeMsg[]): string {
    if (!uiControl) return '';

    let defaultValue = uiControl.default;
    if (uiControl.type === 'vector' && defaultValue) {
        defaultValue = '[' + defaultValue.replace(',', ', ') + ']';
    }
    if (uiControl.options) {
        return '${0|' + uiControl.options + '|}';
    } else {
        return defaultValue || '';
    }
}
