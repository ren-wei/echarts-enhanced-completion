import * as vscode from 'vscode';
import { simillarCommands } from 'simillar-commands';
import { getOptionDesc } from './store';
import { ExtensionName, collection } from './extension';
import ast, { AstItem } from './ast';
import localize from './localize';
import Config from './config';

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidOpenTextDocument(document => {
        Diagnosis.update(document.uri, collection);
    }),
    vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvent => {
        Diagnosis.update(textDocumentChangeEvent.document.uri, collection);
    }),
    vscode.workspace.onDidChangeConfiguration(configurationChangeEvent => {
        if (configurationChangeEvent.affectsConfiguration(Config.name.language)) {
            vscode.workspace.textDocuments.forEach(document => {
                Diagnosis.update(document.uri, collection);
            });
        }
    }),
];

/** 诊断程序 */
const Diagnosis = {
    disableCurrentLine: 'echarts-disable-line', // 禁用当前行校验
    disableNextLine: 'echarts-disable-next-line', // 禁用下一行校验
    disableBlock: 'echarts-disable', // 禁用段落校验开始
    enableBlock: 'echarts-enable', // 禁用段落校验结束

    /** 更新校验 */
    update(uri: vscode.Uri, collection: vscode.DiagnosticCollection) {
        collection.clear();
        const diagList: vscode.Diagnostic[] = [];
        for (const astItem of ast.getAstItems(uri)) {
            if (astItem.expression) {
                diagList.push(...checkNode(astItem, astItem.expression));
            }
        }
        collection.set(uri, diagList);
    },
};

export default Diagnosis;

/** 递归检查节点 */
function checkNode(astItem: AstItem, node : AstNode): vscode.Diagnostic[] {
    const diagList: vscode.Diagnostic[] = [];
    switch (node.type) {
        case 'ArrayExpression':
            (node.elements as AstNode[]).forEach((element) => {
                diagList.push(...checkNode(astItem, element));
            });
            break;
        case 'ObjectExpression':
            (node.properties as AstNode[]).forEach(child => {
                diagList.push(...checkNode(astItem, child));
            });
            break;
        case 'Property':
            const offset = (node.key as AstNode).start;
            const paths = ast.getMinAstNode(astItem, astItem.positionAt(offset))[1];
            const descTreeList = getOptionDesc(paths.slice(0, -1), astItem);
            if (node.value?.type !== 'Identifier' && descTreeList.length && !descTreeList.some(item => item.name === (node.key as AstNode).name)) {
                const range = astItem.getNodeKeyRange(node);
                // 如果存在禁用校验注释，那么不加入本次校验结果
                if (isAllowCheck(astItem.document, range.start)) {
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
                diagList.push(...checkNode(astItem, (node.value as AstNode)));
            }
            break;
    }
    return diagList;
}

/** 当前位置是否允许校验 */
function isAllowCheck(document: vscode.TextDocument, position: vscode.Position): boolean {
    // 禁用当前行检查
    if (new RegExp('(//\\s+' + Diagnosis.disableCurrentLine + '\\s*$)|(/\\* +' + Diagnosis.disableCurrentLine + '\\s+\\*/\\s*$)').test(document.lineAt(position.line).text)) {
        return false;
    }
    // 禁用下一行检查
    if (new RegExp('(//\\s+' + Diagnosis.disableNextLine + '\\s*$)|(/\\*\\s+' + Diagnosis.disableNextLine + '\\s+\\*/\\s*$)').test(document.lineAt(position.line - 1).text)) {
        return false;
    }
    // 禁用段落检查
    for (let i = position.line; i >= 0; i--) {
        if (new RegExp('(//\\s+' + Diagnosis.disableBlock + '\\s*$)|(/\\*\\s+' + Diagnosis.disableBlock + '\\s+\\*/\\s*$)').test(document.lineAt(i).text)) {
            return false;
        }
        if (new RegExp('(//\\s+' + Diagnosis.enableBlock + '\\s*$)|(/\\*\\s+' + Diagnosis.enableBlock + '\\s+\\*/\\s*$)').test(document.lineAt(i).text)) {
            return true;
        }
    }
    return true;
}
