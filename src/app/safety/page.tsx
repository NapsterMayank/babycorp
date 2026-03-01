"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Shield,
  Users,
  Sparkles,
  BadgeCheck,
  Heart,
  Eye,
  AlertTriangle,
  Thermometer,
  Video,
  Stethoscope,
} from "lucide-react";

const protocols = [
  {
    icon: BadgeCheck,
    title: "Coach Certification",
    description:
      "Every coach holds internationally recognized certifications — STA (Swimming Teachers' Association) for aquatics, FIG-recognized qualifications for gymnastics, and FIDE-certified for chess instruction.",
  },
  {
    icon: Users,
    title: "Strict Child-to-Coach Ratios",
    description:
      "Swimming (under 2): 3:1 ratio with parent present. Land sports: 5:1 ratio. Chess: 6:1 ratio. We never exceed these limits, regardless of demand.",
  },
  {
    icon: Sparkles,
    title: "Hospital-Grade Hygiene",
    description:
      "UV-treated pool water tested hourly. All equipment sanitized between sessions. Surfaces cleaned with medical-grade disinfectants. Temperature and humidity controlled.",
  },
  {
    icon: Shield,
    title: "Comprehensive Insurance",
    description:
      "Every enrolled child is covered by comprehensive insurance that includes accident coverage during sessions, transit to/from facility, and any BabyCorp-organized events.",
  },
  {
    icon: Eye,
    title: "Parent Observation Policy",
    description:
      "Parents of children under 18 months must be present during all sessions. For older children, parents are always welcome to observe from designated viewing areas with full visibility.",
  },
  {
    icon: Stethoscope,
    title: "Medical Staff On-Site",
    description:
      "Trained first-aid personnel present at every session. AED machines installed at each location. Emergency response plan drilled monthly. Pediatrician on-call during operating hours.",
  },
  {
    icon: AlertTriangle,
    title: "Background Verification",
    description:
      "Every staff member — from coaches to support staff — undergoes thorough background checks including police verification, reference checks, and periodic re-verification.",
  },
  {
    icon: Thermometer,
    title: "Pool Safety Standards",
    description:
      "Water temperature maintained at 30-32°C for infants. Anti-slip surfaces around all water areas. Depth markers clearly visible. Pool alarms and safety covers installed.",
  },
  {
    icon: Video,
    title: "CCTV Monitoring",
    description:
      "All training areas are monitored by CCTV. Footage is stored for 30 days. Parents can request access to recordings of their child's sessions at any time.",
  },
  {
    icon: Heart,
    title: "Child Wellbeing First",
    description:
      "If a child is unwell, tired, or simply not in the mood — we stop. No session is ever forced. Our coaches are trained to read children's comfort levels and respond with empathy.",
  },
];

export default function SafetyPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="pt-20 bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-navy to-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              <Shield size={16} />
              Safety First. Always.
            </div>
            <h1 className="font-nunito font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Your Baby&apos;s Safety is{" "}
              <span className="text-green-400">Our First Championship</span>
            </h1>
            <p className="text-white/60 font-poppins text-lg max-w-3xl mx-auto">
              We understand that trusting someone with your child is the biggest
              decision a parent can make. Here&apos;s every measure we take to
              earn that trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Protocols Grid */}
      <section className="py-16 md:py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protocols.map((protocol, i) => {
              const Icon = protocol.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-8 border border-navy/5 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-lg text-navy mb-2">
                        {protocol.title}
                      </h3>
                      <p className="text-navy/60 font-lato text-sm leading-relaxed">
                        {protocol.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-green-600 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-nunito font-bold text-3xl text-white mb-4">
            Still Have Safety Questions?
          </h2>
          <p className="text-white/80 mb-8 font-lato">
            We&apos;re happy to answer every question and even arrange a facility tour.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-green-700 font-poppins font-bold px-10 py-4 rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
