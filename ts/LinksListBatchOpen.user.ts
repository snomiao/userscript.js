// ==UserScript==
// @name            [SNOLAB] Alt + 123... Searching Results Links List Batch Open
// @name:zh         [雪星实验室] Alt + 123... 一键批量打开谷歌必应搜索的前2的n次方项搜索结果
// @namespace       snomiao@gmail.com
// @version         1.0.5
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
import clipboardy from "clipboardy";
import hotkeyMapper from "hotkey-mapper";
import { filter, map, pipe, sortBy } from "rambda";
import { $$ } from "./$$";

type Link = {
  title: string;
  link: string;
};
globalThis.llboUnload?.();
globalThis.llboUnload = main();
function main() {
  console.log("[谷歌一键打开前N项搜索结果] LOADED");
  // 链接列获取();
  const 已打开过的链接 = {};
  return hotkeyMapper(
    {
      "alt+1": () => openLinkByCount(2 ** 1),
      "alt+2": () => openLinkByCount(2 ** 2),
      "alt+3": () => openLinkByCount(2 ** 3),
      "alt+4": () => openLinkByCount(2 ** 4),
      "alt+5": () => openLinkByCount(2 ** 5),
      "alt+6": () => openLinkByCount(2 ** 6),
      "alt+7": () => openLinkByCount(2 ** 7),
      "alt+8": () => openLinkByCount(2 ** 8),
      "alt+9": () => openLinkByCount(2 ** 9),
      "shift+alt+1": () => tryCopyLinkByCount(2 ** 1),
      "shift+alt+2": () => tryCopyLinkByCount(2 ** 2),
      "shift+alt+3": () => tryCopyLinkByCount(2 ** 3),
      "shift+alt+4": () => tryCopyLinkByCount(2 ** 4),
      "shift+alt+5": () => tryCopyLinkByCount(2 ** 5),
      "shift+alt+6": () => tryCopyLinkByCount(2 ** 6),
      "shift+alt+7": () => tryCopyLinkByCount(2 ** 7),
      "shift+alt+8": () => tryCopyLinkByCount(2 ** 8),
      "shift+alt+9": () => tryCopyLinkByCount(2 ** 9),
    },
    undefined,
    true
  );
  function linkOpen(link: string) {
    if (!已打开过的链接[link]) {
      window.open(link);
    }
    已打开过的链接[link] = 1;
  }
  function openLinkByCount(count = 1) {
    console.log("openLinkByCount", count);

    const links = getLinks(count);
    copyLinks(links);
    links
      .map((e) => e.link)
      .reverse()
      .map(linkOpen);
  }
}

function tryCopyLinkByCount(count = 1) {
  const links = getLinks(count);
  copyLinks(links);
  return links;
}

async function copyLinks(links: Link[]) {
  const md = links.map(md格式链接生成).join("\n\n");
  alert("copied links: " + md);
  await clipboardy.write(md);
}

function longestCommonSequenceMatrix(m: number[][], a, b, x, y) {
  const lcs = longestCommonSequenceMatrix;
  return !x || !y
    ? ""
    : a[x - 1] === b[y - 1]
    ? lcs(m, a, b, x - 1, y - 1) + a[x - 1]
    : m[y][x - 1] > m[y - 1][x]
    ? lcs(m, a, b, x - 1, y)
    : lcs(m, a, b, x, y - 1);
}
function longestCommonSequence<T>(a: T[], b: T[]) {
  const w = a.length,
    h = b.length;
  const m = Array(1 + h)
    .fill(0)
    .map(() => Array(1 + w).fill(0));
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      m[1 + y][1 + x] =
        a[x] === b[y] ? m[y][x] + 1 : Math.max(m[y][1 + x], m[1 + y][x]);
  false && console.table(m);
  return longestCommonSequenceMatrix(m, a, b, w, h);
}
function elementFeatureList(ele: HTMLElement) {
  return [...ele.querySelectorAll("*")].map((e) => e?.tagName + e?.className);
}
function featureElementAsk(ele: HTMLElement) {
  return !"style script span".toUpperCase().split(" ").includes(ele.tagName);
}
function elementListStrengh(ele: HTMLElement) {
  return (
    (ele.textContent || "").length *
    (ele.children.length - 1) *
    ([...ele.children] as HTMLElement[])
      .filter(featureElementAsk)
      .map(elementFeatureList)
      .map((_, i, a) => longestCommonSequence(a[i], a[i + 1] || []))
      .reduce((前, 后) => 前 + 后.length, 0)
  );
}
function listElementList() {
  return pipe(
    () => $$("div,dl,ul,ol,tbody,table,td"),
    filter((e) => e.children.length > 1),
    map((element) => ({
      element,
      strength: elementListStrengh(element),
      featureList: pipe(
        () => [...element.children] as HTMLElement[],
        filter(featureElementAsk),
        //filter((e) => !["style", "script", "span"].includes(e.tagName))
        map(elementFeatureList)
      )(),
    })),
    sortBy((a) => -a.strength)
  )();
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
function 标链提取(element: HTMLElement) {
  return {
    element,
    title: element?.textContent?.replace(/\s+/g, " ").trim(),
    link: (element as HTMLAnchorElement)?.href,
  };
}
function 页主标链列提取() {
  return pipe(
    () => listElementList(),
    // 不互相包含
    (list) =>
      list.flatMap((father, i, a) =>
        !a.some((son, j) => i != j && father?.element.contains(son.element))
          ? [father]
          : []
      ),
    // 按最强者 10% 筛选
    (list) =>
      list.flatMap((e, i, a) => (e.strength > a[0].strength * 0.1 ? [e] : [])),
    // 按屏幕垂直位置排序
    sortBy((a) => a.element.offsetTop),
    // filter(({ element, strength, featureList }) => !console.log(element, strength, featureList)), // 元素提取debug
    map(({ element }) => element), // 元素提取
    (e) => e.flatMap((e) => [...e?.children]?.map?.(标链元素提取) || []),
    filter((e) => e),
    map(标链提取),
    filter(({ title, link }) => title),
    filter(({ title, link }) => link?.match?.(/^http/))
  )();
}

function getLinks(数量 = Infinity) {
  return 页主标链列提取().slice(0, 数量);
}
function md格式链接生成({ title, link }: Link) {
  return `- [${title}](${link})`;
}
