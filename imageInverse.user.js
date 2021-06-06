// ==UserScript==
// @name         Quick Inverse Images color by Alt+C
// @namespace    https://snomiao.com
// @version      0.1
// @description  Alt+C to inverse images on all page, use for win10 inverse color mode (as a dark mode, while images shows right colors)
// @author       snomiao
// @match        http*://*/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    let head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '';
    head.appendChild(style);

    const toggle = () => (style.innerHTML = style.innerHTML ? '' : `img{filter: invert(100%);}`)
    window.addEventListener('keydown', (e) => {
        if (e.altKey && !e.shiftKey && !e.ctrlKey && e.code == 'KeyC') {
            toggle()
        }
    })

})();