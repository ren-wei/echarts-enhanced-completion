// @ts-nocheck
/**
 * 从echarts官网获取选项信息，并更新assets目录下的数据
 * 注意：此文件是单独执行的文件，插件运行时，此文件不会参与
 * $ node ./scripts/update-echarts-option.js
 */

// const baseUrl = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/documents/option-parts/';
const baseUrl = 'https://echarts.apache.org/en/documents/option-parts/';
const hash = 'dc46b9d5ad';
// const saveDir = 'echarts-option/cn';
const saveDir = 'echarts-option/en';

const axios = require('axios');
const html2markdown = require('html2markdown');
const fs = require('fs');
const path = require('path');

const patch = require('./data/echartsOptionPatch');

function patchItem(key, name, result, item) {
    if (item.uiControl?.default && typeof item.uiControl.default === 'string') {
        item.uiControl.default.replace(/&#39;/g, "'");
    }
    // 如果没有type，则设置为default的类型
    if (item.uiControl && !item.uiControl.type) {
        item.uiControl.type = typeof item.uiControl.default || 'string';
    }
    // 如果存在options，则type为enum
    if (item.uiControl?.options) item.uiControl.type = 'enum';
    // 如果存在min并且没有默认值，那么设置默认值为min
    if (item.uiControl?.min && !item.uiControl.default) {
        item.uiControl.default = item.uiControl.min;
    }
    // 删除'enum'的默认值，并将options改为字符串格式
    if (item.uiControl?.type === 'enum') {
        if (item.uiControl.default) delete item.uiControl.default;
        item.uiControl.options = item.uiControl.options.split(',').map(v => `'${v}'`).join(',');
    }
    // 将`default`改为字符串格式
    if (item.uiControl?.default !== undefined && typeof item.uiControl?.default !== 'string') {
        item.uiControl.default = String(item.uiControl.default);
    }
    // 如果默认值是undefined，那么删除
    if (item.uiControl?.default === 'undefined') {
        delete item.uiControl.default;
    }
    // 如果默认值是字符串但是不是关键词，那么前后都加上单引号
    if (item.uiControl?.default !== undefined && /^[a-z]*$/.test(item.uiControl.default) && !['true', 'false', 'null'].includes(item.uiControl.default)) {
        item.uiControl.default = `'${item.uiControl.default}'`;
    }
    // 将Color改为color
    if (item.uiControl?.type === 'Color') item.uiControl.type = 'color';
    // 如果'color'的'default'不是以单引号开头，那么前后都加上单引号
    if (item.uiControl?.type === 'color' && item.uiControl.default && item.uiControl.default !== 'null' && item.uiControl.default[0] !== "'") {
        item.uiControl.default = `'${item.uiControl.default}'`;
    }
    // 如果'percent'的'default'是以%结尾，那么前后都加上单引号
    if (item.uiControl?.type === 'percent' && item.uiControl.default && item.uiControl.default[item.uiControl.default.length - 1] === '%') {
        item.uiControl.default = `'${item.uiControl.default}'`;
    }
    // 修复错误数据
    if (key === 'calendar' && name === 'splitLine.show') {
        item.uiControl = {
            type: 'boolean',
            default: 'true',
        };
    }
    // 额外添加选项
    const appendObject = patch.appendPatch[key] && patch.appendPatch[key][name];
    if (appendObject) {
        result[name] = item;
        Object.entries(appendObject).forEach(([k, v]) => {
            result[k] = v;
        });
    } else {
        const parentName = name.split('.').slice(0, name.split('.').length - 1).join('.');
        if (name.includes('.') && !Object.keys(result).find(k => k === parentName)) {
            result[parentName] = {
                desc: '',
                uiControl: {
                    type: 'Object',
                },
            };
        }
        result[name] = item;
    }
}

/** 向接口请求数据，并保存到assets目录 */
async function getData(key, typeMsg) {
    try {
        const res = await axios.get(`${baseUrl}option.${key}.js?${hash}`);
        if (res.status === 200) {
            const datas = JSON.parse(res.data.slice(26 + key.length));
            const result = {};
            Object.entries(datas).forEach(([name, item]) => {
                try {
                    item.desc = html2markdown(item.desc
                        ?.replace(/<iframe(([\s\S])*?)<\/iframe>/ig, '\n\n暂时无法显示\n\n')
                        .replace(/<p>|<\/p>/g, '\n')
                        .replace(/&#39;/g, "'")
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&amp;/g, '&'));
                } catch (e) {
                    switch (name) {
                        case 'radius':
                            item.desc = patch.radiusDesc;
                            break;
                        case 'minOpen':
                            item.desc = patch.minOpenDesc;
                            break;
                        case 'data.target':
                            item.desc = patch.targetDesc;
                            break;
                        case 'feature.dataView.optionToContent':
                            item.desc = patch.optionToContentDesc;
                            break;
                        default:
                            if (name.split('.')[name.split('.').length - 1] === 'position') {
                                item.desc = patch.positionDesc;
                            } else {
                                /* eslint-disable-next-line no-console  */
                                console.warn('html2markdown error:', key, '\t', name);
                            }
                    }
                }
                // 增加类型信息
                if (typeMsg && !item.uiControl?.type) {
                    const propList = name.split('.');
                    let target = typeMsg;
                    for (let i = 0; i < propList.length; i++) {
                        const prop = propList[i];
                        target = target.children.find(v => v.prop === prop);
                        if (!target) {
                            break;
                        }
                    }
                    // 补充类型信息和默认值
                    if (target && target !== typeMsg) {
                        if (target.default !== undefined && !item.uiControl?.default) {
                            if (!item.uiControl) item.uiControl = {};
                            item.uiControl.default = target.default;
                        }
                        if (target.type) {
                            if (!item.uiControl) item.uiControl = {};
                            item.uiControl.type = target.type;
                        }
                    }
                }
                patchItem(key, name, result, item);
            });
            fs.writeFile(path.resolve(__dirname, `../assets/${saveDir}/${key}.json`), JSON.stringify(result, null, 4), () => {
                /* eslint-disable-next-line no-console  */
                console.log(`${key}.json saved successfully.`);
            });
            return true;
        }
    } catch (e) {
        if (e && e.response) {
            /* eslint-disable-next-line no-console  */
            console.warn(key, e.response?.status);
        } else {
            /* eslint-disable-next-line no-console  */
            console.warn(key, e);
        }
    }
    return false;
}

// 获取所有选项的类型信息
axios.get(baseUrl + 'option-outline.js?' + hash).then(async res => {
    if (res.status === 200) {
        // 解析类型信息的数据并保存
        const typeMsgList = JSON.parse(res.data.slice(33)).children;
        // 获取顶级选项的数据
        const r = await axios.get(baseUrl + 'option.js?' + hash);
        if (r.status === 200) {
            const datas = JSON.parse(r.data.slice(25));
            const indexFileData = dealIndex(datas, typeMsgList);
            // 获取顶级选项下所有选项的数据
            const keys = Object.keys(datas);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const typeMsg = typeMsgList.find(v => v.prop === key);
                if (await getData(key, typeMsg) && indexFileData[key]) {
                    if (!indexFileData[key].uiControl) {
                        indexFileData[key].uiControl = {};
                    }
                    indexFileData[key].uiControl.detailFileName = key;
                }
            }
            fs.writeFile(path.resolve(__dirname, `../assets/${saveDir}/index.json`), JSON.stringify(indexFileData, null, 4), () => {
                /* eslint-disable-next-line no-console  */
                console.log('index.json saved successfully.');
            });
        } else {
            /* eslint-disable-next-line no-console  */
            console.log('option.js', r.status);
        }
    } else {
        /* eslint-disable-next-line no-console  */
        console.log('options_outline.json Error!');
    }
});

