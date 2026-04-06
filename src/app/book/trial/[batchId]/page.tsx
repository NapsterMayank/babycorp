"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, Clock, ChevronLeft, ArrowRight, Plus, MessageCircle } from "lucide-react";
import Link from "next/link";
import StepIndicator from "@/components/ui/StepIndicator";

const STEPS = ["Select Slot", "Choose Child", "Review & Pay"];

const CHILDREN = [
  { id: "c1", name: "Aryan Sharma", age: 8, initial: "A", gradient: "from-orange to-gold" },
  { id: "c2", name: "Meera Sharma", age: 5, initial: "M", gradient: "from-aqua to-gold" },
];

// Generate next 14 days
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
      available: date.getDay() === 6 || date.getDay() === 0, // weekends only
      dateObj: date,
    });
  }
  return days;
};

const SLOTS = [
  { id: "s1", time: "7:00 AM – 8:00 AM", available: true },
  { id: "s2", time: "8:00 AM – 9:00 AM", available: true },
  { id: "s3", time: "9:00 AM – 10:00 AM", available: false },
];

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

  const TRIAL_FEE = 200;
  const GST = Math.round(TRIAL_FEE * 0.18);
  const TOTAL = TRIAL_FEE + GST;

  const handleConfirm = () => {
    console.log("Booking:", { selectedDayData, selectedSlotData, selectedChildData });
    setConfirmed(true);
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full text-center"
        >
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"
          >
            <Check size={40} className="text-white" strokeWidth={3} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-nunito font-black text-3xl text-white mb-2"
          >
            Trial Booked!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/50 font-lato text-sm mb-8"
          >
            Get ready to have an amazing session
          </motion.p>

          {/* Session card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-navy-light border border-white/10 rounded-2xl p-5 text-left mb-6 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">⚽</span>
              </div>
              <div>
                <p className="font-nunito font-bold text-white">Delhi Football Academy</p>
                <p className="text-white/40 font-lato text-xs">Football Trial Session</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div>
                <p className="text-white/40 font-poppins text-xs mb-0.5">Date</p>
                <p className="text-white font-poppins font-medium text-sm">
                  {selectedDayData ? `${selectedDayData.day}, ${selectedDayData.date} ${selectedDayData.month}` : "Sat, Apr 12"}
                </p>
              </div>
              <div>
                <p className="text-white/40 font-poppins text-xs mb-0.5">Time</p>
                <p className="text-white font-poppins font-medium text-sm">
                  {selectedSlotData?.time || "8:00 AM – 9:00 AM"}
                </p>
              </div>
              <div>
                <p className="text-white/40 font-poppins text-xs mb-0.5">Child</p>
                <p className="text-white font-poppins font-medium text-sm">
                  {selectedChildData?.name || "Aryan Sharma"}
                </p>
              </div>
              <div>
                <p className="text-white/40 font-poppins text-xs mb-0.5">Amount Paid</p>
                <p className="text-orange font-nunito font-bold text-sm">₹{TOTAL}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-white/40 font-lato text-xs justify-center">
              <MessageCircle size={14} className="text-[#25D366]" />
              You'll receive a WhatsApp reminder 1 hour before the session
            </div>

            <button className="w-full flex items-center justify-center gap-2 border border-white/10 text-white/70 font-poppins font-medium text-sm py-3 rounded-full hover:border-white/20 transition-all">
              <Calendar size={16} />
              Add to Calendar
            </button>

            <Link href="/discover">
              <button className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 mt-2">
                Explore More Academies
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy px-4 py-20">
      <div className="max-w-lg mx-auto">
        {/* Back link */}
        <Link href="/academy/dfa-001">
          <button className="flex items-center gap-1.5 text-white/50 font-poppins text-sm mb-6 hover:text-white transition-colors">
            <ChevronLeft size={16} /> Back to Academy
          </button>
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-nunito font-black text-2xl text-white mb-1"
        >
          Book Trial Session
        </motion.h1>
        <p className="text-white/40 font-lato text-sm mb-7">Delhi Football Academy — Sat & Sun Batch</p>

        {/* Step indicator */}
        <div className="mb-8">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        {/* Card */}
        <div className="bg-navy-light border border-white/10 rounded-3xl p-6 shadow-2xl shadow-navy/50 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 0: Select slot */}
            {step === 0 && (
              <motion.div
                key="step0"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-nunito font-bold text-white text-lg mb-4">Select a trial date</h2>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1 mb-5">
                  {days.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => day.available && setSelectedDay(i)}
                      disabled={!day.available}
                      className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all text-center ${
                        selectedDay === i
                          ? "bg-gradient-to-b from-orange to-orange-hover text-white shadow-lg shadow-orange/30"
                          : day.available
                          ? "bg-white/10 text-white hover:bg-white/15"
                          : "bg-white/3 text-white/20 cursor-not-allowed"
                      }`}
                    >
                      <span className="text-[10px] font-poppins">{day.day}</span>
                      <span className="text-sm font-nunito font-bold">{day.date}</span>
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <h3 className="font-poppins font-semibold text-white/70 text-sm mb-3">Available Slots</h3>
                <div className="space-y-2">
                  {SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        selectedSlot === slot.id
                          ? "border-orange bg-orange/20 text-orange"
                          : slot.available
                          ? "border-white/10 text-white hover:border-orange/30"
                          : "border-white/5 text-white/20 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={14} className={selectedSlot === slot.id ? "text-orange" : "text-white/40"} />
                        <span className="font-poppins font-medium text-sm">{slot.time}</span>
                      </div>
                      {!slot.available && (
                        <span className="text-xs font-poppins text-red-400/70">Full</span>
                      )}
                      {selectedSlot === slot.id && <Check size={14} className="text-orange" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Select child */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-nunito font-bold text-white text-lg mb-4">Who's attending?</h2>
                <div className="space-y-3 mb-5">
                  {CHILDREN.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setSelectedChild(child.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        selectedChild === child.id
                          ? "border-orange bg-orange/15 shadow-lg shadow-orange/10"
                          : "border-white/10 hover:border-orange/30"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${child.gradient} flex items-center justify-center text-white font-nunito font-black text-xl shadow-lg`}>
                        {child.initial}
                      </div>
                      <div className="text-left">
                        <p className="font-nunito font-bold text-white">{child.name}</p>
                        <p className="text-white/40 font-lato text-xs">{child.age} years old</p>
                      </div>
                      {selectedChild === child.id && (
                        <div className="ml-auto w-6 h-6 rounded-full bg-orange flex items-center justify-center">
                          <Check size={13} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center gap-2 border border-dashed border-white/20 text-white/50 font-poppins font-medium text-sm py-3 rounded-2xl hover:border-orange/40 hover:text-orange/70 transition-all">
                  <Plus size={16} /> Add another child
                </button>
              </motion.div>
            )}

            {/* Step 2: Review & Pay */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-nunito font-bold text-white text-lg mb-5">Review & Confirm</h2>

                {/* Summary card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">⚽</span>
                    </div>
                    <div>
                      <p className="font-nunito font-bold text-white text-sm">Delhi Football Academy</p>
                      <p className="text-white/40 font-lato text-xs">Sat & Sun, 8:00 AM – 9:00 AM Batch</p>
                    </div>
                  </div>

                  {[
                    { label: "Date", value: selectedDayData ? `${selectedDayData.day}, ${selectedDayData.date} ${selectedDayData.month}` : "Sat, Apr 12" },
                    { label: "Time", value: selectedSlotData?.time || "8:00 AM – 9:00 AM" },
                    { label: "Child", value: selectedChildData?.name || "Aryan Sharma" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm">
                      <span className="text-white/40 font-lato">{row.label}</span>
                      <span className="text-white font-poppins font-medium">{row.value}</span>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40 font-lato">Trial fee</span>
                      <span className="text-white font-poppins">₹{TRIAL_FEE}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40 font-lato">GST (18%)</span>
                      <span className="text-white font-poppins">₹{GST}</span>
                    </div>
                    <div className="flex justify-between text-base pt-1 border-t border-white/10">
                      <span className="text-white font-poppins font-semibold">Total</span>
                      <span className="text-orange font-nunito font-black text-xl">₹{TOTAL}</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/30 font-lato text-xs text-center mb-4">
                  Secure payment via Razorpay. 100% refundable if cancelled 24hrs before.
                </p>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold py-4 rounded-full hover:shadow-xl hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Pay ₹{TOTAL} via Razorpay
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-white/10 text-white/60 font-poppins font-medium text-sm hover:border-white/20 hover:text-white transition-all"
              >
                <ChevronLeft size={14} /> Back
              </button>
            )}
            {step < 2 && (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continue <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
