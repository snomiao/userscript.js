// ==UserScript==
// @name         淘宝、京东、天猫自动按每斤价格排序 TAOBAO/JD/TMALL / Automatic sort by 500g price.
// @namespace    snomiao@gmail.com
// @version      1.1.5
// @description  已知bug：淘宝的价格和商品标题上写的重量通常对不上，此bug无法修复，天猫、京东暂无此问题, 标题出现2个以上重量单位的按最后一个算 ( bug反馈联系： snomiao@gmail.com 或 qq 997596439 )
// @author       snomiao@gmail.com
// @match        http*://cart.jd.com/cart*
// @match        http*://order.jd.com/center/alwaysbuy.action*
// @match        http*://*.jd.com/*.html
// @match        http*://*.jd.com/*.html?*
// @match        http*://search.jd.com/Search*
// @match        http*://*.tmall.com/*.htm*
// @match        http*://*.taobao.com/search*
// @match        http*://cart.taobao.com/cart.htm*
// @match        http*://www.1688.com/*
// @match        http*://s.1688.com/selloffer/offer_search.htm*
// @match        http*://search.suning.com/*
// @match        http*://*.amazon.*/*
// @grant        none
// ==/UserScript==

//
// (20210221)更新：性能优化、数据单位识别优化、更新天猫超市、amazon、suning、加入中文数字识别
// (20200404)更新：增加天猫超市支持、优化刷新逻辑
//
// (function () {
//     'use strict';
/*
获取质量参数
前缀乘数 基数量 基数单位 后缀乘数
获取
 */
const 单位比例表 = {  
  // 重量、容积单位（按水的重量算）
  ton: 1e6,
  kg: 1e3,
  g: 1,
  克: 1,
  mg: 1e-3,
  ug: 1e-6,
  l: 1e3,
  ml: 1,
  千克: 1e3,
  磅: 453.59237,
  lb: 453.59237,
  吨: 1e6,
  公斤: 1e3,
  斤: 500,
  两: 50,
  // 数据单位（采用硬盘工业单位）
  t: 1e3,
  g: 1,
//   m: 1e-3, //和米冲突
  k: 1e-6,
  pb: 1e6,
  tb: 1e3,
  gb: 1,
  mb: 1e-3,
  kb: 1e-6,
};
// 前缀乘数？ 基数量 基数单位 后缀乘数？
const 质量正则 = RegExp(
  [
    /(?:(\d+)\s?\*)?/,
    /(\d+\.\d+|\d+)/,
    RegExp(`(${Object.keys(单位比例表).join("|")})`),
    /(?:\s?[x×*](\d+))?/,
  ]
    .map((e) => e.source)
    .join(""),
  "i"
);
const 分组计数 = (列, 按 = (e) => JSON.stringify(e)) =>
  列.reduce((表, 数) => ((表[数] = (表[数] || 0) + 1), 表), {});
const 众数 = (列) =>
  Object.entries(分组计数(列)).sort(([, v1], [, v2]) => v2 - v1)[0][0];
const 中文数字解析 = (大写数字) =>
  大写数字.split("").reduce(
    (数, 字) =>
      // (e=> e !==-1 && (数 ?? 0) + e)('012345789'.indexOf(字) ) ||
      ((e) => e !== -1 && (数 ?? 0) + e)("零一二三四五六七八九".indexOf(字)) ||
      ((e) => e !== -1 && (数 ?? 0) + e)("零壹贰叁肆伍陆柒捌玖".indexOf(字)) ||
      ((e) => e !== -1 && (数 ?? 0) + e)("洞幺两三四五六拐怕勾".indexOf(字)) ||
      ((e) => e !== -1 && (数 ?? 1) * 10 ** e)(
        "个十百千万一兆一亿".indexOf(字)
      ) ||
      ((e) => e !== -1 && (数 ?? 1) * 10 ** e)("个拾佰仟".indexOf(字)) ||
      NaN,
    null
  );
const 中文数字替换 = (串) =>
  串.replace(
    /[幺两三四五六拐怕勾洞零一二三四五六七八九零壹贰叁肆伍陆柒捌玖个十][幺两三四五六拐怕勾洞零一二三四五六七八九零壹贰叁肆伍陆柒捌玖个十百千万一兆一亿个拾佰仟]*/g,
    中文数字解析
  );
中文数字替换(
  `四万万 四亿 四亿亿 二万二千 二百二 三十三 四百 六十四 五百亿 两个亿 十一`
);

