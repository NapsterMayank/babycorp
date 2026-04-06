"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TestUser, UserRole } from "@/lib/testAccounts";

interface AuthState {
  user: TestUser | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  isTestAccount: boolean;

  loginAsTest: (user: TestUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isLoggedIn: false,
      isTestAccount: false,

      loginAsTest: (user) =>
        set({
          user,
          role: user.role,
          isLoggedIn: true,
          isTestAccount: true,
        }),

      logout: () =>
        set({
          user: null,
          role: null,
          isLoggedIn: false,
          isTestAccount: false,
        }),
    }),
    {
      name: "babycorp-auth",
    }
  )
);
