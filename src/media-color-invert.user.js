// ==UserScript==
// @name             [SNOLAB] media-color-invert with alt+i
// @namespace        https://userscript.snomiao.com/
// @version          1.1.0
// @description      Invert color by alt+i
// @author           snomiao@gmail.com
// @match            *://*/*
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript/issues
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// ==/UserScript==

const state = {
  invert: (await globalThis.GM?.getValue("media-color-invert")) ?? true,
};

const observer = new MutationObserver(function (mutations) {
  scan();
});
window.addEventListener(
  "keydown",
  (e) =>
    e.altKey &&
    !e.metaKey &&
    !e.shiftKey &&
    !e.ctrlKey &&
    e.code === "KeyI" &&
    toggle()
);
scan();

async function toggle() {
  state.invert = !state.invert;
  scan();
  await globalThis.GM?.setValue("media-color-invert", state.invert);
}
function scan() {
  [...document.querySelectorAll("video,img")].map(
    (e) => (e.style.filter = state.invert ? "invert(1) hue-rotate(0)" : "")
  );
}
