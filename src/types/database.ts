// Auto-generated types for Supabase schema
// Run `npx supabase gen types typescript` to regenerate after schema changes

export type UserRole = "parent" | "academy" | "admin";
export type SubscriptionPlan = "starter" | "growth" | "elite";
export type SubscriptionCycle = "monthly" | "quarterly" | "annual";
export type SubscriptionStatus = "active" | "expired" | "cancelled" | "past_due";
export type AddonType = "genetic_test" | "sports_psychology" | "blood_panel";

export const PLAN_PRICES: Record<SubscriptionPlan, Record<SubscriptionCycle, number>> = {
  starter: { monthly: 499,  quarterly: 1299,  annual: 4999  },
  growth:  { monthly: 999,  quarterly: 2599,  annual: 9999  },
  elite:   { monthly: 2499, quarterly: 6499,  annual: 24999 },
};

export const ADDON_PRICES: Record<AddonType, number> = {
  genetic_test:      9999,
  sports_psychology: 1499,
  blood_panel:       2999,
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          mobile: string | null;
          name: string;
          role: UserRole;
          city: string | null;
          preferred_language: string;
          referral_code: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          mobile?: string | null;
          name: string;
          role: UserRole;
          city?: string | null;
          preferred_language?: string;
          referral_code?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
        Relationships: [];
      };
      children: {
        Row: {
          id: string;
          parent_id: string;
          name: string;
          dob: string;
          gender: string;
          sport_ids: string[];
          medical_notes: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          name: string;
          dob: string;
          gender: string;
          sport_ids?: string[];
          medical_notes?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["children"]["Insert"]>;
        Relationships: [];
      };
      academies: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string | null;
          city: string;
          address: string | null;
          lat: number | null;
          lng: number | null;
          verified: boolean;
          rating_avg: number;
          bank_account_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string | null;
          city: string;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
          verified?: boolean;
          rating_avg?: number;
          bank_account_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["academies"]["Insert"]>;
        Relationships: [];
      };
      sports: {
        Row: {
          id: string;
          name: string;
          icon_url: string | null;
          skill_rubric: Record<string, unknown>;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          icon_url?: string | null;
          skill_rubric?: Record<string, unknown>;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["sports"]["Insert"]>;
        Relationships: [];
      };
      batches: {
        Row: {
          id: string;
          academy_id: string;
          sport_id: string;
          name: string;
          coach_name: string | null;
          age_min: number;
          age_max: number;
          max_students: number;
          schedule: Record<string, unknown>[];
          price_monthly: number;
          price_quarterly: number | null;
          price_annual: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          academy_id: string;
          sport_id: string;
          name: string;
          coach_name?: string | null;
          age_min: number;
          age_max: number;
          max_students?: number;
          schedule?: Record<string, unknown>[];
          price_monthly: number;
          price_quarterly?: number | null;
          price_annual?: number | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["batches"]["Insert"]>;
        Relationships: [];
      };
      enrollments: {
        Row: {
          id: string;
          child_id: string;
          batch_id: string;
          parent_id: string;
          type: "trial" | "monthly" | "quarterly" | "annual";
          status: "active" | "trial" | "paused" | "cancelled";
          start_date: string;
          end_date: string | null;
          auto_renew: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id: string;
          batch_id: string;
          parent_id: string;
          type: "trial" | "monthly" | "quarterly" | "annual";
          status?: "active" | "trial" | "paused" | "cancelled";
          start_date: string;
          end_date?: string | null;
          auto_renew?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["enrollments"]["Insert"]>;
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          enrollment_id: string;
          parent_id: string;
          academy_id: string;
          amount: number;
          status: "pending" | "paid" | "refunded" | "failed";
          razorpay_payment_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          enrollment_id: string;
          parent_id: string;
          academy_id: string;
          amount: number;
          status?: "pending" | "paid" | "refunded" | "failed";
          razorpay_payment_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          parent_id: string;
          child_id: string;
          plan: SubscriptionPlan;
          cycle: SubscriptionCycle;
          status: SubscriptionStatus;
          current_period_start: string;
          current_period_end: string;
          razorpay_subscription_id: string | null;
          razorpay_payment_id: string | null;
          amount_paid: number;
          created_at: string;
          cancelled_at: string | null;
        };
        Insert: {
          id?: string;
          parent_id: string;
          child_id: string;
          plan: SubscriptionPlan;
          cycle: SubscriptionCycle;
          status?: SubscriptionStatus;
          current_period_start?: string;
          current_period_end: string;
          razorpay_subscription_id?: string | null;
          razorpay_payment_id?: string | null;
          amount_paid: number;
          created_at?: string;
          cancelled_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
        Relationships: [];
      };
      addons: {
        Row: {
          id: string;
          parent_id: string;
          child_id: string;
          subscription_id: string | null;
          type: AddonType;
          status: "pending" | "completed" | "cancelled";
          razorpay_payment_id: string | null;
          amount_paid: number;
          notes: string | null;
          scheduled_date: string | null;
          completed_at: string | null;
          report_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          child_id: string;
          subscription_id?: string | null;
          type: AddonType;
          status?: "pending" | "completed" | "cancelled";
          razorpay_payment_id?: string | null;
          amount_paid: number;
          notes?: string | null;
          scheduled_date?: string | null;
          completed_at?: string | null;
          report_url?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["addons"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
    };
    CompositeTypes: Record<string, never>;
  };
};
