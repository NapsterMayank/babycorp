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
  priceMax: number;
  coachName: string;
  nextTrial: string;
  verified?: boolean;
  gradient?: string;
  ageGroup?: string;
}

export default function AcademyCard({
  id,
  name,
  sport,
  sports = [],
  distance,
  rating,
  reviewCount,
  priceMin,
  priceMax,
  coachName,
  nextTrial,
  verified = true,
  gradient = "from-navy-light to-navy",
  ageGroup,
}: AcademyCardProps) {
  const allSports = sports.length > 0 ? sports : [sport];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden group"
    >
      {/* Photo placeholder */}
      <div className={`h-44 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-20">{allSports[0] === "Football" ? "⚽" : allSports[0] === "Cricket" ? "🏏" : allSports[0] === "Swimming" ? "🏊" : allSports[0] === "Basketball" ? "🏀" : "🏆"}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {verified && (
          <div className="absolute top-3 right-3 bg-aqua/90 backdrop-blur-sm text-white text-xs font-poppins font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle size={11} />
            Verified
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
          {allSports.slice(0, 3).map((s) => (
            <span key={s} className="bg-navy/70 backdrop-blur-sm text-white/90 text-xs font-poppins px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-nunito font-bold text-navy text-base leading-tight">{name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="text-gold fill-gold" />
            <span className="text-sm font-poppins font-semibold text-navy">{rating}</span>
            <span className="text-xs text-navy/40">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-navy/60 font-lato mb-3">
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

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-navy/40 text-xs font-lato">Coach </span>
            <span className="text-navy font-poppins font-medium text-sm">{coachName}</span>
          </div>
          <div className="text-right">
            <span className="text-navy font-nunito font-bold text-base">₹{priceMin.toLocaleString()}</span>
            <span className="text-navy/40 text-xs font-lato">/mo</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-poppins text-orange mb-4">
          <Clock size={12} />
          Next trial: {nextTrial}
        </div>

        <Link href={`/academy/${id}`}>
          <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300">
            Book Trial
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
