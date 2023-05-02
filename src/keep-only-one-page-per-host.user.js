// ==UserScript==
// @name             [SNOLAB] Keep only one page per domain
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      Keep only one page per domain
// @author           snomiao@gmail.com
// @match            *://*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript/issues
// ==/UserScript==

window === window.open(location.href + "#", location.hostname) ||
  window.open("", "_self").close();
