// ==UserScript==
// @name            Copy Markdown Quote Alt+C
// @name:zh         Alt+C 复制Markdown格式标题和地址快速分享
// @name:en         Alt+C Copy Title and Link as Markdown Style
// @description     Press Alt+C to copy title and url as markdown style link `> ${SELECTION} [${TITLE}]( ${URL} )`
// @description:zh  按 Alt+C 复制 Markdown 格式的链接 `> ${SELECTION} [${TITLE}]( ${URL} )`
// @namespace       https://userscript.snomiao.com/
// @version         0.8.1
// @author          snomiao@gmail.com
// @match           *://*/*
// @grant           none
// ==/UserScript==

hotkeys({
  "alt+c": () => {
      const lines = window?.getSelection()?.toString().trim() || '';
      const selQuotes = lines && lines.split(/\r?\n/).map((line) => "> " + line).join("\n");
      textCopy(`${selQuotes}\t[${titleGet()}]( ${location.href} )`.trim());
  },
});

function titleGet() {
  const LongestTitle = [
      document.title,
      document.querySelector("h1")?.innerText || "",
  ]
      .map((str) => str.replace(/\r?\n.*/g, ""))
      .sort((a, b) => a.length - b.length)
      .pop();
  return LongestTitle;
}
function textCopy(content = "") {
  const input = document.createElement("textarea");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", content);
  input.innerHTML = content;
  input.setAttribute("style", "position: fixed; top:0; left:0;z-index: 9999");
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length);
  let ok = false;
  if (document.execCommand("copy")) {
      document.execCommand("copy");
      ok = true;
  }
  document.body.removeChild(input);
  ok && alert("Title Copied\n" + content);
  ok || alert("copy title failed, please check browser version");
  return ok || false;
}


function hotkeys(mapping) {
  Object.entries(mapping).map(([hotkey, handler]) =>
      window.addEventListener("keydown", hotkeyHandler(hotkey, handler))
  );
  function hotkeyHandler(hotkey, fn) {
      return (e) => {
          e[e.key + "Key"] = true;
          const falseKeys = "meta+alt+shift+ctrl";
          const conds = (falseKeys + "+" + hotkey)
              .replace(/win|command|search/, "meta")
              .replace(/control/, "ctrl")
              .split("+")
              .map((k, i) => [k, (i < 4) ^ e[k + "Key"]]);
          const covered = Object.entries(Object.fromEntries(conds));
          console.log(covered);
          const matched = covered.every(([keyName, pass]) => pass);
          if (!matched) return;
          e.stopPropagation();
          e.preventDefault();
          return fn();
      };
  }
}
