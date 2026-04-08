"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";
import type { UserRole } from "@/types/database";
import type { TestUser } from "@/lib/testAccounts";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city?: string;
  avatar_url?: string;
}

interface AuthState {
  // Real Supabase session
  session: Session | null;
  supabaseUser: User | null;
  // Resolved app-level user profile (from users table)
  user: AppUser | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  isTestAccount: boolean;
  isLoading: boolean;

  // Actions
  setSession: (session: Session | null, profile?: AppUser | null) => void;
  setProfile: (profile: AppUser) => void;
  loginAsTest: (testUser: TestUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      supabaseUser: null,
      user: null,
      role: null,
      isLoggedIn: false,
      isTestAccount: false,
      isLoading: false,

      setSession: (session, profile) =>
        set({
          session,
          supabaseUser: session?.user ?? null,
          isLoggedIn: !!session,
          ...(profile && {
            user: profile,
            role: profile.role,
          }),
        }),

      setProfile: (profile) =>
        set({
          user: profile,
          role: profile.role,
        }),

      loginAsTest: (testUser) =>
        set({
          session: null,
          supabaseUser: null,
          user: {
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
            phone: testUser.phone,
            role: testUser.role,
          },
          role: testUser.role,
          isLoggedIn: true,
          isTestAccount: true,
        }),

      logout: () =>
        set({
          session: null,
          supabaseUser: null,
          user: null,
          role: null,
          isLoggedIn: false,
          isTestAccount: false,
        }),

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "babycorp-auth",
      // Only persist non-sensitive fields
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isLoggedIn: state.isLoggedIn,
        isTestAccount: state.isTestAccount,
      }),
    }
  )
);
