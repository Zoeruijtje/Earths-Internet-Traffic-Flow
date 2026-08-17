import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);

await rm('docs', { recursive: true, force: true });
await mkdir('docs', { recursive: true });
await cp('dist', 'docs', { recursive: true });
await writeFile('docs/.nojekyll', '');
console.log('Generated GitHub Pages output in /docs.');
