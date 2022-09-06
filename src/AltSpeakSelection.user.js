// ==UserScript==
// @name            Alt Speak Selection
// @description     Press Alt to Speak currently Selection.
// @namespace       https://userscript.snomiao.com/
// @version         0.1.0
// @author          snomiao@gmail.com
// @match           *://*/*
// @grant           none
// ==/UserScript==

window.addEventListener('keyup', (e)=>e.key ==='Alt' && (speechSynthesis.cancel(), speechSynthesis.speak(new SpeechSynthesisUtterance(window.getSelection().toString()))))