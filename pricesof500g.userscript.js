// ==UserScript==
// @name         淘宝、京东、天猫自动按每斤价格排序 TAOBAO/JD/TMALL / Automatic sort by 500g price.
// @namespace    snomiao@gmail.com
// @version      0.9.0
// @description  已知bug：淘宝的价格和商品标题上写的重量通常对不上，此bug无法修复，天猫、京东暂无此问题, 标题出现2个以上重量单位的按最后一个算
// @author       snomiao@gmail.com
// @match        http*://cart.jd.com/cart*
// @match        http*://cart.jd.com/addToCart.html*
// @match        http*://order.jd.com/center/alwaysbuy.action*
// @match        http*://www.jd.com/*.html
// @match        http*://item.jd.com/*.html
// @match        http*://search.jd.com/Search*
// @match        http*://list.tmall.com/search_product.htm*
// @match        http*://detail.tmall.com/item.htm?*
// @match        http*://s.taobao.com/search*
// @match        http*://cart.taobao.com/cart.htm*
// @match        http*://www.1688.com/
// @match        http*://s.1688.com/selloffer/offer_search.htm*
// @grant        none
// ==/UserScript==

//
// (20200404)更新：增加天猫超市支持、优化刷新逻辑
//
// (function () {
//     'use strict';
/*
获取质量参数
前缀乘数 基数量 基数单位 后缀乘数
获取
 */
var 单位比例表 = {
    // 重量、容积单位（按水的重量算）
    ton: 1e6, kg: 1e3, g: 1, 克: 1,mg: 1e-3, ug: 1e-6,
    l: 1e3,  ml: 1,
    千克: 1e3, 
    磅: 453.59237, lb: 453.59237,
    吨: 1e6, 公斤: 1e3, 斤: 500, 两: 50,
    // 数据单位（采用硬盘工业单位）
    t: 1e3, g: 1,   m: 1e-3,k: 1e-6,
    pb: 1e6,tb: 1e3,gb: 1, mb: 1e-3, kb: 1e-6,
}

// 前缀乘数？ 基数量 基数单位 后缀乘数？
var 质量正则 = RegExp([
    /(?:(\d+)\s?\*)?/,
    /(\d+\.\d+|\d+)/,
    RegExp(`(${Object.keys(单位比例表).join('|')})`),
    /(?:\s?[x×*](\d+))?/,
].map(e => e.source).join(''), 'i')
var 分组计数 = (列, 按 = e => JSON.stringify(e)) => 列.reduce((表, 数) => (表[数] = (表[数] || 0) + 1, 表), {})
var 众数 = (列) => Object.entries(分组计数(列)).sort(([, v1], [, v2]) => v2-v1)[0][0]
var 质量千克自标题解析 = (标题) => {
    var 质量表述列 = 标题.match(RegExp(质量正则.source, 'ig')) || []
    var 质量列 = 质量表述列.map(串 => {
        const [_, 前乘数串, 质量串, 单位串, 后乘数串] = 串.match(质量正则)
        const [前乘数, 后乘数] = [前乘数串, 后乘数串].map(e => parseFloat(e) || 1)
        const 质量 = parseFloat(质量串) || 0
        const 单位乘数 = 单位比例表[单位串.toLowerCase()]
        return 前乘数 * 质量 * 单位乘数 * 后乘数 / 1e3 //kg
    })
    return 质量列.length ? parseFloat(众数(质量列)) : NaN
}
var 每斤价格解释 = (每千克价格) => (每千克价格 / 2).toFixed(2) + "¥/500g"
var 范围映射 = (x, [a, b], [c, d]) => (x - a) / (b - a) * (d - c) + c
var 页面特定商品列获取 = ({ 选项目, 选标题, 选价格 }) => [...document.querySelectorAll(选项目)].map(元素 => {
    var [标题元素, 价格元素] = [选标题, 选价格].map(选 => 元素.querySelector(选))
    if (!标题元素 || !价格元素) return null
    var 标题 = 标题元素.innerText.trim()
    var 价格 = parseFloat(价格元素.innerText.trim().replace(/￥|¥/g, "")) || NaN //无报价
    var 千克质量 = 质量千克自标题解析(标题)
    var 每千克价格 = 价格 / (千克质量 || 0)
    return { 标题, 价格, 千克质量, 每千克价格, 标题元素, 价格元素, 元素 }
}).filter(e => e)
var 新元素 = (innerHTML, attributes = {}) => 
    Object.assign(Object.assign(document.createElement("div"), {innerHTML}).children[0], attributes)
