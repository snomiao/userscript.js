// ==UserScript==
// @name               Telegram Speaker
// @namespace          snomiao@gmail.com
// @author             snomiao@gmail.com
// @version            0.0.1
// @description        Speak latest telegram message
// @match              https://*.telegram.org/z/
// @grant              none
// @run-at             document-start
// @license            GPL-3.0+
// @supportURL         https://github.com/snomiao/userscript.js/issues
// @contributionURL    https://snomiao.com/donate
// ==/UserScript==
// 
// Prepare scripts sample:
// 
// npm i -g piserve snosay
// piserve | snosay --voice "Microsoft Huihui Desktop"
// 
const lastMsg = ()=>[...document.querySelectorAll('.Message:not(.own) .text-content')].map(e=>e.textContent).reverse()[0]
const say = (s)=> s && fetch('http://localhost:25971/?text='+encodeURIComponent(s))
const chagnedFilterMaker = (init)=>(e )=> e !== init? (init =e): undefined
const changedFilter = chagnedFilterMaker('')
const looper = ()=>(say(changedFilter(lastMsg())), 1)
while(looper()) await new Promise(r=>setTimeout(r,1000))
