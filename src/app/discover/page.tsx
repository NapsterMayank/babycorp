"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Star } from "lucide-react";
import AcademyCard from "@/components/ui/AcademyCard";

const SPORTS_FILTERS = [
  { id: "chess", label: "Chess", icon: "♟️" },
  { id: "swimming", label: "Swimming", icon: "🏊" },
  { id: "cricket", label: "Cricket", icon: "🏏" },
  { id: "badminton", label: "Badminton", icon: "🏸" },
  { id: "gymnastics", label: "Gymnastics", icon: "🤸" },
];

const AGE_GROUPS = [
  { id: "toddler", label: "Toddler", range: "2–4 yrs" },
  { id: "early", label: "Early", range: "5–7 yrs" },
  { id: "intermediate", label: "Intermediate", range: "8–10 yrs" },
  { id: "advanced", label: "Advanced", range: "11–14 yrs" },
];

const ACADEMIES = [
  {
    id: "dfa-001",
    name: "Delhi Chess Academy",
    sport: "Chess",
    sports: ["Chess"],
    distance: "2.3 km",
    rating: 4.8,
    reviewCount: 124,
    priceMin: 1500,
    priceMax: 2500,
    coachName: "Rahul Mehra",
    nextTrial: "Sat, Apr 12",
    verified: true,
    gradient: "from-orange/30 to-navy",
    ageGroup: "3–14 yrs",
  },
  {
    id: "swimstar-001",
    name: "SwimStar Noida",
    sport: "Swimming",
    sports: ["Swimming"],
    distance: "4.1 km",
    rating: 4.6,
    reviewCount: 89,
    priceMin: 3000,
    priceMax: 4500,
    coachName: "Anjali Singh",
    nextTrial: "Sun, Apr 13",
    verified: true,
    gradient: "from-aqua/30 to-navy",
    ageGroup: "6 months–14 yrs",
  },
  {
    id: "cricket-001",
    name: "Champions Cricket Club",
    sport: "Cricket",
    sports: ["Cricket"],
    distance: "1.8 km",
    rating: 4.9,
    reviewCount: 203,
    priceMin: 2000,
    priceMax: 3000,
    coachName: "Vikas Yadav",
    nextTrial: "Sat, Apr 12",
    verified: true,
    gradient: "from-gold/20 to-navy",
    ageGroup: "4–16 yrs",
  },
  {
    id: "badminton-001",
    name: "Smash Badminton Academy",
    sport: "Badminton",
    sports: ["Badminton"],
    distance: "3.2 km",
    rating: 4.7,
    reviewCount: 98,
    priceMin: 2000,
    priceMax: 3500,
    coachName: "Sneha Reddy",
    nextTrial: "Sun, Apr 13",
    verified: true,
    gradient: "from-green-500/20 to-navy",
    ageGroup: "4–14 yrs",
  },
  {
    id: "gym-001",
    name: "Little Champions Gymnastics",
    sport: "Gymnastics",
    sports: ["Gymnastics"],
    distance: "3.5 km",
    rating: 4.7,
    reviewCount: 67,
    priceMin: 3500,
    priceMax: 5000,
    coachName: "Priya Nair",
    nextTrial: "Mon, Apr 14",
    verified: true,
    gradient: "from-purple-500/20 to-navy",
    ageGroup: "18 months–12 yrs",
  },
  {
    id: "chess-002",
    name: "MindMasters Chess Club",
    sport: "Chess",
    sports: ["Chess"],
    distance: "5.2 km",
    rating: 4.5,
    reviewCount: 41,
    priceMin: 1200,
    priceMax: 2000,
    coachName: "Arjun Kapoor",
    nextTrial: "Wed, Apr 16",
    verified: false,
    gradient: "from-orange/20 to-navy",
    ageGroup: "3–14 yrs",
  },
];

