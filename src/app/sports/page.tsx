"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const sports = [
  {
    name: "Swimming",
    emoji: "🏊",
    age: "6 months+",
    color: "from-[#006994] to-[#00C2CB]",
    bgLight: "bg-aqua/5",
    description:
      "Our infant aquatics program is designed by internationally certified swimming coaches. Starting from 6 months, your baby develops water confidence, breath control, and fundamental swimming movements.",
    curriculum: [
      "6-12 months: Water familiarization, parent-assisted floating, breath control",
      "12-24 months: Submersion, assisted propulsion, back floating",
      "2-3 years: Independent kicking, arm strokes, pool safety",
      "3-5 years: Freestyle basics, backstroke introduction, endurance building",
      "5-7 years: Competitive stroke techniques, diving, race training",
    ],
    benefits: [
      "Drowning prevention — the #1 safety skill",
      "Full-body muscle development",
      "Improved cardiovascular health",
      "Enhanced lung capacity",
      "Better sleep patterns",
      "Cognitive development through sensory stimulation",
    ],
  },
  {
    name: "Gymnastics",
    emoji: "🤸",
    age: "18 months+",
    color: "from-[#6B2FA0] to-[#8E44AD]",
    bgLight: "bg-purple-50",
    description:
      "Our gymnastics program focuses on developing spatial awareness, balance, flexibility, and body control. Starting from 18 months, children learn through structured play in a safe, padded environment.",
    curriculum: [
      "18m-2 years: Tumbling, rolling, basic balance beam walks",
      "2-3 years: Forward rolls, cartwheel prep, hanging exercises",
      "3-4 years: Cartwheel, handstand basics, balance sequences",
      "4-5 years: Back rolls, handstand walking, vault introduction",
      "5-7 years: Competitive routines, apparatus training, team exercises",
    ],
    benefits: [
      "Exceptional body awareness and control",
      "Flexibility that lasts a lifetime",
      "Core strength development",
      "Improved coordination and agility",
      "Discipline and focus",
      "Injury prevention in other sports",
    ],
  },
  {
    name: "Chess",
    emoji: "♟️",
    age: "3 years+",
    color: "from-[#3E2723] to-[#4E342E]",
    bgLight: "bg-amber-50",
    description:
      "Chess is the ultimate brain sport. Our program teaches strategic thinking, patience, and problem-solving from age 3. Inspired by champions like Gukesh, we start building chess minds earlier.",
    curriculum: [
      "3-4 years: Piece recognition, board setup, basic moves",
      "4-5 years: Capture rules, check, simple patterns",
      "5-6 years: Opening principles, tactical puzzles, mini-games",
      "6-7 years: Full games, tournament preparation, online practice",
    ],
    benefits: [
      "Critical thinking and problem-solving",
      "Improved concentration and patience",
      "Pattern recognition abilities",
      "Mathematical thinking",
      "Emotional regulation (handling wins and losses)",
      "Academic performance improvement",
    ],
  },
  {
    name: "Badminton",
    emoji: "🏸",
    age: "4 years+",
    color: "from-[#2E7D32] to-[#43A047]",
    bgLight: "bg-green-50",
    description:
      "Inspired by PV Sindhu's journey, our badminton program builds hand-eye coordination, agility, and competitive spirit. Starting from age 4 with modified equipment for small hands.",
    curriculum: [
      "4-5 years: Grip basics, hand-eye coordination games, shuttle tracking",
      "5-6 years: Forehand/backhand basics, serving, court movement",
      "6-7 years: Rally skills, match play, fitness drills",
    ],
    benefits: [
      "Exceptional hand-eye coordination",
      "Reflexes and reaction speed",
      "Cardiovascular endurance",
      "Agility and footwork",
      "Social skills through doubles play",
      "Competitive mindset development",
    ],
  },
  {
    name: "Table Tennis",
    emoji: "🏓",
    age: "4 years+",
    color: "from-[#C62828] to-[#E53935]",
    bgLight: "bg-red-50",
    description:
      "India's fastest growing Olympic sport. Table Tennis develops lightning-fast reflexes, mental sharpness, and is accessible from a young age. Our program uses child-sized equipment and tables.",
    curriculum: [
      "4-5 years: Paddle grip, ball bouncing, basic forehand",
      "5-6 years: Backhand basics, serving, rally games",
      "6-7 years: Spin techniques, match play, tournament prep",
    ],
    benefits: [
      "Fastest sport for reaction time development",
      "Hand-eye coordination at elite level",
      "Mental sharpness and quick decision making",
      "Low injury risk — joint friendly",
      "Can be practiced anywhere",
      "Builds competitive resilience",
    ],
  },
];

export default function SportsPage() {
  return (
    <main className="pt-20 bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="font-nunito font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Our <span className="gradient-text">Sports Programs</span>
            </h1>
            <p className="text-white/60 font-poppins text-lg max-w-2xl mx-auto">
              Five disciplines, one complete champion. Each sport is taught by
              certified coaches using age-appropriate methodologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sports */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {sports.map((sport, i) => (
          <SportDetail key={sport.name} sport={sport} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section className="py-16 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-nunito font-bold text-3xl text-white mb-4">
            Ready to Start Your Child&apos;s Journey?
          </h2>
          <p className="text-white/60 mb-8 font-lato">
            Every champion starts somewhere. Start here.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold px-10 py-4 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Enroll Your Champion
          </Link>
        </div>
      </section>
    </main>
  );
}

function SportDetail({
  sport,
  index,
}: {
  sport: (typeof sports)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`${sport.bgLight} rounded-3xl p-8 md:p-12`}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{sport.emoji}</span>
        <div>
          <h2 className="font-nunito font-black text-3xl md:text-4xl text-navy">
            {sport.name}
          </h2>
          <span className="text-orange font-poppins font-semibold text-sm">
            Starting age: {sport.age}
          </span>
        </div>
      </div>

      <p className="text-navy/70 font-lato text-base leading-relaxed mb-8">
        {sport.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Curriculum */}
        <div>
          <h3 className="font-poppins font-bold text-lg text-navy mb-4">
            📋 Curriculum Path
          </h3>
          <ul className="space-y-3">
            {sport.curriculum.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-3 text-navy/70 font-lato text-sm"
              >
                <div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${sport.color} mt-1.5 flex-shrink-0`}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="font-poppins font-bold text-lg text-navy mb-4">
            ✅ Key Benefits
          </h3>
          <ul className="space-y-3">
            {sport.benefits.map((benefit, j) => (
              <li
                key={j}
                className="flex items-start gap-3 text-navy/70 font-lato text-sm"
              >
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
