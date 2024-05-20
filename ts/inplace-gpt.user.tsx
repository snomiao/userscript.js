// ==UserScript==
// @name             [SNOLAB] Inplace GPT
// @namespace        https://userscript.snomiao.com/
// @version          0.0.1
// @description      Inplace GPT is under developing
// @author           snomiao@gmail.com
// @match            *://*/*
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
// Note: still WIP
// 
import React from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import useHotkeyMapper from "use-hotkey-mapper";

globalThis.inplaceGPT_unload?.();
globalThis.inplaceGPT_unload = main();

function main() {
  const domNode = document.createElement("div");
  const root = createRoot(domNode);
  document.body.append(domNode);
  root.render(<App />);
  return () => {
    root.unmount();
    domNode.remove();
  };
}
function App() {
  useHotkeyMapper({
    "alt+slash": () => {
      prompt
    },
  });
  return <>{createPortal(<Toaster />, document.body)}</>;
}

// useLatestVersion()
