// ==UserScript==
// @name         雪阅模式|SNOREAD
// @namespace    https://userscript.snomiao.com/
// @version      0.20(20200412)
// @description  你还在浪费你的宽屏吗？雪星邀你体验21世纪新型二维排版！快速提升思想的维度 / 刷知乎神器 / 豪华广角宽屏视角 / 横向滚动阅读模式 / 翻页模式 / 充分利用屏幕空间 / 快阅速读插件 | 使用说明：按 Escape 退出雪阅模式 | 【欢迎加QQ群提交流 1043957595 】
// @author       snomiao@gmail.com
// @match        http://*/*
// @match        https://*/*
// @exclude      https://*.taobao.com/*
// @exclude      https://*.1688.com/*
// @exclude      https://*.tmall.com/*
// @grant        none
// ==/UserScript==

// @exclude      https://*.jd.com/*
// 测试页面
/*
https://www.zhihu.com/hot
https://www.zhihu.com/question/35829677
https://www.jd.com/
*/
// 尝试清除挡物
// javascript:[...document.querySelectorAll("*")].filter(e=>e).filter(e=>window.getComputedStyle(e).getPropertyValue("z-index")>1).

(function () {
    'use strict';
    'esversion: 6';
    var 用户意向_雪阅模式 = true;

    var 新元素 = (innerHTML, attributes = {}) => {
        var e = document.createElement("div");
        e.innerHTML = innerHTML;
        return Object.assign(e.children[0], attributes)
    }
    var 睡 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    var 异步防抖函数 = (异步函数, 间隔时间 = 1000) => {
        var 上次执行时间 = null
        return async (...参列) => {
            if (上次执行时间 != null && 上次执行时间 + 间隔时间 >= +new Date())
                return null
            上次执行时间 = +new Date()
            return await 异步函数(参列)
        }
    }

    // var 窗口高 = window.innerHeight; // Math.min(window.innerHeight, window.outerHeight);
    // var 窗口高 = // window.innerHeight; // Math.min(window.innerHeight, window.outerHeight);
    // document.body.clientWidth; //window.innerWidth; // Math.min(window.innerWidth, window.outerWidth);
    var 取窗口高 = () => document.body.parentElement.clientHeight;
    var 取窗口宽 = () => document.body.parentElement.clientWidth;

    var 更新样式 = () => {
        var 窗口高 = 取窗口高(),
            窗口宽 = 取窗口宽()
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
    /* top: 0; */
    box-sizing: border-box !important;
    height: ${窗口高}px !important;
    width: ${窗口宽}px !important;
    max-width: ${窗口宽}px !important;

    display: flex   !important;
    flex-flow: column   !important;
    flex-wrap: wrap   !important;
    align-content: flex-start   !important;

    overflow-x: auto   !important;
    overflow-y: hidden   !important;

    z-index:1   !important;

    box-shadow: 0 0 1rem black inset   !important;
    background: rgba(255,255,255,0.3)   !important;
    color: black   !important;

    text-align: justify   !important;
    text-indent: 0   !important;
    padding: 5% 1rem   !important;
}
.snomiao-article:not(ul,ol){
    padding: 10% 1rem   !important;
}
.snomiao-article>*{
    /* display: block              !important; */
    background: rgba(255,255,255,0.3) !important;
    max-width: 40rem            !important;
}
.snomiao-article>*:not(li){
    padding: 0 2rem 1rem 0          !important;
    margin: 0 -1rem 0 0             !important;
    min-width: 32rem            !important;
    width: min-content          !important;

    max-height: 100%            !important;
    height:auto                 !important;
    overflow-x: auto            !important;
    overflow-y: auto            !important;
}
/* 解决pre换行问题 */
.snomiao-article pre{
    white-space: pre-wrap;
}


</style>`;
    }

    var 监听点击 = 元素 => {
        if (元素.flag_handleClickToggleSnoReadMode) return;
        // click to update this article and scroll to it
        元素.addEventListener("click", function (事件) {
            // console.debug("点击元素", 元素)
            元素.scrollIntoViewIfNeeded()
            元素.classList.contains("snomiao-article") &&
                进入雪阅模式(元素)
        }, false);
        // dblclick to turn back
        元素.addEventListener("dblclick", function (事件) {
            if (!事件.altKey) return;
            // console.log(元素, 元素.classList.contains("snomiao-article"))
            元素.classList.contains("snomiao-article") &&
                (退出雪阅模式(元素) || true) ||
                进入雪阅模式(元素)
            // 元素.scrollLeft += 元素.clientWidth + 100
            事件.preventDefault();
        }, true);
        元素.flag_handleClickToggleSnoReadMode = 1
    }
    var 解除修复元素可见性 = (元素) => {
        元素.parentElement && 解除修复元素可见性(元素.parentElement)
        if (!元素.flag_修复元素可见性) return;
        元素.flag_修复元素可见性 = false

        // 父元素 overflow: visible
        if (元素.origin_overflow) { 元素.style.overflow = 元素.origin_overflow }
    }
    var 修复元素可见性 = (元素) => {
        元素.parentElement && 修复元素可见性(元素.parentElement)
        if (元素.flag_修复元素可见性) return;
        元素.flag_修复元素可见性 = true

        // 父元素 overflow: visible
        if (window.getComputedStyle(元素).getPropertyValue('overflow') == "hidden") {
            元素.origin_overflow = "hidden"
            元素.style.overflow = "visible"
        }
    }
    var 适配元素位置到屏幕 = (元素) => {
        元素.setAttribute("style", `left: 0`);
        var { left, top } = 元素.getBoundingClientRect()
        元素.classList.add("snomiao-article")
        元素.setAttribute("style", `left: calc(${-left}px)`);
    }
    // 适配元素位置到屏幕(temp1)

    var 内含文本节点替换为段落 = (元素) => [...元素.childNodes].filter(e => !e.tagName).forEach(e => {
        if(!e.textContent.trim()) return null
        e.parentElement.insertBefore(新元素(`<p class='snomiao-replaced'>${e.textContent}</p>`), e)
        e.remove()
    })
    var 进入雪阅模式 = (元素) => {
        退出雪阅模式(元素)
        window.snomiao_article = 元素
        监听点击(元素)
        修复元素可见性(元素);
        // 为了对齐
        内含文本节点替换为段落(元素)
        更新样式()
        适配元素位置到屏幕(元素)
        // ref: 适配此页面 https://medium.com/s/story/why-sleep-on-it-is-the-most-useful-advice-for-learning-and-also-the-most-neglected-86b20249f06d
        // 未知原因错位，不过写2次就能正常了
        适配元素位置到屏幕(元素)
        元素.flag_雪阅模式 = true
        console.debug(元素, "进入雪阅模式");
    }
    var 退出雪阅模式 = 元素 => {
        元素.setAttribute("style", ``);
        元素.classList.remove("snomiao-article")
        解除修复元素可见性(元素)
        元素.flag_雪阅模式 = false
        console.debug(元素, "退出雪阅模式");
    }
    var 退出雪阅模式_临时 = 元素 => {
        元素.setAttribute("style", ``);
        元素.classList.remove("snomiao-article")
        解除修复元素可见性(元素)
    }

    var 切换雪阅模式 = (元素) => 元素.classList.contains("snomiao-article") && (退出雪阅模式(元素), true) || 进入雪阅模式(元素)
    var 更新雪阅模式 = (元素) => 元素.classList.contains("snomiao-article") != 元素.flag_雪阅模式 && 切换雪阅模式(元素)
    // 恢复所有文章样式()

    // 进入雪阅模式(window.article)
    // var 恢复所有文章样式_临时 = async () => ([...document.querySelectorAll(".snomiao-article")].map(退出雪阅模式_临时), await 睡(0))
    var 恢复所有文章样式_临时 = () => [...document.querySelectorAll(".snomiao-article")].map(退出雪阅模式_临时)
    var 恢复所有文章样式 = () => [...document.querySelectorAll(".snomiao-article")].map(退出雪阅模式)

    // 解决span取到offsetHeight为0的问题
    const 取元素投影高 = (元素) => 元素.offsetHeight || 元素.getBoundingClientRect().height
    const 取元素投影宽 = (元素) => 元素.offsetWidth || 元素.getBoundingClientRect().width
    const 取元素投影顶 = (元素) => 元素.getBoundingClientRect().top
    const 取元素面积 = (元素) => 取元素投影高(元素) * 取元素投影宽(元素)
    const 取最大值序 = (列) => 列.indexOf(Math.max(...列))
    const 压平 = 列 => 列.flat()
    const 排序按 = 函数 => 列 => 列.sort((a, b) => 函数(a) - 函数(b))
    const 取距离按 = 函数 => (a, b) => 函数(a) - 函数(b)
    const 翻转矩阵 = 矩阵 => 矩阵[0].map((列, 列号) => 矩阵.map(行 => 行[列号]));
    const 取相邻对 = 列 => 翻转矩阵([列.slice(1), 列.slice(0, -1)])
    const 取相邻关系按 = 关系 => 列 => 取相邻对(列).map(对 => 关系(...对))
    const 文章树取元素 = (文章树) => [文章树.元素, ...(文章树.子树列 && 文章树.子树列.map(文章树取元素) || [])]
    const 元素包含判断 = (父元素, 子孙元素) => 父元素.contains(子孙元素)
    const 检测重叠冲突 = (文章树) => {
        var 窗口高 = 取窗口高(),
            窗口宽 = 取窗口宽()
        var 元素列 = 文章树取元素(文章树).flat(Infinity)
        var 文章列 = 排序按(取元素投影顶)(元素列.filter(e => e.flag_是文章))
        // console.log(文章列)
        var 相邻对列 = 取相邻对(文章列).map(对 => (对.距离 = 取距离按(取元素投影顶)(...对), 对))
        var 异常对列 = 相邻对列.filter(对 => 对.距离 < 窗口高)
        var 冲突元素列 = 异常对列.map(异常对 => 排序按(取元素面积)(异常对))
        冲突元素列.forEach(([弱势元素, 强势元素]) => {
            // 若子元素与父元素冲突，则子元素不算弱势
            // 换句话说，若弱势元素为强势元素的子元素，则强弱关系互换
            if (元素包含判断(强势元素, 弱势元素)) {
                var tmp = 弱势元素
                弱势元素 = 强势元素
                强势元素 = tmp
            }
            强势元素.flag_冲突弱势元素 = 强势元素.flag_冲突弱势元素 || false
            弱势元素.flag_冲突弱势元素 = 弱势元素.flag_冲突弱势元素 || true
            强势元素.冲突元素对 = [弱势元素, 强势元素]
            弱势元素.冲突元素对 = [弱势元素, 强势元素]
            弱势元素.setAttribute('冲突弱势元素', true)
        })
    }
    var 取文章树 = (元素, 层数 = 0) => {
        var 窗口高 = 取窗口高(),
            窗口宽 = 取窗口宽();

        var 元素外高 = 取元素投影高(元素);

        var 子元素 = [...元素.children]
        元素.setAttribute("len子元素", 子元素.length)
        var 子元素高于屏 = 子元素.filter(e => 取元素投影高(e) > 窗口高)
        元素.setAttribute("len子元素高于屏", 子元素高于屏.length)
        var 主要的子元素 = 子元素高于屏.filter(e => 取元素投影高(e) / 元素外高 > 0.5)
        元素.setAttribute("len主要的子元素", 主要的子元素.length)

        var 元素宽度占比过小 = 元素.clientWidth < 窗口宽 * 0.90
        var 元素类型正确 = 元素.tagName != 'IMG'
        var 是文章 = !主要的子元素.length && 元素宽度占比过小 && 子元素.length >= 3


        // debug start
        子元素.forEach(e => {
            e.高度占比 = 取元素投影高(e) / 元素外高
            // e.setAttribute("高度占比", e.高度占比)
            // e.setAttribute("高于窗口", 取元素投影高(e) > 窗口高)
        })
        // var 子元素叠高 = 子元素.map(e => e.offsetHeight).concat([0]).reduce((a, b) => a + b)
        // debug end


        var 子树列 = 子元素高于屏.map(e => 取文章树(e, 层数 + 1)) || []

        var 占比 = 取元素投影高(元素) / 取元素投影高(元素.parentElement)
        元素.setAttribute("是文章", 是文章)
        元素.setAttribute("占比", 占比)

        元素.flag_是文章 = 是文章
        是文章 && console.log(元素, "是文章");
        return { 元素, 是文章, 占比, 子树列 }
    }
    var 输出文章树 = (树) => {
        return [树.元素, 树.是文章, 树.占比, ...(树.子树列 && 树.子树列.map(输出文章树) || [])]
    }
    var 转换文章树 = ({ 元素, 是文章, 子树列 }) => {
        var 子树有文章 = !!子树列.map(转换文章树).filter(e => e).length
        if (子树有文章) return true;
        if (元素 == document.body) return;

        if (!元素.flag_是文章) return;
        // if (是文章) return;
        if (元素.flag_冲突弱势元素) return;
        // if (!元素.flag_进入过雪阅模式) {
        //     元素.flag_进入过雪阅模式 = true
        //     元素.flag_雪阅模式 = true
        // }
        更新雪阅模式(元素)
        return true
        // 进入雪阅模式(元素)
    }

    var 扫描并转换文章树 = async () => {
        console.log("LAUNCH：SNOREAD");
        await 恢复所有文章样式_临时()
        if (!用户意向_雪阅模式) return null;
        // await 睡(100)
        var 文章树 = 取文章树(document.body)
        window.调试文章树1 = 文章树
        window.调试文章树2 = 输出文章树(文章树)
        //console.log(输出文章树(文章树))
        检测重叠冲突(文章树)
        转换文章树(文章树)
    }
    var 入口 = 异步防抖函数(扫描并转换文章树)

    var 用户意向退出雪阅模式 = () => {
        用户意向_雪阅模式 = false;
        入口()
    }

    window.addEventListener('load', 入口, false)
    window.addEventListener("resize", 入口, false)
    window.addEventListener('keyup', () => setTimeout(入口, 200), false)
    window.addEventListener('mouseup', () => setTimeout(入口, 200), false)
    window.addEventListener("keydown", e => e.code == "Escape" && 用户意向退出雪阅模式())

    入口()
})();


// 横向滚动
(function () {
    'use strict';
    var 监听滚动 = e => {
        [...e.children].map(监听滚动)
        if (e.flag_已监听滚动) return;
        e.flag_已监听滚动 = 1;

        var handleScroll = (事件) => {
            if (事件.altKey || 事件.ctrlKey || 事件.shiftKey) return;
            var scrollRate = (事件.detail || -事件.wheelDelta) / 120 //Y轴
            var scrolled_x = (e.scrollLeft != (e.scrollLeft += scrollRate * e.clientWidth * 0.1, e.scrollLeft))
            if (scrolled_x) {
                // 若需定位则撤销滚动
                var 当前Y = e.getBoundingClientRect().y
                e.scrollIntoViewIfNeeded()
                if (e.getBoundingClientRect().y != 当前Y)
                    e.scrollLeft -= scrollRate * e.clientWidth * 0.1;
                //
                事件.preventDefault();
                事件.stopPropagation();
                return false;
            }
            var scrolled_y = (e.scrollTop != (e.scrollTop += scrollRate * e.clientHeight * 0.5, e.scrollTop))
            if (scrolled_y) {
                var 当前X = e.getBoundingClientRect().x
                e.scrollIntoViewIfNeeded()
                if (e.getBoundingClientRect().x != 当前X)
                    e.scrollTop -= scrollRate * e.clientHeight * 0.5;
                //
                事件.preventDefault();
                事件.stopPropagation();
                return false;
            }
            // 横竖都滚到底了
            [...e.children].map(监听滚动)
        }
        e.addEventListener("mousewheel", handleScroll, { capture: false, passive: false }) // Chrome/Edge
        e.addEventListener("DOMMouseScroll", handleScroll, { capture: false, passive: false }) // FF
    }
    var 入口 = () => 监听滚动(document.body)
    document.addEventListener("DOMContentLoaded", 入口)
    window.addEventListener("load", 入口)
    入口()
})();