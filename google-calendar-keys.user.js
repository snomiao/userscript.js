// ==UserScript==
// @name         [snolab] Google 日历键盘操作增强
// @name:zh      [雪星实验室] Google Calendar with Keyboard Enhanced
// @namespace    https://userscript.snomiao.com/
// @version      0.0.2
// @description  【功能测试中, bug反馈：snomiao@gmail.com】Google日历键盘增强，雪星自用，功能：双击复制日程视图里的文本内容
// @author       snomiao@gmail.com
// @match        *://calendar.google.com/*
// @grant        none
// ==/UserScript==

console.clear();
const qsa = (sel, ele = document) => [...ele.querySelectorAll(sel)];
const eleVis = (ele) => (ele.getClientRects().length && ele) || null;
const eleSelVis = (sel, ele = document) =>
    (typeof sel === 'string' && qsa(sel, ele).filter(eleVis)[0]) || null;
// const nestList = (e, fn)=>e.reduce
const parentList = (ele) => [
    ele?.parentElement,
    ...((ele?.parentElement && parentList(ele?.parentElement)) || []),
];
const eleSearchVis = (pattern, ele = document) =>
    ((list) =>
        list?.find((e) => e.textContent?.match(pattern)) ||
        list?.find((e) => e.innerHTML?.match(pattern)))(
        qsa('*', ele).filter(eleVis).reverse()
    ) || null;
const eleSearch = (sel, ele = document) =>
    (typeof sel === 'string' && ele.querySelector(sel)) ||
    ((list) =>
        list?.find((e) => e.textContent?.match(sel))?.[0] ||
        list?.find((e) => e.innerHTML?.match(sel))?.[0])(
        qsa('*', ele).reverse()
    ) ||
    null;
const hotkeyNameParse = (event) => {
    const { altKey, metaKey, ctrlKey, shiftKey, key,type } = event;
    const hkName =
        (altKey && '!' || '') +
        (ctrlKey && '^' || '') +
        (metaKey && '#' || '') +
        (shiftKey && '+' || '') +
        key?.toLowerCase() +
        (({keydown : '',        keypress : ' Press',        keyup : ' Up'})[type] || '');
    return hkName;
};
const inputValueSet = (ele, value) => {
    console.log('inputValueSet', ele, value);
    if (!ele) throw new Error('no element');
    if (undefined === value) throw new Error('no value');
    ele.value = value;
    ele.dispatchEvent(new InputEvent('input', { bubbles: true }));
    ele.dispatchEvent(new Event('change', { bubbles: true }));
    ele.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            keyCode: 13 /* enter */,
        })
    );
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const waitFor = async (fn) => fn() || (await sleep(ms)) || (await waitFor(fn));

const mouseEventOpt = ([x, y]) => ({
    isTrusted: true,
    bubbles: true,
    button: 0,
    buttons: 1,
    cancelBubble: false,
    cancelable: true,
    clientX: x,
    clientY: y,
    movementX: 0,
    movementY: 0,
    x: x,
    y: y,
});
const centerGet = (元素) => {
    const { x, y, width: w, height: h } = 元素.getBoundingClientRect();
    return [x + w / 2, y + h / 2];
};
const bottomGet = (元素) => {
    const { x, y, width: w, height: h } = 元素.getBoundingClientRect();
    return [x + w / 2, y + h - 1];
};
const vec2add = ([x, y], [z, w]) => [x + z, y + w];
const floatingBtn = qsa('div[role="button"]').find(
    (e) => getComputedStyle(e).zIndex === '5004'
);
let pos = bottomGet(floatingBtn);
floatingBtn.dispatchEvent(new MouseEvent('mousedown', mouseEventOpt(pos)));
pos = vec2add(pos, [0, 64]);
floatingBtn.dispatchEvent(new MouseEvent('mousemove', mouseEventOpt(pos)));
pos = vec2add(pos, [0, -64]);
floatingBtn.dispatchEvent(
    new MouseEvent('mouseup', { bubbles: true, cancelable: true })
);

// normal && !j down -> moving
// normal && !j down -> moving
// moving && ! up -> normal
const useHotkey = (hkName, fn) => {
    document.addEventListener('keydown');
};
const movHandle = async (e) => {
    const hktb = {
        '!j': async () => {
            let pos = bottomGet(floatingBtn);
            document.addEventListener('keyup');
        },
    };
    const f = hktb[hkName];
    if (f) f();
};
// useHotkey('!j', () => {});
// document.onkeydown = movHandle;
// document.addEventListener('keydown', globalThis.movHandle , false)

