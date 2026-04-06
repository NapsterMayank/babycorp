"use client";

import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, Clock, User } from "lucide-react";
import Link from "next/link";

interface AcademyCardProps {
  id: string;
  name: string;
  sport: string;
  sports?: string[];
  distance: string;
  rating: number;
  reviewCount: number;
  priceMin: number;

  coachName: string;
  nextTrial: string;
  verified?: boolean;
  gradient?: string;
  ageGroup?: string;
}

const SPORT_EMOJI: Record<string, string> = {
  Chess: "♟️",
  Swimming: "🏊",
  Cricket: "🏏",
  Badminton: "🏸",
  Gymnastics: "🤸",
};

export default function AcademyCard({
  id,
  name,
  sport,
  sports = [],
  distance,
  rating,
  reviewCount,
  priceMin,
  coachName,
  nextTrial,
  verified = true,
  gradient = "from-navy-light to-navy",
  ageGroup,
}: AcademyCardProps) {
  const allSports = sports.length > 0 ? sports : [sport];
  const primarySport = allSports[0];
  const emoji = SPORT_EMOJI[primarySport] ?? "🏆";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg"
    >
      {/* Sport gradient header */}
      <div className={`h-44 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl opacity-15 select-none">{emoji}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Verified badge */}
        {verified && (
          <div className="absolute top-3 right-3 bg-aqua/90 backdrop-blur-sm text-white text-xs font-poppins font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle size={11} />
            Verified
          </div>
        )}

        {/* Sport tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {allSports.slice(0, 3).map((s) => (
            <span key={s} className="bg-navy/70 backdrop-blur-sm text-white/90 text-xs font-poppins px-2.5 py-1 rounded-full">
              {SPORT_EMOJI[s] ?? ""} {s}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* Name + rating */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-nunito font-bold text-navy text-base leading-tight">{name}</h3>
          <div className="flex items-center gap-1 shrink-0 bg-gold/10 rounded-full px-2 py-0.5">
            <Star size={12} className="text-gold fill-gold" />
            <span className="text-sm font-bebas text-navy tracking-wide">{rating}</span>
            <span className="text-xs text-navy/40 font-lato">({reviewCount})</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-navy/55 font-lato mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {distance}
          </span>
          {ageGroup && (
            <span className="flex items-center gap-1">
              <User size={11} />
              {ageGroup}
            </span>
          )}
        </div>

        {/* Coach + price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-navy/40 text-xs font-lato">Coach </span>
            <span className="text-navy font-poppins font-semibold text-sm">{coachName}</span>
          </div>
          <div className="text-right">
            <span className="font-bebas text-xl text-navy tracking-wide">₹{priceMin.toLocaleString()}</span>
            <span className="text-navy/40 text-xs font-lato">/mo</span>
          </div>
        </div>

        {/* Next trial */}
        <div className="flex items-center gap-1.5 text-xs font-poppins text-orange mb-4">
          <Clock size={12} />
          Next trial: <span className="font-semibold">{nextTrial}</span>
        </div>

        {/* CTA */}
        <Link href={`/academy/${id}`}>
          <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300">
            Book Free Trial
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
