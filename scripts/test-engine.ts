import { execSync } from 'child_process';
import * as path from 'path';

// Run tests directly with ts-node (no compilation needed)
// eslint-disable-next-line no-console
console.log('Running tests with ts-node...');
try {
    execSync('npx ts-node --project tsconfig.test.json update/engine/__tests__/runTests.ts', {
        cwd: path.join(__dirname),
        stdio: 'inherit',
    });
} catch (e) {
    process.exit(1);
}
