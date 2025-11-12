"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import { initialProjectActionState, type ProjectActionState } from "@/app/admin/(dashboard)/action-state";
import { updateProjectAction } from "@/app/admin/(dashboard)/actions";
import type { ProjectRecord } from "@/types/project";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded border border-primary-400/40 bg-primary-500 px-4 py-2 text-xs uppercase tracking-[0.2em] text-background-950 transition duration-150 ease-terminal hover:border-primary-400 hover:bg-primary-400 disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

const joinList = (values: string[] | null | undefined) => values?.join(", ") ?? "";

const getLink = (links: ProjectRecord["links"], index: number) => links[index] ?? null;

export function ProjectEditForm({
  project,
  onClose,
}: {
  project: ProjectRecord;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [state, formAction] = useFormState<ProjectActionState, FormData>(
    updateProjectAction,
    initialProjectActionState,
  );

  useEffect(() => {
    if (state.success) {
      router.refresh();
      onClose?.();
    }
  }, [state.success, onClose, router]);

  const primaryLink = getLink(project.links, 0);
  const secondaryLink = getLink(project.links, 1);

  return (
    <form action={formAction} className="space-y-6 rounded border border-primary-400/30 bg-background-900/80 p-6">
      <input type="hidden" name="projectId" value={project.id} />
      <input type="hidden" name="currentSlug" value={project.slug} />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-50">
            Edit project
          </h3>
          <p className="text-xs text-primary-200/70">Update metadata, links, or imagery.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-primary-400/30 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary-200 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-50"
          >
            Cancel
          </button>
          <SubmitButton />
        </div>
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
            defaultValue={project.title}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Slug
          <input
            name="slug"
            required
            pattern="[a-z0-9-]+"
            defaultValue={project.slug}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200 md:col-span-2">
          Summary
          <textarea
            name="summary"
            required
            rows={2}
            defaultValue={project.summary}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200 md:col-span-2">
          Description
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Category
          <input
            name="category"
            required
            defaultValue={project.category}
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
            defaultValue={project.year}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Status
          <select
            name="status"
            defaultValue={project.status}
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
            defaultValue={project.tech.join(", ")}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Tags (comma separated)
          <input
            name="tags"
            defaultValue={joinList(project.tags)}
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-row items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          <input type="checkbox" name="featured" className="h-4 w-4" defaultChecked={project.featured} />
          Featured
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Primary link label
          <input
            name="liveLabel"
            defaultValue={primaryLink?.label ?? ""}
            placeholder="Live"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Primary link URL
          <input
            name="liveHref"
            type="url"
            required
            defaultValue={primaryLink?.href ?? ""}
            placeholder="https://"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Secondary link label
          <input
            name="repoLabel"
            defaultValue={secondaryLink?.label ?? ""}
            placeholder="GitHub"
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
        <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
          Secondary link URL
          <input
            name="repoHref"
            type="url"
            defaultValue={secondaryLink?.href ?? ""}
            placeholder="https://github.com/..."
            className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        Image file (upload to replace)
        <input
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="text-sm"
        />
      </label>
      <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        Or image URL
        <input
          name="imageUrl"
          type="url"
          defaultValue={project.image ?? ""}
          placeholder="https://"
          className="rounded border border-primary-400/30 bg-background-900 px-3 py-2 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
        />
      </label>
      <label className="flex flex-row items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-200">
        <input type="checkbox" name="removeImage" className="h-4 w-4" />
        Remove current image
      </label>
    </form>
  );
}
