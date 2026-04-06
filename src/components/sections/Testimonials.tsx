"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Aryan went from being scared of water to swimming 50 meters in just 3 months. The monthly progress reports keep me hooked — I can actually see him improving week by week!",
    name: "Priya Sharma",
    location: "Delhi",
    sport: "Swimming 🏊",
    highlight: false,
  },
  {
    quote: "Best chess coaching for kids in Delhi. My daughter earned 4 badges in her very first month. She's absolutely obsessed — she practices at home now without being asked!",
    name: "Vikram Nair",
    location: "Gurgaon",
    sport: "Chess ♟️",
    highlight: true,
  },
  {
    quote: "The WhatsApp reminders and easy rescheduling make it SO much easier to manage between school and coaching. Finally a platform that understands busy Indian parents.",
    name: "Sunita Reddy",
    location: "Noida",
    sport: "Cricket 🏏",
    highlight: false,
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-navy py-24 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-block bg-gold/10 border border-gold/20 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Parent Stories
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-white leading-tight">
            What parents are{" "}
            <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
              saying
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className={`bg-navy-light rounded-3xl p-8 flex flex-col gap-5 transition-all duration-300 ${
                t.highlight
                  ? "border border-gold/30 shadow-lg shadow-gold/10"
                  : "border border-white/10"
              }`}
            >
              {/* Quote mark */}
              <div className="text-6xl font-serif leading-none text-gold/20 font-black select-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 -mt-8">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={16} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-lato text-white/75 text-base leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-lg shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-poppins font-semibold text-white text-sm">{t.name}</p>
                  <p className="font-lato text-white/40 text-xs">{t.location} · {t.sport}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
