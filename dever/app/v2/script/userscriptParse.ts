import esbuild from "esbuild";
import { mkdir, writeFile } from "fs/promises";
import { dirname, relative } from "path";
import { findScriptMeta } from "./findScriptMeta";

export async function userscriptParse(filename: string, requireUrl = "") {
  const { header, src, content } = await findScriptMeta(filename);
  // insert @require ${requireUrl} before // ==/UserScript==
  if (requireUrl) {
    return await devScriptBuild(filename, requireUrl);
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
    platform: "browser",
    // sourcemap: true,
    write: false,
  });
  const script = results.outputFiles[0].text;
  const outPath = results.outputFiles[0].path;
  (async function () {
    await mkdir(dirname(outPath), { recursive: true });
    // output file, but not returning this
    await writeFile(outPath, script);
    console.log(
      "wrote " + relative(process.cwd(), outPath) + " len:" + script.length
    );
  })();
  // console.log({ src, out: results.outputFiles[0].path });
  // console.log(script);
  // returning script
  return script;
}
async function devScriptBuild(filename: string, requireUrl: string) {
  const { header, src, content } = await findScriptMeta(filename);
  return header?.replace(
    "// ==/UserScript==",
    `// @require     ${requireUrl}\n// ==/UserScript==`
  );
}

