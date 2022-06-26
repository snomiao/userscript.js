// ==UserScript==
// @name               google multilang search view en/zh
// @name:zh            谷歌多语言搜索 en/zh
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.0.2
// @description        View a google search result in two languages side by side for comparison and language learning.
// @description:zh     以并列多语言视角浏览谷歌搜索结果
// @match              https://*.google.com/search?*
// @match              https://*.google.com*/search?*
// @match              https://*.google.com.hk/search?*
// @match              https://*.google.com.tw/search?*
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// @grant   GM_getValue
// @grant   GM_setValue
// ==/UserScript==
const introURL =
    'https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/';
const intro = `
[Microsoft Translator Text API Documentation (microsoft-azure-org-microsoft-cognitive-services) | RapidAPI]( ${introURL} )
1. Open ${introURL}
2. Sign up or login
3. Click Subscribe to Test
4. Copy your API key
4. Come back and paste here
5. OK
`.trim();

(async function () {
    if (parent !== window) return iframeHeightSenderSetup();
    iframeHeightReceiverSetup();
    //
    const rapidAPIKey = (globalThis.rapidAPIKey = await rapidAPIKeyLoad());
    if (!rapidAPIKey) throw new Error('no rapid api key');
    const searchLinks = await getMultiLangSearchLinks();
    replacePageWIthMultiLang(searchLinks);
})();

function replacePageWIthMultiLang(searchLinks) {
    const iframes = searchLinks.map((src) => `<iframe src="${src}"></iframe>`);
    const style = `<style>
        body{margin: 0; display: flex; flex-direction: row;}
        iframe{flex: auto;height: 100vh;overflow: hidden;border: none;}
    </style>`;
    document.body.innerHTML = `${style}${iframes}`;
}

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

async function getMultiLangSearchLinks() {
    const url = new URL(location.href);
    const query = url.searchParams.get('q') || '';
    const result = await bingTranslate(query);
    const searchLinks = result.flatMap((e) =>
        e.translations.map((t) => {
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
    const ak = await rakGet();
    if (!ak) throw new Error('no rapid api key is found');
    const response = await fetch(
        'https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=zh%2Cen&api-version=3.0&profanityAction=NoAction&textType=plain',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': ak,
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
            },
            body,
        }
    )
        .then((r) => r.json())
        .catch(async (e) => await rapidAPIKeyLoadNew('error: ' + e.message));
    return response;
}

async function rapidAPIKeyLoad() {
    return (await rakGet()) || (await rapidAPIKeyLoadNew());
}
async function rapidAPIKeyLoadNew(msg = '') {
    return (
        window.open(introURL, '_blank'),
        await rakSet(prompt((msg + '\n' + intro).trim(), await rakGet()) || ''),
        await rakGet()
    );
}

async function rakGet() {
    return (
        (await globalThis.GM_getValue?.('rapidAPIKey', '')) ||
        localStorage.getItem('rapidAPIKey')
    )?.replace(/^null$/, '');
}
async function rakSet(v = '') {
    return (
        (await (globalThis.GM_setValue &&
            ((await globalThis.GM_setValue('rapidAPIKey', v || '')) ||
                true))) ||
        localStorage.setItem('rapidAPIKey', v || '') ||
        true
    );
}
