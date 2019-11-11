// ==UserScript==
// @name         雪阅模式|SNOREAD
// @namespace    https://userscript.snomiao.com/
// @version      0.5(20191111)
// @description  【自用，目前还有很多BUG】豪华广角宽屏视角 / 横向滚动阅读模式 / 翻页模式 / 充分利用屏幕空间
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
            [...e.children].map(listenScroll)
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
    
    var processArticle = (e) => {
        turnBackNormal(e)
        var wHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        window.snomiao_article=e
        listenScroll(e)
        listenClick(e)

        // console.log("setStyle", e, level)
        // e.setAttribute("style", `position: relative;left: 0;top: 0;`)
        var { left, top } = e.getBoundingClientRect()
        e.classList.add("snomiao-article")

        e.setAttribute("style", `
        position: relative;
        left: calc(1em + ${-left}px);
        top: 0;
        max-height: ${wHeight * 0.9}px;
        box-sizing: border-box;
        width: calc(${screenWidth}px - 2em);

        display: flex;
        flex-flow: column;
        flex-wrap: wrap;
        align-content: flex-start;

        overflow-x: auto;
        overflow-y: hidden;

        z-index:1;
        
        box-shadow: 0 0 1px blue;
        background: rgba(255,255,255,0.5);
        color: black;

        text-align: justify;
        text-indent: 0;
    `);
        [...e.children].map(c => {
            c.setAttribute("style", `
                margin: 0 -1em 0 0;
                padding: 0 2em 1em 0;
                max-width: 70em;
                min-width: 30em;
                width: min-content;
                max-height: ${wHeight * 0.9}px;
                height:auto;
                overflow-x: auto;
                overflow-y: auto;
                background: rgba(255,255,255,0.5);

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
        sub.map(setArticle);
        if(e == document.body) return;
        isArticle && console.log(e, "isArticle");
        isArticle && processArticle(e);
    }
    var main = () => {
        console.log("LAUNCH：SNOREAD");
        prepareGetArticles()
        var articleTree = getArticles(document.body)
        window.debugArticleTree = articleTree
        setArticle(articleTree)
    }
    // setInterval(main, 3000)
    // document.addEventListener("onload", main)
    window.addEventListener("load", main)
    window.addEventListener("resize", main)
    main()

})();
