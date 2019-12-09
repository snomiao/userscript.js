// ==UserScript==
// @name         雪阅模式|SNOREAD
// @namespace    https://userscript.snomiao.com/
// @version      0.10(20191119)
// @description  【自用，目前还有很多BUG】豪华广角宽屏视角 / 横向滚动阅读模式 / 翻页模式 / 充分利用屏幕空间，有建议或想法请联系 QQ 997596439 或 邮箱 snomiao@gmail.com
// @author       snomiao@gmail.com
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // var 窗口高 = window.innerHeight; // Math.min(window.innerHeight, window.outerHeight);
    // var 窗口高 = // window.innerHeight; // Math.min(window.innerHeight, window.outerHeight);
    // document.body.clientWidth; //window.innerWidth; // Math.min(window.innerWidth, window.outerWidth);
    var 取窗口高 = () => document.body.parentElement.clientHeight;
    var 取窗口宽 = () => document.body.parentElement.clientWidth;

    var 更新样式 = () => {
        var 窗口高 = 取窗口高(), 窗口宽 = 取窗口宽()
        var 样式盒 = document.querySelector("div.snomiao-article-style")
        if (!样式盒) {
            样式盒 = document.createElement("div");
            样式盒.classList.add("snomiao-article-style");
            样式盒.style.display = "none";
            document.body.appendChild(样式盒)
        }
        // 规避 iframe 的 innerHeight 超长问题

        样式盒.innerHTML = `
<style>

div#main-wrapper:after, .clearfix:after {
    display:block; 
    content:"clear"; 
    clear:both; 
    line-height:0;
    visibility:hidden;
}

.snomiao-article::-webkit-scrollbar { width: 0 !important }
.snomiao-article{ -ms-overflow-style: none; }
.snomiao-article{ overflow: -moz-scrollbars-none; }

.snomiao-article{
    position: relative  !important;
    top: 0;
    box-sizing: content-box !important;
    height: ${窗口高}px !important;
    width: 35rem !important;

    display: flex   !important;
    flex-flow: column   !important;
    flex-wrap: wrap   !important;
    align-content: flex-start   !important;

    overflow-x: auto   !important;
    overflow-y: hidden   !important;

    z-index:99999   !important;

    box-shadow: 0 0 1rem black inset   !important;
    background: rgba(255,255,255,0.3)   !important;
    color: black   !important;

    text-align: justify   !important;
    text-indent: 0   !important;
    padding: 10% calc(${窗口宽}px - 35rem) 10% 0rem   !important;
}
.snomiao-article>*{
    margin: 0 -1rem 0 0             !important;
    padding: 0 2rem 1rem 0          !important;
    min-width: 32rem            !important;
    width: min-content          !important;
    max-height: 100%            !important;
    height:auto                 !important;
    overflow-x: auto            !important;
    overflow-y: auto            !important;
    background: rgba(255,255,255,0.3) !important;
}
</style>`;
    }

    var 监听点击 = 元素 => {
        if (元素.flag_handleClickToggleSnoReadMode) return;
        // click to update this article and scroll to it
        元素.addEventListener("click", function (事件) {
            元素.scrollIntoViewIfNeeded()
            元素.classList.contains("snomiao-article")
                && 进入雪阅模式(元素)
        }, false);
        // dblclick to turn back
        元素.addEventListener("dblclick", function (事件) {
            // console.log(元素, 元素.classList.contains("snomiao-article"))
            元素.classList.contains("snomiao-article")
                && (退出雪阅模式(元素) || true)
                || 进入雪阅模式(元素)
            // 元素.scrollLeft += 元素.clientWidth + 100
            事件.preventDefault();
        }, true);
        元素.flag_handleClickToggleSnoReadMode = 1
    }

    var 切换雪阅模式 = (元素) => 元素.classList.contains("snomiao-article") && (退出雪阅模式(元素), true) || 进入雪阅模式(元素)
    var 更新雪阅模式 = (元素) => 元素.classList.contains("snomiao-article") != 元素.flag_雪阅模式 && 切换雪阅模式(元素)
    var 进入雪阅模式 = (元素) => {
        退出雪阅模式(元素)
        window.snomiao_article = 元素
        监听点击(元素)
        var { left, top } = 元素.getBoundingClientRect()
        元素.classList.add("snomiao-article")
        元素.setAttribute("style", `left: calc(${-left}px)`);
        修复元素可见性(元素)
        更新样式()
        元素.flag_雪阅模式 = true
    }
    var 退出雪阅模式 = 元素 => {
        元素.setAttribute("style", ``);
        元素.classList.remove("snomiao-article")
        元素.flag_雪阅模式 = false
    }
    var 退出雪阅模式_临时 = 元素 => {
        元素.setAttribute("style", ``);
        元素.classList.remove("snomiao-article")
    }
    // 进入雪阅模式(window.article)
    var 恢复所有文章样式 = () => [...document.querySelectorAll(".snomiao-article")].map(退出雪阅模式_临时)

    // 解决span取到offsetHeight为0的问题
    var 取元素投影高 = (元素) => 元素.offsetHeight || 元素.getBoundingClientRect().height
    var 取元素投影宽 = (元素) => 元素.offsetWidth || 元素.getBoundingClientRect().width
    var 取元素投影顶 = (元素) => 元素.offsetTop || 元素.getBoundingClientRect().top
    var 取元素面积 = (元素) => 取元素投影高(元素) * 取元素投影宽(元素)
    var 取最大值序 = (列) => 列.indexOf(Math.max(...列))
    var 压平 = 列 => 列.flat()
    var 排序按 = 函数 => 列 => 列.sort((a, b) => 函数(a) - 函数(b))
    var 取距离按 = 函数 => (a, b) => 函数(a) - 函数(b)
    var 翻转矩阵 = 矩阵 => 矩阵[0].map((列, 列号) => 矩阵.map(行 => 行[列号]));
    var 取相邻对 = 列 => 翻转矩阵([列.slice(1), 列.slice(0, -1)])
    var 取相邻关系按 = 关系 => 列 => 取相邻对(列).map(对 => 关系(...对))
    var 文章树取元素 = (文章树) => [文章树.元素, ...(文章树.子树列 && 文章树.子树列.map(文章树取元素) || [])]
    var 检测重叠冲突 = (文章树) => {
        var 窗口高 = 取窗口高(), 窗口宽 = 取窗口宽()
        var 元素列 = 文章树取元素(文章树).flat(Infinity)
        var 文章列 = 元素列.filter(e => e.flag_是文章)
        var 文章列 = 排序按(取元素投影顶)(文章列)
        // console.log(文章列)
        var 相邻对列 = 取相邻对(文章列)
        var 相邻对列 = 相邻对列.map(对 => (对.距离 = 取距离按(取元素投影顶)(...对), 对))
        var 异常对列 = 相邻对列.filter(对 => 对.距离 < 窗口高)
        var 冲突弱势元素表 = 异常对列.map(异常对 => 排序按(取元素面积)(异常对)[0])
        冲突弱势元素表.forEach(元素 => 元素.flag_冲突弱势元素 = true)
    }
    var 修复元素可见性 = (元素) => {
        元素.parentElement && 修复元素可见性(元素.parentElement)
        if (元素.flag_修复元素可见性) return;
        元素.flag_修复元素可见性 = true

        // 父元素 overflow: visible
        if (window.getComputedStyle(元素).getPropertyValue('overflow') == "hidden") {
            元素.style.overflow = "visible"
        }
    }
    var 取文章树 = (元素, 层数 = 0) => {
        var 窗口高 = 取窗口高(), 窗口宽 = 取窗口宽()
        var 元素外高 = 取元素投影高(元素);
        var 子元素 = [...元素.children]

        var 子元素高于屏 = 子元素.filter(e => 取元素投影高(e) > 窗口高)
        var 主要的子元素 = 子元素高于屏.filter(e => 取元素投影高(e) / 元素外高 > 0.5)

        var 是文章 = !主要的子元素.length

        // debug start
        子元素.forEach(e => {
            e.高度占比 = 取元素投影高(e) / 元素外高
            元素.setAttribute("高度占比", e.高度占比)
            元素.setAttribute("高于窗口", 取元素投影高(e) > 窗口高)
        })
        // var 子元素叠高 = 子元素.map(e => e.offsetHeight).concat([0]).reduce((a, b) => a + b)
        元素.setAttribute("是文章", 是文章)
        元素.setAttribute("占比", 占比)
        // debug end


        var 子树列 = 子元素高于屏.map(e => 取文章树(e, 层数 + 1))
        var 占比 = 取元素投影高(元素) / 取元素投影高(元素.parentElement)
        元素.flag_是文章 = 是文章
        // 是文章 && console.log(元素, "是文章");
        return { 元素, 是文章, 占比, 子树列 }
    }
    var 输出文章树 = (树) => {
        return [树.元素, 树.是文章, 树.占比, ...(树.子树列 && 树.子树列.map(输出文章树) || [])]
    }
    var 转换文章树 = ({ 元素, 是文章, 子树列 }) => {
        子树列.map(转换文章树);

        if (元素 == document.body) return;

        if (!元素.flag_是文章) return;
        if (元素.flag_冲突弱势元素) return;
        if (!元素.flag_进入过雪阅模式) {
            元素.flag_进入过雪阅模式 = true
            元素.flag_雪阅模式 = true
        }
        console.log(元素, "进入雪阅模式");
        更新雪阅模式(元素)
        // 进入雪阅模式(元素)
    }
    var 入口 = () => {
        console.log("LAUNCH：SNOREAD");
        恢复所有文章样式()
        var 文章树 = 取文章树(document.body)
        window.调试文章树1 = 文章树
        window.调试文章树2 = 输出文章树(文章树)
        检测重叠冲突(文章树)
        转换文章树(文章树)
    }
    // setInterval(入口, 3000)
    document.addEventListener("load", 入口)
    window.addEventListener("load", 入口)
    window.addEventListener("resize", 入口)
    入口()
})();

