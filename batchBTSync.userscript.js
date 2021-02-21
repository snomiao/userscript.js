// ==UserScript==
// @name         btsync 1.4.111 批量添加 Key
// @namespace    https://userscript.snomiao.com/
// @version      0.4
// @description  在添加Key左边增加一个按钮，功能为批量添加Key
// @author       snomiao@gmail.com
// @match        http://localhost:8888/gui/
// @match        http://127.0.0.1:8888/gui/
// @grant        none
// ==/UserScript==

// (function() {
// 'use strict';
// 'esversion: 6';
var 睡 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
var 转WIN路径为WSL路径 = (path) => path.replace(
    /^([A-Z]):(.*)/,
    (a, disk, path) => "/mnt/" + disk.toLowerCase() + "/" + path.split("\\").filter(e => e).join("/")
);
var app = window.app;
var 尝试到 = async(ms, fn) => {
    let ret, t = +new Date();
    while (!(ret = await fn()))
        if (+new Date() > t + ms)
            throw "TimeOut"
        else
            await 睡(1);
    return ret
}
var 等元素 = async(ms, sel, el = document) => await 尝试到(ms, () => el.querySelector(sel))
var 等元素消失 = async(ms, sel, el = document) => await 尝试到(ms, () => !el.querySelector(sel))
var 绑定Click到元素 = (f, 元素) => (元素.addEventListener("click", f), 元素)
var 新元素 = (innerHTML, attributes = {}) => 
    Object.assign(
        Object.assign(document.createElement("div"), {innerHTML}).children[0]
    , attributes)
