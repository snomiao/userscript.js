// ==UserScript==
// @name             [SNOLAB] ai-input
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      Typing by ChatGPT, with voice supported
// @author           snomiao@gmail.com
// @match            *://*/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==

// deprecated as not accuracy

console.log("@testing-library/user-event");

import * as dom from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

async function speak(s) {

  if (!globalThis.speechSynthesis) throw new Error("missing speechSynthesis");
  // wait for voices
  while (speechSynthesis.getVoices().length === 0) {
    await new Promise((r) => setTimeout(r, 1e3));
  }
  const utter = new SpeechSynthesisUtterance(s);
  utter.voice = speechSynthesis
    .getVoices()
    .filter(({ lang }) => navigator.languages.includes(lang))
    .reverse()[0];
  utter.rate = Math.min(Math.max(1, s.length / 60), 4);
  if (speechSynthesis.speaking) speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}

fetch("chat.ai.gpt");

globalThis.dom = dom;
globalThis.userEvent = userEvent;
console.log("testing-library", { dom, userEvent });
