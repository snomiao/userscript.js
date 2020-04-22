// ==UserScript==
// @name          所有视频2倍速度播放 / video speed 2x
// @namespace     https://userscript.snomiao.com/
// @description   这个世界的一切都太慢了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
// @author        snomiao@gmail.com
// @match         *://*.youtube.com/*
// @match         *://*/*
// @exclude       *://mooc1-2.chaoxing.com/*
// @version       0.1.1
// ==/UserScript==
// (20200422)更新：规避超星

(() => {
    var rate = 2
    var init = () => [...document.querySelectorAll('video')].map(e => {
        if (!e.flag_speed_inited) {
            e.playbackRate = rate
            console.debug(e, "SPEED_X", rate)
            e.flag_speed_inited = 1
        }
    })
    setInterval(init, 10000)
    window.addEventListener("onload", init)
    document.addEventListener("onload", init)
    init()
})()