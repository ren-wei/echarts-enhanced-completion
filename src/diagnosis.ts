import * as vscode from 'vscode';
import Store from './store';
import Ast, { AstItem } from './ast';
import localize from './localize';

export default class Diagnosis {
    private ast: Ast;
    private store: Store;
    private disableCurrentLine: string = 'echarts-disable-line'; // 禁用当前行校验
    private disableNextLine: string = 'echarts-disable-next-line'; // 禁用下一行校验
    private disableBlock: string = 'echarts-disable'; // 禁用段落校验开始
    private enableBlock: string = 'echarts-enable'; // 禁用段落校验结束

    constructor(ast: Ast, store: Store) {
        this.ast = ast;
        this.store = store;
    }

    /** 更新校验 */
    public update(uri: vscode.Uri, collection: vscode.DiagnosticCollection) {
        collection.clear();
        const diagList: vscode.Diagnostic[] = [];
        for (const astItem of this.ast.astItems) {
            if (astItem.expression) {
                diagList.push(...this.checkNode(astItem, astItem.expression));
            }
        }
        collection.set(uri, diagList);
    }

    /** 递归检查节点 */
    private checkNode(astItem: AstItem, node : AstNode): vscode.Diagnostic[] {
        const diagList: vscode.Diagnostic[] = [];
        switch (node.type) {
            case 'ArrayExpression':
                (node.elements as AstNode[]).forEach((element) => {
                    diagList.push(...this.checkNode(astItem, element));
                });
                break;
            case 'ObjectExpression':
                (node.properties as AstNode[]).forEach(child => {
                    diagList.push(...this.checkNode(astItem, child));
                });
                break;
            case 'Property':
                const offset = (node.key as AstNode).start;
                const paths = this.ast.getMinAstNode(astItem, astItem.positionAt(offset))[1];
                const descTreeList = this.store.getOptionDesc(paths.slice(0, -1), astItem);
                if (node.value?.type !== 'Identifier' && descTreeList.length && !descTreeList.some(item => item.name === (node.key as AstNode).name)) {
                    const range = astItem.getNodeKeyRange(node);
                    // 如果存在禁用校验注释，那么不加入本次校验结果
                    if (this.isAllowCheck(range.start)) {
                        diagList.push({
                            code: paths.slice(0, -1).filter(v => typeof v === 'string').join('.'),
                            message: localize('message.unknown-property', (node.key as AstNode).name as string),
                            range: range,
                            severity: vscode.DiagnosticSeverity.Warning,
                            source: 'echarts-enhanced-completion',
                        });
                    }
                } else {
                    diagList.push(...this.checkNode(astItem, (node.value as AstNode)));
                }
                break;
        }
        return diagList;
    }

    /** 当前位置是否允许校验 */
    private isAllowCheck(position: vscode.Position): boolean {
        // 禁用当前行检查
        if (new RegExp('(//\\s+' + this.disableCurrentLine + '\\s*$)|(/\\* +' + this.disableCurrentLine + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(position.line).text)) {
            return false;
        }
        // 禁用下一行检查
        if (new RegExp('(//\\s+' + this.disableNextLine + '\\s*$)|(/\\*\\s+' + this.disableNextLine + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(position.line - 1).text)) {
            return false;
        }
        // 禁用段落检查
        for (let i = position.line; i >= 0; i--) {
            if (new RegExp('(//\\s+' + this.disableBlock + '\\s*$)|(/\\*\\s+' + this.disableBlock + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(i).text)) {
                return false;
            }
            if (new RegExp('(//\\s+' + this.enableBlock + '\\s*$)|(/\\*\\s+' + this.enableBlock + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(i).text)) {
                return true;
            }
        }
        return true;
    }
};
