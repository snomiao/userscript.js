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
    const edgeFilter = (init) => (e) => e !== init ? (init = e) : undefined;
    const translate = async (s, lang = navigator.language) => {
        const { translate, setCORS } = await import(
            "https://cdn.skypack.dev/google-translate-api-browser"
        );
        setCORS(
            "https://cors-google-translate-3whumkxidzs1.runkit.sh/gt/?url="
        );
        return (
            s &&
            translate(s, { to: lang.replace(/-.*/, "") })
                .then((e) => e.text)
                .catch((e) => console.error(e))
        );
    };

    const changed = edgeFilter("");
    while (1) {
        const e = document.querySelector(".mtjGmSc-kanji");
        if (e && changed(e.childNodes[0].textContent)) {
            document.querySelector(".mtjGmSc-kana").style = "color: #DDD";
            document.querySelector(".mtjGmSc-roma").style = "display: none";
            const style =
                "width: 100%;text-align: center;background: white;position: relative;z-index: 1;";
            // margin-bottom: -1.1em;
            e.children[0] && e.removeChild(e.children[0]);
            e.appendChild(
                Object.assign(document.createElement("div"), {
                    innerHTML: e.childNodes[0].textContent,
                    style,
                })
            );
            const transcript = await translate(
                e?.childNodes?.[0]?.textContent,
                navigator.languages[1]
            );
            e.children[0] && e.removeChild(e.children[0]);
            e.appendChild(
                Object.assign(document.createElement("div"), {
                    innerHTML: transcript,
                    style,
                })
            );
        }
        await new Promise((r) => setTimeout(r, 32)); // TODO: upgrade this into Observer Object
    }
})();
