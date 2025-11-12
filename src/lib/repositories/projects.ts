import { cache } from "react";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { NewProjectPayload, ProjectRecord } from "@/types/project";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const PROJECTS_TABLE = "projects";

type TypedSupabaseClient = SupabaseClient<Database>;

export const fetchProjects = cache(async (): Promise<ProjectRecord[]> => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select("*")
    .order("featured", { ascending: false })
    .order("year", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return data ?? [];
});

export const fetchProjectBySlug = cache(async (slug: string): Promise<ProjectRecord | null> => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from(PROJECTS_TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load project: ${error.message}`);
  }

  return data;
});

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
