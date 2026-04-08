"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import SkillBar from "@/components/ui/SkillBar";
import Badge from "@/components/ui/Badge";

const CHILD = {
  name: "Aryan",
  age: 8,
  sports: ["Cricket", "Chess"],
  overallScore: 72,
  initial: "A",
};

const SPORT_DATA: Record<string, {
  skills: { name: string; score: number; delta: number }[];
  benchmarkMin: number;
  benchmarkMax: number;
  childPos: number;
  coachNotes: string[];
}> = {
  Cricket: {
    skills: [
      { name: "Batting Stance", score: 68, delta: 8 },
      { name: "Bowling Grip", score: 52, delta: 4 },
      { name: "Fielding", score: 75, delta: 10 },
      { name: "Running Between Wickets", score: 60, delta: 3 },
      { name: "Cricket IQ", score: 65, delta: 8 },
    ],
    benchmarkMin: 50,
    benchmarkMax: 75,
    childPos: 64,
    coachNotes: [
      "Aryan has shown excellent improvement in fielding this month. His footwork is becoming much more natural.",
      "Batting stance needs more attention — we&apos;re working on keeping the front elbow up.",
    ],
  },
  Chess: {
    skills: [
      { name: "Opening Knowledge", score: 45, delta: 5 },
      { name: "Tactical Vision", score: 58, delta: 10 },
      { name: "Endgame Technique", score: 38, delta: 3 },
      { name: "Time Management", score: 55, delta: -2 },
      { name: "Focus & Patience", score: 72, delta: 7 },
    ],
    benchmarkMin: 40,
    benchmarkMax: 65,
    childPos: 54,
    coachNotes: [
      "Aryan is a natural chess player — quick pattern recognition. We&apos;re focusing on endgame technique now.",
      "Recommend practicing puzzles daily for 15 minutes to sharpen tactical vision.",
    ],
  },
};

const BADGES = [
  { name: "First Boundary!", icon: "🏏", description: "Hit first boundary in practice", earned: true, date: "Apr 6, 2026" },
  { name: "Hat Trick Hero", icon: "🎩", description: "3 wickets in one session", earned: false },
  { name: "10-Day Streak", icon: "🔥", description: "10 sessions in a row", earned: true, date: "Mar 28, 2026" },
  { name: "30-Day Streak", icon: "💎", description: "30 sessions in a row", earned: false },
  { name: "Level Up", icon: "⭐", description: "Moved to next batch level", earned: true, date: "Mar 20, 2026" },
  { name: "Team Captain", icon: "👑", description: "Named session captain", earned: false },
  { name: "Speedster", icon: "⚡", description: "Stamina score &gt; 85", earned: true, date: "Apr 1, 2026" },
  { name: "Chess Master", icon: "♟️", description: "Win 10 practice games", earned: false },
];

