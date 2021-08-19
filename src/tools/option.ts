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
    if (node.type !== 'ObjectExpression') {
        return [];
    }
    // 根据 record 获取对应的 key
    const key: string[] = [];
    if (record.length) {
        let targetNode = root;
        for (let i = 0; i < record.length; i++) {
            switch (record[i].key) {
                case 'properties':
                    targetNode = targetNode.properties[record[i].index as number];
                    key.push(targetNode.key.name);
                    break;
                case 'value':
                    targetNode = targetNode.value;
                    break;
                case 'elements':
                    targetNode = targetNode.elements[record[i].index as number];
                    break;
                default:
                    return [];
            }
        }
    }

    const typeMsgList = getOptionType(key.join('.'));
    const descObject = getOptionDesc(key, node);
    return filterOptions(descObject, node).map((name, index) => {
        const typeMsg = typeMsgList.find(item => item.prop === name);
        const typeOfValue = typeMsg?.type || descObject[name].uiControl?.type;
        return {
            label: {
                label: name,
                description: typeOfValue,
            },
            kind: vscode.CompletionItemKind.Property,
            detail: 'echarts options',
            preselect: true,
            documentation: new vscode.MarkdownString(descObject[name].desc),
            sortText: String(index).length > 1 ? String(index) : '0' + String(index),
            insertText: new vscode.SnippetString(`${name.split('-')[0]}: ${getInsertValue(name, typeMsg, descObject[name].uiControl)},`),
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
function getOptionDesc(key: string[], node: AstNode): DescMsgObject {
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

/** 获取文件的内容并解析为js值 */
function getFileData(name: string, node: AstNode | null = null): any {
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

/** 获取需要插入的代码片段的值部分 */
function getInsertValue(prop: string, typeMsg: TypeMsg | undefined, uiControl: UiControl | undefined): string {
    if (prop.includes('-')) {
        return [
            '[',
            '\t{',
            `\t\ttype: '${prop.split('-')[1]}',$0`,
            '\t}',
            ']',
        ].join('\n');
    }
    if (uiControl) {
        let defaultValue = uiControl.default;
        if (uiControl.type === 'vector' && defaultValue) {
            defaultValue = '[' + defaultValue + ']';
        }
        if (uiControl.options) {
            return '\'${1|' + uiControl.options + '|}\'';
        } else if (defaultValue) {
            return defaultValue;
        }
    }
    if (typeMsg) {
        if (typeMsg.isObject) {
            return '{$0}';
        } else if (typeMsg.isArray) {
            return '[$0]';
        } else if (typeMsg.default) {
            return '${0:' + typeMsg.default + '}';
        } else if (typeMsg && typeMsg.type === 'boolean') {
            return '${1|true,false|}';
        }
    }
    return '${0}';
}
