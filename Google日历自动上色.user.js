// ==UserScript==
// @name         [雪星实验室] Google Calendar 谷歌日历自动上色
// @namespace    https://userscript.snomiao.com/
// @version      0.0.5
// @description  【功能测试中, bug反馈：snomiao@gmail.com】Google日历自动上色、根据匹配到的关键词显示特定颜色，例如： 休|睡、洗漱|收拾|整理|日记|日志、研究|学习|探索|背词|了解、上学|上班|上课、健身|锻练|热身、路上|通勤、料理|做饭、仪式|典礼|祭祀、紧急|重要|考试|测验、群聊|交流|玩|游戏|知乎、电影|看书|阅书|影评
// @author       snomiao@gmail.com
// @match        *://calendar.google.com/*
// @grant        none
// ==/UserScript==

// [颜色名 — HTML颜色代码](https://htmlcolorcodes.com/zh/yanse-ming/)
var 颜色表 = {
    '休|睡': 'Azure',
    '洗漱|收拾|购物|购买|整理|日记|日程|日志|维护': "LightYellow",
    '科研|研发|开发|研究|探索': "deepskyblue",
    '上学|上班|上课|课程': "skyblue",
    '健身|锻练|热身': "Lime",
    '路上|通勤': "Gainsboro",
    '料理|做饭': "lawngreen",
    '仪式|典礼|祭祀': 'yellow',
    '紧急|重要|考试|测验': 'OrangeRed',
    '群聊|交流|玩|游戏|知乎|微博|小红书|视频|抖音|bilibili|B站': "Violet",
    '学习|背词|了解|阅读|电影|看书|阅书|影评|《': "Turquoise",
}
var 更新颜色 = () => {
    var 事件元素列 = [...document.querySelectorAll('div[data-eventid]')]
    var 颜色分析 = 事件元素列.map(e => ({ 元素: e, 文本: e.textContent, 颜色: window.getComputedStyle(e).getPropertyValue('background-color') }))
    颜色分析.forEach(({ 元素, 文本 }) => Object.keys(颜色表)
        .filter(正则 => 文本.match(正则))
        .sort((正则1, 正则2) => 文本.match(正则1).index - 文本.match(正则2).index)
        .map(正则 => 元素.style.backgroundColor = 颜色表[正则]))
}

var 节流 = (间隔, 函数 = async () => null, 提示函数 = async () => null, 上次执行 = 0) => async (...参数) =>
    +new Date() - 上次执行 > 间隔 ? ((上次执行 = +new Date()), await 函数(...参数)) : await 提示函数(...参数)
var 防抖 = (间隔, 函数 = async () => null, 提示函数 = async () => null, timerId = null) => (...参数) => new Promise((resolve, reject) =>
    (timerId && (clearTimeout(timerId), resolve(提示函数(...参数))), timerId = setTimeout(() => resolve(函数(...参数)), 间隔)))
var 节流防抖 = (间隔, 函数 = async () => null, 提示函数 = async () => null) => 节流(间隔, 函数, 防抖(间隔, 函数, 提示函数))
var 刷新函数 = 节流防抖(10e3 /* 10s */, () => !document.hidden && 更新颜色())
var 主动刷新函数 = 节流防抖(200, () => !document.hidden && 更新颜色())

// オブザーバインスタンスを作成
var 目标 = document.documentElement || document.body
var 监视配置 = { attributes: false, childList: true, characterData: false };
if (typeof 页面变动监视器 !== 'undefined') 页面变动监视器.disconnect()
var 页面变动监视器 = new MutationObserver((mutations) => {
    if (!mutations.some(record => record.addedNodes.length)) return;
    页面变动监视器.disconnect(); 刷新函数(); 目标 && 页面变动监视器.observe(目标, 监视配置)
}); 页面变动监视器.observe(目标, 监视配置)
document.addEventListener('visibilitychange', () => setTimeout(刷新函数, 100), false)
document.addEventListener('mouseup', () => setTimeout(主动刷新函数, 100), false)
document.addEventListener('keyup', () => setTimeout(主动刷新函数, 100), false)
window.addEventListener('load', 刷新函数, false)
刷新函数()