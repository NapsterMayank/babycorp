import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROLE_REQUIRED: Record<string, string[]> = {
  "/dashboard": ["parent"],
  "/academy-dashboard": ["academy"],
  "/admin": ["admin"],
};

const ROLE_HOME: Record<string, string> = {
  parent: "/dashboard",
  academy: "/academy-dashboard",
  admin: "/admin",
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Skip protection entirely in demo mode (test accounts are client-side only)
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Find which protected group this path belongs to
  const matchedRoute = Object.keys(ROLE_REQUIRED).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) return response;

  // Not logged in → go to login
  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Fetch role from profile table
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    // Auth user exists but no profile — send to complete registration
    return NextResponse.redirect(new URL("/auth/register", request.url));
  }

  const allowed = ROLE_REQUIRED[matchedRoute];
  if (!allowed.includes(profile.role)) {
    // Logged in but wrong role — redirect to their correct home
    return NextResponse.redirect(
      new URL(ROLE_HOME[profile.role] ?? "/", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/academy-dashboard/:path*", "/admin/:path*"],
};
