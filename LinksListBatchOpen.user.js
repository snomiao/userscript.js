// ==UserScript==
// @name            LinksListBatchOpen
// @name:zh         Alt + 123... 一键批量打开谷歌必应搜索的前2的n次方项搜索结果
// @namespace       snomiao@gmail.com
// @version         1.0.0
// @description  To quickly understand a field, press Alt+1 ...2,3,4...Alt+5 on the search page of Google or Bing to open the search results of the first 2 nth power items and copy the opened ones link. Currently supports: Google, Bing, Zhihu.
// @description:zh  快速了解一个领域用，在谷歌或必应的搜索页面 按 Alt+1 ...2,3,4... Alt+5  将会打开前2的n次方项的搜索结果，并复制打开的链接。目前支持：谷歌、必应、知乎。
// @author          snomiao
// @match           *
// @grant           none
// ==/UserScript==

const 最长共列输出 = (矩阵, a, b, x, y) =>
    !x || !y
        ? ''
        : a[x - 1] === b[y - 1]
            ? 最长共列输出(矩阵, a, b, x - 1, y - 1) + a[x - 1]
            : 矩阵[y][x - 1] > 矩阵[y - 1][x]
                ? 最长共列输出(矩阵, a, b, x - 1, y)
                : 最长共列输出(矩阵, a, b, x, y - 1)
const 最长共列 = (a, b) => {
    const w = a.length, h = b.length
    const m = Array(1 + h).fill(0).map(() => Array(1 + w).fill(0))
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++)
            m[1 + y][1 + x] =
                a[x] === b[y]
                    ? m[y][x] + 1
                    : Math.max(m[y][1 + x], m[1 + y][x])
    false && console.table(m)
    return 最长共列输出(m, a, b, w, h)
}
const 元素特征列取 = (e) => [...e.querySelectorAll('*')]
    .map(e => e?.tagName + e?.className)
const 元素列表强度 = e => e.textContent.length * (e.children.length - 1)
    * [...e.children]
        .filter(e => !'style script'.toUpperCase().split(' ').includes(e.tagName))
        .map(元素特征列取)
        .map((_, i, a) => 最长共列(a[i], a[i + 1] || []))
        .reduce((前, 后) => 前 + 后.length, 0)
const 列元素列提取 = () => [...document.querySelectorAll('div,dl,ul,ol,tbody,table,td')]
    .filter(e => e.children.length > 1)
    .map(e => [元素列表强度(e), e, [...e.children]
        .filter(e => !'style script span'.split(' ').includes(e.tagName))
        .map(元素特征列取)])
    .sort((a, b) => a[0] - b[0])
    .reverse()
const 标链元素提取 = e =>
    (e
        ?.querySelector('dd,dt,h1,h2,h3,h4,h5,h6')
        ?.querySelector('a'))
    || ([...e?.querySelectorAll('a')]
        ?.filter(e => e.querySelector('dd,dt,h1,h2,h3,h4,h5,h6'))
        ?.[0])
    || e?.querySelector('a')
const 标链提取 = (e) => e && [
    e?.textContent?.replace(/\s+/g, ' ').trim(),
    e?.href]
const 页主标链列提取 = () => 列元素列提取()
    .filter((x, i, a) => a[i][0] > a[0][0] * 0.1)
    .sort((a, b) => a[1].offsetTop - b[1].offsetTop)
    .map(([r, e]) => e)
    .flatMap(e => [
        ...e?.children]
        ?.map?.(标链元素提取)
        ?.map?.(标链提取) || [])
    .filter(e => e)
const 文本复制 = (内容) => {
    const input = document.createElement('textarea');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', 内容);
    input.innerHTML = (内容);
    input.setAttribute('style', 'position: fixed; top:0; left:0;z-index: 9999');
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log(`长度为${内容.length}的内容已复制`);
    } else {
        // alert(`长度为${内容.length}的内容复制失败，请检查浏览器配置，或在页面上先按一下键盘任意键解除剪贴板保护`);
    }
    document.body.removeChild(input);
};
const 已打开过的链接 = {}
const 链接打开 = (链接) => { if (!已打开过的链接[链接]) { window.open(链接) }; 已打开过的链接[链接] = 1 };
const 链接列获取 = 数量 => 页主标链列提取()
    .map(([标题, 链接]) => ({ 标题, 链接 }))
    .slice(0, 数量)
    .reverse() //在 chrome 下需要反过来。。
const 打开一定数量链接 = (数量) => {
    const 链接列 = 链接列获取(数量)
    文本复制(链接列.map(({ 标题, 链接 }) => "#" + 标题 + '\n' + 链接).join('\n\n'))
    链接列.map(({ 链接 }) => 链接).map(链接打开)
}
window.addEventListener("keydown", (e) => {
    if (!e.ctrlKey && !e.shiftKey && e.altKey && e.key.match(/[1-9]/)) {
        const 打开数量 = 2 ** parseInt(e.key)
        打开一定数量链接(打开数量)
    }
})
console.log("[loaded]: 谷歌一键打开前N项搜索结果, Copy")