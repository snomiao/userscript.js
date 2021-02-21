// ==UserScript==
// @name         Google I'm Feeling Lucky Redirect
// @namespace    https://snomiao.com/
// @version      0.2
// @description  Immediately redirects when google prompts 'redirection notice'. Used to circumvent google pestering you when querying with I'm Feeling Lucky feature.
// @author       snomiao
// @include      https://www.google.com/url?*
// @run-at       document-start
// ==/UserScript==

// ref: [Workaround for Google I'm Feeling Lucky Redirect]( https://greasyfork.org/en/scripts/390770-workaround-for-google-i-m-feeling-lucky-redirect )

const search = Object.fromEntries(location.search.slice(1).split('&').map(e=>e.split('=')))
location = search.q