"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MapPin, Check } from "lucide-react";
import StepIndicator from "@/components/ui/StepIndicator";

const STEPS = ["Verify", "Profile", "Child", "Location"];

const SPORTS = [
  {
    id: "chess",
    label: "Chess",
    icon: "♟️",
    gradient: "from-[#3E2723] via-[#5D4037] to-[#6D4C41]",
    desc: "3+ years",
  },
  {
    id: "swimming",
    label: "Swimming",
    icon: "🏊",
    gradient: "from-[#006994] via-[#0891b2] to-[#00C2CB]",
    desc: "18 months+",
  },
  {
    id: "cricket",
    label: "Cricket",
    icon: "🏏",
    gradient: "from-[#1a3a1a] via-[#166534] to-[#15803d]",
    desc: "4+ years",
  },
  {
    id: "badminton",
    label: "Badminton",
    icon: "🏸",
    gradient: "from-[#166534] via-[#15803d] to-[#22c55e]",
    desc: "4+ years",
  },
  {
    id: "gymnastics",
    label: "Gymnastics",
    icon: "🤸",
    gradient: "from-[#6B2FA0] via-[#7c3aed] to-[#8B5CF6]",
    desc: "18 months+",
  },
];

const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Noida", "Gurgaon", "Hyderabad", "Pune", "Chennai"];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [profile, setProfile] = useState({ name: "", city: "", language: "English", referral: "" });
  const [child, setChild] = useState({ name: "", dob: "", gender: "", notes: "", sports: [] as string[] });
  const [locationGranted, setLocationGranted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const toggleSport = (sportId: string) => {
    setChild((prev) => ({
      ...prev,
      sports: prev.sports.includes(sportId)
        ? prev.sports.filter((s) => s !== sportId)
        : [...prev.sports, sportId],
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setCompleted(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * 40 }),
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🏆
          </motion.div>
          <h2 className="font-nunito font-black text-4xl text-white mb-3">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">BabyCorp!</span>
          </h2>
          <p className="font-lato text-white/60 text-lg mb-8">
            Your champion&apos;s journey starts now. Let&apos;s find the perfect academy.
          </p>
          <Link href="/discover">
            <button className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300 flex items-center gap-2 mx-auto">
              Discover Academies <ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden px-4 py-24">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gold/8 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-nunito font-black text-3xl text-white mb-1">
            Join{" "}
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">BabyCorp</span>
          </h1>
          <p className="text-white/45 font-lato text-sm">Almost there! Your champion awaits 🏆</p>
        </motion.div>

        <div className="mb-8">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        <div className="bg-navy-light border border-white/10 rounded-3xl p-6 shadow-2xl shadow-navy/50 overflow-hidden">
          <AnimatePresence mode="wait" custom={1}>
            {/* Step 0: OTP */}
            {step === 0 && (
              <motion.div
                key="step0"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-nunito font-bold text-xl text-white mb-1">Verify your number</h2>
                <p className="text-white/45 font-lato text-sm mb-6">
                  We sent a 6-digit OTP to{" "}
                  <span className="text-orange font-poppins font-semibold">+91 98765 43210</span>
                </p>
                <div className="flex gap-2 justify-between mb-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-12 h-14 text-center text-white font-nunito font-bold text-xl bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange/60 transition-all"
                    />
                  ))}
                </div>
                <p className="text-white/30 font-lato text-xs text-center">
                  Didn&apos;t receive it?{" "}
                  <button className="text-aqua font-poppins hover:text-aqua/80 transition-colors">Resend OTP</button>
                </p>
              </motion.div>
            )}

            {/* Step 1: Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="font-nunito font-bold text-xl text-white mb-4">Your profile</h2>

                <div>
                  <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Priya Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">City</label>
                  <select
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                  >
                    <option value="" className="bg-navy text-white/40">Select your city</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c} className="bg-navy text-white">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Language</label>
                  <div className="flex gap-2">
                    {["English", "Hindi"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setProfile({ ...profile, language: lang })}
                        className={`flex-1 py-3 rounded-xl font-poppins text-sm font-medium transition-all ${
                          profile.language === lang
                            ? "bg-gradient-to-r from-orange to-orange-hover text-white shadow-lg shadow-orange/20"
                            : "bg-white/5 border border-white/10 text-white/60 hover:border-orange/30"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">
                    Referral Code <span className="text-white/25 normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={profile.referral}
                    onChange={(e) => setProfile({ ...profile, referral: e.target.value })}
                    placeholder="FRIEND123"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Child */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="font-nunito font-bold text-xl text-white mb-4">Add your child</h2>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Child&apos;s Name</label>
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => setChild({ ...child, name: e.target.value })}
                      placeholder="Aryan"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Date of Birth</label>
                    <input
                      type="date"
                      value={child.dob}
                      onChange={(e) => setChild({ ...child, dob: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Gender</label>
                    <select
                      value={child.gender}
                      onChange={(e) => setChild({ ...child, gender: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                    >
                      <option value="" className="bg-navy">Select</option>
                      <option value="boy" className="bg-navy">Boy</option>
                      <option value="girl" className="bg-navy">Girl</option>
                      <option value="other" className="bg-navy">Other</option>
                    </select>
                  </div>
                </div>

                {/* Sport cards — large gradient */}
                <div>
                  <label className="block text-white/50 font-poppins text-xs mb-3 font-medium uppercase tracking-wider">Sports Interests</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SPORTS.map((sport) => {
                      const selected = child.sports.includes(sport.id);
                      return (
                        <button
                          key={sport.id}
                          type="button"
                          onClick={() => toggleSport(sport.id)}
                          className={`relative bg-gradient-to-br ${sport.gradient} rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 border-2 ${
                            selected ? "border-white scale-[1.02] shadow-lg" : "border-transparent opacity-70 hover:opacity-90"
                          }`}
                        >
                          {selected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                              <Check size={12} className="text-navy" />
                            </div>
                          )}
                          <span className="text-3xl">{sport.icon}</span>
                          <div>
                            <p className="font-poppins font-semibold text-white text-sm">{sport.label}</p>
                            <p className="font-lato text-white/60 text-[10px]">{sport.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">
                    Medical Notes <span className="text-white/25 normal-case">(optional)</span>
                  </label>
                  <textarea
                    value={child.notes}
                    onChange={(e) => setChild({ ...child, notes: e.target.value })}
                    placeholder="Allergies, conditions, special needs..."
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange/20 to-aqua/20 rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <MapPin size={36} className="text-orange" />
                </div>
                <h2 className="font-nunito font-bold text-xl text-white mb-2">Find academies near you</h2>
                <p className="text-white/45 font-lato text-sm mb-6 leading-relaxed">
                  Allow location access so we can show the best academies in your area — sorted by distance.
                </p>

                <AnimatePresence mode="wait">
                  {locationGranted ? (
                    <motion.div
                      key="granted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 rounded-2xl py-4 mb-3"
                    >
                      <Check size={20} className="text-green-400" />
                      <span className="font-poppins font-semibold text-green-400">Location access granted!</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="button"
                      onClick={() => setLocationGranted(true)}
                      className="w-full bg-gradient-to-r from-aqua to-aqua/80 text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-aqua/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 mb-3"
                    >
                      Allow Location Access
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="text-white/25 font-lato text-xs">
                  Or we&apos;ll use your city:{" "}
                  <span className="text-orange font-poppins">{profile.city || "Delhi"}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-white/10 text-white/60 font-poppins font-medium text-sm hover:border-white/20 hover:text-white transition-all"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {step === 3 ? "Start Exploring" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <p className="text-center text-white/25 font-lato text-xs mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-orange hover:text-orange-hover font-poppins font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
