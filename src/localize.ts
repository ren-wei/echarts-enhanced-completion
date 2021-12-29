import * as path from 'path';
import * as fs from 'fs';
import Config from './config';

const cache: Map<Languages, SimpleObject<string>> = new Map<Languages, SimpleObject<string>>();
const fileNames = {
    'en': path.resolve(__dirname, '../package.nls.json'),
    'zh': path.resolve(__dirname, '../package.nls.zh-cn.json'),
};
export default function localize(key: string): string {
    if (cache.has(Config.language)) {
        return (cache.get(Config.language) as SimpleObject<string>)[key];
    } else {
        const target = JSON.parse(fs.readFileSync(fileNames[Config.language], { encoding: 'utf8' })) as SimpleObject<string>;
        cache.set(Config.language, target);
        return target[key];
    }
};
