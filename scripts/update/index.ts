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
        'emphasis-common',
        'encode-dimensions',
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
        'sector-border-radius',
        'select-common',
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
    // 如果source目录不存在那么创建source目录
    if (!fs.existsSync(path.resolve(__dirname, './source'))) {
        fs.mkdirSync(path.resolve(__dirname, './source'));
    }

    for (const lang of ['zh', 'en']) {
        // 如果source目录下的文件夹不存在，那么先创建
        const targetName = path.resolve(__dirname, `./source/${lang}`);
        if (!fs.existsSync(targetName)) {
            fs.mkdirSync(targetName);
        }
        ['partial', 'component', 'series'].forEach(dirname => {
            const targetName = path.resolve(__dirname, `./source/${lang}/${dirname}`);
            if (!fs.existsSync(targetName)) {
                fs.mkdirSync(targetName);
            }
        });
        const initVars = {
            galleryViewPath: `"https://echarts.apache.org/examples/${lang}/view.html?c="`,
        };
        const engine = new Engine();
        const env = process.argv.length > 2 && process.argv.slice(-1)[0] !== 'production' ? 'test' : 'production';

        // 编译所有模板
        await Promise.all([
            (async function() {
                for (const name of partials) {
                    const text = await getOption('partial/' + name, lang, env);
                    engine.parseSource(text);
                }
            })(),
            (async function() {
                for (const name of components) {
                    const text = await getOption('component/' + name, lang, env);
                    engine.parseSource(text);
                }
            })(),
            (async function() {
                for (const name of series) {
                    const text = await getOption('series/' + name, lang, env);
                    engine.parseSource(text);
                }
            })(),
            (async function() {
                const text = await getOption('option', lang, env);
                engine.parseSource(text);
            })(),
        ]);

        // 保存结果
        const indexTree = transformToTree(engine.render('option', initVars), lang, {
            level: 0,
            name: 'index',
            type: 'Object',
            desc: '',
            parent: null,
            children: [],
        }) as NormalTree;
        const dataZoomChildren: DetailTree[] = [];
        const visualMapChildren: DetailTree[] = [];
        const seriesChildren: DetailTree[] = [];
        indexTree.children = indexTree.children.reduce((result: Tree[], child) => {
            if ((child as NormalTree).children.length || ['dataZoom', 'visualMap'].includes(child.name)) {
                if (child.name.includes('dataZoom.')) {
                    dataZoomChildren.push(child as DetailTree);
                }
                if (child.name.includes('visualMap.')) {
                    visualMapChildren.push(child as DetailTree);
                }
                if (child.name.includes('series.')) {
                    seriesChildren.push(child as DetailTree);
                }
                // media 选项的 option 指向 index
                if (child.name === 'media') {
                    const option = (child as NormalTree).children.find(v => v.name === 'option');
                    // @ts-ignore
                    delete (option as NormalTree).children;
                    (option as DetailTree).detailFileName = 'index';
                }
                // 保存各属性
                saveFile(child.name, lang, (child as NormalTree).children, env);
                // @ts-ignore
                delete (child as NormalTree).children;
                (child as DetailTree).detailFileName = child.name;
            }
            if (!['dataZoom.', 'visualMap.', 'series.'].find(key => child.name.includes(key))) {
                result.push(child);
            }
            if (child.name === 'aria') {
                result.push({
                    name: 'series',
                    type: ['Array', 'Object'],
                    desc: lang === 'zh' ? '图形系列' : 'Graphic series',
                    detailFileName: 'series',
                });
            }
            return result;
        }, []);
        saveFile('index', lang, indexTree.children, env);
        // dataZoom.json、visualMap.json、series.json
        dataZoomChildren.forEach(child => {
            child.required = [{
                key: 'type',
                value: `'${child.name.split('.')[1]}'`,
                valueRegExp: `^['"]${child.name.split('.')[1].replace(/'/g, '')}['"]$`,
            }];
        });
        saveFile('dataZoom', lang, dataZoomChildren, env);
        visualMapChildren.forEach(child => {
            child.required = [{
                key: 'type',
                value: `'${child.name.split('.')[1]}'`,
                valueRegExp: `^['"]${child.name.split('.')[1].replace(/'/g, '')}['"]$`,
            }];
        });
        saveFile('visualMap', lang, visualMapChildren, env);
        seriesChildren.forEach(child => {
            if (child.name === 'series.custom') {
                child.required = [{
                    key: 'type',
                    value: "'${0}'",
                    valueRegExp: "^['\"].*['\"]$",
                }];
            } else {
                child.required = [{
                    key: 'type',
                    value: `'${child.name.split('.')[1]}'`,
                    valueRegExp: `^['"]${child.name.split('.')[1]}['"]$`,
                }];
            }
        });
        saveFile('series', lang, seriesChildren, env);
    }
}

