"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, AlertCircle, Check } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase";

const SPORTS = [
  { id: "chess",      label: "Chess",      icon: "♟️", gradient: "from-[#3E2723] via-[#5D4037] to-[#6D4C41]", desc: "3+ years" },
  { id: "swimming",   label: "Swimming",   icon: "🏊", gradient: "from-[#006994] via-[#0891b2] to-[#00C2CB]",  desc: "18 months+" },
  { id: "cricket",    label: "Cricket",    icon: "🏏", gradient: "from-[#1a3a1a] via-[#166534] to-[#15803d]",  desc: "4+ years" },
  { id: "badminton",  label: "Badminton",  icon: "🏸", gradient: "from-[#166534] via-[#15803d] to-[#22c55e]",  desc: "4+ years" },
  { id: "gymnastics", label: "Gymnastics", icon: "🤸", gradient: "from-[#6B2FA0] via-[#7c3aed] to-[#8B5CF6]",  desc: "18 months+" },
];

function AddChildPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, user } = useAuthStore();

  const returnPath = searchParams.get("return") ?? "/dashboard";

  const [child, setChild] = useState({ name: "", dob: "", gender: "", notes: "", sports: [] as string[] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/auth/login");
    else if (user?.role !== "parent") router.push("/");
  }, [isLoggedIn, user, router]);

  const toggleSport = (id: string) =>
    setChild((prev) => ({
      ...prev,
      sports: prev.sports.includes(id) ? prev.sports.filter((s) => s !== id) : [...prev.sports, id],
    }));

  const handleSubmit = async () => {
    if (!child.name.trim()) { setError("Enter your child's name"); return; }
    if (!child.dob)         { setError("Enter your child's date of birth"); return; }
    if (!child.gender)      { setError("Select your child's gender"); return; }

    setError(null);
    setIsLoading(true);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("children").insert({
      parent_id: user!.id,
      name: child.name.trim(),
      dob: child.dob,
      gender: child.gender,
      sport_ids: child.sports,
      medical_notes: child.notes.trim() || null,
    });
    setIsLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setDone(true);
    setTimeout(() => router.push(returnPath), 1200);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={36} className="text-green-400" />
          </div>
          <h2 className="font-nunito font-black text-3xl text-white mb-2">{child.name} added!</h2>
          <p className="font-lato text-white/40 text-sm">Redirecting you back…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden px-4 py-24">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <button
            onClick={() => router.push(returnPath)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 font-poppins text-sm transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="font-nunito font-black text-3xl text-white">Add a child</h1>
          <p className="text-white/40 font-lato text-sm mt-1">Each child gets their own profile and subscription.</p>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4"
            >
              <AlertCircle size={14} className="text-red-400 shrink-0" />
              <p className="font-lato text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-navy-light border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-navy/60 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">
              Child&apos;s Name
            </label>
            <input
              type="text"
              value={child.name}
              onChange={(e) => setChild((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Aryan"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
            />
          </div>

          {/* DOB + Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">
                Date of Birth
              </label>
              <input
                type="date"
                value={child.dob}
                onChange={(e) => setChild((p) => ({ ...p, dob: e.target.value }))}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "boy",  label: "Boy",  emoji: "👦" },
                  { value: "girl", label: "Girl", emoji: "👧" },
                ].map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setChild((p) => ({ ...p, gender: g.value }))}
                    className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 font-poppins font-semibold text-sm transition-all duration-200 ${
                      child.gender === g.value
                        ? "border-orange bg-orange/10 text-orange"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                    }`}
                  >
                    <span>{g.emoji}</span> {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sports */}
          <div>
            <label className="block text-white/50 font-poppins text-xs mb-2 font-medium uppercase tracking-wider">
              Sports Interest <span className="normal-case text-white/25">(optional)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPORTS.map((sport) => {
                const selected = child.sports.includes(sport.id);
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => toggleSport(sport.id)}
                    className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                      selected ? "border-orange scale-[1.02]" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {selected && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${sport.gradient} opacity-20`} />
                    )}
                    <span className="text-2xl relative z-10">{sport.icon}</span>
                    <span className={`font-poppins font-semibold text-xs mt-1 relative z-10 ${selected ? "text-white" : "text-white/50"}`}>
                      {sport.label}
                    </span>
                    <span className="font-lato text-[10px] text-white/25 relative z-10">{sport.desc}</span>
                    {selected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange rounded-full flex items-center justify-center">
                        <Check size={9} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Medical notes */}
          <div>
            <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">
              Medical Notes <span className="normal-case text-white/25">(optional)</span>
            </label>
            <textarea
              value={child.notes}
              onChange={(e) => setChild((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Any allergies, injuries, or conditions coaches should know about…"
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:scale-100"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>Add Child <ArrowRight size={16} /></>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function AddChildPageWrapper() {
  return (
    <Suspense>
      <AddChildPage />
    </Suspense>
  );
}
