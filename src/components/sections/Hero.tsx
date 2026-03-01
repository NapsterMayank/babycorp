"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Play, Star, TrendingUp, Trophy, Waves } from "lucide-react";
import HowItWorksModal from "@/components/ui/HowItWorksModal";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  return (
    <section className="relative min-h-screen bg-navy overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-aqua/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-orange/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />

      {/* Subtle sport icons in background */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-32 text-white/[0.06] hidden lg:block"
      >
        <Waves size={80} />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-16 text-white/[0.04] hidden lg:block"
      >
        <Trophy size={60} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 lg:pt-32 lg:pb-0 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-white/80 font-poppins text-xs sm:text-sm font-medium tracking-wide uppercase">
                India&apos;s First Premium Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-nunito font-black text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] mb-6"
            >
              <span className="text-white">Meet your</span>
              <br />
              <span className="text-white">future</span>
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">champion.</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M2 8C50 2 100 4 150 6C200 8 250 4 298 8"
                    stroke="#FFD700"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <p className="text-white/80 font-poppins font-semibold text-base sm:text-lg mb-1">
                We Don&apos;t Wait for Champions. We Build Them.
              </p>
              <p className="text-white/50 font-lato text-sm sm:text-base max-w-md">
                The ultimate early childhood sports development platform.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-orange/25 hover:shadow-xl hover:shadow-orange/35 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Enroll Your Champion
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex items-center gap-3 bg-white/[0.07] backdrop-blur-sm border border-white/15 text-white font-poppins font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-white/[0.12] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Play size={14} className="text-white ml-0.5" fill="white" />
                </div>
                See How It Works
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-3">
                {["from-orange to-gold", "from-aqua to-aqua/70", "from-purple-500 to-pink-500"].map(
                  (gradient, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border-2 border-navy flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {["PS", "RK", "AK"][i]}
                      </span>
                    </div>
                  )
                )}
                <div className="w-9 h-9 rounded-full bg-navy-light border-2 border-navy flex items-center justify-center">
                  <span className="text-white/70 text-[10px] font-poppins font-bold">
                    +2k
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-gold fill-gold"
                    />
                  ))}
                </div>
                <span className="text-white/40 text-xs font-lato mt-0.5">
                  Trusted by 2,000+ parents
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Boss Baby Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main image container */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-b from-aqua/15 via-transparent to-transparent rounded-3xl blur-2xl scale-110" />

              {/* Image card */}
              <div className="relative bg-gradient-to-b from-white/[0.06] to-transparent backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                <Image
                  src="/images/boss-baby-hero.png"
                  alt="BabyCorp Champion Baby"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating Badge — Strategy Master Class */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="absolute top-16 -left-4 sm:top-20 sm:-left-8"
              >
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-navy-light/90 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                >
                  <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center">
                    <Trophy size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-poppins font-semibold uppercase tracking-wider">
                      Champion
                    </p>
                    <p className="text-white font-poppins font-bold text-sm">
                      Sports Academy
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Badge — Potential Unlocked */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="absolute bottom-24 -right-4 sm:bottom-28 sm:-right-8"
              >
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-navy-light/90 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl"
                >
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <TrendingUp size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] font-poppins font-semibold uppercase tracking-wider">
                      Potential
                    </p>
                    <p className="text-white font-poppins font-bold text-sm">
                      Unlocked
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Press Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.02]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
            {["TechCrunch", "Forbes", "Bloomberg", "Vogue Kids", "YourStory"].map(
              (name) => (
                <span
                  key={name}
                  className="text-white/20 font-poppins font-semibold text-sm sm:text-base tracking-wide"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
      {/* How It Works Modal */}
      <HowItWorksModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
