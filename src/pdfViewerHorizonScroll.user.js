// ==UserScript==
// @name         pdf.js 自动切换横向滚动
// @namespace    https://userscript.snomiao.com/
// @version      0.3
// @description  自用, 功能rt，使用页面 https://mozilla.github.io/pdf.js/web/viewer.html
// @author       snomiao@gmail.com
// @match        https://mozilla.github.io/pdf.js/web/viewer.html
// @grant        none
// ==/UserScript==

(async () => {
  "use strict";

  var 睡 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  var 异步选择元素 = async (sel, p = document) => {
    let e;
    while (!(e = p.querySelector(sel))) await 睡(1);
    return e;
  };
  var 更改值 = (元素, 值) => (
    (元素.value = 值), 元素.dispatchEvent(new Event("change"))
  );
  document.addEventListener("resize", async () => {
    (await 异步选择元素("#scrollHorizontal")).click();
    更改值(await 异步选择元素("#scaleSelect"), "page-fit");
  });
})();
