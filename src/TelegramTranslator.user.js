// ==UserScript==
// @name               [SNOLAB] Telegram Translator
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.5.0
// @description        [SNOLAB] Speak latest telegram message With TTS technology just in your browser. 1. Speak latest message you received in your learning language 2. Speak what you just send in your learning language. 3. Send what you saying in your learning language (for example saying something start with CQ CQ ...).
// @match              https://*.telegram.org/z/
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// ==/UserScript==

/**
 *
 * Set your browser lang to your learning language.
 *
 * Feat:
 *   1. Speak latest message your received (in your learning language)
 *   2. Speak what you just send           (in your learning language)
 *
 *   3. Send what you saying (in your learning language, traslated into your partner language)
 *   4. Type in your learning learning and send it as your partner's language.
 *
 * Feel free to chat with [@snomiao](t.me/snomiao)
 *
 */
const useTelegramTranslatorState = (initState) => {
    const got = ((e) => e && JSON.parse(e))(
        localStorage.getItem("tgTranslatorState")
    );
    const state = { ...initState, ...got };
    return [
        state,
        (newState) => {
            Object.assign(state, newState);
            localStorage.setItem("tgTranslatorState", JSON.stringify(state));
            return state;
        },
    ];
};
const [state, setState] = useTelegramTranslatorState({
    partnerLang: null,
    learningLang: null,
});
main();

async function main() {
    if (!globalThis.speechSynthesis)
        return alert(
            "unable to access speechSynthesis service, please update your browser"
        );
    // polyfill and error detect
    globalThis.SpeechRecognition =
        globalThis.SpeechRecognition ||
        globalThis.webkitSpeechRecognition ||
        globalThis.mozillaSpeechRecognition;
    if (!globalThis.SpeechRecognition)
        return alert(
            "unable to access speechSynthesis service, please update your browser"
        );
    // listeningLooper().then()
    speakingLooper().then();
    // speakingMySelfLooper().then()
    setTimeout(()=> translateLooper().then(), 1e3)
    // alt+d translate any to learning language
    window.addEventListener("keydown", async (e) => {
        if (!AltD(e)) return;
        e.preventDefault(), e.stopPropagation();
        const raw = document.querySelector("#editable-message-text").innerHTML;
        const text = await translated(raw);
        // translate to learning language
        await speak(text);
        await tgMessageInput(text);
    });
    // alt+f listen...
    window.addEventListener("keydown", async (e) => {
        if (!AltF(e)) return;
        e.preventDefault(), e.stopPropagation();
        const text = await new Promise(async (resolve, reject) => {
            const r = new globalThis.SpeechRecognition();
            r.lang = await userLangGet();
            r.onresult = (e) => resolve(e?.results?.[0]?.[0]?.transcript || "");
            r.onerror = () => setTimeout(() => resolve("/"), 64);
            r.onaudiostart = async () =>
                await tgMessageInput(
                    "Listening... (" + new Date().toISOString() + ")"
                );
            r.start();
        });
        await speak(text);
        await tgMessageInput(text);
        const text2 = await translated(text, state.partnerLang);
        await tgMessageInput(text2 + " (" + text);
    });
    // alt+s translate any to partner lang
    window.addEventListener("keydown", async (e) => {
        if (!AltS(e)) return;
        e.preventDefault(), e.stopPropagation();
        const raw = document.querySelector("#editable-message-text").innerHTML;
        const text = await translated(raw, state.partnerLang);
        await tgMessageInput(text);
    });
}

function AltS(e) {
    return (
        e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey && e.code === "KeyS"
    );
}
function AltF(e) {
    return (
        e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey && e.code === "KeyF"
    );
}

function AltD(e) {
    return (
        e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey && e.code === "KeyD"
    );
}

async function listeningLooper() {
    while (1)
        await tgSend(
            await messageSendingConfirmed(await heard(await userLangGet()))
        );
}
async function speakingLooper() {
    const changed = edgeFilter("");
    while (1) {
        await speak(await translated(changed(latestMessage())));
        await delay1s();
    }
}
// async function speakingMySelfLooper() {
//    const changed = edgeFilter('')
//    while (1) {await speak2nd(await translated(changed(latestMyMessage()))); await delay1s()}
//}
async function translateLooper() {
    // const changed = edgeFilter("");
    while (1) {
        await messageTranslateNext();
        await delay100ms();
        await delay100ms();
        await delay100ms();
    }
}
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}
async function messageTranslateNext() {
    const ls = [
        ...document.querySelectorAll(".Message .text-content"),
    ].reverse();
    for await (const e of ls) {
        if (!e) continue;
        // console.log('isScrolledIntoView(e)', e.childNodes[0].textContent, isScrolledIntoView(e))
        if (!isScrolledIntoView(e)) {
            continue;
        }
        if (e.childNodes[0].textContent?.match("\t")) continue;
        e.childNodes[0].textContent =
            "\t" +
            (await translated(e.childNodes[0].textContent)) +
            "//" +
            e.childNodes[0].textContent;
        // await delay1s();
        break;
    }
}

