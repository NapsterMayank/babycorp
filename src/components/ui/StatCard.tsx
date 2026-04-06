"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  dark?: boolean;
}

export default function StatCard({ label, value, icon: Icon, trend, trendUp, dark = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-5 flex flex-col gap-2 ${
        dark
          ? "bg-navy-light border border-white/10"
          : "bg-white border border-cream-dark shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className={`text-xs font-poppins font-medium uppercase tracking-wide ${dark ? "text-white/50" : "text-navy/50"}`}>
          {label}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${dark ? "bg-white/10" : "bg-cream"}`}>
            <Icon size={16} className="text-orange" />
          </div>
        )}
      </div>
      <div className={`text-3xl font-nunito font-black ${dark ? "text-white" : "text-navy"}`}>
        {value}
      </div>
      {trend && (
        <span className={`text-xs font-poppins font-medium ${trendUp ? "text-green-400" : "text-red-400"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </span>
      )}
    </motion.div>
  );
}
