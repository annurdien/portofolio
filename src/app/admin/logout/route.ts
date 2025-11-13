import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  const redirectUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(redirectUrl, {
    status: 303,
  });
}
