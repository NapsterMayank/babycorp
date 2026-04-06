"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Trial",
    price: "₹0 – ₹500",
    period: "one-time",
    description: "Try before you commit — zero pressure",
    features: [
      "Single trial session",
      "Coach introduction",
      "Academy facility tour",
      "Feedback session post-trial",
    ],
    cta: "Book a Trial",
    href: "/discover",
    highlighted: false,
    badge: null,
  },
  {
    name: "Monthly",
    price: "₹1,500 – ₹3,500",
    period: "per month",
    description: "Steady progress, flexible commitment",
    features: [
      "4–8 sessions per month",
      "Monthly skill assessment",
      "PDF progress report",
      "WhatsApp session reminders",
      "1 makeup session/month",
      "Cancel with 7 days notice",
    ],
    cta: "Enroll Monthly",
    href: "/discover",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Quarterly",
    price: "₹4,000 – ₹9,000",
    period: "per 3 months",
    description: "Save up to 15% vs monthly",
    features: [
      "All monthly benefits",
      "3-month commitment",
      "Priority batch allocation",
      "Quarterly milestone report",
      "Rate locked for full quarter",
      "Early access to new programs",
    ],
    cta: "Enroll Quarterly",
    href: "/discover",
    highlighted: false,
    badge: "Save 15%",
  },
];

const FAQ_ITEMS = [
  { q: "Does pricing vary by academy?", a: "Yes. Each academy sets its own price within the platform range. BabyCorp's platform fee is already included." },
  { q: "Are there any hidden charges?", a: "Never. The price you see includes everything. GST of 18% applies on trial bookings only." },
  { q: "What if I need to cancel?", a: "Monthly plans cancel with 7 days notice. Quarterly plans have a prorated refund policy set by each academy." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy pt-28 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-gold/10 border border-gold/20 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Transparent Pricing
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-6xl text-white mb-4">
              Simple.{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                Honest.
              </span>
              {" "}No surprises.
            </h1>
            <p className="font-lato text-white/55 text-lg max-w-lg mx-auto">
              Pricing is set by each academy. BabyCorp&apos;s platform fee is already included. What you see is what you pay.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="bg-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative bg-white border rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "border-orange shadow-xl shadow-orange/10 md:scale-105"
                    : "border-cream-dark shadow-sm hover:shadow-md"
                }`}
              >
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.highlighted ? "bg-gradient-to-r from-orange to-orange-hover" : "bg-gold"} text-white font-poppins font-bold text-xs px-4 py-1 rounded-full whitespace-nowrap`}>
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-nunito font-black text-navy text-xl mb-1">{plan.name}</h3>
                  <p className="font-lato text-navy/50 text-sm mb-4">{plan.description}</p>
                  <div>
                    <span className="font-bebas text-4xl text-navy tracking-wide">{plan.price}</span>
                    <span className="font-lato text-navy/40 text-sm ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <Check size={11} className="text-green-500" />
                      </div>
                      <span className="font-lato text-navy/70 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <button className={`w-full font-poppins font-semibold text-sm py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95"
                      : "border border-navy/20 text-navy hover:bg-navy hover:text-white"
                  }`}>
                    {plan.cta} <ArrowRight size={15} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Annual banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-gold/20 via-orange/10 to-gold/20 border border-gold/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Zap size={22} className="text-gold shrink-0" />
              <div>
                <p className="font-nunito font-bold text-navy text-base">Go Annual — Save up to 25%</p>
                <p className="font-lato text-navy/50 text-sm">Lock in your rate. Never worry about price increases.</p>
              </div>
            </div>
            <Link href="/discover">
              <button className="shrink-0 bg-gradient-to-r from-gold to-yellow-400 text-navy font-poppins font-bold text-sm px-6 py-2.5 rounded-full hover:shadow-md hover:scale-[1.02] transition-all">
                View Annual Plans
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mini FAQ */}
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
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-navy-light border border-white/10 rounded-2xl p-5"
              >
                <p className="font-poppins font-semibold text-white text-sm mb-2">{item.q}</p>
                <p className="font-lato text-white/55 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
