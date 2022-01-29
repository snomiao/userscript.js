import { escape, unescape } from 'html-escaper';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { scriptparser } from './scriptparser';
const pmap = (ls, fn) => Promise.all(ls.map(fn));

const sinfo = await pmap(
    (await fs.readdir('./src/')).filter((e) => e.match(/\.user\.js$/)),
    scriptparser
);

await fs.writeFile(
    './bookmarks/greasyfork_import_urls.txt',
    sinfo.map((e) => e.url).join('\n')
);

const baseJSD = 'https://cdn.jsdelivr.net/gh/snomiao/userscript.js/src/';
const ss = sinfo
    .map(({ filename, mincode, url, bookmarklet }) => {
        const md = `[${filename}](javascript:${encodeURIComponent(mincode)})`;
        const src = baseJSD + filename;
        const bml = `javascript:(function(){document.body.appendChild(Object.assign(document.createElement('script'), {src: '${src}'}))}())`;
        /* `[${filename}](javascript:${encodeURIComponent(mincode)})`*/
        /* `<a href='javascript:${mincode.replace(/'/g,'&apos;')}'>${filename}</a>`*/
        /* `${filename} - ${mincode}`*/
        const style =
            'background: lightblue; border: solid 1px grey; decoration: none';
        const a = `<a style="${style}" href="${bookmarklet}">${filename}</a>`;
        return a;
    })
    .join('\n');
await fs.writeFile('./bookmarks/x.html', ss);

// await promisify(exec)('chrome https://greasyfork.org/en/import');
