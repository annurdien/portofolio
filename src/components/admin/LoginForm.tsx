"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const supabase = useMemo(() => createBrowserSupabaseClient(), []);

  const unauthorized = searchParams.get("error") === "unauthorized";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string | null)?.trim();
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      setError("Email and password are required");
      setPending(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-sm space-y-6 rounded border border-primary-400/30 bg-background-900/70 p-6"
    >
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-200/70">Supabase Auth</p>
        <h1 className="text-lg font-semibold text-primary-50">Admin login</h1>
        <p className="text-xs text-primary-200/60">
          Use the credentials registered in Supabase Auth to continue.
        </p>
      </div>

      {unauthorized && (
        <p className="rounded border border-red-400/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          This account is not authorized for admin access.
        </p>
      )}

      {error && (
        <p className="rounded border border-red-400/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</p>
      )}

      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        Email
        <input
          name="email"
          type="email"
          required
          className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
        />
      </label>

      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        Password
        <input
          name="password"
          type="password"
          required
          className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded border border-primary-400/40 bg-primary-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-background-950 transition duration-150 ease-terminal hover:border-primary-400 hover:bg-primary-400 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
