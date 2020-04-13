// ==UserScript==
// @name         观察网自动跳转全文
// @namespace    https://userscript.snomiao.com/
// @version      0.1
// @description  rt
// @author       snomiao@gmail.com
// @match        *://www.guancha.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(location.pathname.match(/(.*?\/\d+_\d+_\d+_\d+)(_\d)?(\.shtml)/)){
       location.pathname = location.pathname.replace(/(.*?\/\d+_\d+_\d+_\d+)(_\d)?(\.shtml)/, "$1_s$3")
    }
    window.addEventListener('load', ()=>{
        [...document.querySelectorAll('a')].forEach(e=>{
            e.href = e.href.replace(/(.*?\/\d+_\d+_\d+_\d+)(_\d)?(\.shtml)/, "$1_s$3")
        });
    }, false)
})();