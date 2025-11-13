"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import type { ProjectActionState } from "./action-state";
import { AdminAccessError, getAdminContext } from "@/lib/auth/guards";
import { createProject, deleteProject, updateProject } from "@/lib/repositories/projects";
import { uploadProjectImage } from "@/lib/storage/projects";
import type { ProjectStatus } from "@/types/project";

const statusValues: ProjectStatus[] = ["Shipped", "In Beta", "Exploration"];

const sharedProjectSchema = z.object({
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
  liveHref: z.union([z.string().url(), z.string().length(0)]).optional(),
  repoLabel: z.string().optional(),
  repoHref: z.union([z.string().url(), z.string().length(0)]).optional(),
  imageUrl: z.union([z.string().url(), z.string().length(0)]).optional(),
});

const createProjectSchema = sharedProjectSchema;

const updateProjectSchema = sharedProjectSchema.extend({
  projectId: z.string().min(1),
  currentSlug: z.string().min(1),
  removeImage: z.string().optional(),
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

const toOptionalString = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export async function createProjectAction(_: ProjectActionState, formData: FormData) {
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
    const label = toOptionalString(liveLabel) ?? "Live";
    links.push({ label, href: liveHref });
  }
  if (repoHref) {
    const label = toOptionalString(repoLabel) ?? "GitHub";
    links.push({ label, href: repoHref });
  }

  if (links.length === 0) {
    return {
      success: false,
      error: "Please provide at least one link",
    } as const;
  }

  let imageUrl = toOptionalString(parsed.data.imageUrl);
  if (file && file.size > 0) {
  const upload = await uploadProjectImage(file, parsed.data.slug);
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

  revalidateTag("projects", { expire: 0 });
  revalidateTag("project", { expire: 0 });
  revalidatePath("/");
  revalidatePath(`/projects/${parsed.data.slug}`);
  revalidatePath("/admin");

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

  revalidateTag("projects", { expire: 0 });
  revalidateTag("project", { expire: 0 });
  revalidatePath("/");
  revalidatePath(`/projects/${parsed.data.slug}`);
  revalidatePath("/admin");

  return { success: true } as const;
}

export async function updateProjectAction(_: ProjectActionState, formData: FormData) {
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
  const parsed = updateProjectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form submission",
      issues: parsed.error.flatten().fieldErrors,
    } as const;
  }

  const file = formData.get("image") as File | null;
  const {
    projectId,
    currentSlug,
    removeImage,
    liveHref,
    liveLabel,
    repoHref,
    repoLabel,
    featured,
    imageUrl,
    tech,
    tags,
    ...base
  } = parsed.data;

  const links = [] as { label: string; href: string }[];
  if (liveHref) {
    links.push({ label: toOptionalString(liveLabel) ?? "Live", href: liveHref });
  }
  if (repoHref) {
    links.push({ label: toOptionalString(repoLabel) ?? "GitHub", href: repoHref });
  }

  if (links.length === 0) {
    return {
      success: false,
      error: "Please provide at least one link",
    } as const;
  }

  let nextImageUrl = toOptionalString(imageUrl);
  const shouldRemoveImage = removeImage === "on";

  if (file && file.size > 0) {
  const upload = await uploadProjectImage(file, parsed.data.slug);
    nextImageUrl = upload.publicUrl;
  } else if (shouldRemoveImage) {
    nextImageUrl = null;
  }

  await updateProject(supabase, projectId, {
    ...base,
    links,
    featured: featured === "on",
    tech: formatCommaSeparated(tech),
    tags: formatCommaSeparated(tags),
    image: nextImageUrl,
  });

  revalidateTag("projects", { expire: 0 });
  revalidateTag("project", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/projects/${parsed.data.slug}`);
  if (parsed.data.slug !== currentSlug) {
  revalidateTag("project", { expire: 0 });
    revalidatePath(`/projects/${currentSlug}`);
  }

  return { success: true } as const;
}
