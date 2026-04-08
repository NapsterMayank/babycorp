"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight, ArrowLeft, Check, X, Zap,
  Trophy, Star, Users, BarChart3, HeartPulse,
  UtensilsCrossed, MessageCircle, Crown,
  AlertCircle, Plus,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase";
import { PLAN_PRICES } from "@/types/database";
import type { SubscriptionPlan, SubscriptionCycle } from "@/types/database";

// ── Types ──────────────────────────────────────────────────────
interface Child {
  id: string;
  name: string;
  dob: string;
  gender: string;
  sport_ids: string[];
  has_active_subscription?: boolean;
}

// ── Plan config ────────────────────────────────────────────────
const PLANS: {
  id: SubscriptionPlan;
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  highlighted: boolean;
  badge: string | null;
  features: { icon: React.ElementType; text: string; included: boolean }[];
}[] = [
  {
    id: "starter",
    name: "Starter",
    emoji: "⭐",
    tagline: "Perfect start",
    color: "border-cream-dark",
    highlighted: false,
    badge: null,
    features: [
      { icon: Trophy,          text: "1 sport guidance",                  included: true },
      { icon: Star,            text: "Best academy matching",              included: true },
      { icon: Users,           text: "School recommendations",             included: true },
      { icon: BarChart3,       text: "Basic progress tracking",            included: true },
      { icon: HeartPulse,      text: "Virtual doctor consultation",        included: false },
      { icon: UtensilsCrossed, text: "Nutritionist consults",              included: false },
      { icon: MessageCircle,   text: "AI 24/7 support",                    included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    emoji: "🚀",
    tagline: "For serious athletes",
    color: "border-orange",
    highlighted: true,
    badge: "Most Popular",
    features: [
      { icon: Trophy,          text: "2 sports guidance",                  included: true },
      { icon: Star,            text: "Best academy matching",              included: true },
      { icon: Users,           text: "School recommendations",             included: true },
      { icon: BarChart3,       text: "Weekly reports + full tracking",     included: true },
      { icon: HeartPulse,      text: "Virtual doctor (1×/month)",          included: true },
      { icon: UtensilsCrossed, text: "Nutritionist (2×/month)",            included: true },
      { icon: MessageCircle,   text: "AI 24/7 support",                    included: true },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    emoji: "👑",
    tagline: "The complete program",
    color: "border-gold",
    highlighted: false,
    badge: "Best Value",
    features: [
      { icon: Trophy,          text: "Unlimited sports guidance",          included: true },
      { icon: Star,            text: "Priority academy access",            included: true },
      { icon: Users,           text: "School intro + direct connect",      included: true },
      { icon: BarChart3,       text: "Weekly report + video analysis",     included: true },
      { icon: HeartPulse,      text: "Unlimited virtual doctor",           included: true },
      { icon: UtensilsCrossed, text: "Unlimited nutritionist",             included: true },
      { icon: MessageCircle,   text: "Dedicated development manager",      included: true },
    ],
  },
];

const SPORT_EMOJI: Record<string, string> = {
  chess: "♟️", swimming: "🏊", cricket: "🏏", badminton: "🏸", gymnastics: "🤸",
};

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function getAge(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

// ── Page ───────────────────────────────────────────────────────
export default function SubscribePage() {
  const router = useRouter();
  const { user, isLoggedIn, isTestAccount } = useAuthStore();

  const [step, setStep] = useState(0); // 0=child, 1=plan, 2=pay
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("growth");
  const [selectedCycle, setSelectedCycle] = useState<SubscriptionCycle>("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingChildren, setFetchingChildren] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in or not a parent
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login?next=/subscribe");
      return;
    }
    if (user?.role !== "parent") {
      router.push("/");
      return;
    }
  }, [isLoggedIn, user, router]);

  // Fetch children
  useEffect(() => {
    if (!isLoggedIn || user?.role !== "parent") return;

    if (isTestAccount) {
      // Mock children for test accounts
      setChildren([
        { id: "test-child-1", name: "Aryan", dob: "2016-03-15", gender: "boy", sport_ids: ["cricket", "chess"] },
        { id: "test-child-2", name: "Meera", dob: "2019-07-22", gender: "girl", sport_ids: ["swimming", "gymnastics"] },
      ]);
      setFetchingChildren(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("children")
      .select("id, name, dob, gender, sport_ids")
      .eq("parent_id", user!.id)
      .then(async ({ data: kids }) => {
        if (!kids) { setFetchingChildren(false); return; }

        // Check which children have active subscriptions
        const { data: subs } = await supabase
          .from("subscriptions")
          .select("child_id")
          .eq("parent_id", user!.id)
          .eq("status", "active");

        const activeChildIds = new Set(subs?.map((s) => s.child_id) ?? []);
        setChildren(kids.map((k) => ({ ...k, has_active_subscription: activeChildIds.has(k.id) })));
        setFetchingChildren(false);
      });
  }, [isLoggedIn, user, isTestAccount]);

  const loadRazorpay = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePay = async () => {
    if (!selectedChild) return;
    setError(null);
    setIsLoading(true);

    // Test account — skip real payment, just redirect
    if (isTestAccount) {
      await new Promise((r) => setTimeout(r, 1200));
      router.push("/dashboard?subscribed=true");
      return;
    }

    // 1. Create Razorpay order
    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "subscription",
        childId: selectedChild.id,
        plan: selectedPlan,
        cycle: selectedCycle,
      }),
    });

    if (!orderRes.ok) {
      setError("Could not create payment order. Try again.");
      setIsLoading(false);
      return;
    }

    const { orderId, amount, currency, keyId } = await orderRes.json();

    // 2. Load Razorpay script
    const loaded = await loadRazorpay();
    if (!loaded) {
      setError("Razorpay failed to load. Check your internet connection.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    // 3. Open checkout
    const rzp = new window.Razorpay({
      key: keyId,
      amount,
      currency,
      order_id: orderId,
      name: "BabyCorp",
      description: `${PLANS.find(p => p.id === selectedPlan)?.name} — ${selectedChild.name}`,
      image: "/logo.png",
      prefill: {
        name: user?.name ?? "",
        email: user?.email ?? "",
        contact: user?.phone ?? "",
      },
      // Enable all payment methods
      method: {
        card:         true, // Debit / Credit cards
        upi:          true, // UPI (GPay, PhonePe, Paytm UPI, BHIM)
        netbanking:   true, // Net banking (all major banks)
        wallet:       true, // Paytm, Mobikwik, Freecharge, Airtel Money, etc.
        emi:          true, // EMI on cards
        bank_transfer: true, // NEFT / RTGS
        paylater:     true, // ICICI PayLater, Simpl, LazyPay, etc.
      },
      config: {
        display: {
          // Show UPI first — most used in India
          sequence: ["block.upi", "block.card", "block.netbanking", "block.wallet", "block.emi", "block.paylater"],
          blocks: {
            upi:        { name: "UPI",         instruments: [{ method: "upi" }] },
            card:       { name: "Cards",        instruments: [{ method: "card" }] },
            netbanking: { name: "Net Banking",  instruments: [{ method: "netbanking" }] },
            wallet:     { name: "Wallets",      instruments: [{ method: "wallet" }] },
            emi:        { name: "EMI",          instruments: [{ method: "emi" }] },
            paylater:   { name: "Pay Later",    instruments: [{ method: "paylater" }] },
          },
        },
      },
      theme: { color: "#FF6B35" },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        setIsLoading(true);
        // 4. Verify + activate
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            type: "subscription",
            childId: selectedChild.id,
            plan: selectedPlan,
            cycle: selectedCycle,
          }),
        });

        if (verifyRes.ok) {
          router.push("/dashboard?subscribed=true");
        } else {
          setError("Payment received but activation failed. Contact support.");
          setIsLoading(false);
        }
      },
      modal: {
        ondismiss: () => setIsLoading(false),
      },
    });

    rzp.open();
  };

  const price = PLAN_PRICES[selectedPlan][selectedCycle];
  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const STEPS = ["Select Child", "Choose Plan", "Pay"];

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden px-4 py-24">
      {/* Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-nunito font-black text-3xl text-white mb-1">
            Start your child&apos;s{" "}
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">champion journey</span>
          </h1>
          <p className="text-white/45 font-lato text-sm">One subscription per child. Cancel anytime.</p>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-poppins font-semibold text-xs transition-all ${
                i === step
                  ? "bg-orange text-white"
                  : i < step
                  ? "bg-white/10 text-white/60"
                  : "text-white/25"
              }`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                  i < step ? "bg-green-500 text-white" : i === step ? "bg-white/20" : "bg-white/10"
                }`}>
                  {i < step ? <Check size={9} /> : i + 1}
                </span>
                {label}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px mx-1 ${i < step ? "bg-white/40" : "bg-white/15"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4"
            >
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="font-lato text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card */}
        <div className="bg-navy-light border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-navy/60">
          <AnimatePresence mode="wait">

            {/* ── Step 0: Select Child ── */}
            {step === 0 && (
              <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="p-6 md:p-8">
                <h2 className="font-nunito font-bold text-xl text-white mb-1">Which child is this for?</h2>
                <p className="text-white/40 font-lato text-sm mb-6">Each child needs their own subscription.</p>

                {fetchingChildren ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-orange/30 border-t-orange rounded-full animate-spin" />
                  </div>
                ) : children.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-white/40 font-lato text-sm mb-4">No children added yet.</p>
                    <button
                      onClick={() => router.push("/auth/register")}
                      className="bg-orange/20 text-orange border border-orange/30 font-poppins font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-orange/30 transition-all flex items-center gap-2 mx-auto"
                    >
                      <Plus size={14} /> Add Child
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {children.map((child) => {
                      const age = getAge(child.dob);
                      const isSelected = selectedChild?.id === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => setSelectedChild(child)}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                            isSelected
                              ? "border-orange bg-orange/10"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                        >
                          {/* Avatar */}
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                            child.gender === "girl" ? "from-pink-500 to-purple-500" : "from-orange to-gold"
                          } flex items-center justify-center font-nunito font-black text-white text-lg shrink-0`}>
                            {child.name[0]}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-poppins font-semibold text-white text-base">{child.name}</p>
                            <p className="font-lato text-white/45 text-xs">{age} years old</p>
                            {child.sport_ids.length > 0 && (
                              <p className="text-white/30 text-xs mt-1">
                                {child.sport_ids.map(s => SPORT_EMOJI[s] ?? s).join("  ")}
                              </p>
                            )}
                          </div>

                          {child.has_active_subscription ? (
                            <span className="text-[10px] font-poppins font-semibold bg-green-500/15 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full shrink-0">
                              Active
                            </span>
                          ) : (
                            <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                              isSelected ? "border-orange bg-orange" : "border-white/20"
                            }`}>
                              {isSelected && <Check size={11} className="text-white" />}
                            </div>
                          )}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => router.push("/dashboard/add-child?return=/subscribe")}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-white/15 text-white/35 hover:border-white/25 hover:text-white/50 transition-all"
                    >
                      <Plus size={18} />
                      <span className="font-poppins font-medium text-sm">Add another child</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={() => { if (selectedChild) setStep(1); }}
                  disabled={!selectedChild}
                  className="w-full mt-6 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:scale-100"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* ── Step 1: Choose Plan ── */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <button onClick={() => setStep(0)} className="text-white/30 hover:text-white/60 transition-colors">
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h2 className="font-nunito font-bold text-xl text-white leading-tight">Choose a plan for {selectedChild?.name}</h2>
                    <p className="text-white/40 font-lato text-xs">All plans are per month, per child.</p>
                  </div>
                </div>

                {/* Billing toggle */}
                <div className="flex items-center bg-white/6 border border-white/10 rounded-full p-1 gap-1 mb-6 w-fit mx-auto">
                  {(["monthly", "annual"] as SubscriptionCycle[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCycle(c)}
                      className={`px-5 py-2 rounded-full font-poppins font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 ${
                        selectedCycle === c
                          ? c === "annual"
                            ? "bg-gradient-to-r from-gold to-yellow-400 text-navy shadow-sm"
                            : "bg-white text-navy shadow-sm"
                          : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                      {c === "annual" && (
                        <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full ${selectedCycle === "annual" ? "bg-navy/20" : "bg-gold/20 text-gold"}`}>
                          2 FREE
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Plan cards */}
                <div className="space-y-3">
                  {PLANS.map((p) => {
                    const price = PLAN_PRICES[p.id][selectedCycle];
                    const isSelected = selectedPlan === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPlan(p.id)}
                        className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 relative ${
                          isSelected ? p.color + " bg-white/5" : "border-white/10 bg-white/3 hover:border-white/20"
                        }`}
                      >
                        {p.badge && (
                          <span className={`absolute -top-2.5 right-4 text-[10px] font-poppins font-bold px-3 py-0.5 rounded-full ${
                            p.highlighted ? "bg-orange text-white" : "bg-gold text-navy"
                          }`}>
                            {p.badge}
                          </span>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{p.emoji}</span>
                            <div>
                              <p className="font-poppins font-bold text-white text-base">{p.name}</p>
                              <p className="font-lato text-white/40 text-[11px]">{p.tagline}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bebas text-2xl text-white">{formatPrice(price)}</p>
                            <p className="font-lato text-white/30 text-[10px]">/{selectedCycle === "annual" ? "year" : "mo"}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                          {p.features.map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-1.5">
                              {feat.included ? (
                                <Check size={10} className="text-green-400 shrink-0" />
                              ) : (
                                <X size={10} className="text-white/20 shrink-0" />
                              )}
                              <span className={`font-lato text-[11px] ${feat.included ? "text-white/60" : "text-white/20 line-through"}`}>
                                {feat.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Continue to Payment <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Pay ── */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStep(1)} className="text-white/30 hover:text-white/60 transition-colors">
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="font-nunito font-bold text-xl text-white">Payment summary</h2>
                </div>

                {/* Summary card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-4">
                  {/* Child */}
                  <div className="flex items-center justify-between">
                    <span className="font-lato text-white/50 text-sm">Child</span>
                    <span className="font-poppins font-semibold text-white text-sm">{selectedChild?.name}</span>
                  </div>

                  {/* Plan */}
                  <div className="flex items-center justify-between">
                    <span className="font-lato text-white/50 text-sm">Plan</span>
                    <span className="font-poppins font-semibold text-white text-sm">
                      {plan.emoji} {plan.name}
                    </span>
                  </div>

                  {/* Billing */}
                  <div className="flex items-center justify-between">
                    <span className="font-lato text-white/50 text-sm">Billing</span>
                    <span className="font-poppins font-semibold text-white text-sm capitalize">{selectedCycle}</span>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Renews */}
                  <div className="flex items-center justify-between">
                    <span className="font-lato text-white/40 text-xs">Renews</span>
                    <span className="font-lato text-white/40 text-xs">
                      {new Date(Date.now() + (selectedCycle === "annual" ? 365 : 30) * 86400000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                    <span className="font-poppins font-semibold text-white text-sm">Total due today</span>
                    <span className="font-bebas text-3xl text-white tracking-wide">{formatPrice(price)}</span>
                  </div>
                </div>

                {/* What you unlock */}
                <div className="bg-orange/8 border border-orange/20 rounded-2xl p-4 mb-6">
                  <p className="font-poppins font-semibold text-orange text-xs mb-2.5 flex items-center gap-1.5">
                    <Zap size={12} /> Unlocks immediately after payment
                  </p>
                  <div className="space-y-1.5">
                    {plan.features.filter((f) => f.included).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check size={11} className="text-orange shrink-0" />
                        <span className="font-lato text-white/70 text-xs">{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pay button */}
                <button
                  onClick={handlePay}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold text-base py-4 rounded-full hover:shadow-2xl hover:shadow-orange/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Crown size={18} />
                      Pay {formatPrice(price)} — Activate {plan.name}
                    </>
                  )}
                </button>

                <p className="text-center font-lato text-white/25 text-[11px] mt-3">
                  Secured by Razorpay · Cancel anytime · GST included
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
