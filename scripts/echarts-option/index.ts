/**
 * 从 https://github.com/apache/echarts-doc 获取文档资源，并处理为当前程序可识别的格式，然后保存到资源文件夹
 */

import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import Engine from './engine';

async function main() {
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

    const components = [
        'axis-common',
        'angle-axis',
        'aria',
        'axisPointer',
        'brush',
        'calendar',
        'data-transform-external',
        'data-transform-filter',
        'data-transform-sort',
        'data-zoom-inside',
        'data-zoom-slider',
        'data-zoom',
        'dataset',
        'geo-common',
        'geo',
        'graphic',
        'grid',
        'legend',
        'parallel-axis',
        'parallel',
        'polar',
        'radar',
        'radius-axis',
        'single-axis',
        'timeline',
        'title',
        'toolbox',
        'tooltip',
        'visual-map-continuous',
        'visual-map-piecewise',
        'visual-map',
        'x-axis',
        'y-axis',
    ];

    const series = [
        'bar',
        'boxplot',
        'candlestick',
        'custom',
        'effectScatter',
        'funnel',
        'gauge',
        'graph',
        'heatmap',
        'line',
        'lines',
        'map',
        'parallel',
        'pictorialBar',
        'pie',
        'radar',
        'sankey',
        'scatter',
        'series',
        'sunburst',
        'themeRiver',
        'tree',
        'treemap',
    ];

    for (const lang of ['zh']) {
        const initVars = {
            galleryViewPath: `"https://echarts.apache.org/examples/${lang}/view.html?c="`,
        };
        const engine = new Engine();

        // 编译所有模板
        for (const name of partials) {
            const text = await getOption('partial/' + name, lang);
            engine.parseSource(text);
        }

        for (const name of components) {
            const text = await getOption('component/' + name, lang);
            engine.parseSource(text);
        }

        for (const name of series) {
            const text = await getOption('series/' + name, lang);
            engine.parseSource(text);
        }

        // 获取所有选项
        const targetNames = Object.keys(engine.targets);

        for (const name of components) {
            if (targetNames.includes('component-' + name)) {
                saveFile('component/' + name, lang, engine.render('component-' + name, initVars));
            }
        }

        for (const name of series) {
            if (targetNames.includes('series-' + name)) {
                saveFile('component/series-' + name, lang, engine.render('series-' + name, initVars));
            }
        }
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
