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
    if (record.length) {
        // TODO: 非顶级选项时
        return [];
    } else {
        // 记录长度为0，说明为顶级选项下
        const typeMsgList = getOptionType();
        const descObject = getOptionDesc();
        return filterOptions(descObject, node).map((key, index) => {
            return {
                label: key,
                kind: vscode.CompletionItemKind.Property,
                detail: 'echarts options',
                documentation: new vscode.MarkdownString(descObject[key].desc),
                sortText: String(index).length > 1 ? String(index) : '0' + String(index),
                insertText: new vscode.SnippetString(`${key}: ${getInsertValueForTop(key, typeMsgList)}`)
            };
        });
    }
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
 * @param key 选项的key，多层使用时用 . 连接
 */
function getOptionDesc(key: string = ''): DescMsgObject {
    if (key) {
        // TODO: 存在key时
        return {};
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
