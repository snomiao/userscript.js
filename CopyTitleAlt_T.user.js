// ==UserScript==
// @name            Copy Title Alt+T
// @name:zh         Alt+T 复制标题和地址快速分享
// @description     Press Alt+T to copy title and url like this `# ${TITLE}\n${URL}` and Alt+Shift+T to copy the markdown style link `[${TITLE}]( ${URL} )`
// @description:zh  按 Alt+T 复制标题和地址 `# ${TITLE}\n${URL}` and Alt+Shift+T 复制 Markdown 格式的链接 `[${TITLE}]( ${URL} )`
// @namespace       https://userscript.snomiao.com/
// @version         0.4
// @author          snomiao@gmail.com
// @match           *://*/*
// @grant           none
// ==/UserScript==
// (20200425)更新：修改格式
// (20200423)更新：增加格式
(function () {
    'use strict';
    var 复制标题文本 = (content) => {
        const input = document.createElement('textarea');

        input.setAttribute('readonly', 'readonly');
        input.setAttribute('value', content);
        input.innerHTML = (content);
        input.setAttribute('style', 'position: fixed; top:0; left:0;z-index: 9999');
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, 9999);

        let ok = false
        if (document.execCommand('copy')) {
            document.execCommand('copy');
            ok = true
        }
        document.body.removeChild(input);

        ok
            ? alert(标题地址 + '\n copyied!')
            : alert('copy title failed, please check browser version')
        return ok || false
    };
    var 取标题 = () => {
        var 标题列 = [...document.querySelectorAll('h1')]
        return 标题列.length == 1 && 标题列[0].innerText.trim() || document.title || ''
    }
    window.addEventListener('keydown', (e) => {
        if (e.altKey && !e.shiftKey && !e.ctrlKey && e.code == 'KeyT')
            复制标题文本(`# ${取标题()}\n${location.href}`)
        if (e.altKey && e.shiftKey && !e.ctrlKey && e.code == 'KeyT')
            复制标题文本(`[${取标题()}]( ${location.href} )`)
    })
})();