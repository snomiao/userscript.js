// ==UserScript==
// @name         YoutubeAllResultsPushToQueuePlay
// @namespace    snomiao@gmail.com
// @version      0.0.1
// @description  Youtube Search Results Pages Push To Queue To Play Button
// @author       snomiao@gmail.com
// @match        https://www.youtube.com/results?search_query=*
// @grant        none
// ==/UserScript==

var 睡 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
var 有值等待 = async(qf,timeout, interval = 1000/50)=>{var ts = +new Date();let re; while(+new Date() -ts <= timeout){re =  qf() ; if(re) return re ;  await 睡(interval); }; return null}

async function AllResultsPushToQueuePlay() {
    const vs = (qsa)("ytd-video-renderer")
    let i = 0
    for await (const e of vs) {
        await menuClick(e, i)
    }
}

async function menuClick(e, i) {
    e.style.background = "#FF0";
    e.querySelector(".dropdown-trigger button").click();
    var btn = await 有值等待(document.querySelector("tp-yt-iron-dropdown[focused] ytd-menu-service-item-renderer"))
    document.querySelector("ytd-menu-service-item-renderer").click();
    e.querySelector(".dropdown-trigger button").click();
    await 有值等待(document.querySelector("tp-yt-iron-dropdown[aria-hidden] ytd-menu-service-item-renderer"))
    e.style.background = "";
    await 睡(100)
}

function qsa(sel) {
    return [...document.querySelectorAll(sel)];
}

var 新元素 = (innerHTML, attributes = {}) =>
    Object.assign(
        Object.assign(document.createElement("div"), {innerHTML}).children[0]
    , attributes)
var icon = `<yt-icon id="icon" className="style-scope ytd-thumbnail-overlay-toggle-button-renderer">
<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}}>
<g className="style-scope yt-icon"><path d="M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z" className="style-scope yt-icon" />
</g>
</svg>
</yt-icon>`
var onclick = () => AllResultsPushToQueuePlay()
var e = 新元素(`<button><div>全部视频向播放列表添加<br>AllResultsPushToQueuePlay</div></button>`, {onclick})

filterBtn = qsa('ytd-toggle-button-renderer').filter(e=>e.textContent.match('过滤'))[0]
filterBtn.AllResultsPushToQueuePlay?.remove()
filterBtn.AllResultsPushToQueuePlay = e
filterBtn.parentElement.append(e)
