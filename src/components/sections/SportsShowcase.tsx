"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import Image from "next/image";

const sports = [
  {
    name: "Swimming",
    emoji: "🏊",
    image: "/images/baby-swimming.png",
    gradient: "from-[#006994] via-[#0891b2] to-[#00C2CB]",
    stat: '"India has only 0.2% swimmers. Your child will be in the 1%."',
    age: "6 Months+",
    benefits: "Water safety, Motor skills, Confidence",
    floatItems: [
      { emoji: "💧", x: "10%", y: "20%", delay: 0, size: 28 },
      { emoji: "🌊", x: "85%", y: "15%", delay: 0.5, size: 24 },
      { emoji: "🐠", x: "15%", y: "75%", delay: 1, size: 20 },
      { emoji: "💦", x: "80%", y: "70%", delay: 1.5, size: 22 },
    ],
  },
  {
    name: "Gymnastics",
    emoji: "🤸",
    image: "/images/baby-gymnastics.png",
    gradient: "from-[#6B2FA0] via-[#7c3aed] to-[#8B5CF6]",
    stat: '"Flexibility built before age 5 lasts a lifetime."',
    age: "18 Months+",
    benefits: "Balance, Flexibility, Body awareness",
    floatItems: [
      { emoji: "⭐", x: "12%", y: "25%", delay: 0.3, size: 24 },
      { emoji: "✨", x: "88%", y: "18%", delay: 0.8, size: 20 },
      { emoji: "🎀", x: "8%", y: "70%", delay: 0.2, size: 22 },
      { emoji: "💫", x: "82%", y: "72%", delay: 1.2, size: 26 },
    ],
  },
  {
    name: "Chess",
    emoji: "♟️",
    image: "/images/baby-chess.png",
    gradient: "from-[#3E2723] via-[#5D4037] to-[#6D4C41]",
    stat: '"Gukesh became the youngest world champion. He started at age 3."',
    age: "3 Years+",
    benefits: "Focus, Strategy, Problem solving",
    floatItems: [
      { emoji: "♔", x: "10%", y: "22%", delay: 0.4, size: 28 },
      { emoji: "🧠", x: "86%", y: "20%", delay: 0, size: 24 },
      { emoji: "♛", x: "12%", y: "72%", delay: 0.7, size: 22 },
      { emoji: "🏆", x: "84%", y: "68%", delay: 1, size: 20 },
    ],
  },
  {
    name: "Badminton",
    emoji: "🏸",
    image: "/images/baby-badminton.png",
    gradient: "from-[#166534] via-[#15803d] to-[#22c55e]",
    stat: '"PV Sindhu\'s story starts here — at BabyCorp."',
    age: "4 Years+",
    benefits: "Coordination, Reflexes, Stamina",
    floatItems: [
      { emoji: "🏸", x: "8%", y: "18%", delay: 0.2, size: 24 },
      { emoji: "💨", x: "87%", y: "22%", delay: 0.6, size: 20 },
      { emoji: "🎯", x: "10%", y: "68%", delay: 0.9, size: 22 },
      { emoji: "⚡", x: "85%", y: "74%", delay: 1.3, size: 26 },
    ],
  },
  {
    name: "Table Tennis",
    emoji: "🏓",
    image: "/images/baby-tabletennis.png",
    gradient: "from-[#991b1b] via-[#dc2626] to-[#ef4444]",
    stat: '"India\'s fastest-growing Olympic sport. Your child is the future."',
    age: "4 Years+",
    benefits: "Reaction speed, Focus, Agility",
    floatItems: [
      { emoji: "🏓", x: "10%", y: "20%", delay: 0, size: 26 },
      { emoji: "🔥", x: "88%", y: "16%", delay: 0.4, size: 22 },
      { emoji: "⚡", x: "12%", y: "72%", delay: 0.8, size: 20 },
      { emoji: "💥", x: "84%", y: "70%", delay: 1.1, size: 24 },
    ],
  },
];

export default function SportsShowcase() {
  return (
    <section id="sports" className="py-16 md:py-24 bg-cream">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-orange/10 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy mb-4">
            Five Sports.{" "}
            <span className="gradient-text">One Complete Champion.</span>
          </h2>
          <p className="text-navy/50 font-lato text-base md:text-lg max-w-2xl mx-auto">
            Each sport is carefully chosen to develop specific physical and
            cognitive abilities during the critical early years.
          </p>
        </motion.div>
      </div>

      {/* Sport Panels */}
      <div className="space-y-8 md:space-y-12">
        {sports.map((sport, i) => (
          <SportPanel key={sport.name} sport={sport} index={i} />
        ))}
      </div>
    </section>
  );
}

function SportPanel({
  sport,
  index,
}: {
  sport: (typeof sports)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isEven = index % 2 === 0;

  return (
    <div ref={panelRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${sport.gradient} p-8 md:p-12 lg:p-16 min-h-[420px] md:min-h-[480px]`}
      >
        {/* Floating emoji particles */}
        {sport.floatItems.map((item, j) => (
          <motion.div
            key={j}
            className="absolute pointer-events-none z-10 hidden md:block"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [-8, 8, -8],
              rotate: [-5, 5, -5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + j,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <span style={{ fontSize: item.size }}>{item.emoji}</span>
          </motion.div>
        ))}

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none" />

        {/* Content grid */}
        <div
          className={`relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            !isEven ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Text side */}
          <div className={!isEven ? "lg:[direction:ltr]" : ""}>
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">{sport.emoji}</span>
                <h3 className="font-nunito font-black text-3xl md:text-4xl text-white">
                  {sport.name}
                </h3>
              </div>

              <p className="text-white/85 font-lato text-base md:text-lg leading-relaxed italic mb-8 max-w-md">
                {sport.stat}
              </p>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 max-w-md"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/50 font-poppins text-[10px] uppercase tracking-widest mb-1">
                      Starting Age
                    </p>
                    <p className="text-white font-bebas text-2xl">
                      {sport.age}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/50 font-poppins text-[10px] uppercase tracking-widest mb-1">
                      Key Benefits
                    </p>
                    <p className="text-white/90 font-lato text-sm leading-relaxed">
                      {sport.benefits}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Image side */}
          <div className={`flex justify-center ${!isEven ? "lg:[direction:ltr]" : ""}`}>
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              {/* Soft glow behind image */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-75" />

              {/* Image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {/* Animated ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border-2 border-dashed border-white/15 rounded-full"
                />

                {/* Image */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image
                    src={sport.image}
                    alt={`BabyCorp ${sport.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                </div>

                {/* Small floating accent */}
                <motion.div
                  animate={{
                    y: [-6, 6, -6],
                    x: [-4, 4, -4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg"
                >
                  <span className="text-lg">{sport.emoji}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
