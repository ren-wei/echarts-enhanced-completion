import * as vscode from 'vscode';
const espree = require('espree');

export default class Ast {
    public validate: boolean = false; // 目标是否存在
    public expression: AstNode | null = null; // 目标的 ast 表达式
    public minAst: AstNode | null = null; // 光标所在的最小 Ast 节点
    public record: RecordItem[] = []; // 访问节点的路径记录

    constructor(keyword: string, document: vscode.TextDocument, position: vscode.Position) {
        // 获取目标的范围 [startRow, endRow)
        const rows = document.getText().split('\n');
        let startRow;
        let endRow;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.trim() === keyword) {
                startRow = i + 1;
                break;
            }
        }
        if (!startRow) return;
        endRow = startRow;
        const startSpaceNum = rows[startRow].length - rows[startRow].trimStart().length;
        for (let i = startRow + 1; i < rows.length; i++) {
            const curSpaceNum = rows[i].length - rows[i].trimStart().length;
            endRow = i + 1;
            if (curSpaceNum <= startSpaceNum) break;
        }
        // 当前位置是否在范围内
        this.validate = !rows[position.line].trim() && position.line >= startRow && position.line < endRow;
        if (!this.validate) return;
        // 获取目标字符串
        const targetRows = rows.slice(startRow, endRow);
        targetRows[0] = targetRows[0].replace(/^[^{]*/, '');
        const lastRow = targetRows[targetRows.length - 1];
        targetRows[targetRows.length - 1] = lastRow.slice(0, lastRow.indexOf('}') + 1);
        const options = '(' + targetRows.join('\n') + ')';
        // 计算光标位置
        let index = 0;
        for (let i = 0; i < targetRows.length; i++) {
            if (i < position.line - startRow) {
                index += targetRows[i].length + 1; // +1 是加上去掉的'\n'
            } else {
                break;
            }
        }
        // 获取光标所在的最小Ast节点和访问节点的路径记录
        const ast = espree.parse(options, { ecmaVersion: 'latest' });
        this.expression = ast.body[0].expression;
        if (this.expression) {
            [this.minAst, this.record] = this.getAstNode(this.expression, index);
        }
    }

    /** 位置是否在节点中 */
    private isNodeContainIndex(node: AstNode, index: number): boolean {
        return node.start < index && index < node.end;
    }

    /** 根据位置获取最小节点，并记录获取路径 */
    private getAstNode(node: AstNode, index: number, record: RecordItem[] = []): [AstNode, RecordItem[]] {
        const keyList: Key[] = espree.VisitorKeys[node.type];
        let targetKey: Key | '' = '';
        let isArray: boolean = false;
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            if (Array.isArray(node[key])) {
                const i = (node[key] as Array<AstNode>).findIndex(item => this.isNodeContainIndex(item, index));
                if (i !== -1) {
                    targetKey = key;
                    isArray = true;
                    record.push({ key: key, index: i });
                    break;
                }
            } else {
                if (this.isNodeContainIndex(node[key] as AstNode, index)) {
                    targetKey = key;
                    record.push({ key: key, index: null });
                    break;
                }
            }
        }
        if (targetKey) {
            if (isArray) {
                return this.getAstNode((node[targetKey] as Array<AstNode>)[record[record.length - 1].index as number], index, record);
            } else {
                return this.getAstNode(node[targetKey] as AstNode, index, record);
            }
        } else {
            return [node, record];
        }
    }
}
