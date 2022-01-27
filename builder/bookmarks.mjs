import fs from 'fs/promises';
import 'userscript-meta';

(
    await Promise.all(
        (await fs.readdir('../'))
            .filter((e) => e.match(/\.user\.js$/))
            .map(async (fn) => await fs.readFile('../' + fn, 'utf8'))
    )
).map((content) => {
    console.log(content.match(/@version .*/));
});
// ==UserScript==

// ==/UserScript==
