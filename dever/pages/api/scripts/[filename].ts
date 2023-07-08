import esbuild from "esbuild";
import NextCors from "nextjs-cors";
import yaml from "yaml";
import { readFile } from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// https://localhost:3003/scripts/pixso-touch.user.js
// pixso-touch.user.js

const parseScript = async (filename: string, installUrl = "") => {
  console.log(yaml.stringify({ filename }));
  const src = path.resolve("../ts/" + filename.replace(".js", ".tsx"));

  const content = await readFile(src, "utf8");
  const header = content.match(
    /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/
  )?.[0];

  //   TODO: insert @require ${installUrl} before // ==/UserScript==
  if (installUrl) {
    return header?.replace(
      "// ==/UserScript==",
      `// @require     ${installUrl}\n// ==/UserScript==`
    );
  }
  if (!header) throw new Error("no header found");
  console.log();
  console.log(yaml.stringify({ src, header }));
  const results = await esbuild.build({
    sourceRoot: "../",
    entryPoints: [src],
    bundle: true,
    banner: { js: header },
    format: "iife",
    platform: "node",
    write: false,
  });
  const script = results.outputFiles[0].text;
  // console.log(script);
  return script;
};

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
  return res
    .writeHead(200, "OK", { "Content-Type": "application/javascript" })
    .end(await parseScript(filename, installUrl));
}
