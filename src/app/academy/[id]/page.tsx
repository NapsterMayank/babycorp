"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle, ChevronDown, ChevronUp, MessageCircle, Navigation, Users, Clock, Calendar } from "lucide-react";
import Link from "next/link";

const ACADEMY = {
  id: "dfa-001",
  name: "Delhi Football Academy",
  verified: true,
  rating: 4.8,
  reviewCount: 124,
  sport: "Football",
  sports: ["Football", "Fitness", "Agility Training"],
  address: "Plot 42, Sanjay Lake Road, Trilokpuri, New Delhi – 110091",
  ageGroups: ["5–7 yrs", "8–10 yrs", "11–14 yrs"],
  coach: {
    name: "Rahul Mehra",
    experience: "12 years",
    certification: "AFC B License",
    bio: "Former Delhi Dynamos FC player with 12 years of coaching experience. Rahul specializes in youth development and has trained 200+ players, many of whom have gone on to represent state teams.",
  },
  curriculum: [
    { month: "Month 1–2", title: "Foundation Skills", items: ["Ball familiarity", "Basic dribbling", "Running with the ball", "Team coordination"] },
    { month: "Month 3–4", title: "Technical Development", items: ["Passing accuracy", "Receiving and control", "Shooting basics", "Defensive positioning"] },
    { month: "Month 5–6", title: "Tactical Awareness", items: ["Small-sided games", "Set pieces", "Match situations", "Physical conditioning"] },
  ],
  batches: [
    { id: "b1", schedule: "Sat & Sun, 7–8 AM", age: "5–7 yrs", gender: "All", capacity: 8, filled: 6, price: 2500, trialFee: 200, spotsLeft: 2 },
    { id: "b2", schedule: "Sat & Sun, 8–9 AM", age: "8–10 yrs", gender: "All", capacity: 12, filled: 9, price: 3000, trialFee: 200, spotsLeft: 3 },
    { id: "b3", schedule: "Mon, Wed, Fri, 5–6 PM", age: "11–14 yrs", gender: "Boys", capacity: 10, filled: 10, price: 3500, trialFee: 0, spotsLeft: 0 },
    { id: "b4", schedule: "Tue, Thu, 5–6 PM", age: "11–14 yrs", gender: "Girls", capacity: 10, filled: 4, price: 3500, trialFee: 200, spotsLeft: 6 },
  ],
  reviews: [
    { id: 1, name: "Priya Sharma", initial: "P", rating: 5, date: "Mar 2026", text: "Rahul sir is an amazing coach! Aryan has improved so much in just 2 months. The academy is well-organized and the kids love it.", coach: 5, facility: 4, value: 5, communication: 5 },
    { id: 2, name: "Vikram Nair", initial: "V", rating: 5, date: "Feb 2026", text: "Best football academy in Delhi. My son went from barely kicking a ball to playing in inter-school tournaments. Highly recommend!", coach: 5, facility: 5, value: 4, communication: 5 },
    { id: 3, name: "Sunita Reddy", initial: "S", rating: 4, date: "Jan 2026", text: "Good coaching staff. The weekend batch is perfect for school kids. Facility could be improved but the coaching quality makes up for it.", coach: 5, facility: 3, value: 4, communication: 4 },
    { id: 4, name: "Amit Gupta", initial: "A", rating: 4, date: "Dec 2025", text: "Affordable pricing for great quality coaching. My daughter loves going every weekend.", coach: 4, facility: 4, value: 5, communication: 4 },
  ],
  ratingBreakdown: [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: star === 5 ? 89 : star === 4 ? 28 : star === 3 ? 5 : star === 2 ? 2 : 0,
  })),
};

type TabType = "overview" | "batches" | "reviews" | "location";

