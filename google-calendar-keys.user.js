// ==UserScript==
// @name         [snolab] Google 日历键盘操作增强
// @name:zh      [雪星实验室] Google Calendar with Keyboard Enhanced
// @namespace    https://userscript.snomiao.com/
// @version      0.0.2
// @description  【功能测试中, bug反馈：snomiao@gmail.com】Google日历键盘增强，雪星自用，功能：双击复制日程视图里的文本内容
// @author       snomiao@gmail.com
// @match        *://calendar.google.com/*
// @grant        none
// ==/UserScript==

var clk = (sel) => {
    var e = document.querySelector(sel);
    console.log('clk', e);
    e?.focus();
    e?.click();
    return !!e;
};
var stmo = () => clk('input[aria-label="Start time"]');
var etmo = () => clk('input[aria-label="End time"]');

document.onkeydown = (e) => {
    var isInput = ['INPUT', 'BUTTON'].includes(e.target.tagName);
    var { altKey, ctrlKey, shiftKey, key } = e;
    var keyName =
        (altKey ? '!' : '') +
        (ctrlKey ? '^' : '') +
        (shiftKey ? '+' : '') +
        key.toLowerCase();
    var okay = () => {
        e.defaultPrevented();
        e.stopPropagation();
    };
    console.log(keyName + ' pressed on ', e.target.tagName);
    if (keyName === '!s') {
        stmo();
        okay();
        return;
    }
    if (keyName === '!e') {
        etmo();
        okay();
        return;
    }
};

var 复制文本 = (content) => {
    const input = document.createElement('textarea');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', content);
    input.innerHTML = content;
    input.setAttribute('style', 'position: fixed; top:0; left:0;z-index: 9999');
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        // console.log(`长度为${content.length}的内容已复制`);
        // alert(`长度为${content.length}的内容已复制`);
    }
    document.body.removeChild(input);
};

// 复制日程内容
var cpy = (ele) => {
    ele.style.background = 'lightblue';
    setTimeout(() => (ele.style.background = 'none'), 200);
    return 复制文本(
        ele.innerText
            // 把时间和summary拼到一起
            .replace(
                /.*\n(.*) – (.*)\n(.*)\n.*/gim,
                (_, a, b, c) => a + '-' + b + ' ' + c
            )
            // 删掉前2行
            .replace(/^.*\n.*\n/, '')
    );
};
document.body.addEventListener(
    'mousedown',
    () => {
        [...document.querySelectorAll('div.L1Ysrb')].map((e) => {
            if (!e.flag_cpy_eventlistener) {
                e.addEventListener('dblclick', () => cpy(e), false);
            }
            e.flag_cpy_eventlistener = 1;
        });
    },
    true
);
