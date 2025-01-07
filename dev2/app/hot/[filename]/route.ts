import { NextRequest } from "next/server";
import { $ } from "zx";

export const GET = async (req: NextRequest, { params: { filename = "" } }) => {
  const href = req.nextUrl.href;
  const host = req.headers.get("x-forwarded-host");
  const proto = req.headers.get("x-forwarded-proto");
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const url = `${proto}://${host}${pathname}${search}`;

  const result = (await $`bun ./scripts/build.ts --baseUrl ${url} ${filename}`).stdout;

  return new Response(result, {
    headers: { "Content-Type": "text/javascript; charset=utf8" },
  });
};