var 商品列每斤价格排序显示 = (商品列) => {
    var 最低每千克价格 = Math.min(...商品列.map(e => e.每千克价格).filter(e => !isNaN(e)))
    var 最高每千克价格 = Math.max(...商品列.map(e => e.每千克价格).filter(e => !isNaN(e)))
    var 有序商品列 = 商品列.sort((a, b) => a.每千克价格 - b.每千克价格)
    // 对 DOM 重新排序
    有序商品列.forEach(({ 元素 }) => 元素.parentNode.appendChild(元素.parentNode.removeChild(元素)))
    // 显示价格标签
    有序商品列.reverse().forEach(({ 标题, 千克质量, 价格, 每千克价格, 标题元素 }) => {
        var 价率 = 范围映射(每千克价格, [最低每千克价格, 最高每千克价格], [1, 0])
        // 从最低价到最高价由红到绿渐变
        var 颜色 = 价率 && `rgba(${价率 * 255},${255 - 价率 * 255},0.1,1)` || 'black'
        var 描述 = `${标题}\n\n${价格}¥/${千克质量}kg = ${每斤价格解释(每千克价格/2)}\n\n © 2016 - 2021 雪星实验室 \n  ( bug反馈联系： snomiao@gmail.com 或 qq 997596439 )`
        var 价格标签 = 新元素(`
        	<span class="priceof500g" style="background: ${颜色}; color: white" title="${描述}">
                ${每斤价格解释(每千克价格/2)}
            </span>`)
        // 标签换新或显示
        标题元素.价格标签 && 标题元素.parentNode.removeChild(标题元素.价格标签)
        标题元素.价格标签 = 标题元素.parentNode.insertBefore(价格标签, 标题元素)
        // console.debug(标题元素, 价格标签, 每斤价格解释(每千克价格), 每千克价格)
    })
}
var 商品选择列 = [
    { 选项目: ".item-holder,.bundle,#J_OrderList>div", 选价格: ".td.td-price", 选标题: ".item-basic-info a" },
    // 淘宝
    { 选项目: ".item", 选标题: ".title a", 选价格: ".price" },
    // TMALL
    { 选项目: ".product", 选价格: ".productPrice", 选标题: ".productTitle a" },
    // 天猫超市
    { 选项目: ".product", 选价格: ".ui-price", 选标题: ".product-title a" },
    { 选项目: ".tm-detail-meta", 选价格: ".tm-promo-price", 选标题: ".tb-detail-hd h1" },
    // JD
    { 选项目: ".itemInfo-wrap", 选标题: ".sku-name", 选价格: ".p-price" }, // 当前浏览商品
    { 选项目: "ul.more2_list>li.more2_item", 选标题: ".more2_info_name", 选价格: ".more2_info_price" }, // 首页推荐
    { 选项目: ".freqt-items>.freqt-item", 选标题: ".p-name a", 选价格: ".p-price" }, // 常购商品
    { 选项目: ".gl-item", 选标题: ".p-name em", 选价格: ".p-price" },
    { 选项目: ".track-con>ul>li", 选标题: "a>div", 选价格: "a>p" },   //看了又看
    { 选项目: "ul.plist>li", 选标题: ".p-name", 选价格: ".p-price" }, //店铺新品、店铺热销、店长推荐等    
    { 选项目: "ul>li.item", 选标题: ".p-name", 选价格: ".p-price" },    // 本店好评
    // JD购物车
    { 选项目: ".goods-list>ul>li", 选标题: ".p-name a", 选价格: ".p-price" },
    { 选项目: ".item-item,.item-full", 选标题: ".p-name a", 选价格: ".p-price" },
    { 选项目: ".smart-items>ul>li", 选标题: ".item-name a", 选价格: ".item-price" },
    // 1688
    { 选项目: ".grid.rec-offer", 选标题: ".offer_titles", 选价格: ".price-num" }, // 首页
    { 选项目: ".sm-offer-item", 选标题: ".sm-offer-title", 选价格: ".sm-offer-priceNum" }, //商品搜索页面
    { 选项目: ".card-container", 选标题: ".title", 选价格: "div.price" }, //商品搜索页面
]
var 页面商品列获取 = () => 商品选择列.flatMap(页面特定商品列获取)
var 页面商品列商品列每斤价格排序显示 = () => (console.log(商品列每斤价格排序显示) , 商品列每斤价格排序显示(页面商品列获取()))
var 节流 = (间隔, 函数, 提示函数 = () => null, 上次执行 = 0) => async (...参数) =>
    +new Date() - 上次执行 > 间隔 ? ((上次执行 = +new Date()), await 函数(...参数)) : await 提示函数(...参数)
var 防抖 = (间隔, 函数, 提示函数 = () => null, timerId = null) => (...参数) => new Promise((resolve, reject) =>
    (timerId && (clearTimeout(timerId), resolve(提示函数(...参数))), timerId = setTimeout(() => resolve(函数(...参数)), 间隔)))
var 节流防抖 = (间隔, 函数, 提示函数 = () => null) => 节流(间隔, 函数, 防抖(间隔, 函数, 提示函数))
var 刷新函数 = 节流防抖(10e3 /* 10s */, () =>页面商品列商品列每斤价格排序显示())

// オブザーバインスタンスを作成
var 目标 = document.documentElement || document.body
var 监视配置 = { attributes: false, childList: true, characterData: false };
if(typeof 页面变动监视器 !== 'undefined') 页面变动监视器.disconnect()
var 页面变动监视器 = new MutationObserver((mutations) => {
    if (!mutations.some(record => record.addedNodes.length)) return;
    页面变动监视器.disconnect(); 刷新函数(); 目标 && 页面变动监视器.observe(目标, 监视配置)
}); 页面变动监视器.observe(目标, 监视配置)
window.addEventListener('load', 刷新函数, false)
刷新函数()
// })();