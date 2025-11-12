import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";
import type { ProfileRecord } from "@/types/profile";

export class AdminAccessError extends Error {
  constructor(
    public readonly reason: "unauthenticated" | "unauthorized",
    message?: string,
  ) {
    super(message ?? reason);
  }
}

type AdminContext = {
  supabase: SupabaseClient<Database>;
  user: User;
  profile: Pick<ProfileRecord, "id" | "role">;
};

async function fetchCurrentProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<Pick<ProfileRecord, "id" | "role"> | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load profile: ${error.message}`);
  }

  return data;
}

export async function getAdminContext(options?: { redirectOnFail?: boolean }): Promise<AdminContext> {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (options?.redirectOnFail) {
      redirect("/admin/login");
    }

    throw new AdminAccessError("unauthenticated");
  }

  const profile = await fetchCurrentProfile(supabase, user.id);

  if (!profile || profile.role !== "admin") {
    if (options?.redirectOnFail) {
      redirect("/admin/login?error=unauthorized");
    }

    throw new AdminAccessError("unauthorized");
  }

  return { supabase, user, profile };
}
