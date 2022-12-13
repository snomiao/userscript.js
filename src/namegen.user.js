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


"use strict";
(() => {
  // node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/browser.js
  var clipboard = {};
  clipboard.write = async (text) => {
    await navigator.clipboard.writeText(text);
  };
  clipboard.read = async () => navigator.clipboard.readText();
  clipboard.readSync = () => {
    throw new Error("`.readSync()` is not supported in browsers!");
  };
  clipboard.writeSync = () => {
    throw new Error("`.writeSync()` is not supported in browsers!");
  }; 
  var browser_default = clipboard;

  // ts/namegen.user.ts
  (async function() {
    "asdf";
    let n = "";
    const valid = (n2) => new Set(n2.match(/a|i|u|e|o/g)).size >= 3 && n2.match(/z/g)?.length <= 1 && !n2.startsWith("z") && n2.startsWith("s");
    while (!valid(n))
      n = namegen();
    browser_default.writeSync(n);
    console.log(n);
  })();
  function charGen() {
    return ((e) => e[Math.random() * e.length | 0])(
      matrixExpand({
        0: " rtypsdghkbnm".split(""),
        1: "aiueo".split(""),
        2: "   rny".split("")
      }).map((e) => (e[0] + e[1] + e[2]).trim()).filter((e) => !"hi,gi,di,yi,pe".match(e))
    );
  }
  function namegen() {
    return [charGen(), charGen(), charGen()].join("").slice(0, 7);
  }
  function matrixExpand(matrix) {
    return Object.entries(matrix).reduce(
      (r, [k, a]) => r.flatMap((rv) => [...a.map((v) => ({ ...rv, [k]: v }))]),
      [{}]
    );
  }
})();
