import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';
import { getFileData } from './utils';

suite('Test Assets Suite', () => {
    test('资源文件中每一个选项都应该存在父级选项', () => {
        const files = fs.readdirSync(path.resolve(__dirname, '../../../assets/echarts-option')).filter(v => v.includes('json'));

        files.forEach(fullname => {
            const name = fullname.split('.')[0];
            const descMsg = getFileData(name);
            const set = new Set();
            Object.keys(descMsg).filter(key => !key.includes('emphasis')).forEach(key => {
                if (key.includes('.')) {
                    const keyList = key.split('.');
                    if (!Object.keys(descMsg).includes(keyList.slice(0, keyList.length - 1).join('.'))) {
                        set.add(keyList.slice(0, keyList.length - 1).join('.'));
                    }
                }
            });
            assert.strictEqual(set.size, 0, `${name}.json 中存在无父级选项的选项：${[...set]}`);
        });
    }).timeout(10000);
});
