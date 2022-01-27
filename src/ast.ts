import * as vscode from 'vscode';
import { keyword, supportedLanguageList } from './extension';
const espree = require('espree');

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidOpenTextDocument(document => {
        if (supportedLanguageList.includes(document.languageId)) {
            cache.set(document.uri, init(keyword, document));
        }
    }),
    vscode.workspace.onDidCloseTextDocument(document => {
        if (supportedLanguageList.includes(document.languageId)) {
            cache.delete(document.uri);
        }
    }),
    vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvent => {
        if (supportedLanguageList.includes(textDocumentChangeEvent.document.languageId)) {
            // 将存在多行填充contentChange放在后面，以防止重新初始化后，ast结构被破坏
            ast.patch(textDocumentChangeEvent.document, Array.from(textDocumentChangeEvent.contentChanges).sort((a, b) => a.text.split('\n').length - b.text.split('\n').length));
        }
    }),
];

const cache = new Map<vscode.Uri, AstItem[]>();

const ast = {
    getAstItem(document: vscode.TextDocument, position: vscode.Position): AstItem | undefined {
        let astItems: AstItem[];
        if (cache.has(document.uri)) {
            astItems = (cache.get(document.uri) as AstItem[]);
        } else {
            astItems = init(keyword, document);
            cache.set(document.uri, astItems);
        }

        return astItems.find(item => item.range.contains(position));
    },

    getAstItems(uri: vscode.Uri): AstItem[] {
        return cache.get(uri) || [];
    },

    /** 获取所在位置的最小Ast节点，并且记录路径 */
    getMinAstNode(astItem: AstItem | undefined, position: vscode.Position): [AstNode | null, Paths] {
        if (!astItem || !astItem.expression) return [null, []];
        return astItem.getAstNode(astItem.document.offsetAt(position) - astItem.document.offsetAt(astItem.range.start) + 1);
    },

    /** 文档内容变更时，对局部进行更新 */
    patch(document: vscode.TextDocument, contentChanges: readonly vscode.TextDocumentContentChangeEvent[]): void {
        let astItems: AstItem[];
        if (cache.has(document.uri)) {
            astItems = cache.get(document.uri) || [];
            let reinitialize = false; // 只要修改了注释行就重新初始化
            for (const contentChange of contentChanges) {
                for (const item of astItems) {
                    if (!item.patch(contentChange)) {
                        reinitialize = true;
                        break;
                    }
                }
                if (reinitialize) {
                    break;
                }
                // 将新的目标加入数组中
                const lines = contentChange.text.split('\n');
                for (let index = 0; index < lines.length; index++) {
                    let text: string;
                    if (!index) {
                        text = document.lineAt(contentChange.range.start.line).text;
                    } else if (index === lines.length - 1) {
                        text = document.lineAt(contentChange.range.start.line + lines.length - 1).text;
                    } else {
                        text = lines[index];
                    }
                    if (text.includes(keyword)) {
                        astItems.push(...init(keyword, document, contentChange.range.start.line + index, 2 * contentChange.range.start.line - contentChange.range.end.line + lines.length));
                        break;
                    }
                }
            }
            if (reinitialize) {
                astItems = init(keyword, document);
            }
        } else {
            astItems = init(keyword, document);
        }
        cache.set(document.uri, astItems);
    },
};

export default ast;

