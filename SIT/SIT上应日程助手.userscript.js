// ==UserScript==
// @name         SIT上应日程助手
// @namespace    https://userscript.snomiao.com/
// @version      0.7.20191209
// @description  功能：1) 下载ics格式课程表，可用于导入 Google Calendar
// @author       snomiao
// @match        http*://sc.sit.edu.cn/*
// @match        http*://ems.sit.edu.cn:85/student/*
// @match        http*://ems1.sit.edu.cn:85/student/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var 绑定Click到元素 = (f, 元素) => (元素.addEventListener("click", f), 元素)
    var 新元素 = (innerHTML) => {
        var e = document.createElement("div");
        e.innerHTML = innerHTML;
        return e.children[0]
    }
    //导入MD5函数
    var MD5 = function (string) {
        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) { return (x & y) | ((~x) & z); }
        function G(x, y, z) { return (x & z) | (y & (~z)); }
        function H(x, y, z) { return (x ^ y ^ z); }
        function I(x, y, z) { return (y ^ (x | (~z))); }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

        return temp.toLowerCase();
    }
    var 下载文件 = (href, title) => {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.setAttribute('download', title);
        a.click();
    }
    var 下载文本文件 = (text, title) => {
        下载文件(URL.createObjectURL(new Blob([text])), title);
    }
    var 并发数 = 0;
    var 异步抓取 = (URL) => {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    并发数--;
                    if (xhr.status == 200) {
                        //if you fetch a file you can JSON.parse(xhr.responseText)
                        var data = xhr.responseText;
                        resolve(data);
                    } else {
                        // 连接失败后的重试机制
                        (async () => {
                            let data = await 异步抓取(URL)
                            resolve(data);
                        })()
                    }
                }
            };
            xhr.open('GET', URL, true);

            // 限制并发连接数在10个以内'
            // 改为1的时候就是串行
            let limit = 10
            let timer = setInterval(() => {
                if (并发数 < limit) {
                    xhr.send(null);
                    并发数++;
                    clearInterval(timer);
                }
            }, 1000 * Math.random())
        })
    }
    var 解析第二课堂活动事件 = (html) => {
        var re = {}
        // 样例
        let _抓取html样例 = `
        <h1 class="title_8">【学工部】上海应用技术大学2019届毕业生春季校园综合招聘会</h1>
            <div style=" color:#7a7a7a; text-align:center">
            活动编号：1053790 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            活动开始时间：2019-3-29 13:00:00 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            活动地点：大学生活动中心一楼大厅、第二食堂二楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            活动时长：150 分钟<br />
            负责人：吴晓燕  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            负责人电话：60873212&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            主办方：学工部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            承办方：就业指导服务中心&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            刷卡时间段：2019-03-29 12:50:00&nbsp;&nbsp;--至--&nbsp;&nbsp;2019-03-15 15:20:00
            !?
        </div>`

        var DOM = document.createElement("html")
        DOM.innerHTML = html;

        // 基本信息
        var 活动信息 = DOM.querySelector("div.box-1 > div:nth-child(2)").innerHTML.replace(/&nbsp;/g, " ").replace(/<br>/g, "").split('\n').map(x => x).join('\n');
        var 活动类型 = DOM.querySelector(".hover-a").innerText;

        var 尝试提取活动时间 = (活动信息) => {
            if (活动信息.match(/刷卡时间段：[-\d]+ [:\d]+.*?[-\d]+ [:\d]+/m)) {
                var 开始 = new Date(活动信息.match(/刷卡时间段：([-\d]+ [:\d]+).*?[-\d]+ [:\d]+/m)[1])
                var 结束 = new Date(活动信息.match(/刷卡时间段：[-\d]+ [:\d]+.*?([-\d]+ [:\d]+)/m)[1])
                return { 开始, 结束 }
            } else if (活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m) &&
                活动信息.match(/活动时长：([零一二三四五六七八九十0-9]*)\s*?个?\s*?((?:年|季度|月|周|天|小时|刻钟|分钟|分钟|星期|礼拜|日|时|刻|分|秒钟|秒)?) 分钟.*?/m)) {
                let 活动时长匹配 = 活动信息.match(/活动时长：([零一二三四五六七八九十0-9]*)\s*?个?\s*?((?:年|季度|月|周|天|小时|刻钟|分钟|分钟|星期|礼拜|日|时|刻|分|秒钟|秒)?) 分钟.*?/m);
                let 量 = 活动时长匹配[1].replace(/[零一二三四五六七八九十]/g, (s) => "零一二三四五六七八九十".indexOf(s))
                let 单位 = (
                    活动时长匹配[2].length ? 活动时长匹配[2]
                        .replace(/年/, 1000 * 60 * 60 * 24 * 365 / 4)
                        .replace(/季度/, 1000 * 60 * 60 * 24 * 365 / 4)
                        .replace(/月/, 1000 * 60 * 60 * 24 * 30)
                        .replace(/周|星期|礼拜/, 1000 * 60 * 60 * 24)
                        .replace(/天|日/, 1000 * 60 * 60 * 24)
                        .replace(/小时|时/, 1000 * 60 * 60)
                        .replace(/刻钟|刻/, 1000 * 60 * 15)
                        .replace(/分钟|分/, 1000 * 60)
                        .replace(/秒钟|秒/, 1000)
                        : 1000 * 60) // 不带单位默认分钟
                let 活动时长毫秒 = parseInt(单位) * 量;
                var 开始 = new Date(活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m)[1])
                var 结束 = new Date(+开始 + 活动时长毫秒);
                return { 开始, 结束 }
            } else if (活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m)) {
                var 开始 = new Date(活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m)[1])
                var 结束 = new Date(+开始 + 1000 * 60 * 90);
                console.warn(`未能解析活动时长，默认90分钟`, 活动信息)
                return { 开始, 结束 }
            } else {
                console.warn(`time doesn't match`, 活动信息)
                return undefined;
            }
        }
        var 活动时间 = 尝试提取活动时间(活动信息)
        // 返回一个事件
        return {
            // 事件发生时间地点
            TSTART: 活动时间.开始,
            TEND: 活动时间.结束,
            LOCATION: (e => e && e[1])(活动信息.match(/活动地点：(.*)/m)),
            // 事件UID，用于更新进展
            UID: MD5("第二课堂活动：" + 活动信息.match(/活动编号：(.*)/m)[1]) + `@snomiao.com`,
            // 事件标题
            SUMMARY: DOM.querySelector("h1").innerText,
            // 本活动的相关信息
            DESCRIPTION: "活动类型：" + 活动类型 + '\n\n' + 活动信息 + '\n\n' + eleHTML.querySelector("div.box-1 > div:nth-child(3)").innerText,
        }
    }
    var 取学期第一天自课程序号 = 课程序号 => {
        // 课程序号
        return (e => e && e[(课程序号 + "").slice(0, 3)])({
            "190": new Date('2019-09-02 00:00:00 GMT+0800'),
            "195": new Date('2020-02-24 00:00:00 GMT+0800'),
            "200": new Date('2020-09-01 00:00:00 GMT+0800'),
            "205": new Date('2021-02-24 00:00:00 GMT+0800'),
        })
    }
    var 计算课程时间 = (课程时间, 学期第一天凌晨) => {
        var match = 课程时间
            .replace(/第(\d+)周,周(\d+),第(\d+)节/, "第$1周,周$2,第$3-$3节")
            .match(/第(\d+)周,周(\d+),第(\d+)-(\d+)节/)
        if (!match) {
            console.warn('无法识别为时间:', 课程时间, match)
            return undefined;
        }
        var 周数 = match[1];
        var 星期 = match[2];
        var 上课节 = match[3];
        var 下课节 = match[4];
        let 第一天时间 = 学期第一天凌晨.getTime();
        let 一秒 = 1000 // 1秒
        let 一分 = 60 * 一秒 // 1分钟
        let 一刻 = 15 * 一分 // 1刻钟
        let 一时 = 60 * 一分 // 1小时
        let 一天 = 24 * 一时 // 1天
        let 一周 = 7 * 一天; // 1周
        // 上课时间表
        // 第  1-2 节 08:20-09:55
        // 第  3-4 节 10:15-11:50
        // 第  5-6 节 13:00-14:35
        // 第  7-8 节 14:55-16:30
        // 第 9-11 节 18:00-20:25
        var 上课时间表 = {};
        上课时间表['1s'] = 一时 * 8 + 20 * 一分;
        上课时间表['1e'] = 一时 * 9 + 5 * 一分; // 猜的，假设一小节课是45分钟这样子切开
        上课时间表['2s'] = 一时 * 9 + 10 * 一分; // 猜的
        上课时间表['2e'] = 一时 * 9 + 55 * 一分;
        上课时间表['3s'] = 一时 * 10 + 15 * 一分;
        上课时间表['3e'] = 一时 * 11 + 0 * 一分; // 猜的
        上课时间表['4s'] = 一时 * 11 + 5 * 一分;
        上课时间表['4e'] = 一时 * 11 + 50 * 一分;
        上课时间表['5s'] = 一时 * 13 + 0 * 一分;
        上课时间表['5e'] = 一时 * 13 + 45 * 一分; // 猜的
        上课时间表['6s'] = 一时 * 13 + 50 * 一分; // 猜的
        上课时间表['6e'] = 一时 * 14 + 35 * 一分;
        上课时间表['7s'] = 一时 * 14 + 55 * 一分;
        上课时间表['7e'] = 一时 * 15 + 0 * 一分; // 期末实践课的时间好像不按这个来的。。 1-7节
        上课时间表['8s'] = 一时 * 15 + 45 * 一分; // 有的实训课是第 8 节开始上到 17:30 左右，不过先这样写着好了
        上课时间表['8e'] = 一时 * 16 + 30 * 一分;
        上课时间表['9s'] = 一时 * 18 + 0 * 一分;
        上课时间表['9e'] = 一时 * 18 + 45 * 一分;
        上课时间表['10s'] = 一时 * 18 + 50 * 一分;
        上课时间表['10e'] = 一时 * 18 + 55 * 一分; // 9-10节不知几点结束，猜一个18点55吧
        上课时间表['11s'] = 一时 * 19 + 40 * 一分;
        上课时间表['11e'] = 一时 * 20 + 25 * 一分;

        var 上课时间 = 第一天时间 +
            一周 * (周数 - 1) +
            一天 * (星期 - 1) +
            上课时间表[上课节 + 's'];

        var 下课时间 = 第一天时间 +
            一周 * (周数 - 1) +
            一天 * (星期 - 1) +
            上课时间表[下课节 + 'e'];

        if (isNaN(上课时间) || isNaN(下课时间)) {
            console.warn('无法识别的课时:', 课程时间)
            console.warn(上课节, 下课时间)
            return undefined;
        }
        return [上课时间, 下课时间]
    }
    var 单节考试转日历事件 = (row) => {
        try {
            var { 序号, 考试课程, 考试时间, 考试地点, 考试性质} = row;
            // hack： 用当前学期貌课程序号前3位代表学期时间
            var 本学期第一天 = 取学期第一天自课程序号("190")
            var 本节考试时间 = 考试时间.replace(/第(\d+)周 星期(\d+) 第(\d+(?:-\d+))节/, (_, a,b,c) => `第${a}周,周${b},第${c}节`)
            var 考试时间戳 = 计算课程时间(本节考试时间, 本学期第一天);
            
            return {
                // 事件发生时间地点
                TSTART: new Date(考试时间戳[0]),
                TEND: new Date(考试时间戳[1]),
                LOCATION: 考试地点,
                // 事件UID，用于更新进展
                UID: MD5(`考试: ${考试性质}-${考试课程}`) + `@snomiao.com`,
                // 事件标题
                SUMMARY: `${考试性质}考: ${考试课程}/${考试地点}/${考试时间}`,
                // 考试的相关信息 (直接导出所有键值对)
                DESCRIPTION: [...Object.keys(row)].map(key => `${key}: ${row[key]}\n`).join('')
            }
        } catch (e) {
            console.error(`错误：`, e.message, `, 出错数据: `, row, e.stack)
            throw new Error(`错误：`, e.message, `, 出错数据: `, row)
        }
    }
    var 单节课转日历事件 = (row) => {
        // 范例输入
        // 课程序号 课程名称 课程代码 课程类型 课程学分 授课老师 上课时间 上课地点 校区 计划人数 已选人数 挂牌 配课班 备注
        // row = {
        // 	课程序号,
        // 	课程代码,
        // 	课程名称,
        // 	授课老师,
        // 	学分,
        // 	本节上课地点,
        // 	本节上课时间,
        // }
        var { 本节上课时间, 本节上课地点, 课程序号, 课程名称, 课程序号, 课程代码, 授课老师, 学分 } = row;
        try {
            var 学期第一天 = 取学期第一天自课程序号(课程序号)
            var 课程时间戳 = 计算课程时间(本节上课时间, 学期第一天);
            return {
                // 事件发生时间地点
                TSTART: new Date(课程时间戳[0]),
                TEND: new Date(课程时间戳[1]),
                LOCATION: 本节上课地点,
                // 事件UID，用于更新进展
                UID: MD5(`课程时间: ${课程序号}-${本节上课时间}`) + `@snomiao.com`,
                // 事件标题
                SUMMARY: `${课程名称}/${课程序号}/${课程代码}/${授课老师}/${学分}分/${本节上课时间}`,
                // 本节课的相关信息 (直接导出所有键值对)
                DESCRIPTION: [...Object.keys(row)].map(key => `${key}: ${row[key]}\n`).join('')
            }
        } catch (e) {
            throw new Error(`错误：`, e.message, `, 出错数据: `, row)
        }
    }
    // 矩阵转置
    var 转置 = m => m[0].map((x, i) => m.map(x => x[i]))
    // 循环直到不动点，这里的调试技巧：进入死循环时可以在此中断，然后修改变量使其报错或跳出
    // update: 可配置超时退出
    var 循环直到不动点 = function (s, proc_function) {
        var o = s;
        while (1) {
            var tmp = proc_function(o)
            if (tmp == o) {
                return o;
            } else {
                o = tmp;
            }
        }
    }
    // 把时间表按具体某周、某节课展开成独立元素，便于比较
    var 展开课程节数 = function (s) {
        // 单双周筛选
        var filter_error = function (s) {
            return !(s.length == 0 ||
                s.match(/.*?第\d*?[02468]周\*[^\*].*/) ||
                s.match(/.*?第\d*?[13579]周\*\*.*/)
            );
        }
        // 单双周统一化
        var normalyze = function (s) {
            return s.replace(/周\*+/, "周");
        }

        // 化为 \n 分割
        s = s.replace(/(?:;|\<br\>)+/g, "\n")
        // “展开 a-b 为好多节课”
        s = 循环直到不动点(s,
            x => x.replace(/(.*?)(\d+)-(\d+)(.*)/, function (s, a, b, c, d) {
                var o = "";
                var b = parseInt(b);
                var c = parseInt(c);
                for (var i = b; i <= c; i++) {
                    o += a + i + d + "\n";
                }
                return o;
            }))
        // “展开  a,b” 为2节课
        s = 循环直到不动点(s,
            x => x.replace(/(.*?)(\d+),(\d+)(.*)/, function (s, a, b, c, d) {
                var o = "";
                var b = parseInt(b);
                var c = parseInt(c);
                o += a + b + d + "\n";
                o += a + c + d + "\n";
                return o;
            }))
        return s.split("\n").filter(filter_error).map(normalyze);
    };
    // 把连续的2节课合并成一段时间
    var 合并连续的节数 = (节列) => {
        var lastLength = 节列.length
        节列.forEach((_, 序) => {
            // 防止比较溢出
            if (!(序 + 1 < 节列.length)) return;
            // 跳过已经被变成undefined 的值
            if (!节列[序]) return;
            if (!节列[序 + 1]) return;
            var match1 = 节列[序].match(/(第\d+周,周\d+,)第(\d+)(?:-(\d+))?节/);
            var match2 = 节列[序 + 1].match(/(第\d+周,周\d+,)第(\d+)(?:-(\d+))?节/);

            // 判断是否同周同天
            if (!(match1 && match2 && match1[1] == match2[1])) return;

            // 补全课程结束时间
            match1[3] = match1[3] || match1[2];
            match2[3] = match2[3] || match2[2];

            // 判断两节课是否连续
            if (parseInt(match1[3]) + 1 == parseInt(match2[2])) {
                // 如果连续，把它们头尾相接
                var a = match1[2];
                var b = match2[3];
                var time_concated = `第${a}-${b}节`
                节列[序] = 节列[序].replace(/第(\d+)(?:-(\d+))?节/, time_concated);
                节列[序 + 1] = undefined;
            }
            // periods[index] = 0;
        })
        // 然后过滤掉计算过程中制造的垃圾
        节列 = 节列.filter(x => x);

        // 看看有没有合并掉一些课程
        if (lastLength == 节列.length) {
            return 节列
        } else {
            return 合并连续的节数(节列)
        }
    }
    var 拆分课程按时间地点 = 课程 => {
        var 分节课程 = [];
        // 把时间表分裂掉，这里 课程[6] 是原始时间表 
        // 把按教室区分的周表分裂掉
        var 周期 = 课程.上课时间.split(/;?\n/);
        var 地点 = 课程.上课地点.split(',');
        if (周期.length != 地点.length) {
            if (周期.length > 地点.length) {
                // 遇到locations少于periods的情况，就不断重复locations的最后一个元素（可能会有非预期的事情发生）
                for (var i = (周期.length - 地点.length) - 1; i >= 0; i--) {
                    地点 = 地点.concat(地点.slice(-1))
                }
            } else {
                // 遇到locations少于periods的情况，就不断重复locations的最后一个元素（可能会有非预期的事情发生）
                for (var i = (地点.length - 周期.length) - 1; i >= 0; i--) {
                    周期 = 周期.concat(周期.slice(-1))
                }
            }
        }
        var 周期地点列 = 转置([周期, 地点]);
        var 分节课程 = 周期地点列.map(pl => {
            var 节数列 = pl[0];
            var 地点 = pl[1];
            var 节数列 = 展开课程节数(节数列);
            var 节数列 = 合并连续的节数(节数列);

            // 按分裂的时间表展开
            return 节数列.map(上课时间 =>
                Object.assign({}, 课程, {
                    本节上课时间: 上课时间,
                    本节上课地点: 地点
                })
            );
        }).flat()
        return 分节课程;
    }
    var 课程表离散化 = 课程表_json => 课程表_json.map(拆分课程按时间地点).flat();

    var 下载单个课程日历 = (课程) => {
        var 课程列分节 = 拆分课程按时间地点(课程)
        var 输出ics = 日历事件列表转ICS格式(课程列分节.map(单节课转日历事件))
        下载文本文件(输出ics, `${课程.课程序号}-${课程.课程代码}-${课程.课程名称}.ics`)
    }
    var 下载多个课程日历 = (课程列表) => {
        var 课程列分节 = 课程列表.map(拆分课程按时间地点).flat()
        var 输出ics = 日历事件列表转ICS格式(课程列分节.map(单节课转日历事件))
        下载文本文件(输出ics, `课程日历` + new Date().toISOString() + `.ics`)
    }
    var 下载单个考试日历 = (考试) => {
        var 输出ics = 日历事件列表转ICS格式([单节考试转日历事件(考试)])
        下载文本文件(输出ics, `${考试.考试序号}-${考试.考试代码}-${考试.考试名称}.ics`)
    }
    var 下载多个考试日历 = (考试列表) => {
        var 输出ics = 日历事件列表转ICS格式(考试列表.map(单节考试转日历事件))
        下载文本文件(输出ics, `考试日历` + new Date().toISOString() + `.ics`)
    }
    var 日历事件列表转ICS格式 = (事件列表) => {
        // .ics方案
        var 事件转iCalendar格式的SECTION = (e) => {
            // 范例输入
            // {
            // 	TSTART,
            // 	TEND,
            // 	SUMMARY,
            // 	DESCRIPTION?,
            // 	LOCATION?,
            // 	UID?,
            // }
            var icalStrFormat = s => s.replace(/\n/g, '\\n').replace(/.{40}/g, c => c + '\r\n ')
            var EVENT_DTSTAMP = icalStrFormat((new Date()).toISOString().replace(/-|:|\.\d+/g, ''))
            var EVENT_DTSTART = e.TSTART && icalStrFormat(e.TSTART.toISOString().replace(/-|:|\.\d+/g, ''))
            var EVENT_DTEND = e.TEND && icalStrFormat(e.TEND.toISOString().replace(/-|:|\.\d+/g, ''))
            var section_lines = [
                `BEGIN:VEVENT`,
                //`DTSTART;TZID=Asia/Shanghai:${EVENT_DTSTART}`,
                `DTSTAMP:${EVENT_DTSTAMP}`,
                `DTSTART:${EVENT_DTSTART}`,
                //`DTEND;TZID=Asia/Shanghai:${EVENT_DTEND}`,
                `DTEND:${EVENT_DTEND}`,
                //`RRULE:FREQ=WEEKLY;COUNT=11;BYDAY=FR`, // 后续升级
                `UID:${e.UID && icalStrFormat(e.UID) || (hash(e.SUMMARY) + "@snomiao.com")}`,
                e.SUMMARY && `SUMMARY:${icalStrFormat(e.SUMMARY)}`,
                e.DESCRIPTION && `DESCRIPTION:${icalStrFormat(e.DESCRIPTION)}`,
                e.LOCATION && `LOCATION:${icalStrFormat(e.LOCATION)}`,
                `END:VEVENT`,
            ]
            return section_lines.filter(e => e).join(`\r\n`);
        }
        // 范例输出
        // BEGIN:VEVENT
        // DTSTART:20190308T050000Z
        // DTEND:20190308T063500Z
        // UID:8523315dacd42732383e3f8d07b9cd88@snomiao.com
        // SUMMARY:大学生体育测试（一）/1850769/B1230001/张群/0.5分/第2周,周5,第5-6节
        // DESCRIPTION:课程序号: 1850769\n课程名称: 大学生体育测试（一）\n课程代码: B
        //  1230001\n课程类型: 公共基础课\n课程学分: 0.5\n授课老师: 张
        //  群\n上课时间: 第2-5周,周5,第5-6节\n上课地点: 奉贤操场\n校区:
        //   奉贤校区\n计划人数: 44\n已选人数: 44\n挂牌: 是\n配课班: 1
        //  6101291, 16101261\n备注: \n
        // LOCATION:奉贤操场
        // END:VEVENT

        var lines = [
            `BEGIN:VCALENDAR`,
            `VERSION:2.0`,
            `PRODID:-//Snowstar Laboratory//NONSGML Snowstar Calendar//EN`,
            `CALSCALE:GREGORIAN`,
            // `X-WR-CALNAME:雪星课程表`,
            // `X-WR-TIMEZONE:Asia/Shanghai`,
            `BEGIN:VTIMEZONE`,
            `TZID:Asia/Shanghai`,
            // `X-LIC-LOCATION:Asia/Shanghai`,
            `BEGIN:STANDARD`,
            `TZOFFSETFROM:+0800`,
            `TZOFFSETTO:+0800`,
            `TZNAME:CST`,
            `DTSTART:19700101T000000`,
            `END:STANDARD`,
            `END:VTIMEZONE`,
            `${事件列表.map(事件转iCalendar格式的SECTION).join('\r\n')}`,
            `END:VCALENDAR`
        ]
        return lines.filter(e => e).join(`\r\n`) + `\r\n`;
    }

    if (location.hostname.match(/^sc.*\.sit\.edu\.cn$/)) {
        // 解析并下载当前页面的日历
        var 下载当前活动日历 = async (e) => {
            if (e) e.disabled = true;
            var href = window.location;
            var html = await 异步抓取(href)
            var re = 解析第二课堂活动事件(html)
            re.DESCRIPTION += '\n' + href;
            var 输出ics = 日历事件列表转ICS格式([re]);
            下载文本文件(输出ics, "第二课堂活动：" + document.querySelector("h1").innerText + ".ical")
            if (e) e.disabled = false;
        }

        var 当前页面活动列表日历 = async (e) => {
            if (e) e.disabled = true;
            // 获取当前页面上所有活动详情的URL;
            var hrefs = [...document.querySelectorAll("a")].map(a => a.href).filter(href => !!href.match("activityDetail.action"))

            // 异步下载所有事件
            var 事件列 = [];
            await Promise.all(hrefs.map(async href => {
                let html = await 异步抓取(href)
                var 事件 = 解析第二课堂活动事件(html)
                事件.DESCRIPTION += '\n' + href;
                事件列.push(事件)

                // 全部抓取完成之后保存本地
                if (事件列.length == hrefs.length) {
                    var 输出ics = 日历事件列表转ICS格式(事件列);
                    下载文本文件(输出ics, document.querySelector("title").innerText + ".ical")
                }
            }))
            if (e) e.disabled = false;
        }

        var 下载近期所有第二课堂活动日历 = async (e) => {
            if (e) e.disabled = true;
            // TODO: 进度条
            // let caption = e.innerText
            // e.innerText = caption + "" +
            // let doneCount =
            let all_events = [];

            // 异步列出每个分类最近的50个活动，并等待全部返回
            await Promise.all(([
                [`001`, `讲座报告`],
                [`ff808081674ec4720167ce60dda77cea`, `主题教育`],
                [`ff8080814e241104014eb867e1481dc3`, `创新创业创意`],
                [`8ab17f543fe626a8013fe6278a880001`, `社团社区易班、学院活动`],
                [`8ab17f543fe62d5d013fe62efd3a0002`, `社会实践`],
                [`8ab17f543fe62d5d013fe62e6dc70001`, `公益志愿`],
                [`402881de5d62ba57015d6320f1a7000c`, `安全教育网络教学`],
                [`8ab17f2a3fe6585e013fe6596c300001`, `校园文化竞赛活动`],
                [`8ab17f533ff05c27013ff06d10bf0001`, `论文专利`],
                [`ff8080814e241104014fedbbf7fd329d`, `会议（无学分）`]
            ]).map(async (target) => {
                let url = `/public/activity/activityList.action?pageNo=1&pageSize=50&categoryId=${target[0]}`;
                let actType = target[1];

                // 获取当前分类的活动链接（列表）
                let v_dom = document.createElement("html");
                v_dom.innerHTML = await 异步抓取(url)
                var hrefs = [...v_dom.querySelectorAll("a")].map(a => a.href).filter(href => !!href.match("activityDetail.action"))

                // 异步下载所有活动，并等待全部下载完成
                let events = await Promise.all(hrefs.map(async href => {
                    let html = await 异步抓取(href)
                    var event = 解析第二课堂活动事件(html)
                    event.DESCRIPTION += '\n' + href;

                    // 除此之外还要标出活动类型
                    event.DESCRIPTION = "活动类型: " + actType + "\n\n" + event.DESCRIPTION;
                    return event;
                }))
                // 收集
                all_events = all_events.concat(events);
            }))

            // 转成ical格式并触发下载
            var 输出ics = make_ical(all_events);
            下载文本文件(输出ics, "[" + new Date().toISOString().replace(/[^0-9]/g, '').substr(0, 8) + "]近期第二课堂活动.ical")

            if (e) e.disabled = false;
        }

        var 诚信积分一键加满 = async (e) => {
            if (e) e.disabled = true;
            // 获取当前分类的活动申请编号（列表）
            let v_dom = document.createElement("html");
            v_dom.innerHTML = await 异步抓取("http://sc.sit.edu.cn/public/pcenter/activityOrderList.action?pageNo=1&pageSize=999999999")
            var lsOrderId = [...v_dom.querySelectorAll("form td:nth-child(1)>a")].map(e => parseInt(e.innerText));
            await Promise.all(lsOrderId.map(async oid => {
                // 五分好评666！
                let assess = 100
                let content = '666'
                let actityOrderId = oid
                await 异步抓取(`http://sc.sit.edu.cn/public/pcenter/assess.action?assess=${assess}&content=${content}&actityOrderId=${actityOrderId}`)
            }));
            if (e) e.disabled = false;
        }

        // 显示工具栏
        var flag_已有工具栏 = false;
        var 生成工具栏 = () => {
            var 容器 = document.querySelector(".user-info")
            if (!容器 || flag_已有工具栏) return;

            var 工具栏元素列表 = [
                新元素(`<a href="http://sc.sit.edu.cn/public/activity/activityList.action?pageNo=1&pageSize=200&categoryId=&activityName=">查看最近的200个活动</a>`),
                window.location.href.match("activityDetail.action")
                    ? 绑定Click到元素(下载当前活动日历, 新元素(`<button>下载 当前事件.ical</button>`))
                    : 绑定Click到元素(当前页面活动列表日历, 新元素(`<button>下载 当前页面活动列表.ical</button>`)),
                绑定Click到元素(下载近期所有第二课堂活动日历, 新元素(`<button>下载 近期所有第二课堂活动.ical</button>`)),
                绑定Click到元素(诚信积分一键加满, 新元素(`<button>诚信积分一键加满！</button>`)),
            ]
            var 工具栏 = 新元素("<span></span>")
            工具栏元素列表.map(e => 工具栏.appendChild(e))

            容器.append(工具栏);
            flag_已有工具栏 = true;
        }
        window.addEventListener("load", 生成工具栏)
        生成工具栏()

    }


    // 选课页面
    var 绑定点击 = (元素, 描述, f) => {
        元素.setAttribute("title", 描述)
        元素.classList.add("clickable")
        元素.onclick = f
    }
    if (location.hostname.match(/^ems.*\.sit\.edu\.cn$/) && location.pathname == "/student/selCourse/mycourselist.jsp") {
        var 可以选班级列表 = [...document.querySelectorAll(`tr`)].filter(x => x.querySelectorAll(`td`).length == 14)
        可以选班级列表.map(tr => {
            var 单元格表 = [...tr.querySelectorAll("td")]
            var [课程序号, 课程名称, 课程代码, 课程类型, 学分, 授课老师, 上课时间, 上课地点, 校区, 计划人数, 已选人数, 挂牌, 配课班, 备注] = 单元格表.map(e => e.innerText.trim());
            var 课程 = { 课程序号, 课程名称, 课程代码, 课程类型, 学分, 授课老师, 上课时间, 上课地点, 校区, 计划人数, 已选人数, 挂牌, 配课班, 备注 }

            绑定点击(单元格表[6], "点击下载本课程日历", () => {
                下载单个课程日历(课程)
            })
        })

        
    }

    if (location.pathname == "/student/selCourse/list1.jsp") {
        var lsClasses = [...document.querySelectorAll(`tr[align="center"]`)]
        lsClasses.map(e => {
            var 单元格表 = [...e.querySelectorAll("td")]
            var [课程序号, 课程名称, 课程代码, 学分, 授课老师, 上课时间, 上课地点, 选课类型, 选课结果, 操作] = 单元格表.map(e => e.innerText.trim())
            var 课程 = { 课程序号, 课程名称, 课程代码, 学分, 授课老师, 上课时间, 上课地点, 选课类型, 选课结果, 操作 }

            单元格表[9].innerHTML = `
<a style="color:red" href="#" onclick="tj(2,'${课程序号}','${课程代码}')">取消选择</a><br>
<a style="color:red" href="/student/selCourse/action.jsp?op=del&courseID=${课程代码}&cssID=${课程序号}&url=/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" target="_BLANK" alt="有可能选不上">退课重选（慎用）</a>
`
            绑定点击(单元格表[5], "点击下载本课程日历", () => {
                下载单个课程日历(课程)
            })
        })


        var 表头行 = document.querySelector(`form tr`)
        var 单元格表 = [...表头行.querySelectorAll("th")]
        绑定点击(单元格表[5], "点击下载多个课程日历", () => {
            var 课程列表 = lsClasses.map(e => {
                var 单元格表 = [...e.querySelectorAll("td")]
                var [课程序号, 课程名称, 课程代码, 学分, 授课老师, 上课时间, 上课地点, 选课类型, 选课结果, 操作] = 单元格表.map(e => e.innerText.trim())
                return { 课程序号, 课程名称, 课程代码, 学分, 授课老师, 上课时间, 上课地点, 选课类型, 选课结果, 操作 }
            })
            下载多个课程日历(课程列表)
        })
    }
    
    // 考试
    if (location.pathname == "/student/main.jsp") {
        var 表格 = [...document.querySelectorAll("table")].filter(tab => tab.innerHTML.match("我的考试"))
        var 表格 = 表格 && 表格[0]
        var 阵 = [...表格.querySelectorAll("tr")].map(tr => [...tr.querySelectorAll("td")]).filter(e => e.length == 5)
        绑定点击(阵[0][2], "点击下载所有考试日历", () => {
            var 考试列表 = 阵.slice(1).map(单元格行 => {
                var [序号, 考试课程, 考试时间, 考试地点, 考试性质] = 单元格行.map(e => e.innerText.trim());
                return {序号, 考试课程, 考试时间, 考试地点, 考试性质}
            })
            下载多个考试日历(考试列表)
        })
        阵.slice(1).map(单元格行 => {
            var [序号, 考试课程, 考试时间, 考试地点, 考试性质] = 单元格行.map(e => e.innerText.trim());
            var 考试 = { 序号, 考试课程, 考试时间, 考试地点, 考试性质 }
            绑定点击(单元格行[2], "点击下载本考试日历", () => {
                下载单个考试日历(考试)
            })
        })
    }
    document.body.appendChild(新元素("<style>.clickable{cursor: pointer}</style>"))
})();

