"use client";

import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";

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
      className={`relative rounded-2xl p-4 flex flex-col items-center gap-2 text-center transition-all duration-300 ${
        earned
          ? "bg-gradient-to-br from-gold/20 to-orange/10 border border-gold/40 shadow-lg shadow-gold/10"
          : "bg-white/5 border border-white/10 opacity-50"
      }`}
    >
      {!earned && (
        <div className="absolute top-2 right-2">
          <Lock size={12} className="text-white/30" />
        </div>
      )}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
          earned ? "bg-gradient-to-br from-gold to-orange shadow-lg" : "bg-white/10"
        }`}
      >
        {icon || "🏆"}
      </div>
      <div>
        <p className={`text-sm font-nunito font-bold ${earned ? "text-white" : "text-white/40"}`}>{name}</p>
        {description && (
          <p className="text-xs font-lato text-white/50 mt-0.5">{description}</p>
        )}
        {childName && earned && (
          <p className="text-xs font-poppins text-gold/80 mt-1">{childName}</p>
        )}
        {date && earned && (
          <p className="text-[10px] font-lato text-white/40 mt-0.5">{date}</p>
        )}
      </div>
      {earned && (
        <div className="flex items-center gap-0.5">
          {[...Array(3)].map((_, i) => (
            <Star key={i} size={10} className="text-gold fill-gold" />
          ))}
        </div>
      )}
    </motion.div>
  );
}
