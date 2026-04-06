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
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 min-w-[200px] ${
        selected
          ? "bg-navy-light border-2 border-orange shadow-lg shadow-orange/20"
          : "bg-navy-light border border-white/10 hover:border-orange/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white font-nunito font-black text-xl shadow-lg`}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-nunito font-bold text-white text-base">{name}</p>
          <p className="text-white/50 font-lato text-xs">{age} years old</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {sports.map((s) => (
              <span key={s} className="bg-orange/20 text-orange text-[10px] font-poppins font-medium px-2 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link href={`/dashboard/progress/${id}`} onClick={(e) => e.stopPropagation()}>
        <button className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-poppins font-medium text-orange/80 hover:text-orange transition-colors">
          View Progress <ChevronRight size={12} />
        </button>
      </Link>
    </motion.div>
  );
}
