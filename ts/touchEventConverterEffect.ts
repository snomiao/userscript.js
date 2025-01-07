type Pos = readonly [number, number];
function posEq(a: null | Pos, b: null | Pos) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}
export function touchEventConverterEffect(target = document.body) {
  let lastpos: null | Pos = null;
  const t = target;
  // add style
  const styleText = '[role="presentation"]{touch-action:none}';
  const styleEle = document.createElement("style");
  const style = document.createTextNode(styleText);
  styleEle.appendChild(style);
  const styleChild = t.appendChild(styleEle);
  // add event
  t.addEventListener("touchstart", touchHandler, true);
  t.addEventListener("touchmove", touchHandler, true);
  t.addEventListener("touchend", touchHandler, true);
  t.addEventListener("touchcancel", touchHandler, true);
  return () => {
    t.removeEventListener("touchstart", touchHandler, true);
    t.removeEventListener("touchmove", touchHandler, true);
    t.removeEventListener("touchend", touchHandler, true);
    t.removeEventListener("touchcancel", touchHandler, true);
    styleChild.remove();
  };

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
    if (type === "mouseup" && posEq(lastpos, pos)) event.preventDefault();
  }
}
