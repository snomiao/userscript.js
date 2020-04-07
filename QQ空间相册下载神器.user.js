// ==UserScript==
// @name         QQ空间相册下载神器
// @namespace    snomiao@gmail.com
// @version      0.1
// @description  批量下载小姐姐空间高清大图照片佳选插件～自动命名快速汲取dalao灵感～
// @author       snomiao@gmail.com
// @match        *://user.qzone.qq.com/*
// @match        *://*.photo.store.qq.com/*
// @match        *://*.qpic.cn/*
// @grant        none
// ==/UserScript==

; (() => {
    
    // 只支持同源
    var 下载 = (url, filename = '') => {
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove()
    }
    // 被下载
    if (location.host.match(/.*\.photo\.store\.qq\.com/)
        || location.host.match(/.*\.qpic\.cn/)) {
        var m = decodeURI(location.hash).match(/(?<=#下载-).*/)
        if (m) {
            下载(location.href, m[0])
            window.close()
        }
    }

    var 下载指令 = (url, filename = '') => {
        window.open(url + '#下载-' + encodeURI(filename), "_BLANK")
    }

    var 取高清地址 = src => src
        .replace('http:', 'https:')
        .replace(/\/\/.*?\//, '//r.photo.store.qq.com/')
        .replace(/null&.*$/, '')
        .replace(/\/(?:m|b)(\/|$)/, '/r$1')
        .replace(/&(?:w|h)=\d+/, '')

    var 试取内容 = e => e && e.textContent.trim() || ''
    var 取照片列表 = () => {
        // var lastImg = [...document.querySelectorAll('.j-pl-photoitem-img')].pop()
        var 相册名 = 试取内容(document.querySelector(".j-pl-albuminfo-title"));
        return [...document.querySelectorAll('.j-pl-photoitem,.j-box-img')]
            .map((e, i) => ({
                url: 取高清地址(e.querySelector(".j-pl-photoitem-img,.j-img").src),
                filename: (
                    相册名 + '-' +
                    // (1 + i) + '-' +
                    试取内容(e.querySelector(".j-pl-photoitem-title,span[title]")) + "-" +
                    试取内容(e.querySelector(".j-pl-photoitem-desc,j-photo-desc"))
                ).replace(/\/|\?|\*|\:|\||\\|\<|\>|\r|\n/, "_").substr(0, 50) + ".jpg"
            }))
    }
    var 下载当页 = () => 取照片列表().forEach(({ url, filename }) => 下载指令(url, filename))

    var main = () => {
        // “更多”按钮前插入一个按钮
        var btnDownload = document.createElement('div')
        btnDownload.className = 'photo-op-item'
        btnDownload.innerHTML = '<a class="c-tx2 bg3 bor gb-btn-nor" href="javascript:void">下载当页</a>'
        btnDownload.title = "请滚动到底以确保当前页面所有照片都已加载"
        btnDownload.onclick = 下载当页
        var btnMore = document.querySelector('.photo-op-item.j-pl-moreop')
        btnMore.parentNode.insertBefore(btnDownload, btnMore)
    }
    window.addEventListener('load', main, false)
})()
