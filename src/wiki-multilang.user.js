// ==UserScript==
// @name               Wikipedia multi language view
// @name:zh            Wikipedia 多语言浏览
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.0.4
// @description        View a Wikipedia entry with two (or more?) languages side by side for comparison and language learning.
// @description:zh     以并列多语言视角浏览维基百科
// @match              https://*.wikipedia.org/wiki/*
// @match              https://zh.wikipedia.org/zh-*/*
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://www.paypal.com/donate/?cmd=_donations&business=snomiao@gmail.com&item_name=Greasy+Fork+donation
// ==/UserScript==
//
// ref:
// [javascript - Resize Cross Domain Iframe Height - Stack Overflow]( https://stackoverflow.com/questions/22086722/resize-cross-domain-iframe-height )
//

if (location.hash.match('#langIfr')) {
    // iframe code send height
    const sendHeight = () =>
        parent.postMessage?.(
            { langIfr: { height: document.body.scrollHeight } },
            '*'
        );
    window.addEventListener('resize', sendHeight, false);
    window.addEventListener('load', sendHeight, false);
    sendHeight();
} else {
    // parent code recv iframe's height
    const msgHandler = (e) => {
        const setHeight = (height) =>
            height &&
            document.querySelector('#langIfr')?.setAttribute('height', height);
        setHeight(e.data?.langIfr?.height);
    };
    window.addEventListener('message', msgHandler, false);
    // load iframe
    const langLnksGet = () =>
        Object.fromEntries(
            [...document.querySelectorAll('a.interlanguage-link-target')]
                .map((e) => ({
                    lang: e.getAttribute('lang'),
                    href: e.href,
                    language: e.textContent,
                }))
                .map((e) => [e.lang, e])
        );
    const exlangFrameLoad = () => {
        const langLnks = langLnksGet();
        const langIframeLoad = (lang = 'en') => {
            if (!langLnks[lang]) return false;
            document.body.setAttribute('style', 'width: 50vw');
            document.body.querySelector('#langIfr')?.remove();
            document.querySelector('#sidebarCollapse')?.click();
            const langIfr = Object.assign(document.createElement('iframe'), {
                id: 'langIfr',
                src: langLnks[lang].href + '#langIfr',
            });
            langIfr.setAttribute(
                'style',
                'border: none; position:absolute; left: 50vw; top: 0vh; width: 50vw'
            );
            document.body.appendChild(langIfr);
            return true;
        };
        langIframeLoad('en') || langIframeLoad('zh') || langIframeLoad('ja');
    };
    window.addEventListener('load', exlangFrameLoad, false);
}
