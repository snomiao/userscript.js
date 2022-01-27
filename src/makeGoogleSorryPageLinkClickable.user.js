// ==UserScript==
// @name         Make Google Sorry Page Link Clickable
// @namespace    https://userscript.snomiao.com/
// @version      0.1.0
// @description  Make Google Sorry Page Link Clickable
// @author       snomiao@gmail.com
// @match        https://www.google.com/sorry/index?*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(
    /URL: (.*?)<br>/,
    (_, $1) => 'URL: <a href="' + $1 + '">' + $1 + '</a>'
);
