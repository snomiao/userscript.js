// ==UserScript==
// @name         SIT上应第二课堂日程助手
// @namespace    snomiao@gmail.com
// @version      20190428.124434
// @description  功能：1) 在任意活动内下载ical格式的日程表 2)一键显示前200项活动
// @author       snomiao
// @match        http://sc.sit.edu.cn/*
// @match        https://sc.sit.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//导入MD5函数
String.prototype.MD5 = function(){
    var string = this;
    function RotateLeft(lValue, iShiftBits) {
            return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
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

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1=lMessageLength + 8;
            var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
            var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
            var lWordArray=Array(lNumberOfWords-1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while ( lByteCount < lMessageLength ) {
                    lWordCount = (lByteCount-(lByteCount % 4))/4;
                    lBytePosition = (lByteCount % 4)*8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                    lByteCount++;
            }
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
            lWordArray[lNumberOfWords-2] = lMessageLength<<3;
            lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
            return lWordArray;
    };

    function WordToHex(lValue) {
            var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
            for (lCount = 0;lCount<=3;lCount++) {
                    lByte = (lValue>>>(lCount*8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
            }
            return WordToHexValue;
    };

    function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                            utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
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

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
            AA=a; BB=b; CC=c; DD=d;
            a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
            d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
            c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
            b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
            a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
            d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
            c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
            b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
            a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
            d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
            c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
            b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
            a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
            d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
            c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
            b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
            a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
            d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
            c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
            b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
            a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
            d=GG(d,a,b,c,x[k+10],S22,0x2441453);
            c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
            b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
            a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
            d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
            c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
            b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
            a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
            d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
            c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
            b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
            a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
            d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
            c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
            b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
            a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
            d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
            c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
            b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
            a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
            d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
            c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
            b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
            a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
            d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
            c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
            b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
            a=II(a,b,c,d,x[k+0], S41,0xF4292244);
            d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
            c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
            b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
            a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
            d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
            c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
            b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
            a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
            d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
            c=II(c,d,a,b,x[k+6], S43,0xA3014314);
            b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
            a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
            d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
            c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
            b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
            a=AddUnsigned(a,AA);
            b=AddUnsigned(b,BB);
            c=AddUnsigned(c,CC);
            d=AddUnsigned(d,DD);
         }

     var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

     return temp.toLowerCase();
}


var taskcount = 0;
var httpGetAsync = (theUrl) => {
	return new Promise((resolve, reject)=>{
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState == 4){
                taskcount--;
                if(httpRequest.status == 200) {
                    //if you fetch a file you can JSON.parse(httpRequest.responseText)
                    var data = httpRequest.responseText;
                    resolve(data);
                }else{
                    // 连接失败后的重试机制
                    (async ()=>{
                        let data = await httpGetAsync(theUrl)
                        resolve(data);
                    })()
                }
            }
		};
		httpRequest.open('GET', theUrl, true);

        // 限制并发连接数在10个以内'
        // 改为1的时候就是串行
        let limit = 10
        let timer = setInterval(()=>{
            if(taskcount < limit){
                httpRequest.send(null);
                taskcount++;
                clearInterval(timer);
            }
        }, 1000 * Math.random())
	})
}
//httpGetAsync("https://my.sit.edu.cn");

