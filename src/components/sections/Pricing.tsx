"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Zap, Trophy, Star, Users, BarChart3, HeartPulse, UtensilsCrossed, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { PLAN_PRICES } from "@/types/database";
import type { SubscriptionCycle } from "@/types/database";

const CYCLES: { id: SubscriptionCycle; label: string; badge?: string }[] = [
  { id: "monthly",   label: "Monthly" },
  { id: "quarterly", label: "Quarterly", badge: "Save 13%" },
  { id: "annual",    label: "Annual",    badge: "2 months free" },
];

const PLANS = [
  {
    id: "starter" as const,
    name: "Starter",
    emoji: "⭐",
    tagline: "Perfect for families starting out",
    color: "border-cream-dark",
    highlighted: false,
    badge: null,
    ctaText: "Get Started",
    features: [
      { icon: Trophy,          text: "1 sport personal guidance",         included: true  },
      { icon: Star,            text: "Best academy matching near you",     included: true  },
      { icon: Users,           text: "School recommendations by city",     included: true  },
      { icon: BarChart3,       text: "Basic progress tracking",            included: true  },
      { icon: MessageCircle,   text: "Monthly performance report",         included: true  },
      { icon: HeartPulse,      text: "Virtual doctor consultation",        included: false },
      { icon: UtensilsCrossed, text: "Nutritionist / dietician consults",  included: false },
      { icon: MessageCircle,   text: "AI-assisted 24/7 support",           included: false },
    ],
  },
  {
    id: "growth" as const,
    name: "Growth",
    emoji: "🚀",
    tagline: "For serious young athletes",
    color: "border-orange",
    highlighted: true,
    badge: "Most Popular",
    ctaText: "Start Growing",
    features: [
      { icon: Trophy,          text: "2 sports personal guidance",           included: true  },
      { icon: Star,            text: "Best academy matching for both sports", included: true  },
      { icon: Users,           text: "School recommendations by city",        included: true  },
      { icon: BarChart3,       text: "Full progress tracking + weekly reports", included: true },
      { icon: MessageCircle,   text: "Weekly performance report",             included: true  },
      { icon: HeartPulse,      text: "Virtual doctor consultation (1×/month)",included: true  },
      { icon: UtensilsCrossed, text: "Nutritionist consults (2×/month)",      included: true  },
      { icon: MessageCircle,   text: "AI-assisted 24/7 support",              included: true  },
    ],
  },
  {
    id: "elite" as const,
    name: "Elite",
    emoji: "👑",
    tagline: "The complete champion program",
    color: "border-gold",
    highlighted: false,
    badge: "Best Value",
    ctaText: "Go Elite",
    features: [
      { icon: Trophy,          text: "Unlimited sports guidance",                 included: true },
      { icon: Star,            text: "Priority academy access + early bookings",  included: true },
      { icon: Users,           text: "School recommendations + direct intro",     included: true },
      { icon: BarChart3,       text: "Full progress + video performance analysis",included: true },
      { icon: MessageCircle,   text: "Weekly report + dedicated growth plan",     included: true },
      { icon: HeartPulse,      text: "Unlimited virtual doctor consultations",    included: true },
      { icon: UtensilsCrossed, text: "Unlimited nutritionist / dietician",        included: true },
      { icon: MessageCircle,   text: "Dedicated child development manager",       included: true },
    ],
  },
];

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function cycleLabel(cycle: SubscriptionCycle) {
  if (cycle === "annual")    return "/year";
  if (cycle === "quarterly") return "/quarter";
  return "/month";
}

function perMonthEquiv(plan: typeof PLANS[0], cycle: SubscriptionCycle): string | null {
  if (cycle === "monthly") return null;
  const total = PLAN_PRICES[plan.id][cycle];
  const months = cycle === "annual" ? 12 : 3;
  const pm = Math.round(total / months);
  return `${formatPrice(pm)}/mo equiv.`;
}

