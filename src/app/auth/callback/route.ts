import { createServerSupabaseClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_HOME: Record<string, string> = {
  parent: "/dashboard",
  academy: "/academy-dashboard",
  admin: "/admin",
};

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.session) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
  }

  // Check if this user has a profile in public.users
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.session.user.id)
    .single();

  if (!profile) {
    // New OAuth user — send to register to complete profile
    return NextResponse.redirect(`${origin}/auth/register?oauth=true`);
  }

  // Redirect to "next" param or role-based home
  const destination = next ?? ROLE_HOME[profile.role] ?? "/";
  return NextResponse.redirect(`${origin}${destination}`);
}