export function init(keyword: string, document: vscode.TextDocument, startLine = 0, endLine = document.lineCount): AstItem[] {
    let start: vscode.Position | null = null;
    let curRowStart = false; // 当前行是开始行
    let count = 0;
    const astItems: AstItem[] = [];
    for (let line = startLine; line < endLine || ((curRowStart || start) && endLine < document.lineCount); line++) {
        const textLine = document.lineAt(line);
        if (start) {
            // 匹配括号并且忽略引号中的括号
            const ignoreList: [start: number, end: number][] = [];
            let match: RegExpExecArray | null;
            let reg = /('(?:[^']|(?:\\'))*')|("(?:[^"]|(?:\\"))*")|(`(?:[^`]|(?:\\`))*`)/g; // 匹配包含引号的字符串
            while ((match = reg.exec(textLine.text))) {
                ignoreList.push([match.index, match.index + match[0].length]);
            }
            reg = /[{}]/g;
            while ((match = reg.exec(textLine.text))) {
                // 不在引号中
                if (ignoreList.every(([startIndex, endIndex]) => match && (match.index < startIndex || match.index > endIndex))) {
                    if (match[0] === '{') {
                        count++;
                    } else {
                        count--;
                        if (!count) {
                            // 找到结束位置
                            astItems.push(new AstItem(keyword, document, new vscode.Range(start.line, start.character, line, match.index + 1), start.line - 1, line));
                            start = null;
                            break;
                        }
                    }
                }
            }
        } else if (curRowStart) {
            const startCharacter = textLine.text.indexOf('{');
            if (startCharacter !== -1) {
                start = new vscode.Position(line, startCharacter);
                line--;
            } else {
                // 注释行的下一行不存在目标对象
                astItems.push(new AstItem(keyword, document, new vscode.Range(line, 0, line, 0), line - 1, line));
            }
            curRowStart = false;
        } else if (textLine.text.trim() === keyword) {
            curRowStart = true;
        }
    }
    if (curRowStart) {
        // 注释行之后没有下一行
        astItems.push(new AstItem(keyword, document, document.lineAt(document.lineCount - 1).range, document.lineCount - 1, document.lineCount));
    } else if (start) {
        // 没有找到结束行
        astItems.push(new AstItem(keyword, document, document.lineAt(start.line).range, start.line - 1, start.line));
    }
    return astItems;
}

export class AstItem {
    public keyword: string;
    public expression: AstNode | null = null; // 目标的 ast 表达式
    public range: vscode.Range; // 目标对象所在的范围，使用 this.document.getText(this.range) 时必须恰好返回选项对象
    public document: vscode.TextDocument;
    private startRow: number; // 注释所在行
    private endRow: number; // 结尾右括号所在行，如果不存在目标对象，则为开始行的下一行

    constructor(keyword: string, document: vscode.TextDocument, range: vscode.Range, startRow: number, endRow: number) {
        this.keyword = keyword;
        this.document = document;
        this.range = range;
        this.startRow = startRow;
        this.endRow = endRow;
        this.expression = this.parse();
    }

