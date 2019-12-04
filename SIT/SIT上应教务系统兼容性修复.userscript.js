// ==UserScript==
// @name         SIT上应教务系统兼容性修复
// @namespace    snomiao@gmail.com
// @version      0.5
// @description  使兼容 Chrome, 目前发现的bug范围包括评教、成绩查询等功能，强行退课、选到无法选中的课等。
// @author       snomiao
// @match        http*://ems1.sit.edu.cn:85/student/*
// @match        http*://ems.sit.edu.cn:85/student/*
// @match        http*://ems1.sit.edu.cn:85/admin/*
// @match        http*://ems.sit.edu.cn:85/admin/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	// 主要兼容 form 在 IE 下的用法
	document.querySelectorAll('form').forEach( form => {
		form.all = x => form.all[x] || form[x];
		form.querySelectorAll('[name], [value]').forEach(e => {
			var all = [...form.querySelectorAll('[name]')];
			form.all[e.name] = all.length == 1 ? all[0] : all;
			e.id = e.id || e.name;
			[...e.attributes].forEach(attr => {
            if( !e[attr.name] ) e[attr.name] = attr.value
         });
		});
	});

var str = {
	teachclasslist: "/student/selCourse/studentSel/teachclasslist.jsp",
	target: 'target="_BLANK"',
	void0: 'href="javascript:void(0);"'
};

switch (location.pathname) {

	case "/student/selCourse/list1.jsp": {
		// lsClasses
		[...document.querySelectorAll('tr[align="center"]')].map(e => {
			var lstd = [...e.querySelectorAll('td')];
			// var m = td = e.querySelectorAll('td').slice(-1)[0];
			console.log(lstd);
			var 课程序号 = lstd[0].textContent.trim();
			var 课程代码 = lstd[2].textContent.trim();
			lstd[9].innerHTML = `
            <a style="color:red" href="###" onclick="tj(2,'${课程序号}','${课程代码}')">取消选择</a><br><a
               style="color:red" href="/student/selCourse/action.jsp?op=del&courseID=${课程代码}&cssID=${课程序号}&url=${str.teachclasslist}?courseId=${课程代码}" ${str.target} alt="有可能选不上">重新选择（慎用）</a>
         `.trim();
		});
		break;
	}

	case "/student/selCourse/studentSel/selcourse_ts.jsp": {
      // 可以选课列表
		[...document.querySelectorAll('tr')].filter(
         x => x.querySelectorAll('td').length == 16
      ).map(e => {
			var lstd = [...e.querySelectorAll("td")];
			var 课程编号 = lstd[1].textContent.trim();
			var 课程名称 = lstd[2].textContent.trim();
			lstd[1].innerHTML = `<a onclick="opens('${课程编号}','${课程名称}')" ${str.void0}>${课程编号}</a>`;
		});
		break;
	}

	case "/student/selCourse/mycourselist.jsp": {
		// 可以选班级列表
		[...document.querySelectorAll('tr')].filter(
			x => x.querySelectorAll('td').length == 14
		).map(e => {
			var lstd = [...e.querySelectorAll("td")];
			var [
				课程序号, 课程名称, 课程代码, 课程类型, 学分, 授课老师, 上课时间,
				上课地点, 校区, 计划人数, 已选人数, 挂牌, 配课班, 备注
			] = lstd.map( e => e.textContent.trim() );
			lstd[0].innerHTML = // 确定也是 ?courseId=${课程代码} 吗
				`<a href="${str.teachclasslist}?courseId=${课程代码}" ${str.target} alt="打开选课页面">${课程序号}</a>`;
			lstd[2].innerHTML =
				`<a href="${str.teachclasslist}?courseId=${课程代码}" ${str.target} alt="打开选课页面">${课程代码}</a>`;
		});
		break;
	}
	
	case "/student/graduate/viewcreditdetail.jsp": {
		// 计划课程列表
		[...document.querySelectorAll('tr')].filter(
			x => x.querySelectorAll('td:not([rowspan])').length == 13
		).slice(1).map(e => {
			var lstd = [...e.querySelectorAll('td:not([rowspan])')];
			var [
				课程代码, 课程名称, 性质, 公选性质, 学分, 成绩, 绩点,
				重修次数, 完成情况, 替代情况, 计划学期, 修读学年学期, 备注
			] = lstd.map( e => e.textContent.trim() );

			lstd[0].innerHTML =
				`<a href="${str.teachclasslist}?courseId=${课程代码}" ${str.target} alt="打开选课页面">${课程代码}</a>`;

			// 刷分权重
			if( ( 5 - parseFloat(绩点) ) * parseFloat(学分) ) {
				// lstd[12].innerHTML = "刷分权重：" + 刷分权重 + "<br>" + lstd[12].innerHTML;
				lstd[12].innerHTML = "刷分权重：" + [...Array(parseInt(刷分权重))].join("|") + "<br>" + lstd[12].innerHTML;
			}
		});
		break;
	}
	
	case "/student/graduate/scorepoint.jsp": {
		window.getSelVal = obj => {
			var ops = obj.options || obj[0].options;
			for(var i = 0; i < ops.length; i++) {
				if( ops[i].selected )
					return ops[i].value;
			}
			return "";
		}
		break;
	}

}

})();
