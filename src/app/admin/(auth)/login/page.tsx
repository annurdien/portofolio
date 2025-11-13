import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/LoginForm";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-950 px-6 py-16 text-primary-50">
      <LoginForm />
    </div>
  );
}
