import Link from "next/link";

export const metadata = {
  title: "About • Rasyid Portfolio Log",
  description: "Learn about the curated collection of Rasyid's software projects."
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-primary-50">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary-200 underline decoration-primary-400/70 underline-offset-4 transition duration-150 ease-terminal hover:text-primary-50"
      >
        ← Back to portfolio
      </Link>
      <h1 className="mt-8 text-3xl font-semibold text-primary-100">About This Portfolio</h1>
      <p className="mt-6 text-base leading-7 text-primary-200/80">
        This site is a curated log of projects I&apos;ve shipped across freelance work, product experiments,
        and personal explorations. Each entry highlights the craft, constraints, and outcomes that shaped the build.
      </p>
      <p className="mt-4 text-base leading-7 text-primary-200/80">
        The code for this site is open and available on GitHub. Feel free to explore the repository, peek at the
        implementation details, or open an issue if you spot something interesting.
      </p>
      <p className="mt-4 text-base leading-7 text-primary-200/80">
        Repository:&nbsp;
        <Link
          href="https://github.com/annurdien/portofolio"
          className="text-primary-200 underline decoration-primary-400/80 underline-offset-4 transition duration-150 ease-terminal hover:text-primary-50"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/annurdien/portofolio
        </Link>
      </p>
    </main>
  );
}
