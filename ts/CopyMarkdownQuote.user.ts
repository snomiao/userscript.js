// ==UserScript==
// @name            Copy Markdown Quote Alt+C
// @name:zh         Alt+C 复制Markdown格式标题和地址快速分享
// @name:en         Alt+C Copy Title and Link as Markdown Style
// @description     Press Alt+C to copy title and url as markdown style link `> ${SELECTION} [${TITLE}]( ${URL} )`
// @description:zh  按 Alt+C 复制 Markdown 格式的链接 `> ${SELECTION} [${TITLE}]( ${URL} )`
// @namespace       https://userscript.snomiao.com/
// @version         0.8.4
// @author          snomiao@gmail.com
// @match           *://*/*
// @grant           none
// ==/UserScript==

import hotkeyMapper from "hotkey-mapper";
import clipboardy from "clipboardy";

{
  main();
}
function main() {
  globalThis.cmqa ||= {};
  globalThis.cmqa.unload?.();
  globalThis.cmqa.unload = hotkeyMapper({
    "alt+c": async (e) => {
      e.preventDefault?.()
      e.stopPropagation?.()
      const selected = window?.getSelection()?.toString().trim() || "";
      const quoted = selected && selected.replace(/.*/g, (s) => `> ${s}`);
      const href = location.href;
      const content = `- [${longestTitleGet()?.replace(
        /([|])/,
        (e) => "\\" + e
      )}]( ${href} )\n${quoted}`.trim();
      await clipboardy.write(content);
      alert(`copied: \n${content}`);
    },
  });
}

function longestTitleGet() {
  const LongestTitle = [
    document.title,
    document.querySelector("h1")?.innerText || "",
  ]
    .map((str) => str.replace(/\r?\n.*/g, ""))
    .sort((a, b) => a.length - b.length)
    .pop();
  return LongestTitle;
}
