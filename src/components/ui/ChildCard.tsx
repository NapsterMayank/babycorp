"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ChildCardProps {
  id: string;
  name: string;
  age: number;
  sports: string[];
  gradientFrom?: string;
  gradientTo?: string;
  onSelect?: () => void;
  selected?: boolean;
}

const SPORT_EMOJI: Record<string, string> = {
  Chess: "♟️",
  Swimming: "🏊",
  Cricket: "🏏",
  Badminton: "🏸",
  Gymnastics: "🤸",
};

export default function ChildCard({
  id,
  name,
  age,
  sports,
  gradientFrom = "from-orange",
  gradientTo = "to-gold",
  onSelect,
  selected = false,
}: ChildCardProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      onClick={onSelect}
      className={`rounded-2xl p-5 cursor-pointer transition-all duration-300 min-w-[210px] ${
        selected
          ? "bg-navy-light border-2 border-orange shadow-lg shadow-orange/20 ring-2 ring-orange/20"
          : "bg-navy-light border border-white/10 hover:border-orange/40"
      }`}
    >
      {/* Avatar */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white font-nunito font-black text-2xl shadow-lg`}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-nunito font-bold text-white text-base">{name}</p>
          <p className="text-white/40 font-lato text-xs">{age} years old</p>
          {selected && (
            <span className="inline-block bg-orange/20 text-orange text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full mt-1">
              Active
            </span>
          )}
        </div>
      </div>

      {/* Sport chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {sports.map((s) => (
          <span key={s} className="bg-white/5 border border-white/10 text-white/60 text-[10px] font-poppins font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            {SPORT_EMOJI[s] ?? ""} {s}
          </span>
        ))}
      </div>

      {/* Progress link */}
      <Link href={`/dashboard/progress/${id}`} onClick={(e) => e.stopPropagation()}>
        <button className="w-full flex items-center justify-center gap-1.5 text-xs font-poppins font-semibold text-orange/70 hover:text-orange transition-colors py-1">
          View Progress <ChevronRight size={13} />
        </button>
      </Link>
    </motion.div>
  );
}