/** 处理 index.json 文件 */
function dealIndex(datas, typeMsgList) {
    const result = {};
    const seriesOption = {};
    const dataZoomOption = {};
    const visualMapOption = {};
    Object.keys(datas).forEach(key => {
        const item = datas[key];
        item.desc = html2markdown(item.desc.replace(/<iframe(([\s\S])*?)<\/iframe>/ig, '').replace(/<p>|<\/p>/g, '\n').replace(/&#39;/g, "'"));
        const target = typeMsgList.find(v => v.prop === key);
        if (target && !item.uiControl) {
            item.uiControl = {
                type: target.type,
                default: target.default,
            };
        }
        if (item.exampleBaseOptions) {
            delete item.exampleBaseOptions;
        }
        if (key.includes('series')) {
            item.uiControl = {
                type: 'Object',
                required: [{
                    key: 'type',
                    value: `'${key.split('-')[1]}'`,
                    valueRegExp: `^['"]${key.split('-')[1]}['"]$`,
                }],
                detailFileName: key,
            };
            seriesOption[key] = item;
        } else if (key !== 'dataZoom' && key.includes('dataZoom')) {
            item.uiControl = {
                type: 'Object',
                required: [{
                    key: 'type',
                    value: `'${key.split('-')[1]}'`,
                    valueRegExp: `^['"]${key.split('-')[1]}['"]$`,
                }],
                detailFileName: key,
            };
            dataZoomOption[key] = item;
        } else if (key !== 'visualMap' && key.includes('visualMap')) {
            item.uiControl = {
                type: 'Object',
                required: [{
                    key: 'type',
                    value: `'${key.split('-')[1]}'`,
                    valueRegExp: `^['"]${key.split('-')[1]}['"]$`,
                }],
                detailFileName: key,
            };
            visualMapOption[key] = item;
        } else {
            if (['dataZoom', 'visualMap'].includes(key)) {
                item.uiControl.type = ['Array', 'Object'];
                item.uiControl.detailFileName = key;
            }
            patchItem('index', key, result, item);
            result[key] = item;
            if (key === 'aria') {
                result.series = {
                    desc: '图形系列',
                    uiControl: {
                        type: ['Array', 'Object'],
                        detailFileName: 'series',
                    },
                };
            }
        }
    });
    // 创建一个 series.json 文件
    fs.writeFile(path.resolve(__dirname, `../assets/${saveDir}/series.json`), JSON.stringify(seriesOption, null, 4), () => {
        /* eslint-disable-next-line no-console  */
        console.log('series.json saved successfully.');
    });
    // 创建一个 dataZoom.json 文件
    fs.writeFile(path.resolve(__dirname, `../assets/${saveDir}/dataZoom.json`), JSON.stringify(dataZoomOption, null, 4), () => {
        /* eslint-disable-next-line no-console  */
        console.log('dataZoom.json saved successfully.');
    });
    // 创建一个 visualMap.json 文件
    fs.writeFile(path.resolve(__dirname, `../assets/${saveDir}/visualMap.json`), JSON.stringify(visualMapOption, null, 4), () => {
        /* eslint-disable-next-line no-console  */
        console.log('visualMap.json saved successfully.');
    });
    return result;
}
