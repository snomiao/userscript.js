// ==UserScript==
// @name             AW-Analyzer
// @namespace        https://userscript.snomiao.com/
// @version          0.0.1
// @description      try to take over the world!
// @author           snomiao@gmail.com
// @match            http://localhost:5600/
// @icon             https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant            none
// @contributionURL  https://snomiao.com/donate
// @supportURL       https://github.com/snomiao/userscript.js/issues
// ==/UserScript==

window.addEventListener("dblclick", async () => {
  const get = (url = "") => fetch(url).then((e) => e.json());
  const buckets = await get("http://localhost:5600/api/0/buckets");
  const allEvents = await Promise.all(
    Object.keys(buckets)
      .filter((id) => id.match(/aw-watcher-window/))
      .map(async (bucketId) => {
        // const bucketId = "aw-watcher-window_sur";
        // check: http://localhost:5600/api/
        const events = await get(
          `http://localhost:5600/api/0/buckets/${bucketId}/events`
        );
        const pevents = events.map(({ id, timestamp, duration, data }) => {
          // timestamp = "2023-02-15 05:15:23"
          const dt = duration * 1e3;
          const st = new Date(timestamp);
          // duration=345
          const et = new Date(+st + dt);
          const range = (s = 0, e = 0) =>
            [...Array(e - s + 1)].map((_, i) => s + i);
          const mins = range((+st / 60e3 / 15) | 0, (+et / 60e3 / 15) | 0);
          return { st, et, mins, dt, ...data };
        });
        const mins = [...new Set(pevents.flatMap((e) => e.mins))].sort();
        const minsMap = new Map(mins.map((min) => [min, new Set()]));
        pevents.map((e) => e.mins.map((min) => minsMap.get(min)?.add(e)));

        const y = [...minsMap.keys()]
          .sort()
          .map(
            (min) =>
              new Date(min * 15 * 60e3 - new Date().getTimezoneOffset() * 60e3)
                .toISOString()
                .replace("T", "\t") +
              "\t" +
              [...(minsMap.get(min) || [])]
                .map((e) => ({
                  dt: Number(e.dt),
                  t: String(e.title ?? e.app ?? "#"),
                }))
                .reduce((r, { dt, t }) => {
                  const o = r.find((e) => e.t === t);
                  if (!o) r.push({ dt, t });
                  if (o) o.dt += dt;
                  return r;
                }, [])
                .sort((a, b) => a.dt - b.dt)
                .reverse()
                .map(({ dt, t }) => Number((dt / 60e3) | 0) + "m@" + t)
                .join(", ")
          )
          .join("\n");
        document.documentElement.innerHTML = `<pre>${y}</pre>`;
        //   console.table(y);
        //   return events;
      })
  );
});
