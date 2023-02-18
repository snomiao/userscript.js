// ==UserScript==
// @name         Google I'm Feeling Lucky Redirect
// @namespace    https://snomiao.com/
// @version      0.3.0
// @description  Immediately redirects when google prompts 'redirection notice'. Used to circumvent google pestering you when querying with I'm Feeling Lucky feature.
// @author       snomiao
// @include      https://www.google.com/url?*
// @run-at       document-start
// @github       https://github.com/snomiao/userscript.js/blob/master/GoogleImFeelingLuckyRedirect.user.js
// ==/UserScript==

// ref: [Workaround for Google I'm Feeling Lucky Redirect]( https://greasyfork.org/en/scripts/390770-workaround-for-google-i-m-feeling-lucky-redirect )

const url = Object.fromEntries(
  location.search
    .slice(1)
    .split("&")
    .map((e) => e.split("="))
).q;
if (url) location = url;
