"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, Clock, ChevronLeft, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";

const STEPS = ["Select Slot", "Choose Child", "Review & Pay"];

const CHILDREN = [
  { id: "c1", name: "Aryan Sharma", age: 8, initial: "A", gradient: "from-orange to-gold" },
  { id: "c2", name: "Meera Sharma", age: 5, initial: "M", gradient: "from-aqua to-gold" },
];

const getNext14Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    days.push({
      date: date.getDate(),
      day: dayNames[date.getDay()],
      month: monthNames[date.getMonth()],
      available: date.getDay() === 6 || date.getDay() === 0,
    });
  }
  return days;
};

const SLOTS = [
  { id: "s1", time: "7:00 AM – 8:00 AM", available: true },
  { id: "s2", time: "8:00 AM – 9:00 AM", available: true },
  { id: "s3", time: "9:00 AM – 10:00 AM", available: false },
];

const TRIAL_INFO = {
  academy: "Champions Cricket Club",
  sport: "Cricket",
  icon: "🏏",
  trialFee: 200,
  gstPct: 18,
};

export default function TrialBookingPage() {
  const [step, setStep] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const days = getNext14Days();
  const selectedDayData = selectedDay !== null ? days[selectedDay] : null;
  const selectedSlotData = SLOTS.find((s) => s.id === selectedSlot);
  const selectedChildData = CHILDREN.find((c) => c.id === selectedChild);

  const gst = Math.round((TRIAL_INFO.trialFee * TRIAL_INFO.gstPct) / 100);
  const total = TRIAL_INFO.trialFee + gst;

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else setConfirmed(true);
  };

  const canProceed = () => {
    if (step === 0) return selectedDay !== null && selectedSlot !== null;
    if (step === 1) return selectedChild !== null;
    return true;
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="text-center max-w-sm relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30"
          >
            <Check size={40} className="text-white" />
          </motion.div>

          <h1 className="font-nunito font-black text-4xl text-white mb-3">
            Trial Booked! 🎉
          </h1>
          <p className="font-lato text-white/60 text-base mb-6 leading-relaxed">
            Your trial session is confirmed.{" "}
            {selectedDayData && `${selectedDayData.day}, ${selectedDayData.date} ${selectedDayData.month}`}
            {selectedSlotData && ` · ${selectedSlotData.time}`}
          </p>

          <div className="bg-navy-light border border-white/10 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{TRIAL_INFO.icon}</span>
              <div>
                <p className="font-poppins font-semibold text-white text-sm">{TRIAL_INFO.academy}</p>
                <p className="font-lato text-white/50 text-xs">{selectedChildData?.name} · {TRIAL_INFO.sport}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-aqua font-poppins font-semibold text-sm mt-2">
              <MessageCircle size={14} />
              WhatsApp confirmation sent!
            </div>
          </div>

          <Link href="/dashboard">
            <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 transition-all">
              Back to Dashboard
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/discover" className="flex items-center gap-2 text-navy/50 hover:text-navy transition-colors mb-6 w-fit">
          <ChevronLeft size={18} />
          <span className="font-poppins text-sm">Back</span>
        </Link>

        {/* Academy info strip */}
        <div className="bg-navy-light border border-white/10 rounded-2xl p-4 flex items-center gap-3 mb-6">
          <span className="text-3xl">{TRIAL_INFO.icon}</span>
          <div>
            <p className="font-nunito font-bold text-white text-base">{TRIAL_INFO.academy}</p>
            <p className="font-lato text-white/50 text-sm">Trial booking · {TRIAL_INFO.trialFee > 0 ? `₹${TRIAL_INFO.trialFee} + GST` : "Free"}</p>
          </div>
        </div>

        <div className="mb-6">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Select slot */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-nunito font-bold text-navy text-xl mb-1">Pick a date</h2>
                <p className="font-lato text-navy/50 text-sm mb-4">Weekend sessions available</p>

                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => day.available && setSelectedDay(i)}
                      disabled={!day.available}
                      className={`flex flex-col items-center py-3 rounded-xl text-xs font-poppins transition-all duration-200 ${
                        selectedDay === i
                          ? "bg-gradient-to-b from-orange to-orange-hover text-white shadow-md shadow-orange/30 ring-2 ring-orange/40"
                          : day.available
                          ? "bg-white border border-cream-dark text-navy hover:border-orange/40 hover:shadow-sm"
                          : "bg-cream text-navy/25 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-[10px] opacity-70">{day.day}</span>
                      <span className="font-bold text-base leading-none">{day.date}</span>
                      <span className="text-[9px] opacity-60">{day.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDay !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <h3 className="font-poppins font-semibold text-navy text-sm mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-orange" />
                    Pick a time slot
                  </h3>
                  <div className="space-y-2">
                    {SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedSlot(slot.id)}
                        disabled={!slot.available}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border font-poppins font-medium text-sm transition-all duration-200 ${
                          selectedSlot === slot.id
                            ? "bg-orange/10 border-orange text-orange"
                            : slot.available
                            ? "bg-white border-cream-dark text-navy hover:border-orange/40"
                            : "bg-cream border-cream-dark text-navy/30 cursor-not-allowed"
                        }`}
                      >
                        <span className="flex items-center gap-2"><Clock size={13} />{slot.time}</span>
                        {!slot.available && <span className="text-xs text-navy/30">Full</span>}
                        {selectedSlot === slot.id && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 1: Choose child */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-nunito font-bold text-navy text-xl mb-1">Who is this for?</h2>
              <p className="font-lato text-navy/50 text-sm mb-4">Select the child attending the trial</p>

              <div className="space-y-3">
                {CHILDREN.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(child.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                      selectedChild === child.id
                        ? "bg-orange/5 border-orange shadow-sm"
                        : "bg-white border-cream-dark hover:border-orange/40"
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${child.gradient} rounded-xl flex items-center justify-center text-white font-nunito font-black text-xl`}>
                      {child.initial}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-poppins font-semibold text-navy text-base">{child.name}</p>
                      <p className="font-lato text-navy/50 text-sm">{child.age} years old</p>
                    </div>
                    {selectedChild === child.id && (
                      <div className="w-6 h-6 bg-orange rounded-full flex items-center justify-center">
                        <Check size={13} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Review & Pay */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-nunito font-bold text-navy text-xl mb-4">Review & Confirm</h2>

              {/* Receipt card */}
              <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm mb-4">
                <div className="bg-gradient-to-r from-[#1a3a1a] to-[#15803d] p-4 flex items-center gap-3">
                  <span className="text-3xl">🏏</span>
                  <div>
                    <p className="font-nunito font-bold text-white text-base">{TRIAL_INFO.academy}</p>
                    <p className="font-lato text-white/70 text-sm">Trial Session</p>
                  </div>
                </div>

                <div className="p-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between font-lato text-navy/70">
                    <span className="flex items-center gap-2"><Calendar size={13} />Date</span>
                    <span className="font-poppins font-semibold text-navy">
                      {selectedDayData ? `${selectedDayData.day}, ${selectedDayData.date} ${selectedDayData.month}` : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-lato text-navy/70">
                    <span className="flex items-center gap-2"><Clock size={13} />Time</span>
                    <span className="font-poppins font-semibold text-navy">{selectedSlotData?.time ?? "—"}</span>
                  </div>
                  <div className="flex items-center justify-between font-lato text-navy/70">
                    <span>Child</span>
                    <span className="font-poppins font-semibold text-navy">{selectedChildData?.name ?? "—"}</span>
                  </div>

                  <div className="border-t border-cream-dark pt-3 space-y-2">
                    <div className="flex items-center justify-between text-navy/60">
                      <span>Trial fee</span>
                      <span>₹{TRIAL_INFO.trialFee}</span>
                    </div>
                    <div className="flex items-center justify-between text-navy/60">
                      <span>GST (18%)</span>
                      <span>₹{gst}</span>
                    </div>
                    <div className="flex items-center justify-between font-poppins font-bold text-navy border-t border-cream-dark pt-2">
                      <span>Total</span>
                      <span className="font-bebas text-2xl">₹{total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="font-lato text-navy/40 text-xs text-center">
                By confirming, you agree to BabyCorp&apos;s refund policy. Payment via Razorpay.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-navy/20 text-navy/60 font-poppins font-medium text-sm hover:border-navy/30 hover:text-navy transition-all"
            >
              <ChevronLeft size={14} /> Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {step === 2 ? "Confirm & Pay" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
