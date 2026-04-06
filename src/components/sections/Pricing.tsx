"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Trial",
    price: "₹0 – ₹500",
    period: "one-time",
    description: "Try before you commit",
    features: [
      "Single trial session",
      "Coach introduction",
      "Academy facility tour",
      "Free or paid options",
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
    description: "Best for steady progress",
    features: [
      "All trial benefits",
      "Monthly skill assessment",
      "PDF progress report",
      "WhatsApp reminders",
      "1 makeup session/month",
    ],
    cta: "Enroll Monthly",
    href: "/discover",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Quarterly",
    price: "₹4,000 – ₹9,000",
    period: "per quarter",
    description: "Save up to 15%",
    features: [
      "All monthly benefits",
      "3-month commitment",
      "Priority batch allocation",
      "Quarterly milestone report",
      "Discount locked in",
    ],
    cta: "Enroll Quarterly",
    href: "/discover",
    highlighted: false,
    badge: "Save 15%",
  },
];

export default function Pricing() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Pricing
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-navy leading-tight">
            Simple, transparent pricing
          </h2>
          <p className="font-lato text-navy/50 text-lg mt-4 max-w-lg leading-relaxed">
            Pricing is set by each academy. Platform fee already included. No hidden charges.
          </p>
        </motion.div>

        {/* Pricing cards */}
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
                  ? "border-orange shadow-xl shadow-orange/10 scale-105"
                  : "border-cream-dark shadow-sm hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.highlighted ? "bg-gradient-to-r from-orange to-orange-hover" : "bg-gold"} text-white font-poppins font-bold text-xs px-4 py-1 rounded-full`}>
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
                <button className={`w-full font-poppins font-semibold text-sm py-3.5 rounded-full transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95"
                    : "border border-navy/20 text-navy hover:bg-navy hover:text-white"
                }`}>
                  {plan.cta}
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-gold/20 via-orange/10 to-gold/20 border border-gold/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Zap size={22} className="text-gold shrink-0" />
            <div>
              <p className="font-nunito font-bold text-navy text-base">Go Annual — Save up to 25%</p>
              <p className="font-lato text-navy/50 text-sm">Lock in your rate. Renews automatically every year.</p>
            </div>
          </div>
          <Link href="/pricing">
            <button className="shrink-0 bg-gradient-to-r from-gold to-yellow-400 text-navy font-poppins font-bold text-sm px-6 py-2.5 rounded-full hover:shadow-md hover:scale-[1.02] transition-all">
              View Annual Plans
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
