import * as vscode from 'vscode';
const espree = require('espree');

export default class Ast {
    private keyword: string;
    private document: vscode.TextDocument;
    private astItems: AstItem[] = [];

    constructor(keyword: string, document: vscode.TextDocument) {
        this.keyword = keyword;
        this.document = document;
        this.init(keyword, document);
    }

    public get validate() : boolean {
        return this.astItems.length > 0;
    }

    public getAstItem(position: vscode.Position): AstItem | undefined {
        return this.astItems.find(item => item.range.contains(position));
    }

    /** 获取所在位置的最小Ast节点，并且记录路径 */
    public getMinAstNode(astItem: AstItem | undefined, position: vscode.Position): [AstNode | null, Paths] {
        if (!astItem) return [null, []];
        return astItem.getAstNode(this.document.offsetAt(position) - this.document.offsetAt(astItem.range.start) + 2);
    }

    /** 文档内容变更时，对局部进行更新 */
    public patch(contentChanges: readonly vscode.TextDocumentContentChangeEvent[]): void {
        contentChanges.forEach(contentChange => {
            // 对已经存在的目标进行更新
            this.astItems = this.astItems.filter(item => item.patch(contentChange));
            // 将新的目标加入数组中
            console.log(contentChange);
            contentChange.text.split('\n').forEach((text, index, array) => {
                if (!index) {
                    text = this.document.lineAt(contentChange.range.start.line).text;
                } else if (index === array.length - 1) {
                    text = this.document.lineAt(contentChange.range.start.line + array.length - 1).text;
                }
                if (text.includes(this.keyword)) {
                    this.astItems.push(new AstItem(this.keyword, this.document, this.document.lineAt(contentChange.range.start.line + index).range, contentChange.range.start.line + index, contentChange.range.start.line + index));
                }
            });
            console.log(this.astItems);
        });
    }

    /** 更新校验 */
    public updateDiagnostics(uri: vscode.Uri, collection: vscode.DiagnosticCollection) {
        // TODO: 下面是示例，需要更改
        // collection.set(uri, [{
        //     code: 'xAxis',
        //     message: 'cannot assign twice to immutable variable `x`',
        //     range: new vscode.Range(new vscode.Position(3, 5), new vscode.Position(3, 9)),
        //     severity: vscode.DiagnosticSeverity.Warning,
        //     source: 'echarts-enhanced-completion',
        //     relatedInformation: [
        //         new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`'),
        //     ],
        // }]);
    }

    private init(keyword: string, document: vscode.TextDocument) {
        let start: vscode.Position | null = null;
        let curRowStart = false;
        let startRowSpaceCount: number = 0;
        this.astItems = [];
        for (let line = 0; line < document.lineCount; line++) {
            const textLine = document.lineAt(line);
            if (curRowStart) {
                // 当前行为开始行
                const index = textLine.text.indexOf('{');
                if (index !== -1) {
                    start = new vscode.Position(line, index);
                    startRowSpaceCount = textLine.firstNonWhitespaceCharacterIndex;
                } else {
                    // 注释行的下一行不存在目标对象
                    this.astItems.push(new AstItem(keyword, document, document.lineAt(line - 1).range, line - 1, line - 1));
                }
                curRowStart = false;
            } else if (start && !textLine.isEmptyOrWhitespace && textLine.firstNonWhitespaceCharacterIndex <= startRowSpaceCount) {
                // 运行到这里，则当前行应为结束行
                const index = textLine.text.indexOf('}');
                if (index !== -1) {
                    const end = new vscode.Position(line, index + 1);
                    this.astItems.push(new AstItem(keyword, document, new vscode.Range(start, end), start.line - 1, end.line));
                } else {
                    // 结束行没有 '}'，说明存在格式错误或语法错误
                    this.astItems.push(new AstItem(keyword, document, document.lineAt(start.line).range, start.line, start.line));
                }
                start = null;
            } else if (textLine.text.trim() === keyword) {
                // 将下一行标记为开始行
                curRowStart = true;
            }
        }
        if (curRowStart) {
            // 注释行之后没有下一行
            this.astItems.push(new AstItem(keyword, document, document.lineAt(document.lineCount - 1).range, document.lineCount - 1, document.lineCount - 1));
        } else if (start) {
            // 没有找到结束行
            this.astItems.push(new AstItem(keyword, document, document.lineAt(start.line).range, start.line, start.line));
        }
    }
}

export class AstItem {
    public keyword: string;
    public expression: AstNode | null = null; // 目标的 ast 表达式
    public range: vscode.Range; // 目标对象所在的范围
    private startRow: number; // 注释所在行
    private endRow: number; // 结尾右括号所在行，如果不存在目标对象，则与开始行相等

    constructor(keyword: string, document: vscode.TextDocument, range: vscode.Range, startRow: number, endRow: number) {
        this.keyword = keyword;
        this.range = range;
        this.startRow = startRow;
        this.endRow = endRow;
        if (startRow !== endRow) {
            const targetText = '(' + document.getText(range) + ')';
            const ast = espree.parse(targetText, { ecmaVersion: 'latest' });
            this.expression = ast.body[0].expression;
        }
    }

    public get isEmpty(): boolean {
        return !this.expression?.properties.length;
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

    public patch(contentChanges: vscode.TextDocumentContentChangeEvent): boolean {
        return true;
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
