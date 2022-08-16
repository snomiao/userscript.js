// ==UserScript==
// @name               Telegram Speaker
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.1.0
// @description        Speak latest telegram message With TTS technology just in your browser.
// @match              https://*.telegram.org/z/
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// ==/UserScript==

/*
# the legacy way needs you to install and run an saying pipe service in your computer, in which situation that you don't have latest browser with TTS technologies.

npm i -g piserve snosay
piserve | snosay --voice "Microsoft Huihui Desktop"

*/


async function say(s) {
    if (!s)
        return; // console.error('say empty msg')

    // new method to say
    console.log('saying ' + s);
    if (globalThis.speechSynthesis) {
        // wait for voices
        while (speechSynthesis.getVoices().length === 0) {
            await new Promise(r => setTimeout(r, 1e3));
        }
        const utter = new SpeechSynthesisUtterance(s);
        utter.voice = speechSynthesis.getVoices().filter(({ lang }) => navigator.languages.includes(lang)).reverse()[0],
            utter.rate = Math.min(Math.max(1, s.length / 60), 4);
        speechSynthesis.speak(utter);
    }
    else
        fetch('http://localhost:25971/?text=' + encodeURIComponent(s));
};
const lastMsg = ()=>[...document.querySelectorAll('.Message:not(.own) .text-content')].map(e=>e.textContent).reverse()[0]
const chagnedFilterMaker = (init)=>(e )=> e !== init? (init =e): undefined
const changedFilter = chagnedFilterMaker('')j j
const looper = ()=>(say(changedFilter(lastMsg())), 1)

(async function() {
    while(looper()) await new Promise(r=>setTimeout(r,1000))
})();
