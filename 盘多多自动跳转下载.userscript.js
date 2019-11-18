// ==UserScript==
// @name         盘多多自动跳转下载
// @namespace    snomiao@gmail.com
// @version      0.1
// @description  rt
// @run-at       document-start
// @author       snomiao
// @match        http://www.panduoduo.net/r/*
// @match        https://www.panduoduo.net/r/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var href = location.href.replace(/(https?):\/\/www.panduoduo.net\/r\/(\d+)/,"$1://pdd.19mi.net/go/$2");
    if( href != location.href ) {
        location.href = href;
    }
})();
