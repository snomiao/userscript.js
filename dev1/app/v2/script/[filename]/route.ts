import { build } from "bun";
import { watch } from "fs/promises";
import { glob } from "glob";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
// export const runtime = "edge";
export const GET = async (req: NextRequest, { params: { filename = "" } }) => {
  // src==='install'
  console.log(filename);
  const query = Object.fromEntries(new URL(req.url).searchParams.entries());
  //   const filename = String(query.filename ?? "");
  const src = query.src as "install" | "require" | "update";
  const headers = Object.fromEntries(req.headers.entries());
  const origin = `${headers["x-forwarded-proto"].toString()}://${headers[
    "x-forwarded-host"
  ].toString()}`;
  const name = path.parse(filename).name;
  const srcPath = (
    await glob("../ts/" + name + ".{tsx,ts,jsx,js,mjs,cjs}")
  )[0].toString();

  const b = {
    src,
    origin,
    filename,
    srcPath,
    built: build({ entrypoints: [srcPath] }),
  };

  console.log(b);
  return (
    Object.freeze({
      async install() {
        // buildx
        return NextResponse.json(b);
      },
      async require() {
        // buildkj
        return NextResponse.json(b);
      },
      async update() {
        // const watcher =  watch(filename);
        return NextResponse.json(b);
      },
    })[src] ?? (() => new Response("", { status: 400 }))
  )();

  //   const base =
  //     req.headers["x-forwarded-proto"] + "://" + req.headers["x-forwarded-host"];
  //   if (!req.url) throw new Error("no url");
  //   console.log(req.url, base);
};
