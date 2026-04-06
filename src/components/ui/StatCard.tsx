"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
  dark?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconBg = "bg-orange/10",
  iconColor = "text-orange",
  trend,
  trendUp,
  dark = false,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className={`rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 ${
        dark
          ? "bg-navy-light border border-white/10"
          : "bg-white border border-cream-dark shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className={`text-xs font-poppins font-semibold uppercase tracking-wider ${dark ? "text-white/40" : "text-navy/40"}`}>
          {label}
        </span>
        {Icon && (
          <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}>
            <Icon size={16} className={iconColor} />
          </div>
        )}
      </div>

      <div className={`font-bebas text-4xl tracking-wide leading-none ${dark ? "text-white" : "text-navy"}`}>
        {value}
      </div>

      {trend && (
        <div className={`flex items-center gap-1.5 text-xs font-poppins font-semibold ${trendUp ? "text-green-400" : "text-red-400"}`}>
          {trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {trend}
        </div>
      )}
    </motion.div>
  );
}
