// ==UserScript==
// @name             [SNOLAB] Google Calendar keyboard enhance
// @name:zh          [SNOLAB] Google 日历键盘操作
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      Google日历键盘键盘操作，功能：Alt+hjkl 移动日程
// @author           snomiao@gmail.com
// @match            *://calendar.google.com/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==
//
//  1. event move enhance
//      - date time input change
//      - event drag
//  2. journal view text copy for the day-summary
//

import clipboardy from "clipboardy";
import hotkeyMapper from "hotkey-mapper";
import { tryCatch } from "rambda";
import { $$ } from "./$$";
import po2dt from "./po2dt";

const gkcs_unload = globalThis.gkcs_unload;
gkcs_unload?.();
globalThis.gkcs_unload = main();
globalThis.gkcs_verbose = true;
const { draggingGet: dg, draggingSet: ds } = draggingUse();
let lastpos: null | [number, number] = null;
function touchHandler(event: TouchEvent) {
  const touches = event.changedTouches;
  if (touches.length > 1) return;
  const first = touches[0];
  const type = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup",
  }[event.type];
  if (!type) return;

  var simulatedEvent = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    detail: 1,
    screenX: first.screenX,
    screenY: first.screenY,
    clientX: first.clientX,
    clientY: first.clientY,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: null,
  });
  first.target.dispatchEvent(simulatedEvent);
  if (type === "mousedown") lastpos = [first.screenX, first.screenY]; // event.preventDefault();
  if (type === "mousemove") event.preventDefault();
  if (
    type === "mouseup" &&
    JSON.stringify(lastpos) === JSON.stringify([first.screenX, first.screenY])
  )
    event.preventDefault();
}

function initTouchEventerConverter() {
  const e = document.body;
  e.appendChild(
    Object.assign(document.createElement("div"), {
      innerHTML: '<style>[role="presentation"]{touch-action:none}</style>',
    }).children[0]
  );
  e.addEventListener("touchstart", touchHandler, true);
  e.addEventListener("touchmove", touchHandler, true);
  e.addEventListener("touchend", touchHandler, true);
  e.addEventListener("touchcancel", touchHandler, true);
}

function main() {
  initTouchEventerConverter();
  console.clear();
  const unloaders = [] as (undefined | (() => void))[];
  unloaders.push(
    hotkeyMapper(
      {
        "ctrl+b": async () => {
          const menuBtn = $visiable(sel.Menu) as HTMLButtonElement;
          menuBtn?.click();
        },
        "alt+v": async () => await cpr(),
        "alt+k": () => eventMove([0, -1]),
        "alt+j": () => eventMove([0, +1]),
        "alt+h": () => eventMove([-1, 0]),
        "alt+l": () => eventMove([+1, 0]),
        "alt+shift+k": () => eventExpand([0, -1]),
        "alt+shift+j": () => eventExpand([0, +1]),
        "alt+shift+h": () => eventExpand([-1, 0]),
        "alt+shift+l": () => eventExpand([+1, 0]),
      },
      { capture: true }
    )
  );
  return () => [...unloaders].reverse().forEach((e) => e?.());
}
async function turboTapWith(
  holdKey: string,
  fn: () => Promise<(() => void) | undefined>
) {
  if (!globalThis[holdKey + "Pressed"]) {
    globalThis[holdKey + "Pressed"] = true;
    let tap = 0;
    (async function () {
      while (tap >= 0) {
        fn();
        await sleep(150 * 0.33 ** tap);
        tap++;
      }
    })();
    await keyupWait(holdKey);
    tap = -997596439;
    globalThis[holdKey + "Pressed"] = false;
  }
}

async function keyupWait(waitKey: string) {
  await new Promise<void>((resolve) =>
    document.addEventListener(
      "keyup",
      (e) => {
        if (e.key === waitKey) resolve();
      },
      { once: true }
    )
  );
}

async function cpr() {
  const r = $$("input,[role=button]")
    .map((element) => {
      const { ps, deep } = onlyPatternSelectorGenerate(element);
      const label = element.ariaLabel ?? "";
      return {
        e: element,
        label,
        ps,
        deep,
      };
    })
    .filter((e) => Boolean(e.label));
  const cpr = r.map(({ e, ...r }) => r);
  console.table(r);
  globalThis.patternSelectorGenerate = patternSelectorGenerate;
  await clipboardy.write(JSON.stringify(cpr, null, 2));
}

/* unit test */
// eventMoving(86400e3);

