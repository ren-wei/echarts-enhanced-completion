import { run } from './suite/index';

async function main() {
    try {
        // TODO: 暂时不使用 vscode-test 进行测试
        await run();
    } catch (err) {
        /* eslint-disable-next-line no-console */
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
