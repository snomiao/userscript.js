import { readFile, stat } from "fs/promises";
import { globby } from "globby";
import { coerce } from "semver";

export async function findScriptMeta(filename: string) {
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
  const fileStat = await stat(src);
  const content = await readFile(src, "utf8");
  // console.log(yaml.stringify({ content }));
  const header = content.match(
    /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/
  )?.[0];

  const version = header?.match(/\/\/ @version\s+(.*?)$/im)?.[1];
  console.log("v", coerce(version)?.format());
  console.log("m", fileStat.mtime.toISOString());
  return { header, src, content };
}
