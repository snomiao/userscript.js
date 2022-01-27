import fs from 'fs/promises';
import userscriptMeta from 'userscript-meta';
import { minify } from 'terser';
import { exec } from 'child_process';
import { promisify } from 'util';
const pmap = (ls, fn) => Promise.all(ls.map(fn));

const scriptparser = async (filename) => {
    const content = await fs.readFile('./src/' + filename, 'utf8');
    const header =
        content
            .trim()
            .match(/^(?:^\/\/.*\s?)+/gm)
            ?.join('\n') || '';
    const meta = userscriptMeta.parse(header);
    // const header2 = userscriptMeta.stringify(meta);
    const _url = `https://raw.githubusercontent.com/snomiao/userscript.js/master/src/${filename}`;
    const url = encodeURI(_url);
    // console.log('\nminifying ' + filename);
    const mincode = (await minify(content, { compress: true })).code;
    // console.log(filename, meta, url);
    return { filename, content, meta, url, mincode };
};

const sinfo = await pmap(
    (await fs.readdir('./src/')).filter((e) => e.match(/\.user\.js$/)),
    scriptparser
);

sinfo.map((e) => console.log(e.url));

const ss = sinfo
    .map(
        ({ filename, mincode, url }) =>
            // `[${filename}](javascript:${encodeURIComponent(mincode)})`
            // `<a href='javascript:${mincode.replace(/'/g,'&apos;')}'>${filename}</a>`
            // `${filename} - ${mincode}`
            `<a href="javascript:(function(){document.body.appendChild(Object.assign(document.createElement('script'), {src: '${url}'}))}())">${filename}</a>`
    )
    .join('\n');
await fs.writeFile('./bookmarks/x.md', ss);

// await promisify(exec)('chrome https://greasyfork.org/en/import');
