"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const PAIN_POINTS = [
  {
    icon: "🎲",
    title: "Random Coaching",
    body: "No curriculum, no structure. Just show up and hope. Your child's development is left to chance.",
  },
  {
    icon: "👁️",
    title: "Zero Progress Visibility",
    body: "You pay monthly but never know if your child is improving. No reports. No benchmarks. Just silence.",
  },
  {
    icon: "⏰",
    title: "Wasted Potential",
    body: "The critical years between 3–10 pass quickly. Talent goes undiscovered. Opportunities close forever.",
  },
];

export default function Problem() {
  return (
    <section className="bg-cream py-24 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            The Problem
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-navy leading-tight max-w-2xl">
            Every parent has been there...
          </h2>
          <p className="font-lato text-navy/50 text-lg mt-4 max-w-xl leading-relaxed">
            India has 350 million children under 14. Less than 3% receive structured sports coaching. Here&apos;s why.
          </p>
        </motion.div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {PAIN_POINTS.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
              className="bg-white border border-cream-dark rounded-2xl p-6 border-l-4 border-l-orange shadow-sm transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="font-nunito font-black text-navy text-xl mb-2">{point.title}</h3>
              <p className="font-lato text-navy/60 text-base leading-relaxed">{point.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="font-poppins font-semibold text-orange text-lg">There&apos;s a better way</p>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={22} className="text-orange" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