async function eventMoving(dt: number) {
  await inputDateTimeChange(dt);
}
function onDblClickCopy() {
  const unloaders: (() => void)[] = [];
  const onMousedown = () => {
    unloaders.push(
      ...$$("div.L1Ysrb").map((e) => {
        return useListener(e)(
          "dblclick",
          () => calendarElementContentCopyWithAlert(e),
          false
        );
      })
    );
  };
  const event = "mousedown";
  const options = true;
  const unload = useListener()(event, onMousedown, options);
  return unload;
}

function useListener(target: Window | Document | HTMLElement = window) {
  return (
    event: string,
    onEvent: { (evt: Event): void },
    options?: boolean | EventListenerOptions
  ) => {
    target.addEventListener(event, onEvent, options);
    const unload = () => target.removeEventListener(event, onEvent, options);
    return unload;
  };
}

async function eventExpand([dx, dy] = [0, 0]) {
  if (dy && (await timeAddTry())) return;
  return tryCatch(
    () => eventDrag([dx, dy], { expand: true }),
    () => inputDateTimeChange(0, po2dt([dx, dy]))
  )(null);
}
async function eventMove([dx, dy] = [0, 0]) {
  if (dy && (await timeAddTry())) return;
  return tryCatch(
    () => eventDrag([dx, dy]),
    () => inputDateTimeChange(po2dt([dx, dy]), 0)
  )(null);
}

