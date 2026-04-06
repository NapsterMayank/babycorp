"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  skill: string;
  score: number;
  delta?: number;
  variant?: "dark" | "light";
}

export default function SkillBar({ skill, score, delta, variant = "dark" }: SkillBarProps) {
  const barColor =
    score >= 70
      ? "from-green-500 to-emerald-400"
      : score >= 40
      ? "from-orange to-orange-hover"
      : "from-red-500 to-rose-400";

  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className={`text-sm font-poppins font-medium flex-1 ${isDark ? "text-white/75" : "text-navy/75"}`}>
          {skill}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {delta !== undefined && (
            <span
              className={`text-xs font-poppins font-bold px-2 py-0.5 rounded-full ${
                delta >= 0
                  ? "bg-green-500/15 text-green-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {delta >= 0 ? `+${delta}` : delta}
              {delta >= 0 ? " ↑" : " ↓"}
            </span>
          )}
          <span className={`font-bebas text-xl tracking-wide ${isDark ? "text-white" : "text-navy"}`}>
            {score}
            <span className={`text-sm ${isDark ? "text-white/30" : "text-navy/30"}`}>/100</span>
          </span>
        </div>
      </div>

      <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-cream-dark"}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
        />
      </div>
    </div>
  );
}
