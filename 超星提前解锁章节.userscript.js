// ==UserScript==
// @name         超星提前解锁章节
// @name:zh      【解锁章节已失效】超星提前解锁章节
// @namespace    https://userscript.snomiao.com
// @version      0.8
// @description  【解锁章节功能已失效】在视频播放页面（非课程首页），右边侧边栏可以提前解锁章节。在首页右上角可以查看章节统计。我是热爱学习的好孩子
// @author       snomiao@gmail.com
// @match        https://*.chaoxing.com/*
// ==/UserScript==

(() => {
    var 解锁 = async() => {
        var query = new URLSearchParams(window.location.search);
        var courseId = query.get('courseId');
        var clazzid = query.get('clazzid');
        [...document.querySelectorAll("h4>a, h5>a")].map(a => {
            var h4 = a.parentElement;
            var chapterId = h4.id.match(/(?<=cur)\d+/)[0];
            /* 表示已解锁 */
            var rp = h4.querySelector('.roundpointStudent.lock');
            rp && (rp.innerHTML = '/');

            /* 激活链接 */
            a.href = `javascript: getTeacherAjax('` + courseId + `','` + clazzid + `','` + chapterId + `');`;
        });
    }
    var 新元素 = (innerHTML, attributes = {}) => {
        var e = document.createElement("div");
        e.innerHTML = innerHTML;
        return Object.assign(e.children[0], attributes)
    }
    var 增加统计功能 = async() => {
        if ([...document.querySelectorAll(".navshow ul li")].filter(e => e.innerText.trim() == "统计").length)
            return;
        //
        var 取统计地址 = () => {
            var h = document.head.innerHTML + document.body.innerHTML;
            var userId = localStorage.userId || (localStorage.userId = h.match(/(?<=userId: ')\d+/)[0]);
            return (
                "/moocAnalysis/chapterStatisticByUser?courseId=" + h.match(/(?<=courseId=)\d+/)[0] +
                "&classId=" + h.match(/(?<=classId=)\d+/)[0] +
                "&userId=" + userId +
                "&ut=s&vc=1&cpi=" + h.match(/(?<=cpi=)\d+/)[0] +
                "&enc=" + h.match(/(?<=enc=)\w+/)[0])
        };

        var e = document.querySelector(".navshow ul");
        e && e.appendChild(新元素('<li><a target="_blank" href="' + 取统计地址() + '">统计</a></li>'))

    }
    var main = () => {
        解锁().catch(console.error)
        增加统计功能().catch(console.error)
    }
    main();
    window.addEventListener("load", main);
    // document.addEventListener("load", main);
    // setInterval(main, 10000)
})()