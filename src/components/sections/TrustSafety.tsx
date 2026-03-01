"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Users,
  Sparkles,
  BadgeCheck,
  Heart,
  Eye,
} from "lucide-react";

const safetyFeatures = [
  {
    icon: BadgeCheck,
    title: "Certified Coaches",
    description: "Every coach is qualified with international certifications and undergoes thorough background verification.",
  },
  {
    icon: Users,
    title: "Safe Ratios",
    description: "Strict child-to-coach ratios — never more than 4 children per coach for water activities.",
  },
  {
    icon: Sparkles,
    title: "Hygienic Facilities",
    description: "Hospital-grade sanitation protocols. UV-treated pools. Cleaned and inspected before every session.",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Comprehensive insurance for every enrolled child, covering all activities and sessions.",
  },
  {
    icon: Eye,
    title: "Parent Present Policy",
    description: "For children under 18 months, a parent must be present during all sessions. Always welcome to observe.",
  },
  {
    icon: Heart,
    title: "First Aid Ready",
    description: "Trained first-aid personnel on-site at every location. AED machines and emergency protocols in place.",
  },
];

export default function TrustSafety() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="safety" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-green-100 text-green-700 font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Safety First
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-4">
            Your Baby&apos;s Safety is{" "}
            <span className="text-green-600">Our First Championship.</span>
          </h2>
          <p className="text-navy/60 font-poppins text-lg max-w-2xl mx-auto">
            We know trust is earned. Here&apos;s how we earn yours, every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-cream rounded-2xl p-6 border border-navy/5 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-green-600" size={24} />
                </div>
                <h3 className="font-poppins font-semibold text-lg text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-navy/60 font-lato text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
