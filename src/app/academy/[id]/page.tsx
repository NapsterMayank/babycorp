"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, MessageCircle, Navigation, Users, Clock, Calendar } from "lucide-react";
import Link from "next/link";

const ACADEMY = {
  id: "cricket-001",
  name: "Champions Cricket Club",
  verified: true,
  rating: 4.9,
  reviewCount: 203,
  sport: "Cricket",
  sports: ["Cricket"],
  address: "Block B, Sector 18, Noida, Uttar Pradesh – 201301",
  ageGroups: ["4–7 yrs", "8–10 yrs", "11–14 yrs"],
  coach: {
    name: "Vikas Yadav",
    experience: "10 years",
    certification: "BCCI Level 2",
    bio: "Former Delhi Ranji Trophy player with 10 years of youth coaching experience. Vikas has trained over 300 kids, 12 of whom represent state teams. His curriculum is designed around the BCCI youth framework.",
  },
  curriculum: [
    { month: "Month 1–2", title: "Foundation Skills", items: ["Grip and stance", "Basic batting strokes", "Soft hands", "Running between wickets"] },
    { month: "Month 3–4", title: "Technical Development", items: ["Defensive shots", "Attacking strokes", "Bowling run-up", "Catching and fielding"] },
    { month: "Month 5–6", title: "Match Awareness", items: ["Net practice", "Mini matches", "Reading the pitch", "Team communication"] },
  ],
  batches: [
    { id: "b1", schedule: "Sat & Sun, 7–8 AM", age: "4–7 yrs", gender: "All", capacity: 8, filled: 5, price: 2000, trialFee: 200, spotsLeft: 3 },
    { id: "b2", schedule: "Sat & Sun, 8–9 AM", age: "8–10 yrs", gender: "All", capacity: 12, filled: 9, price: 2500, trialFee: 200, spotsLeft: 3 },
    { id: "b3", schedule: "Mon, Wed, Fri, 5–6 PM", age: "11–14 yrs", gender: "Boys", capacity: 10, filled: 10, price: 3000, trialFee: 0, spotsLeft: 0 },
    { id: "b4", schedule: "Tue, Thu, 5–6 PM", age: "11–14 yrs", gender: "Girls", capacity: 10, filled: 4, price: 3000, trialFee: 200, spotsLeft: 6 },
  ],
  reviews: [
    { id: 1, name: "Priya Sharma", initial: "P", rating: 5, date: "Mar 2026", text: "Vikas sir is fantastic with kids. Aryan looks forward to every session. The curriculum is very structured and I love the monthly reports." },
    { id: 2, name: "Rohan Gupta", initial: "R", rating: 5, date: "Feb 2026", text: "Best cricket coaching in Noida. My son went from zero to playing inter-school matches in 4 months. Highly recommend!" },
    { id: 3, name: "Anjali Mehta", initial: "A", rating: 5, date: "Jan 2026", text: "The girls batch is wonderful. My daughter loves coming here. Very safe, great coaches, and WhatsApp updates are super helpful." },
  ],
  gradient: "from-[#1a3a1a] via-[#166534] to-[#15803d]",
};

type TabType = "overview" | "batches" | "reviews" | "location";

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={size} className={s <= rating ? "text-gold fill-gold" : "text-navy/20"} />
    ))}
  </div>
);

