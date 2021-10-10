import * as vscode from 'vscode';

export default class Config {
    static get insertSpaces() {
        return vscode.window.activeTextEditor?.options.insertSpaces;
    }

    static get tabSize() {
        return vscode.window.activeTextEditor?.options.tabSize;
    }

    static get initEnabled() : boolean {
        return vscode.workspace.getConfiguration().get('echarts-enhanced-completion.init.enabled') as boolean;
    }

    static get onlyInit(): boolean {
        return vscode.workspace.getConfiguration().get('echarts-enhanced-completion.init.onlyInit') as boolean;
    }

    static get initShowPictures() : boolean {
        return vscode.workspace.getConfiguration().get('echarts-enhanced-completion.init.showPictures') as boolean;
    }

    static get lang(): 'en' | 'cn' {
        const lang = vscode.workspace.getConfiguration().get('echarts-enhanced-completion.lang') as string;
        if (lang === 'auto') {
            return vscode.extensions.getExtension('ms-ceintl.vscode-language-pack-zh-hans') ? 'cn' : 'en';
        } else {
            return lang as 'en' | 'cn';
        }
    }
};
