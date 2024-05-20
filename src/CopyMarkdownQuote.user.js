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
"use strict";
(() => {
  // ../node_modules/hotkey-mapper/dist/index.mjs
  var { keys } = Object;
  function mapObject(fn, obj) {
    if (arguments.length === 1) {
      return (_obj) => mapObject(fn, _obj);
    }
    let index = 0;
    const objKeys = keys(obj);
    const len = objKeys.length;
    const willReturn = {};
    while (index < len) {
      const key = objKeys[index];
      willReturn[key] = fn(
        obj[key],
        key,
        obj
      );
      index++;
    }
    return willReturn;
  }
  var mapObjIndexed = mapObject;
  function hotkeyMapper(mapping, options) {
    const handler = (event) => {
      if (!event.key)
        throw new Error("Invalid KeyboardEvent");
      if (!event.code)
        throw new Error("Invalid KeyboardEvent");
      const key = event.key?.toLowerCase();
      const code = event.code?.toLowerCase();
      const simp = event.code?.replace(/^(?:Key|Digit|Numpad)/, "").toLowerCase();
      const map = new Proxy(event, {
        get: (target2, p) => Boolean(
          {
            [`${key}Key`]: true,
            [`${code}Key`]: true,
            [`${simp}Key`]: true
          }[p] ?? target2[p]
        )
      });
      const mods = "meta+alt+shift+ctrl";
      mapObjIndexed((fn, hotkey) => {
        const conds = `${mods}+${hotkey.toLowerCase()}`.replace(/win|command|search/, "meta").replace(/control/, "ctrl").split("+").map((key2) => key2.toLowerCase().trim()).map((k, i) => [k, i >= 4 === map[`${k}Key`]]);
        if (!Object.entries(Object.fromEntries(conds)).every(([, ok]) => ok))
          return;
        event.stopPropagation?.();
        event.preventDefault?.();
        return fn(event);
      }, mapping);
    };
    const target = options?.target ?? globalThis;
    target.addEventListener(options?.on ?? "keydown", handler, options);
    return function unload() {
      target.removeEventListener(options?.on ?? "keydown", handler, options);
    };
  }

  // ../node_modules/.pnpm/clipboardy@3.0.0/node_modules/clipboardy/browser.js
  var clipboard = {};
  clipboard.write = async (text) => {
    await navigator.clipboard.writeText(text);
  };
  clipboard.read = async () => navigator.clipboard.readText();
  clipboard.readSync = () => {
    throw new Error("`.readSync()` is not supported in browsers!");
  };
  clipboard.writeSync = () => {
    throw new Error("`.writeSync()` is not supported in browsers!");
  };
  var browser_default = clipboard;

  // ../ts/CopyMarkdownQuote.user.ts
  {
    main();
  }
  function main() {
    globalThis.cmqa ||= {};
    globalThis.cmqa.unload?.();
    globalThis.cmqa.unload = hotkeyMapper({
      "alt+c": async (e) => {
        e.preventDefault?.();
        e.stopPropagation?.();
        const selected = window?.getSelection()?.toString().trim() || "";
        const quoted = selected && selected.replace(/.*/g, (s) => `> ${s}`);
        const href = location.href;
        const content = `- [${longestTitleGet()?.replace(
          /([|])/,
          (e2) => "\\" + e2
        )}]( ${href} )
${quoted}`.trim();
        await browser_default.write(content);
        alert(`copied: 
${content}`);
      }
    });
  }
  function longestTitleGet() {
    const LongestTitle = [
      document.title,
      document.querySelector("h1")?.innerText || ""
    ].map((str) => str.replace(/\r?\n.*/g, "")).sort((a, b) => a.length - b.length).pop();
    return LongestTitle;
  }
})();
