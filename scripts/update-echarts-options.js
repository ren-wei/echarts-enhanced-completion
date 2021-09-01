// @ts-nocheck
/**
 * 从echarts官网获取选项信息，并更新assets目录下的数据
 * 注意：此文件是单独执行的文件，插件运行时，此文件不会参与
 * $ node ./scripts/update-echarts-option.js
 */

const baseUrl = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/documents/option-parts/';
const token = 'cd773ec255';

const axios = require('axios');
const html2markdown = require('html2markdown');
const fs = require('fs');
const path = require('path');

/** 向接口请求数据，并保存到assets目录 */
async function getData(key) {
    await axios.get(`${baseUrl}option.${key}.js?${token}`).then(res => {
        if (res.status === 200) {
            const datas = JSON.parse(res.data.slice(26 + key.length));
            const result = {};
            Object.keys(datas).forEach(name => {
                const item = datas[name];
                try {
                    item.desc = html2markdown(item.desc?.replace(/<iframe(([\s\S])*?)<\/iframe>/ig, '\n\n暂时无法显示\n\n').replace(/<p>|<\/p>/g, '\n').replace(/&#39;/g, "'"));
                } catch (e) {
                    /* eslint-disable-next-line no-console  */
                    console.warn('html2markdown error:', key, '\t', name);
                }
                result[name] = item;
            });
            fs.writeFile(path.resolve(__dirname, `../assets/echarts-options/${key}.json`), JSON.stringify(result, null, 4), () => {
                /* eslint-disable-next-line no-console  */
                console.log(`${key}.json saved successfully.`);
            });
        }
    }).catch(e => {
        if (e && e.response) {
            /* eslint-disable-next-line no-console  */
            console.warn(key, e.response?.status);
        } else {
            /* eslint-disable-next-line no-console  */
            console.warn(key);
        }
    });
}

// 获取所有选项的类型信息
axios.get(baseUrl + 'option-outline.js?' + token).then(async res => {
    if (res.status === 200) {
        // 解析类型信息的数据并保存
        const typeMsgList = JSON.parse(res.data.slice(33)).children;
        fs.writeFile(path.resolve(__dirname, '../assets/echarts-options/options_outline.json'), JSON.stringify(typeMsgList, null, 4), () => {
            /* eslint-disable-next-line no-console  */
            console.log('options_outline.json saved successfully.');
        });
        // 获取顶级选项的数据
        const r = await axios.get(baseUrl + 'option.js?' + token);
        if (r.status === 200) {
            const datas = JSON.parse(r.data.slice(25));
            const result = {};
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
                result[key] = item;
            });
            fs.writeFile(path.resolve(__dirname, '../assets/echarts-options/index.json'), JSON.stringify(result, null, 4), () => {
                /* eslint-disable-next-line no-console  */
                console.log('index.json saved successfully.');
            });
            const options = Object.keys(JSON.parse(r.data.slice(25)));
            options.forEach(async key => {
                getData(key);
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
