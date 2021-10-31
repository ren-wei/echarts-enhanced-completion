/**
 * 从 https://github.com/apache/echarts-doc 获取文档资源，并处理为当前程序可识别的格式
 */

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import Engine from './engine';

async function main() {
    for (const lang of ['zh']) {
        // const text = await getOption('option', lang);
    }
    const source = fs.readFileSync(path.join(__dirname, 'option.md'), { encoding: 'utf8' });
    const engine = new Engine();
    engine.parseSource(source);
    Object.keys(engine.targets).forEach(key => {
        console.log([key, engine.render(key).split('\n').length]);
    });
}

/** 从 echarts-doc 项目中获取原始资源 */
async function getOption(name: string, lang: string) : Promise<string> {
    const res = await axios.get(`https://raw.githubusercontent.com/apache/echarts-doc/master/${lang}/option/${name}.md`);
    if (res.status === 200) {
        return res.data;
    } else {
        return '';
    }
}

/** 保存文件到资源文件夹 */
function saveFile(name: string, lang: string, data: string) {
    fs.writeFileSync(path.resolve(__dirname, name), data);
}

main();
