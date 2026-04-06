"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, ChevronRight, Users, Trophy } from "lucide-react";
import Link from "next/link";

const FEATURED_SCHOOLS = [
  {
    id: "dps-rk",
    name: "Delhi Public School, R.K. Puram",
    location: "R.K. Puram, New Delhi",
    grades: "KG – XII",
    students: 4200,
    rating: 4.9,
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
    ],
  },
  {
    id: "ryan-int",
    name: "Ryan International School",
    location: "Sector 40, Noida",
    grades: "Nursery – XII",
    students: 3100,
    rating: 4.7,
    sports: ["Swimming", "Cricket", "Gymnastics"],
    partnerSince: "2024",
    logo: "🎓",
    color: "from-aqua to-blue-500",
    perks: [
      "Pool coaching on premises",
      "10% student discount on all plans",
      "Monthly reports emailed to parents",
      "Saturday morning batch reserved for Ryan students",
    ],
  },
  {
    id: "amity-saket",
    name: "Amity International, Saket",
    location: "Saket, New Delhi",
    grades: "KG – XII",
    students: 2800,
    rating: 4.8,
    sports: ["Chess", "Badminton", "Swimming"],
    partnerSince: "2025",
    logo: "🏛️",
    color: "from-purple-600 to-purple-400",
    perks: [
      "Chess tournament integrated into school calendar",
      "15% student discount",
      "Skill certificates issued by BabyCorp",
      "Parent engagement workshops quarterly",
    ],
  },
];

const ALL_SCHOOLS = [
  "Modern School, Barakhamba", "Sanskriti School", "Bal Bharati",
  "G.D. Goenka", "Mount Abu Public School", "DPS Vasant Kunj",
  "Heritage Xperiential", "Springdales School", "Mother's International",
  "Vasant Valley School", "Bluebells School", "Tagore International",
];

const PARTNER_BENEFITS = [
  { icon: "📊", title: "Progress Reports", desc: "Monthly skill reports emailed to parents and shared with school counselors." },
  { icon: "🎓", title: "Skill Certificates", desc: "BabyCorp-issued certificates for milestone achievements — recognized by schools." },
  { icon: "🏆", title: "Inter-School Tournaments", desc: "Annual BabyCorp tournaments for partner schools across all 5 sports." },
  { icon: "💰", title: "Student Discounts", desc: "10–20% discount on all enrollment plans for enrolled school students." },
];

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative bg-navy pt-28 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        {/* Decorative building silhouette */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-5 pointer-events-none select-none">
          <span className="text-[200px] leading-none">🏫</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              School Partnerships
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-6xl text-white leading-tight mb-4">
              Trusted by Delhi&apos;s{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                top schools
              </span>
            </h1>
            <p className="font-lato text-white/55 text-lg max-w-xl mx-auto leading-relaxed">
              BabyCorp brings certified sports coaching directly to school campuses — integrated into the school day, not competing with it.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Partner benefits */}
      <div className="bg-cream-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PARTNER_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-cream-dark rounded-2xl p-5 text-center"
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <p className="font-nunito font-bold text-navy text-base mb-1">{b.title}</p>
                <p className="font-lato text-navy/50 text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured schools */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-nunito font-black text-3xl md:text-4xl text-navy">Featured Partner Schools</h2>
          </motion.div>

          <div className="space-y-6">
            {FEATURED_SCHOOLS.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-cream-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Header bar */}
                <div className={`h-3 bg-gradient-to-r ${school.color}`} />

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Logo + info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-5xl">{school.logo}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-nunito font-black text-navy text-xl">{school.name}</h3>
                          <span className="bg-aqua/10 text-aqua font-poppins font-semibold text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle size={10} /> Partner
                          </span>
                        </div>
                        <p className="font-lato text-navy/50 text-sm flex items-center gap-3 flex-wrap">
                          <span>{school.location}</span>
                          <span>·</span>
                          <span>{school.grades}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Users size={11} />{school.students.toLocaleString()} students</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Star size={11} className="text-gold fill-gold" />{school.rating}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {school.sports.map((s) => (
                            <span key={s} className="bg-cream border border-cream-dark text-navy/60 font-poppins text-xs px-2.5 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Since badge */}
                    <div className="text-center shrink-0">
                      <div className="bg-gradient-to-br from-gold/20 to-orange/10 border border-gold/30 rounded-2xl px-5 py-3">
                        <Trophy size={20} className="text-gold mx-auto mb-1" />
                        <p className="font-poppins font-semibold text-navy/60 text-xs">Partner since</p>
                        <p className="font-bebas text-2xl text-navy">{school.partnerSince}</p>
                      </div>
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="mt-5 pt-5 border-t border-cream-dark grid sm:grid-cols-2 gap-2">
                    {school.perks.map((perk, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle size={11} className="text-green-500" />
                        </div>
                        <span className="font-lato text-navy/70">{perk}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/discover">
                    <button className="mt-4 flex items-center gap-2 text-orange font-poppins font-semibold text-sm hover:text-orange-hover transition-colors">
                      Find academies near this school <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All schools grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h2 className="font-nunito font-bold text-navy text-2xl mb-4">All Partner Schools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {ALL_SCHOOLS.map((school, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white border border-cream-dark rounded-xl p-3 flex items-center gap-2 hover:border-orange/30 hover:shadow-sm transition-all"
                >
                  <span>🏫</span>
                  <span className="font-lato text-navy/70 text-sm">{school}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
