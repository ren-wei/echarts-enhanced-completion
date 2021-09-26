import * as vscode from 'vscode';
const espree = require('espree');

export default class Ast {
    public validate: boolean = false; // 目标是否存在
    public expression: AstNode | null = null; // 目标的 ast 表达式
    public minAst: AstNode | null = null; // 光标所在的最小 Ast 节点
    public paths: Paths = []; // 访问节点的路径

    constructor(keyword: string, document: vscode.TextDocument, position: vscode.Position) {
        // 获取目标的范围
        const range = this.getRange(keyword, document, position);
        // 当前位置是否在范围内
        this.validate = range !== null;
        if (!range) return;
        // 获取光标所在的最小Ast节点和访问节点的路径
        const targetText = '(' + document.getText(range) + ')';
        const ast = espree.parse(targetText, { ecmaVersion: 'latest' });
        this.expression = ast.body[0].expression;
        if (this.expression) {
            [this.minAst, this.paths] = this.getAstNode(this.expression, document.offsetAt(position) - document.offsetAt(range.start) + 2);
        }
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

    /** 获取选项对象所在的范围 */
    private getRange(keyword: string, document: vscode.TextDocument, position: vscode.Position): vscode.Range | null {
        let start: vscode.Position | null = null;
        let curRowStart = false;
        let startRowSpaceCount: number = 0;
        for (let line = 0; line < document.lineCount; line++) {
            const textLine = document.lineAt(line);
            if (curRowStart) {
                // 运行到这里，则当前行为开始行
                if (position.line <= line) return null;
                const index = textLine.text.indexOf('{');
                if (index !== -1) {
                    start = new vscode.Position(line, index);
                    startRowSpaceCount = textLine.firstNonWhitespaceCharacterIndex;
                }
                curRowStart = false;
            } else if (start && !textLine.isEmptyOrWhitespace && textLine.firstNonWhitespaceCharacterIndex <= startRowSpaceCount) {
                // 运行到这里，则当前行应为结束行
                if (position.line < line) {
                    const index = textLine.text.indexOf('}');
                    if (index !== -1) {
                        const end = new vscode.Position(line, index + 1);
                        return new vscode.Range(start, end);
                    }
                    // 结束行没有 '}'，说明存在格式错误或语法错误
                    return null;
                } else if (position.line === line) {
                    return null;
                }
                start = null;
            } else if (textLine.text.trim() === keyword) {
                // 将下一行标记为开始行
                curRowStart = true;
            }
        }
        return null;
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

    /** 根据位置获取最小节点，并记录获取路径 */
    private getAstNode(node: AstNode, index: number, paths: Paths = []): [AstNode, Paths] {
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
                            return this.getAstNode(targetNode, index, paths);
                        case 'ObjectExpression':
                            paths.push(this.toSimpleObject(targetNode));
                            return this.getAstNode(targetNode, index, paths);
                    }
                }
            } else {
                if (this.isNodeContainIndex(node[key] as AstNode, index)) {
                    return this.getAstNode(node[key] as AstNode, index, paths);
                }
            }
        }
        return [node, paths];
    }
}
