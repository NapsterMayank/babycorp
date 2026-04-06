"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, TrendingUp, Lock } from "lucide-react";
import Link from "next/link";
import SkillBar from "@/components/ui/SkillBar";
import Badge from "@/components/ui/Badge";

const CHILD = {
  name: "Aryan",
  age: 8,
  sports: ["Football", "Cricket"],
  initial: "A",
};

const SPORT_DATA: Record<string, {
  skills: { name: string; score: number; delta: number }[];
  benchmarkMin: number;
  benchmarkMax: number;
  childPos: number;
}> = {
  Football: {
    skills: [
      { name: "Ball Control", score: 72, delta: 8 },
      { name: "Dribbling", score: 65, delta: 5 },
      { name: "Passing", score: 78, delta: 10 },
      { name: "Shooting", score: 58, delta: 3 },
      { name: "Stamina", score: 80, delta: 12 },
      { name: "Team Play", score: 85, delta: 7 },
    ],
    benchmarkMin: 55,
    benchmarkMax: 80,
    childPos: 72,
  },
  Cricket: {
    skills: [
      { name: "Batting Stance", score: 45, delta: -2 },
      { name: "Bowling Grip", score: 52, delta: 4 },
      { name: "Fielding", score: 68, delta: 6 },
      { name: "Running Between Wickets", score: 60, delta: 3 },
      { name: "Cricket IQ", score: 55, delta: 8 },
    ],
    benchmarkMin: 45,
    benchmarkMax: 70,
    childPos: 55,
  },
};

const BADGES = [
  { name: "First Goal!", icon: "⚽", description: "Scored first goal", earned: true, date: "Apr 6, 2026" },
  { name: "Hat Trick Hero", icon: "🎩", description: "3 goals in one session", earned: false },
  { name: "10-Day Streak", icon: "🔥", description: "10 sessions in a row", earned: true, date: "Mar 28, 2026" },
  { name: "30-Day Streak", icon: "💎", description: "30 sessions in a row", earned: false },
  { name: "Level Up", icon: "⭐", description: "Moved to next batch level", earned: true, date: "Mar 20, 2026" },
  { name: "Team Captain", icon: "👑", description: "Named session captain", earned: false },
  { name: "Sharp Shooter", icon: "🎯", description: "Shooting score > 80", earned: false },
  { name: "Speedster", icon: "⚡", description: "Stamina score > 85", earned: true, date: "Apr 1, 2026" },
];

const COACH_NOTES = [
  {
    id: 1,
    coach: "Rahul Mehra",
    initial: "R",
    date: "Apr 5, 2026",
    note: "Aryan showed great improvement in passing this session. His left foot is getting stronger. Focus on shooting accuracy next week.",
  },
  {
    id: 2,
    coach: "Rahul Mehra",
    initial: "R",
    date: "Mar 29, 2026",
    note: "Excellent stamina and team play. Aryan was the best performer in the small-sided game. Keep up the great work!",
  },
  {
    id: 3,
    coach: "Rahul Mehra",
    initial: "R",
    date: "Mar 22, 2026",
    note: "Needs to work on ball control under pressure. Dribbling technique improving steadily. Recommend extra practice at home.",
  },
];

