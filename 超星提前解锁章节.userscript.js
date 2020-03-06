// ==UserScript==
// @name         超星提前解锁章节
// @namespace    https://userscript.snomiao.com
// @version      0.3
// @description  提前解锁章节，查看章节统计。我是热爱学习的好孩子
// @author       snomiao@gmail.com
// @match        https://*.chaoxing.com/mycourse/studentstudy?*
// ==/UserScript==

(() => {
    var main = () => {
        var query = new URLSearchParams(window.location.search);
        var courseId = query.get('courseId');
        var clazzid = query.get('clazzid');
        [...document.querySelectorAll("h4>a")].map(a => {
            var h4 = a.parentElement;
            var chapterId = h4.id.match(/(?<=cur)\d+/)[0];
            /* 表示已解锁 */
            var rp = h4.querySelector('.roundpointStudent.lock');
            rp && (rp.innerHTML = '/');
            /* 激活链接 */
            a.href = `javascript: getTeacherAjax('` + courseId + `','` + clazzid + `','` + chapterId + `');`;
        });
        var 取统计地址 = () => {
            var h = document.head.innerHTML + document.body.innerHTML,
                userId = h.match(/(?<=userId: ')\d+/)[0],
                enc = h.match(/(?<=enc=)\w+/)[0],
                courseId, classId, cpi, url;
            return "/moocAnalysis/chapterStatisticByUser?courseId=" + h.match(/(?<=courseId=)\d+/)[0] + "&classId=" + h.match(/(?<=classId=)\d+/)[0] + "&userId=" + userId + "&ut=s&vc=1&cpi=" + h.match(/(?<=cpi=)\d+/)[0] + "&enc=" + enc
        };
        var 新元素 = (innerHTML, attributes = {}) => {
            var e = document.createElement("div");
            e.innerHTML = innerHTML;
            return Object.assign(e.children[0], attributes)
        }
        document.querySelector(".navshow ul").appendChild(新元素('<li><a target="_blank" href="' + 取统计地址() + '">统计</a></li>'))
    }
    main();
    window.addEventListener("onload", main);
    document.addEventListener("onload", main);
    // setInterval(main, 10000)
})()