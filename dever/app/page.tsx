import Link from "next/link";
import { globby } from "globby";

export default async function Home() {
  const filenames = ["pixso-touch.user.js"];
  const ls = await globby("../src/*.js");
  const lx = ls.map(e=>e.replace('../src/',''))
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {lx.map((filename) => (
        <Link
          key="filename"
          href={"/api/scripts/" + encodeURIComponent(filename) + "?install=true"}
          prefetch={false}
          target="_blank"
          className="btn"
        >
          {filename}
        </Link>
      ))}
      <pre>{lx.join("\n")}</pre>
    </main>
  );
}