var parseEventData = (html) => {
    var re = {}
    // 样例
    let _抓取html样例 = `<h1 class="title_8">【学工部】上海应用技术大学2019届毕业生春季校园综合招聘会</h1>
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
    var eleHTML = document.createElement("html")
    eleHTML.innerHTML = html;

    var scEvent = {}
    var 活动信息 = eleHTML.querySelector("div.box-1 > div:nth-child(2)").innerHTML.replace(/&nbsp;/g," ").replace(/<br>/g,"").split('\n').map(x=>x).join('\n');
    var 活动类型 = eleHTML.querySelector(".hover-a").innerText;
    scEvent.hash = ("第二课堂活动：" + 活动信息.match(/活动编号：(.*)/m)[1]).MD5(32)
    scEvent.subject = eleHTML.querySelector("h1").innerText;
    if(活动信息.match(/刷卡时间段：[-\d]+ [:\d]+.*?[-\d]+ [:\d]+/m)){
        scEvent.starts = new Date(活动信息.match(/刷卡时间段：([-\d]+ [:\d]+).*?[-\d]+ [:\d]+/m)[1])
        scEvent.ends = new Date(活动信息.match(/刷卡时间段：[-\d]+ [:\d]+.*?([-\d]+ [:\d]+)/m)[1])
        //console.warn(`time doesn't match`, 活动信息)
    }else if(活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m) &&
             活动信息.match(/活动时长：([零一二三四五六七八九十0-9]*)\s*?个?\s*?((?:年|季度|月|周|天|小时|刻钟|分钟|分钟|星期|礼拜|日|时|刻|分|秒钟|秒)?) 分钟.*?/m) ){
        let hdsc_match = 活动信息.match(/活动时长：([零一二三四五六七八九十0-9]*)\s*?个?\s*?((?:年|季度|月|周|天|小时|刻钟|分钟|分钟|星期|礼拜|日|时|刻|分|秒钟|秒)?) 分钟.*?/m);
        let num = hdsc_match[1].replace(/[零一二三四五六七八九十]/g,(s)=>"零一二三四五六七八九十".indexOf(s))
        let unit = (
            hdsc_match[2].length ? hdsc_match[2]
            .replace(/年/,1000*60*60*24*365/4)
            .replace(/季度/,1000*60*60*24*365/4)
            .replace(/月/,1000*60*60*24*30)
            .replace(/周|星期|礼拜/,1000*60*60*24)
            .replace(/天|日/,1000*60*60*24)
            .replace(/小时|时/,1000*60*60)
            .replace(/刻钟|刻/,1000*60*15)
            .replace(/分钟|分/,1000*60)
            .replace(/秒钟|秒/,1000)
            : 1000 * 60) // 不带单位默认分钟
        let hdsc_ms = parseInt(unit) * num;
        scEvent.starts = new Date(活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m)[1])
        scEvent.ends = new Date(+scEvent.starts + hdsc_ms);
    }else if(活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m)){
        scEvent.starts = new Date(活动信息.match(/活动开始时间：([-\d]+ [:\d]+).*?/m)[1])
        scEvent.ends = new Date(+scEvent.starts + 1000*60*90);
        console.warn(`未能解析活动时长，默认90分钟`, 活动信息)
    }else{
        console.warn(`time doesn't match`, 活动信息)
        return undefined;
    }
    scEvent.location = 活动信息.match(/活动地点：(.*)/m)[1]
    scEvent.description = "活动类型：" + 活动类型 + '\n\n' + 活动信息 + '\n\n' + eleHTML.querySelector("div.box-1 > div:nth-child(3)").innerText
    return scEvent;
}

