import * as vscode from 'vscode';
import { simillarCommands } from 'simillar-commands';
import Store from './store';
import { ExtensionName } from './extension';
import Ast, { AstItem } from './ast';
import localize from './localize';

export default class Diagnosis {
    private ast: Ast;
    private store: Store;
    public static disableCurrentLine: string = 'echarts-disable-line'; // 禁用当前行校验
    public static disableNextLine: string = 'echarts-disable-next-line'; // 禁用下一行校验
    public static disableBlock: string = 'echarts-disable'; // 禁用段落校验开始
    public static enableBlock: string = 'echarts-enable'; // 禁用段落校验结束

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
                        const name = (node.key as AstNode).name as string;
                        const simillarName = simillarCommands(descTreeList.map(child => child.name), name)[0];
                        let message = localize('message.unknown-property', name, 'EChartsOption');
                        if (simillarName) {
                            message += localize('message.fix-unknown-property', simillarName);
                        }
                        diagList.push({
                            code: simillarName,
                            message: message,
                            range: range,
                            severity: vscode.DiagnosticSeverity.Warning,
                            source: ExtensionName,
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
        if (new RegExp('(//\\s+' + Diagnosis.disableCurrentLine + '\\s*$)|(/\\* +' + Diagnosis.disableCurrentLine + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(position.line).text)) {
            return false;
        }
        // 禁用下一行检查
        if (new RegExp('(//\\s+' + Diagnosis.disableNextLine + '\\s*$)|(/\\*\\s+' + Diagnosis.disableNextLine + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(position.line - 1).text)) {
            return false;
        }
        // 禁用段落检查
        for (let i = position.line; i >= 0; i--) {
            if (new RegExp('(//\\s+' + Diagnosis.disableBlock + '\\s*$)|(/\\*\\s+' + Diagnosis.disableBlock + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(i).text)) {
                return false;
            }
            if (new RegExp('(//\\s+' + Diagnosis.enableBlock + '\\s*$)|(/\\*\\s+' + Diagnosis.enableBlock + '\\s+\\*/\\s*$)').test(this.ast.document.lineAt(i).text)) {
                return true;
            }
        }
        return true;
    }
};
