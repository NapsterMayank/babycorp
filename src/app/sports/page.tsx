"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const SPORTS = [
  {
    id: "chess",
    name: "Chess",
    emoji: "♟️",
    age: "3+ years",
    color: "from-[#3E2723] via-[#5D4037] to-[#6D4C41]",
    tagColor: "bg-amber-900/20 text-amber-400 border-amber-900/30",
    description: "Chess builds extraordinary cognitive skills in young children — pattern recognition, strategic thinking, and deep concentration. Our curriculum follows the FIDE youth pathway.",
    curriculum: [
      "Introduction to pieces and board",
      "Basic moves and captures",
      "Opening principles and tactics",
      "Endgame fundamentals",
      "Tournament preparation",
    ],
    benefits: ["IQ development", "Concentration & focus", "Memory enhancement", "Problem-solving skills", "Patience & resilience"],
    priceRange: "₹1,500 – ₹2,500/mo",
  },
  {
    id: "swimming",
    name: "Swimming",
    emoji: "🏊",
    age: "18 months+",
    color: "from-[#006994] via-[#0891b2] to-[#00C2CB]",
    tagColor: "bg-cyan-900/20 text-cyan-400 border-cyan-900/30",
    description: "Swimming is the single most important survival skill you can give your child. Our infant aquatics program is gentle, fun, and backed by international curriculum standards.",
    curriculum: [
      "Water familiarization (parent-assisted)",
      "Breath control and submersion",
      "Freestyle stroke foundations",
      "Backstroke and breaststroke",
      "Competitive technique and racing",
    ],
    benefits: ["Drowning prevention", "Full-body strength", "Cardiovascular health", "Lung capacity", "Better sleep patterns"],
    priceRange: "₹2,500 – ₹4,500/mo",
  },
  {
    id: "cricket",
    name: "Cricket",
    emoji: "🏏",
    age: "4+ years",
    color: "from-[#1a3a1a] via-[#166534] to-[#15803d]",
    tagColor: "bg-green-900/20 text-green-400 border-green-900/30",
    description: "India's national game, taught right. Our BCCI-aligned curriculum takes children from basic batting grip to real match scenarios. Every child learns both batting and bowling.",
    curriculum: [
      "Grip, stance, and footwork",
      "Basic batting strokes",
      "Bowling run-up and action",
      "Fielding and catching",
      "Match awareness and tactics",
    ],
    benefits: ["Physical fitness", "Hand-eye coordination", "Teamwork & leadership", "Mental toughness", "National sport passion"],
    priceRange: "₹2,000 – ₹3,500/mo",
  },
  {
    id: "badminton",
    name: "Badminton",
    emoji: "🏸",
    age: "4+ years",
    color: "from-[#166534] via-[#15803d] to-[#22c55e]",
    tagColor: "bg-green-900/20 text-emerald-400 border-green-900/30",
    description: "Badminton develops speed, agility, and reflexes unlike any other sport. India has produced world champions — and the BabyCorp badminton curriculum is designed to find the next one.",
    curriculum: [
      "Grip and basic strokes",
      "Footwork and court movement",
      "Net play and smashes",
      "Doubles strategy",
      "Tournament match play",
    ],
    benefits: ["Speed and agility", "Reflexes & coordination", "Cardiovascular fitness", "Focus and determination", "Competitive instinct"],
    priceRange: "₹2,000 – ₹3,500/mo",
  },
  {
    id: "gymnastics",
    name: "Gymnastics",
    emoji: "🤸",
    age: "18 months+",
    color: "from-[#6B2FA0] via-[#7c3aed] to-[#8B5CF6]",
    tagColor: "bg-purple-900/20 text-purple-400 border-purple-900/30",
    description: "Gymnastics at an early age builds incredible body awareness, flexibility, and strength. It also forms the physical foundation for every other sport a child might play later.",
    curriculum: [
      "Body awareness and tumbling",
      "Balance beam basics",
      "Forward and backward rolls",
      "Cartwheel and handstand progression",
      "Routine performance",
    ],
    benefits: ["Flexibility & strength", "Body coordination", "Balance & posture", "Confidence building", "Foundation for all sports"],
    priceRange: "₹3,000 – ₹5,000/mo",
  },
];

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState(SPORTS[0].id);
  const sport = SPORTS.find((s) => s.id === activeSport) ?? SPORTS[0];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative bg-navy pt-28 pb-12 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Sports Programs
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-6xl text-white mb-4">
              5 sports.{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                One platform.
              </span>
            </h1>
            <p className="font-lato text-white/55 text-lg max-w-xl mx-auto">
              Every program is structured, coach-led, and age-appropriate. Choose the sport that excites your child.
            </p>
          </motion.div>

          {/* Sport pill tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {SPORTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSport(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-poppins font-semibold text-sm transition-all duration-200 ${
                  activeSport === s.id
                    ? `bg-gradient-to-r ${s.color} text-white shadow-md`
                    : "bg-white/10 text-white/60 hover:bg-white/15 border border-white/10"
                }`}
              >
                <span>{s.emoji}</span>
                {s.name}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Sport detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          key={activeSport}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sport banner */}
          <div className={`relative h-48 bg-gradient-to-br ${sport.color} rounded-3xl overflow-hidden mb-8`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[120px] opacity-15 select-none">{sport.emoji}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
              <div>
                <h2 className="font-nunito font-black text-4xl text-white">{sport.name}</h2>
                <p className="font-lato text-white/70 text-sm">Age {sport.age}</p>
              </div>
              <div className="text-right">
                <p className="font-lato text-white/60 text-xs">Starts from</p>
                <p className="font-bebas text-2xl text-white">{sport.priceRange}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Description + curriculum */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm">
                <p className="font-lato text-navy/70 text-base leading-relaxed">{sport.description}</p>
              </div>

              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-4">Curriculum Pathway</h3>
                <div className="space-y-3">
                  {sport.curriculum.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-7 h-7 bg-gradient-to-br ${sport.color} rounded-full flex items-center justify-center text-white font-bebas text-sm shrink-0`}>
                        {i + 1}
                      </div>
                      <span className="font-lato text-navy/70 text-base">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits + CTA */}
            <div className="space-y-5">
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-4">Benefits</h3>
                <div className="space-y-2.5">
                  {sport.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <Check size={11} className="text-green-500" />
                      </div>
                      <span className="font-lato text-navy/70 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-navy to-navy-light border border-white/10 rounded-2xl p-5">
                <p className="font-poppins font-semibold text-white text-base mb-1">Ready to start?</p>
                <p className="font-lato text-white/50 text-sm mb-4">Book a free trial session. No commitment required.</p>
                <Link href="/discover">
                  <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
                    Find {sport.name} Academies <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
