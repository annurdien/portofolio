import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { projectSeedData } from "../src/data/projects";
import type { Database } from "../src/types/supabase";

const envFile = resolve(process.cwd(), ".env.local");

if (existsSync(envFile)) {
  loadEnv({ path: envFile });
} else {
  loadEnv();
}

type SeedResult = {
  slug: string;
  ok: boolean;
  message?: string;
};

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function seedProjects() {
  const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const payload = projectSeedData.map((project) => ({
    ...project,
    featured: project.featured ?? false,
    metrics: project.metrics ?? null,
    tags: project.tags ?? null,
    image: project.image ?? null,
  }));

  const results: SeedResult[] = [];

  for (const project of payload) {
    const { error } = await supabase
      .from("projects")
      .upsert(project, { onConflict: "slug" });

    if (error) {
      results.push({ slug: project.slug, ok: false, message: error.message });
    } else {
      results.push({ slug: project.slug, ok: true });
    }
  }

  const failures = results.filter((result) => !result.ok);

  if (failures.length > 0) {
    console.error("\nSeeding completed with errors:");
    for (const failure of failures) {
      console.error(`- ${failure.slug}: ${failure.message ?? "Unknown error"}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("Seeding completed successfully for", results.length, "projects.");
}

seedProjects().catch((error) => {
  console.error("Failed to seed projects:", error);
  process.exitCode = 1;
});
