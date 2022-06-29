// ==UserScript==
// @name               google multilang search view en/zh
// @name:zh            谷歌多语言搜索 en/zh
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.0.7
// @description        [snolab] Mulango - Walkers for bilingual learners. View a google search result in two languages side by side for comparison and language learning. now supports Bing & Google,
// @description:zh     [snolab] Mulango - 双语学习者的学步车，以并列多语言视角浏览谷歌搜索结果 现支持 Bing & Google,
// @match              https://*.google.com/search?*
// @match              https://*.bing.com/search?*
// @match              https://*/search*
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
// [Microsoft Translator Text API Documentation (microsoft-azure-org-microsoft-cognitive-services) | RapidAPI]( ${introURL} )
const introPrompt = `
1. I will open ${introURL} for you.
    1. Sign up or login
    2. Go to Endpoints tab
    3. Click Subscribe to Test
2. Copy your API key
    5. Close the page
    3. Come back
3. paste API Key in prompt
4. OK
`.trim();

(async function () {
    if (!location.hostname.match(/google|bing/)) return;
    if (parent !== window) return iframeSetup();
    iframeHeightReceiverSetup();
    //
    const rapidAPIKey = (globalThis.rapidAPIKey = await rapidAPIKeyLoad());
    if (!rapidAPIKey) throw new Error('no rapid api key');
    const searchLinks = await getMultiLangSearchLinks();
    searchLinks.length && replacePageWIthMultiLang(searchLinks);
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
function iframeSetup() {
    iframeScrollbarRemove();

    const sendHeight = () =>
        parent.postMessage?.({ height: document.body.scrollHeight }, '*');
    window.addEventListener('resize', sendHeight, false);
    window.addEventListener('load', sendHeight, false);
    sendHeight();
    window.addEventListener('load', iframeLinksSetup, false);
}

function iframeLinksSetup() {
    return [...document.querySelectorAll('a[href]')]
        .filter(({ href }) => new URL(href).origin === location.origin)
        .map((e) => (e.target = '_parent'));
}

function iframeScrollbarRemove() {
    document.body.style.margin = '-18px auto 0';
}

async function getMultiLangSearchLinks() {
    const url = new URL(location.href);
    const query = url.searchParams.get('q') || '';
    if (!query) return [];
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
    alert(introPrompt);
    const w = window.open(
        introURL,
        'google-multilang-user-js-rapidAPIKey',
        'width=1024,height=768'
    );
    await new Promise((r) => {
        let id = setInterval(() => w.closed && (r(), clearInterval(id)));
    });
    return (
        await rakSet(
            prompt((msg + '\n' + introPrompt).trim(), await rakGet()) || await rakGet() || ''
        ),
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
