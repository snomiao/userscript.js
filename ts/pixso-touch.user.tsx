// ==UserScript==
// @name             [SNOLAB] Pixso touch & pen as mouse
// @name:zh          [SNOLAB] Pixso 将笔作为鼠标使用
// @namespace        https://userscript.snomiao.com/
// @version          0.1.0
// @description      解决Pixso使用触摸屏无法拖动组件的问题
// @author           snomiao@gmail.com
// @match            *://pixso.cn/*
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==

import { equals } from "rambda";

// load
const g = globalThis;
g.xd5kWeoTTZ4g99wj_Unloader?.();
g.xd5kWeoTTZ4g99wj_Unloader = touchEventConverterEffect();

// effect
function touchEventConverterEffect() {
  alert('Effect enabled')
  let lastpos: null | readonly [number, number] = null;
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

    const pos = [first.screenX, first.screenY] as const;
    if (type === "mousedown") lastpos = pos; // event.preventDefault();
    if (type === "mousemove") event.preventDefault();
    if (type === "mouseup" && equals(lastpos, pos)) event.preventDefault();
  }
  const e = document.body;
  const styleChild = e.appendChild(
    Object.assign(document.createElement("div"), {
      innerHTML: "<style>canvas{touch-action:none}</style>",
    }).children[0]
  );
  e.addEventListener("touchstart", touchHandler, true);
  e.addEventListener("touchmove", touchHandler, true);
  e.addEventListener("touchend", touchHandler, true);
  e.addEventListener("touchcancel", touchHandler, true);
  return () => {
    e.removeEventListener("touchstart", touchHandler, true);
    e.removeEventListener("touchmove", touchHandler, true);
    e.removeEventListener("touchend", touchHandler, true);
    e.removeEventListener("touchcancel", touchHandler, true);
    styleChild.remove();
  };
}
