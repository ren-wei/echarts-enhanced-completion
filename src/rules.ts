import * as path from 'path';
import * as fs from 'fs';
import Config from './config';

const cache = {
    'en': new Map<string, DependRules>(),
    'zh': new Map<string, DependRules>(),
};

export default function(key: string): DependRules {
    if (cache[Config.language].has(key)) {
        return cache[Config.language].get(key) as DependRules;
    }
    const fileName = path.resolve(__dirname + `../../assets/rules/${Config.language}/${key}.json`);
    if (fs.existsSync(fileName)) {
        const result = JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
        cache[Config.language].set(key, result);
        return result;
    } else {
        return [];
    }
};
