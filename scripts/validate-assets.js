/** 校验资源文件夹中子文件夹的格式 */

const fs = require('fs');
const path = require('path');

// 获取需要校验的文件夹名称
let dirName = '';
if (process.argv.length === 3) {
    dirName = process.argv[2];
}

if (dirName) {
    if (fs.existsSync(path.resolve(__dirname, '../assets/' + dirName))) {
        check(dirName);
    } else {
        error('assets目录下不存在 ' + dirName + ' 文件夹');
    }
} else {
    // 检查资源文件夹下的所有子文件夹
    fs.readdirSync(path.resolve(__dirname, '../assets')).filter(name => fs.lstatSync(path.resolve(__dirname, '../assets/' + name)).isDirectory()).map(name => check(name));
}

/**
 * 检查资源文件夹中的一个子文件夹
 * @param {String} dirName 文件夹名
 */
function check(dirName) {
    warn('* ' + dirName + ':');
    const assert = (condition, message) => {
        if (!condition) {
            error('    - ' + message);
        }
    };
    // 文件名必须小写
    assert(dirName === dirName.toLowerCase(), '文件名必须小写');
    // 文件名不能使用下划线
    assert(!dirName.includes('_'), '请使用中划线代替文件名中的下划线');

    const files = fs.readdirSync(path.resolve(__dirname, '../assets/' + dirName)).filter(name => fs.lstatSync(path.resolve(__dirname, `../assets/${dirName}/${name}`)).isFile());
    // 必须存在 index.json
    assert(files.includes('index.json'), '必须存在 index.json 文件');
    if (!checkFile(dirName, 'index')) {
        success();
    }
}

/**
 * 检查单个文件
 * @param {String} dirName 目录名
 * @param {String} fileName 文件名
 * @return {Boolean}
 */
function checkFile(dirName, fileName) {
    let exist = false;
    /**
     * 条件为 false 时，输出错误信息
     * @param {Boolean} condition 预期条件
     * @param {String} message 错误信息
     */
    const assert = (condition, message) => {
        if (!condition) {
            if (!exist) {
                warn(`    - ${fileName}.json`);
                exist = true;
            }
            error('        - ' + message);
        }
    };
    const fileData = getFileData(dirName, `${fileName}.json`);
    Object.entries(fileData).forEach(
        /**
         * @param {[string, { desc: string, uiControl: { type: string | string[]; default?: string; options?: string; min?: string; max?: string; step?: string; dims?: string; required?: Array<{ key: string; value: string; valueRegExp: string; }>; detailFileName?: string; }}]} param0
         */
        ([key, item]) => {
            // 只能有 desc 和 uiControl
            const otherKeyList = [];
            Object.keys(item).forEach(k => {
                if (!['desc', 'uiControl'].includes(k)) {
                    otherKeyList.push(k);
                }
            });
            otherKeyList.forEach(k => {
                // assert(false, `${key} 中存在未知的属性:${k}`);
            });
            // desc 和 uiControl 的类型
            assert(typeof item.desc === 'string', `${key}.desc 应该是字符`);
            assert(typeof item.uiControl === 'object', `${key}.uiControl 应该是对象`);
            // uiControl 中允许的属性
            const otherPropList = [];
            Object.keys(item.uiControl).forEach(k => {
                if (!['type', 'default', 'options', 'min', 'max', 'step', 'dims', 'required', 'detailFileName'].includes(k)) {
                    otherPropList.push(k);
                }
            });
            otherPropList.forEach(k => {
                // assert(false, `${key}.uiControl 中存在未知的属性:${k}`);
            });
            // uiControl 中必须存在属性 type
            // assert(Boolean(item.uiControl.type), `${key}.uiControl.type 不存在`);
            // TODO: `options` 如果存在，则 `type: "enum"`
            // TODO: `required` 如果存在，则必须位于数组下，并且所有的兄弟选项都必须存在 `required` 字段
            // TODO: `detailFileName` 如果存在，则表示该选项的子选项在这个字段值指定的文件中
        }
    );
    return exist;
}

function getFileData(dirName, fileName) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, `../assets/${dirName}/${fileName}`), { encoding: 'utf8' }));
}

function error(message) {
    // eslint-disable-next-line no-console
    console.error('\x1B[31m%s\x1b[0m', message);
}

function warn(message) {
    // eslint-disable-next-line no-console
    console.warn('\x1B[33m%s\x1b[0m', message);
}

function success(message = '  OK') {
    // eslint-disable-next-line no-console
    console.warn('\x1B[32m%s\x1b[0m', message);
}
