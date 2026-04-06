"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface BadgeProps {
  name: string;
  description?: string;
  earned?: boolean;
  date?: string;
  icon?: string;
  childName?: string;
}

export default function Badge({ name, description, earned = true, date, icon, childName }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={earned ? { scale: 1.05 } : {}}
      className={`relative rounded-2xl p-5 flex flex-col items-center gap-3 text-center transition-all duration-300 ${
        earned
          ? "bg-gradient-to-br from-gold/20 to-orange/10 border border-gold/40 shadow-lg shadow-gold/10"
          : "bg-white/5 border border-white/10 opacity-40"
      }`}
    >
      {/* Lock overlay for unearned */}
      {!earned && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-navy/40 backdrop-blur-[2px]">
          <Lock size={20} className="text-white/30" />
        </div>
      )}

      {/* Badge icon */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
          earned
            ? "bg-gradient-to-br from-gold to-orange shadow-lg shadow-gold/30"
            : "bg-white/10"
        } ${earned ? "animate-shimmer bg-[length:200%_100%]" : ""}`}
      >
        {icon ?? "🏆"}
      </div>

      {/* Badge info */}
      <div className="space-y-0.5">
        <p className={`text-sm font-nunito font-bold ${earned ? "text-white" : "text-white/30"}`}>{name}</p>
        {description && (
          <p className="text-xs font-lato text-white/45 leading-snug">{description}</p>
        )}
        {childName && earned && (
          <p className="text-xs font-poppins text-gold/80 font-medium">{childName}</p>
        )}
        {date && earned && (
          <p className="text-[10px] font-lato text-white/35">{date}</p>
        )}
      </div>
    </motion.div>
  );
}
