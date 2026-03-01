"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    childAge: "1 year old",
    quote:
      "My son started swimming at 7 months. I was terrified at first, but the coaches were so patient and professional. Now at 1, he's completely comfortable in water. Best decision we ever made!",
    rating: 5,
    avatar: "PS",
    avatarColor: "from-aqua to-aqua/70",
  },
  {
    name: "Rahul Krishnamurthy",
    city: "Bengaluru",
    childAge: "3 years old",
    quote:
      "The multi-sport approach is genius. My daughter does gymnastics and is starting chess. The nutrition guidance has been a game-changer for her eating habits too.",
    rating: 5,
    avatar: "RK",
    avatarColor: "from-orange to-gold",
  },
  {
    name: "Aisha Khan",
    city: "Delhi",
    childAge: "2 years old",
    quote:
      "What impressed me most is the safety protocols. As a doctor, I'm very particular about hygiene — BabyCorp exceeded my expectations. The monthly progress reports are incredibly detailed.",
    rating: 5,
    avatar: "AK",
    avatarColor: "from-purple-500 to-pink-500",
  },
  {
    name: "Vikram Patel",
    city: "Hyderabad",
    childAge: "4 years old",
    quote:
      "My son plays badminton and chess now. The transformation in his focus and discipline is remarkable. His school teachers have noticed the difference too.",
    rating: 5,
    avatar: "VP",
    avatarColor: "from-gold to-orange",
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative py-20 md:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-orange/10 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
            Parents Are Already{" "}
            <span className="gradient-text">Talking.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-navy/5 border border-navy/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 text-navy/5" size={40} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>

              <p className="text-navy/70 font-lato text-base leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center`}
                >
                  <span className="text-white font-poppins font-bold text-sm">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-poppins font-semibold text-navy text-sm">
                    {t.name}
                  </p>
                  <p className="text-navy/50 text-xs font-lato">
                    {t.city} • Child age: {t.childAge}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
