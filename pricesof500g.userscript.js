// ==UserScript==
// @name         淘宝、京东、天猫自动按每斤价格排序 TAOBAO/JD/TMALL / Automatic sort by 500g price.
// @namespace    snomiao@gmail.com
// @version      0.5
// @description  自用。有疑问联系 snomiao@gmail.com   已知bug：淘宝的价格和商品标题上写的重量通常对不上，此bug无法修复，天猫、京东暂无此问题, 标题出现2个以上重量单位的按最后一个算
// @author       snomiao@gmail.com
// @match        http*://cart.jd.com/cart*
// @match        http*://cart.jd.com/addToCart.html*
// @match        http*://order.jd.com/center/alwaysbuy.action*
// @match        http*://www.jd.com/*.html
// @match        http*://item.jd.com/*.html
// @match        http*://search.jd.com/Search*
// @match        http*://list.tmall.com/search_product.htm*
// @match        http*://s.taobao.com/search*
// @match        http*://cart.taobao.com/cart.htm*
// @grant        none
// ==/UserScript==
// update from
(function() {
    'use strict';

// 获取质量参数
// 前缀乘数 基数量 基数单位 后缀乘数

var 求千克价格 = ({ title, price }) => {
    var units = {
        // 重量、容积单位（按水的重量算）
        kg: 1000, 千克: 1000, l: 1000, 公斤: 1000,
        g: 1, 克: 1, ml: 1,
        磅: 453.59237, lb: 453.59237,
        斤: 500, 两: 50,
        mg: 0.001, ug: 0.000001,
        // 数据单位
        pb: 1000000,
        t: 1000, tb: 1000,
        mb: 0.001,
        kb: 0.000001,
    }
    var reg1 = /(?:(\d+)\*)?(\d+\.\d+|\d+)(kg|g|mg|ug|L|ml|千克|克|斤|两|公斤|升|毫升|pb|tb|mb|kb|t)(?:\*(\d+))?/i
    var reg2 = /(?:(\d+)\*)?(\d+\.\d+|\d+)(kg|g|mg|ug|L|ml|千克|克|斤|两|公斤|升|毫升|pb|tb|mb|kb|t)\b(?:\*(\d+))?/ig
    var matches = title.match(reg2)
    if (matches) {
        var match = matches.pop().match(reg1)
        console.log(title, match)
        var mul = parseFloat(match[4] || match[1]) || 1
        var val = parseFloat(match[2])
        var unit = match[3].toLowerCase()
        var unitMul = units[unit]
        if (unitMul) {
            return price / (mul * val * unitMul / 1000)
        } else {
            console.log(match)
            return Infinity
        }
    }
    return Infinity
}

//
var 解释性价比 = (千克价格) => 千克价格 < Infinity ? parseInt(千克价格 / 2 * 100) / 100 + "¥/500g" : ""
var 映射 = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c


var getListItems = ({ selItem, selTitle, selPrice }) => [...document.querySelectorAll(selItem)]
    .map(
        e => {
            var eTitle = e.querySelector(selTitle)
            var ePrice = e.querySelector(selPrice)
            return eTitle && ePrice &&
                {
                    eTitle, eTitle, ePrice,
                    title: eTitle.innerText.trim(),
                    price: parseFloat(ePrice.innerText.trim().replace(/￥|¥/g, "")),
                    e
                }
        }
    ).filter(e => e)
var 按性价比排序 = () => {
    var lsItems = []
    // taobao购物车
    .concat(getListItems({ selItem: ".item-holder,.bundle,#J_OrderList>div", selPrice: ".td.td-price", selTitle: ".item-basic-info a" }))
    // taobao
    .concat(getListItems({ selItem: ".item", selTitle: ".title a", selPrice: ".price" }))
    // TMALL
    .concat(getListItems({ selItem: ".product", selPrice: ".productPrice", selTitle: ".productTitle a" }))
    // JD
    .concat(getListItems({ selItem: ".itemInfo-wrap", selTitle: ".sku-name", selPrice: ".p-price" })) // 当前浏览商品
    .concat(getListItems({ selItem: "ul.more2_list>li.more2_item", selTitle: ".more2_info_name", selPrice: ".more2_info_price" })) // 首页推荐
    .concat(getListItems({ selItem: ".freqt-items>.freqt-item", selTitle: ".p-name a", selPrice: ".p-price" })) // 常购商品
    .concat(getListItems({ selItem: ".gl-item", selTitle: ".p-name em", selPrice: ".p-price" }))
    .concat(getListItems({ selItem: ".track-con>ul>li", selTitle: "a>div", selPrice: "a>p" }))   //看了又看
    .concat(getListItems({ selItem: "ul.plist>li", selTitle: ".p-name", selPrice: ".p-price" })) //店铺新品、店铺热销、店长推荐等    
    .concat(getListItems({ selItem: "ul>li.item", selTitle: ".p-name", selPrice: ".p-price" }))    // 本店好评
    // JD购物车
    .concat(getListItems({ selItem: ".goods-list>ul>li", selTitle: ".p-name a", selPrice: ".p-price" }))
    .concat(getListItems({ selItem: ".item-item,.item-full", selTitle: ".p-name a", selPrice: ".p-price" }))
    .concat(getListItems({ selItem: ".smart-items>ul>li", selTitle: ".item-name a", selPrice: ".item-price" }))
    var lsItems = lsItems.map(e => ({ ...e, 千克价格: 求千克价格(e) }))
        .sort((a, b) => a.千克价格 - b.千克价格)
        .map(e => { e.e.parentNode.appendChild(e.e.parentNode.removeChild(e.e)); return e })

    var 最低价 = Math.min(...lsItems.map(e => e.千克价格).filter(e => e < Infinity))
    var 最高价 = Math.max(...lsItems.map(e => e.千克价格).filter(e => e < Infinity))

    lsItems.forEach(
        e => {
            var percent = 映射(e.千克价格, 最低价, 最高价, 1, 0)
            var span = document.createElement("span")
            span.className = "priceof500g"
            // 红绿渐变，红的最低价
            span.style.backgroundColor = `rgba(${percent * 255},${255 - percent * 255},0,1)`
            span.style.color = "rgba(255,255,255,1)"
            console.log(解释性价比(e.千克价格))
            span.innerText = 解释性价比(e.千克价格);
            // 移除上一次运行结果
            [...e.eTitle.parentNode.querySelectorAll(".priceof500g")].map(child=>e.eTitle.parentNode.removeChild(child))
            // 新结果
            e.eTitle.parentNode.insertBefore(span, e.eTitle)
        })
}

document.addEventListener("onload", 按性价比排序)
setInterval(按性价比排序, 5000)
setTimeout(按性价比排序, 2000)
按性价比排序()

})();