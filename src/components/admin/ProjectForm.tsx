"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { createProjectAction } from "@/app/admin/(dashboard)/actions";

type FormState =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
      issues?: Record<string, string[]>;
    };

const initialState: FormState = {
  success: false,
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded border border-primary-400/40 bg-background-900 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-100 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-50 disabled:opacity-60"
    >
      {pending ? "Saving..." : "Create project"}
    </button>
  );
}

export function ProjectForm() {
  const [state, formAction] = useFormState(createProjectAction, initialState);
  const [formKey, setFormKey] = useState(() => crypto.randomUUID());

  useEffect(() => {
    if (state.success) {
      setFormKey(crypto.randomUUID());
    }
  }, [state.success]);

  return (
    <form
      key={formKey}
      action={formAction}
      className="space-y-6 rounded border border-primary-400/30 bg-background-900/70 p-6"
    >
      <div className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-50">Add project</h2>
        <p className="text-xs text-primary-200/70">
          Provide the project metadata, tech stack, and optional links. Uploading an image will push it to the configured Supabase storage bucket.
        </p>
      </div>

      {state.success === false && state.error && (
        <p className="rounded border border-red-400/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {state.error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Title
          <input
            name="title"
            required
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Slug
          <input
            name="slug"
            required
            pattern="[a-z0-9-]+"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200 md:col-span-2">
          Summary
          <textarea
            name="summary"
            required
            rows={2}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200 md:col-span-2">
          Description
          <textarea
            name="description"
            required
            rows={4}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Category
          <input
            name="category"
            required
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Year
          <input
            name="year"
            required
            type="number"
            min={2000}
            max={2100}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Status
          <select
            name="status"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          >
            <option value="Shipped">Shipped</option>
            <option value="In Beta">In Beta</option>
            <option value="Exploration">Exploration</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Tech (comma separated)
          <input
            name="tech"
            required
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
            placeholder="Swift, Supabase"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Tags (comma separated)
          <input
            name="tags"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
            placeholder="SwiftUI, Tools"
          />
        </label>
        <label className="flex flex-row items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          <input type="checkbox" name="featured" className="h-4 w-4" />
          Featured
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Primary link label
          <input
            name="liveLabel"
            placeholder="Live"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Primary link URL
          <input
            name="liveHref"
            type="url"
            placeholder="https://"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Secondary link label
          <input
            name="repoLabel"
            placeholder="GitHub"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Secondary link URL
          <input
            name="repoHref"
            type="url"
            placeholder="https://github.com/..."
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        Image file
        <input
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="text-sm"
        />
      </label>
      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        Or existing image URL
        <input
          name="imageUrl"
          type="url"
          placeholder="https://"
          className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
        />
      </label>

      <SubmitButton />
    </form>
  );
}
