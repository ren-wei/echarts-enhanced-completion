import * as fs from 'fs';
import * as vscode from 'vscode';

/** 用户配置 */
export default {
    name: {
        initEnabled: 'echarts-enhanced-completion.init.enabled',
        onlyInit: 'echarts-enhanced-completion.init.onlyInit',
        initShowPictures: 'echarts-enhanced-completion.init.showPictures',
        initCustom: 'echarts-enhanced-completion.init.custom',
        language: 'echarts-enhanced-completion.language',
        version: 'echarts-enhanced-completion.version',
        unknownProperty: 'echarts-enhanced-completion.validation.unknownProperty',
        enabledRule: 'echarts-enhanced-completion.validation.rule.enabled',
        defaultRule: 'echarts-enhanced-completion.validation.rule.default',
        customRule: 'echarts-enhanced-completion.validation.rule.custom',
        disableEnterTriggerCharacters: 'echarts-enhanced-completion.completion.disableEnterTriggerCharacters',
    },

    get insertSpaces() {
        return vscode.window.activeTextEditor?.options.insertSpaces;
    },

    get tabSize() {
        return vscode.window.activeTextEditor?.options.tabSize;
    },

    get initEnabled() : boolean {
        return vscode.workspace.getConfiguration().get(this.name.initEnabled) as boolean;
    },

    get onlyInit(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.onlyInit) as boolean;
    },

    get initShowPictures() : boolean {
        return vscode.workspace.getConfiguration().get(this.name.initShowPictures) as boolean;
    },

    get initCustom(): BaseOptions {
        return vscode.workspace.getConfiguration().get(this.name.initCustom) as BaseOptions;
    },

    get language(): Languages {
        const lang = vscode.workspace.getConfiguration().get(this.name.language) as string;
        if (lang === 'auto') {
            return vscode.env.language.startsWith('zh') ? 'zh' : 'en';
        } else {
            return lang === 'English' ? 'en' : 'zh';
        }
    },

    get version(): 'master' | 'v4' {
        const version = vscode.workspace.getConfiguration().get(this.name.version) as 'master' | 'v4' | 'auto';
        if (version === 'auto') {
            if (vscode.workspace.workspaceFolders?.length) {
                const root = vscode.workspace.workspaceFolders[0].uri;
                const path = vscode.Uri.joinPath(root, './package.json').fsPath;
                try {
                    const { dependencies, devDependencies } = JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' })) as { dependencies?: Record<string, string>, devDependencies?: Record<string, string> };
                    const version = dependencies?.echarts || devDependencies?.echarts || '^5.0';
                    if (/^[\^\~]?4/.test(version)) {
                        return 'v4';
                    }
                } catch {
                    return 'master';
                }
            }
            return 'master';
        } else {
            return version;
        }
    },

    get unknownProperty(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.unknownProperty) as boolean;
    },

    get enabledRule(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.enabledRule) as boolean;
    },

    get defaultRule(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.defaultRule) as boolean;
    },

    get customRule(): DependRules {
        return vscode.workspace.getConfiguration().get(this.name.customRule) as DependRules;
    },

    get disableEnterTriggerCharacters(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.disableEnterTriggerCharacters) as boolean;
    },
};
