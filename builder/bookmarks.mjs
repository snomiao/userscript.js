import fs from 'fs/promises';
(await fs.readdir('../'))
    .filter((e) => e.match(/\.user\.js$/))
    .map(async (fn) => await fs.readFile('../' + fn));
// ==UserScript==

// ==/UserScript==
