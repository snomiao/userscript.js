// ==UserScript==
// @name            Copy Markdown Quote Alt+C
// @name:zh         Alt+C 复制Markdown格式标题和地址快速分享
// @name:en         Alt+C Copy Title and Link as Markdown Style
// @description     Press Alt+C to copy title and url as markdown style link `> ${SELECTION} [${TITLE}]( ${URL} )`
// @description:zh  按 Alt+C 复制 Markdown 格式的链接 `> ${SELECTION} [${TITLE}]( ${URL} )`
// @namespace       https://userscript.snomiao.com/
// @version         0.8.0
// @author          snomiao@gmail.com
// @match           *://*/*
// @grant           none
// ==/UserScript==

window.addEventListener(
    'keydown',
    (e) => {
        if (e.altKey && !e.shiftKey && !e.ctrlKey && e.code == 'KeyC') {
            const selQuotes = window.getSelection().toString().trim().split(/\r?\n/).map(line=>'> '+ line).join('\n')
            textCopy(`${selQuotes}\t[${titleGet()}]( ${location.href} )`.trim());
            e.preventDefault();
            e.stopPropagation();
        }
    },
    false
);

function titleGet() {
    const LongestTitle = [
        document.title,
        document.querySelector('h1')?.innerText || '',
    ]
        .map((str) => str.replace(/\r?\n.*/g, ''))
        .sort((a, b) => a.length - b.length)
        .pop();
    return LongestTitle;
}
function textCopy(content) {
    const input = document.createElement('textarea');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', content);
    input.innerHTML = content;
    input.setAttribute(
        'style',
        'position: fixed; top:0; left:0;z-index: 9999'
    );
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    let ok = false;
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        ok = true;
    }
    document.body.removeChild(input);
    ok && alert('Title Copied\n' + content);
    ok || alert('copy title failed, please check browser version');
    return ok || false;
}