/** 从 echarts-doc 项目中获取原始资源 */
async function getOption(name: string, lang: string, env = 'production') : Promise<string> {
    if (env === 'production') {
        // eslint-disable-next-line no-console
        console.log(`GET /${lang}/option/${name}.md`);
    }
    const address = `https://raw.githubusercontent.com/apache/echarts-doc/master/${lang}/option/${name}.md`;
    try {
        if (env === 'production') {
            const res = await axios.get(address);
            if (res.status === 200) {
                try {
                    fs.writeFile(path.resolve(__dirname, `./source/${lang}/${name}.md`), res.data, () => {});
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error("Can't save resource file:", path.resolve(__dirname, `./source/${lang}/${name}.md`));
                }
                return res.data;
            } else {
                return '';
            }
        } else {
            return fs.readFileSync(path.resolve(__dirname, `./source/${lang}/${name}.md`), { encoding: 'utf8' });
        }
    } catch (e) {
        if (env === 'production') {
            // eslint-disable-next-line no-console
            console.error("Can't connect to github, the real address is " + address);
        } else {
            // eslint-disable-next-line no-console
            console.error("Can't get local cache file: " + path.resolve(__dirname, `./source/${lang}/${name}.md`) + '\nYou can execute the following command:\n\n\tyarn update:assets\n');
        }
        process.exit(1);
    }
}

/** 保存文件到资源文件夹 */
function saveFile(name: string, lang: string, data: any, env = 'production') {
    fs.writeFile(path.resolve(__dirname, `../../assets/desc/${lang}/${name}.json`), JSON.stringify(data, null, 4), () => {
        if (env === 'production') {
            // eslint-disable-next-line no-console
            console.log(`Saved file(${lang}): ${name}.json`);
        }
    });
}

/**
 * 解析markdown文件中的标签，并将Markdown文本转换为树形结构的对象
 * @param source Markdown文本
 */
function transformToTree(source: string, lang: string, tree: TreeNode | null = null): Tree | null {
    const lines = source.split('\n');
    let prevNode: TreeNode | null = tree;
    for (let i = 0; i < lines.length; i++) {
        const text = lines[i].trim();
        // 如果符合标题的条件，那么将其视为一个节点
        const match = /^(#+)\s(<?[\w\.\:]+>?)\(([^\)]*)\)(?:\s=(?:\s(.*))?)?$/.exec(text);
        if (match || i === lines.length - 1) {
            if (prevNode) {
                // 解析 prevNode.desc 的 markdown 文本中的标签
                // 处理链接
                parseLink(prevNode, lang);
                // 删除 ExampleBaseOption
                prevNode.desc = prevNode.desc.replace(/<ExampleBaseOption.*<\/ExampleBaseOption>/gs, '');
                parseUIControl(prevNode, 'ExampleUIControlBoolean');
                parseUIControl(prevNode, 'ExampleUIControlColor', 'color', (v: string) => v[0] === '#' ? `'${v}'` : v);
                parseUIControl(prevNode, 'ExampleUIControlEnum', 'enum', (v: string) => v.split(',').map(item => item[0] === "'" ? item : `'${item}'`).join(','));
                parseUIControl(prevNode, 'ExampleUIControlIcon');
                // eslint-disable-next-line no-eval
                parseUIControl(prevNode, 'ExampleUIControlNumber', 'number', (v: string) => v);
                parseUIControl(prevNode, 'ExampleUIControlPercent', 'percent');
                parseUIControl(prevNode, 'ExampleUIControlPercentVector', 'percentvector');
                parseUIControl(prevNode, 'ExampleUIControlText', 'text');
                parseUIControl(prevNode, 'ExampleUIControlVector', 'vector');
                parseUIControl(prevNode, 'ExampleUIControlAngle', 'angle');
            }

            // 获取当前节点
            if (match) {
                const node: TreeNode = {
                    level: match[1].length,
                    name: match[2],
                    type: match[3].includes('|') ? match[3].split('|') : match[3],
                    default: match[4] === '自适应' ? 'null' : match[4],
                    desc: '',
                    children: [],
                    parent: null,
                };
                if (prevNode) {
                    // 如果是下一个层级，则将当前节点作为上一个节点的子节点
                    if (node.level > prevNode.level) {
                        prevNode.children.push(node);
                        node.parent = prevNode;
                    } else {
                        // 向上找出父节点
                        let parentNode = prevNode.parent;
                        while (parentNode && parentNode.level >= node.level) {
                            parentNode = (parentNode as TreeNode).parent;
                        }
                        parentNode?.children.push(node);
                        node.parent = parentNode;
                    }
                } else {
                    // 上一个节点不存在，则当前节点作为树的主节点
                    tree = node;
                }
                prevNode = node;
            }
        } else if (prevNode) {
            prevNode.desc += text + '\n';
        }
    }
    if (tree) {
        return dealTree(tree);
    }
    return null;
}

/**
 * 解析节点的 desc 中的 UIControl 标签
 * @param node 需要根据解析的值调整的节点
 * @param name 标签名称
 * @param type 重置节点的类型
 * @param handler 处理值的回调
 */
function parseUIControl(node: TreeNode, name: string, type: string = '', handler: Function | null = null) {
    let r = new RegExp('<' + name + '\\s([^\\/]*)\\/?>');
    const m = r.exec(node.desc);
    node.desc = node.desc.replace(new RegExp(r, 'g'), '').trim();
    if (m) {
        if (type) {
            node.type = type;
        }
        if (m[1]) {
            r = /(\w*)="([^"]*)"/g;
            let reg: RegExpExecArray | null;
            while (reg = r.exec(m[1])) {
                const k = reg[1];
                const v = reg[2];
                switch (k) {
                    case 'default':
                        if (node.default) {
                            node.default = handler ? handler(node.default) : node.default;
                        } else {
                            node.default = handler ? handler(v) : v;
                        }
                        break;
                    case 'min':
                        node.min = handler ? handler(v) : v;
                        break;
                    case 'max':
                        node.max = handler ? handler(v) : v;
                        break;
                    case 'step':
                        node.step = handler ? handler(v) : v;
                        break;
                    case 'dims':
                        node.dims = handler ? handler(v) : v;
                        break;
                    case 'options':
                        node.options = handler ? handler(v) : v;
                }
            }
            if (type === 'enum') {
                delete node.default;
            }
        }
    }
}