const 质量千克自标题解析 = (标题) => {
  const 质量表述列 =
    (中文数字替换(标题) + 标题).match(RegExp(质量正则.source, "ig")) || [];
  const 质量列 = 质量表述列.map((串) => {
    const [_, 前乘数串, 质量串, 单位串, 后乘数串] = 串.match(质量正则);
    const [前乘数, 后乘数] = [前乘数串, 后乘数串].map(
      (e) => parseFloat(e) || 1
    );
    const 质量 = parseFloat(质量串) || 0;
    const 单位乘数 = 单位比例表[单位串.toLowerCase()];
    return (前乘数 * 质量 * 单位乘数 * 后乘数) / 1e3; //kg
  });
  return 质量列.length ? parseFloat(众数(质量列)) : NaN;
};
const 查看 = (e) => (console.log(e), e);
const 每千克价格按每斤解释 = (每千克价格) =>
  `${(每千克价格 / 2).toFixed(2)}¥/500g`;
const 范围映射 = (x, [a, b], [c, d]) => ((x - a) / (b - a)) * (d - c) + c;
const 页面特定商品列获取 = ({ 选项目, 选标题, 选价格 }) =>
  [...document.querySelectorAll(选项目)]
    .map((元素) => {
      let [标题元素, 价格元素] = [选标题, 选价格].map((选) =>
        选?.startsWith("@@")
          ? document.querySelector(选?.slice(2))
          : 元素?.querySelector(选)
      );
      if (!标题元素 || !价格元素) return null;
      const 标题 = 标题元素.innerText.trim();
      let 价格 =
        parseFloat(价格元素.innerText.trim().replace(/￥|¥/g, "")) || NaN; //无报价
      let 千克质量 = 质量千克自标题解析(标题);
      const 每千克价格 = 价格 / (千克质量 || 0);
      return { 标题, 价格, 千克质量, 每千克价格, 标题元素, 价格元素, 元素 };
    })
    .filter((e) => e);
const 新元素 = (innerHTML, attributes = {}) =>
  Object.assign(
    Object.assign(document.createElement("div"), { innerHTML }).children[0],
    attributes
  );
const 商品列每斤价格排序显示 = (新增商品列) => {
  console.log(`[pricesof500g] 正在处理${新增商品列.length}个商品价格。`);
  const 现存商品列 = [...document.querySelectorAll("span.priceof500g")].map(
    (价格标签) => 价格标签.商品信息
  );
  const 有序商品列 = [...现存商品列, ...新增商品列].sort(
    (a, b) => a.每千克价格 - b.每千克价格
  );
  const 最低每千克价格 = Math.min(
    ...有序商品列.map((e) => e.每千克价格).filter((e) => !isNaN(e))
  );
  const 最高每千克价格 = Math.max(
    ...有序商品列.map((e) => e.每千克价格).filter((e) => !isNaN(e))
  );
  有序商品列.forEach(({ 元素 }) =>
    元素.parentNode.appendChild(元素.parentNode.removeChild(元素))
  );
  有序商品列.forEach((商品信息) => {
    const { 标题, 千克质量, 价格, 每千克价格, 标题元素 } = 商品信息;
    let 价率 = 范围映射(每千克价格, [最低每千克价格, 最高每千克价格], [1, 0]);
    // 从最低价到最高价由红到绿渐变
    const 颜色 =
      (价率 && `rgba(${价率 * 255},${255 - 价率 * 255},0.1,1)`) || "black";
    const 描述 = `${标题}\n\n${价格}¥/${千克质量}kg = ${每千克价格按每斤解释(
      每千克价格
    )}\n\n © 2016 - 2021 雪星实验室 \n  ( bug反馈联系： snomiao@gmail.com 或 qq 997596439 )`;
    const 价格标签 = 新元素(`
        <span class="priceof500g" style="background: ${颜色}; color: white" title="${描述}">
            ${每千克价格按每斤解释(每千克价格)}
        </span>`);
    价格标签.商品信息 = 商品信息;
    // 标签换新或显示
    标题元素.价格标签 && 标题元素.parentNode.removeChild(标题元素.价格标签);
    if (!价格 || !千克质量) return;
    标题元素.价格标签 = 标题元素.parentNode.insertBefore(价格标签, 标题元素);
    // console.debug(标题元素, 价格标签, 每千克价格按每斤解释(每千克价格))
  });
};

