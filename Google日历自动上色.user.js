// ==UserScript==
// @name         [雪星实验室] Google Calendar 谷歌日历自动上色
// @namespace    https://userscript.snomiao.com/
// @version      0.0.9
// @description  【功能测试中, bug反馈：snomiao@gmail.com】Google日历自动上色、根据匹配到的关键词显示特定颜色，例如： 休|睡、洗漱|收拾|整理|日记|日志、研究|学习|探索|背词|了解、上学|上班|上课、健身|锻练|热身、路上|通勤、料理|做饭、仪式|典礼|祭祀、紧急|重要|考试|测验、群聊|交流|玩|游戏|知乎、电影|看书|阅书|影评
// @author       snomiao@gmail.com
// @match        *://calendar.google.com/*
// @grant        none
// ==/UserScript==

// [颜色名 — HTML颜色代码](https://htmlcolorcodes.com/zh/yanse-ming/)
// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
// [LCH colors in CSS: what, why, and how? – Lea Verou](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/)
// [javascript - RGB to XYZ and LAB colours conversion - Stack Overflow](https://stackoverflow.com/questions/15408522/rgb-to-xyz-and-lab-colours-conversion)
// [rgb-lab/color.js at master · antimatter15/rgb-lab](https://github.com/antimatter15/rgb-lab/blob/master/color.js)
// [Color math and programming code examples](https://www.easyrgb.com/en/math.php)

var D65_2deg = [95.047, 100.000, 108.883]
var rad = (deg) => deg / 180 * Math.PI
var 向向内积 = (a, b) => a.map((_, i) => a[i] * b[i]).reduce((a, b) => a + b)
var 向向乘 = (a, b) => a.map((_, i) => a[i] * b[i])
var 向数除 = (a, b) => a.map((_, i) => a[i] / b)
var lch2lab = (l, c, h_deg) => [l, Math.cos(rad(h_deg)) * c, Math.sin(rad(h_deg)) * c]
var lab2xyz = (l, a, b) => {
    let vy = (l + 16) / 116
    let vx = a / 500 + vy
    let vz = vy - b / 200
    let xyz = [vx, vy, vz].map(v => v ** 3 > 0.008856 ? v ** 3 : (v - 16 / 116) / 7.787)
    return 向向乘(xyz, D65_2deg)
}
var xyz2srgb = (x, y, z) => {
    let vxyz = 向数除([x, y, z], 100)
    let vr = 向向内积(vxyz, [3.2406, -1.5372, -0.4986])
    let vg = 向向内积(vxyz, [-0.9689, 1.8758, 0.0415])
    let vb = 向向内积(vxyz, [0.0557, -0.2040, 1.0570])
    return [vr, vg, vb].map(v => v > 0.0031308 ? 1.055 * (v ** (1 / 2.4)) - 0.055 : 12.92 * v).map(v => v * 255)
}
var srgb2str = (r, g, b) => `rgb(${[r, g, b].map(e => Math.min(Math.max(0, e | 0), 255)).join(',')})`
var lch2str = (l, c, h) => srgb2str(...xyz2srgb(...lab2xyz(...lch2lab(l, c, h))))
var sslch2str = (l, c, h) => srgb2str(...xyz2srgb(...lab2xyz(...lch2lab(l, c, h ** 1.2 * 300+30))))
// document.body.style.background = lch2str(100, 80, 30)
var 深色事件 = { // 一般红到青
    '紧急|重要|考试|测验|吵架|事故': 'red',
    '仪式|典礼|祭祀': '',
    '群聊|交流|知乎|微博|小红书|视频|抖音|bilibili|B站': '',
    '玩|游戏': '',
    '账单|还款': '',
    '学习|背词|了解|阅读|电影|看书|阅书|影评|《': '',
    '思考|科研|研发|开发|研究|探索': '',
}
var 浅色事件 = { // 从浅红到天蓝
    '购物|购买': '',
    '休|睡': '',
    '洗漱|收拾|整理|大扫除': '',
    '健身|锻练|热身|料理|做饭|吃': '',
    '日记|日程|日志': '维护|运维|配置',
    '路上|通勤|上学|上班|上课|课程': '',
}
深色事件 = Object.fromEntries(Object.entries(深色事件).map(([k, v], i, a) => [k, v || sslch2str(90, 100, i / a.length)]))
浅色事件 = Object.fromEntries(Object.entries(浅色事件).map(([k, v], i, a) => [k, v || sslch2str(100, 20, i / a.length)]))

var 更新颜色 = () => {
    var 事件元素列 = [...document.querySelectorAll('div[data-eventid]')]
    var 颜色分析 = 事件元素列.map(e => ({ 元素: e, 文本: e.textContent, 颜色: window.getComputedStyle(e).getPropertyValue('background-color') }))
    颜色分析.forEach(({ 元素, 文本 }) => Object.keys(浅色事件)
        .filter(正则 => 文本.match(正则))
        .sort((正则1, 正则2) => 文本.match(正则1).index - 文本.match(正则2).index)
        .map(正则 => 元素.style.backgroundColor = 浅色事件[正则]))
    颜色分析.forEach(({ 元素, 文本 }) => Object.keys(深色事件)
        .filter(正则 => 文本.match(正则))
        .sort((正则1, 正则2) => 文本.match(正则1).index - 文本.match(正则2).index)
        .map(正则 => 元素.style.backgroundColor = 深色事件[正则]))
}

更新颜色()

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