// activityList.action 活动列表页面
var make_ical = (events)=>{
    // debug
    console.log(events)
    //
    var CALNAME = "第二课堂活动日历"
    var EVENTS = events.map(event=>{
        // ical样例
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
        var EVENT_UID = event.hash + `@sit.snomiao.com`; //打算后面升级一下随机数算法
        var EVENT_SUMMARY     = event.subject;
        var EVENT_DTSTART     = (new Date(event.starts)).toISOString().replace(/-|:|\.\d+/g, '');

        var EVENT_DTEND       = (new Date(event.ends)).toISOString().replace(/-|:|\.\d+/g, '');
        var EVENT_LOCATION    = event.location;
        var EVENT_DESCRIPTION = event.description
            .split('\n').map(x=>x.trim()).join('\n').replace(/[ ]+/g, " ").replace(/[\r\n]+/g, "\n") /*删除多余的空格和换行*/
            .replace(/\n/g,'\\n').replace(/.{40}/g, c => c + '\r\n ')/*reshape为ICAL可以接受的格式*/
        var section = ""
        section += `BEGIN:VEVENT\r\n`
        section += `DTSTART:${EVENT_DTSTART}\r\n`
        section += `DTEND:${EVENT_DTEND}\r\n`
        //section += `RRULE:FREQ=WEEKLY;COUNT=11;BYDAY=FR\r\n` // 后续升级
        section += `UID:${EVENT_UID}\r\n`; //
        section += `SUMMARY:${EVENT_SUMMARY}\r\n`;
        section += `DESCRIPTION:${EVENT_DESCRIPTION}\r\n`;
        section += `LOCATION:${EVENT_LOCATION}\r\n`;
        section += `END:VEVENT\r\n`;
        return section;
    }).join('\r\n');

    var ics输出 = ``
    ics输出 += `BEGIN:VCALENDAR\r\n`;
    ics输出 += `VERSION:2.0\r\n`;
    ics输出 += `CALSCALE:GREGORIAN\r\n`;
    ics输出 += `X-WR-CALNAME:${CALNAME}\r\n`;
    ics输出 += `X-WR-TIMEZONE:Asia/Shanghai\r\n`;
    ics输出 += `BEGIN:VTIMEZONE\r\n`;
    ics输出 += `TZID:Asia/Shanghai\r\n`;
    ics输出 += `X-LIC-LOCATION:Asia/Shanghai\r\n`;
    ics输出 += `BEGIN:STANDARD\r\n`;
    ics输出 += `TZOFFSETFROM:+0800\r\n`;
    ics输出 += `TZOFFSETTO:+0800\r\n`;
    ics输出 += `TZNAME:CST\r\n`;
    ics输出 += `DTSTART:19700101T000000\r\n`;
    ics输出 += `END:STANDARD\r\n`;
    ics输出 += `END:VTIMEZONE\r\n`;
    ics输出 += `\r\n`;
    ics输出 += EVENTS;
    ics输出 += `\r\n`;
    ics输出 += `END:VCALENDAR\r\n`;

    return ics输出;
}

function download(href, title) {
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('download', title);
    a.click();
}
var download_text_plain = (text, title) => {
    download(URL.createObjectURL(new Blob([text])), title);
}

// 显示工具栏
var mk_toolbar_flag = false;
var mk_toolbar = ()=>{
    var container = document.querySelector(".user-info")
    if(!container || mk_toolbar_flag){
        return
    }
    var tool_bar = document.createElement("span")

    var toolbarHTML = `<a href="http://sc.sit.edu.cn/public/activity/activityList.action?pageNo=1&pageSize=200&categoryId=&activityName=">查看最近的200个活动</a>`
    if(window.location.href.match("activityDetail.action")){
        toolbarHTML += ` <button onclick="download_current_activity_calendar_ical(this)">下载 当前事件.ical</button>`
    }else{
        toolbarHTML += ` <button onclick="download_listof_activity_calendar_ical(this)">下载 当前页面活动列表.ical</button>`
    }
    toolbarHTML += ` <button onclick="download_all_listof_activity_calendar_ical(this)">下载 近期所有第二课堂活动.ical</button>`
    toolbarHTML += ` <button onclick="one_click_max_credit(this)">诚信积分一键加满！</button>`

    tool_bar.innerHTML = toolbarHTML;
    //container.insertBefore(tool_bar,container.firstChild);
    container.append(tool_bar);
    mk_toolbar_flag = true;

}

// 解析并下载当前页面的日历
window.download_current_activity_calendar_ical = async (e) => {
    if(e) e.disabled=true;
    var href = window.location;
    var html = await httpGetAsync(href)
    var re = parseEventData(html)
    re.description += '\n' + href;
    var ical_content = make_ical([re]);
    download_text_plain(ical_content, "第二课堂活动：" + document.querySelector("h1").innerText + ".ical")
    if(e) e.disabled=false;
}