const 商品选择列 = `
| taobao.com | .item                       | .title a              | .price             |
| taobao.com | .item-holder                | .item-basic-info a    | .td.td-price       |
| taobao.com | .bundle                     | .item-basic-info a    | .td.td-price       |
| taobao.com | #J_OrderList>div            | .item-basic-info a    | .td.td-price       |
| tmall.com  | .product                    | .productTitle a       | .productPrice      |
| tmall.com  | .product                    | .product-title a      | .ui-price          |
| tmall.com  | .j_ItemInfo                 | .title                | .price             |
| tmall.com  | .one-grid-price             | .floor-item-title     | .floor-price       |
| tmall.com  | .wonderful-item             | .item-desc            | .item-price        |
| tmall.com  | .J_TSaleProp>li.tb-selected | a                     | @@.tm-promo-price  | 小的商品描述标签
| tmall.com  | .tb-property                | h1                    | .tm-promo-price    | 详情页标题
| tmall.com  | .tm-detail-meta             | .tb-detail-hd h1      | .tm-promo-price    | 详情页标题
| jd.com     | .itemInfo-wrap              | .sku-name             | .p-price           | 当前浏览商品
| jd.com     | ul>li.more2_item            | .more2_info_name      | .more2_info_price  | 首页推荐
| jd.com     | .freqt-item                 | .p-name a             | .p-price           | 常购商品
| jd.com     | .gl-item                    | .p-name em            | .p-price           |
| jd.com     | .track-con>ul>li            | a>div                 | a>p                | 看了又看
| jd.com     | ul.plist>li                 | .p-name               | .p-price           | 店铺新品、店铺热销、店长推荐等
| jd.com     | ul>li.item                  | .p-name               | .p-price           | 本店好评
| jd.com     | .goods-list>ul>li           | .p-name a             | .p-price           | JD购物车
| jd.com     | .item-item,.item-full       | .p-name a             | .p-price           | JD购物车
| jd.com     | .smart-items>ul>li          | .item-name a          | .item-price        | JD购物车
| 1688.com   | .grid.rec-offer             | .offer_titles         | .price-num         | 首页
| 1688.com   | .sm-offer-item              | .sm-offer-title       | .sm-offer-priceNum | 商品搜索页面
| 1688.com   | .card-container             | .title                | div.price          | 商品搜索页面
| amazon.cn  | .s-result-item              | h2                    | .a-price           | 商品搜索页面
| suning.com | li.item-wrap                | .title-selling-point  | .price-box         | 商品搜索页面
`
  .replace(/\/\/.*/gm, "")
  .split(/\r?\n/g)
  .map((e) =>
    e
      .trim()
      .split("|")
      .slice(1)
      .map((e) => e.trim())
  )
  .filter((e) => e && e[1])
  .map(([域名, 选项目, 选标题, 选价格]) => ({ 域名, 选项目, 选标题, 选价格 }));
const 页面商品列获取 = () =>
  商品选择列
    .filter(({ 域名 }) => location.origin.match(域名))
    .flatMap(页面特定商品列获取);
const 页面商品列商品列每斤价格排序显示 = () =>
  商品列每斤价格排序显示(页面商品列获取());
const 节流 =
  (间隔, 函数, 提示函数 = () => null, 上次执行 = 0) =>
  async (...参数) =>
    +new Date() - 上次执行 > 间隔
      ? ((上次执行 = +new Date()), await 函数(...参数))
      : await 提示函数(...参数);
const 防抖 =
  (间隔, 函数, 提示函数 = () => null, timerId = null) =>
  (...参数) =>
    new Promise(
      (resolve, reject) => (
        timerId && (clearTimeout(timerId), resolve(提示函数(...参数))),
        (timerId = setTimeout(() => resolve(函数(...参数)), 间隔))
      )
    );
const 节流防抖 = (间隔, 函数, 提示函数 = () => null) =>
  节流(间隔, 函数, 防抖(间隔, 函数, 提示函数));
const 刷新函数 = 节流防抖(
  10e3 /* 3s */,
  () => !document.hidden && 页面商品列商品列每斤价格排序显示()
);
const 主动刷新函数 = 节流防抖(
  200,
  () => !document.hidden && 页面商品列商品列每斤价格排序显示()
);

// オブザーバインスタンスを作成
let 目标 = document.documentElement || document.body;
const 监视配置 = { attributes: false, childList: true, characterData: false };
if (typeof 页面变动监视器 !== "undefined") 页面变动监视器.disconnect();
var 页面变动监视器 = new MutationObserver((mutations) => {
  if (!mutations.some((record) => record.addedNodes.length)) return;
  页面变动监视器.disconnect();
  刷新函数();
  目标 && 页面变动监视器.observe(目标, 监视配置);
});
页面变动监视器.observe(目标, 监视配置);
window.addEventListener("load", 刷新函数, false);
刷新函数();
document.addEventListener("keyup", () => setTimeout(刷新函数, 100), false);
document.addEventListener(
  "mouseup",
  () => setTimeout(主动刷新函数, 100),
  false
);
document.addEventListener(
  "visibilitychange",
  () => setTimeout(刷新函数, 100),
  false
);

// })();
