import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary-400/30 bg-background-900 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-sm text-primary-200/80 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-300/70">Portfolio log</p>
          <p className="mt-3 font-medium text-primary-100/90">{`echo "© ${new Date().getFullYear()} Rasyid" >> portfolio.log`}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.28em]">
          <Link href="mailto:annurdien.dev@gmail.com" className="transition duration-200 ease-terminal hover:text-primary-50">
            Email
          </Link>
          <Link href="https://github.com/annurdien" className="transition duration-200 ease-terminal hover:text-primary-50" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/annurdien" className="transition duration-200 ease-terminal hover:text-primary-50" target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
