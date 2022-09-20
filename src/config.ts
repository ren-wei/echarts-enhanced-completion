import * as vscode from 'vscode';

/** 用户配置 */
export default {
    name: {
        initEnabled: 'echarts-enhanced-completion.init.enabled',
        onlyInit: 'echarts-enhanced-completion.init.onlyInit',
        initShowPictures: 'echarts-enhanced-completion.init.showPictures',
        initCustom: 'echarts-enhanced-completion.init.custom',
        language: 'echarts-enhanced-completion.language',
        unknownProperty: 'echarts-enhanced-completion.validation.unknownProperty',
        enabledRule: 'echarts-enhanced-completion.validation.rule.enabled',
        defaultRule: 'echarts-enhanced-completion.validation.rule.default',
        customRule: 'echarts-enhanced-completion.validation.rule.custom',
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

    get version(): 'latest' | 'v4' {
        return 'latest';
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
};
