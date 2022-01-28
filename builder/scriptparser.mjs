import fs from 'fs/promises';
import userscriptMeta from 'userscript-meta';
import { minify } from 'terser';
import bookmarklet from 'bookmarklet';
export async function scriptparser(filename) {
    const code = await fs.readFile('./src/' + filename, 'utf8');
    const header =
        code
            .trim()
            .match(/^(?:^\/\/.*\s?)+/gm)
            ?.join('\n') || '';
    const meta = userscriptMeta.parse(header);
    console.log(meta.description);
    const headerFormatted = userscriptMeta.stringify(meta);
    console.log(headerFormatted);
    const _url = `https://raw.githubusercontent.com/snomiao/userscript.js/master/src/${filename}`;
    const url = encodeURI(_url);
    const mincode = (await minify(code, { compress: true })).code;
    const bmlCode = await bookmarklet.convert(code, {});
    return { filename, code, meta, url, mincode, bookmarklet: bmlCode };
}