const inputDateTimeChange = async (startDT = 0, endDT = 0) => {
    const isoDateInputParse = async (dateEle, timeEle) => {
        const dataDateTry = dateEle.getAttribute('data-date');
        !dataDateTry &&
            inputValueSet(dateEle, new Date().toISOString().slice(0, 10)); // value set is for trigger the data-date value
        const dataDate = await waitFor(() => dateEle.getAttribute('data-date'));
        // dataDateTry || dateEle.getAttribute('data-date');
        if (!dataDate) throw new Error('dataDate');
        const dateString = dataDate.replace(
            /(\d{4})(\d{2})(\d{2})/,
            (_, a, b, c) => [a, b, c].join('-')
        );
        const timeString = timeEle?.value || '00:00';
        return new Date(`${dateString} ${timeString} Z`);
    };
    const dateObjParse = (dateObj) => {
        const [date, time] = dateObj
            .toISOString()
            .match(/(\d\d\d\d-\d\d-\d\d)T(\d\d:\d\d):\d\d\.\d\d\dZ/)
            .slice(1);
        return [date, time];
    };
    // All day: both dates, no time
    // Date time: start date + start time + end date
    const startDateEleTry = eleSelVis('[aria-label="Start date"]');
    if (!startDateEleTry) {
        const editBtn = parentList(eleSearchVis(/Time zone/))
            .find((e) => e.querySelector('[role="button"]'))
            .querySelector('[role="button"]');
        if (!editBtn) {
            return 'No editable input';
        }
        editBtn.click();
    }
    const startDateEle =
        startDateEleTry &&
        waitFor(() => eleSelVis('[aria-label="Start date"]'));
    //   startDateEle && inputValueSet(startDateEle, startDateEle.value); // value set is for trigger the data-date value
    const startTimeEle = eleSelVis('[aria-label="Start time"]');
    const endDateEle = eleSelVis('[aria-label="End date"]');
    //   endDateEle && inputValueSet(endDateEle, endDateEle.value); // value set is for trigger the data-date value
    const endTimeEle = eleSelVis('[aria-label="End time"]');
    const startDateObj = await isoDateInputParse(startDateEle, startTimeEle);
    const endDateObj = await isoDateInputParse(
        endDateEle || startDateEle,
        endTimeEle
    );
    const shiftedStartDateObj = new Date(+startDateObj + startDT);
    const shiftedEndDateObj = new Date(+endDateObj + endDT);
    const [
        originStartDate,
        originStartTime,
        originEndDate,
        originEndTime,
        shiftedStartDate,
        shiftedStartTime,
        shiftedEndDate,
        shiftedEndTime,
    ] = [
        ...dateObjParse(startDateObj),
        ...dateObjParse(endDateObj),
        ...dateObjParse(shiftedStartDateObj),
        ...dateObjParse(shiftedEndDateObj),
    ];
    console.table({
        startDateObj: startDateObj.toISOString(),
        endDateObj: endDateObj.toISOString(),
        shiftedStartDateObj: shiftedStartDateObj.toISOString(),
        shiftedEndDateObj: shiftedEndDateObj.toISOString(),
    });
    console.table({
        originStartDate,
        originStartTime,
        originEndDate,
        originEndTime,
        shiftedStartDate,
        shiftedStartTime,
        shiftedEndDate,
        shiftedEndTime,
    });
    startDateEle &&
        shiftedStartDate !== originStartDate &&
        inputValueSet(startDateEle, shiftedStartDate);
    startTimeEle &&
        shiftedStartTime !== originStartTime &&
        inputValueSet(startTimeEle, shiftedStartTime);
    endDateEle &&
        shiftedEndDate !== originEndDate &&
        inputValueSet(endDateEle, shiftedEndDate);
    endTimeEle &&
        shiftedEndTime !== originEndTime &&
        inputValueSet(endTimeEle, shiftedEndTime);
};
document.onkeydown = (e) => {
    const isInput = ['INPUT', 'BUTTON'].includes(e.target.tagName);
    const hkName = hotkeyNameParse(e);
    console.log(`${hkName} pressed on `, e.target.tagName, e);
    hotkeyNameParse(e)
    const okay = () => {
        e.preventDefault();
        e.stopPropagation();
    };
    const hkft = {
        '!k': async () => await inputDateTimeChange(-15 * 60e3),
        '!j': async () => await inputDateTimeChange(+15 * 60e3),
        '!h': async () => await inputDateTimeChange(-1 * 86400e3),
        '!l': async () => await inputDateTimeChange(+1 * 86400e3),
        '!+k': async () => await inputDateTimeChange(0, -15 * 60e3),
        '!+j': async () => await inputDateTimeChange(0, +15 * 60e3),
        '!+h': async () => await inputDateTimeChange(0, -1 * 86400e3),
        '!+l': async () => await inputDateTimeChange(0, +1 * 86400e3),
    };
    const f = hkft[hkName];
    console.log(f);
    if (f) {
        f().then(okay()).catch();
        okay();
    } else {
        console.log(hkName + ' pressed on ', e.target.tagName, e);
    }
};
// dateTimeChange(+15 * 60e3);