    public get isEmpty(): boolean {
        return !this.expression?.properties?.length;
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
                            paths.push(targetNode?.key?.name as string);
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

    /**
     * 获取属性名对应的节点
     * @param key 由 . 连接的属性名，如果存在类似 `parent-child` 的部分，则解析为 parent: {type: 'child'}
     * @param root 查询节点的起始节点
     * @returns node: node.key.name === key
     */
    public getAstNodeByKey(key: string, root = this.expression): AstNode | null {
        if (!root) return null;
        const paths = key.split('.');
        let node: AstNode | undefined = root;
        paths.forEach(path => {
            if (!node) return null;
            switch (node.type) {
                case 'Property':
                    if (node.value?.properties) {
                        node = node.value.properties.find(item => item.key?.name === path);
                    } else if (node.value?.elements) {
                        node = node.value.elements[0];
                    } else {
                        node = undefined;
                    }
                    break;
                case 'ObjectExpression':
                    if (path.includes('-')) {
                        const [parent, type] = path.split('-');
                        node = node.properties?.find(item => item.key?.name === parent);
                        if (node) {
                            const reg = new RegExp('^[\'"]' + type + '[\'"]$');
                            node = node.value?.elements?.find(item => reg.test(this.toSimpleObject(item).type));
                        }
                    } else {
                        node = node.properties?.find(item => item.key?.name === path);
                    }
                    break;
            }
        });
        if (node?.key?.name === paths[paths.length - 1]) {
            return node;
        }
        return null;
    }

    /** 根据路径获取对应的 SimpleObject */
    public getSimpleObjectByPaths(paths: Paths): SimpleObject {
        let node = this.expression as AstNode;
        paths.forEach(path => {
            switch (node.type) {
                case 'Property':
                    if (typeof path === 'string') {
                        node = node.value?.properties?.find(item => item.key?.name === path) as AstNode;
                    } else {
                        node = node.value?.elements?.find(item => JSON.stringify(this.toSimpleObject(item)) === JSON.stringify(path)) as AstNode;
                    }
                    break;
                case 'ObjectExpression':
                    node = node.properties?.find(item => item.key?.name === path) as AstNode;
                    break;
            }
        });
        return this.toSimpleObject(node);
    }

    public patch(contentChange: vscode.TextDocumentContentChangeEvent): boolean {
        // 如果修改了注释行，那么全部重新初始化
        if (contentChange.range.start.line <= this.startRow) {
            return false;
        }

        // 目标不存在时，尝试初始化
        if (!this.expression) {
            if (contentChange.range.start.line === this.startRow + 1 || this.startRow !== this.endRow) {
                this.init();
            }
            return true;
        }

        // 更新位置在当前范围之后，不需要更新
        if (contentChange.range.start.line > this.endRow) {
            return true;
        }
        // 更新位置在当前范围之前，仅调整范围
        if (contentChange.range.end.line < this.startRow) {
            const offset = contentChange.range.start.line - contentChange.range.end.line + contentChange.text.split('\n').length - 1;
            this.startRow += offset;
            this.endRow += offset;
            this.range = new vscode.Range(this.range.start.translate(offset), this.range.end.translate(offset));
            return true;
        }
        // 如果是 Enter 触发补全，那么只需要调整范围
        if (!contentChange.rangeLength && /^\r?\n[ \t]+$/.test(contentChange.text) && !this.document.lineAt(contentChange.range.start.line + 1).text.trim()) {
            this.translate(this.expression, contentChange.rangeOffset - this.document.offsetAt(this.range.start), contentChange.text.length);
            this.endRow += contentChange.text.split('\n').length - 1;
            this.range = new vscode.Range(this.range.start, new vscode.Position(this.endRow, this.range.end.character));
            return true;
        }

        // 如果填充包含了多行或者修改包含了结束行，那么需要重新初始化
        if (contentChange.text.indexOf('\n') !== -1 || contentChange.range.end.line >= this.endRow) {
            this.init();
            return true;
        }

        /* 修改位置在内部 */

        // 调整范围
        this.endRow += contentChange.range.start.line - contentChange.range.end.line + contentChange.text.split('\n').length - 1;
        this.range = new vscode.Range(this.range.start, new vscode.Position(this.endRow, this.range.end.character));

        // 调整 expression
        const [parentNode, key, index] = this.getUpdateNode(contentChange);
        if (!key) {
            this.expression = this.parse(this.range) || this.expression;
        } else {
            let node = parentNode[key] as AstNode | AstNode[];
            if (Array.isArray(node)) {
                node = (node as AstNode[])[index];
            }
            const range = new vscode.Range(
                this.positionAt(node.start),
                this.positionAt(node.end - contentChange.rangeLength + contentChange.text.length),
            );
            // 更新节点位置
            this.translate(this.expression, node.end, contentChange.text.length - contentChange.rangeLength);
            // 替换节点
            const newNode = this.parse(range) as AstNode;
            this.translate(newNode, 0, node.start);
            if (Array.isArray(parentNode[key])) {
                (parentNode[key] as AstNode[])[index] = newNode;
            } else {
                (parentNode[key] as AstNode) = newNode;
            }
        }
        return true;
    }

    /** 获取节点的 key 的范围 */
    public getNodeKeyRange(node: AstNode): vscode.Range {
        return new vscode.Range(this.positionAt((node.key as AstNode).start), this.positionAt((node.key as AstNode).end));
    }

    /** expression 中的位置转换为 document 中的位置*/
    public positionAt(offset: number): vscode.Position {
        return this.document.positionAt(this.document.offsetAt(this.range.start) + offset);
    }

    /** 获取更新范围内的最小对象或数组节点 */
    private getUpdateNode(contentChange: vscode.TextDocumentContentChangeEvent, node: AstNode = this.expression as AstNode): [AstNode, Key | null, number] {
        const keyList: Key[] = espree.VisitorKeys[node.type];
        if (!keyList) return [node, null, -1];
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            if (Array.isArray(node[key])) {
                for (let j = 0; j < (node[key] as AstNode[]).length; j++) {
                    if (this.isNodeContainRange((node[key] as AstNode[])[j], contentChange.range)) {
                        const [targetNode, targetKey, targetJ] = this.getUpdateNode(contentChange, (node[key] as AstNode[])[j]);
                        if (targetKey) {
                            return [targetNode, targetKey, targetJ];
                        } else if (['ObjectExpression', 'ArrayExpression'].includes((node[key] as AstNode[])[j].type)) {
                            return [node, key, j];
                        } else {
                            return [targetNode, null, -1];
                        }
                    }
                }
            } else if (node[key] && typeof node[key] === 'object' && this.isNodeContainRange(node[key] as AstNode, contentChange.range)) {
                const [targetNode, targetKey, targetJ] = this.getUpdateNode(contentChange, node[key] as AstNode);
                if (targetKey) {
                    return [targetNode, targetKey, targetJ];
                } else if (['ObjectExpression', 'ArrayExpression'].includes((node[key] as AstNode).type)) {
                    return [node, key, -1];
                } else {
                    return [targetNode, null, -1];
                }
            }
        }
        return [node, null, -1];
    }

