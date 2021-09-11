import * as assert from 'assert';

const path = require('path');
const fs = require('fs');

import Store from '../../store';

suite('Test class Store Suite', () => {
    const store = new Store('echarts-options');

    test('test constructor', () => {
    });

    test('test public method getOptionDesc', () => {
        assert.strictEqual(store.getOptionDesc([]), store.topOptionDesc);
    });
});

function getFileData(name: string): any {
    const fileName = path.resolve(__dirname + `../../../../assets/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}
