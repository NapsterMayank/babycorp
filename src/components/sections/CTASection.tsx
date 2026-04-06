"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";

const FLOATING = [
  { emoji: "♟️", style: { top: "15%", left: "5%" }, delay: 0 },
  { emoji: "🏊", style: { top: "25%", right: "8%" }, delay: 1 },
  { emoji: "🏏", style: { bottom: "25%", left: "8%" }, delay: 0.5 },
  { emoji: "🏸", style: { bottom: "15%", right: "5%" }, delay: 1.5 },
  { emoji: "🤸", style: { top: "55%", left: "15%" }, delay: 2 },
  { emoji: "🏆", style: { top: "40%", right: "15%" }, delay: 0.8 },
];

export default function CTASection() {
  return (
    <section className="relative bg-navy py-28 overflow-hidden">
      {/* Larger, more aggressive ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange/15 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-aqua/10 rounded-full blur-3xl animate-float-medium pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/8 rounded-full blur-3xl pointer-events-none" />

      {/* Floating emojis */}
      {FLOATING.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl opacity-[0.05] select-none pointer-events-none"
          style={item.style}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7 + i, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-gold/10 border border-gold/20 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-6"
        >
          Start Today — It&apos;s Free
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-nunito font-black text-4xl md:text-6xl text-white leading-[1.05] mb-6"
        >
          Your child&apos;s first trophy{" "}
          <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
            starts here.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-lato text-white/60 text-xl mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Join 10,000+ families. Start with a free trial. No commitment required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Link href="/discover">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold px-8 py-4 rounded-full hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300 text-base">
              <MapPin size={18} />
              Find Academies Near You
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/contact">
            <button className="flex items-center justify-center gap-2 border-2 border-white/20 text-white font-poppins font-semibold px-8 py-4 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-base">
              <MessageCircle size={18} />
              Talk to Us
            </button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-lato text-white/30 text-sm flex flex-wrap justify-center gap-4"
        >
          <span>No credit card needed</span>
          <span className="text-white/15">·</span>
          <span>Cancel anytime</span>
          <span className="text-white/15">·</span>
          <span>Free trial available</span>
        </motion.p>
      </div>
    </section>
  );
}
