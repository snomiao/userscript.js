// ==UserScript==
// @name         大学生安全教育模拟考试自动显示答案
// @namespace    snomiao@gmail.com
// @version      0.1
// @description  rt
// @author       snomiao@gmail.com
// @match        *://www.halnedu.com/pcexam/test/start
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Array.from(document.querySelectorAll(".answer")).forEach( answer_element => answer_element.style.display = 'block' )

})();