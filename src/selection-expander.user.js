// ==UserScript==
// @name            [SNOLAB] Selection expander
// @name:zh         [SNOLAB] 选区扩展器
// @namespace       snomiao@gmail.com
// @version         0.0.1
// @description     Shift+Alt+Right to Expand Selection to parent elements. (vise versa)
// @description:zh  Shift+Alt+Right to 扩大文字选区，常用于代码复制等操作（反之也可）。
// @author          snomiao
// @match           *://*/*
// @grant           none
// ==/UserScript==

document?.selectionExpander?.unload?.();

function hotkeyMatch(event, hotkey) {
    if (!!event.altKey !== /alt|alter/i.test(hotkey)) return false;
    if (!!event.ctrlKey !== /ctrl|control/i.test(hotkey)) return false;
    if (!!event.metaKey !== /meta|win|command/i.test(hotkey)) return false;
    if (!!event.shiftKey !== /shift/i.test(hotkey)) return false;
    if (!hotkey.toLowerCase().match(event.key.toLowerCase())) return false;
    event.preventDefault();
    return true;
}
const coreState = { sel: null };
const expander = ([a, b]) => {
    // if (a.compareDocumentPosition(b) & 2 /* DOCUMENT_POSITION_PRECEDING  */) {
    //     const [bp, ap] = expander(b, a);
    //     return [ap, bp];
    // }
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
function selectionExpand() {
    const sel = window.getSelection();
    const { anchorNode, focusNode, anchorOffset, focusOffset } = sel;
    if (!coreState.sel)
        coreState.sel = { anchorNode, focusNode, anchorOffset, focusOffset };
    const coreNodes = [coreState.sel.anchorNode, coreState.sel.focusNode];
    if (!coreNodes.every((node) => sel.containsNode(node)))
        coreState.sel = { anchorNode, focusNode, anchorOffset, focusOffset };
    // expand
    const expand = expander([anchorNode, focusNode]);
    if (!expand) return;
    const [anc, foc] = expand;
    sel.setBaseAndExtent(anc, 0, foc, foc.childNodes.length);
}
function selectionShirink() {
    const sel = window.getSelection();
    if (!coreState.sel) return;
    const coreNodes = [coreState.sel.anchorNode, coreState.sel.focusNode];
    const list = expanderLister(coreNodes);
    const expand = list
        .reverse()
        .find((expand) => expand.every((node) => sel.containsNode(node)));
    if (expand) {
        const [a, b] = expand;
        sel.setBaseAndExtent(a, 0, b, b.childNodes.length);
        return;
    }
    const { anchorNode, focusNode, anchorOffset, focusOffset } = coreState.sel;
    sel.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}

const handleKeydown = (event) => {
    if (hotkeyMatch(event, 'alt+shift+arrowleft')) selectionShirink();
    if (hotkeyMatch(event, 'alt+shift+arrowright')) selectionExpand();
};

// load
document.addEventListener('keydown', handleKeydown);
const unload = () => {
    document.removeEventListener('keydown', handleKeydown);
    console.log('selectionExpander unloaded');
};

// export unload
document.selectionExpander = { unload };
