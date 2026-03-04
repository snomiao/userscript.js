import { readFileSync } from "fs";
import { globSync } from "glob";
import { parse } from "userscript-meta";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// Find all userscripts under r/
const allScripts = globSync("r/**/*.user.{js,ts}", { cwd: process.cwd(), nodir: true });

// Match a script by mode (partial name match against file path)
function findEntry(mode: string) {
  return allScripts.find((s) => s.includes(mode)) ?? allScripts[0];
}

// Parse userscript header metadata into vite-plugin-monkey's userscript format
function readMeta(filePath: string) {
  const content = readFileSync(filePath, "utf-8");
  const block = content.match(/\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/)?.[0] ?? "";
  const raw = parse(block) as Record<string, string | string[]>;

  // Collect localised @name:xx and @description:xx into objects
  const name: Record<string, string> = {};
  const description: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith("name:")) name[k.slice(5)] = v as string;
    else if (k === "name") name[""] = v as string;
    if (k.startsWith("description:")) description[k.slice(12)] = v as string;
    else if (k === "description") description[""] = v as string;
  }

  return {
    name: Object.keys(name).length > 1 ? name : name[""],
    description: Object.keys(description).length > 1 ? description : description[""],
    namespace: raw["namespace"] as string,
    version: raw["version"] as string,
    author: raw["author"] as string,
    license: raw["license"] as string,
    match: [raw["match"] ?? []].flat(),
    grant: [raw["grant"] ?? []].flat(),
    noframes: "noframes" in raw ? true : undefined,
    supportURL: raw["supportURL"] as string | undefined,
    homepageURL: raw["homepageURL"] as string | undefined,
  };
}

export default defineConfig(({ mode }) => {
  // mode comes from --mode flag, e.g. `vite --mode multilang-wiki`
  // fall back to listing available scripts when no useful mode is given
  if (mode === "development" && allScripts.length > 1) {
    console.log("\nAvailable scripts (pass via --mode):");
    allScripts.forEach((s) => console.log(" ", s));
    console.log('\nExample: bun vite --mode multilang-wiki\n');
  }

  const entry = findEntry(mode);
  const userscript = readMeta(entry);

  return {
    plugins: [
      monkey({
        entry,
        userscript,
      }),
    ],
  };
});