window.download_listof_activity_calendar_ical = async (e) => {
    if(e) e.disabled=true;
    // 获取当前页面上所有活动详情的URL;
    var hrefs = [...document.querySelectorAll("a")].map(a=>a.href).filter(href=>!!href.match("activityDetail.action"))

    // 异步下载所有事件
    var events = [];
    await Promise.all(hrefs.map(async href => {
        let html = await httpGetAsync(href)
        var event = parseEventData(html)
        event.description += '\n' + href;
        events.push(event)

        if(events.length == hrefs.length){
            var ical_content = make_ical(events);
            download_text_plain(ical_content, document.querySelector("title").innerText + ".ical")
        }
    }))
    if(e) e.disabled=false;
}

window.download_all_listof_activity_calendar_ical = async (e) => {
    if(e) e.disabled=true;
    // TODO: 进度条
    // let caption = e.innerText
    // e.innerText = caption + "" +
    // let doneCount =
    let all_events = [];

    // 异步列出每个分类最近的50个活动，并等待全部返回
    await Promise.all(([
        [`001`,`讲座报告`],
        [`ff808081674ec4720167ce60dda77cea`,`主题教育`],
        [`ff8080814e241104014eb867e1481dc3`,`创新创业创意`],
        [`8ab17f543fe626a8013fe6278a880001`,`社团社区易班、学院活动`],
        [`8ab17f543fe62d5d013fe62efd3a0002`,`社会实践`],
        [`8ab17f543fe62d5d013fe62e6dc70001`,`公益志愿`],
        [`402881de5d62ba57015d6320f1a7000c`,`安全教育网络教学`],
        [`8ab17f2a3fe6585e013fe6596c300001`,`校园文化竞赛活动`],
        [`8ab17f533ff05c27013ff06d10bf0001`,`论文专利`],
        [`ff8080814e241104014fedbbf7fd329d`,`会议（无学分）`]
    ]).map(async (target)=>{
        let url=`/public/activity/activityList.action?pageNo=1&pageSize=50&categoryId=${target[0]}`;
        let actType=target[1];

        // 获取当前分类的活动链接（列表）
        let v_dom = document.createElement("html");
        v_dom.innerHTML = await httpGetAsync(url)
        var hrefs = [...v_dom.querySelectorAll("a")].map(a=>a.href).filter(href=>!!href.match("activityDetail.action"))

        // 异步下载所有活动，并等待全部下载完成
        let events = await Promise.all(hrefs.map(async href => {
            let html = await httpGetAsync(href)
            var event = parseEventData(html)
            event.description += '\n' + href;

            // 除此之外还要标出活动类型
            event.description = "活动类型: " + actType + "\n\n" + event.description;
            return event;
        }))
        // 收集
        all_events = all_events.concat(events);
    }))

    // 转成ical格式并触发下载
    var ical_content = make_ical(all_events);
    download_text_plain(ical_content, "[" + new Date().toISOString().replace(/[^0-9]/g,'').substr(0,8) + "]近期第二课堂活动.ical")

    if(e) e.disabled=false;
}

window.one_click_max_credit = async (e) => {
    if(e) e.disabled=true;
    // 获取当前分类的活动申请编号（列表）
    let v_dom = document.createElement("html");
    v_dom.innerHTML = await httpGetAsync("http://sc.sit.edu.cn/public/pcenter/activityOrderList.action?pageNo=1&pageSize=999999999")
    var lsOrderId = [...v_dom.querySelectorAll("form td:nth-child(1)>a")].map(e=>parseInt(e.innerText));
    await Promise.all(lsOrderId.map(async oid => {
        // 五分好评666！
        let assess = 100
        let content = '666'
        let actityOrderId = oid
        await httpGetAsync(`http://sc.sit.edu.cn/public/pcenter/assess.action?assess=${assess}&content=${content}&actityOrderId=${actityOrderId}`)
    }));
    if(e) e.disabled=false;
}

window.addEventListener("load", mk_toolbar)
mk_toolbar()
})();