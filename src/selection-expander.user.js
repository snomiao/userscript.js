// ==UserScript==
// @name            [SNOLAB] Selection expander
// @name:zh         [SNOLAB] 选区扩展器
// @namespace       snomiao@gmail.com
// @version         0.0.4
// @description     Shift+Alt+Right/Left to Expand/Shirink Selection to parent elements. (vise versa) just like vscode
// @description:zh  Shift+Alt+Right/Left to 扩大/缩小 文字选区，常用于代码复制等操作（反之也可）。 just like vscode
// @author          snomiao
// @match           *://*/*
// @grant           none
// ==/UserScript==
// note: migrated to https://gist.github.com/snomiao/7e4d17e1b618167654c4d1ae0dc23cd3f

globalThis?.selectionExpander?.unload?.();

function hotkeyMatch(event, hotkey) {
  if (Boolean(event.altKey) !== /alt|alter/i.test(hotkey)) return false;
  if (Boolean(event.ctrlKey) !== /ctrl|control/i.test(hotkey)) return false;
  if (Boolean(event.metaKey) !== /meta|win|cmd/i.test(hotkey)) return false;
  if (Boolean(event.shiftKey) !== /shift/i.test(hotkey)) return false;
  const key = hotkey.replace(/alt|alter|ctrl|control|meta|win|cmd|shift/gi, "");
  if (!key.toLowerCase().match(event.key.toLowerCase())) return false;
  event.preventDefault();
  return true;
}
const coreState = { sel: null };
const expander = ([a, b]) => {
  // expand to sibling or parent
  const ap = a.previousSibling || a.parentNode;
  const bp = b.nextSibling || b.parentNode;
  if (ap?.contains(bp)) return [ap, ap];
  if (bp?.contains(ap)) return [bp, bp];
  if (ap && bp) return [ap, bp];
  return null;
};
const fnLister = (fn, val) => {
  const out = fn(val);
  return out ? [out, ...fnLister(fn, out)] : [];
};
const expanderLister = ([a, b]) => {
  return fnLister(expander, [a, b]);
};

function updateCoreStateAndGetSel() {
  const sel = globalThis.getSelection();
  const { anchorNode, focusNode, anchorOffset, focusOffset } = sel;
  if (!coreState.sel) {
    coreState.sel = { anchorNode, focusNode, anchorOffset, focusOffset };
  }
  const coreNodes = [coreState.sel.anchorNode, coreState.sel.focusNode];
  if (!coreNodes.every((node) => sel.containsNode(node))) {
    coreState.sel = { anchorNode, focusNode, anchorOffset, focusOffset };
  }
  return { sel, coreNodes };
}
function selectionExpand() {
  const { sel } = updateCoreStateAndGetSel();
  // expand
  const expand = expander([sel.anchorNode, sel.focusNode]);
  if (!expand) return; // can't expand anymore
  const [anc, foc] = expand;
  sel.setBaseAndExtent(anc, 0, foc, foc.childNodes.length);
}
function selectionShirink() {
  const { sel, coreNodes } = updateCoreStateAndGetSel();
  const list = expanderLister(coreNodes);
  const rangeNodes = list
    .reverse()
    .find((rangeNodes) => rangeNodes.every((node) => sel.containsNode(node)));
  if (rangeNodes) {
    const [a, b] = rangeNodes;
    sel.setBaseAndExtent(a, 0, b, b.childNodes.length);
    return;
  }
  const { anchorNode, focusNode, anchorOffset, focusOffset } = coreState.sel;
  if (!sel.containsNode(anchorNode)) {
    sel.collapseToStart();
    return;
  }
  sel.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}

const handleKeydown = (event) => {
  if (hotkeyMatch(event, "alt+shift+arrowright")) selectionExpand();
  if (hotkeyMatch(event, "alt+shift+arrowleft")) selectionShirink();
};

// load
globalThis.addEventListener("keydown", handleKeydown);
const unload = () => {
  globalThis.removeEventListener("keydown", handleKeydown);
};

// export unload
globalThis.selectionExpander = { unload };