/** 解析节点的 desc 中的链接 */
function parseLink(node: TreeNode, lang: string) {
    const reg = /\[[^\]]*\]\((~[^\)]*)\)/g;
    let desc = node.desc;
    let m: RegExpExecArray | null;
    while ((m = reg.exec(desc))) {
        const index = m.index + m[0].length - m[1].length - 1;
        const href = `https://echarts.apache.org/${lang}/option.html#`;
        desc = desc.slice(0, index) + href + desc.slice(index + 1);
    }
    node.desc = desc;
}

interface RequiredRule {
    key: string;
    value: string;
    valueRegExp: string;
}

interface TreeNode {
    level: number; // 节点层级
    name: string; // 属性名称
    type: string | string[]; // 值类型
    desc: string; // 属性的 Markdown 文档
    default?: string; // 默认值
    options?: string; // 可选项
    min?: string; // 允许的最小值
    max?: string; // 允许的最大值
    step?: string; // 有效的步进
    dims?: string; // 向量类型的格式
    children: TreeNode[]; // 子节点
    parent: TreeNode | null; // 父节点
}

interface NormalTree {
    name: string; // 属性名称
    type: string | string[]; // 值类型
    desc: string; // 属性的 Markdown 文档
    default?: string; // 默认值
    options?: string; // 可选项
    min?: string; // 允许的最小值
    max?: string; // 允许的最大值
    step?: string; // 有效的步进
    dims?: string; // 向量类型的格式
    required?: Array<RequiredRule>; // 对值的限制
    children: Tree[]; // 子节点
}

interface DetailTree {
    name: string; // 属性名称
    type: string | string[]; // 值类型
    desc: string; // 属性的 Markdown 文档
    default?: string; // 默认值
    options?: string; // 可选项
    min?: string; // 允许的最小值
    max?: string; // 允许的最大值
    step?: string; // 有效的步进
    dims?: string; // 向量类型的格式
    required?: Array<RequiredRule>; // 对值的限制
    detailFileName: string; // 子属性所在的文件名
}

type Tree = NormalTree | DetailTree;

/** 删除在数据中无用的属性 */
function dealTree(t: TreeNode): Tree {
    // @ts-ignore
    delete t.parent;
    // @ts-ignore
    delete t.level;
    t.children.forEach(v => dealTree(v));
    return t as Tree;
};

main();
