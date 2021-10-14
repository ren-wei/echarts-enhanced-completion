import * as vscode from 'vscode';
const espree = require('espree');

export default class Ast {
    public validate: boolean = false; // 目标是否存在
    private document: vscode.TextDocument;
    private astItems: AstItem[] = [];

    constructor(keyword: string, document: vscode.TextDocument) {
        this.document = document;
        // 获取目标的范围
        const ranges = this.getRanges(keyword, document);
        // 是否存在
        this.validate = ranges.length > 0;
        if (!this.validate) return;
        this.astItems = ranges.map(range => new AstItem(keyword, document, range));
    }

    public getAstItem(position: vscode.Position): AstItem | undefined {
        return this.astItems.find(item => item.range.contains(position));
    }

    /** 获取所在位置的最小Ast节点，并且记录路径 */
    public getMinAstNode(astItem: AstItem | undefined, position: vscode.Position): [AstNode | null, Paths] {
        if (!astItem) return [null, []];
        return astItem.getAstNode(this.document.offsetAt(position) - this.document.offsetAt(astItem.range.start) + 2);
    }

    /** 获取选项对象所在的范围 */
    private getRanges(keyword: string, document: vscode.TextDocument): vscode.Range[] {
        let start: vscode.Position | null = null;
        let curRowStart = false;
        let startRowSpaceCount: number = 0;
        const result: vscode.Range[] = [];
        for (let line = 0; line < document.lineCount; line++) {
            const textLine = document.lineAt(line);
            if (curRowStart) {
                // 运行到这里，则当前行为开始行
                const index = textLine.text.indexOf('{');
                if (index !== -1) {
                    start = new vscode.Position(line, index);
                    startRowSpaceCount = textLine.firstNonWhitespaceCharacterIndex;
                }
                curRowStart = false;
            } else if (start && !textLine.isEmptyOrWhitespace && textLine.firstNonWhitespaceCharacterIndex <= startRowSpaceCount) {
                // 运行到这里，则当前行应为结束行
                const index = textLine.text.indexOf('}');
                // 如果结束行没有 '}'，说明存在格式错误或语法错误
                if (index !== -1) {
                    const end = new vscode.Position(line, index + 1);
                    result.push(new vscode.Range(start, end));
                }
                start = null;
            } else if (textLine.text.trim() === keyword) {
                // 将下一行标记为开始行
                curRowStart = true;
            }
        }
        return result;
    }
}

export class AstItem {
    public keyword: string;
    public expression: AstNode | null = null; // 目标的 ast 表达式
    public range: vscode.Range;
    public isEmpty: boolean;

    constructor(keyword: string, document: vscode.TextDocument, range: vscode.Range) {
        this.keyword = keyword;
        this.range = range;
        const targetText = '(' + document.getText(range) + ')';
        const ast = espree.parse(targetText, { ecmaVersion: 'latest' });
        this.expression = ast.body[0].expression;
        this.isEmpty = !this.expression?.properties.length;
    }

    /** 根据位置获取最小节点，并记录获取路径 */
    public getAstNode(index: number, node: AstNode = this.expression as AstNode, paths: Paths = []): [AstNode, Paths] {
        const keyList: Key[] = espree.VisitorKeys[node.type];
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            if (Array.isArray(node[key])) {
                const i = (node[key] as Array<AstNode>).findIndex(item => this.isNodeContainIndex(item, index));
                if (i !== -1) {
                    const targetNode = (node[key] as Array<AstNode>)[i];
                    switch (targetNode.type) {
                        case 'Property':
                            paths.push(targetNode.key.name);
                            return this.getAstNode(index, targetNode, paths);
                        case 'ObjectExpression':
                            paths.push(this.toSimpleObject(targetNode));
                            return this.getAstNode(index, targetNode, paths);
                    }
                }
            } else {
                if (this.isNodeContainIndex(node[key] as AstNode, index)) {
                    return this.getAstNode(index, node[key] as AstNode, paths);
                }
            }
        }
        return [node, paths];
    }

    /** 根据路径获取对应的 SimpleObject */
    public getSimpleObjectByPaths(paths: Paths): SimpleObject {
        let node = this.expression as AstNode;
        paths.forEach(path => {
            switch (node.type) {
                case 'Property':
                    if (typeof path === 'string') {
                        node = node.value.properties.find(item => item.key.name === path) as AstNode;
                    } else {
                        node = node.value.elements.find(item => JSON.stringify(this.toSimpleObject(item)) === JSON.stringify(path)) as AstNode;
                    }
                    break;
                case 'ObjectExpression':
                    node = node.properties.find(item => item.key.name === path) as AstNode;
                    break;
            }
        });
        return this.toSimpleObject(node);
    }

    /** 位置是否在节点中 */
    private isNodeContainIndex(node: AstNode, index: number): boolean {
        return node.start < index && index < node.end;
    }

    private toSimpleObject(node: AstNode): SimpleObject {
        const item: SimpleObject = {};
        switch (node.type) {
            case 'ObjectExpression':
                node.properties.forEach((property) => {
                    if (property.value.raw) {
                        item[property.key.name] = property.value.raw;
                    }
                });
                break;
            case 'Property':
                return this.toSimpleObject(node.value);
        }
        return item;
    }
}
