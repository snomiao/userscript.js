// ==UserScript==
// @name             [SNOLAB] Alt + 123... Searching Results Links List Batch Open
// @name:zh          [雪星实验室] Alt + 123... 一键批量打开谷歌必应搜索的前2的n次方项搜索结果
// @namespace        https://userscript.snomiao.com/
// @version          1.1.0
// @description      To quickly understand a field, press Alt+1 ...2,3,4...Alt+5 on the search page of Google or Bing to open the search results of the first 2 nth power items and copy the opened ones link. Currently supports: Google, Bing, Zhihu.
// @description:zh   快速了解一个领域用，在谷歌或必应的搜索页面 按 Alt+1 ...2,3,4... Alt+5  将会打开前2的n次方项的搜索结果，并复制打开的链接。目前支持：谷歌、必应、知乎。
// @author           snomiao@gmail.com
// @match            *://google.com/*
// @match            *://bing.com/*
// @match            *://youtube.com/*
// @match            *://zhihu.com/*
// @match            *://and-all-searching-results.com/*
// @match            *://*/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==

import hotkeyMapper from "hotkey-mapper";
import { $$ } from "./$$";
type Link = { title: string; link: string };
globalThis.llboUnload?.();
globalThis.llboUnload = main();

function main() {
  console.log("[Links List Batch Open] LOADED");
  // 链接列获取();
  const linkAlreadyOpened = new Set();
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
      "alt+shift+1": () => tryCopyLinkByCount(2 ** 1),
      "alt+shift+2": () => tryCopyLinkByCount(2 ** 2),
      "alt+shift+3": () => tryCopyLinkByCount(2 ** 3),
      "alt+shift+4": () => tryCopyLinkByCount(2 ** 4),
      "alt+shift+5": () => tryCopyLinkByCount(2 ** 5),
      "alt+shift+6": () => tryCopyLinkByCount(2 ** 6),
      "alt+shift+7": () => tryCopyLinkByCount(2 ** 7),
      "alt+shift+8": () => tryCopyLinkByCount(2 ** 8),
      "alt+shi  ft+9": () => tryCopyLinkByCount(2 ** 9),
    },
    { capture: true, on: "keydown" }
  );
  function linkOpen(link: string) {
    if (!linkAlreadyOpened.has(link)) {
      window.open(link);
    }
    linkAlreadyOpened.add(link);
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
  const md = links.map(markdownLinksGenerate).join("\n\n");
  alert("copied links: " + md);
  await navigator.clipboard.writeText(md);
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
    Math.log(1 + (ele.textContent || "").length) *
    (ele.children.length - 1) *
    ([...ele.children] as HTMLElement[])
      .filter(featureElementAsk)
      .map(elementFeatureList)
      .map((_, i, a) => longestCommonSequence(a[i], a[i + 1] || []))
      .reduce((前, 后) => 前 + 后.length, 0)
  );
}
function listElementList() {
  const elements = $$("div,dl,ul,ol,tbody,table,td");
  const sorted = elements
    .filter((e) => e.children.length > 1)
    .map((element) => {
      const children = [...element.children] as HTMLElement[];
      return {
        element,
        strength: elementListStrengh(element),
        featureList: children
          .filter(featureElementAsk)
          //filter((e) => !["style", "script", "span"].includes(e.tagName))
          .map(elementFeatureList),
      };
    });
  return sortBy((a) => -a.strength, sorted);
}
function titleLinkElementExtract(e) {
  return (
    e?.querySelector("dd,dt,h1,h2,h3,h4,h5,h6")?.querySelector("a") ||
    [...e?.querySelectorAll("a")]?.filter((e) =>
      e.querySelector("dd,dt,h1,h2,h3,h4,h5,h6")
    )?.[0] ||
    e?.querySelector("a")
  );
}
function titleLinkExtract(element: HTMLElement) {
  return {
    element,
    title: element?.textContent?.replace(/\s+/g, " ").trim(),
    link: (element as HTMLAnchorElement)?.href,
  };
}
function pageMainTitleLinkListExtract() {
  const list = listElementList();
  const filteredList = list
    // 不包含更強的子節点
    .flatMap((father, i, a) =>
      a.some(
        (son, j) =>
          i != j &&
          father.element.contains(son.element) &&
          son.strength > father.strength
      )
        ? []
        : [father]
    )
    // 按最强者 10% 筛选
    .flatMap((e, _i, a) => (e.strength > a[0].strength * 0.1 ? [e] : []));
  // 按屏幕垂直位置排序 / sorted by vertical position at first, and then horizonal position
  const sortedList = sortBy(
    (a) => a.element.offsetTop * window.outerWidth + a.element.offsetLeft,
    filteredList
  );
  const result = sortedList
    // 元素提取
    .map(({ element }) => element)
    .flatMap((e) => [...e?.children]?.map?.(titleLinkElementExtract) || [])
    .flatMap((e) => (e ? [e] : []))
    .map(titleLinkExtract)
    .flatMap((e) => (e.title ? [e] : []))
    .flatMap((e) => (e.link?.match?.(/^http/) ? [e] : []));
  // .filter(({ element, strength, featureList }) => !console.log(element, strength, featureList)), // 元素提取debug
  return result;
}

function getLinks(数量 = Infinity) {
  return pageMainTitleLinkListExtract().slice(0, 数量);
}
function markdownLinksGenerate({ title, link }: Link) {
  return `- [${title}](${link})`;
}

type Ord = number | string | boolean | Date;
/**
 * It returns copy of `list` sorted by `sortFn` function, where `sortFn` function returns a value to compare, i.e. it doesn't need to return only `-1`, `0` or `1`.
 */
function sortBy<T>(sortFn: (a: T) => Ord, list: T[]): T[];
// function sortBy<T>(sortFn: (a: T) => Ord): (list: T[]) => T[];
// function sortBy(sortFn: (a: any) => Ord): <T>(list: T[]) => T[];
function sortBy(sortFn, list) {
  if (arguments.length === 1) return (_list) => sortBy(sortFn, _list);
  const clone = [...list];
  return clone.sort((a, b) => {
    const aSortResult = sortFn(a);
    const bSortResult = sortFn(b);
    if (aSortResult === bSortResult) return 0;
    return aSortResult < bSortResult ? -1 : 1;
  });
}
