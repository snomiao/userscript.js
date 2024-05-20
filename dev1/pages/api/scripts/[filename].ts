import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { userscriptParse } from "../../../app/v2/script/userscriptParse";
import { getRequireURL } from "../../../app/v2/script/getRequireURL";

// https://localhost:3003/scripts/pixso-touch.user.js
// https://userscriptjs.snomiao.dev/api/scripts/pixso-touch.user.js?install=true
// pixso-touch.user.js
/** @deprecated */
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

  const requireUrl = Boolean(req.query.install)
    ? getRequireURL(new URL(req.url, base))
    : undefined;
  console.log(requireUrl);

  await res
    .writeHead(200, "OK", { "Content-Type": "application/javascript" })
    .end(await userscriptParse(filename, requireUrl));
  return;
}

