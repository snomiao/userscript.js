export function getRequireURL(requestUrl: URL) {
  return Object.assign(requestUrl, {
    search: "?src=install&t=" + new Date().toISOString(),
  }).href;
}
