"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SCHOOLS = [
  "DPS R.K. Puram",
  "Ryan International",
  "Amity Saket",
  "Modern School, Barakhamba",
  "Sanskriti School",
  "Bal Bharati",
  "G.D. Goenka",
  "Mount Abu Public School",
  "DPS Vasant Kunj",
  "Heritage Xperiential",
  "Springdales School",
  "Mother's International",
];

export default function Partners() {
  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            School Partners
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-navy leading-tight">
            Trusted by Delhi&apos;s top schools
          </h2>
          <p className="font-lato text-navy/50 text-lg mt-4 max-w-xl leading-relaxed">
            Our partner schools integrate BabyCorp sports coaching on campus — directly in the school schedule.
          </p>
        </motion.div>
      </div>

      {/* Marquee — full bleed */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee shrink-0">
            {[...SCHOOLS, ...SCHOOLS].map((school, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-navy text-white rounded-full px-5 py-2.5 font-poppins text-sm font-medium shrink-0 whitespace-nowrap"
              >
                <span>🏫</span>
                {school}
              </div>
            ))}
          </div>
          <div className="flex gap-4 animate-marquee shrink-0" aria-hidden>
            {[...SCHOOLS, ...SCHOOLS].map((school, i) => (
              <div
                key={`dup-${i}`}
                className="flex items-center gap-2 bg-navy text-white rounded-full px-5 py-2.5 font-poppins text-sm font-medium shrink-0 whitespace-nowrap"
              >
                <span>🏫</span>
                {school}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/schools" className="flex items-center gap-2 text-orange font-poppins font-semibold hover:text-orange-hover transition-colors">
            View all partner schools
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
