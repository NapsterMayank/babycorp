"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";

const FLOATING_EMOJIS = [
  { emoji: "♟️", style: { top: "12%", left: "8%" }, delay: 0, duration: 7 },
  { emoji: "🏊", style: { top: "20%", right: "6%" }, delay: 1.5, duration: 9 },
  { emoji: "🏏", style: { bottom: "30%", left: "5%" }, delay: 0.8, duration: 8 },
  { emoji: "🏸", style: { top: "60%", right: "10%" }, delay: 2, duration: 6 },
  { emoji: "🤸", style: { bottom: "20%", right: "20%" }, delay: 1, duration: 10 },
  { emoji: "🏆", style: { top: "45%", left: "3%" }, delay: 2.5, duration: 7 },
];

const TRUST_STATS = [
  { value: "10,000+", label: "Champion Kids" },
  { value: "500+", label: "Verified Coaches" },
  { value: "3 Cities", label: "Delhi · Mumbai · Bengaluru" },
];

const SKILL_BARS = [
  { label: "Ball Control", pct: 78, color: "bg-orange" },
  { label: "Batting Stance", pct: 65, color: "bg-aqua" },
  { label: "Stamina", pct: 82, color: "bg-gold" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-navy flex items-center overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-orange/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aqua/3 to-transparent pointer-events-none" />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      {/* Floating sport emojis */}
      {FLOATING_EMOJIS.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-[0.06] select-none pointer-events-none"
          style={item.style}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              <span className="font-poppins text-orange text-sm font-semibold">India&apos;s #1 Early Sports Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-nunito font-black text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6"
            >
              Build India&apos;s
              <br />
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                Next Champion
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-lato text-lg text-white/60 mb-8 max-w-xl leading-relaxed"
            >
              The only platform that tracks your child&apos;s real sports progress — not just attendance.
              Discover verified academies. Enroll in minutes. Watch them grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link href="/discover">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold px-7 py-4 rounded-full hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange/30 transition-all duration-300 text-base">
                  <MapPin size={18} />
                  Find Academies Near You
                  <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="#how-it-works">
                <button className="flex items-center justify-center gap-2 border border-white/20 text-white font-poppins font-semibold px-7 py-4 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-base">
                  See How It Works
                </button>
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {TRUST_STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-bebas text-2xl text-orange tracking-wide">{stat.value}</span>
                  <span className="font-lato text-white/40 text-sm leading-tight">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Progress Card Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/20 to-aqua/10 rounded-3xl blur-2xl scale-105 pointer-events-none" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-sm bg-navy-light border border-white/10 rounded-3xl p-6 shadow-2xl"
              style={{ transform: "rotate(-2deg)" }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🧒
                </div>
                <div>
                  <p className="font-nunito font-bold text-white text-base">Aryan Sharma</p>
                  <p className="font-lato text-white/50 text-xs">8 yrs · Cricket 🏏</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-aqua/20 border border-aqua/30 text-aqua font-poppins text-xs px-2.5 py-1 rounded-full font-semibold">Active</span>
                </div>
              </div>

              {/* Skill bars */}
              <p className="font-poppins font-semibold text-white/60 text-xs uppercase tracking-wider mb-3">Skill Progress</p>
              <div className="space-y-3 mb-5">
                {SKILL_BARS.map((bar, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-lato text-white/70 text-xs">{bar.label}</span>
                      <span className="font-bebas text-orange text-base tracking-wide">{bar.pct}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${bar.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${bar.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.8 + i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Badge notification */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
                className="bg-gradient-to-r from-gold/20 to-orange/20 border border-gold/40 rounded-2xl p-3 flex items-center gap-3"
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-poppins font-semibold text-gold text-sm">New Badge Earned!</p>
                  <p className="font-lato text-white/50 text-xs">First Boundary · Mar 2026</p>
                </div>
                <div className="ml-auto w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">+1</span>
                </div>
              </motion.div>

              {/* Overall score */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-lato text-white/50 text-xs">Overall Score</span>
                <span className="font-bebas text-3xl text-white tracking-wider">
                  75 <span className="text-white/30 text-lg">/ 100</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
      >
        <span className="font-lato text-xs">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
