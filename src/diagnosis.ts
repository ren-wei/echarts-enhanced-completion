import * as vscode from 'vscode';
import Store from './store';
import Ast, { AstItem } from './ast';
import localize from './localize';

export default class Diagnosis {
    private ast: Ast;
    private store: Store;

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
                    diagList.push({
                        code: paths.slice(0, -1).filter(v => typeof v === 'string').join('.'),
                        message: localize('message.unknown-property').replace('${0}', (node.key as AstNode).name as string),
                        range: astItem.getNodeKeyRange(node),
                        severity: vscode.DiagnosticSeverity.Warning,
                        source: 'echarts-enhanced-completion',
                    });
                } else {
                    diagList.push(...this.checkNode(astItem, (node.value as AstNode)));
                }
                break;
        }
        return diagList;
    }
};
