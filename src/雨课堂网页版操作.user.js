// ==UserScript==
// @name         雨课堂网页版操作
// @namespace    https://userscript.snomiao.com/
// @version      0.1
// @description  启用Enter发送弹幕
// @author       snomiao@gmail.com
// @match        https://www.yuketang.cn/lesson/fullscreen/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var main = () => {
        var [box, btn] = ['.send__input', '.send__btn'].map((e) =>
            document.querySelector(e)
        );
        if (!box || !btn) return;
        box.addEventListener(
            'keydown',
            (e) => e.code == 'Enter' && btn.click()
        );
        console.log('启用: Enter发送');
        document.removeEventListener('mouseup', main);
    };
    document.addEventListener('mouseup', main);
})();
