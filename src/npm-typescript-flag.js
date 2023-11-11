// ==UserScript==
// @name             [SNOLAB] NPM Typescript Flag
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      Show "Dt" and "Ts" Icon on npm package search result.
// @author           snomiao@gmail.com
// @match            *://www.npmjs.com/search*
// @match            *://npmjs.com/search*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==

const observer = new IntersectionObserver((entries) =>
  entries.forEach(async (entry) => {
    if (!entry.isIntersecting) return;
    const h3 = entry.target;
    if (h3.ariaChecked) return;
    //const rect = h3.getBoundingClientRect();
    //const isVisible = 0 < rect.bottom  && rect.top < window.innerHeight;
    // if(!isVisible) return;
    const pathname = h3.parentElement.pathname;
    const content = await (
      await fetch(pathname, { cache: "force-cache" })
    ).text();
    const hasDt =
      content.match(
        '(?<="true">)<img.*?This package has TypeScript declarations provided by.*?/>'
      )?.[0] ?? "";
    const hasTs =
      content.match(
        '(?<="true">)<img.*?This package contains built-in TypeScript declarations.*?/>'
      )?.[0] ?? "";
    h3.innerHTML = h3.innerText + " / " + hasDt + hasTs;
    console.log({ pathname, hasDt, hasTs });
    h3.ariaChecked = true;
  })
);

function $$(sel, el = document) {
  return [...el.querySelectorAll(sel)];
}

$$("a>h3").forEach(async (h3) => observer.observe(h3));
