import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/api/scripts/pixso-touch.user.js?install=true" prefetch={false} target="_blank" className="btn">
        Pixso-touch
      </Link>
    </main>
  );
}
