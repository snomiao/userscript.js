import esbuild from "esbuild";
import NextCors from "nextjs-cors";
import yaml from "yaml";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname } from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { globby } from "globby";
import { coerce } from "semver";

// https://localhost:3003/scripts/pixso-touch.user.js
// https://userscriptjs.snomiao.dev/api/scripts/pixso-touch.user.js?install=true
// pixso-touch.user.js
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res);
  const filename = String(req.query.filename ?? "");
  const base =
    req.headers["x-forwarded-proto"] + "://" + req.headers["x-forwarded-host"];
  if (!req.url) throw new Error("no url");
  console.log(req.url, base);

  const installUrl = Boolean(req.query.install)
    ? Object.assign(new URL(req.url, base), {
        search: "?t=" + new Date().toISOString(),
      }).href
    : undefined;
  console.log(installUrl);

  await res
    .writeHead(200, "OK", { "Content-Type": "application/javascript" })
    .end(await parseScript(filename, installUrl));
  return;
}
async function parseScript(filename: string, installUrl = "") {
  const { header, src, content } = await findScriptMeta(filename);
  // insert @require ${installUrl} before // ==/UserScript==
  if (installUrl) {
    return header?.replace(
      "// ==/UserScript==",
      `// @require     ${installUrl}\n// ==/UserScript==`
    );
  }
  if (!header) throw new Error("no header found");

  if (src.endsWith(".user.js")) return content; // don't compile js

  // console.log(yaml.stringify({ src, header }));
  const results = await esbuild.build({
    sourceRoot: "../",
    entryPoints: [src],
    outdir: "../src/",
    bundle: true,
    banner: { js: header },
    format: "iife",
    platform: "node",
    write: false,
  });
  const script = results.outputFiles[0].text;
  const outPath = results.outputFiles[0].path;
  (async function () {
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, script);
    console.log("wrote " + outPath + " len:" + script.length);
  })();
  console.log({ src, out: results.outputFiles[0].path });
  // console.log(script);
  return script;
}

async function findScriptMeta(filename: string) {
  // console.log(yaml.stringify({ filename }));
  const files = await globby([
    "../ts/" + filename.replace(".js", "") + ".{ts,tsx,js,jsx}",
    "../src/" + filename,
  ]);
  const src = files.find((e) => e);
  if (!src) {
    throw new Error("no file found");
  }
  // console.log(yaml.stringify({ src, files }));
  const content = await readFile(src, "utf8");
  // console.log(yaml.stringify({ content }));
  const header = content.match(
    /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/
  )?.[0];
  //  userScriptParse(content)
  return { header, src, content };
}
