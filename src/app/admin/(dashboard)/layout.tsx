import type { ReactNode } from "react";
import { getAdminContext } from "@/lib/auth/guards";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  await getAdminContext({ redirectOnFail: true });

  return (
    <div className="min-h-screen bg-background-950 text-primary-50">
      <header className="border-b border-primary-400/20 bg-background-900/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-200/70">Admin Console</p>
            <p className="text-sm font-semibold">Portfolio Projects</p>
          </div>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="rounded border border-primary-400/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-100 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-50"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
