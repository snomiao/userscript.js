// ==UserScript==
// @name         微信网页版全屏
// @namespace    https://userscript.snomiao.com/
// @version      0.2
// @description  (20200407)让网页版微信在网页内全屏，消除下载PC客户端按钮，原生js实现，不引入jQuery
// @author       snomiao@gmail.com
// @match        https://wx.qq.com/*
// @run-at       document-body
// @icon         https://res.wx.qq.com/zh_CN/htmledition/v2/images/favicon31e225.ico
// ==/UserScript==

(() => {
    var ele = document.createElement('style');
    ele.innerHTML = `
    div.main{height: 100%; padding-top: 0}
    div.main_inner{max-width: 100% !important}
    .download_entry{display:none}
    .nav_view{top: 154px;}
    `;
    document.head.appendChild(ele);
})();
