// ==UserScript==
// @name         [snolab] batch-search
// @name:zh      [雪星实验室] 批量搜索
// @namespace    https://userscript.snomiao.com/
// @version      0.0.1
// @description  Batch search from multi sourcees.
// @author       snomiao@gmail.com
// @match        http*://*
// @grant        none
// ==/UserScript==

const engs = {
    Page: {
        Google: 'https://www.google.com/search?q=%s',
        LuckyGoogle: 'https://www.google.com/search?btnI&q=%*',
    },
    Knowledge: {},
    Book: {
        douban: 'https://search.douban.com/book/subject_search?search_text=%*',
        Book4you: 'https://book4you.org/s/%*',
    },
    Torrent: { 1337: 'https://www.1377x.to/search/%*/1/' },
    Movie: {},
    Video: {},
    Music: {},
    Dict: { FreeMDict: 'https://forum.freemdict.com/search?q=%s' },
    Model: { Google: 'https://www.google.com/search?q=%s' },
    Image: {},
};
