"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
  Check, X, Zap, ArrowRight, FlaskConical, Brain,
  Dna, HeartPulse, UtensilsCrossed, Trophy, Shield,
  MessageCircle, BarChart3, Star, Users
} from "lucide-react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    emoji: "⭐",
    tagline: "Perfect for families starting out",
    monthly: 499,
    annual: 4999,
    annualSaving: "Save ₹989 (2 months free)",
    color: "border-cream-dark",
    badge: null,
    highlighted: false,
    ctaText: "Get Started",
    features: [
      { icon: Trophy,         text: "1 sport personal guidance",             included: true },
      { icon: Star,           text: "Best academy matching near you",         included: true },
      { icon: Users,          text: "School recommendations by city",         included: true },
      { icon: BarChart3,      text: "Basic progress tracking",                included: true },
      { icon: MessageCircle,  text: "Monthly performance report",             included: true },
      { icon: HeartPulse,     text: "Virtual doctor consultation",            included: false },
      { icon: UtensilsCrossed,text: "Nutritionist / dietician consults",      included: false },
      { icon: MessageCircle,  text: "AI-assisted 24/7 support",               included: false },
      { icon: Dna,            text: "Genetic sport aptitude test",            included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    emoji: "🚀",
    tagline: "For serious young athletes",
    monthly: 999,
    annual: 9999,
    annualSaving: "Save ₹1,989 (2 months free)",
    color: "border-orange",
    badge: "Most Popular",
    highlighted: true,
    ctaText: "Start Growing",
    features: [
      { icon: Trophy,          text: "2 sports personal guidance",             included: true },
      { icon: Star,            text: "Best academy matching for both sports",   included: true },
      { icon: Users,           text: "School recommendations by city",          included: true },
      { icon: BarChart3,       text: "Full progress tracking + weekly reports",  included: true },
      { icon: MessageCircle,   text: "Weekly performance report",               included: true },
      { icon: HeartPulse,      text: "Virtual doctor consultation (1×/month)",  included: true },
      { icon: UtensilsCrossed, text: "Nutritionist consults (2×/month)",        included: true },
      { icon: MessageCircle,   text: "AI-assisted 24/7 support",                included: true },
      { icon: Dna,             text: "Genetic sport aptitude test",             included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    emoji: "👑",
    tagline: "The complete champion program",
    monthly: 2499,
    annual: 24999,
    annualSaving: "Save ₹4,989 (2 months free)",
    color: "border-gold",
    badge: "Best Value",
    highlighted: false,
    ctaText: "Go Elite",
    features: [
      { icon: Trophy,          text: "Unlimited sports guidance",               included: true },
      { icon: Star,            text: "Priority academy access + early bookings", included: true },
      { icon: Users,           text: "School recommendations + direct intro",    included: true },
      { icon: BarChart3,       text: "Full progress + video performance analysis",included: true },
      { icon: MessageCircle,   text: "Weekly report + dedicated growth plan",    included: true },
      { icon: HeartPulse,      text: "Unlimited virtual doctor consultations",   included: true },
      { icon: UtensilsCrossed, text: "Unlimited nutritionist / dietician",       included: true },
      { icon: MessageCircle,   text: "Dedicated child development manager",      included: true },
      { icon: Dna,             text: "Genetic sport aptitude test (included)",   included: true },
    ],
  },
];

const ADDONS = [
  {
    icon: Dna,
    name: "Genetic Sport Aptitude Test",
    desc: "One-time DNA analysis that reveals which sports your child is naturally wired for — body type, endurance profile, injury predisposition, and peak performance window.",
    price: "₹9,999",
    originalPrice: "₹14,999",
    tag: "33% off",
    color: "from-purple-900/40 to-purple-800/20 border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Brain,
    name: "Sports Psychology Session",
    desc: "1:1 session with a certified sports psychologist. Builds mental resilience, competitive mindset, and helps manage pre-competition anxiety.",
    price: "₹1,499",
    originalPrice: "₹2,499",
    tag: "Per session",
    color: "from-blue-900/40 to-blue-800/20 border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: FlaskConical,
    name: "Full Blood Panel + Sport Nutrition Report",
    desc: "Comprehensive blood test (iron, D3, B12, thyroid, cortisol) analysed by a sports nutrition doctor. Comes with a personalised supplement and diet plan.",
    price: "₹2,999",
    originalPrice: "₹4,999",
    tag: "Lab included",
    color: "from-green-900/40 to-green-800/20 border-green-500/30",
    iconColor: "text-green-400",
  },
];

const FAQ = [
  {
    q: "Is this a BabyCorp platform subscription or do I also pay the academy?",
    a: "This is a BabyCorp platform subscription only. You pay BabyCorp for guidance, matching, health support, and progress tracking. Academy fees (if any) are handled directly between you and the academy — BabyCorp just helps you find the best one.",
  },
  {
    q: "One subscription per child — how does that work?",
    a: "Each subscription is linked to one child's profile. If you have two children, you purchase two separate subscriptions. You can manage all children from a single parent account.",
  },
  {
    q: "What happens when my subscription expires?",
    a: "You can still view all past reports and your child's profile, but you won't be able to access guidance, consultations, or support until you renew.",
  },
  {
    q: "Is the 24/7 support human or AI?",
    a: "It's AI-assisted — our smart assistant handles most questions instantly. For complex or urgent issues, it escalates automatically to a human specialist within 2 hours.",
  },
  {
    q: "Can I upgrade or downgrade my plan mid-cycle?",
    a: "Yes. Upgrades apply immediately (prorated). Downgrades take effect at the next billing cycle.",
  },
  {
    q: "Are the virtual doctor and nutritionist consultations real licensed professionals?",
    a: "Yes. All virtual consultations are with MBBS-qualified doctors and certified sports nutritionists empaneled by BabyCorp. Sessions are conducted via video call.",
  },
];

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const { isLoggedIn } = useAuthStore();
  const subscribePath = isLoggedIn ? "/subscribe" : "/auth/register";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy pt-28 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-gold/10 border border-gold/20 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              BabyCorp Plans
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-6xl text-white mb-4">
              Invest in your child.{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                Once.
              </span>
            </h1>
            <p className="font-lato text-white/55 text-lg max-w-xl mx-auto mb-8">
              One subscription per child. We find the best academies, track their progress, connect you with doctors and nutritionists — all in one place.
            </p>

            {/* Billing toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-white/8 border border-white/10 rounded-full p-1 gap-1"
            >
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-full font-poppins font-semibold text-sm transition-all duration-200 ${
                  billing === "monthly"
                    ? "bg-white text-navy shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 rounded-full font-poppins font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
                  billing === "annual"
                    ? "bg-gradient-to-r from-gold to-yellow-400 text-navy shadow-sm"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                Annual
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${billing === "annual" ? "bg-navy/20 text-navy" : "bg-gold/20 text-gold"}`}>
                  2 FREE
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Plans */}
      <div className="bg-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {PLANS.map((plan, i) => {
              const price = billing === "monthly" ? plan.monthly : plan.annual;
              const period = billing === "monthly" ? "/month" : "/year";
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

                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{plan.emoji}</span>
                      <h3 className="font-nunito font-black text-navy text-2xl">{plan.name}</h3>
                    </div>
                    <p className="font-lato text-navy/50 text-sm mb-4">{plan.tagline}</p>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billing}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-end gap-1">
                          <span className="font-bebas text-5xl text-navy tracking-wide">{formatPrice(price)}</span>
                          <span className="font-lato text-navy/40 text-sm mb-1.5">{period} · per child</span>
                        </div>
                        {billing === "annual" && (
                          <p className="font-lato text-green-600 text-xs font-semibold mt-1">{plan.annualSaving}</p>
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

          {/* Per-child note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-lato text-navy/45 text-sm"
          >
            All plans are per child. Two children = two subscriptions. Manage everything from one parent account.
          </motion.p>
        </div>
      </div>

      {/* Add-ons */}
      <div className="bg-navy py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Add-ons
            </span>
            <h2 className="font-nunito font-black text-3xl md:text-4xl text-white mb-3">
              Go further with one-time upgrades
            </h2>
            <p className="font-lato text-white/45 text-base">
              Available to any active subscriber. Pay once, benefit forever.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {ADDONS.map((addon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${addon.color} border rounded-2xl p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <addon.icon size={28} className={addon.iconColor} />
                  <span className="bg-white/10 text-white/70 font-poppins font-semibold text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                    {addon.tag}
                  </span>
                </div>
                <h3 className="font-nunito font-bold text-white text-base mb-2">{addon.name}</h3>
                <p className="font-lato text-white/55 text-sm leading-relaxed mb-5">{addon.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bebas text-2xl text-white tracking-wide">{addon.price}</span>
                    {addon.originalPrice && (
                      <span className="font-lato text-white/30 text-xs ml-2 line-through">{addon.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-poppins font-semibold text-xs px-4 py-2 rounded-full transition-all hover:scale-[1.02]">
                    Add →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why BabyCorp */}
      <div className="bg-cream py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-navy to-navy-light border border-white/10 rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-gold" />
              <h3 className="font-nunito font-black text-white text-2xl">What your subscription is NOT</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ["You do NOT pay academies through BabyCorp", "BabyCorp connects you to the best academies. You deal with them directly for class fees."],
                ["No hidden platform fees", "The price you see is the only thing you pay BabyCorp. No booking fees, no setup charges."],
                ["Subscription is per child, not per session", "Unlimited guidance and reports for your child for the entire month — not pay-per-use."],
                ["Cancel anytime", "No long-term lock-in. Cancel before your next billing date and you won't be charged again."],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-5 h-5 bg-orange/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X size={11} className="text-orange" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-white text-sm">{title}</p>
                    <p className="font-lato text-white/45 text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-navy py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-nunito font-black text-3xl text-white text-center mb-8"
          >
            Common questions
          </motion.h2>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-navy-light border border-white/10 rounded-2xl p-5"
              >
                <p className="font-poppins font-semibold text-white text-sm mb-2">{item.q}</p>
                <p className="font-lato text-white/50 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-cream py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="font-nunito font-black text-3xl text-navy mb-3">Your child&apos;s champion journey starts here</h2>
            <p className="font-lato text-navy/55 text-base mb-8">
              Sign up free, explore the platform, then choose the plan that fits your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth/register">
                <button className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2">
                  <Zap size={18} /> Start Free — Pick a Plan Later
                </button>
              </Link>
              <Link href="/discover">
                <button className="border-2 border-navy/15 text-navy font-poppins font-semibold px-8 py-4 rounded-full hover:bg-navy hover:text-white transition-all duration-300 flex items-center gap-2">
                  Browse Academies <ArrowRight size={16} />
                </button>
              </Link>
            </div>
            <p className="font-lato text-navy/35 text-xs mt-5">
              No credit card required to sign up · Cancel anytime · GST included in all prices
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
