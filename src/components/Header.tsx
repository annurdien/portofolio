"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [{ label: "Projects", href: "#projects" }];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
  <Link href="/" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary-200">
          <span className="h-2 w-2 rounded-full bg-primary-400 shadow-glow" aria-hidden />
          Rasyid
        </Link>
  <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group relative transition hover:text-primary-200">
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-primary-400 via-primary-200 to-primary-400 transition duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-content-center rounded-full border border-slate-800 bg-slate-900/60 text-slate-200 transition hover:border-primary-400 hover:text-primary-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="space-y-1.5">
            {[0, 1, 2].map((item) => {
              const base = "block h-0.5 w-6 rounded-full bg-current transition-transform duration-300";
              if (!open) {
                return <span key={item} className={base} />;
              }

              if (item === 0) {
                return <span key={item} className={`${base} translate-y-1.5 rotate-45`} />;
              }

              if (item === 1) {
                return <span key={item} className={`${base} scale-x-0`} />;
              }

              return <span key={item} className={`${base} -translate-y-1.5 -rotate-45`} />;
            })}
          </div>
        </button>
      </div>
      {open && (
        <nav className="md:hidden">
          <ul className="space-y-1 border-t border-slate-800/50 bg-slate-950/95 px-6 py-4 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 transition hover:bg-primary-500/10 hover:text-primary-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