type SortOption = "nearest" | "rating" | "price";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState<"weekday" | "weekend" | null>(null);
  const [timeFilter, setTimeFilter] = useState<"morning" | "evening" | null>(null);
  const [priceMax, setPriceMax] = useState(5000);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("nearest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading] = useState(false);

  const toggleSport = (id: string) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredAcademies = ACADEMIES.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSports.length > 0 && !selectedSports.some((s) => a.sports.map(sp => sp.toLowerCase()).includes(s))) return false;
    if (verifiedOnly && !a.verified) return false;
    if (minRating && a.rating < minRating) return false;
    if (a.priceMin > priceMax) return false;
    return true;
  });

  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* Sports */}
      <div>
        <p className="font-poppins font-semibold text-sm text-white/80 mb-3">Sport</p>
        <div className="flex flex-wrap gap-2">
          {SPORTS_FILTERS.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleSport(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-poppins font-medium transition-all ${
                selectedSports.includes(s.id)
                  ? "bg-orange text-white shadow-md shadow-orange/30"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Age group */}
      <div>
        <p className="font-poppins font-semibold text-sm text-white/80 mb-3">Age Group</p>
        <div className="grid grid-cols-2 gap-2">
          {AGE_GROUPS.map((ag) => (
            <button
              key={ag.id}
              onClick={() => setSelectedAge(selectedAge === ag.id ? null : ag.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl border text-xs font-poppins transition-all ${
                selectedAge === ag.id
                  ? "border-orange bg-orange/20 text-orange"
                  : "border-white/10 text-white/50 hover:border-orange/30"
              }`}
            >
              <span className="font-semibold">{ag.label}</span>
              <span className="text-[10px] opacity-70">{ag.range}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Day */}
      <div>
        <p className="font-poppins font-semibold text-sm text-white/80 mb-3">Day</p>
        <div className="flex gap-2">
          {(["weekday", "weekend"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDayFilter(dayFilter === d ? null : d)}
              className={`flex-1 py-2 rounded-xl text-xs font-poppins font-medium transition-all capitalize ${
                dayFilter === d ? "bg-orange text-white" : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Time */}
      <div>
        <p className="font-poppins font-semibold text-sm text-white/80 mb-3">Time</p>
        <div className="flex gap-2">
          {(["morning", "evening"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(timeFilter === t ? null : t)}
              className={`flex-1 py-2 rounded-xl text-xs font-poppins font-medium transition-all capitalize ${
                timeFilter === t ? "bg-orange text-white" : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
            >
              {t === "morning" ? "☀️" : "🌙"} {t}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-poppins font-semibold text-sm text-white/80">Max Price</p>
          <span className="text-orange font-poppins font-bold text-sm">₹{priceMax.toLocaleString()}/mo</span>
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-orange"
        />
        <div className="flex justify-between text-white/30 text-xs font-lato mt-1">
          <span>₹0</span>
          <span>₹5,000</span>
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="font-poppins font-semibold text-sm text-white/80 mb-3">Minimum Rating</p>
        <div className="flex gap-2">
          {[3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? null : r)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-poppins font-medium transition-all ${
                minRating === r ? "bg-gold text-navy" : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
            >
              <Star size={11} className={minRating === r ? "fill-navy text-navy" : "text-gold fill-gold"} />
              {r}+
            </button>
          ))}
        </div>
      </div>

      {/* Verified toggle */}
      <div className="flex items-center justify-between">
        <span className="font-poppins text-sm text-white/80">Verified only</span>
        <button
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className={`relative w-11 h-6 rounded-full transition-all duration-300 ${verifiedOnly ? "bg-aqua" : "bg-white/10"}`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
              verifiedOnly ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Hero bar */}
      <div className="bg-navy py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-nunito font-black text-2xl md:text-3xl text-white mb-4">
              Find the perfect sport for{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                Aryan
              </span>
            </h1>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-4 py-3">
                <Search size={18} className="text-white/40 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search academies, sports..."
                  className="bg-transparent flex-1 text-white font-poppins text-sm placeholder:text-white/30 focus:outline-none"
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <X size={16} className="text-white/40 hover:text-white/60" />
                  </button>
                )}
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white/10 border border-white/15 text-white font-poppins text-sm rounded-2xl px-4 py-3 pr-8 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="nearest" className="bg-navy">Nearest</option>
                  <option value="rating" className="bg-navy">Highest Rated</option>
                  <option value="price" className="bg-navy">Lowest Price</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
              {/* Mobile filter btn */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden bg-orange text-white font-poppins font-semibold text-sm px-4 py-3 rounded-2xl flex items-center gap-2"
              >
                <SlidersHorizontal size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block w-64 shrink-0"
          >
            <div className="bg-navy rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-nunito font-bold text-white">Filters</h2>
                <button
                  onClick={() => { setSelectedSports([]); setSelectedAge(null); setDayFilter(null); setTimeFilter(null); setPriceMax(5000); setMinRating(null); setVerifiedOnly(false); }}
                  className="text-orange text-xs font-poppins hover:text-orange-hover transition-colors"
                >
                  Clear all
                </button>
              </div>
              <FiltersPanel />
            </div>
          </motion.aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-navy/60 font-lato text-sm">
                <span className="text-navy font-poppins font-semibold">{filteredAcademies.length}</span> academies found
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-cream-dark">
                    <div className="h-44 bg-gradient-to-r from-cream-dark to-cream animate-shimmer bg-[length:200%_100%]" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-cream-dark rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-cream-dark rounded animate-pulse w-1/2" />
                      <div className="h-10 bg-cream-dark rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAcademies.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-nunito font-bold text-xl text-navy mb-2">No academies found</h3>
                <p className="text-navy/50 font-lato text-sm mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => { setSearch(""); setSelectedSports([]); }}
                  className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm px-6 py-2.5 rounded-full"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredAcademies.map((academy, i) => (
                  <motion.div
                    key={academy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <AcademyCard {...academy} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-navy rounded-t-3xl z-50 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-nunito font-bold text-xl text-white">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={22} className="text-white/60" />
                  </button>
                </div>
                <FiltersPanel />
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full mt-6 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold py-3.5 rounded-full"
                >
                  Show {filteredAcademies.length} Academies
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
