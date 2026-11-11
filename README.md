# Userscript.js by snomiao

snomiao's userscripts, sync to
[snomiao - Greasy Fork](https://greasyfork.org/zh-CN/users/31387-snomiao)

[English](/) | [简体中文](/zh-cn/)

## Script Docs

[All Userscripts](/script-intro.md)

## List of scripts

Greasy Fork:
[snomiao - Greasy Fork](https://greasyfork.org/zh-CN/users/31387-snomiao) (Sync
with this repo)

Github:
[snomiao/userscript.js: sync to greasyfork.com](https://github.com/snomiao/userscript.js#readme)
(Source)

### Sync By github

- from:
  - https://github.com/snomiao/userscript.js
- to:
  - [Import scripts - greasyfork](https://greasyfork.org/en/import)
  - [New Script - OpenUserJS](https://openuserjs.org/user/add/scripts)

## Catalog

Every script, grouped by purpose. Sources live in three places:

- `src/` — single-file scripts in this repo (synced to Greasy Fork)
- `lib/<repo>` — standalone repos included as git submodules (`git submodule update --init`)
- gists — a few older scripts still hosted as gists

Develop a `lib/` script with `bun run dev:lib <name>`, e.g. `bun run dev:lib multilang-wiki`.

### 🌐 Language learning

- [pardon-could-you-say-it-again](lib/pardon-could-you-say-it-again) — press `.` / `,` to replay the last sentence slowly on any video/audio site
- [youtube-unwatched-playlist](lib/youtube-unwatched-playlist) — auto-play all unwatched YouTube search results in a queue
- [multilang-wiki](lib/multilang-wiki) — Wikipedia articles in multiple languages side by side
- [search-in-your-lang-userjs](lib/search-in-your-lang-userjs) — press Tab in a search box to translate the keyword into your browser language
- [jpdb-hotkeys.user.js](lib/jpdb-hotkeys.user.js) — Vim-style HJKL/WASD shortcuts for jpdb.io reviews
- [google-bilingual-search-enja (gist)](https://gist.github.com/snomiao/ecee0271ac7599d526aaa210293e3f43) — Mulango en/ja bilingual Google & Bing results
- [google-bilingual-search (gist)](https://gist.github.com/snomiao/f7281ff2b31eea606bdb944e0ea7d7c5) — bilingual Google search results
- [[SNOLAB] [Mulango] Search](src/mulangoSearch.user.js)
- [google multilang search view en/zh](src/google-multilang.user.js)
- [[SNOLAB] [Mulango] Point Speaker](src/mulangoPointer.user.js)
- [[SNOLAB] [Mulango] Alt Speak Translator](src/AltSpeakSelection.user.js)
- [Alt+S to Speak from TTS engines](src/Alt%2BS%20to%20Speak%20from%20TTS%20engines.user.js)
- [[SNOLAB] [Mulango] Telegram Translator](src/TelegramTranslator.user.js)
- [[SNOLAB] I Heard Telegram Speaking](src/IHeardTelegramSpeaking.user.js)
- [Telegram Speaker](src/TelegramTTS.user.js)
- [Telegram Speaker](src/tgspeaker.user.js)
- [[SNOLAB] [Mulango] myTyping Game Translator](src/myTypingTranslator.user.js)
- [Wikipedia multi language view](src/wiki-multilang.user.js)
- [Go to English wikipedia](src/go-to-en-wikipedia.user.js)
- [Seisho Reader](src/seisho-reader.user.js)

### 📺 YouTube & media

- [youtube-queue.user.js](lib/youtube-queue.user.js) — push all YouTube search results to the play queue
- [download-youtube-subtitles (gist)](https://gist.github.com/snomiao/13684b427387776971af61bb7f7c419e) — download YouTube subtitles
- [YoutubeAllResultsPushToQueuePlay](src/youtube-queue.user.js)
- [所有视频2倍速度播放 / video speed 2x](src/videospeed2x.user.js)
- [[SNOLAB] Alt + i to invert color of Images / Videos Color](src/media-color-invert.user.js)
- [Quick Inverse Images color by Alt+C](src/imageInverse.user.js)

### ⌨️ Browsing productivity & keyboard

- [batch-open-links](lib/batch-open-links) — batch open links from the main list on any page
- [copy-markdown-title-alt-c.user.js](lib/copy-markdown-title-alt-c.user.js) — Alt+C to copy page title & URL as a Markdown link
- [selection-expander.user.js](lib/selection-expander.user.js) — Shift+Alt+Left/Right to expand/shrink the selection, like VS Code
- [[SNOLAB] Alt + 123... Searching Results Links List Batch Open](src/LinksListBatchOpen.user.js)
- [[snolab] batch-search](src/batch-search.user.js)
- [一键批量打开谷歌必应搜索前2的n次方项搜索结果](src/google2toN.user.js)
- [[SNOLAB] Keep only one page per domain](src/keep-only-one-page-per-host.user.js)
- [Copy Markdown Quote Alt+C](src/CopyMarkdownQuote.user.js)
- [MarkdownCopy](src/MarkdownCopy.user.js)
- [Copy Title Alt+T](src/CopyTitleAlt_T.user.js)
- [[SNOLAB] Selection expander](src/selection-expander.user.js)
- [Horizontal First Scroll | 横向优先滚动](src/HorizontalFirstScroll.user.js)
- [雪阅模式|SNOREAD-横向滚动组件](src/horizonScroll.user.js)
- [pdf.js 自动切换横向滚动](src/pdfViewerHorizonScroll.user.js)
- [Google I'm Feeling Lucky Redirect](src/GoogleImFeelingLuckyRedirect.user.js)
- [Make Google Sorry Page Link Clickable](src/makeGoogleSorryPageLinkClickable.user.js)

### 📅 Google Calendar

- [google-calendar-keyboard-enhance.user.ts](lib/google-calendar-keyboard-enhance.user.ts) — keyboard shortcuts and text copying for Google Calendar
- [[SNOLAB] Google Calendar keyboard enhance](src/google-calendar-keys.user.js)
- [[雪星实验室] Google Calendar 谷歌日历自动上色](src/Google%E6%97%A5%E5%8E%86%E8%87%AA%E5%8A%A8%E4%B8%8A%E8%89%B2.user.js)

### 🤖 Developer & AI tools

- [copilot-continue.user.js](lib/copilot-continue.user.js) — auto-click Continue / Grant / Try Again on GitHub Copilot interruptions
- [npm-typescript-flag.user.js](lib/npm-typescript-flag.user.js) — show Dt / Ts icons on npm search results
- [[SNOLAB] NPM Typescript Flag](src/npm-typescript-flag.user.js)
- [OpenAI Chat Copy Code Hotkey](src/OpenAI-chat-copy-code-hotkey.user.js)
- [[SNOLAB] Inplace GPT](src/inplace-gpt.user.js)
- [testing-library-user-event](src/testing-library-user-event.user.js)
- [AW-Analyzer](src/aw-analyze.user.js)
- [Tampermonkey Clean tmclean](src/tampermonkey.user.js)

### 💰 Finance & shopping

- [beancount-go](src/beancount-go.user.js)
- [淘宝、京东、天猫自动按每斤价格排序 TAOBAO/JD/TMALL / Automatic sort by 500g price.](src/pricesof500g.user.js)
- [京东白条每日额度页面自动领取额度](src/%E4%BA%AC%E4%B8%9C%E7%99%BD%E6%9D%A1%E6%AF%8F%E6%97%A5%E9%A2%9D%E5%BA%A6%E9%A1%B5%E9%9D%A2%E8%87%AA%E5%8A%A8%E9%A2%86%E5%8F%96%E9%A2%9D%E5%BA%A6.user.js)
- [格上财富，表格自动规范化，用于复制到 Excel](src/%E6%A0%BC%E4%B8%8A%E8%B4%A2%E5%AF%8C%E8%A1%A8%E6%A0%BC%E8%87%AA%E5%8A%A8%E8%A7%84%E8%8C%83%E5%8C%96.user.js)

### 🧰 Misc automation

- [通用自动签到与领取](src/%E9%80%9A%E7%94%A8%E8%87%AA%E5%8A%A8%E7%AD%BE%E5%88%B0%E4%B8%8E%E9%A2%86%E5%8F%96.user.js)
- [[SNOLAB] Name Generator](src/namegen.user.js)
- [btsync 1.4.111 批量添加 Key](src/batchBTSync.user.js)
- [Thingverse auto download](src/thingverse.user.js)

### 🇨🇳 Legacy Chinese-site scripts

- [SNOMIAO-QZFriends.user.js](lib/SNOMIAO-QZFriends.user.js) — QZone friends helper
- [超星网课挂科模式](src/%E8%B6%85%E6%98%9F%E7%BD%91%E8%AF%BE%E6%8C%82%E7%A7%91%E6%A8%A1%E5%BC%8F.user.js)
- [超星提前解锁章节](src/%E8%B6%85%E6%98%9F%E6%8F%90%E5%89%8D%E8%A7%A3%E9%94%81%E7%AB%A0%E8%8A%82.user.js)
- [雨课堂网页版操作](src/%E9%9B%A8%E8%AF%BE%E5%A0%82%E7%BD%91%E9%A1%B5%E7%89%88%E6%93%8D%E4%BD%9C.user.js)
- [Khan Acadamy UI Enhance](src/khan-acadamy-ui-enhance.user.js)
- [微信网页版全屏](src/%E5%BE%AE%E4%BF%A1%E7%BD%91%E9%A1%B5%E7%89%88%E5%85%A8%E5%B1%8F.user.js)
- [微信网页版导出：通讯录、群成员名单、聊天列表](src/%E5%BE%AE%E4%BF%A1%E7%BE%A4%E6%88%90%E5%91%98%E5%88%97%E8%A1%A8%E5%AF%BC%E5%87%BA.user.js)
- [QQ空间相册下载神器](src/qzoneGalleryCrawler.js)
- [盘多多自动跳转下载](src/%E7%9B%98%E5%A4%9A%E5%A4%9A%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC%E4%B8%8B%E8%BD%BD.user.js)
- [电百网PDF在线下载](src/%E7%94%B5%E7%99%BE%E7%BD%91PDF%E5%9C%A8%E7%BA%BF%E4%B8%8B%E8%BD%BD.user.js)
- [观察网自动跳转全文](src/%E8%A7%82%E5%AF%9F%E7%BD%91%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC%E5%85%A8%E6%96%87.user.js)

## Refences

- [Bookmarklet Creator with Script Includer - Peter Coles](https://mrcoles.com/bookmarklet/)
- [Easy multi-language, multi-version documentation with Docsify, Git, and GitHub Actions — Martian Chronicles, Evil Martians’ team blog](https://evilmartians.com/chronicles/easy-multi-language-multi-version-documentation-with-docsify-git-and-github-actions)
- [vite-userscript-plugin - npm](https://www.npmjs.com/package/vite-userscript-plugin)
- [vite-plugin-monkey - npm](https://www.npmjs.com/package/vite-plugin-monkey)
- [vite-plugin-tm-userscript - npm](https://www.npmjs.com/package/vite-plugin-tm-userscript) (deprecated)
- [webpack-userscript - npm](https://www.npmjs.com/package/webpack-userscript) (deprecated)
- [userscript-metadata - npm](https://www.npmjs.com/package/userscript-metadata)

---

## Stargazers

[![Stargazers over time](https://starchart.cc/snomiao/userscript.js.svg?variant=adaptive)](https://starchart.cc/snomiao/userscript.js)

<!-- markdown style -->

<style>
    img{
        max-width: 60vw;
        margin: auto;
    }
</style>
