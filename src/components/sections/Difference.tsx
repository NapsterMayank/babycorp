"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ROWS = [
  "Progress Tracking",
  "Verified Coaches",
  "Monthly Reports",
  "Skill Benchmarks",
  "WhatsApp Updates",
  "Easy Rescheduling",
];

export default function Difference() {
  return (
    <section className="bg-cream py-24 px-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Why BabyCorp
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-navy leading-tight">
            Why families choose BabyCorp
          </h2>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-cream-dark rounded-3xl overflow-hidden shadow-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-3">
            <div className="col-span-1 p-4 border-b border-cream-dark" />
            <div className="col-span-1 p-4 border-b border-l border-cream-dark bg-navy/5 text-center">
              <p className="font-poppins font-semibold text-navy/40 text-sm">Without BabyCorp</p>
            </div>
            <div className="col-span-1 p-4 border-b border-l border-cream-dark bg-gradient-to-r from-orange/10 to-orange/5 text-center">
              <p className="font-poppins font-bold text-orange text-sm">With BabyCorp</p>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`grid grid-cols-3 ${i < ROWS.length - 1 ? "border-b border-cream-dark" : ""}`}
            >
              <div className="col-span-1 p-4 flex items-center">
                <span className="font-poppins font-medium text-navy text-sm">{row}</span>
              </div>
              <div className="col-span-1 p-4 border-l border-cream-dark flex items-center justify-center bg-navy/2">
                <div className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center">
                  <X size={14} className="text-red-400" />
                </div>
              </div>
              <div className="col-span-1 p-4 border-l border-cream-dark flex items-center justify-center bg-orange/5">
                <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-green-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="font-nunito font-black text-2xl text-navy">
            Join{" "}
            <span className="bg-gradient-to-r from-orange to-gold bg-clip-text text-transparent">
              10,000+ families
            </span>{" "}
            who made the switch
          </p>
        </motion.div>
      </div>
    </section>
  );
}
