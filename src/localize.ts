import * as path from 'path';
import * as fs from 'fs';
import Config from './config';

const cache: Map<Languages, SimpleObject<string>> = new Map<Languages, SimpleObject<string>>();
const fileNames = {
    'en': path.resolve(__dirname, '../package.nls.json'),
    'zh': path.resolve(__dirname, '../package.nls.zh-cn.json'),
};
/**
 * 获取本地化的提示信息
 * @param key 提示信息的key
 * @param values 需要替换的值，依次替换 '${0}'、'${1}' ... '${n}'
 * @returns 替换值后的提示信息
 */
export default function localize(key: string, ...values: string[]): string {
    let result: string;
    if (cache.has(Config.language)) {
        result = (cache.get(Config.language) as SimpleObject<string>)[key];
    } else {
        const target = JSON.parse(fs.readFileSync(fileNames[Config.language], { encoding: 'utf8' })) as SimpleObject<string>;
        cache.set(Config.language, target);
        result = target[key];
    }
    values.forEach((value, index) => {
        result = result.replace(new RegExp('\\$\\{' + index + '\\}', 'g'), value);
    });
    return result;
};
