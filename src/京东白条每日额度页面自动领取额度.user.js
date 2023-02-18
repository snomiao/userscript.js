// ==UserScript==
// @name         京东白条每日额度页面自动领取额度
// @namespace    https://userscript.snomiao.com/
// @version      0.2
// @description  rt, 自用
// @author       snomiao@gmail.com
// @match        https://m.jr.jd.com/mjractivity/rn/rn_bt_raise/index.html*
// @grant        none
// ==/UserScript==

(async () => {
  "use strict";

  var 睡 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  var 直到 = async (fn) => {
    var ret;
    while (!(ret = await fn())) {
      await 睡(1);
    }
    return ret;
  };

  var 点击元素 = (el) => {
    ["mousedown", "click", "mouseup"].forEach((mouseEventType) =>
      el.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    );
  };

  if (
    location.href.startsWith(
      "https://m.jr.jd.com/mjractivity/rn/rn_bt_raise/index.html"
    )
  ) {
    var 取按钮 = async (按钮名称) =>
      (
        await 直到(
          () =>
            [...document.querySelectorAll("div>span")].filter(
              (e) => e.innerText == 按钮名称
            )[0]
        )
      ).parentElement;
    点击元素(await 取按钮("提升额度"));
    var re = Promise.race([
      (async () => (点击元素(await 取按钮("去领取")), "领取完成"))(),
      (async () => (await 取按钮("待领取"), 睡(500), "不可领取"))(),
      (async () => (await 睡(1000), "页面错误"))(),
    ]);
    console.log(re);
    if (location.href.endsWith("#auto-close")) {
      window.close();
    }
  }
})();
