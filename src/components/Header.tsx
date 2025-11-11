"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Projects", href: "#projects", accent: true },
  { label: "About", href: "#about" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-400/40 bg-background-900">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-200 transition duration-150 ease-terminal hover:text-primary-50"
        >
          <span className="flex h-3 w-3 items-center justify-center border border-primary-300 bg-background-900" aria-hidden>
            <span className="h-1.5 w-1.5 animate-pulse bg-primary-300" />
          </span>
          Rasyid Portfolio Log
        </Link>
        <nav className="hidden items-center gap-6 text-[0.65rem] uppercase tracking-[0.32em] text-primary-200/70 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 transition duration-150 ease-terminal ${
                link.accent ? "text-primary-200" : "text-primary-200/70"
              } hover:text-primary-50`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-content-center border border-primary-400/40 bg-background-900 text-primary-200 transition duration-200 ease-terminal hover:border-primary-400 hover:text-primary-50 lg:hidden"
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
        <nav className="lg:hidden">
          <ul className="space-y-1 border-t border-primary-400/40 bg-background-900 px-6 py-4 text-sm font-medium uppercase tracking-[0.25em] text-primary-100">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 transition duration-150 ease-terminal hover:bg-primary-500/10 hover:text-primary-50 ${
                    link.accent ? "text-primary-300" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <div className="mt-3 grid gap-1 text-xs text-primary-200/70">
                <span>Focus: Personal work</span>
                <span>Status: Always building</span>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
