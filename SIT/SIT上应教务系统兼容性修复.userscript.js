// ==UserScript==
// @name         SIT上应教务系统兼容性修复
// @namespace    snomiao@gmail.com
// @version      0.8
// @description  使兼容 Chrome, 目前发现的bug范围包括评教、成绩查询等功能，强行退课、选到无法选中的课等。(20191209)增加学分绩点计算以及刷分重修指标。
// @author       snomiao
// @match        http*://ems1.sit.edu.cn:85/student/*
// @match        http*://ems.sit.edu.cn:85/student/*
// @match        http*://ems1.sit.edu.cn:85/admin/*
// @match        http*://ems.sit.edu.cn:85/admin/*
// @match        http*://sam1.sit.edu.cn/*
// @match        http*://sam.sit.edu.cn/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    var 归类以 = 分组依据 => 列表 => 列表.reduce((组, 元) => {
        (组[分组依据(元)] = 组[分组依据(元)] || []).push(元);
        return 组;
    }, {})
    var 划分以 = 分组依据 => 列表 => Object.values(归类以(分组依据)(列表))
    var 求和 = (列表) => 列表.reduce((a, b) => a + b, 0)

    // 主要兼容 form 在 IE 下的用法
    document.querySelectorAll("form").forEach(form => {
        form.all = x => form.all[x] || form[x];
        form.querySelectorAll("[name],[value]").forEach(e => {
            var all = [...form.querySelectorAll(`[name]`)];
            form.all[e.name] = all.length == 1 ? all[0] : all;
            e.id = e.id || e.name;
            [...e.attributes].forEach(attr => { if (!e[attr.name]) (e[attr.name] = attr.value) })
        });
    });

    if (location.pathname == "/student/selCourse/list1.jsp") {
        var lsClasses = [...document.querySelectorAll(`tr[align="center"]`)]
        lsClasses.map(e => {
            var lstd = [...e.querySelectorAll("td")]
            var [课程序号, 课程名称, 课程代码, 学分, 授课老师, 上课时间, 上课地点, 选课类型, 选课结果, 操作] = lstd.map(e => e.textContent.trim())
            if (选课结果 == "已确认") {
                lstd[9].innerHTML = `
                    <a style="color:red" href="###" onclick="tj(2,'${课程序号}','${课程代码}')">强制取消选择</a><br>
                    <a style="color:red" href="/student/selCourse/action.jsp?op=del&courseID=${课程代码}&cssID=${课程序号}&url=/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" target="_BLANK" alt="有可能选不上">强制重新选择</a>
                `
            } else {
                lstd[9].innerHTML = `
                    <a style="color:red" href="###" onclick="tj(2,'${课程序号}','${课程代码}')">取消选择</a><br>
                    <a style="color:red" href="/student/selCourse/action.jsp?op=del&courseID=${课程代码}&cssID=${课程序号}&url=/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" target="_BLANK" alt="有可能选不上">重新选择</a>
                `
            }
        })
    }
    if (location.pathname == "/student/selCourse/studentSel/selcourse_ts.jsp") {
        var 可以选课列表 = [...document.querySelectorAll(`tr`)].filter(x => x.querySelectorAll(`td`).length == 16)
        可以选课列表.map(e => {
            var lstd = [...e.querySelectorAll("td")]
            var 课程编号 = lstd[1].textContent.trim()
            var 课程名称 = lstd[2].textContent.trim()
            lstd[1].innerHTML = `<a onclick="opens('${课程编号}','${课程名称}')" href="javascript:void(0);">${课程编号}</a>`
        })
    }

    var 选课 = (课程序号, 课程代码, 学号, 确认 = "1") => {
        var html = `
            <form action="/student/selCourse/studentSel/StudentSelCourse.action" name="frm1" id="frm1" method="post" target="selcourse" >
            <input type="text" name="op" value="sel"><br>
            <input type="text" name="selStudent" value="${学号}"><br>
            <input type="text" name="selCssID" value="${课程序号}"><br>
            <input type="text" name="selCourseID" value="${课程代码}"><br>
            <input type="text" name="isconfrm" value="${确认}"><br>
            <input type="text" name="selYearTerm" value="2020春"><br>
            <input type="text" name="currYearTerm" value="2019秋"><br>
            <input type="text" name="selcourseStage" value="海选"><br>
            <input type="text" name="_tbName" value="openAdmin.selCourse.StudentSelCourse"><br>
            <input type="text" name="sucURL" value="/student/selCourse/studentSel/selcourse_ok.jsp?courseId=${课程代码}"><br>
            <input type="text" name="failURL" value="/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}"><br>
            <input type="submit" value="提交" class="submit">
            </form>
            `
        var ele = document.createElement('div')
        ele.innerHTML = html;
        document.body.appendChild(ele);
        ele.querySelector(`.submit`).click()
        ele.parentElement.removeChild(ele)
    }
    if (location.pathname == "/student/selCourse/mycourselist.jsp") {
        var 可以选班级列表 = [...document.querySelectorAll(`tr`)].filter(x => x.querySelectorAll(`td`).length == 14)
        可以选班级列表.map(e => {
            var lstd = [...e.querySelectorAll("td")]
            var [课程序号, 课程名称, 课程代码, 课程类型, 学分, 授课老师, 上课时间, 上课地点, 校区, 计划人数, 已选人数, 挂牌, 配课班, 备注] = lstd.map(e => e.textContent.trim())
            lstd[0].innerHTML = `<a href="/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" target="_BLANK" alt="选这门课">${课程序号}</a>`
            lstd[0].innerHTML = `<a href="/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" alt="选这门课">${课程序号}</a>`
            lstd[0].querySelector("a").addEventListener("click", (e) => {
                if (e.shiftKey || e.altKey) {
                    e.preventDefault()
                    var 学号 = (e => e && e[1] || "")(document.cookie.match(/jwc_share_cookie=(\w+)\b/))
                    if (e.altKey) {
                        学号 = prompt("输入需要选课的人的学号", 学号);
                    }
                    学号 && 选课(课程序号, 课程代码, 学号, 1);
                }
            })
            lstd[2].innerHTML = `<a href="/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" target="_BLANK" alt="打开选课页面">${课程代码}</a>`

        })
    }
    if (location.pathname == "/student/graduate/viewcreditdetail.jsp") {
        // var 计划课程列表 = [...document.querySelectorAll(`tr`)].filter(x => x.querySelectorAll(`td[colspan="13"]`).length == 13)
        var 计划课程列表 = [...document.querySelectorAll(`tr`)].filter(x => x.querySelectorAll(`td:not([rowspan])`).length == 13)
        var 已修学分 = 0, 已修学分绩点 = 0;
        var 已修必修学分 = 0, 已修必修学分绩点 = 0;
        var 已修选修学分 = 0, 已修选修学分绩点 = 0;
        var 分类 = ""
        var 课程情况表 = 计划课程列表.map(e => {
            var 分类单元格 = e.querySelector("td[rowspan]")
            分类单元格 && (分类 = 分类单元格.innerText.trim())
            var 单元格表 = [...e.querySelectorAll("td:not([rowspan])")]
            var [课程代码, 课程名称, 性质, 公选性质, 学分, 成绩, 绩点, 重修次数, 完成情况, 替代情况, 计划学期, 修读学年学期, 备注] = 单元格表.map(e => e.textContent.trim())
            return { 分类, 课程代码, 课程名称, 性质, 公选性质, 学分, 成绩, 绩点, 重修次数, 完成情况, 替代情况, 计划学期, 修读学年学期, 备注, 单元格表 }
        })

        课程情况表.map(({ 单元格表, 课程代码 }) => {
            单元格表[0].innerHTML = `<a href="/student/selCourse/studentSel/teachclasslist.jsp?courseId=${课程代码}" target="_BLANK" alt="打开选课页面">${课程代码}</a>`
        })
        var 百分位 = x => ((x * 100 | 0) / 100)
        var 计算学分情况 = (课程情况表) => {
            var 课程情况表已修 = 课程情况表.filter(({ 绩点 }) => 绩点)
            var 课程情况表已通过 = 课程情况表已修.filter(({ 完成情况 }) => 完成情况 === "已通过")

            var 可修学分 = 求和(课程情况表.map(({ 学分 }) => +学分))
            var 课程数量 = 课程情况表.length

            var 已修学分 = 求和(课程情况表已修.map(({ 学分 }) => +学分))
            var 已修学分绩点 = 求和(课程情况表已修.map(({ 绩点, 学分 }) => +绩点 * +学分))
            var 已通过平均绩点 = 已修学分绩点 / 已修学分

            var 已通过学分 = 求和(课程情况表已通过.map(({ 学分 }) => +学分))
            var 已通过学分绩点 = 求和(课程情况表已通过.map(({ 绩点, 学分 }) => +绩点 * +学分))
            var 已通过平均绩点 = 已通过学分绩点 / 已通过学分

            return { 课程数量, 可修学分, 已修学分, 已通过平均绩点, 已通过学分, 已通过平均绩点 }
        }
        var 输出学分 = ({ 已通过学分, 可修学分, 已通过平均绩点 }) => `已修学分/可修学分：${已通过学分}/${可修学分} \t 平均绩点：${百分位(已通过平均绩点)}`
        var 学分情况所有课程 = 计算学分情况(课程情况表)
        var 已修学分 = 学分情况所有课程.已修学分
        var 修读情况所有课程 = 输出学分(学分情况所有课程)
        var 修读情况按学期 = 划分以(({ 修读学年学期 }) => 修读学年学期)(课程情况表)
            .filter(子课程情况表 => 子课程情况表[0].修读学年学期)
            .map(子课程情况表 => `${子课程情况表[0].修读学年学期}修读情况：${输出学分(计算学分情况(子课程情况表))}`).join("<br>")
        var 修读情况按分类 = 划分以(({ 分类 }) => 分类)(课程情况表)
            .filter(子课程情况表 => 子课程情况表[0].分类)
            .map(子课程情况表 => `${子课程情况表[0].分类}修读情况：${输出学分(计算学分情况(子课程情况表))}`).join("<br>")

        var 修读情况 = [
            "总修读情况：<br>" + 修读情况所有课程,
            "修读情况按学期：<br>" + 修读情况按学期,
            "修读情况按分类：<br>" + 修读情况按分类,
        ].join("<br><br>")
        // var 修读情况按性质 = 划分以(({性质})=>性质)(课程情况表).map(子课程情况=>`${子课程情况[0].性质}课程修读情况：${计算学分情况(子课程情况)}`)

        document.querySelector("b").parentElement.innerHTML = `
<b>个人计划完成情况</b>
<div style="text-align:left">${修读情况}</div>
<div>注：所谓绩点提高空间，就是指若将这门课立刻重修得到100分的总评成绩，可以提升多少点平均绩点。这个值并不包含目前没有修读的课程，只是作为一个你当前各科目的相对短板程度的参考指标。</div>
`
        课程情况表.map(({ 学分, 成绩, 绩点, 单元格表 }) => {
            if (成绩) {

                var 绩点提高空间 = (5 - 绩点) * 学分
                单元格表[12].innerHTML = "绩点提高空间：" + (百分位(绩点提高空间 / 已修学分)) + " " + [...Array(0 | 绩点提高空间)].join("|") + "<br>" + 单元格表[12].innerHTML
            }
        })

    }
    if (location.pathname == "/student/graduate/scorepoint.jsp") {
        window.getSelVal = (obj) => {
            var ops = obj.options || obj[0].options;
            for (var i = 0; i < ops.length; i++) {
                if (ops[i].selected) {
                    return ops[i].value;
                }
            }
            return "";
        }
    }
    if (location.hostname == "sam1.sit.edu.cn" && location.pathname == "/menu.jsp") {
        [...document.querySelectorAll("a")].map(e => {
            try {
                var href = e.attributes.onclick.textContent.match(/javascript:loadMask\(["'](.*?)["']/)[1]
                e.setAttribute("href", href)
                e.setAttribute("target", "main")
            } catch{ }
        })
    }

    // 增加表格排序功能（还有些bug..)
    /*
    var 元素移到尾部 = (e) => e.parentElement.appendChild(e.parentElement.removeChild(e))
    var 混合排序按 = 函数 => 列 => 列.sort((a, b) => {
        [a, b] = [a, b].map(函数)
        var c = isFinite(a), d = isFinite(b);
        return (c != d && d - c) || (c && d && a - b) || (("" + a).localeCompare(b))
    })
    var 使可排序 = (表) => {
        var 表行 = [...表.querySelectorAll("tbody>tr")]
        if (表行.length < 2) return;
        var 表头行 = 表行.shift()
        console.log(表头行)
        var 表头单元列 = [...表头行.querySelectorAll("th, td")].filter(e => e.parentElement == 表头行)
        表头单元列.map((表头单元, 序数) => {
            表头单元.setAttribute("title", "点击按此列排序")
            表头单元.addEventListener("click", sortByTr => {
                var 有序表行 = 混合排序按(e => e.children[序数] && e.children[序数].innerText)(表行)
                有序表行.reverse().map((e) => e.parentElement.insertBefore(e.parentElement.removeChild(e), 有序表行[0]))
            })
        })
    }

    [...document.querySelectorAll("table")].map(使可排序)
    */

})();