    private init(): void {
        const startLine = this.startRow + 1;
        const startIndex = this.document.lineAt(startLine).text.indexOf('{');
        if (startIndex !== -1) {
            // 使用括号匹配找出结束位置
            let count = 1; // 需要匹配的左大括号数量，归零时为结束位置
            for (let line = startLine + 1; line < this.document.lineCount; line++) {
                const textLine = this.document.lineAt(line);
                // 匹配括号并且忽略引号中的括号
                const ignoreList: [start: number, end: number][] = [];
                let match: RegExpExecArray | null;
                let reg = /('(?:[^']|(?:\\'))*')|("(?:[^"]|(?:\\"))*")|(`(?:[^`]|(?:\\`))*`)/g; // 匹配包含引号的字符串
                while ((match = reg.exec(textLine.text))) {
                    ignoreList.push([match.index, match.index + match[0].length]);
                }
                reg = /[{}]/g;
                while ((match = reg.exec(textLine.text))) {
                    // 不在引号中
                    if (ignoreList.every(([start, end]) => match && (match.index < start || match.index > end))) {
                        if (match[0] === '{') {
                            count++;
                        } else {
                            count--;
                            if (!count) {
                                // 找到结束位置
                                this.range = new vscode.Range(startLine, startIndex, line, match.index + 1);
                                this.endRow = line;
                                this.expression = this.parse();
                                return;
                            }
                        }
                    }
                }
            }
        }
    }

    private parse(range = this.range): AstNode | null {
        if (this.startRow !== this.endRow - 1) {
            const targetText = '(' + this.document.getText(range) + ')';
            try {
                const ast = espree.parse(targetText, { ecmaVersion: 'latest' });
                const expression = ast.body[0].expression;
                this.translate(expression, 0, -1);
                return expression;
            } catch (e) {
                return {
                    type: 'ErrorExpression',
                    start: 0,
                    end: targetText.length - 2,
                    raw: targetText,
                };
            }
        }
        return null;
    }

    /** 将表达式中中所有大于等于 limit 的位置偏移 offset */
    private translate(node: AstNode | null, limit: number, offset: number) {
        if (!node || node.end < limit) return;
        if (node.start >= limit) node.start += offset;
        if (node.end >= limit) node.end += offset;
        const keyList: Key[] = espree.VisitorKeys[node.type];
        if (keyList) {
            for (let i = 0; i < keyList.length; i++) {
                const key = keyList[i];
                if (Array.isArray(node[key])) {
                    (node[key] as AstNode[]).forEach(v => this.translate(v, limit, offset));
                } else if (typeof node[key] === 'object') {
                    this.translate(node[key] as AstNode, limit, offset);
                }
            }
        }
    }

    /** document 中的位置转换为 expression 中的位置 */
    private offsetAt(position: vscode.Position): number {
        return this.document.offsetAt(position) - this.document.offsetAt(this.range.start);
    }

    /** 位置是否在节点中 */
    private isNodeContainIndex(node: AstNode, index: number): boolean {
        return node.start < index && index < node.end;
    }

    /** 范围是否在节点中 */
    private isNodeContainRange(node: AstNode, range: vscode.Range): boolean {
        return node.start < this.offsetAt(range.start) && this.offsetAt(range.end) < node.end;
    }

    private toSimpleObject(node: AstNode): SimpleObject<string> {
        const item: SimpleObject<string> = {};
        switch (node.type) {
            case 'ObjectExpression':
                node.properties?.forEach((property) => {
                    if (property.value?.raw) {
                        item[property.key?.name as string] = property.value.raw;
                    }
                });
                break;
            case 'Property':
                return this.toSimpleObject(node.value as AstNode);
        }
        return item;
    }
}
