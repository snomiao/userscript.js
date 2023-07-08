import esbuild from "esbuild";
import yaml from "yaml";
import { readFile } from "fs/promises";
import path from "path";
export const runtime = "nodejs";
// https://localhost:3003/scripts/pixso-touch.user.js
// pixso-touch.user.js
export const GET = async (req: Request, { params: { filename = "" } }) => {
  console.log(filename);
  // ".version.txt" // version
  // ".user.js" // runner

  const src = path.resolve("../ts/" + filename.replace(".js", ".tsx"));
  // esbuild.build
  // "../ts/pixso-touch.user.ts"
  const content = await readFile(src, "utf8");
  const header = content.match(
    /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/
  )?.[0];
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
  // const script = results.outputFiles[0].text;
  const script = "asdf";
  return new Response(script, {
    headers: { "content-type": "application/javascript" },
  });
};