export default function AcademyDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "batches", label: "Batches & Pricing" },
    { id: "reviews", label: "Reviews" },
    { id: "location", label: "Location" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero banner — full width sport gradient */}
      <div className={`relative h-64 md:h-80 bg-gradient-to-br ${ACADEMY.gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[160px] opacity-10 select-none">🏏</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-navy/70 backdrop-blur-sm text-white font-poppins text-xs px-2.5 py-1 rounded-full">🏏 Cricket</span>
              {ACADEMY.verified && (
                <span className="bg-aqua/90 backdrop-blur-sm text-white font-poppins font-semibold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle size={11} /> Verified
                </span>
              )}
            </div>
            <h1 className="font-nunito font-black text-3xl md:text-4xl text-white leading-tight drop-shadow-lg">
              {ACADEMY.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-2xl px-3 py-2">
            <Star size={16} className="text-gold fill-gold" />
            <span className="font-bebas text-2xl text-white">{ACADEMY.rating}</span>
            <span className="text-white/60 font-lato text-xs">({ACADEMY.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-cream-dark rounded-2xl p-1 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl font-poppins font-semibold text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-navy shadow-sm"
                      : "text-navy/50 hover:text-navy"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                {/* Coach */}
                <div className="bg-white border border-cream-dark rounded-2xl p-6">
                  <h2 className="font-nunito font-bold text-navy text-lg mb-4">Your Coach</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center text-white font-nunito font-black text-xl">
                      {ACADEMY.coach.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-nunito font-bold text-navy text-base">{ACADEMY.coach.name}</p>
                      <p className="font-lato text-navy/50 text-sm">{ACADEMY.coach.certification} · {ACADEMY.coach.experience} experience</p>
                      <p className="font-lato text-navy/70 text-sm mt-2 leading-relaxed">{ACADEMY.coach.bio}</p>
                    </div>
                  </div>
                </div>

                {/* Curriculum */}
                <div className="bg-white border border-cream-dark rounded-2xl p-6">
                  <h2 className="font-nunito font-bold text-navy text-lg mb-4">Curriculum Roadmap</h2>
                  <div className="space-y-4">
                    {ACADEMY.curriculum.map((phase, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center text-white font-bebas text-sm shrink-0">
                            {i + 1}
                          </div>
                          {i < ACADEMY.curriculum.length - 1 && (
                            <div className="w-px flex-1 bg-cream-dark mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-poppins font-semibold text-navy text-sm">{phase.month} — {phase.title}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {phase.items.map((item, j) => (
                              <span key={j} className="bg-cream border border-cream-dark text-navy/60 font-lato text-xs px-2.5 py-1 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "batches" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
                {ACADEMY.batches.map((batch) => (
                  <div
                    key={batch.id}
                    className={`bg-white border rounded-2xl p-5 ${batch.spotsLeft === 0 ? "opacity-60 border-cream-dark" : "border-cream-dark hover:border-orange/30 shadow-sm hover:shadow-md transition-all"}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-nunito font-bold text-navy text-base">{batch.schedule}</p>
                        <div className="flex items-center gap-3 mt-1 text-navy/50 text-sm font-lato">
                          <span className="flex items-center gap-1"><Users size={12} />{batch.age}</span>
                          <span>·</span>
                          <span>{batch.gender}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bebas text-2xl text-navy">₹{batch.price.toLocaleString()}</p>
                        <p className="font-lato text-navy/40 text-xs">/month</p>
                      </div>
                    </div>

                    {/* Capacity bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-poppins text-navy/50 text-xs">{batch.filled}/{batch.capacity} spots filled</span>
                        <span className={`font-poppins font-semibold text-xs ${batch.spotsLeft === 0 ? "text-red-400" : "text-green-500"}`}>
                          {batch.spotsLeft === 0 ? "Full" : `${batch.spotsLeft} spots left`}
                        </span>
                      </div>
                      <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${batch.spotsLeft === 0 ? "bg-red-400" : "bg-green-500"}`}
                          style={{ width: `${(batch.filled / batch.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    {batch.spotsLeft > 0 ? (
                      <Link href={`/book/trial/${batch.id}`}>
                        <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                          Book Trial {batch.trialFee > 0 ? `· ₹${batch.trialFee}` : "· Free"}
                        </button>
                      </Link>
                    ) : (
                      <button className="w-full bg-cream border border-cream-dark text-navy/40 font-poppins font-semibold text-sm py-3 rounded-full cursor-not-allowed">
                        Batch Full — Join Waitlist
                      </button>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
                <div className="flex items-center gap-4 bg-white border border-cream-dark rounded-2xl p-5">
                  <div className="text-center">
                    <p className="font-bebas text-6xl text-navy">{ACADEMY.rating}</p>
                    <StarRating rating={Math.floor(ACADEMY.rating)} size={16} />
                    <p className="font-lato text-navy/40 text-xs mt-1">{ACADEMY.reviewCount} reviews</p>
                  </div>
                </div>

                {ACADEMY.reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white border border-cream-dark rounded-2xl p-5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-white font-nunito font-black">
                        {review.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-poppins font-semibold text-navy text-sm">{review.name}</p>
                          <span className="font-lato text-navy/40 text-xs">{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} size={12} />
                      </div>
                    </div>
                    <p className="font-lato text-navy/70 text-sm leading-relaxed">{review.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "location" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-white border border-cream-dark rounded-2xl p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-orange mt-0.5 shrink-0" />
                    <div>
                      <p className="font-nunito font-bold text-navy text-base mb-1">Academy Address</p>
                      <p className="font-lato text-navy/60 text-sm">{ACADEMY.address}</p>
                    </div>
                  </div>
                  <button className="mt-4 flex items-center gap-2 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-md transition-all">
                    <Navigation size={14} />
                    Open in Google Maps
                  </button>
                </div>

                {/* Map placeholder */}
                <div className="bg-cream-dark rounded-2xl h-56 flex items-center justify-center border border-cream-dark">
                  <div className="text-center">
                    <MapPin size={32} className="text-navy/20 mx-auto mb-2" />
                    <p className="font-lato text-navy/30 text-sm">Map view — Noida, Sector 18</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <div className="bg-white border border-cream-dark rounded-3xl p-6 shadow-lg">
                <h3 className="font-nunito font-bold text-navy text-lg mb-4">Book a Trial</h3>

                <div className="space-y-3 mb-5">
                  {ACADEMY.batches.filter((b) => b.spotsLeft > 0).slice(0, 2).map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between bg-cream rounded-xl p-3">
                      <div>
                        <p className="font-poppins font-semibold text-navy text-sm">{batch.age}</p>
                        <p className="font-lato text-navy/50 text-xs flex items-center gap-1">
                          <Clock size={10} /> {batch.schedule}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bebas text-lg text-navy">{batch.trialFee > 0 ? `₹${batch.trialFee}` : "Free"}</p>
                        <p className="text-green-500 font-poppins text-xs">{batch.spotsLeft} left</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href={`/book/trial/${ACADEMY.batches[0].id}`}>
                  <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-3">
                    Book Free Trial
                  </button>
                </Link>

                <button className="w-full flex items-center justify-center gap-2 border border-navy/15 text-navy font-poppins font-semibold text-sm py-3 rounded-full hover:bg-cream transition-colors">
                  <MessageCircle size={15} />
                  WhatsApp Academy
                </button>

                <div className="mt-5 pt-5 border-t border-cream-dark">
                  <div className="flex items-center gap-2 text-navy/50 text-xs font-lato">
                    <Calendar size={12} />
                    Next available: <span className="text-orange font-poppins font-semibold">Sat, Apr 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
