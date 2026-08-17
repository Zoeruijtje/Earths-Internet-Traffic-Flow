import { access, readFile } from 'node:fs/promises';

await access('docs/index.html');
await access('docs/.nojekyll');
const html = await readFile('docs/index.html', 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('docs/index.html is not the Vite application shell.');
if (/https?:\/\/cdn\.|jsdelivr|unpkg/.test(html)) throw new Error('Generated Pages HTML contains a runtime CDN reference.');
console.log('Verified /docs production shell and .nojekyll.');
