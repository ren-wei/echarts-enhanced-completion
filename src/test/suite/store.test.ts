import * as assert from 'assert';

const path = require('path');
const fs = require('fs');

import Store from '../../store';

suite('Test class Store Suite', () => {
    const store = new Store();

    test('test constructor', () => {
        assert.deepStrictEqual(store.allOptionType, getFileData('options_outline'));
        assert.deepStrictEqual(store.topOptionDesc, getFileData('option'));
    });

    test('test public method getOptionType', () => {
        assert.strictEqual(store.getOptionType(''), store.allOptionType);
        assert.strictEqual(store.getOptionType('title'), store.allOptionType.find(v => v.prop === 'title')?.children);
        assert.strictEqual(store.getOptionType('title.textStyle'), store.allOptionType.find(v => v.prop === 'title')?.children?.find(v => v.prop === 'textStyle')?.children);
    });

    test('test public method getOptionDesc', () => {
        assert.strictEqual(store.getOptionDesc([], { } as AstNode), store.topOptionDesc);
    });
});

function getFileData(name: string): any {
    const fileName = path.resolve(__dirname + `../../../../assets/${name}.json`);
    return JSON.parse(fs.readFileSync(fileName, { encoding: 'utf8' }));
}
