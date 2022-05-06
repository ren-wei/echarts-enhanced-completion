import * as vscode from 'vscode';
import { keyword, supportedLanguageList } from './extension';
import * as esprima from 'esprima';
import * as estree from 'estree';

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
    /** 获取文档指定位置所在的 AstItem */
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

    /** 获取文档的 AstItem[] */
    getAstItems(uri: vscode.Uri): AstItem[] {
        return cache.get(uri) || [];
    },

    /** 获取所在位置的最小Ast节点，并且记录路径 */
    getMinAstNode(astItem: AstItem | undefined, position: vscode.Position): [estree.Node | null, Paths] {
        if (!astItem?.expression) return [null, []];
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
    public expression: estree.ObjectExpression | null = null; // 目标的 ast 表达式
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
    public getAstNode(index: number, node: estree.Node = this.expression as estree.Node, paths: Paths = []): [estree.Node, Paths] {
        const keyList = this.getNodeKeyList(node);
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            const value = (node as any)[key] as estree.Node | estree.Node[];
            if (Array.isArray(value)) {
                const i = value.findIndex(item => this.isNodeContainIndex(item, index));
                if (i !== -1) {
                    const targetNode = value[i];
                    switch (targetNode.type) {
                        case esprima.Syntax.Property:
                            if (targetNode.key.type === esprima.Syntax.Identifier) {
                                paths.push(targetNode.key.name);
                                return this.getAstNode(index, targetNode, paths);
                            }
                        case esprima.Syntax.ObjectExpression:
                            paths.push(this.toSimpleObject(targetNode));
                            return this.getAstNode(index, targetNode, paths);
                    }
                }
            } else {
                if (this.isNodeContainIndex(value, index)) {
                    return this.getAstNode(index, value, paths);
                }
            }
        }
        return [node, paths];
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
            const value = (parentNode as any)[key] as estree.Node | estree.Node[];
            let node = value;
            if (Array.isArray(node)) {
                node = node[index];
            }
            const range = new vscode.Range(
                this.positionAt(node.range![0]),
                this.positionAt(node.range![1] - contentChange.rangeLength + contentChange.text.length),
            );
            // 更新节点位置
            this.translate(this.expression, node.range![1], contentChange.text.length - contentChange.rangeLength);
            // 替换节点
            const newNode = this.parse(range) as estree.Node;
            this.translate(newNode, 0, node.range![0]);
            if (Array.isArray(value)) {
                value[index] = newNode;
            } else {
                (parentNode as any)[key] = newNode;
            }
        }
        return true;
    }

    /** 获取节点的 key 的范围 */
    public getNodeKeyRange(node: estree.Node): vscode.Range {
        return new vscode.Range(this.positionAt((node as estree.Property).key?.range![0]), this.positionAt((node as estree.Property).key?.range![1]));
    }

    /** 获取到达节点的路径 */
    public getPathsByNode(node: estree.Node): Paths {
        // TODO: 需要优化
        const result = this.getAstNode(node.range![0]);
        return result[1];
    }

    /** 根据路径获取节点 */
    public getNodeByPaths(paths: Paths): estree.Node | null {
        let node = this.expression as estree.Node;
        paths.forEach(path => {
            if (!node) return null;
            switch (node.type) {
                case esprima.Syntax.Property:
                    if (typeof path === 'string' && node.value.type === esprima.Syntax.ObjectExpression) {
                        node = node.value.properties.find(item => ((item as estree.Property).key as estree.Identifier)?.name === path) as estree.Node;
                    } else if (typeof path === 'object' && node.value.type === esprima.Syntax.ArrayExpression) {
                        node = node.value.elements.find(item => JSON.stringify(this.toSimpleObject(item)) === JSON.stringify(path)) as estree.Node;
                    }
                    break;
                case esprima.Syntax.ObjectExpression:
                    node = node.properties.find(item => ((item as estree.Property).key as estree.Identifier)?.name === path) as estree.Node;
                    break;
            }
        });
        return node;
    }

    /** expression 中的位置转换为 document 中的位置*/
    public positionAt(offset: number): vscode.Position {
        return this.document.positionAt(this.document.offsetAt(this.range.start) + offset);
    }

    /** 将节点转换为简单对象 */
    public toSimpleObject(node: estree.Node | null): SimpleObject<string> {
        const item: SimpleObject<string> = {};
        if (node === null) return item;
        switch (node.type) {
            case esprima.Syntax.ObjectExpression:
                node.properties.forEach((property) => {
                    if (property.type === esprima.Syntax.Property && property.value.type === esprima.Syntax.Literal && property.key.type === esprima.Syntax.Identifier) {
                        item[property.key.name] = property.value.raw || '';
                    }
                });
                break;
            case esprima.Syntax.Property:
                return this.toSimpleObject(node.value);
        }
        return item;
    }

    /** 获取更新范围内的最小对象或数组节点 */
    private getUpdateNode(contentChange: vscode.TextDocumentContentChangeEvent, node: estree.Node = this.expression as estree.Node): [estree.Node, string | null, number] {
        const keyList = this.getNodeKeyList(node);
        if (!keyList) return [node, null, -1];
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            const value = (node as any)[key] as estree.Node | estree.Node[];
            if (Array.isArray(value)) {
                for (let j = 0; j < value.length; j++) {
                    if (this.isNodeContainRange(value[j], contentChange.range)) {
                        const [targetNode, targetKey, targetJ] = this.getUpdateNode(contentChange, value[j]);
                        if (targetKey) {
                            return [targetNode, targetKey, targetJ];
                        } else if (([esprima.Syntax.ObjectExpression, esprima.Syntax.ArrayExpression] as string[]).includes(value[j].type)) {
                            return [node, key, j];
                        } else {
                            return [targetNode, null, -1];
                        }
                    }
                }
            } else if (typeof value === 'object' && this.isNodeContainRange(value, contentChange.range)) {
                const [targetNode, targetKey, targetJ] = this.getUpdateNode(contentChange, value);
                if (targetKey) {
                    return [targetNode, targetKey, targetJ];
                } else if (['ObjectExpression', 'ArrayExpression'].includes((value).type)) {
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

    private parse(range = this.range, text = ''): estree.ObjectExpression | null {
        if (this.startRow !== this.endRow - 1) {
            const targetText = text || '(' + this.document.getText(range) + ')';
            try {
                const ast = esprima.parseScript(targetText, { range: true, tolerant: true, comment: true }, node => {
                    node.range = [node.range![0] - 1, node.range![1] - 1];
                });
                const expression = (ast.body[0] as estree.ExpressionStatement).expression as estree.ObjectExpression;
                return expression;
            } catch (e) {
                const newTargetText = this.replaceErrorPart(targetText, ((e as EsprimaError).index));
                if (newTargetText === targetText) return null;
                return this.parse(range, newTargetText);
            }
        }
        return null;
    }

    /** 以大括号为最小块，将出现错误的部分替换为空格 */
    private replaceErrorPart(text: string, index: number): string {
        // 假设大括号是对称的
        // 从index开始向前找出当前所在的左大括号的位置
        let count = 1; // 未匹配的左括号数量
        let curIndex = index;
        let startIndex = 2;
        while (--curIndex) {
            if (text[curIndex] === '{') {
                count--;
            } else if (text[curIndex] === '}') {
                count++;
            }
            if (!count) {
                startIndex = curIndex;
                break;
            }
        }
        // 从index开始向后找出当前所在的右大括号的位置
        count = 1; // 未匹配的右括号的数量
        let endIndex = text.length - 2;
        curIndex = index;
        while (++curIndex && curIndex < text.length) {
            if (text[curIndex] === '{') {
                count++;
            } else if (text[curIndex] === '}') {
                count--;
            }
            if (!count) {
                endIndex = curIndex;
                break;
            }
        }
        // 将括号内的部分替换为字符串
        return text.slice(0, startIndex + 1) + (new Array(endIndex - startIndex)).fill('').join(' ') + text.slice(endIndex);
    }

    /** 将表达式中中所有大于等于 limit 的位置偏移 offset */
    private translate(node: estree.Node | null, limit: number, offset: number) {
        if (!node || node.range![1] < limit) return;
        if (node.range![0] >= limit) node.range![0] += offset;
        if (node.range![1] >= limit) node.range![1] += offset;
        const keyList = this.getNodeKeyList(node);
        for (let i = 0; i < keyList.length; i++) {
            const key = keyList[i];
            // key 是从 node 中取的，因此 node[key] 一定存在
            const value = (node as any)[key] as estree.Node | estree.Node[];
            if (Array.isArray(value)) {
                value.forEach(v => this.translate(v, limit, offset));
            } else if (typeof value === 'object') {
                this.translate(value, limit, offset);
            }
        }
    }

    /** document 中的位置转换为 expression 中的位置 */
    private offsetAt(position: vscode.Position): number {
        return this.document.offsetAt(position) - this.document.offsetAt(this.range.start);
    }

    /** 位置是否在节点中 */
    private isNodeContainIndex(node: estree.Node, index: number): boolean {
        return node.range![0] < index && index < node.range![1];
    }

    /** 范围是否在节点中 */
    private isNodeContainRange(node: estree.Node, range: vscode.Range): boolean {
        return node.range![0] < this.offsetAt(range.start) && this.offsetAt(range.end) < node.range![1];
    }

    /** 获取节点的值为节点的key列表 */
    private getNodeKeyList(node: estree.Node) {
        return Object.entries(node).filter(([key, value]) => typeof value === 'object' && key !== 'range').map(([key, value]) => key);
    }
}
