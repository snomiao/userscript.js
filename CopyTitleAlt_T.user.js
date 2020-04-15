// ==UserScript==
// @name         Copy Title Alt+T
// @namespace    https://userscript.snomiao.com/
// @version      0.3
// @description  Press Alt+T to copy title and url like this `[${TITLE}](${URL})`
// @author       snomiao@gmail.com
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var 复制文本 = (content) => {
        const input = document.createElement('textarea');
        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', content);
        input.innerHTML = (content);
        input.setAttribute('style', 'position: fixed; top:0; left:0;z-index: 9999');
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 9999);
        console.log('test')
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            var ok = true
        }
        document.body.removeChild(input);
        return ok || false
    };
    var 取标题 = () => {
        var 标题列 = [...document.querySelectorAll('h1')]
        return 标题列.length == 1 && 标题列[0].innerText.trim() || document.title || ''
    }
    window.addEventListener('keydown', (e) => {
        if (!(e.altKey && e.code == 'KeyT')) return;
        var 标题地址 = `[${取标题()}](${location.href})`
        复制文本(标题地址)
            ? alert(标题地址 + '\n copyied!')
            : alert('copy title failed, please check browser version')
    })
})();