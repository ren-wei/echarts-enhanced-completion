import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

/** 从 echarts-doc 项目中获取原始资源 */
export async function getOption(name: string, lang: string, env: 'production' | 'test', version: 'master' | 'v4') : Promise<string> {
    if (env === 'production') {
        // eslint-disable-next-line no-console
        console.log(`GET /${lang}/option/${name}.md`);
    }
    const address = `https://raw.githubusercontent.com/ren-wei/echarts-doc/${version}/${lang}/option/${name}.md`;
    try {
        if (env === 'production') {
            const res = await axios.get(address);
            if (res.status === 200) {
                try {
                    fs.writeFile(path.resolve(__dirname, `./source/${version}/${lang}/${name}.md`), res.data, () => {});
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error("Can't save resource file:", path.resolve(__dirname, `./source/${version}/${lang}/${name}.md`));
                }
                return res.data;
            } else {
                return '';
            }
        } else {
            return fs.readFileSync(path.resolve(__dirname, `./source/${version}/${lang}/${name}.md`), { encoding: 'utf8' });
        }
    } catch (e) {
        if (env === 'production') {
            // eslint-disable-next-line no-console
            console.error("Can't connect to github, the real address is " + address);
        } else {
            // eslint-disable-next-line no-console
            console.error("Can't get local cache file: " + path.resolve(__dirname, `./source/${version}/${lang}/${name}.md`) + '\nYou can execute the following command:\n\n\tyarn update:assets\n');
        }
        process.exit(1);
    }
}