async function translated(s, lang = null) {
    if (!s) return;
    setState({ learningLang: await userLangGet() });
    const { translate, setCORS } = await import(
        "https://cdn.skypack.dev/google-translate-api-browser"
    );
    setCORS("https://cors-google-translate-3whumkxidzs1.runkit.sh/gt/?url=");
    const re = await translate(s, {
        to: (lang || state.learningLang).replace(/-.*/g, ""),
    });
    const text = re?.text;
    const recognizedLang = re?.from?.language?.iso;
    const partnerLangIsNotLearningLang = !state.learningLang.startsWith(
        state.partnerLang
    );
    if (recognizedLang !== state.partnerLang && partnerLangIsNotLearningLang) {
        setState({
            ...state,
            partnerLang: recognizedLang || state.partnerLang,
        }); // it's zh-CN for me
        console.log("got partner language: ", state.partnerLang);
    }
    if (!text) return s;
    if (text !== s) console.log("translated from " + s);
    // if( tgMessageEmptyQ()) await tgMessageInput(text+' //translated')
    return text;
}
// async function titleLooper(){
//     const titleGet = ()=>document.querySelector('.selected h3').innerHTML
//     const titleUpdate = (t)=>t&&
//     while (1) {await titleUpdate(changed(titleGet())); await delay1s()}
// }

async function heard(lang) {
    globalThis.SpeechRecognition =
        globalThis.SpeechRecognition ||
        globalThis.webkitSpeechRecognition ||
        globalThis.mozillaSpeechRecognition;
    console.log("listening");
    const result = await new Promise(async (resolve, reject) => {
        const r = new globalThis.SpeechRecognition();
        r.lang = lang || (await userLangGet());
        r.onresult = (e) => resolve(e?.results?.[0]?.[0]?.transcript || "");
        r.onerror = () => setTimeout(() => resolve(""), 64);
        r.addEventListener("audiostart", () => {
            console.log("Audio capturing started");
        });
        r.start();
    });
    console.log("heard", result);
    // if (tgMessageEmptyQ()) await tgMessageInput(result + " //heard");
    return result;
}

async function messageSendingConfirmed(s = "") {
    const r = s.match(/^(话说|話說|你看|呼叫|CQ |もし)(?:\1)(?<msg>.*)$/i)
        ?.groups?.msg;
    if (!r) return;
    await speak("发送 " + r);
    return r;
}

async function speak(s) {
    if (!s) return; // console.error('say empty msg')

    console.log("saying " + s);
    await waitFor(voicesAvailiable);

    const utter = new SpeechSynthesisUtterance(s);
    utter.voice = await userVoiceGet();
    utter.rate = Math.min(Math.max(1, s.length / 60), 4);
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

async function speak2nd(s) {
    if (!s) return; // console.error('say empty msg')
    if (speechSynthesis.speaking) return; // low priority
    console.log("saying " + s);
    await waitFor(voicesAvailiable);

    const utter = new SpeechSynthesisUtterance(s);
    utter.voice = await userVoiceGet2nd();
    utter.rate = Math.min(Math.max(1, s.length / 60), 4);
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

function voicesAvailiable() {
    return globalThis.speechSynthesis.getVoices().length !== 0;
}
function latestMessage() {
    return [...document.querySelectorAll(".Message .text-content")]
        .map((e) => e.textContent)
        .reverse()[0];
}
function latestPartnerMessage() {
    return [...document.querySelectorAll(".Message:not(.own) .text-content")]
        .map((e) => e.textContent)
        .reverse()[0];
}
function latestMyMessage() {
    return [...document.querySelectorAll(".Message.own .text-content")]
        .map((e) => e.textContent)
        .reverse()[0];
}

function edgeFilter(init) {
    return (e) => (e !== init ? (init = e) : undefined);
}

async function tgSend(s) {
    if (!s) return;
    await tgMessageInput(s);
    await new Promise((r) => setTimeout(r, 1e3));
    document.querySelector("#editable-message-text").dispatchEvent(
        new KeyboardEvent("keydown", {
            bubbles: true,
            cancellable: true,
            composed: true,
            key: "Enter",
            code: "Enter",
        })
    );
}

function tgMessageEmptyQ() {
    const content = document.querySelector("#editable-message-text").innerHTML;
    return (
        content === "" ||
        content.endsWith(" //heard") ||
        content.endsWith(" //translated")
    );
}

async function tgMessageInput(s='') {
    document.querySelector("#editable-message-text").innerHTML = s;
    await new Promise((r) => setTimeout(r, 1e3));
    document.querySelector("#editable-message-text").dispatchEvent(
        new InputEvent("input", {
            bubbles: true,
            cancellable: false,
            inputType: "insertText",
            composed: true,
        })
    );
}

async function waitFor(cond) {
    while (!cond()) await delay1s();
}

async function delay1s() {
    await new Promise((r) => setTimeout(r, 1e3));
}
async function delay100ms() {
    await new Promise((r) => setTimeout(r, 1e2));
}

async function userLangGet() {
    return (await userVoiceGet()).lang;
}

async function userVoiceGet() {
    return (await voicesForUserLang())[0];
}

async function userVoiceGet2nd() {
    const ls = await voicesForUserLang();
    return ls[1] || ls[0];
}
async function voicesForUserLang() {
    await waitFor(voicesAvailiable);
    return navigator.languages
        .map((nlang) =>
            globalThis.speechSynthesis
                .getVoices()
                .filter(({ lang }) => lang.startsWith(nlang))
                .reverse()
        )
        .flat();
    // return globalThis.speechSynthesis.getVoices().filter(({ lang }) => navigator.languages.find(nlang => lang.startsWith(nlang))).reverse();
}
