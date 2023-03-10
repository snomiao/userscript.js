// ==UserScript==
// @name             [SNOLAB] media-color-invert with alt+i
// @namespace        https://userscript.snomiao.com/
// @version          1.1.0
// @description      Revert color by alt+i
// @author           snomiao@gmail.com
// @match            *://*/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript/issues
// ==/UserScript==

window.addEventListener(
  "keydown",
  (e) =>
    e.altKey &&
    !e.metaKey &&
    !e.shiftKey &&
    !e.ctrlKey &&
    e.code === "KeyI" &&
    [...document.querySelectorAll("video,img")].map(
      (e) => (e.style.filter = "invert(1) hue-rotate(0)")
    )
);
