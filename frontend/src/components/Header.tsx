import Link from "next/link";

export default function Header() {
  return (
    <header className="backdrop-blur-md bg-white/10 dark:bg-black/30 border-b border-white/10 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-display tracking-tight text-white hover:opacity-90 transition">
          Sonalinews Clone
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="text-sm font-medium text-zinc-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/admin" className="text-sm font-medium bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-full transition">
            Admin Panel
          </Link>
        </nav>
      </div>
    </header>
  );
}
