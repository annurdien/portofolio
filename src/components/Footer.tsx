import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/80 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p className="text-slate-500">
          © {new Date().getFullYear()} Rasyid. Crafted with passion and precision.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <Link href="mailto:hello@example.com" className="transition hover:text-primary-200">
            hello@example.com
          </Link>
          <Link href="https://github.com/username" className="transition hover:text-primary-200" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com" className="transition hover:text-primary-200" target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
