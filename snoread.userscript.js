// ==UserScript==
// @name         雪阅模式|SNOREAD
// @namespace    https://userscript.snomiao.com/
// @version      0.9(20191119)
// @description  【自用，目前还有很多BUG】豪华广角宽屏视角 / 横向滚动阅读模式 / 翻页模式 / 充分利用屏幕空间，有建议或想法请联系 QQ 997596439 或 邮箱 snomiao@gmail.com
// @author       snomiao@gmail.com
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var 更新样式 = () => {
        var 样式盒 = document.querySelector("div.snomiao-article-style")
        if (!样式盒) {
            样式盒 = document.createElement("div");
            样式盒.classList.add("snomiao-article-style");
            样式盒.style.display = "none";
            document.body.appendChild(样式盒)
        }
        var 窗口高 = window.innerHeight;
        var 窗口宽 = window.innerWidth;
        样式盒.innerHTML = `
<style>
.snomiao-article::-webkit-scrollbar { width: 0 !important }
.snomiao-article{ -ms-overflow-style: none; }
.snomiao-article{ overflow: -moz-scrollbars-none; }

.snomiao-article{
    position: relative;
    top: 0;
    max-height: ${窗口高 * 0.9}px;
    box-sizing: border-box;
    width: calc(${窗口宽}px - 3em) !important;

    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    align-content: flex-start;

    overflow-x: auto;
    overflow-y: hidden;

    z-index:1;
    
    box-shadow: 0 0 0.1rem black inset;
    background: rgba(255,255,255,0.5);
    color: black;

    text-align: justify;
    text-indent: 0;
    padding: 1em;
}
.snomiao-article>*{
    margin: 0 -1em 0 0;
    padding: 0 2em 1em 0;
    /* max-width: 70em; */
    min-width: 32rem;
    width: min-content;
    max-height: ${窗口高 * 0.9}px;
    height:auto;
    overflow-x: auto;
    overflow-y: auto;
    background: rgba(255,255,255,0.5);
}
</style>`;
    }

    var 监听滚动 = e => {
        [...e.children].map(监听滚动)
        if (e.flag_listenScroll) return;
        e.flag_listenScroll = 1;

        var handleScroll = (event) => {
            var scrollRate = (event.detail || -event.wheelDelta) / 120 * 0.5
            var scrolled_x = (e.scrollLeft != (e.scrollLeft += scrollRate * e.clientWidth, e.scrollLeft))
            if (scrolled_x) {
                e.scrollIntoViewIfNeeded()
                // ref: http://zhanglun.xyz/2014/05/28/%E8%AF%91-%E5%8F%96%E6%B6%88%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E7%9A%84%E5%8D%B1%E5%AE%B3/
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            var scrolled_y = (e.scrollTop != (e.scrollTop += scrollRate * e.clientHeight, e.scrollTop))
            if (scrolled_y) {
                e.scrollIntoViewIfNeeded()
                // ref: http://zhanglun.xyz/2014/05/28/%E8%AF%91-%E5%8F%96%E6%B6%88%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E7%9A%84%E5%8D%B1%E5%AE%B3/
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            [...e.children].map(监听滚动)
        }
        e.addEventListener("mousewheel", handleScroll, { capture: false, passive: false })     // Chrome/Edge
        e.addEventListener("DOMMouseScroll", handleScroll, { capture: false, passive: false }) // FF
    }
    var 恢复文章 = e => {
        e.setAttribute("style", ``);
        // [...e.children].map(e => e.setAttribute("style", ``))
        e.classList.remove("snomiao-article")
    }
    var 监听点击 = e => {
        if (e.flag_handleClickToggleSnoReadMode) return;
        // click to update this article and scroll to it
        e.addEventListener("click", function (event) {
            监听滚动(e);
            e.scrollIntoViewIfNeeded()
            e.classList.contains("snomiao-article")
                && 进入雪阅模式(e)
        }, false);
        // dblclick to turn back
        e.addEventListener("dblclick", function (event) {
            // console.log(e, e.classList.contains("snomiao-article"))
            e.classList.contains("snomiao-article")
                && (恢复文章(e) || true)
                || 进入雪阅模式(e)
            // e.scrollLeft += e.clientWidth + 100
            event.preventDefault();
        }, true);
        e.flag_handleClickToggleSnoReadMode = 1
    }

    var 进入雪阅模式 = (e) => {
        恢复文章(e)
        window.snomiao_article = e
        监听滚动(e)
        监听点击(e)
        var { left, top } = e.getBoundingClientRect()
        e.classList.add("snomiao-article")
        e.setAttribute("style", `left: calc(1em + ${-left}px)`);
        更新样式()
    }
    // 进入雪阅模式(window.article)

    // 
    var 恢复所有文章 = () => [...document.querySelectorAll(".snomiao-article")].map(恢复文章)
    var 取文章树 = (元素, level = 0) => {
        var 窗口高 = window.innerHeight;
        var 元素高 = 元素.offsetHeight;
        var 子元素 = [...元素.children]
        var 主要的子元素 = (
            子元素
            // 高于屏幕
            .filter(e => e && e.offsetHeight && e.offsetHeight > 窗口高)
            // 且占比超过 50%
            .filter(e => e.offsetHeight / 元素高 > 0.5)
            // 且质量中心在 屏幕中心的 50% 内
            .filter(e => e.offsetLeft + e.offsetWidth /2 > 0.5)
            )
        var 子元素叠高 = 子元素.map(e=>e.offsetHeight).concat([0]).reduce((a,b)=>a+b)
        var 是文章 = !主要的子元素.length && 子元素叠高 / 窗口高 >  1
        var 子树 = 主要的子元素.map(e => 取文章树(e, level + 1))
        var 占比 = 元素.offsetHeight / 元素.parentElement.offsetHeight
        return { e: 元素, 是文章, 占比, 子树 }
    }
    var 转换文章 = ({ e, 是文章, 子树 }) => {
        子树.map(转换文章);
        if (e == document.body) return;
        是文章 && console.log(e, "是文章");
        是文章 && !(e.flag_进入过雪阅模式) && 进入雪阅模式(e) && (e.flag_进入过雪阅模式 = true);
    }
    var main = () => {
        console.log("LAUNCH：SNOREAD");
        恢复所有文章()
        var articleTree = 取文章树(document.body)
        window.debugArticleTree = articleTree
        
        转换文章(articleTree)
    }
    // setInterval(main, 3000)
    document.addEventListener("load", main)
    window.addEventListener("load", main)
    window.addEventListener("resize", main)
    main()

})();
