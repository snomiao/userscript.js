// ==UserScript==
// @name         通用自动签到与领取
// @namespace    snomiao@gmail.com
// @version      0.1
// @description  自用，rt
// @author       snomiao@gmail.com
// @match        http*://*
// @grant        none
// ==/UserScript==

(() => {
    window.addEventListener('load', () =>
        [...document.querySelectorAll('a,button,div.btn')]
            .filter((e) => e.textContent.match(/签到|领取/))
            .forEach((e) => e.click())
    );
})();
