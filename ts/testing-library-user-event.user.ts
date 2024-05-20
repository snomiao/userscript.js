// ==UserScript==
// @name             testing-library-user-event
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      import "@testing-library/dom" and "@testing-library/user-event" into globalThis
// @author           snomiao@gmail.com
// @match            *://*/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==

console.log("@testing-library/user-event");

import * as dom from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

globalThis.dom = dom;
globalThis.userEvent = userEvent;
console.log("testing-library", { dom, userEvent });
