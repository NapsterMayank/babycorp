"use client";

import { motion } from "framer-motion";
import { Target, Heart, Trophy } from "lucide-react";

const FOUNDERS = [
  {
    name: "Rohan Mehta",
    role: "Co-Founder & CEO",
    bio: "Former cricket coach, parent of two. Spent 5 years trying to find structured sports coaching for his kids and found nothing that worked.",
    emoji: "🏏",
    gradient: "from-orange to-gold",
  },
  {
    name: "Anjali Kapoor",
    role: "Co-Founder & CPO",
    bio: "Product leader with 10 years at top edtech companies. Built learning platforms used by 2 million Indian students.",
    emoji: "💡",
    gradient: "from-aqua to-blue-500",
  },
  {
    name: "Vikram Singh",
    role: "Co-Founder & CTO",
    bio: "Software engineer who coached youth swimming on weekends. Saw the gap in the market and quit his job to fix it.",
    emoji: "🏊",
    gradient: "from-purple-500 to-purple-400",
  },
];

const PLATFORM_STATS = [
  { value: "10,000+", label: "Champion Kids" },
  { value: "500+", label: "Verified Coaches" },
  { value: "312", label: "Partner Academies" },
  { value: "3", label: "Cities" },
];

export default function AboutPage() {
  return (
    <main className="pt-20 bg-cream">
      {/* Hero */}
      <section className="relative py-20 bg-navy overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-6xl text-white mb-5 leading-tight">
              We&apos;re parents,{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                too.
              </span>
            </h1>
            <p className="font-lato text-white/60 text-xl leading-relaxed max-w-2xl mx-auto">
              BabyCorp was born from frustration. As parents, we searched for months for quality, structured sports coaching for our kids. Everything we found was either random, untracked, or impossibly hard to navigate.
            </p>
            <p className="font-lato text-white/60 text-xl leading-relaxed max-w-2xl mx-auto mt-4">
              We didn&apos;t find it — so we built it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-orange to-gold rounded-3xl p-px mb-8">
              <div className="bg-white rounded-3xl px-8 py-6">
                <p className="font-nunito font-black text-2xl md:text-3xl bg-gradient-to-r from-orange to-gold bg-clip-text text-transparent leading-tight">
                  &ldquo;Every child in India deserves access to structured, expert sports coaching — regardless of which city, school, or income bracket they come from.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              { icon: Target, title: "Child-First", desc: "Every product decision starts with one question: is this good for the child?", color: "text-orange", bg: "bg-orange/10" },
              { icon: Heart, title: "Parent Empathy", desc: "We know what it's like to feel lost navigating sports options for your kids.", color: "text-gold", bg: "bg-gold/10" },
              { icon: Trophy, title: "Excellence Culture", desc: "We partner only with the best coaches. Verification is non-negotiable.", color: "text-aqua", bg: "bg-aqua/10" },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-cream-dark rounded-2xl p-6 text-center shadow-sm"
              >
                <div className={`w-12 h-12 ${val.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <val.icon size={22} className={val.color} />
                </div>
                <h3 className="font-nunito font-bold text-navy text-lg mb-2">{val.title}</h3>
                <p className="font-lato text-navy/60 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform stats */}
      <section className="relative py-16 bg-navy overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-nunito font-black text-3xl md:text-4xl text-white">
              What we&apos;ve built{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">so far</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PLATFORM_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <p className="font-bebas text-4xl text-orange tracking-wide">{stat.value}</p>
                <p className="font-lato text-white/50 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-nunito font-black text-3xl md:text-4xl text-navy">The team</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {FOUNDERS.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-cream-dark rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${founder.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                  {founder.emoji}
                </div>
                <h3 className="font-nunito font-bold text-navy text-lg">{founder.name}</h3>
                <p className="font-poppins font-semibold text-orange text-xs mb-3">{founder.role}</p>
                <p className="font-lato text-navy/60 text-sm leading-relaxed">{founder.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
