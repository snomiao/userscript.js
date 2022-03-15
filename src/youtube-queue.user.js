// ==UserScript==
// @name             YoutubeAllResultsPushToQueuePlay
// @namespace        snomiao@gmail.com
// @version          0.0.6
// @description      Youtube Search Results Pages Push To Queue To Play Button
// @author           snomiao
// @copyright        2021, snomiao (snomiao.com)
// @match            *://www.youtube.com/results*
// @match            *://youtube.com/results*
// @supportURL       https://github.com/snomiao/userscript.js/issues
// @contributionURL  https://www.paypal.com/donate/?cmd=_donations&business=snomiao@gmail.com&item_name=Greasy+Fork+donation
// @grant            none
// @noframes
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
    e.style.background = '#FF0';
    //   expand and click
    (await 元素等待(e, '.dropdown-trigger button')).click();
    //   await 睡(500);
    (
        await 元素等待(
            document,
            'tp-yt-iron-dropdown[focused] ytd-menu-service-item-renderer'
        )
    ).click();
    // fold... and wait it close
    (await 元素等待(e, '.dropdown-trigger button')).click();
    await 元素等待(
        document,
        `tp-yt-iron-dropdown[aria-hidden] ytd-menu-service-item-renderer`
    );
    e.style.background = '';
    await 睡(100);
};

const AllResultsPushToQueuePlay = async function () {
    // clean list
    // ytp-miniplayer-close-button
    const vs = qsa('ytd-video-renderer');
    for await (const e of vs) {
        await menuClick(e);
    }
};
const 新元素 = (innerHTML, attributes = {}) => {
    return Object.assign(
        Object.assign(document.createElement('div'), { innerHTML }).children[0],
        attributes
    );
};

function btnAdd() {
    const onclick = () => AllResultsPushToQueuePlay();
    const e = 新元素(
        `<button><div>全部视频向播放列表添加<br>AllResultsPushToQueuePlay</div></button>`,
        { onclick }
    );
    const filterBtn = qsa('ytd-toggle-button-renderer').filter((e) =>
        e.textContent.match('过滤')
    )[0];
    if (!filterBtn) return setTimeout(btnAdd, 1000);
    filterBtn.AllResultsPushToQueuePlay?.remove();
    filterBtn.AllResultsPushToQueuePlay = e;
    filterBtn.parentElement.append(e);
}
// document.addEventListener('load', btnAdd, false);
// window.addEventListener('load', btnAdd, false);
btnAdd();
