"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Trophy, ChevronRight, Search, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURED_SCHOOLS = [
  {
    id: "dps-rk",
    name: "Delhi Public School, R.K. Puram",
    location: "R.K. Puram, New Delhi",
    grades: "KG – XII",
    students: 4200,
    rating: 4.9,
    reviews: 312,
    sports: ["Chess", "Swimming", "Cricket", "Badminton", "Gymnastics"],
    partnerSince: "2024",
    logo: "🏫",
    color: "from-orange to-gold",
    perks: [
      "Dedicated BabyCorp sports periods every week",
      "Subsidised enrollment — 20% off for all DPS students",
      "In-school assessment & progress reports",
      "Priority batch allocation — no waitlist",
      "BabyCorp coach available on campus 3 days/week",
      "Annual inter-school BabyCorp tournament hosted here",
    ],
    badge: "Platinum Partner",
    badgeColor: "bg-gold text-navy",
  },
  {
    id: "ryan-dwarka",
    name: "Ryan International School, Dwarka",
    location: "Dwarka Sector 11, New Delhi",
    grades: "Nursery – XII",
    students: 3800,
    rating: 4.8,
    reviews: 241,
    sports: ["Chess", "Swimming", "Badminton", "Gymnastics"],
    partnerSince: "2024",
    logo: "🎓",
    color: "from-aqua to-navy",
    perks: [
      "BabyCorp chess lab set up inside school premises",
      "15% discount for Ryan students on all plans",
      "Monthly progress reports shared with school teachers",
      "Dedicated swim slots in school pool every Saturday",
      "Participation in BabyCorp city-wide tournaments",
    ],
    badge: "Gold Partner",
    badgeColor: "bg-orange/90 text-white",
  },
];

const PARTNER_SCHOOLS = [
  {
    id: "mount-abu",
    name: "Mount Abu Public School",
    location: "Rohini, New Delhi",
    grades: "KG – X",
    students: 1800,
    sports: ["Chess", "Cricket"],
    rating: 4.6,
    reviews: 78,
    logo: "🏔️",
    partnerSince: "2025",
  },
  {
    id: "bal-bharati",
    name: "Bal Bharati Public School",
    location: "Pitampura, New Delhi",
    grades: "Nursery – XII",
    students: 2600,
    sports: ["Swimming", "Gymnastics"],
    rating: 4.5,
    reviews: 54,
    logo: "📚",
    partnerSince: "2025",
  },
  {
    id: "sanskriti",
    name: "Sanskriti School",
    location: "Chanakyapuri, New Delhi",
    grades: "I – XII",
    students: 1400,
    sports: ["Chess", "Badminton"],
    rating: 4.7,
    reviews: 92,
    logo: "🌿",
    partnerSince: "2025",
  },
  {
    id: "amity-saket",
    name: "Amity International School, Saket",
    location: "Saket, New Delhi",
    grades: "Nursery – XII",
    students: 3100,
    sports: ["Chess", "Swimming", "Cricket"],
    rating: 4.8,
    reviews: 136,
    logo: "⭐",
    partnerSince: "2025",
  },
  {
    id: "gd-goenka",
    name: "G.D. Goenka Public School",
    location: "Vasant Kunj, New Delhi",
    grades: "KG – XII",
    students: 2200,
    sports: ["Badminton", "Cricket"],
    rating: 4.5,
    reviews: 61,
    logo: "🏆",
    partnerSince: "2025",
  },
  {
    id: "modern-barakhamba",
    name: "Modern School, Barakhamba Road",
    location: "Connaught Place, New Delhi",
    grades: "KG – XII",
    students: 2900,
    sports: ["Chess", "Swimming", "Gymnastics"],
    rating: 4.9,
    reviews: 183,
    logo: "🎖️",
    partnerSince: "2025",
  },
];

