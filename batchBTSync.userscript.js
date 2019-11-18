// ==UserScript==
// @name         btsync 1.4.111 批量添加 Key
// @namespace    https://userscript.snomiao.com/
// @version      0.3
// @description  在添加Key左边增加一个按钮，功能为批量添加Key
// @author       snomiao@gmail.com
// @match        http://localhost:8888/gui/
// @match        http://127.0.0.1:8888/gui/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    'esversion: 6';

    var 睡 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    var 转WIN路径为WSL路径 = (path) => path.replace(
        /^([A-Z]):(.*)/,
        (a, disk, path) => "/mnt/" + disk.toLowerCase() + "/" + path.split("\\").filter(e => e).join("/")
    )
    var 异步选择元素 = async(p, sel) => {
        let e
        while (!(e = p.querySelector(sel)))
            await 睡(1)
        return e
    }

    var app = window.app

    var 超时 = function(ms, fn) {
        return (async(...args) =>
            await Promise.race([睡(ms), fn.call(this, ...args)])
        )
    }
    var 直到 = async(fn) => {
        var ret;
        while (!(ret = await fn()))
            await 睡(1)
        return ret
    }

    var 等元素 = async(sel) => {
        let e
        while (!(e = document.querySelector(sel)))
            await 睡(1)
        return e
    }
    var 等元素消失 = async(sel) => {
        while (document.querySelector(sel))
            await 睡(1)
        return;
    }

    var parseLine = (line) => {
        var m = line.match(/^(\S*?(\b[A|B][0-9A-Z]{32}\b))$/)
        m = m || line.match(/^(\S*?)\s+#?(\b[A|B][0-9A-Z]{32}\b)$/)
        return m && { path: 转WIN路径为WSL路径(m[1]), key: m[2] } || null
    }

    var addLine = async(line) => {
        var obj = parseLine(line)
        console.debug(obj)
        var re = obj && (await addKey(obj))
        console.log(re)
        return false
    }

    var asyncForEach = async(fn, array) => {
            for (let index = 0; index < array.length; index++) {
                // console.log("for", array[index])
                await fn(array[index], index, array);
            }
        }
        // await asyncForEach(async(e)=>(console.log(e), 睡(e)), [100,200,300,400])

    var batchAdd = async(text) => {
        var lines = text.split(/\r?\n/).filter(e => e)
        var objs = lines.map(parseLine).filter(e => e)
        console.log(objs)

        await asyncForEach(addKey, objs)
    }
    var openAddKey = async() => {
        var enterKeyDialog = new app.view.EnterKey({ addFolderView: app.addFolderView }); // we need to pass a reference to addFolderView to EnterKey
        var child = enterKeyDialog.insert()
        child.open()

        return await 直到(() => child.el)
    }

    var addKey = async({ key, path }) => {
        // addKey
        // addFolder
        //     FolderError
        //     check??
        /*
        var path = `/mnt/c/s/GoldenDict#AY3Y475B6TMGVOEM2XUAJ7YZBLDIDWYCC`
        var key = `AY3Y475B6TMGVOEM2XUAJ7YZBLDIDWYCC`
        */
        console.log(key, path)
        await 等元素消失(`.modal-backdrop.fade.in`);
        await 等元素消失(`#add-folder-dialog[aria-hidden="false"]`);
        await 等元素消失(`#enter-key-dialog[aria-hidden="false"]`);
        // var panel = await openAddKey();
        await 睡(200);
        (await 异步选择元素(document, `#enter-link-button`)).click();
        await 睡(200);
        (await 异步选择元素(document, `#enter-key-key`)).value = key;
        await 睡(200);
        (await 异步选择元素(document, `#enter-key-next`)).click();
        await 睡(200);
        (await 异步选择元素(document, `#add-folder-dialog[aria-hidden="false"] #add-directory`)).value = path;
        await 睡(200);
        (await 异步选择元素(document, `#add-folder-dialog[aria-hidden="false"] #add-ok.btn`)).click();
        // await 睡(200);

        var re = (await Promise.race([
            (async() => {
                await 睡(100);
                (await 异步选择元素(document, `#confirm-dialog[aria-hidden="false"] #okButton`)).click();
                console.info("已覆盖")
                return true
            })(),
            (async() => {
                await 睡(100);
                const 错误提示元素 = (await 异步选择元素(document, `#add-folder-dialog[aria-hidden="false"] #add-error`));
                const 错误 = await 直到(() => 错误提示元素.innerText);
                console.error("btsync-batch err:", 错误);
                await 睡(100);
                (await 异步选择元素(document, `#add-folder-dialog[aria-hidden="false"] #add-cancel`)).click();
                await 等元素消失(`#add-folder-dialog[aria-hidden="false"]`);
                return true
            })(),
            睡(40000)
        ]))
        return re || console.error("btsync-batch err: 超时 at", path)
    }

    var openBatchAddKey = async() => {
        var enterKeyDialog = new app.view.EnterKey({ addFolderView: app.addFolderView }); // we need to pass a reference to addFolderView to EnterKey
        var child = enterKeyDialog.insert()
        child.open()
        var el = await 直到(() => child.el);
        (await 异步选择元素(el, ".modal-header h2")).innerHTML = `Enter a group of /path #key`;
        (await 异步选择元素(el, ".modal-body")).innerHTML = `
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

#key is not in path:
/path/to/folder AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder #AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/path/to/folder #BXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.trim()
        var textarea = el.querySelector(".modal-body textarea");
        (await 异步选择元素(el, ".modal-body button")).addEventListener("click", async() => {
            (await 异步选择元素(el, ".modal-header button.close")).click();
            batchAdd(textarea.value)
        })
    }


    var addBatchAddButton = async() => {
        if (window.flag_addBatchAddButton) return;
        window.flag_addBatchAddButton = 1
        var p = document.createElement("div")
        p.innerHTML = `<a id="batch-enter-link-button" role="button" class="btn btn-naked" title="" data-original-title="Enter a group of /path #key" style="
        background: repeating-linear-gradient(45deg, black, transparent 100px);
        "><span class="mycon mycon-enterlink-naked"></span></a>`
        var 栏 = await 异步选择元素(document, "#topButtons")
        var 单个添加按钮 = await 异步选择元素(栏, "#enter-link-button")
        var 批量添加按钮 = p.children[0]
        栏.insertBefore(批量添加按钮, 单个添加按钮)
        批量添加按钮.addEventListener("click", openBatchAddKey)
    }
    addBatchAddButton()
})();