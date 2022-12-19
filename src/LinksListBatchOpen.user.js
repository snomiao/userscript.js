// ==UserScript==
// @name            [SNOLAB] Alt + 123... Searching Results Links List Batch Open
// @name:zh         [雪星实验室] Alt + 123... 一键批量打开谷歌必应搜索的前2的n次方项搜索结果
// @namespace       snomiao@gmail.com
// @version         1.0.4
// @description     To quickly understand a field, press Alt+1 ...2,3,4...Alt+5 on the search page of Google or Bing to open the search results of the first 2 nth power items and copy the opened ones link. Currently supports: Google, Bing, Zhihu.
// @description:zh  快速了解一个领域用，在谷歌或必应的搜索页面 按 Alt+1 ...2,3,4... Alt+5  将会打开前2的n次方项的搜索结果，并复制打开的链接。目前支持：谷歌、必应、知乎。
// @author          snomiao
// @match           *://google.com/*
// @match           *://bing.com/*
// @match           *://youtube.com/*
// @match           *://zhihu.com/*
// @match           *://and-all-searching-results.com/*
// @match           *://*/*
// @grant           none
// ==/UserScript==

/*
TODO 修复列表识别算法于Google学术搜索的错误
错误例子
	[中国能源统计年鉴 - Google 学术搜索]( https://scholar.google.com/scholar?q=%E4%B8%AD%E5%9B%BD%E8%83%BD%E6%BA%90%E7%BB%9F%E8%AE%A1%E5%B9%B4%E9%89%B4&hl=zh-CN&as_sdt=0&as_vis=1&oi=scholart )
*/

globalThis.LinksListBatchUnload?.();
globalThis.LinksListBatchUnload = hotkeyMapper({
    "alt+1": () => tryOpenLinkByCount(2 ** 1),
    "alt+2": () => tryOpenLinkByCount(2 ** 2),
    "alt+3": () => tryOpenLinkByCount(2 ** 3),
    "alt+4": () => tryOpenLinkByCount(2 ** 4),
    "alt+5": () => tryOpenLinkByCount(2 ** 5),
    "alt+6": () => tryOpenLinkByCount(2 ** 6),
    "alt+7": () => tryOpenLinkByCount(2 ** 7),
    "alt+8": () => tryOpenLinkByCount(2 ** 8),
    "alt+9": () => tryOpenLinkByCount(2 ** 9),
    "shift+alt+1": () => tryCopyLinkByCount(2 ** 1),
    "shift+alt+2": () => tryCopyLinkByCount(2 ** 2),
    "shift+alt+3": () => tryCopyLinkByCount(2 ** 3),
    "shift+alt+4": () => tryCopyLinkByCount(2 ** 4),
    "shift+alt+5": () => tryCopyLinkByCount(2 ** 5),
    "shift+alt+6": () => tryCopyLinkByCount(2 ** 6),
    "shift+alt+7": () => tryCopyLinkByCount(2 ** 7),
    "shift+alt+8": () => tryCopyLinkByCount(2 ** 8),
    "shift+alt+9": () => tryCopyLinkByCount(2 ** 9),
});

// console.log('[谷歌一键打开前N项搜索结果] LOADED');
// 链接列获取();

function tryOpenLinkByCount(count = 1) {
    const links = getLinks(count);
    copyLinks(links);
    //在 chrome 下需要反过来才能让第1个链接先打开。。;
    links
        .map(({ 链接 }) => 链接)
        .reverse()
        .map(链接打开);
}

function tryCopyLinkByCount(count = 1) {
    const links = getLinks(count);
    copyLinks(links);
    return links;
}

function copyLinks(links) {
    textCopy(links.map(md格式链接生成).join("\n\n"));
}

