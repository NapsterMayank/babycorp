// ─── TEST / DEMO ACCOUNTS ────────────────────────────────────────────────────
// These accounts bypass real auth and let you explore every role in the app.
// Never use in production — guarded by NODE_ENV or NEXT_PUBLIC_DEMO_MODE.
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole = "parent" | "academy" | "admin";

export interface TestUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  /** OTP that always works in test mode */
  otp: string;
  /** Password that always works in test mode */
  password: string;
  /** Where to redirect after login */
  dashboardPath: string;
  /** Short description shown on the login card */
  description: string;
  /** Emoji avatar shown on quick-login button */
  emoji: string;
  /** Mock data injected into the session */
  meta: Record<string, unknown>;
}

export const TEST_ACCOUNTS: TestUser[] = [
  {
    id: "test-parent-001",
    role: "parent",
    name: "Priya Sharma",
    email: "parent@babycorp.test",
    phone: "9999900001",
    otp: "000000",
    password: "Test@123",
    dashboardPath: "/dashboard",
    description: "Parent with 2 enrolled children",
    emoji: "👩",
    meta: {
      city: "Delhi",
      children: ["Aryan (7, Football)", "Riya (5, Swimming)"],
    },
  },
  {
    id: "test-academy-001",
    role: "academy",
    name: "Coach Rahul (Delhi FC Academy)",
    email: "academy@babycorp.test",
    phone: "9999900002",
    otp: "000000",
    password: "Test@123",
    dashboardPath: "/academy-dashboard",
    description: "Academy owner with 3 active batches",
    emoji: "🏋️",
    meta: {
      academy: "Delhi Football Academy",
      sport: "Football",
      students: 24,
    },
  },
  {
    id: "test-admin-001",
    role: "admin",
    name: "Admin — BabyCorp HQ",
    email: "admin@babycorp.test",
    phone: "9999900003",
    otp: "000000",
    password: "Test@123",
    dashboardPath: "/admin",
    description: "Full platform access — all roles visible",
    emoji: "🛡️",
    meta: {
      access: "all",
    },
  },
];

/** Shared test OTP — works for any test phone number */
export const TEST_OTP = "000000";

/** Returns the matching test account or null */
export function findTestAccount(
  identifier: string,
  type: "phone" | "email"
): TestUser | null {
  const key = type === "phone" ? "phone" : "email";
  return TEST_ACCOUNTS.find((a) => a[key] === identifier) ?? null;
}

/** True when running in dev or demo mode */
export function isTestModeEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEMO_MODE === "true"
  );
}
