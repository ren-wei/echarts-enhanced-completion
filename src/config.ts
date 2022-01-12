import * as vscode from 'vscode';

/** 用户配置 */
export default {
    name: {
        initEnabled: 'echarts-enhanced-completion.init.enabled',
        onlyInit: 'echarts-enhanced-completion.init.onlyInit',
        initShowPictures: 'echarts-enhanced-completion.init.showPictures',
        enabledVerify: 'echarts-enhanced-completion.verify.enabled',
        language: 'echarts-enhanced-completion.language',
        patchUpdate: 'echarts-enhanced-completion.patchUpdate',
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

    get enabledVerify(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.enabledVerify) as boolean;
    },

    get language(): Languages {
        const lang = vscode.workspace.getConfiguration().get(this.name.language) as string;
        if (lang === 'auto') {
            return vscode.extensions.getExtension('ms-ceintl.vscode-language-pack-zh-hans') ? 'zh' : 'en';
        } else {
            return lang === 'English' ? 'en' : 'zh';
        }
    },

    get patchUpdate(): boolean {
        return vscode.workspace.getConfiguration().get(this.name.patchUpdate) as boolean;
    },
};
