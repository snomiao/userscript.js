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

const jsDelivrPath = 'https://cdn.jsdelivr.net/gh/snomiao/userscript.js/src/';
const aStyle1 =
    'display:inline-block;background:#32eb00;padding:0.1rem 0.5rem;border-radius:0.2rem;text-decoration:none;color:black;';
const aStyle2 =
    'display:inline-block;background:#32a0eb;padding:0.1rem 0.5rem;border-radius:0.2rem;text-decoration:none;color:white;';

const ssEn =
    '# List of Userscript by snomiao\n' +
    `## Install\n` +
    `1. TamperMonkey User - Click <a style="${aStyle1}">GreasyFork</a> , And install in GreasyFork  \n` +
    `2. Bookmarklet - Drag the <a style="${aStyle2}">Script Name</a> Into your Bookmark/favourites, then click it later when you need the function.\n` +
    `\n` +
    '## All scripts list\n\n' +
    sinfo
        .filter(({ meta }) => meta.name)
        .map(({ meta, filename, mincode, url, bookmarklet }) => {
            const name = meta['name:en'] ?? meta.name;
            const description = meta['description:en'] ?? meta.description;
            console.log(meta);
            const md = `[${filename}](javascript:${encodeURIComponent(
                mincode
            )})`;
            const src = jsDelivrPath + filename;
            const h3 = `### ${name}`;
            const gfurlRaw = `https://greasyfork.org/en/scripts?filter_locale=0&q=${name}`;
            const gfurl = encodeURI(gfurlRaw);
            const a1 = `<a style="${aStyle1}" href="${gfurl}" title="${description}">GreasyFork</a>`;
            const a2 = `<a style="${aStyle2}" href="${bookmarklet}" title="${description}">${name}</a>`;
            const desc = `<p>Description: ${description}</p>`;
            const element = [h3, a1, a2, desc, ''].join('\n');
            return element;
        })
        .join('\n') +
    '\n---';
await fs.writeFile('./docs/script-intro.md', ssEn);

const ssZhCn =
    '# 脚本列表\n' +
    `## 安装方法\n` +
    `1. TamperMonkey User - 点击 <a style="${aStyle1}">GreasyFork</a> 按钮，进入 GreasyFork 脚本安装页面安装。 \n` +
    `2. Bookmarklet - 把对应的 <a style="${aStyle2}">脚本名称</a> 按钮，拖到 收藏夹/书签栏 内安装，在需要的时候点击使用（或搜索对应书签名称使用）。 \n` +
    `\n` +
    '## 脚本列表详情\n\n' +
    sinfo
        .filter(({ meta }) => meta.name)
        .map(({ meta, filename, mincode, url, bookmarklet }) => {
            const name = meta['name:zh'] ?? meta['name:zh-cn'] ?? meta.name;
            const description =
                meta['description:zh'] ??
                meta['description:zh-cn'] ??
                meta.description;
            console.log(meta);
            const md = `[${filename}](javascript:${encodeURIComponent(
                mincode
            )})`;
            const src = jsDelivrPath + filename;
            const h3 = `### ${name}`;
            const gfurlRaw = `https://greasyfork.org/en/scripts?filter_locale=0&q=${name}`;
            const gfurl = encodeURI(gfurlRaw);
            const a1 = `<a style="${aStyle1}" href="${gfurl}" title="${description}">GreasyFork</a>`;
            const a2 = `<a style="${aStyle2}" href="${bookmarklet}" title="${description}">${name}</a>`;
            const desc = `<p>描述：${description}</p>`;
            const element = [h3, a1, a2, desc, ''].join('\n');
            return element;
        })
        .join('\n') +
    '\n---';
await fs.writeFile('./docs/zh-cn/script-intro.md', ssZhCn);

// await promisify(exec)('chrome https://greasyfork.org/en/import');
