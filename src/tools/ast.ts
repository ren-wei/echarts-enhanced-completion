const espree = require('espree');

function isValidate(node: AstNode, index: number): boolean {
    return node.start < index && index < node.end;
}

/** 根据位置获取最小节点，并记录获取路径 */
export function getAstNode(node: AstNode, index: number, record: RecordItem[] = []): [AstNode, RecordItem[]] {
    const keyList: Key[] = espree.VisitorKeys[node.type];
    let targetKey: Key | '' = '';
    let isArray: boolean = false;
    for (let i = 0; i < keyList.length; i++) {
        const key = keyList[i];
        if (Array.isArray(node[key])) {
            const i = (node[key] as Array<AstNode>).findIndex(item => isValidate(item, index));
            if (i !== -1) {
                targetKey = key;
                isArray = true;
                record.push({ key: key, index: i });
                break;
            }
        } else {
            if (isValidate(node[key] as AstNode, index)) {
                targetKey = key;
                record.push({ key: key, index: null });
                break;
            }
        }
    }
    if (targetKey) {
        if (isArray) {
            return getAstNode((node[targetKey] as Array<AstNode>)[record[record.length - 1].index as number], index, record);
        } else {
            return getAstNode(node[targetKey] as AstNode, index, record);
        }
    } else {
        return [node, record];
    }
}

/** 判断节点是否符合要求 */
export function checkNode(node: AstNode): boolean {
    return true;
}