(function () {
    'use strict';
    var 监听滚动 = e => {
        [...e.children].map(监听滚动)
        if (e.flag_已监听滚动) return;
        e.flag_已监听滚动 = 1;

        var handleScroll = (事件) => {
            if (事件.altKey || 事件.ctrlKey || 事件.shiftKey) return;
            var scrollRate = (事件.detail || -事件.wheelDelta) / 120 * 0.5
            var scrolled_x = (e.scrollLeft != (e.scrollLeft += scrollRate * e.clientWidth, e.scrollLeft))
            if (scrolled_x) {
                e.scrollIntoViewIfNeeded()
                事件.preventDefault();
                事件.stopPropagation();
                return false;
            }
            var scrolled_y = (e.scrollTop != (e.scrollTop += scrollRate * e.clientHeight, e.scrollTop))
            if (scrolled_y) {
                e.scrollIntoViewIfNeeded()
                事件.preventDefault();
                事件.stopPropagation();
                return false;
            }
            // 横竖都滚到底了
            [...e.children].map(监听滚动)
        }
        e.addEventListener("mousewheel", handleScroll, { capture: false, passive: false })     // Chrome/Edge
        e.addEventListener("DOMMouseScroll", handleScroll, { capture: false, passive: false }) // FF
    }
    var 入口 = () => 监听滚动(document.body)
    document.addEventListener("load", 入口)
    window.addEventListener("load", 入口)
    入口()

})();