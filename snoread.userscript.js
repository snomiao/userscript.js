// ==UserScript==
// @name         雪阅模式|SNOREAD
// @namespace    https://userscript.snomiao.com/
// @version      0.3
// @description  【自用，目前还有很多BUG】豪华广角宽屏视角 / 横向滚动阅读模式 / 翻页模式 /
// @author       snomiao@gmail.com
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var listenScroll = e => {
        [...e.children].map(listenScroll)

        if (e.flag_listenScroll) return;
        e.flag_listenScroll = 1;


        var zoom = 1//window.detectZoom()
        var handleScroll = (event) => {
            // [...e.children].map(listenScroll)
            var scroll_y = (event.detail || -event.wheelDelta) / 120

            var scrollBefore = e.scrollLeft
            // console.log(e.tagName)
            // console.log("L1", e.scrollLeft, scroll_y * e.clientWidth * 0.5)
            // e.scrollLeft += scroll_y * e.clientWidth * 0.5;
            e.scrollBy(scroll_y * e.clientWidth * 0.5, 0)
            // console.log("L2", e.scrollLeft,  scrollBefore,  scrollBefore!==e.scrollLeft)
            // e.scrollLeft += -event.wheelDelta * zoom;
            if (e.scrollLeft !== scrollBefore) {
                // e.scrollIntoView(true);
                // window.scrollBy(0, wHeight * -0.1)

                e.scrollIntoViewIfNeeded()
                event.preventDefault();
                return;
            } else {

                var scrollBefore2 = e.scrollTop;
                e.scrollTop += scroll_y * e.clientHeight * 0.5;
                // console.log("T",e.scrollTop)
                // e.scrollLeft += -event.wheelDelta * zoom;
                if (e.scrollTop !== scrollBefore2) {
                    // e.scrollIntoView(true);
                    // window.scrollBy(0, wHeight * -0.1)
                    e.scrollIntoViewIfNeeded()
                    event.preventDefault();
                    return;
                }
            }
        }
        e.addEventListener("mousewheel", handleScroll, { passive: false })     // Chrome/Edge
        e.addEventListener("DOMMouseScroll", handleScroll, { passive: false }) // FF
    }
    var listenScroll2 = e => {
        [...e.children].map(listenScroll2)
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
            [...e.children].map(listenScroll2)
        }
        e.addEventListener("mousewheel", handleScroll, { capture: false, passive: false })     // Chrome/Edge
        e.addEventListener("DOMMouseScroll", handleScroll, { capture: false, passive: false }) // FF
    }
    //listenScroll(document.documentElement)
    var turnBackNormal = e => {
        e.setAttribute("style", ``);
        [...e.children].map(e => e.setAttribute("style", ``))
        e.classList.remove("snomiao-article")
    }
    var listenClick = e => {
        if (e.flag_handleClickToggleSnoReadMode) return;
        // click to update this article and scroll to it
        e.addEventListener("click", function (event) {
            listenScroll(e);
            e.scrollIntoViewIfNeeded()
            e.classList.contains("snomiao-article")
                && processArticle(e)
        }, false);
        // dblclick to turn back
        e.addEventListener("dblclick", function (event) {
            // console.log(e, e.classList.contains("snomiao-article"))
            e.classList.contains("snomiao-article")
                && (turnBackNormal(e) || true)
                || processArticle(e)
            // e.scrollLeft += e.clientWidth + 100
            event.preventDefault();
        }, true);
        e.flag_handleClickToggleSnoReadMode = 1
    }
    var wHeight = window.innerHeight;
    var screenWidth = window.innerWidth;

    var processArticle = (e) => {
        window.snomiao_article=e
        listenScroll2(e)
        listenClick(e)

        var charCountOfLine = 35
        // console.log("setStyle", e, level)
        e.setAttribute("style", `position: relative;left: 0;top: 0;`)
        var { left, top } = e.getBoundingClientRect()
        e.classList.add("snomiao-article")

        e.setAttribute("style", `
        /*transition: left 0.2s top 0.2s width 0.2s;*/

        position: relative;
        left: calc(1em + ${-left}px);
        top: 0;
        max-height: ${wHeight * 0.9}px;
        box-sizing: border-box;
        /*max-width: ${charCountOfLine}em;*/
        width: ${screenWidth}px;
        /*padding-right:calc(${screenWidth}px - 2em);*/

        display: flex;
        flex-flow: column;
        flex-wrap: wrap;
        overflow-x: auto;
        overflow-y: hidden;
        z-index:1;
        box-shadow: 0 0 1px blue;
        background: white;
        color: black;


        text-align: justify;
        text-indent: 0;
    `);
        [...e.children].map(c => {
            c.setAttribute("style", `
                margin: 0 0 0 0;
                padding: 0 1em 1em 0;
                max-width: ${70 || charCountOfLine + 5}em;
                min-width: ${charCountOfLine - 5}em;
                width: min-content;
                max-height: ${wHeight * 0.9}px;
                height:auto;
                overflow-x: auto;
                overflow-y: auto;
            `)
        })
        // var e2 = document.create(e.tagName)
        // e.parentElement.appendChild()
        // e.innerHTML
        // e.scrollTo()

        // e.scrollIntoView(true);
        // window.scrollBy(0, wHeight * -0.05)
        // window.a = e
    }
    // processArticle(window.article)

    // 
    var prepareGetArticles = () => [...document.querySelectorAll(".snomiao-article")].map(turnBackNormal)
    var getArticles = (e, level = 0) => {
        var children = [...e.children]
        var windowHeight = window.innerHeight
        var large = children.filter(e => e && e.offsetHeight && e.offsetHeight > windowHeight)
        var parentHeight = e.offsetHeight;
        var large2 = large.filter(e => e.offsetHeight / parentHeight > 0.5)
        var sub = large2.map(e => getArticles(e, level + 1))
        var isArticle = !large2.length
        var rate = e.offsetHeight / e.parentElement.offsetHeight
        return { e, isArticle, rate, sub }
    }
    var setArticle = ({ e, isArticle, sub }) => {
        isArticle && processArticle(e);
        sub.map(setArticle)
    }
    var main = () => {
        console.log("LAUNCH：SNOREAD");
        prepareGetArticles()
        var articleTree = getArticles(document.body)
        setArticle(articleTree)
    }
    // setInterval(main, 3000)
    // document.addEventListener("onload", main)
    window.addEventListener("load", main)
    window.addEventListener("resize", main)
    main()

})();
