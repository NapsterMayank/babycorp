"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Play, Trophy } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UserPlus,
    emoji: "👨‍👩‍👧",
    title: "Sign Up & Add Child",
    body: "Create your family profile and add your child's details — age, interests, any special notes.",
    color: "from-orange to-orange-hover",
    shadow: "shadow-orange/30",
  },
  {
    number: "02",
    icon: Search,
    emoji: "🔍",
    title: "Discover & Book Trial",
    body: "Browse verified academies near you. Filter by sport, age group and timing. Book a free trial in 2 taps.",
    color: "from-aqua to-aqua/80",
    shadow: "shadow-aqua/30",
  },
  {
    number: "03",
    icon: Play,
    emoji: "🏃",
    title: "Enroll & Start Sessions",
    body: "Choose a monthly or quarterly plan. Attend sessions. Get WhatsApp reminders before every class.",
    color: "from-gold to-yellow-400",
    shadow: "shadow-gold/30",
  },
  {
    number: "04",
    icon: Trophy,
    emoji: "🏆",
    title: "Track Progress & Earn Badges",
    body: "Monthly skill assessments. PDF reports emailed automatically. Badges and milestones to celebrate growth.",
    color: "from-purple-500 to-purple-400",
    shadow: "shadow-purple-500/30",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="relative bg-navy py-24 overflow-hidden" id="how-it-works">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-white leading-tight">
            Your child&apos;s journey in{" "}
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
              4 steps
            </span>
          </h2>
        </motion.div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex lg:flex-col items-start lg:items-center gap-5 lg:gap-4 lg:text-center"
              >
                {/* Step circle */}
                <div className="relative shrink-0">
                  <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg ${step.shadow} text-2xl`}>
                    {step.emoji}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-navy border border-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bebas text-white/60 text-xs">{i + 1}</span>
                  </div>
                </div>

                {/* Vertical connector for mobile */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden absolute left-7 mt-14 w-px h-8 bg-white/10" />
                )}

                <div>
                  <h3 className="font-nunito font-bold text-white text-lg mb-1.5">{step.title}</h3>
                  <p className="font-lato text-white/50 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
