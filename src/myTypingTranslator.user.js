// ==UserScript==
// @name         [SNOLAB] [Mulango] myTyping Game Translator
// @namespace    https://userscript.snomiao.com/
// @author       snomiao@gmail.com
// @version      0.1.1
// @description  [SNOLAB] [Mulango] Translate Japenese to the second language of your browser.
// @match        https://typing.twi1.me/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twi1.me
// @grant        none
// ==/UserScript==
/*
    Tested Pages:
        https://typing.twi1.me/game/79902
 */

(async function () {
    const cached = await localforageCache("transcript");
    const translate = await translator(navigator.languages[1]);
    const speaked = async (text) => (
        speechSynthesis.speak(
            Object.assign(new SpeechSynthesisUtterance(), { text })
        ),
        text
    );
    const speakAndTranslate = async (s) =>
        await cachedTranslate(await speaked(s));
    questionsLoop().then();
    typingLoop().then();

    async function cachedTranslate(s) {
        return await cached(s, translate);
    }
    async function cachedTranslateEx({ s, lang }) {
        return lang
            ? await cached({ s, lang }, ({ s, lang }) => translate(s, lang))
            : await cached(s, translate);
    }

    async function questionsLoop() {
        while (1) {
            const e = document.querySelector(
                ".questions .kanji:not(.translated)"
            );
            if (e) {
                const transcript = await cachedTranslate(e.textContent);
                e.innerHTML = e.innerHTML + "\t(" + transcript;
                // const ts2 = await cachedTranslateEx({
                //     s: e.textContent,
                //     lang: "zh-CN",
                // });
                // e.classList.add("translated");
                // e.setAttribute("title", ts2);
                continue;
            }
            await new Promise((r) => setTimeout(r, 32)); // TODO: upgrade this into Observer Object
        }
    }
    async function typingLoop() {
        const changed = edgeFilter("");
        while (1) {
            const e = document.querySelector(".mtjGmSc-kanji");
            if (e && changed(e.childNodes[0].textContent)) {
                document.querySelector(".mtjGmSc-kana").style = "color: #DDD";
                document.querySelector(".mtjGmSc-roma").style = "display: none";
                const textContent = e?.childNodes?.[0]?.textContent;
                await kanjiSuffixReplace(e, textContent);
                const transcript = await speakAndTranslate(textContent);
                await kanjiSuffixReplace(e, transcript);
                // const transcript2 = await cachedTranslateEx({
                //     s: textContent,
                //     lang: "zh-CN",
                // });
                // await kanjiSuffixReplace(
                //     e,
                //     transcript + "<br />" + transcript2
                // );
            }
            await new Promise((r) => setTimeout(r, 32)); // TODO: upgrade this into Observer Object
        }
    }
})();

async function kanjiSuffixReplace(e, transcript) {
    const style =
        "width: 100%;text-align: center;background: white;position: relative;z-index: 1;";
    e.children[0] && e.removeChild(e.children[0]);
    e.appendChild(
        Object.assign(document.createElement("div"), {
            className: "kanji-suffix",
            innerHTML: transcript,
            style,
        })
    );
    await new Promise((r) => setTimeout(r, 1));
}

async function localforageCache(name = "cache") {
    const { default: cache } = await import(
        "https://cdn.skypack.dev/@luudjanssen/localforage-cache"
    );
    const cacheInstance = cache.createInstance({
        name,
        defaultExpiration: 86400e3 * 3, // 3 day
    });
    return cached;
    async function cached(key, fn) {
        const result =
            (await cacheInstance?.getItem(JSON.stringify(key))) ||
            (await fn(key));
        await cacheInstance?.setItem(JSON.stringify(key), result); //refresh cache
        return result;
    }
}
async function translator(initLang = navigator.language) {
    const translate = (
        await import("https://cdn.skypack.dev/google-translate-api-browser")
    ).setCORS("https://google-translate-cors.vercel.app/api?url=");
    let t = 0;

    return async (s, lang = initLang) => {
        if (!s) return;
        // wait 1s since last translate
        while (+new Date() - t < 1e3)
            await new Promise((r) => setTimeout(r, 2e3));
        t = +new Date();
        return await translate(s, { to: lang.replace(/-.*/, "") })
            .then((e) => e.text)
            .catch((e) => console.error(e));
    };
}

function edgeFilter(init) {
    return (e) => (e !== init ? (init = e) : undefined);
}
