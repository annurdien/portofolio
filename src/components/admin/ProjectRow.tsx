"use client";

import { useState } from "react";

import { deleteProjectAction } from "@/app/admin/(dashboard)/actions";
import type { ProjectRecord } from "@/types/project";

import { ProjectEditForm } from "./ProjectEditForm";

export function ProjectRow({ project }: { project: ProjectRecord }) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <tr>
        <td className="px-4 py-3">
          <div className="flex flex-col">
            <span className="font-medium text-primary-50">{project.title}</span>
            <span className="text-xs text-primary-200/70">/{project.slug}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-primary-200/80">{project.year}</td>
        <td className="px-4 py-3 text-primary-200/80">{project.status}</td>
        <td className="px-4 py-3 text-primary-200/80">{project.featured ? "Yes" : "No"}</td>
        <td className="px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              className="rounded border border-primary-400/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary-100 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-50"
            >
              {editing ? "Close" : "Edit"}
            </button>
            <form action={deleteProjectAction}>
              <input type="hidden" name="projectId" value={project.id} />
              <input type="hidden" name="slug" value={project.slug} />
              <button
                type="submit"
                className="rounded border border-primary-400/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-200 transition duration-150 ease-terminal hover:border-red-400 hover:text-red-100"
              >
                Delete
              </button>
            </form>
          </div>
        </td>
      </tr>
      {editing ? (
        <tr className="bg-background-900/60">
          <td colSpan={5} className="px-4 pb-4">
            <ProjectEditForm project={project} onClose={() => setEditing(false)} />
          </td>
        </tr>
      ) : null}
    </>
  );
}
