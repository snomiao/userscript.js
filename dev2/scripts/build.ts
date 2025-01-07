import DIE from "@snomiao/die";
import { watch } from "fs/promises";
import { readdir } from "fs/promises";
import { readFile } from "fs/promises";
import { NextRequest } from "next/server";
import { $, argv } from "zx";
import pkg from "@/package.json";
import { build } from "bun";
if (import.meta.main) {
  const baseUrl = argv.baseUrl || "http://localhost";
  const filename = argv._[0] ?? "google-calendar-keys.user.js";
  const final = await (async function build() {
    return await userBuild(filename, "/hot/google-calendar-keys.user.js");
  })();
  console.log(final);
  // console.log(final);
  // const p = $`code - --wait`
  // p.stdin.write(final, 'utf8');
  // await p
  // for await (const _ of watch(src)) break;
  // const newScript = await eval(await (await fetch(newVersionUrl)).text());
  // versionFetcher();
}
// https://userscript.snomiao.dev/hot/google-calendar-keys.user.js
// https://userscript.porter.snomiao.dev/hot/google-calendar-keys.user.js

async function userBuild(filename: string, url: string) {
  const x = new URL(url, "http://localhost").search;
  const src = "./ts/" + filename.replace(/\.js$/, "");
  const srcc = await readFile(src, "utf8");
  const header =
    srcc.match(/(?<!\n^)(?:\/\/.*\n)+/)?.[0] || DIE("missing header");
  const builded = await (await build({ entrypoints: [src] })).outputs[0].text();
  return `${header}\n\n${builded}\n`;
}
async function getExternalsFromNodemodules() {
  return [...(await readdir("./node_modules"))];
}
