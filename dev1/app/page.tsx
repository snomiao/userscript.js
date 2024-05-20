import Link from "next/link";
import { glob } from "glob";
import pMap from "p-map";
import { readFile } from "fs/promises";
import path from "path";
import { useTransition } from "react";
export default async function Home() {
  // getLangFrom header()
  // const lang =
  const lang = "zh";

  const ls = (await glob("../ts/*.user.{ts,tsx,js,jsx,mjs,cjs}")).toSorted();
  const scripts = await pMap(
    ls,
    async (f) => {
      return await scriptParse(f);
    },
    {}
  );
  const lx = ls.map((e) => e.replace("../ts/", ""));
  return (
    <div className="h-screen overflow-auto p-24 flex items-center flex-col">
      <main className="flex flex-col justify-between gap-2">
        {scripts.map(({ src: f, filename, header }) => {
          const displayName = header[`name:${lang}`] ?? header.name;
          const displayDesc =
            header[`description:${lang}`] ?? header.description;
          const href = `/v2/script/${encodeURIComponent(
            filename
          )}?src=install&t=${+new Date()}`;
          return (
            <details>
              <summary>
                <Link
                  key={f}
                  href={href}
                  prefetch={false}
                  target="_blank"
                  className="inline-flex btn w-full justify-between"
                >
                  <span>{displayName}</span>
                  <span className="text-xs">v{header.version}</span>
                </Link>
              </summary>
              <code className="m-auto grow-0 shrink max-w-full overflow-wrap pre-wrap">
                {displayDesc}
              </code>
            </details>
          );
        })}
      </main>
    </div>
  );
}
async function scriptParse(src: string) {
  const content = await readFile(src, "utf8");
  const headerRaw = content.match(
    /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/
  )?.[0];
  if (!headerRaw) throw new Error("missing headerRaw in " + src);
  const header = Object.fromEntries(
    [...headerRaw!.matchAll(/^\/\/\s+@([a-zA-Z0-9_-]+)\s+(.*?)$/gim)].map((e) =>
      e.slice(1)
    )
  );
  const version = header.version;
  // const filename = f.replace("../ts/", "");

  return {
    src,
    filename: path.parse(src).name + ".js",
    // filename: filename.replace(/\.user\..*$/, ""),
    header,
    version,
  };
}
