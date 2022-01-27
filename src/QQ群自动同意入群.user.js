// ==UserScript==
// @name         QQ书友群自动同意入群
// @namespace    https://userscript.snomiao.com/
// @version      0.5
// @description  rt
// @author       snomiao@gmail.com
// @match        https://web.qun.qq.com/cgi-bin/sys_msg/getmsg?ver=7800&filter=0&ep=1
// @match        https://web.qun.qq.com/cgi-bin/sys_msg/getmsg?*
// @grant        none
// ==/UserScript==
//
// 使用方法：
// https://web.qun.qq.com/cgi-bin/sys_msg/getmsg?ver=7800&filter=0&ep=1#[/书友/,/(1[6789]........)/]
//
(function () {
    'use strict';

    var main = () => {
        document.title = new Date().toISOString();
        [...document.querySelectorAll('dd.undeal')]
            .map((e) => {
                var info = e.innerText;
                var 答案 = ((e) => e && e[1])(
                    info.match(/问题：.*?\n答案：(.*?)\n同意\n忽略/)
                );
                // 答案.match(答案模式)
                var 邀请人 = ((e) => e && e[1])(
                    info.match(
                        /申请加入群\n书友.*?\n来自群成员\n(.*?)\n的邀请\n同意\n忽略/
                    )
                );
                return { e, 答案, 邀请人, 通过: !!答案 || !!邀请人 };
            })
            .filter(({ 通过 }) => 通过)
            .map(({ e }) => {
                try {
                    e.querySelector('.agree_btn').click();
                } catch {}
            });
    };
    var refresh = () => {
        window.location = window.location;
    };
    setInterval(refresh, 5000);
    setInterval(main, 1000);

    main();
})();