export default function Pricing() {
  const [cycle, setCycle] = useState<SubscriptionCycle>("monthly");
  const { isLoggedIn } = useAuthStore();
  const subscribePath = isLoggedIn ? "/subscribe" : "/auth/register";

  // Slider thumb position index
  const cycleIdx = CYCLES.findIndex((c) => c.id === cycle);

  return (
    <section className="bg-cream py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            BabyCorp Plans
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-navy leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="font-lato text-navy/50 text-lg mt-4 max-w-lg leading-relaxed">
            One subscription per child. Guidance, academy matching, health support — all in one place.
          </p>
        </motion.div>

        {/* Cycle slider */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-12"
        >
          <div className="relative bg-navy/6 border border-navy/10 rounded-full p-1 flex items-center">
            {/* Sliding pill */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-md"
              animate={{ left: `calc(${cycleIdx} * 33.333% + 4px)`, width: "calc(33.333% - 8px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />

            {CYCLES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCycle(c.id)}
                className="relative z-10 flex items-center gap-1.5 px-6 py-2.5 w-36 justify-center rounded-full transition-colors duration-200"
              >
                <span className={`font-poppins font-semibold text-sm transition-colors duration-200 ${cycle === c.id ? "text-navy" : "text-navy/45 hover:text-navy/65"}`}>
                  {c.label}
                </span>
                {c.badge && (
                  <span className={`text-[9px] font-poppins font-bold px-1.5 py-0.5 rounded-full transition-all duration-200 ${
                    cycle === c.id
                      ? c.id === "annual" ? "bg-gold/20 text-gold" : "bg-green-100 text-green-600"
                      : "bg-navy/8 text-navy/35"
                  }`}>
                    {c.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {PLANS.map((plan, i) => {
            const price = PLAN_PRICES[plan.id][cycle];
            const equiv = perMonthEquiv(plan, cycle);
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative bg-white border-2 ${plan.color} rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                  plan.highlighted ? "shadow-2xl shadow-orange/10 md:scale-[1.03]" : "shadow-sm hover:shadow-lg"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-orange to-orange-hover text-white"
                      : "bg-gradient-to-r from-gold to-yellow-400 text-navy"
                  } font-poppins font-bold text-xs px-4 py-1.5 rounded-full whitespace-nowrap shadow-md`}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{plan.emoji}</span>
                    <h3 className="font-nunito font-black text-navy text-2xl">{plan.name}</h3>
                  </div>
                  <p className="font-lato text-navy/50 text-sm mb-4">{plan.tagline}</p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cycle}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="flex items-end gap-1">
                        <span className="font-bebas text-5xl text-navy tracking-wide">{formatPrice(price)}</span>
                        <span className="font-lato text-navy/40 text-sm mb-1.5">{cycleLabel(cycle)} · per child</span>
                      </div>
                      {equiv && (
                        <p className="font-lato text-green-600 text-xs font-semibold mt-1">{equiv}</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      {feat.included ? (
                        <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                          <Check size={11} className="text-green-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-navy/5 rounded-full flex items-center justify-center shrink-0">
                          <X size={11} className="text-navy/20" />
                        </div>
                      )}
                      <span className={`font-lato text-sm ${feat.included ? "text-navy/70" : "text-navy/30 line-through"}`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={subscribePath}>
                  <button className={`w-full font-poppins font-semibold text-sm py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95"
                      : plan.id === "elite"
                      ? "bg-gradient-to-r from-gold to-yellow-400 text-navy hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-95"
                      : "border-2 border-navy/15 text-navy hover:bg-navy hover:text-white"
                  }`}>
                    {plan.ctaText} <ArrowRight size={15} />
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Per-child note + full pricing link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-navy to-navy-light border border-white/10 rounded-2xl px-6 py-5"
        >
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-gold shrink-0" />
            <div>
              <p className="font-poppins font-semibold text-white text-sm">All plans are per child · No hidden fees</p>
              <p className="font-lato text-white/45 text-xs mt-0.5">Cancel anytime before your next billing date. GST included in all prices.</p>
            </div>
          </div>
          <Link href="/pricing">
            <button className="shrink-0 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] whitespace-nowrap">
              Full pricing details →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
