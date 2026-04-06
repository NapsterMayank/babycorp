"use client";

import { motion } from "framer-motion";
import { Search, BarChart3, Calendar, FileText, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    iconBg: "bg-orange/20",
    iconColor: "text-orange",
    title: "Discover Verified Academies",
    body: "Find certified coaches near you across Chess, Swimming, Cricket, Badminton and Gymnastics.",
  },
  {
    icon: BarChart3,
    iconBg: "bg-aqua/20",
    iconColor: "text-aqua",
    title: "Track Real Skill Progress",
    body: "Monthly assessments with skill benchmarks — not just attendance counts.",
  },
  {
    icon: Calendar,
    iconBg: "bg-gold/20",
    iconColor: "text-gold",
    title: "Book Trials Instantly",
    body: "Free or paid trials in 2 taps. No calls, no waiting, no friction.",
  },
  {
    icon: FileText,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    title: "Get Monthly Reports",
    body: "Branded PDF reports emailed automatically every month. Share with pride.",
  },
];

const FLOW_STEPS = ["Sign Up", "Find Academy", "Enroll", "Track Progress"];

export default function Solution() {
  return (
    <section className="relative bg-navy py-24 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Introducing BabyCorp
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-white leading-tight max-w-3xl">
            One platform. Every sport.{" "}
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
              Real progress.
            </span>
          </h2>
          <p className="font-lato text-white/50 text-lg mt-4 max-w-xl leading-relaxed">
            Everything a parent needs to give their child the best start in sports — in one place.
          </p>
        </motion.div>

        {/* Feature cards 2x2 */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-navy-light border border-white/10 rounded-2xl p-6 flex gap-5 items-start group transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <feature.icon size={22} className={feature.iconColor} />
              </div>
              <div>
                <h3 className="font-nunito font-bold text-white text-lg mb-1">{feature.title}</h3>
                <p className="font-lato text-white/55 text-base leading-relaxed">{feature.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {FLOW_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="w-5 h-5 bg-gradient-to-br from-orange to-orange-hover rounded-full flex items-center justify-center text-white font-bebas text-xs">
                  {i + 1}
                </span>
                <span className="font-poppins font-medium text-white/80 text-sm">{step}</span>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <ArrowRight size={16} className="text-orange/60 hidden sm:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