export default function AcademyDetailPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "batches", label: "Batches" },
    { id: "reviews", label: "Reviews" },
    { id: "location", label: "Location" },
  ];

  const totalReviews = ACADEMY.ratingBreakdown.reduce((sum, r) => sum + r.count, 0);

  const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "text-gold fill-gold" : "text-white/20"}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-cream pb-28 md:pb-0">
      {/* Hero */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-navy to-navy-light overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[120px] opacity-10">⚽</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              {ACADEMY.sports.map((s) => (
                <span key={s} className="bg-white/20 backdrop-blur-sm text-white text-xs font-poppins px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-nunito font-black text-2xl md:text-3xl text-white">{ACADEMY.name}</h1>
              {ACADEMY.verified && (
                <div className="flex items-center gap-1 bg-aqua/90 text-white text-xs font-poppins font-semibold px-2 py-1 rounded-full shrink-0">
                  <CheckCircle size={12} /> Verified
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-gold fill-gold" />
                <span className="text-white font-poppins font-semibold">{ACADEMY.rating}</span>
                <span className="text-white/60 font-lato text-xs">({ACADEMY.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-white/60 text-xs font-lato">
                <MapPin size={12} />
                New Delhi
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-5xl mx-auto px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-3 gap-2 h-28 md:h-36">
          {[
            "from-orange/40 to-gold/20",
            "from-aqua/30 to-navy/60",
            "from-gold/20 to-orange/30",
          ].map((gradient, i) => (
            <div
              key={i}
              className={`rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
            >
              <span className="text-4xl opacity-30">⚽</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="flex gap-1 bg-white border border-cream-dark rounded-2xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl font-poppins font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-orange to-orange-hover text-white shadow-md"
                  : "text-navy/60 hover:text-navy"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Coach */}
              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-3">Head Coach</h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center text-white font-nunito font-black text-xl shadow-lg shrink-0">
                    R
                  </div>
                  <div>
                    <p className="font-nunito font-bold text-navy text-base">{ACADEMY.coach.name}</p>
                    <div className="flex items-center gap-3 text-navy/50 text-xs font-lato mb-2">
                      <span>{ACADEMY.coach.experience} experience</span>
                      <span>•</span>
                      <span>{ACADEMY.coach.certification}</span>
                    </div>
                    <p className="text-navy/70 font-lato text-sm leading-relaxed">{ACADEMY.coach.bio}</p>
                  </div>
                </div>
              </div>

              {/* Age groups & Sports */}
              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-3">Program Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-navy/50 font-poppins text-xs font-medium mb-2">Age Groups</p>
                    <div className="flex flex-col gap-1.5">
                      {ACADEMY.ageGroups.map((ag) => (
                        <span key={ag} className="inline-flex items-center gap-1.5 text-sm font-poppins text-navy/80">
                          <Users size={13} className="text-orange" /> {ag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-navy/50 font-poppins text-xs font-medium mb-2">Sports Offered</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ACADEMY.sports.map((s) => (
                        <span key={s} className="bg-orange/10 text-orange text-xs font-poppins px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-3">Curriculum</h3>
                <div className="space-y-2">
                  {ACADEMY.curriculum.map((c) => (
                    <div key={c.month} className="border border-cream-dark rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedMonth(expandedMonth === c.month ? null : c.month)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div>
                          <p className="font-poppins font-semibold text-navy text-sm">{c.month}</p>
                          <p className="font-lato text-navy/50 text-xs">{c.title}</p>
                        </div>
                        {expandedMonth === c.month ? (
                          <ChevronUp size={16} className="text-orange" />
                        ) : (
                          <ChevronDown size={16} className="text-navy/40" />
                        )}
                      </button>
                      {expandedMonth === c.month && (
                        <div className="px-4 pb-4 space-y-1.5">
                          {c.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-navy/70 font-lato text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Batches */}
          {activeTab === "batches" && (
            <div className="space-y-4">
              {ACADEMY.batches.map((batch) => (
                <motion.div
                  key={batch.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} className="text-orange" />
                        <span className="font-poppins font-semibold text-navy text-sm">{batch.schedule}</span>
                      </div>
                      <div className="flex items-center gap-3 text-navy/50 text-xs font-lato">
                        <span>Ages {batch.age}</span>
                        <span>•</span>
                        <span>{batch.gender}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-nunito font-black text-orange text-xl">₹{batch.price.toLocaleString()}</p>
                      <p className="text-navy/40 text-xs font-lato">per month</p>
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs font-poppins mb-1.5">
                      <span className="text-navy/50">Seats available</span>
                      <span className={batch.spotsLeft === 0 ? "text-red-500 font-semibold" : "text-orange font-semibold"}>
                        {batch.spotsLeft === 0 ? "Full" : `${batch.spotsLeft} spots left`}
                      </span>
                    </div>
                    <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange to-orange-hover rounded-full"
                        style={{ width: `${(batch.filled / batch.capacity) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-navy/30 font-lato mt-1">
                      <span>{batch.filled} enrolled</span>
                      <span>{batch.capacity} total</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {batch.spotsLeft > 0 && (
                      <Link href={`/book/trial/${batch.id}`} className="flex-1">
                        <button className="w-full border-2 border-orange text-orange font-poppins font-semibold text-sm py-2.5 rounded-full hover:bg-orange/5 transition-all">
                          Book Trial {batch.trialFee > 0 ? `₹${batch.trialFee}` : "(Free)"}
                        </button>
                      </Link>
                    )}
                    <button
                      className={`font-poppins font-semibold text-sm py-2.5 rounded-full transition-all ${
                        batch.spotsLeft === 0
                          ? "flex-1 bg-navy/10 text-navy/30 cursor-not-allowed"
                          : "flex-1 bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30"
                      }`}
                      disabled={batch.spotsLeft === 0}
                    >
                      {batch.spotsLeft === 0 ? "Join Waitlist" : "Enroll Now"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-5">
              {/* Rating breakdown */}
              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="text-center shrink-0">
                    <p className="font-nunito font-black text-5xl text-navy">{ACADEMY.rating}</p>
                    <StarRating rating={Math.round(ACADEMY.rating)} size={16} />
                    <p className="text-navy/40 font-lato text-xs mt-1">{totalReviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {ACADEMY.ratingBreakdown.map((rb) => (
                      <div key={rb.star} className="flex items-center gap-2">
                        <span className="text-xs font-poppins text-navy/50 w-3">{rb.star}</span>
                        <Star size={10} className="text-gold fill-gold shrink-0" />
                        <div className="flex-1 h-2 bg-cream-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold rounded-full"
                            style={{ width: `${(rb.count / totalReviews) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-lato text-navy/40 w-5 text-right">{rb.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review cards */}
              {ACADEMY.reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange to-gold rounded-xl flex items-center justify-center text-white font-nunito font-black text-sm shrink-0">
                      {review.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-poppins font-semibold text-navy text-sm">{review.name}</p>
                        <span className="text-navy/30 font-lato text-xs">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>
                  </div>
                  <p className="text-navy/70 font-lato text-sm leading-relaxed mb-3">{review.text}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Coach", value: review.coach },
                      { label: "Facility", value: review.facility },
                      { label: "Value", value: review.value },
                      { label: "Comms", value: review.communication },
                    ].map((sub) => (
                      <div key={sub.label} className="text-center bg-cream rounded-xl p-2">
                        <p className="text-navy/40 font-lato text-[10px]">{sub.label}</p>
                        <p className="font-nunito font-bold text-navy text-sm">{sub.value}/5</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Location */}
          {activeTab === "location" && (
            <div className="space-y-4">
              {/* Map placeholder */}
              <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm">
                <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="text-orange mx-auto mb-2" />
                    <p className="font-poppins text-navy/60 text-sm">Map view</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-poppins font-semibold text-navy text-sm mb-1">{ACADEMY.address}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 border border-cream-dark text-navy font-poppins font-medium text-sm py-2.5 rounded-full hover:bg-cream transition-all">
                      <Navigation size={14} className="text-orange" />
                      Get Directions
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-poppins font-semibold text-sm py-2.5 rounded-full hover:bg-[#1fbb59] transition-all">
                      <MessageCircle size={14} />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Nearby landmarks */}
              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm">
                <h3 className="font-nunito font-bold text-navy mb-3">Nearby Landmarks</h3>
                <div className="space-y-2">
                  {["Trilokpuri Metro Station – 0.4 km", "Sanjay Lake Park – 0.2 km", "East Delhi Mall – 1.1 km"].map((lm) => (
                    <div key={lm} className="flex items-center gap-2 text-navy/60 font-lato text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-aqua" />
                      {lm}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-cream-dark px-4 py-3 flex gap-3 md:hidden z-40">
        <Link href="/book/trial/b2" className="flex-1">
          <button className="w-full border-2 border-orange text-orange font-poppins font-semibold text-sm py-3 rounded-full hover:bg-orange/5 transition-all">
            Book Free Trial
          </button>
        </Link>
        <button className="flex-1 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30">
          Enroll ₹2,500/mo
        </button>
      </div>
    </div>
  );
}