const SPORT_ICONS: Record<string, string> = {
  Chess: "♟️",
  Swimming: "🏊",
  Cricket: "🏏",
  Badminton: "🏸",
  Gymnastics: "🤸",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SchoolsPage() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const filteredPartners = PARTNER_SCHOOLS.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.location.toLowerCase().includes(search.toLowerCase());
    const matchesSport = selectedSport
      ? school.sports.includes(selectedSport)
      : true;
    return matchesSearch && matchesSport;
  });

  return (
    <main className="pt-20 bg-cream min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-aqua/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block bg-gold/15 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-5">
              🏫 School Partnerships
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-5xl lg:text-6xl text-white mb-5">
              BabyCorp in{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                Your School
              </span>
            </h1>
            <p className="text-white/60 font-lato text-lg max-w-2xl mx-auto mb-8">
              We partner with Delhi's top schools to bring world-class sports
              coaching right onto campus. Find your school below — students get
              exclusive discounts and in-school access.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-poppins">
              {[
                { label: "Partner Schools", value: `${FEATURED_SCHOOLS.length + PARTNER_SCHOOLS.length}+` },
                { label: "Student Athletes", value: "12,000+" },
                { label: "Sports on Campus", value: "5" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-nunito font-black text-3xl text-orange">{stat.value}</p>
                  <p className="text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured / Promoted Schools ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5">
              <Sparkles size={14} className="text-gold" />
              <span className="font-poppins font-semibold text-gold text-sm">Featured Partners</span>
            </div>
            <p className="text-navy/40 font-lato text-sm hidden sm:block">
              These schools have a deeper integration with BabyCorp — exclusive perks for students
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {FEATURED_SCHOOLS.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-navy rounded-3xl overflow-hidden border-2 border-gold/30 shadow-xl shadow-navy/20"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${school.color}`} />

                <div className="p-7">
                  {/* Header row */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${school.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                      {school.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-nunito font-black text-white text-lg leading-tight">
                          {school.name}
                        </h3>
                        <span className={`text-[10px] font-poppins font-bold px-2 py-0.5 rounded-full shrink-0 ${school.badgeColor}`}>
                          {school.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/40 text-xs font-lato">
                        <MapPin size={11} />
                        <span>{school.location}</span>
                        <span className="mx-1">·</span>
                        <span>{school.grades}</span>
                        <span className="mx-1">·</span>
                        <span>{school.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating + Partner since */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={13}
                          className={j < Math.floor(school.rating) ? "text-gold fill-gold" : "text-white/20"}
                        />
                      ))}
                      <span className="text-white font-poppins font-semibold text-sm ml-1">{school.rating}</span>
                      <span className="text-white/30 text-xs ml-1">({school.reviews} reviews)</span>
                    </div>
                    <span className="text-white/20 text-xs font-lato">Partner since {school.partnerSince}</span>
                  </div>

                  {/* Sports offered */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {school.sports.map((sport) => (
                      <span
                        key={sport}
                        className="flex items-center gap-1 bg-white/8 text-white/70 border border-white/10 rounded-full px-3 py-1 text-xs font-poppins"
                      >
                        <span>{SPORT_ICONS[sport]}</span>
                        {sport}
                      </span>
                    ))}
                  </div>

                  {/* Perks */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                    <p className="font-poppins font-semibold text-gold text-xs uppercase tracking-wider mb-3">
                      Exclusive Perks for Students
                    </p>
                    <ul className="space-y-2">
                      {school.perks.map((perk, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-white/70 font-lato text-sm">
                          <CheckCircle size={14} className="text-gold shrink-0 mt-0.5" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    Enroll as {school.name.split(",")[0]} Student
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Partner Schools ── */}
      <section className="py-12 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-nunito font-black text-2xl md:text-3xl text-navy mb-1">
              All Partner Schools
            </h2>
            <p className="text-navy/40 font-lato text-sm">
              BabyCorp-verified schools — only listed schools have an official partnership with us.
            </p>
          </motion.div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by school name or location..."
                className="w-full pl-10 pr-4 py-3 bg-cream border border-cream-dark rounded-xl font-lato text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange/50 transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedSport(null)}
                className={`px-4 py-2 rounded-xl text-xs font-poppins font-semibold transition-all ${
                  selectedSport === null
                    ? "bg-navy text-white"
                    : "bg-cream-dark text-navy/60 hover:bg-cream"
                }`}
              >
                All Sports
              </button>
              {Object.entries(SPORT_ICONS).map(([sport, icon]) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(selectedSport === sport ? null : sport)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-poppins font-semibold transition-all ${
                    selectedSport === sport
                      ? "bg-orange text-white"
                      : "bg-cream-dark text-navy/60 hover:bg-cream"
                  }`}
                >
                  <span>{icon}</span>
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* School grid */}
          {filteredPartners.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🏫</p>
              <p className="font-poppins font-semibold text-navy/40">No schools found</p>
              <p className="text-navy/30 font-lato text-sm mt-1">Try a different search or sport filter</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPartners.map((school, i) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-cream-dark rounded-2xl p-5 hover:border-orange/30 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-xl shrink-0">
                      {school.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="font-poppins font-semibold text-navy text-sm leading-tight truncate">
                          {school.name}
                        </h3>
                        <CheckCircle size={13} className="text-aqua shrink-0" />
                      </div>
                      <div className="flex items-center gap-1 text-navy/40 text-xs font-lato">
                        <MapPin size={10} />
                        <span className="truncate">{school.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-gold fill-gold" />
                      <span className="font-poppins font-semibold text-navy text-xs">{school.rating}</span>
                      <span className="text-navy/30 text-xs">({school.reviews})</span>
                    </div>
                    <div className="flex gap-2 text-navy/40 text-xs font-lato">
                      <span>{school.grades}</span>
                      <span>·</span>
                      <span>{school.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {school.sports.map((sport) => (
                      <span
                        key={sport}
                        className="flex items-center gap-1 bg-cream text-navy/60 rounded-full px-2.5 py-0.5 text-[11px] font-poppins"
                      >
                        <span className="text-xs">{SPORT_ICONS[sport]}</span>
                        {sport}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-navy/30 font-lato text-xs">Partner since {school.partnerSince}</span>
                    <Link
                      href="/auth/register"
                      className="flex items-center gap-1 text-orange font-poppins font-semibold text-xs hover:gap-2 transition-all group-hover:text-orange-hover"
                    >
                      Enroll <ChevronRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Is your school not listed? ── */}
      <section className="py-16 bg-navy text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Trophy size={40} className="text-gold mx-auto mb-4" />
            <h2 className="font-nunito font-black text-3xl text-white mb-3">
              Want BabyCorp in Your School?
            </h2>
            <p className="text-white/50 font-lato mb-8">
              We are actively onboarding Delhi schools for 2025. If your school
              wants to offer world-class sports coaching to students, reach out
              to our partnerships team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Partner With Us
              </Link>
              <Link
                href="/discover"
                className="border border-white/20 text-white font-poppins font-semibold px-8 py-3.5 rounded-full hover:bg-white/5 transition-all duration-300"
              >
                Browse Academies Instead
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
