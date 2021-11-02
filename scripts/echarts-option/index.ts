/**
 * 从 https://github.com/apache/echarts-doc 获取文档资源，并处理为当前程序可识别的格式，然后保存到资源文件夹
 */

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import Engine from './engine';

async function main() {
    for (const lang of ['zh']) {
        const engine = new Engine();
        let text = await getOption('option', lang);
        engine.parseSource(text);
        for (let i = 0; i < engine.deps.length; i++) {
            const name = engine.deps[i];
            const splitName = name.split('-');
            let rawName: string;
            if (['component', 'partial', 'series'].includes(splitName[0])) {
                rawName = `${splitName[0]}/${splitName.slice(1).join('-')}`;
            } else {
                rawName = 'partial/' + name;
            }
            text = await getOption(rawName, lang);
            engine.parseSource(text);
        }
        Object.keys(engine.targets).forEach(name => {
            const splitName = name.split('-');
            let rawName: string;
            if (name === 'option') {
                rawName = 'option';
            } else if (['component', 'partial', 'series'].includes(splitName[0])) {
                rawName = `${splitName[0]}/${splitName.slice(1).join('-')}`;
            } else {
                rawName = 'partial/' + name;
            }
            saveFile(rawName, lang, engine.render(name));
        });
    }
}

/** 从 echarts-doc 项目中获取原始资源 */
async function getOption(name: string, lang: string) : Promise<string> {
    // const res = await axios.get(`https://raw.githubusercontent.com/apache/echarts-doc/master/${lang}/option/${name}.md`);
    // if (res.status === 200) {
    //     return res.data;
    // } else {
    //     return '';
    // }
    // TODO: 使用本地文件进行测试
    return fs.readFileSync(path.resolve(__dirname, `./option/${name}.md`), { encoding: 'utf8' });
}

/** 保存文件到资源文件夹 */
function saveFile(name: string, lang: string, data: string) {
    fs.writeFileSync(path.resolve(__dirname, `./assets/${lang}/${name}.md`), data);
}

main();