function 最长共列阵输出(矩阵, a, b, x, y) {
    return !x || !y
        ? ""
        : a[x - 1] === b[y - 1]
        ? 最长共列阵输出(矩阵, a, b, x - 1, y - 1) + a[x - 1]
        : 矩阵[y][x - 1] > 矩阵[y - 1][x]
        ? 最长共列阵输出(矩阵, a, b, x - 1, y)
        : 最长共列阵输出(矩阵, a, b, x, y - 1);
}
function 最长共列(a, b) {
    const w = a.length,
        h = b.length;
    const m = Array(1 + h)
        .fill(0)
        .map(() => Array(1 + w).fill(0));
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++)
            m[1 + y][1 + x] =
                a[x] === b[y]
                    ? m[y][x] + 1
                    : Math.max(m[y][1 + x], m[1 + y][x]);
    false && console.table(m);
    return 最长共列阵输出(m, a, b, w, h);
}
function 元素特征列取(e) {
    return [...e.querySelectorAll("*")].map((e) => e?.tagName + e?.className);
}
function 特征元素筛函数(e) {
    return !"style script span".toUpperCase().split(" ").includes(e.tagName);
}
function 元素列表强度(e) {
    return (
        e.textContent.length *
        (e.children.length - 1) *
        [...e.children]
            .filter(特征元素筛函数)
            .map(元素特征列取)
            .map((_, i, a) => 最长共列(a[i], a[i + 1] || []))
            .reduce((前, 后) => 前 + 后.length, 0)
    );
}
function 列元素列提取() {
    return [...document.querySelectorAll("div,dl,ul,ol,tbody,table,td")]
        .filter((e) => e.children.length > 1)
        .map((元素) => ({
            元素,
            强度: 元素列表强度(元素),
            特征列: [...元素.children]
                .filter(特征元素筛函数)
                // .filter((e) => !["style", "script", "span"].includes(e.tagName))
                .map(元素特征列取),
        }))
        .sort((a, b) => -(a.强度 - b.强度));
}
function 标链元素提取(e) {
    return (
        e?.querySelector("dd,dt,h1,h2,h3,h4,h5,h6")?.querySelector("a") ||
        [...e?.querySelectorAll("a")]?.filter((e) =>
            e.querySelector("dd,dt,h1,h2,h3,h4,h5,h6")
        )?.[0] ||
        e?.querySelector("a")
    );
}
function 标链提取(元素) {
    return {
        元素,
        标题: 元素?.textContent?.replace(/\s+/g, " ").trim(),
        链接: 元素?.href,
    };
}
function 子列父亲节点筛函数(eFa, i, a) {
    return !a.some((eSon, j) => i != j && eFa.元素.contains(eSon.元素));
}
function 页主标链列提取() {
    return 列元素列提取()
        .filter(子列父亲节点筛函数)
        .filter((e, _, a) => e.强度 > a[0].强度 * 0.1) // 按最强者 10% 筛选
        .sort((a, b) => a.元素.offsetTop - b.元素.offsetTop) // 按垂直位置对比
        .filter(({ 元素, 强度, 特征列 }) => !console.log(元素, 强度, 特征列)) // 元素提取debug
        .map(({ 元素 }) => 元素) // 元素提取
        .flatMap((e) => [...e?.children]?.map?.(标链元素提取) || [])
        .filter((e) => e)
        .map(标链提取)
        .filter(({ 标题, 链接 }) => 标题)
        .filter(({ 标题, 链接 }) => 链接?.match?.(/^http/));
}
function textCopy(内容) {
    const input = document.createElement("textarea");
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", 内容);
    input.innerHTML = 内容;
    input.setAttribute("style", "position: fixed; top:0; left:0;z-index: 9999");
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    if (document.execCommand("copy")) {
        document.execCommand("copy");
        console.log(`长度为${内容.length}的内容已复制`);
    } else {
        // alert(`长度为${内容.length}的内容复制失败，请检查浏览器配置，或在页面上先按一下键盘任意键解除剪贴板保护`);
    }
    document.body.removeChild(input);
}
const 已打开过的链接 = {};
function 链接打开(链接) {
    if (!已打开过的链接[链接]) {
        window.open(链接);
    }
    已打开过的链接[链接] = 1;
}
function getLinks(数量 = Infinity) {
    return 页主标链列提取().slice(0, 数量);
}
function md格式链接生成({ 标题, 链接 }) {
    return `- [${标题}](${链接})`;
}
function hotkeyMapper(mapping) {
    const handlers = mapObjIndexed(hotkeyHandler, mapping);
    mapObjIndexed(
        (handler) => window.addEventListener("keydown", handler),
        handlers
    );
    return function unload() {
        return mapObjIndexed(
            (handler) => window.removeEventListener("keydown", handler),
            handlers
        );
    };
    function hotkeyHandler(fn, hotkey) {
        return (e) => {
            e[`${e.key}Key`] = true;
            const mods = "meta+alt+shift+ctrl";
            const conds = `${mods}+${hotkey}`
                .replace(/win|command|search/, "meta")
                .replace(/control/, "ctrl")
                .split("+")
                .map((k, i) => [k, Boolean(i >= 4) === Boolean(e[`${k}Key`])]);
            const covered = Object.entries(Object.fromEntries(conds));
            const matched = covered.every(([keyName, pass]) => pass);
            if (!matched) return;
            e.stopPropagation();
            e.preventDefault();
            return fn(e);
        };
    }
}

function mapObjIndexed(fn, obj) {
    if (arguments.length === 1) {
        return (_obj) => mapObject(fn, _obj);
    }
    let index = 0;
    const objKeys = keys(obj);
    const len = objKeys.length;
    const willReturn = {};
    while (index < len) {
        const key = objKeys[index];
        willReturn[key] = fn(obj[key], key, obj);
        index++;
    }
    return willReturn;
}
