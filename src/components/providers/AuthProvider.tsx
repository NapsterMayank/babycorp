"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type { AppUser } from "@/store/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setSession = useAuthStore((s) => s.setSession);
  const logout = useAuthStore((s) => s.logout);
  const isTestAccount = useAuthStore((s) => s.isTestAccount);

  useEffect(() => {
    // Test accounts are client-side only — don't touch Supabase session
    if (isTestAccount) return;

    const supabase = createClient();

    const syncSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Only clear store if not a test account (already guarded above)
        return;
      }

      const { data: row } = await supabase
        .from("users")
        .select("id, name, email, mobile, role, city, avatar_url")
        .eq("id", session.user.id)
        .single();

      if (row) {
        const profile: AppUser = {
          id: row.id,
          name: row.name,
          email: row.email ?? "",
          phone: row.mobile ?? "",
          role: row.role,
          city: row.city ?? undefined,
          avatar_url: row.avatar_url ?? undefined,
        };
        setSession(session, profile);
      } else {
        // Session exists but no profile yet (mid-registration)
        setSession(session);
      }
    };

    syncSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { data: row } = await supabase
          .from("users")
          .select("id, name, email, mobile, role, city, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (row) {
          const profile: AppUser = {
            id: row.id,
            name: row.name,
            email: row.email ?? "",
            phone: row.mobile ?? "",
            role: row.role,
            city: row.city ?? undefined,
            avatar_url: row.avatar_url ?? undefined,
          };
          setSession(session, profile);
        } else {
          setSession(session);
        }
      } else if (event === "SIGNED_OUT") {
        logout();
      }
    });

    return () => subscription.unsubscribe();
  }, [isTestAccount, setSession, logout]);

  return <>{children}</>;
}
