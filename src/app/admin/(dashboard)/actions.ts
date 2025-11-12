"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { AdminAccessError, getAdminContext } from "@/lib/auth/guards";
import { createProject, deleteProject } from "@/lib/repositories/projects";
import { uploadProjectImage } from "@/lib/storage/projects";
import type { ProjectStatus } from "@/types/project";

const statusValues: ProjectStatus[] = ["Shipped", "In Beta", "Exploration"];

const createProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  year: z.coerce.number().int().min(1900),
  status: z.enum(statusValues),
  tech: z.string().min(1),
  tags: z.string().optional(),
  featured: z.string().optional(),
  liveLabel: z.string().optional(),
  liveHref: z.string().url().optional(),
  repoLabel: z.string().optional(),
  repoHref: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
});

const deleteProjectSchema = z.object({
  projectId: z.string().min(1),
  slug: z.string().min(1),
});

const formatCommaSeparated = (value: string | undefined) =>
  value
    ?.split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0) ?? [];

export async function createProjectAction(_: unknown, formData: FormData) {
  let supabase;
  try {
    ({ supabase } = await getAdminContext());
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return {
        success: false,
        error:
          error.reason === "unauthenticated"
            ? "Please sign in to continue"
            : "You do not have permission to perform this action",
      } as const;
    }

    throw error;
  }

  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  const parsed = createProjectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form submission",
      issues: parsed.error.flatten().fieldErrors,
    } as const;
  }

  const file = formData.get("image") as File | null;
  const { liveHref, liveLabel, repoHref, repoLabel, featured, ...rest } = parsed.data;

  const links = [] as { label: string; href: string }[];
  if (liveHref) {
    links.push({ label: liveLabel && liveLabel.length > 0 ? liveLabel : "Live", href: liveHref });
  }
  if (repoHref) {
    links.push({ label: repoLabel && repoLabel.length > 0 ? repoLabel : "GitHub", href: repoHref });
  }

  if (links.length === 0) {
    return {
      success: false,
      error: "Please provide at least one link",
    } as const;
  }

  let imageUrl = parsed.data.imageUrl ?? null;
  if (file && file.size > 0) {
    const upload = await uploadProjectImage(supabase, file, parsed.data.slug);
    imageUrl = upload.publicUrl;
  }

  await createProject(supabase, {
    ...rest,
    links,
    featured: featured === "on",
    tech: formatCommaSeparated(parsed.data.tech),
    tags: formatCommaSeparated(parsed.data.tags),
    image: imageUrl,
  });

  revalidatePath("/");
  revalidatePath(`/projects/${parsed.data.slug}`);

  return { success: true } as const;
}

export async function deleteProjectAction(formData: FormData) {
  let supabase;
  try {
    ({ supabase } = await getAdminContext());
  } catch (error) {
    if (error instanceof AdminAccessError) {
      return {
        success: false,
        error:
          error.reason === "unauthenticated"
            ? "Please sign in to continue"
            : "You do not have permission to perform this action",
      } as const;
    }

    throw error;
  }

  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  const parsed = deleteProjectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid request",
    } as const;
  }

  await deleteProject(supabase, parsed.data.projectId);

  revalidatePath("/");
  revalidatePath(`/projects/${parsed.data.slug}`);

  return { success: true } as const;
}
