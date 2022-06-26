// ==UserScript==
// @name               google multilang search view en/zh
// @name:zh            谷歌多语言搜索 en/zh
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.0.1
// @description        View a google search result in two languages side by side for comparison and language learning.
// @description:zh     以并列多语言视角浏览谷歌搜索结果
// @match              https://*.google.com/search?*
// @grant              none
// @run-at             document-end
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// @grant   GM_getValue
// @grant   GM_setValue
// ==/UserScript==
// https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/
//
// ref:
// [javascript - Resize Cross Domain Iframe Height - Stack Overflow]( https://stackoverflow.com/questions/22086722/resize-cross-domain-iframe-height )
//
(async function () {
    if (parent !== window) return iframeHeightSenderSetup();
    iframeHeightReceiverSetup();

    const akGet = async () =>
        (await globalThis.GM_getValue?.('rapidAPIKey')) ||
        localStorage.getItem('rapidAPIKey');
    const akSet = async (v) =>
        (await (globalThis.GM_setValue &&
            ((await globalThis.GM_setValue('rapidAPIKey', v)) || true))) ||
        localStorage.setItem('rapidAPIKey', v) ||
        true;
    const introURL =
        'https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/';
    const apiLink = `[Microsoft Translator Text API Documentation (microsoft-azure-org-microsoft-cognitive-services) | RapidAPI]( ${introURL} )`;
    const keyIntro = 'Input X-RapidAPI-Key you got from ' + apiLink;
    const rapidAPIKey =
        (await akGet()) ||
        (window.open(introURL, '_blank'),
        await akSet(prompt(keyIntro)),
        await akGet());
    globalThis.rapidAPIKey = rapidAPIKey;
    if (!rapidAPIKey) throw new Error('no rapid api key');
    document.querySelector('.main').remove();
    const searchLinks = await getSearchLinks();
    const iframes = searchLinks.map((src) => `<iframe src="${src}"></iframe>`);
    const style = `<style>body {
        margin: 0;
        display: flex;
        flex-direction: row;
    }
    iframe {
        flex: auto;
        height: 100vh;
        overflow: hidden;
        border: none;
    }</style>`;
    document.body.innerHTML = `${style}${iframes}`;
})();
function iframeHeightReceiverSetup() {
    const setHeight = (height = 0) =>
        height &&
        [...document.querySelectorAll('iframe[src]')].map(
            (e) =>
                (e.style.height =
                    Math.max(
                        Number(String(e.style.height).replace(/\D+/g, '') || 0),
                        height
                    ) + 'px')
        );
    window.addEventListener('message', (e) => setHeight(e.data?.height), false);
}
function iframeHeightSenderSetup() {
    iframeScrollbarRemove();
    const sendHeight = () =>
        parent.postMessage?.({ height: document.body.scrollHeight }, '*');
    window.addEventListener('resize', sendHeight, false);
    window.addEventListener('load', sendHeight, false);
    sendHeight();
}

function iframeScrollbarRemove() {
    document.body.style.margin = '-18px auto 0';
}

async function getSearchLinks() {
    const url = new URL(location.href);
    const query = url.searchParams.get('q') || '';
    const result = await bingTranslate(query);
    const searchLinks = result.flatMap((e) =>
        e.translations
            // .filter((t) => t.to !== e.detectedLanguage.language)
            .map((t) => {
                const u2 = new URL(url.href);
                return u2.searchParams.set('q', t.text), u2.href;
            })
    );
    return searchLinks;
}

async function bingTranslate(text = 'hello, world') {
    const body = JSON.stringify([{ Text: text }]);
    const exampleResponse = [
        {
            detectedLanguage: {
                language: 'en',
                score: 1,
            },
            translations: [
                {
                    text: '我真的很想把你的车开几个圈。',
                    to: 'zh-Hans',
                },
                {
                    text: 'I would really like to drive your car around the block a few times.',
                    to: 'en',
                },
            ],
        },
    ];
    if (!globalThis.rapidAPIKey) throw new Error('no rapid api key is found');
    return await fetch(
        'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=zh%2Cen&api-version=3.0&profanityAction=NoAction&textType=plain',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': globalThis.rapidAPIKey,
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            },
            body,
        }
    ).then((r) => r.json());
}

//     // load iframe
//     const langLnksGet = () =>
//         Object.fromEntries(
//             [...document.querySelectorAll('a.interlanguage-link-target')]
//                 .map((e) => ({
//                     lang: e.getAttribute('lang'),
//                     href: e.href,
//                     language: e.textContent,
//                 }))
//                 .map((e) => [e.lang, e])
//         );
//     const exlangFrameLoad = () => {
//         const langLnks = langLnksGet();
//         const langIframeLoad = (lang = 'en') => {
//             if (!langLnks[lang]) return false;
//             document.body.setAttribute('style', 'width: 50vw');
//             document.body.querySelector('#langIfr')?.remove();
//             document.querySelector('#sidebarCollapse')?.click();
//             const langIfr = Object.assign(document.createElement('iframe'), {
//                 id: 'langIfr',
//                 src: langLnks[lang].href + '#langIfr',
//             });
//             langIfr.setAttribute(
//                 'style',
//                 'border: none; position:absolute; left: 50vw; top: 0vh; width: 50vw'
//             );
//             document.body.appendChild(langIfr);
//             return true;
//         };
//         langIframeLoad('en') || langIframeLoad('zh') || langIframeLoad('ja');
//     };
//     window.addEventListener('load', exlangFrameLoad, false);
// }
