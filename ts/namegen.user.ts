// ==UserScript==
// @name               [SNOLAB] Name Generator
// @name:zh            [SNOLAB] Name Generator
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            1.0.0
// @description        Random name generator
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// ==/UserScript==

import clipboard from "clipboardy";

(async function () {
  let n = "";
  while (!nameValidDesuka(n)) n = nameGenerate();
  clipboard.writeSync(n);
  console.log(n);
})();

function charGen() {
  return ((e) => e[(Math.random() * e.length) | 0])(
    matrixExpand({
      0: " rtypsdghkbnm".split(""),
      1: "aiueo".split(""),
      2: "   rny".split(""),
    })
      .map((e) => (e[0] + e[1] + e[2]).trim())
      .filter((e) => !"hi,gi,di,yi,pe".match(e))
  );
}
function nameGenerate() {
  return [charGen(), charGen(), charGen()].join("").slice(0, 7);
}
function matrixExpand<T extends Record<string, any[]>>(matrix: T) {
  return Object.entries(matrix).reduce(
    (r, [k, a]) => r.flatMap((rv) => [...a.map((v) => ({ ...rv, [k]: v }))]),
    [{}] as {
      [k in keyof T]: T[k][number];
    }[]
  );
}

function nameValidDesuka(name: string) {
  return (
    new Set(name.match(/a|i|u|e|o/g)).size >= 3 &&
    (name.match(/z/g)?.length || 0) <= 1 &&
    !name.startsWith("z") &&
    name.startsWith("s")
  );
}
