import * as vscode from 'vscode';
import Store from './store';
import Ast, { AstItem } from './ast';

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
        for (const astItem of this.ast.astItems) {
            if (astItem.expression) {
                // 警告未知的顶级选项
                const diagList: vscode.Diagnostic[] = [];
                astItem.expression.properties?.map(node => {
                    if (node.value?.type !== 'Identifier' && !this.store.topOptionDesc.some(item => item.name === (node.key as AstNode).name)) {
                        diagList.push({
                            code: 'echarts',
                            message: `EchartsOption 中不存在 '${node.key?.name}' 属性`,
                            range: astItem.getNodeKeyRange(node),
                            severity: vscode.DiagnosticSeverity.Warning,
                            source: 'echarts-enhanced-completion',
                        });
                    }
                });
                collection.set(uri, diagList);
                // TODO: 递归查看是否存在未知的属性
            }
        }
    }
};