async function inputValueSet(el: HTMLInputElement, value: string) {
  console.log("inputValueSet", el, value);
  if (!el) throw new Error("no element");
  if (undefined === value) throw new Error("no value");
  el.value = value;
  el.dispatchEvent(new InputEvent("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  el.dispatchEvent(
    new KeyboardEvent("keydown", {
      bubbles: true,
      keyCode: 13 /* enter */,
    })
  );
  el.focus();
  await sleep(0);
  el.blur();
}
async function waitFor(fn) {
  let re = null;
  while (!(re = fn())) await sleep(8);
  return re;
}

// function bottomGet(element) {
//     const { x, y, "width": w, "height": h } = 元素.getBoundingClientRect();
//     return [x + w / 2, y + h - 2];
// }

// function vec2mul([x, y], [z, w]) {
//     return [x * z, y * w];
// }
async function dateInputParse(
  dateInput: HTMLInputElement,
  timeInput: HTMLInputElement | null
) {
  const dataDate = dateInput.getAttribute("data-date");
  const dataIcalElement = parentList(dateInput).find((e) =>
    e.getAttribute("data-ical")
  );
  if (!dataIcalElement) throw new Error("dataIcalElement not found");
  const dataIcal = dataIcalElement.getAttribute("data-ical");
  const datestringRaw = dataDate || dataIcal;
  if (!datestringRaw) throw new Error("no datestring");
  // const todayDate = new Date().toISOString().slice(0, 10);
  const dateString = datestringRaw.replace(
    /(\d{4})(\d{2})(\d{2})/,
    (_, a, b, c) => [a, b, c].join("-")
  );
  const timeString = timeInput?.value || "00:00";
  return new Date(`${dateString} ${timeString} Z`);
}

function dateParse(dateObj: Date) {
  const m = dateObj
    .toISOString()
    .match(/(\d\d\d\d-\d\d-\d\d)T(\d\d:\d\d):\d\d\.\d\d\dZ/);
  if (!m) throw m;
  const [date, time] = m.slice(1);
  return [date, time];
}
const sel = {
  Menu: '[aria-label="メインドロワー"]',
  Summary: [
    '[aria-label="タイトルと日時を追加"]',
    '[aria-label="タイトルを追加"]',
    '[aria-label="タイトル"]',
  ].join(","),
  StartDate: '[aria-label="開始日"]',
  StartTime: '[aria-label="開始時間"]',
  EndTime: '[aria-label="終了時間"]',
  EndDate: '[aria-label="終了日"]',
  AllDay: '[aria-label="終日"]',
  TimeZone: '[aria-label="タイムゾーン"]',
  Guests: '[aria-label="ゲスト"]',
};
async function inputDateTimeChange(sdt = 0, edt = 0) {
  // All day: both dates, no time
  // Date time: start date + start time + end date
  const startDateInputPeek = $visiable(sel.StartDate) as HTMLInputElement;
  if (!startDateInputPeek) {
    const tz = $visiable(sel.TimeZone);
    if (!tz) throw new Error("tz not found");
    const editBtn = parentList(tz)
      ?.find((e) => e.querySelector('[role="button"]'))
      ?.querySelector('[role="button"]') as HTMLButtonElement;
    if (!editBtn) throw new Error("No editable input");
    editBtn.click();
    await sleep(64);
  }
  const startDateInput = $visiable(sel.StartDate) as HTMLInputElement;
  const startTimeInput = $visiable(sel.StartTime) as HTMLInputElement | null;
  const endTimeInput = $visiable(sel.EndTime) as HTMLInputElement | null;
  const endDateInput = $visiable(sel.EndDate) as HTMLInputElement | null;
  const endDateInput1 = endDateInput ?? startDateInput;
  if (!startDateInput) throw new Error("no startDateInput");
  const startDate = await dateInputParse(startDateInput, startTimeInput);
  const endDate = await dateInputParse(endDateInput1, endTimeInput);
  const startDateObj1 = new Date(+startDate + sdt);
  const endDateObj1 = new Date(+endDate + edt);
  const [startDate0, startTime0] = dateParse(startDate);
  const [endDate0, endTime0] = dateParse(endDate);
  const [startDate1, startTime1] = dateParse(startDateObj1);
  const [endDate1, endTime1] = dateParse(endDateObj1);
  if (globalThis.gkcs_verbose)
    console.table({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      startDateObj1: startDateObj1.toISOString(),
      endDateObj1: endDateObj1.toISOString(),
    });
  if (globalThis.gkcs_verbose)
    console.table({
      startDateInput: Boolean(startDateInput),
      startTimeInput: Boolean(startTimeInput),
      endDateInput: Boolean(endDateInput),
      endTimeInput: Boolean(endTimeInput),
      startDate0,
      startDate1,
      startTime0,
      startTime1,
      endDate0,
      endDate1,
      endTime0,
      endTime1,
    });
  startDateInput &&
    startDate1 !== startDate0 &&
    (await inputValueSet(startDateInput, startDate1));
  endDateInput &&
    endDate1 !== endDate0 &&
    (await inputValueSet(endDateInput, endDate1));
  startTimeInput &&
    startTime1 !== startTime0 &&
    (await inputValueSet(startTimeInput, startTime1));
  endTimeInput &&
    endTime1 !== endTime0 &&
    (await inputValueSet(endTimeInput, endTime1));

  $visiable<HTMLInputElement>(sel.Summary)?.focus();
}
async function timeAddTry() {
  const btn = $$("button").find((e) =>
    ["Add time", "時間を追加"].includes(e.textContent ?? "")
  );
  // console.log("timeaddbtn", btn);
  if (!btn) return 0;
  btn.click();
  await sleep(64);
  return 1;
}

function eleVisiable(ele: Element) {
  return (ele.getClientRects().length && ele) ?? false;
}
function $visiable<T extends HTMLElement>(sel: string, el = document) {
  return ($$(sel, el).filter(eleVisiable)[0] as T) ?? null;
}
function parentList(el: Element): Element[] {
  const parent = el?.parentElement;
  if (!parent) return [];
  return [parent, ...parentList(parent)];
}
function sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function mouseOpt([x, y]: Point) {
  return {
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
  };
}
type Point = [number, number];
function centerGet(element: Element) {
  const { x, y, width: w, height: h } = element.getBoundingClientRect();
  return [x + w / 2, y + h / 2] as Point;
}
function vec2add([x, y], [z, w]) {
  return [x + z, y + w] as Point;
}
function $(sel: string) {
  return document.querySelector(sel) as Element;
}

function calendarElementContentCopyWithAlert(el: HTMLElement, ms = 200) {
  el.style.background = "lightblue";
  setTimeout(() => (el.style.background = "none"), ms);
  return navigator.clipboard.writeText(
    headLinesTrim(timeAndSummaryConcat(el.innerText))
  );
}
function headLinesTrim(s: string) {
  return s.replace(/^.*\n.*\n/, "");
}
function timeAndSummaryConcat(s: string) {
  return (
    s
      // 把时间和summary拼到一起
      .replace(/.*\n(.*) – (.*)\n(.*)\n.*/gim, (_, a, b, c) => `- `)
  );
}

function onlyPatternSelectorGenerate(element: Element) {
  let deep = 0;
  let ps = "";
  while (1) {
    ps = patternSelectorGenerate(element, { deep });
    if ($$(ps).length <= 1) break;
    deep++;
  }
  return { ps, deep };
}

function patternSelectorGenerate(element: Element, { deep = 0 } = {}) {
  const psg = (e: Element) => patternSelectorGenerate(e, { deep: deep - 1 });
  const tag = element.tagName.toLowerCase();
  const attrs = [
    "aria-label",
    "data-key",
    "role",
    "type",
    // "jsslot",
    // "aria-labelledby",
    // "jsshadow",
  ]
    .map((name: string) => attrSel(element, name))
    .filter((e) => !e.match("\n"))
    .join("");
  let base = `${tag}${attrs}`;
  if (!deep) return base;

  const next = element.nextElementSibling;
  if (next) base = `${base}:has(+${psg(next).replace(/:has\(.*?\)/g, "")})`;
  const prev = element.previousElementSibling;
  if (prev) return `${psg(prev)}+${base}`;

  const parent = element.parentElement;
  if (!parent) return base;
  const children = [...parent.children];
  const nth = children.findIndex((v) => element === v) + 1;
  const nthl = children.length - nth + 1;
  if (!nth) return base;
  const parentSelector = psg(parent);
  return `${parentSelector}>${base}:nth-child(${nth}):nth-last-child(${nthl})`;
}
function attrSel(element: Element, name: string) {
  const attr = element.getAttribute(name);
  const dataKey =
    attr !== null ? (attr ? `[${name}="${attr}"]` : `[${name}]`) : "";
  return dataKey;
}

function eventDrag([dx, dy] = [0, 0], { expand = false } = {}) {
  const summaryInput = $visiable<HTMLInputElement>(sel.Summary);
  summaryInput?.focus();

  // console.log("eventDrag", [dx, dy], expand);
  // mousedown
  if (!dg()) {
    // console.log("mousedown", [dx, dy], expand);
    const floatingBtns = [
      ...new Set([
        ...$$('div[role="button"]')
          .reverse()
          .filter((e) => getComputedStyle(e).zIndex === "5004"),
        ...$$('div:has([role="button"])')
          .reverse()
          .filter((e) => getComputedStyle(e).zIndex === "5004"),
      ]),
    ];
    if (floatingBtns.length > 1) throw new Error("Multiple floating");
    const floatingBtn = floatingBtns[0];
    if (!floatingBtn) throw new Error("no event selected");
    const target = expand
      ? floatingBtn.querySelector('*[data-dragsource-type="3"]')
      : floatingBtn;
    if (!target) throw new Error("no dragTarget exists");
    console.log(target);

    // debugger;
    const pos = centerGet(target); // !expand ?  : bottomGet(floatingBtn);
    console.log("cpos", pos);
    // mousedown
    ds({ pos, target });
    posHint(pos);
    target.dispatchEvent(new MouseEvent("mousedown", mouseOpt(pos)));
    document.dispatchEvent(new MouseEvent("mousemove", mouseOpt(pos)));
    // dg().target.dispatchEvent(new MouseEvent("mouseup", mouseOpt(dg().pos)));

    // document.dispatchEvent(new MouseEvent("mousedown", mouseOpt(dg().pos)));
  }
  // mousemove
  if (dg()) {
    // console.log("mousemove", [dx, dy], expand);
    const container = $('[role="row"][data-dragsource-type="4"]');
    const gridcells = [...container.querySelectorAll('[role="gridcell"]')];
    const containerSize = container.getBoundingClientRect();
    const w = containerSize.width / gridcells.length;
    const h = containerSize.height / 24 / 4;
    // console.log(w, h);
    ds({
      pos: vec2add(dg().pos, [dx * w, dy * h]),
      target: dg().target,
    });
    const pos = dg().pos;
    posHint(pos);
    // dg().target.dispatchEvent(new MouseEvent("mousemove", mouseOpt(pos)));
    document.body.dispatchEvent(new MouseEvent("mousemove", mouseOpt(pos)));
  }
  // mouseup
  // console.log("mouseup");
  // document.body.dispatchEvent(
  //   new MouseEvent("mouseup", { bubbles: true, cancelable: true })
  // );
  // unloaders.push(
  const unload = useListener()("keyup", (e) => {
    if (!["AltLeft", "AltRight"].includes((e as KeyboardEvent).code)) return;
    unload();
    ds(null);
    document.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: true, cancelable: true })
    );
  });
  return unload;
}

function posHint(pos: Point) {
  const div = document.createElement("div");
  div.style.background = "red";
  div.style.position = "absolute";
  div.style.left = pos[0] + "px";
  div.style.top = pos[1] + "px";
  div.style.width = "1px";
  div.style.height = "1px";
  div.style.zIndex = "10000";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 200);
}

function draggingUse() {
  const draggingGet = () => globalThis.gcks_dragging;
  const draggingSet = (s: { pos: [number, number]; target: Element } | null) =>
    (globalThis.gcks_dragging = s);
  return { draggingGet, draggingSet };
}
