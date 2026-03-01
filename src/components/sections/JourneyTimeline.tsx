"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

const milestones = [
  {
    age: "Birth → 6 months",
    title: "Swimming Begins",
    description: "Water familiarization, parent-baby swim sessions, building comfort and trust in water.",
    emoji: "🏊",
    color: "bg-aqua",
  },
  {
    age: "6m → 18 months",
    title: "Gymnastics Foundations",
    description: "Tumbling, rolling, balance activities. Building core motor skills through play.",
    emoji: "🤸",
    color: "bg-purple-500",
  },
  {
    age: "18m → 3 years",
    title: "Physical Conditioning",
    description: "Rhythm, coordination drills. Structured play that builds athletic foundations.",
    emoji: "💪",
    color: "bg-orange",
  },
  {
    age: "3 → 5 years",
    title: "Chess + Badminton",
    description: "Mental + physical sports introduced. Strategy meets agility.",
    emoji: "♟️",
    color: "bg-gold",
  },
  {
    age: "5 → 7 years",
    title: "Full Sports Program",
    description: "Table Tennis added. Your child is now training across 5 disciplines.",
    emoji: "🏓",
    color: "bg-red-500",
  },
  {
    age: "7 years",
    title: "Top 1% of India",
    description: "Your child is already among the most physically developed kids in the country.",
    emoji: "🏆",
    color: "bg-gradient-to-r from-gold to-orange",
  },
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-20 md:py-32 bg-cream overflow-hidden" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block bg-gold/20 text-navy font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            The Journey
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
            The BabyCorp{" "}
            <span className="gradient-text">Championship Pathway</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line background */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-navy/10" />
          {/* Animated gold line */}
          <motion.div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-gold to-orange rounded-full"
            style={{ height: lineHeight }}
          />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, i) => (
              <TimelineItem key={i} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8`}
    >
      {/* Dot on the line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, type: "spring" }}
        className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 ${milestone.color} rounded-full z-10 flex items-center justify-center text-sm shadow-lg`}
      >
        {milestone.emoji}
      </motion.div>

      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-16" : "md:pl-16"} pl-16 md:pl-0`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-navy/5 border border-navy/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <span className="text-xs font-poppins font-semibold text-orange uppercase tracking-wider">
            {milestone.age}
          </span>
          <h3 className="font-nunito font-bold text-xl text-navy mt-2 mb-2">
            {milestone.title}
          </h3>
          <p className="text-navy/60 font-lato text-sm leading-relaxed">
            {milestone.description}
          </p>
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}
