"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, CreditCard, Eye, Check, AlertTriangle } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: ShieldCheck,
    color: "text-aqua",
    bg: "bg-aqua/10",
    border: "border-aqua/20",
    title: "Coach Verification",
    headline: "48-hour background check on every coach",
    bullets: [
      "Government-issued ID verification",
      "Sports certification validation (BCCI, SAI, etc.)",
      "Police clearance background check",
      "In-person interview with BabyCorp team",
      "Annual re-verification required",
    ],
  },
  {
    icon: Lock,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
    title: "Child Data Privacy",
    headline: "Your child's data stays private",
    bullets: [
      "DPDP Act 2023 compliant",
      "Medical notes visible only to assigned coach",
      "No data sold to third parties — ever",
      "No targeted advertising to children",
      "Data deleted on account closure within 30 days",
    ],
  },
  {
    icon: CreditCard,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Secure Payments",
    headline: "Bank-grade payment security",
    bullets: [
      "Razorpay PCI-DSS Level 1 certified",
      "We never store card or UPI credentials",
      "Every transaction is end-to-end encrypted",
      "Instant refund processing (5–7 working days)",
      "Dispute resolution within 48 hours",
    ],
  },
  {
    icon: Eye,
    color: "text-orange",
    bg: "bg-orange/10",
    border: "border-orange/20",
    title: "Community Standards",
    headline: "Zero tolerance for misconduct",
    bullets: [
      "Strict code of conduct for all coaches",
      "Instant suspension on verified complaints",
      "Parent feedback reviewed within 24 hours",
      "Anonymous reporting available",
      "BabyCorp safety officer in every city",
    ],
  },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-navy pt-28 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-aqua/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-aqua/10 border border-aqua/20 text-aqua font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Child Safety
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-6xl text-white mb-4 leading-tight">
              Your child&apos;s safety is{" "}
              <span className="bg-gradient-to-r from-aqua to-gold bg-clip-text text-transparent">
                not a feature.
              </span>
            </h1>
            <p className="font-lato text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
              It is the foundation everything we do is built on. Here is exactly what we do to keep every child safe.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pillars */}
      <div className="bg-cream py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white border ${pillar.border} rounded-3xl p-8 shadow-sm`}
              >
                <div className={`w-12 h-12 ${pillar.bg} ${pillar.border} border rounded-2xl flex items-center justify-center mb-5`}>
                  <pillar.icon size={22} className={pillar.color} />
                </div>

                <h2 className="font-nunito font-black text-navy text-xl mb-1">{pillar.title}</h2>
                <p className={`font-poppins font-semibold ${pillar.color} text-sm mb-4`}>{pillar.headline}</p>

                <ul className="space-y-2.5">
                  {pillar.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <Check size={11} className="text-green-500" />
                      </div>
                      <span className="font-lato text-navy/70 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Report a concern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-amber-50 border border-amber-200 rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-5"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-nunito font-bold text-navy text-xl mb-2">Report a Safety Concern</h3>
              <p className="font-lato text-navy/60 text-base leading-relaxed mb-4">
                If you ever feel unsafe, uncomfortable, or witness inappropriate behavior — report it immediately. Anonymous reporting is available. All reports are reviewed within 24 hours.
              </p>
              <Link href="/contact">
                <button className="bg-amber-500 text-white font-poppins font-bold text-sm px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors">
                  Report a Concern
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
