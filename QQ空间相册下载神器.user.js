// ==UserScript==
// @name         QQ空间相册下载神器
// @namespace    https://userscript.snomiao.com/
// @version      0.2(20200501)
// @description  批量下载小姐姐空间高清大图照片佳选插件～自动命名快速汲取dalao灵感～
// @author       snomiao@gmail.com
// @match        *://user.qzone.qq.com/*
// @match        *://*.photo.store.qq.com/*
// @match        *://*.qpic.cn/*
// @grant        none
// ==/UserScript==
// 更新：(20200501)改进下载逻辑，不再弹出窗口
//
; (() => {
    var 下载 = (url, filename = '') => {
        var a = document.createElement('a');
        a.style.display = 'none';
        a.href = url
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove()
    }
    var 响应被下载 = (() => {
        var m = decodeURI(location.hash).match(/(?<=#下载-).*/)
        if (!m) return null;
        var filename = m[0]
        下载(location.href, filename)
        parent.postMessage("下载完成-" + location.href, 'https://user.qzone.qq.com')
        window.close();
    })
    var 新元素 = (innerHTML, attributes = {}) => {
        var e = document.createElement("div");
        e.innerHTML = innerHTML;
        return Object.assign(e.children[0], attributes)
    }
    var 智能下载 = (url, filename = '') => {
        var 当页域名 = location.hostname
        var 同源 = !!url.match(":/" + 当页域名 + "/")
        if (同源) return 下载(url, filename)
        // 否则使用iframe
        window.addEventListener("message", (e) => {
            var m = e.data && e.data.match(/(?<=下载完成-)(.*)/)
            if (!m) return;
            let url = m[0];
            // console.debug("删除iframe",e.origin, url);
            // e.origin ignore
            [...document.querySelectorAll("iframe")]
                .filter(e => e.src == url)
                .forEach(e => {
                    // console.debug("删除了iframe",e.src, e);
                    e.remove()
                });
        }, false);
        document.body.appendChild(新元素(
            '<iframe style="visibility: hidden"></iframe>',
            { src: url + '#下载-' + encodeURI(filename) }))
    }
    var 高清地址を取 = src => src
        .replace('http:', 'https:')
        .replace(/\/\/.*?\//, '//r.photo.store.qq.com/')
        .replace(/null&.*$/, '')
        .replace(/\/(?:m|b)(\/|$)/, '/r$1')
        .replace(/&(?:w|h)=\d+/, '')

    var 试取内容 = e => e && e.textContent.trim() || ''
    var 照片列表を取 = () => {
        var 相册名 = 试取内容(document.querySelector(".j-pl-albuminfo-title"));
        return [...document.querySelectorAll('.j-pl-photoitem,.j-box-img')]
            .map((e, i) => ({
                url: 高清地址を取(e.querySelector(".j-pl-photoitem-img,.j-img").src),
                filename: (
                    相册名 + '-' +
                    // (1 + i) + '-' +
                    试取内容(e.querySelector(".j-pl-photoitem-title,span[title]")) + "-" +
                    试取内容(e.querySelector(".j-pl-photoitem-desc,j-photo-desc"))
                ).replace(/\/|\?|\*|\:|\||\\|\<|\>|\r|\n/, "_").substr(0, 50) + ".jpg"
            }))
    }
    var 下载当页 = () => 照片列表を取().forEach(({ url, filename }) => 智能下载(url, filename))

    var 生成下载界面 = () => {
        // “更多”按钮前插入一个按钮
        var 下载按钮 = 新元素('<div></div>', {
            className: 'photo-op-item',
            innerHTML: '<a class="c-tx2 bg3 bor gb-btn-nor" href="javascript:void">下载当页</a>',
            title: "请滚动到底以确保当前页面所有照片都已加载",
            onclick: 下载当页,
        })
        var 更多按钮 = document.querySelector('.photo-op-item.j-pl-moreop')
        更多按钮 && 更多按钮.parentNode.insertBefore(下载按钮, 更多按钮)
    }

    // 被下载
    if (location.host.match(/.*\.photo\.store\.qq\.com/)
        || location.host.match(/.*\.qpic\.cn/))
        响应被下载()

    // 相册页面
    if (location.hostname == 'user.qzone.qq.com')
        window.addEventListener('load', 生成下载界面, false)
})()
