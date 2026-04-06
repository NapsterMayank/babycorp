"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  skill: string;
  score: number;
  delta?: number;
}

export default function SkillBar({ skill, score, delta }: SkillBarProps) {
  const color =
    score >= 70 ? "from-green-500 to-emerald-400" : score >= 40 ? "from-amber-500 to-yellow-400" : "from-red-500 to-rose-400";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-poppins font-medium text-white/80">{skill}</span>
        <div className="flex items-center gap-2">
          {delta !== undefined && (
            <span
              className={`text-xs font-poppins font-semibold px-2 py-0.5 rounded-full ${
                delta >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              }`}
            >
              {delta >= 0 ? `+${delta}` : delta} {delta >= 0 ? "↑" : "↓"}
            </span>
          )}
          <span className="text-sm font-nunito font-bold text-white">{score}</span>
        </div>
      </div>
      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}
