import { unstable_cache } from "next/cache";

import { createPublicSupabaseClient } from "@/lib/supabase/public";
import type { NewProjectPayload, ProjectRecord } from "@/types/project";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const PROJECTS_TABLE = "projects";

type TypedSupabaseClient = SupabaseClient<Database>;

const selectColumns = `
  id,
  slug,
  title,
  summary,
  description,
  tech,
  links,
  category,
  year,
  status,
  featured,
  metrics,
  tags,
  image,
  created_at,
  updated_at
` as const;

const fetchAllProjects = async () => {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select(selectColumns)
    .order("featured", { ascending: false })
    .order("year", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return data ?? [];
};

const getProjectsCached = unstable_cache(fetchAllProjects, ["projects"], {
  revalidate: 300,
  tags: ["projects"],
});

export const fetchProjects = async (): Promise<ProjectRecord[]> => getProjectsCached();

const fetchProject = async (slug: string) => {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select(selectColumns)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load project: ${error.message}`);
  }

  return data;
};

const getProjectCached = unstable_cache(fetchProject, ["project"], {
  revalidate: 300,
  tags: ["projects", "project"],
});

export const fetchProjectBySlug = async (slug: string): Promise<ProjectRecord | null> =>
  getProjectCached(slug);

export async function createProject(supabase: TypedSupabaseClient, payload: NewProjectPayload) {
  const insertPayload = {
    ...payload,
    featured: payload.featured ?? false,
    metrics: payload.metrics ?? null,
    tags: payload.tags ?? null,
    image: payload.image ?? null,
  };
  const { error, data } = await supabase
    .from(PROJECTS_TABLE)
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  return data;
}

export async function updateProject(
  supabase: TypedSupabaseClient,
  id: string,
  payload: Partial<NewProjectPayload>,
) {
  const updatePayload = {
    ...payload,
    metrics: payload.metrics === undefined ? undefined : payload.metrics ?? null,
    tags: payload.tags === undefined ? undefined : payload.tags ?? null,
    image: payload.image === undefined ? undefined : payload.image ?? null,
  };
  const { error, data } = await supabase
    .from(PROJECTS_TABLE)
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return data;
}

export async function deleteProject(supabase: TypedSupabaseClient, id: string) {
  const { error } = await supabase.from(PROJECTS_TABLE).delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }
}
