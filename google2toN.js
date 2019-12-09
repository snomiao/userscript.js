// ==UserScript==
// @name         一键批量打开谷歌必应搜索前2的n次方项搜索结果
// @namespace    snomiao@gmail.com
// @version      0.7
// @description  快速了解一个领域用，在谷歌或必应的搜索页面 按 Alt+1 ...2,3,4... Alt+5  将会打开前2的n次方项的搜索结果，并复制打开的链接。目前支持：谷歌、必应、知乎。
// @author       snomiao
// @match        https://www.google.com/search?*
// @match        https://www.google.com.*/search?*
// @match        https://*.bing.com/search?*
// @match        https://www.zhihu.com/search?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var 已打开过的链接 = {}
    var open = (url) => { if (!已打开过的链接[url]) { window.open(url) }; 已打开过的链接[url] = 1 };

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
            console.log(`长度为${content.length}的内容已复制`);
            //alert(`长度为${content.length}的内容已复制`);
        }
        document.body.removeChild(input);
    };
    var 获取没有打开过的链接 = 需要的链接条数 => {
        var lsa = ""
        if (location.toString().match(/^https\:\/\/www.google\.com(\.\w+)?\/search/)) {
            // 谷歌
            lsa = [...document.querySelectorAll("h3")].map(h3 => h3.parentElement)
        }
        if (location.toString().match(/^https:\/\/\w+\.bing\.com\/search/)) {
            // 必应
            lsa = [...document.querySelectorAll("h2")].map(h2 => h2.querySelector("a"))
        }
        if (location.toString().match(/^https:\/\/\w+\.zhihu\.com\/search/)) {
            // 知乎
            lsa = [...document.querySelectorAll("h2")].map(h2 => h2.querySelector("a"))
        }
        return lsa
            .filter(a => a && a.href && a.textContent)
            .map(a => ({ "title": a.textContent, "href": a.href }))
            .slice(0, 需要的链接条数)
            .reverse()
    };
    var 打开一定数量链接 = (数量) => {
        // 复制文字
        复制文本(获取没有打开过的链接(数量).map(link => "#" + link.title + '\n' + link.href).join('\n\n'));
        // 打开连接
        获取没有打开过的链接(数量).map(link => link.href).map(open)
    }
    window.addEventListener("keydown", (e) => {
        if (!e.ctrlKey && !e.shiftKey && e.altKey && e.key.match(/[1-9]/)) {
            var 打开数量 = Math.pow(2, parseInt(e.key))
            打开一定数量链接(打开数量)
        }
    })
    console.log("loading: 谷歌一键打开前N项搜索结果");
})();