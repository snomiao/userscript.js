// ==UserScript==
// @name            Alt Speak Translator
// @description     Press Alt to Speak currently Selection.
// @namespace       https://userscript.snomiao.com/
// @version         0.1.2
// @author          snomiao@gmail.com
// @match           *://*/*
// @grant           none
// ==/UserScript==

(async function () {
    const transcriptCache = await transcriptCacheCreate();

    window.addEventListener("keyup", async (e) => {
        if (
            !(
                e.key === "Alt" &&
                !e.altKey &&
                !e.ctrlKey &&
                !e.metaKey &&
                !e.shiftKey
            )
        )
            return;
        e.preventDefault(), e.stopPropagation();

        const { translate: googleTranslate, setCORS } = await import(
            "https://cdn.skypack.dev/google-translate-api-browser"
        );
        setCORS(
            "https://cors-google-translate-3whumkxidzs1.runkit.sh/gt/?url="
        );

        const text = window.getSelection().toString();
        if (!text) return; // no selection
        console.log("selection", text);
        for await (const lang of navigator.languages.slice(0, 2)) {
            const transcript =
                (await transcriptCache.getItem(
                    JSON.stringify({ text, lang })
                )) ||
                (await googleTranslate(text, {
                    to: lang.replace(/-.*/g, ""),
                })
                    .then((e) => e.text)
                    .catch(() => ""));
            await transcriptCache.setItem(
                JSON.stringify({ text, lang }),
                transcript
            );
            console.log("speak translated", text, transcript, lang);
            await speak(transcript, lang);
        }
    });
})();

async function speak(text, lang) {
    if (!text) return; // noting to speak
    globalThis.speechSynthesis?.cancel();
    await new Promise((resolve, reject) =>
        globalThis.speechSynthesis?.speak(
            Object.assign(new SpeechSynthesisUtterance(text), {
                lang,
                onend: resolve,
                onerror: reject,
            })
        )
    );
}
async function transcriptCacheCreate() {
    const { default: cache } = await import(
        "https://cdn.skypack.dev/@luudjanssen/localforage-cache"
    );
    const transcriptCache = cache.createInstance({
        name: "transcript",
        defaultExpiration: 600e3,
    });
    return transcriptCache;
}
