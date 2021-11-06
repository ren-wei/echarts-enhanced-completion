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
        const partials = [
            '1d-data',
            '2d-data',
            'animation',
            'area-style',
            'axisPointer-common',
            'barGrid',
            'circular-layout',
            'clip',
            'color-desc',
            'colorBy',
            'component-common-style',
            'coord-sys',
            'cursor',
            'data-id-desc',
            'data-name-desc',
            'data-transform',
            'decal',
            'encode-dimensions',
            'focus-blur-scope',
            'formatter',
            'group-id',
            'icon',
            'id',
            'item-style',
            'label-layout',
            'label-line',
            'label',
            'large',
            'legend-hover-link',
            'line-border-style',
            'line-data',
            'line-style',
            'mark-area',
            'mark-line',
            'mark-point',
            'marker',
            'padding',
            'parallel',
            'progressive',
            'rect-layout-width-height',
            'rect-layout',
            'roam',
            'selected-mode',
            'series-name',
            'show',
            'silent',
            'state-animation',
            'style-shadow-opacity',
            'symbol',
            'text-style',
            'tooltip-common',
            'universal-transition',
            'version',
            'visual-mapping',
            'z-zlevel',
            'zr-graphic',
        ];
        for (const name of partials) {
            const text = await getOption('partial/' + name, lang);
            engine.parseSource(text);
        }
        const text = await getOption('component/title', lang);
        engine.parseSource(text);
        saveFile('component/title', lang, engine.render('component-title', {
            galleryViewPath: `"https://echarts.apache.org/examples/${lang}/view.html?c="`,
            enableAutoColor: 'null',
            defaultLineHeight: 'null',
            defaultAlign: 'null',
            defaultVerticalAlign: 'null',
            defaultType: 'null',
            defaultZLevel: 'null',
            defaultZ: 'null',
            defaultShadowBlur: 'null',
            defaultShadowColor: 'null',
            defaultRight: 'null',
            defaultBottom: 'null',
            defaultFontSize: 'null',
            defaultFontWeight: 'null',
            noRich: 'null',
            noZ: 'null',
            noAlign: 'null',
            noVerticalAlign: 'null',
            needShow: 'null',
            prefix: 'null',
        }));
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
