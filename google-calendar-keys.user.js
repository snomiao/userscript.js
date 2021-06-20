// ==UserScript==
// @name         [snolab] Google 日历键盘操作增强 
// @name:zh      [雪星实验室] Google Calendar with Keyboard Enhanced
// @namespace    https://userscript.snomiao.com/
// @version      0.0.1
// @description  【功能测试中, bug反馈：snomiao@gmail.com】Google日历键盘增强，雪星自用
// @author       snomiao@gmail.com
// @match        *://calendar.google.com/*
// @grant        none
// ==/UserScript==

var clk = (sel) => {
    var e = document.querySelector(sel)
    console.log("clk", e)
    e?.focus()
    e?.click()
    return !!e
}
var stmo = () => clk('input[aria-label="Start time"]')
var etmo = () => clk('input[aria-label="End time"]')

document.onkeydown = (e) => {
    var isInput = ['INPUT', 'BUTTON'].includes(e.target.tagName)
    var { altKey, ctrlKey, shiftKey, key } = e
    var keyName = (altKey ? '!' : '') + (ctrlKey ? '^' : '') + (shiftKey ? '+' : '') + key.toLowerCase()
    var okay = () => {
        e.defaultPrevented()
        e.stopPropagation()
    }
    console.log(keyName + ' pressed on ', e.target.tagName)
    if (keyName === '!s') {
        stmo()
        okay()
        return
    }
    if (keyName === '!e') {
        etmo()
        okay()
        return
    }
}
