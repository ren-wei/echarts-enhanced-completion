import * as vscode from 'vscode';
import * as esprima from 'esprima';
import * as estree from 'estree';
import { simillarCommands } from 'simillar-commands';
import { getOptionDesc } from './store';
import { ExtensionName, collection, supportedLanguageList } from './extension';
import ast, { AstItem } from './ast';
import localize from './localize';
import Config from './config';
import rules from './rules';

export const disposables: vscode.Disposable[] = [
    vscode.workspace.onDidOpenTextDocument(document => {
        if (supportedLanguageList.includes(document.languageId)) {
            Diagnosis.update(document.uri, collection);
        }
    }),
    vscode.workspace.onDidChangeTextDocument(textDocumentChangeEvent => {
        if (supportedLanguageList.includes(textDocumentChangeEvent.document.languageId)) {
            Diagnosis.update(textDocumentChangeEvent.document.uri, collection);
        }
    }),
    vscode.workspace.onDidChangeConfiguration(configurationChangeEvent => {
        if (configurationChangeEvent.affectsConfiguration(Config.name.language)) {
            vscode.workspace.textDocuments.forEach(document => {
                if (supportedLanguageList.includes(document.languageId)) {
                    Diagnosis.update(document.uri, collection);
                }
            });
        }
        if (configurationChangeEvent.affectsConfiguration(Config.name.enabledRule)) {
            vscode.workspace.textDocuments.forEach(document => {
                if (supportedLanguageList.includes(document.languageId)) {
                    Diagnosis.update(document.uri, collection);
                }
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
                diagList.push(...check(astItem, astItem.expression));
            }
        }
        collection.set(uri, diagList);
    },
};

export default Diagnosis;

/** 递归检查节点 */
function check(astItem: AstItem, node : estree.Node): vscode.Diagnostic[] {
    const diagList: vscode.Diagnostic[] = [];
    switch (node.type) {
        case esprima.Syntax.ArrayExpression:
            node.elements.forEach((element) => {
                if (element) {
                    diagList.push(...check(astItem, element));
                }
            });
            break;
        case esprima.Syntax.ObjectExpression:
            node.properties.forEach(child => {
                diagList.push(...check(astItem, child));
            });
            break;
        case esprima.Syntax.Property:
            if (Config.unknownProperty) {
                diagList.push(...checkUnknownNode(astItem, node));
            }
            if (Config.enabledRule) {
                diagList.push(...checkRules(astItem, node));
            }
            break;
    }
    return diagList;
}

/** 检查节点是否存在未知属性 */
function checkUnknownNode(astItem: AstItem, node: estree.Property): vscode.Diagnostic[] {
    const diagList: vscode.Diagnostic[] = [];
    const offset = node.key.range![0];
    const paths = ast.getMinAstNode(astItem, astItem.positionAt(offset))[1];
    const descTreeList = getOptionDesc(paths.slice(0, -1), astItem);
    // 对于 series.custom 自定义类型，无法获取所有允许的选项，因此忽略自定义类型
    if (descTreeList[0]?.default === "'custom'") return diagList;
    if (
        node.value.type !== esprima.Syntax.Identifier
        && descTreeList.length
        && !descTreeList.some(item => item.name === (node.key as estree.Identifier).name)
        && paths[paths.length - 2] !== 'rich' // 排除 rich 下的 <style_name>
    ) {
        const range = astItem.getNodeKeyRange(node);
        // 如果存在禁用校验注释，那么不加入本次校验结果
        if (isAllowCheck(astItem.document, range.start) && node.key.type === esprima.Syntax.Identifier) {
            const name = node.key.name;
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
        diagList.push(...check(astItem, node.value));
    }
    return diagList;
}

/** 检查依赖规则 */
function checkRules(astItem: AstItem, node: estree.Node): vscode.Diagnostic[] {
    const diagList: vscode.Diagnostic[] = [];

    // const keys = astItem.expression?.properties.map(node => ((node as estree.Property)?.key as estree.Identifier)?.name as string);
    // if (!keys) return [];
    // // 检查内置规则
    // if (Config.defaultRule) {
    //     keys.forEach(key => {
    //         rules(key).forEach(rule => checkRule(astItem, rule, diagList));
    //     });
    // }
    // // 检查用户自定义规则
    // Config.customRule.forEach(rule => checkRule(astItem, rule, diagList));
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

/** 获取值的真实显示 */
function getRawString(v: string | number | boolean | null): string {
    return typeof v === 'string' ? `'${v}'` : String(v);
}
