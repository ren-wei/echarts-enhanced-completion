/* eslint-disable no-console */
import Mocha from 'mocha';
import * as path from 'path';
import glob from 'glob';

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'bdd',
        color: true,
    });

    const testsRoot = __dirname;

    return new Promise((resolve, reject) => {
        glob('**/**.test.ts', { cwd: testsRoot }, (err: Error | null, files: string[]) => {
            if (err) {
                return reject(err);
            }

            // Add files to the test suite
            files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

            try {
                // Run the mocha test
                mocha.run((failures: number) => {
                    if (failures > 0) {
                        reject(new Error(`${failures} tests failed.`));
                    } else {
                        resolve();
                    }
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    });
}

// Run tests directly if this file is executed
if (require.main === module) {
    run().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
