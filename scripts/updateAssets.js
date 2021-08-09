// @ts-nocheck
/**
 * 从echarts官网获取选项信息，并更新assets目录下的数据
 * 注意：此文件是单独执行的文件，插件运行时，此文件不会参与
 * $ node ./scripts/updateAssets.js
 */

const baseUrl = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/documents/option-parts/';
const token = 'cd773ec255';

const optionOutlineFileName = 'option-outline.js';

const axios = require('axios');
const fs = require('fs');
const path = require('path');

/** 向接口请求数据，并保存到assets目录 */
async function getData(key) {
    await axios.get(`${baseUrl}option.${key}.js?${token}`).then(res => {
        if (res.status === 200) {
            fs.writeFile(path.resolve(__dirname, `../assets/${key}.json`), res.data.slice(26 + key.length), () => {
                console.log(`${key}.json saved successfully.`);
            });
        }
    }).catch(e => {
        console.log(key ,e.response.status);
    });
}

// 获取所有选项的类型信息
axios.get(baseUrl + optionOutlineFileName + '?' + token).then(async res => {
    if (res.status === 200) {
        // 解析类型信息的数据并保存
        const typeMsgList = JSON.parse(res.data.slice(33)).children;
        fs.writeFile(path.resolve(__dirname, '../assets/options_outline.json'), JSON.stringify(typeMsgList), () => {
            console.log('options_outline.json saved successfully.');
        });
        // 获取顶级选项的数据
        const r = await axios.get(baseUrl + 'option.js?' + token);
        if (r.status === 200) {
            fs.writeFile(path.resolve(__dirname, '../assets/option.json'), r.data.slice(25), () => {
                console.log('option.json saved successfully.');
            });
            const options = Object.keys(JSON.parse(r.data.slice(25)));
            options.forEach(async key => {
                getData(key);
            });
        } else {
            console.log('option.js', r.status);
        }
    } else {
        console.log('options_outline.json Error!');
    }
});
