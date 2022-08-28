// ==UserScript==
// @name               [SNOLAB] I Heard Telegram Speaking
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.2.4
// @descriptiodn        [SNOLAB] Speak latest telegram message With TTS technology just in your browser.
// @match              https://*.telegram.org/z/
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// ==/UserScript==

main()

async function main() {
    if (!globalThis.speechSynthesis)
    return alert('unable to access speechSynthesis service, please update your browser')        
    // polyfill and error detect
    globalThis.SpeechRecognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition || globalThis.mozillaSpeechRecognition
    if(!globalThis.SpeechRecognition)
        return alert('unable to access speechSynthesis service, please update your browser');
    
    listeningLooper().then()
    speakingLooper().then();
}

async function listeningLooper() {
    while(1) await tgSend( await messageConfirmed(await heard('zh-CN')))
}

async function speakingLooper() {
    const changed = edgeFilter('')
    while (1) {await speak(changed(latestMessage())); await delay1s()}
}

async function heard(lang = 'en-US') {
    globalThis.SpeechRecognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition || globalThis.mozillaSpeechRecognition;
    const result = await new Promise((resolve, reject) => {
        const sr = new globalThis.SpeechRecognition();
        sr.continuous = true;
        sr.lang = lang;
        sr.onresult = e => {
            const result = e?.results?.[0]?.[0]?.transcript || '';
            resolve(result);
        };
        sr.onerror = () => resolve('')
        sr.start();
    });
    console.log("heard", result);
    await new Promise(r => setTimeout(r, 1e3));
    return result;
}
async function messageConfirmed(s = ''){
    const r = (s.match(/^(?:那就是說|话说|話說|说起来|說起來|你看|呼叫呼叫|CQ CQ)(?<msg>.*)$/i)?.groups?.msg)
    if(!r) return;
    await speak('发送 ' + r)
    return r
}


async function speak(s) { 
    if (!s) return; // console.error('say empty msg')
    
    console.log('saying ' + s);
    await waitFor(voicesAvailiable);    

    const utter = new SpeechSynthesisUtterance(s);
    utter.voice = speechSynthesis.getVoices().filter(({ lang }) => navigator.languages.includes(lang)).reverse()[0];
    utter.rate = Math.min(Math.max(1, s.length / 60), 4);
    if(speechSynthesis.speaking) speechSynthesis.cancel()
    speechSynthesis.speak(utter);
};

function voicesAvailiable() {
    return globalThis.speechSynthesis.getVoices().length !== 0;
}
function latestMessage() {
    return [...document.querySelectorAll('.Message:not(.own) .text-content')].map(e => e.textContent).reverse()[0];
}

function edgeFilter(init) {
    return (e) => e !== init ? (init = e) : undefined;
}

async function tgSend(s) {
    if(!s) return;
    document.querySelector('#editable-message-text').innerHTML = s;
    await new Promise(r => setTimeout(r, 1e3));
    document.querySelector('#editable-message-text').dispatchEvent(new InputEvent('input', { bubbles: true, cancellable: false, inputType: 'insertText', composed: true }));
    await new Promise(r => setTimeout(r, 1e3));
    document.querySelector('#editable-message-text').dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancellable: true, composed: true, key: "Enter", code: "Enter" }));
}

async function waitFor(cond) {
    while (!(cond()))
        await delay1s();
}

async function delay1s() {
    await new Promise(r => setTimeout(r, 1e3));
}

async function getUserLang() {
    await waitFor(voicesAvailiable)
    return globalThis.speechSynthesis.getVoices().filter(({ lang }) => navigator.languages.includes(lang)).reverse()[0].lang;
}