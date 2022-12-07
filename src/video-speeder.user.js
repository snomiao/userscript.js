// ==UserScript==
// @name               [SNOLAB] [Mulango] Telegram Translator
// @name:zh            [SNOLAB] [Mulango] 电报译者
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            1.7.0
// @description        [SNOLAB] [Mulango] Speak latest telegram message With TTS technology just in your browser. 1. Speak latest message you received in your learning language 2. Speak what you just send in your learning language. 3. Send what you saying in your learning language (for example saying something start with CQ CQ ...).
// @match              https://*.telegram.org/z/
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// ==/UserScript==

const e = document.querySelectorAll("video")[1];
const start = () => {
    const f = (percent) => {
        const pbr = 1 + Math.sin(Math.PI * percent) * 2;
        console.log("pbr", pbr);
        e.playbackRate = pbr;
    };
    const s = +new Date();
    const i = 5000;
    f(0);
    const id = setInterval(() => {
        f((+new Date() - s) / i);
    }, 200);
    setTimeout(() => {
        clearInterval(id);
        f(1);
    }, i);
};

start();
