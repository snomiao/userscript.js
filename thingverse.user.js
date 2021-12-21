// ==UserScript==
// @name         Thingverse auto download
// @namespace    https://userscript.snomiao.com/
// @version      0.0.1
// @description  1. Khan Acadamy dialogs force FullScreen, 2. Ctrl+Enter To confirm
// @author       snomiao@gmail.com
// @match        https://www.thingiverse.com/search?*
// @match        https://www.thingiverse.com/thing*
// @icon         https://www.google.com/s2/favicons?domain=khanacademy.org
// @grant        none
// ==/UserScript==

(async () => {
    const searchpageQ =
        0 === location.href.indexOf('https://www.thingiverse.com/search?');
    const thingpageQ =
        0 === location.href.indexOf('https://www.thingiverse.com/thing:');
    const eleFind = (pattern) =>
        [...document.querySelectorAll('*')]
            .reverse()
            .find((e) => e.textContent?.match(pattern));
    if (thingpageQ) eleFind(/Download All Files/).click();
    // 'Downloading...'
})();
