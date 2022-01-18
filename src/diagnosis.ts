import * as vscode from 'vscode';
import { simillarCommands } from 'simillar-commands';
import { getOptionDesc } from './store';
import { ExtensionName, collection } from './extension';
import ast, { AstItem } from './ast';
import localize from './localize';
import Config from './config';
import rules from './rules';

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidOpenTextDocument(document => {
        if (Config.enabledVerify) {
            Diagnosis.update(document.uri, collection);
        }
    }),
    vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvent => {
        if (Config.enabledVerify) {
            Diagnosis.update(textDocumentChangeEvent.document.uri, collection);
        }
    }),
    vscode.workspace.onDidChangeConfiguration(configurationChangeEvent => {
        if (configurationChangeEvent.affectsConfiguration(Config.name.language)) {
            vscode.workspace.textDocuments.forEach(document => {
                Diagnosis.update(document.uri, collection);
            });
        }
        if (configurationChangeEvent.affectsConfiguration(Config.name.enabledVerify)) {
            if (Config.enabledVerify) {
                vscode.workspace.textDocuments.forEach(document => {
                    Diagnosis.update(document.uri, collection);
                });
            } else {
                collection.clear();
            }
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
                diagList.push(...checkUnknownNode(astItem, astItem.expression), ...checkDependRules(astItem));
            }
        }
        collection.set(uri, diagList);
    },
};

export default Diagnosis;

/** 递归检查节点是否存在未知属性 */
function checkUnknownNode(astItem: AstItem, node : AstNode): vscode.Diagnostic[] {
    const diagList: vscode.Diagnostic[] = [];
    switch (node.type) {
        case 'ArrayExpression':
            (node.elements as AstNode[]).forEach((element) => {
                diagList.push(...checkUnknownNode(astItem, element));
            });
            break;
        case 'ObjectExpression':
            (node.properties as AstNode[]).forEach(child => {
                diagList.push(...checkUnknownNode(astItem, child));
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
                diagList.push(...checkUnknownNode(astItem, (node.value as AstNode)));
            }
            break;
    }
    return diagList;
}

/** 检查依赖规则 */
function checkDependRules(astItem: AstItem): vscode.Diagnostic[] {
    const diagList: vscode.Diagnostic[] = [];
    const keys = astItem.expression?.properties?.map(node => node.key?.name as string);
    if (!keys) return [];
    const checkRule = (rule: DependRule) => {
        if (rule.disable) return;
        const node = astItem.getAstNodeByKey(rule.key);
        if (node) {
            const relatedInformation: vscode.DiagnosticRelatedInformation[] = [];
            const nodeRange = astItem.getNodeKeyRange(node);
            if (rule.options && !rule.options.includes(node.value!.value as unknown as string)) {
                relatedInformation.push({
                    location: new vscode.Location(astItem.document.uri, nodeRange),
                    message: `${localize('message.option-value')}: [${rule.options.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ')}]`,
                });
            }
            rule.depends.forEach(dep => {
                // 如果不满足规则，则添加至 relatedInformation
                const depNode = astItem.getAstNodeByKey(dep.key);
                if (
                    // 节点存在并且不等于预期值
                    (depNode && (dep as ExpectedDepend).expectedValue && depNode.value!.value as unknown as string !== (dep as ExpectedDepend).expectedValue)
                    // 节点存在并且等于排除值
                    || (depNode && (dep as ExcludeDepend).excludeValue && depNode.value!.value as unknown as string === (dep as ExcludeDepend).excludeValue)
                    // 节点不存在并且默认值不等于预期值
                    || (!depNode && dep.defaultValue !== (dep as ExpectedDepend).expectedValue)
                    // 节点不存在并且默认值等于排除值
                    || (!depNode && dep.defaultValue === (dep as ExcludeDepend).excludeValue)
                ) {
                    relatedInformation.push({
                        location: new vscode.Location(astItem.document.uri, depNode ? astItem.getNodeKeyRange(depNode) : astItem.range),
                        message: dep.msg,
                    });
                }
            });
            if (relatedInformation.length && isAllowCheck(astItem.document, nodeRange.start)) {
                diagList.push({
                    code: '',
                    message: rule.msg,
                    range: astItem.getNodeKeyRange(node),
                    severity: rule.severity,
                    source: ExtensionName,
                    relatedInformation,
                });
            }
        }
    };
    keys.forEach(key => {
        rules[key].forEach(checkRule);
    });
    try {
        Config.rule.forEach(checkRule);
    } catch (e) {
        vscode.window.showErrorMessage(localize('message.rule-config-error'));
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
