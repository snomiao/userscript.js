// ==UserScript==
// @name         YoutubeAllResultsPushToQueuePlay
// @namespace    snomiao@gmail.com
// @version      0.0.1
// @description  Youtube Search Results Pages Push To Queue To Play Button
// @author       snomiao@gmail.com
// @copyright    2021, snomiao (snomiao.com)
// @match        https://www.youtube.com/results?search_query=*
// @grant        none
// ==/UserScript==

const qsa = (sel) => [...document.querySelectorAll(sel)];
const 睡 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const 非空值等待 = async (qf, timeout = 1000, interval = 500) => {
  var ts = +new Date();
  while (+new Date() - ts <= timeout) {
    let re = await qf();
    if (undefined !== re && null !== re) return re;
    await 睡(interval);
  }
  return null;
};
const 元素等待 = async (e, sel) => await 非空值等待(() => e.querySelector(sel));
const menuClick = async (e) => {
  e.style.background = "#FF0";
  //   expand and click
  (await 元素等待(e, ".dropdown-trigger button")).click();
  //   await 睡(500);
  (
    await 元素等待(
      document,
      "tp-yt-iron-dropdown[focused] ytd-menu-service-item-renderer"
    )
  ).click();
  // fold... and wait it close
  (await 元素等待(e, ".dropdown-trigger button")).click();
  await 元素等待(
    document,
    `tp-yt-iron-dropdown[aria-hidden] ytd-menu-service-item-renderer`
  );
  e.style.background = "";
  await 睡(100);
};

const AllResultsPushToQueuePlay = async function () {
  const vs = qsa("ytd-video-renderer").slice(0, 10);
  for await (const e of vs) {
    await menuClick(e);
  }
};
const 新元素 = (innerHTML, attributes = {}) => {
  return Object.assign(
    Object.assign(document.createElement("div"), { innerHTML }).children[0],
    attributes
  );
};

function btnAdd() {
  const icon = `<yt-icon id="icon" className="style-scope ytd-thumbnail-overlay-toggle-button-renderer">
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{pointerEvents: 'none', display: 'block', width: '100%', height: '100%'}}>
    <g className="style-scope yt-icon"><path d="M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z" className="style-scope yt-icon" />
    </g>
    </svg>
    </yt-icon>`;
  const onclick = () => AllResultsPushToQueuePlay();
  const e = 新元素(
    `<button><div>全部视频向播放列表添加<br>AllResultsPushToQueuePlay</div></button>`,
    { onclick }
  );
  const filterBtn = qsa("ytd-toggle-button-renderer").filter((e) =>
    e.textContent.match("过滤")
  )[0];
  filterBtn.AllResultsPushToQueuePlay?.remove();
  filterBtn.AllResultsPushToQueuePlay = e;
  filterBtn.parentElement.append(e);
}

btnAdd();