export default function ProgressPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) router.push("/auth/login");
  }, [isLoggedIn, router]);

  const [activeSport, setActiveSport] = useState(CHILD.sports[0]);
  const data = SPORT_DATA[activeSport];

  const SPORT_COLORS: Record<string, string> = {
    Cricket: "from-[#1a3a1a] to-[#15803d]",
    Chess: "from-[#3E2723] to-[#6D4C41]",
    Swimming: "from-[#006994] to-[#00C2CB]",
    Badminton: "from-[#166534] to-[#22c55e]",
    Gymnastics: "from-[#6B2FA0] to-[#8B5CF6]",
  };

  const SPORT_EMOJI: Record<string, string> = {
    Cricket: "🏏",
    Chess: "♟️",
    Swimming: "🏊",
    Badminton: "🏸",
    Gymnastics: "🤸",
  };

  if (!data) return null;

  return (
    <div className="min-h-screen bg-cream pb-12">
      {/* Header */}
      <div className="relative bg-navy pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 w-fit">
            <ChevronLeft size={18} />
            <span className="font-poppins text-sm">Dashboard</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center font-nunito font-black text-4xl text-white shadow-xl shadow-orange/30">
                {CHILD.initial}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-aqua rounded-full border-2 border-navy flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="font-nunito font-black text-3xl text-white">{user?.name ?? CHILD.name}</h1>
              <p className="font-lato text-white/50 text-sm">{CHILD.age} years old · {CHILD.sports.join(" & ")}</p>
            </div>

            {/* Overall score circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <circle
                    cx="36" cy="36" r="28"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="6"
                    strokeDasharray={`${(CHILD.overallScore / 100) * 175.9} 175.9`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bebas text-3xl text-white leading-none">{CHILD.overallScore}</span>
                  <span className="font-lato text-white/40 text-[9px]">Score</span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-white/10 border border-white/10 text-white font-poppins font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-white/15 transition-colors">
              <Download size={15} />
              PDF Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* Sport tabs */}
        <div className="flex gap-2 flex-wrap">
          {CHILD.sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-poppins font-semibold text-sm transition-all duration-200 ${
                activeSport === sport
                  ? `bg-gradient-to-r ${SPORT_COLORS[sport] ?? "from-orange to-orange-hover"} text-white shadow-md`
                  : "bg-white border border-cream-dark text-navy/60 hover:border-orange/30"
              }`}
            >
              <span>{SPORT_EMOJI[sport]}</span>
              {sport}
            </button>
          ))}
        </div>

        {/* Skills section */}
        <motion.div
          key={activeSport}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-cream-dark rounded-3xl p-6 shadow-sm"
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-6 flex items-center gap-2">
            {SPORT_EMOJI[activeSport]} {activeSport} — Skill Breakdown
          </h2>
          <div className="space-y-5">
            {data.skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill.name} score={skill.score} delta={skill.delta} variant="light" />
            ))}
          </div>

          {/* Benchmark bar */}
          <div className="mt-8 p-4 bg-cream rounded-2xl">
            <p className="font-poppins font-semibold text-navy/60 text-sm mb-3">Peer Benchmark</p>
            <div className="relative h-4 bg-cream-dark rounded-full overflow-hidden">
              {/* Benchmark range */}
              <div
                className="absolute top-0 h-full bg-blue-100 rounded-full"
                style={{ left: `${data.benchmarkMin}%`, width: `${data.benchmarkMax - data.benchmarkMin}%` }}
              />
              {/* Child position */}
              <motion.div
                className="absolute top-0 w-4 h-4 bg-orange rounded-full border-2 border-white shadow-md"
                initial={{ left: 0 }}
                animate={{ left: `calc(${data.childPos}% - 8px)` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-lato text-xs text-navy/40">0</span>
              <div className="text-center">
                <span className="font-lato text-xs text-blue-500">Avg range: {data.benchmarkMin}–{data.benchmarkMax}</span>
              </div>
              <span className="font-lato text-xs text-navy/40">100</span>
            </div>
            <p className="font-poppins font-semibold text-orange text-sm mt-2">
              {CHILD.name} is at <span className="font-bebas text-lg">{data.childPos}</span> — above average for age group
            </p>
          </div>
        </motion.div>

        {/* Coach notes */}
        <motion.div
          key={`notes-${activeSport}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-cream-dark rounded-3xl p-6 shadow-sm"
        >
          <h2 className="font-nunito font-bold text-navy text-lg mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-aqua" />
            Coach Notes
          </h2>
          <div className="space-y-3">
            {data.coachNotes.map((note, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-sm shrink-0">
                  C
                </div>
                <div className="flex-1 bg-cream rounded-2xl rounded-tl-none px-4 py-3">
                  <p className="font-lato text-navy/70 text-sm leading-relaxed">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-navy-light border border-white/10 rounded-3xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-nunito font-bold text-white text-lg">Achievements</h2>
            <span className="font-poppins font-semibold text-gold text-sm">
              {BADGES.filter((b) => b.earned).length}/{BADGES.length} earned
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGES.map((badge, i) => (
              <Badge
                key={i}
                name={badge.name}
                icon={badge.icon}
                description={badge.description}
                earned={badge.earned}
                date={badge.date}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
