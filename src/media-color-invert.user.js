// ==UserScript==
// @name             [SNOLAB] Alt + i to invert color of Images / Videos Color
// @namespace        https://userscript.snomiao.com/
// @version          1.1.0
// @description      Invert page color by Alt+i, combo with Ctrl+Windows+C to invert the color of whole screen, you can enjoy the real night mode in windows.
// @author           snomiao@gmail.com
// @match            *://*/*
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript/issues
// @grant            GM.getValue
// @grant            GM.setValue
// @run-at           document-start
// ==/UserScript==
const getInvert = async () =>
  (await globalThis.GM?.getValue("media-color-invert")) ?? false;
const setInvert = async (i) => await globalThis.GM?.setValue("media-color-invert", i);
(async () => {
  const scan = async () => {
    const invert = await getInvert();
    const textNode = document.createTextNode("video,img,canvas{filter: invert(1)}\nsvg:not(:has(svg)){filter: hue-rotate(180)}")
    const style = document.createElement('style')
    style.appendChild(textNode)
    style.id = 'media-color-invert'
    const s = document.body.querySelector('&>#media-color-invert')

    if(s && !invert) s.remove()
    if(!s && invert) document.body.appendChild(style)
  };

  // watch
  const debouncedScan = debounce(scan, 8); // Adjust the delay (300ms) as needed
  scan();
  // new MutationObserver((mutationList, observer) => {
  //   mutationList.forEach((mutation) =>
  //     mutation.addedNodes.forEach((e) => scan(e))
  //   );
  // }).observe(document.body, { subtree: true, childList: true });
  window.addEventListener("focus", () => scan());

  // toggle
  window.addEventListener("keydown", (e) => altI(e) && toggle());
  async function toggle() {
    await setInvert(!(await getInvert()));
    await scan();
  }
})();

function altI(e) {
  return e.altKey && !e.metaKey && !e.shiftKey && !e.ctrlKey && e.key === "i";
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
