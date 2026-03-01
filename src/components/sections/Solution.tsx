"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Dumbbell, Target, Heart } from "lucide-react";

const pillars = [
  {
    icon: Dumbbell,
    title: "Daily Physical Training",
    description:
      "Swimming + Gymnastics as a daily base. Building strength, flexibility, and water safety from 6 months old.",
    color: "from-aqua to-aqua/70",
    iconBg: "bg-aqua/15",
    iconColor: "text-aqua",
  },
  {
    icon: Target,
    title: "Sport Specialization",
    description:
      "Chess, Badminton & Table Tennis from age 3+. Multi-sport exposure builds well-rounded athletes.",
    color: "from-orange to-gold",
    iconBg: "bg-orange/15",
    iconColor: "text-orange",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description:
      "Certified nutritionists, monthly progress tracking, and a parent dashboard to follow your champion's journey.",
    color: "from-gold to-orange",
    iconBg: "bg-gold/15",
    iconColor: "text-gold",
  },
];

export default function Solution() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-20 md:py-32 bg-navy overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange/5 to-transparent rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gold/10 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            The Solution
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
            We&apos;re Not a Daycare. We&apos;re Not a School.
          </h2>
          <p className="font-nunito font-black text-2xl md:text-3xl gradient-text">
            We&apos;re a Championship Factory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group"
              >
                <div className="glass-card p-8 h-full hover:bg-white/12 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange/10 transition-all duration-500">
                  {/* Gradient bar at top */}
                  <div
                    className={`w-12 h-1 rounded-full bg-gradient-to-r ${pillar.color} mb-6 group-hover:w-full transition-all duration-500`}
                  />

                  <div
                    className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-5`}
                  >
                    <Icon className={pillar.iconColor} size={28} />
                  </div>

                  <h3 className="font-poppins font-bold text-xl text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 font-lato leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
