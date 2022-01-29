// ==UserScript==
// @name         Go to English wikipedia
// @namespace    https://userscript.snomiao.com/
// @version      0.0.1
// @description  Search wikipedia in chinese, read it in english.
// @author       snomiao@gmail.com
// @match        https://zh.wikipedia.org/wiki/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

document?.querySelector('.interlanguage-link-target[lang="en"]')?.click();
