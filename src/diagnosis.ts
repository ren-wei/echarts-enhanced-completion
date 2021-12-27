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
        for (const astItem of this.ast.astItems) {
            // 查看是否存在未知的顶级选项
            // 递归查看是否存在未知的属性
            // TODO: 下面是示例，需要更改
            // collection.set(uri, [{
            //     code: 'xAxis',
            //     message: 'cannot assign twice to immutable variable `x`',
            //     range: new vscode.Range(new vscode.Position(3, 5), new vscode.Position(3, 9)),
            //     severity: vscode.DiagnosticSeverity.Warning,
            //     source: 'echarts-enhanced-completion',
            //     relatedInformation: [
            //         new vscode.DiagnosticRelatedInformation(new vscode.Location(uri, new vscode.Range(new vscode.Position(1, 8), new vscode.Position(1, 9))), 'first assignment to `x`'),
            //     ],
            // }]);
        }
    }
};
