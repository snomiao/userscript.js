// ==UserScript==
// @name         超星提前解锁章节
// @namespace    https://userscript.snomiao.com
// @version      0.1
// @description  我是热爱学习的好孩子
// @author       snomiao@gmail.com
// @match        https://*.chaoxing.com/mycourse/studentstudy?*
// ==/UserScript==

(() => {
    var main = () => {
        var query = window.location.search;
        var courseId = query.match(/(?<=courseId=)\d+/)[0];
        var clazzid = query.match(/(?<=clazzid=)\d+/)[0];
        [...document.querySelectorAll("h4>a")].map(a => {
            var h4 = a.parentElement;
            var chapterId = h4.id.match(/(?<=cur)\d+/)[0];
            /* 表示已解锁 */
            var rp = h4.querySelector('.roundpointStudent');
            rp.innerHTML = '/';
            /* 激活链接 */
            a.href = `javascript: getTeacherAjax('` + courseId + `','` + clazzid + `','` + chapterId + `');`;
        })
    }
    setInterval(main, 10000)
    window.addEventListener("onload", main)
    document.addEventListener("onload", main)
    main()
})()