var 解析行 = (line) => {
    var m = line.trim().match(/^(\S*?(\b[A|B][0-9A-Z]{32}\b))$/)
    m = m || line.trim().match(/^(\S*?)\s+#?(\b[A|B][0-9A-Z]{32}\b)$/)
    return m && { path: 转WIN路径为WSL路径(m[1]), key: m[2] } || null
}
var 异步循环 = async(fn, array) => {
    for (let index = 0; index < array.length; index++) {
        await fn(array[index], index, array);
    }
}
var 批量添加行 = async(text) => {
    var lines = text.split(/\r?\n/).filter(e => e)
    var objs = lines.map(解析行).filter(e => e)
    console.debug("正在添加Keys：", objs)
    await 异步循环(模拟操作添加Key, objs)
}
var 打开添加KeyPath窗口 = async() => {
    var enterKeyDialog = new app.view.EnterKey({ addFolderView: app.addFolderView }); // we need to pass a reference to addFolderView to EnterKey
    var child = enterKeyDialog.insert()
    child.open()
    return await 尝试到(60e3, () => child.el)
}
var 模拟操作添加Key = async({ key, path }) => {
    console.log("正在添加：", key, path)
    console.debug("正在", 'await 等元素消失(60e3, `.modal-backdrop.fade.in`);');
    await 等元素消失(60e3, `.modal-backdrop.fade.in`);
    console.debug("正在", 'await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);');
    await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);
    console.debug("正在", 'await 等元素消失(60e3, `#enter-key-dialog[aria-hidden="false"]`);');
    await 等元素消失(60e3, `#enter-key-dialog[aria-hidden="false"]`);
    // var panel = await 打开添加KeyPath窗口();
    await 睡(200);
    console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#enter-link-button`)).click();');
    (await 等元素(60e3, `#enter-link-button`)).click();
    await 睡(200);
    console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#enter-key-key`)).value = key;');
    (await 等元素(60e3, `#enter-key-key`)).value = key;
    await 睡(200);
    console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#enter-key-next`)).click();');
    (await 等元素(60e3, `#enter-key-next`)).click();
    await 睡(200);
    console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-directory`)).value = path;');
    (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-directory`)).value = path;
    // await 睡(200);
    console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-ok.btn`)).click();');
    (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-ok.btn`)).click();
    await 睡(200);


    await 睡(200);
    console.debug(+new Date() / 1000, '正在', 'const 错误提示元素 = (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`));');
    const 错误提示元素 = (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`));
    const 错误 = await 尝试到(60e3, () => 错误提示元素.innerText);
    console.error("btsync-batch err:", 错误);
    await 睡(200);
    console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();');
    (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();
    await 睡(200);
    console.debug(+new Date() / 1000, '正在', 'await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);');
    await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);
    return true

    // var keyElement = await Promise.race([
    //     等元素(60e3, `#confirm-dialog[aria-hidden="false"] #okButton`),
    //     等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`),
    // ]);
    // console.log(keyElement)
    // if (keyElement.id == "add-error") {
    // }

    throw "X";
    // await 睡(200);
    // console.debug(+new Date() / 1000, '正在', 'const 错误提示元素 = (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`));');
    // const 错误提示元素 = (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`));
    // const 错误 = await 尝试到(60e3, () => 错误提示元素.innerText);
    // console.error("btsync-batch err:", 错误);
    // await 睡(200);
    // console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();');
    // (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();
    // await 睡(200);
    // console.debug(+new Date() / 1000, '正在', 'await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);');
    // await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);

    // return true
    var re = (await Promise.race([
        (async() => {
            await 睡(100);
            console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#confirm-dialog[aria-hidden="false"] #okButton`)).click();');
            (await 等元素(60e3, `#confirm-dialog[aria-hidden="false"] #okButton`)).click();
            console.info("已覆盖")
            return true
        })(),
        (async() => {
            await 睡(200);
            console.debug(+new Date() / 1000, '正在', 'const 错误提示元素 = (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`));');
            const 错误提示元素 = (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-error`));
            const 错误 = await 尝试到(60e3, () => 错误提示元素.innerText);
            console.error("btsync-batch err:", 错误);
            await 睡(200);
            console.debug(+new Date() / 1000, '正在', '(await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();');
            (await 等元素(60e3, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();
            await 睡(200);
            console.debug(+new Date() / 1000, '正在', 'await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);');
            await 等元素消失(60e3, `#add-folder-dialog[aria-hidden="false"]`);
            return true
        })(),
        // 睡(40000)
    ]))
    var ret = re || console.error("btsync-batch err: 超时 at", path)
    console.log(ret)
    return ret
}
var test_模拟操作添加Key = async() => {
    var obj = 解析行("C:\\s\\编程随想_管理#B3WNBTAAFFAODFR6FQ3E3L5BBSJAFNBSJ")
    await 模拟操作添加Key(obj)
};
// test_模拟操作添加Key()
var openBatch添加KeyPath = async() => {
    var enterKeyDialog = new app.view.EnterKey({ addFolderView: app.addFolderView }); // we need to pass a reference to addFolderView to EnterKey
    var child = enterKeyDialog.insert()
    child.open()
    var el = await 尝试到(60e3, () => child.el);
    (await 等元素(60e3, ".modal-header h2", el)).innerHTML = `Enter a group of /path #key`;
    (await 等元素(60e3, ".modal-body", el)).innerHTML = `
    <div class="form-group">
        <label for="keyInput">{{#}}</label>
        <div class="input-group">
            <textarea id="enter-list-path-key" type="text" class="form-control"></textarea>
            <br>
            <br>
            <div class="input-group-btn">
                <button id="enter-list-path-key-go" class="btn btn-primary" type="button" style="min-height: 40rem;">Go</button>
            </div>
        </div>
    </div>`;
    el.querySelector(".modal-body label").innerHTML = `Input your /path #key split in lines`
    var textarea = el.querySelector(".modal-body textarea")
    textarea.style.lineHeight = "1em"
    textarea.style.minHeight = "40rem"
    textarea.style.fontSize = "1.2rem"
    textarea.placeholder = `
#key is in path:
/path/to/folder#AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder#BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder@AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder@BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder#AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder#BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder@AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder@BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

#key is not in path:
/path/to/folder AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder #AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder #BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder #AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
C:\\path\\to\\folder #BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        `.trim();
    // var textarea = el.querySelector(".modal-body textarea");
    (await 等元素(60e3, ".modal-body button", el)).addEventListener("click", async() => {
        (await 等元素(60e3, ".modal-header button.close", el)).click();
        批量添加行(textarea.value)
    })
}


var addBatchAddButton = async() => {
    console.log("启动")
    var 尝试移除元素 = e => e && e.parentElement.removeChild(e)
    尝试移除元素(document.querySelector("#batch-enter-link-button"))
    var 栏 = await 等元素(60e3, "#topButtons")
    var 单个添加按钮 = await 等元素(60e3, "#enter-link-button", 栏)
    var 批量添加按钮 = 新元素(`
                <a  id="batch-enter-link-button" 
                    role="button"
                    class="btn btn-naked"
                    title=""
                    data-original-title="Enter a group of /path #key"
                    style="background: repeating-linear-gradient(45deg, black, transparent 100px);">
                    <span class="mycon mycon-enterlink-naked"></span>
                </a>`, { onclick: openBatch添加KeyPath })
    栏.insertBefore(批量添加按钮, 单个添加按钮)
}
addBatchAddButton()


var test_批量添加行 = () => 批量添加行(`
    C:\\s\\编程随想_IT#BUPSDXFA3TP7KCMLHALRHLIX2FEJEUJFE
    C:\\s\\编程随想_管理#B3WNBTAAFFAODFR6FQ3E3L5BBSJAFNBSJ
    C:\\s\\编程随想_社会学#BZR4TTYHT25QWUIE6YNMAKWUGBHKSGLC6
    C:\\s\\编程随想_心理学#BNZ6DOA6W577O6GUNH7C3MY6DWC6FTDQB
    C:\\s\\编程随想_政治#BRSSYZTSAC6UGYTUOJ22L4GCO7QESPPBD
    C:\\s\\编程随想_哲学#B6WWVBXPMZDI5IL4KED6AAHA5FO4UNKQF
    C:\\s\\编程随想_文艺#BMBB5YLBIJJAE5H6TP27OS7YCEUKCYHZK
    C:\\s\\编程随想_军事#BMWWZALG4P56LREF47EE2WSWHZEM4E6BL
    C:\\s\\编程随想_历史#BSH7FXJFVWJTKWGSX5GTWX7PHZZ2D2M7Q
    C:\\s\\编程随想_经济#B2FRYA6AXCDW6CF4YJVFWKH2HAXOFICOX
    C:\\s\\编程随想的翻墙软件#BTLZ4A4UD3PEWKPLLWEOKH3W7OQJKFPLG
    C:\\s\\编程随想离线博客#B7P64IMWOCXWEYOXIMBX6HN5MHEULFS4V
    `);
test_批量添加行()
    // })()