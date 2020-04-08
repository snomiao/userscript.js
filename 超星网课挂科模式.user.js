// ==UserScript==
// @name         超星网课挂科模式
// @namespace    https://userscript.snomiao.com
// @version      0.1
// @description  自动签到，自动统计未完成作业、未完成任务等、提前解锁章节，查看章节统计。我是热爱学习的好孩子，（配合超星网课助手可自动观看课程、自动完成作业等）
// @author       snomiao@gmail.com
// @match        https://*.chaoxing.com/*
// ==/UserScript==

/*
结构:
    课程: {
        classId: {
            workId:
            作业: 
        }
        上次签到
    }
*/
// (() => {
var 加载状态 = () => { try { var r = JSON.parse(localStorage.超星网课挂科模式) } catch{ } return r || {} }
var 保存状态 = (json = {}) => { localStorage.超星网课挂科模式 = JSON.stringify(json) }
var 更新状态 = (函数) => 保存状态(函数(加载状态()))

var main = () => {
    // 
    if (location.pathname == "/visit/interaction") {
        更新状态((状态) => {
            状态.课程表 = 状态.课程表 || {};
            [...document.querySelectorAll('.ulDiv ul li[style]')].map(e => {
                var classId = e.querySelector('[name="classId"]').value
                var courseId = e.querySelector('[name="courseId"]').value
                var 标题 = e.querySelector('h3').textContent.trim()
                状态.课程表[classId] = { ...(状态.课程表[classId] || {}), classId, courseId, 标题 }
            });
            return 状态
        });
        console.debug("状态: ", 加载状态())
    }
    // 作业
    if (location.pathname == "/work/getAllWork") {
        更新状态((状态) => {
            var classId = document.querySelector('#cid').value;
            var 作业表 = {};
            [...document.querySelectorAll('.ulDiv ul li[style]')].map(e => {
                var html = e.innerHTML
                var ls = e.innerText.trim().split(/\r?\n/).map(e => e.trim())
                var [标题, _, _, 开始时间, 截止时间, _, 作业状态] = ls
                var 分数 = e.querySelector(".titOper>span")
                // var workId = 
                var workId = (e => e && e.data)(e.querySelector("a[data]"))
                    || (e => e && e[1])(html.match(/workId=(\d+)/))
                作业表[workId] = { ...(作业表[workId] || {}), workId }
            })
            状态.课程表 = 状态.课程 || {};
            状态.课程表[classId] = { ...(状态.课程表[classId] || {}), classId, 作业表 }
            return 状态
        });
        console.debug("状态: ", 加载状态())
    }
    // 签到

    // https://mooc1-1.chaoxing.com/work/getAllWork?classId=13672939&courseId=206787823&isdisplaytable=2&mooc=1&ut=s&enc=5e9934be68b58f581bf74b9373452c93&cpi=46558623&openc=2ff02b4be53b9d9670e7489f338b6286
}
main();
window.addEventListener("load", main);
// })()