export default function ProgressPage() {
  const [activeSport, setActiveSport] = useState("Football");

  const sportData = SPORT_DATA[activeSport];

  return (
    <div className="min-h-screen bg-cream pt-20 pb-10">
      {/* Header */}
      <div className="bg-navy py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard">
            <button className="flex items-center gap-1.5 text-white/50 font-poppins text-sm mb-5 hover:text-white transition-colors">
              <ChevronLeft size={16} /> Back to Dashboard
            </button>
          </Link>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center text-white font-nunito font-black text-2xl shadow-xl shadow-orange/30"
            >
              {CHILD.initial}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="font-nunito font-black text-2xl text-white">{CHILD.name}'s Progress</h1>
              <p className="text-white/50 font-lato text-sm">{CHILD.age} years old</p>
              <div className="flex gap-2 mt-1.5">
                {CHILD.sports.map((s) => (
                  <span key={s} className="bg-orange/20 text-orange text-xs font-poppins px-2.5 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Sport selector */}
        <div className="flex gap-2">
          {CHILD.sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-poppins font-semibold text-sm transition-all ${
                activeSport === sport
                  ? "bg-gradient-to-r from-orange to-orange-hover text-white shadow-lg shadow-orange/30"
                  : "bg-white border border-cream-dark text-navy/60 hover:border-orange/30"
              }`}
            >
              {sport === "Football" ? "⚽" : "🏏"} {sport}
            </button>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          key={activeSport}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-orange" />
            <h2 className="font-nunito font-bold text-white text-lg">Skill Assessment</h2>
          </div>
          <div className="space-y-5">
            {sportData.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <SkillBar skill={skill.name} score={skill.score} delta={skill.delta} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benchmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm"
        >
          <h2 className="font-nunito font-bold text-navy text-lg mb-4">vs. Age Group Benchmark</h2>
          <p className="text-navy/50 font-lato text-xs mb-4">
            How {CHILD.name} compares to other {CHILD.age}-year-olds playing {activeSport}
          </p>

          <div className="relative">
            <div className="h-6 bg-cream-dark rounded-full overflow-hidden relative">
              {/* Benchmark range */}
              <div
                className="absolute h-full bg-aqua/30 rounded-full"
                style={{
                  left: `${sportData.benchmarkMin}%`,
                  width: `${sportData.benchmarkMax - sportData.benchmarkMin}%`,
                }}
              />
              {/* Child position */}
              <motion.div
                initial={{ left: "0%" }}
                whileInView={{ left: `${sportData.childPos}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-orange rounded-full border-2 border-white shadow-lg shadow-orange/40"
                style={{ left: `${sportData.childPos}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-lato text-navy/40 mt-2">
              <span>0</span>
              <span className="text-aqua font-poppins font-medium">Age group range: {sportData.benchmarkMin}–{sportData.benchmarkMax}</span>
              <span>100</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-3 h-3 bg-orange rounded-full" />
              <span className="text-xs font-poppins text-navy/60">
                {CHILD.name}'s overall score: <span className="text-orange font-bold">{sportData.childPos}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Milestones & Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGES.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`relative rounded-2xl p-4 flex flex-col items-center gap-2 text-center border ${
                  badge.earned
                    ? "bg-gradient-to-br from-gold/20 to-orange/10 border-gold/40 shadow-lg shadow-gold/10"
                    : "bg-white border-cream-dark opacity-60"
                }`}
              >
                {!badge.earned && (
                  <div className="absolute top-2 right-2">
                    <Lock size={10} className="text-navy/30" />
                  </div>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${badge.earned ? "bg-gradient-to-br from-gold to-orange shadow-lg" : "bg-cream"}`}>
                  {badge.icon}
                </div>
                <div>
                  <p className={`text-xs font-nunito font-bold ${badge.earned ? "text-navy" : "text-navy/40"}`}>{badge.name}</p>
                  {badge.date && badge.earned && (
                    <p className="text-[10px] font-lato text-navy/40 mt-0.5">{badge.date}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coach Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Coach Notes</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-cream-dark" />
            <div className="space-y-4 pl-12">
              {COACH_NOTES.map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-9 w-8 h-8 bg-gradient-to-br from-orange to-gold rounded-xl flex items-center justify-center text-white font-nunito font-black text-xs shadow-md">
                    {note.initial}
                  </div>
                  <div className="bg-white border border-cream-dark rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-poppins font-semibold text-navy text-sm">{note.coach}</p>
                      <p className="text-navy/40 font-lato text-xs">{note.date}</p>
                    </div>
                    <p className="text-navy/70 font-lato text-sm leading-relaxed">{note.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Download button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center pt-4"
        >
          <button className="flex items-center gap-2 border-2 border-orange text-orange font-poppins font-semibold text-sm px-8 py-3 rounded-full hover:bg-orange/5 hover:scale-105 active:scale-95 transition-all duration-300">
            <Download size={16} />
            Download Progress Report
          </button>
        </motion.div>
      </div>
    </div>
  );
}
