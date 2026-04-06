"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, CreditCard, Eye } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    iconBg: "bg-aqua/20",
    iconColor: "text-aqua",
    title: "Coach Verification",
    body: "48-hour background and certification check before any coach goes live. ID verification, police clearance, and qualification review.",
  },
  {
    icon: Lock,
    iconBg: "bg-aqua/20",
    iconColor: "text-aqua",
    title: "Child Data Privacy",
    body: "DPDP Act 2023 compliant. Medical notes visible only to the assigned coach. No data sold. No ads.",
  },
  {
    icon: CreditCard,
    iconBg: "bg-aqua/20",
    iconColor: "text-aqua",
    title: "Secure Payments",
    body: "Razorpay PCI-DSS Level 1 certified. We never store card data. Every transaction is encrypted end-to-end.",
  },
  {
    icon: Eye,
    iconBg: "bg-aqua/20",
    iconColor: "text-aqua",
    title: "Community Standards",
    body: "Strict code of conduct for coaches and academies. Instant suspension on violations. Parent feedback reviewed within 24 hours.",
  },
];

export default function TrustSafety() {
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
          <span className="inline-block bg-aqua/10 border border-aqua/20 text-aqua font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Safety First
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-white leading-tight max-w-2xl">
            Every step taken to{" "}
            <span className="bg-gradient-to-r from-aqua to-gold bg-clip-text text-transparent">
              protect your child
            </span>
          </h2>
          <p className="font-lato text-white/50 text-lg mt-4 max-w-xl leading-relaxed">
            Your child&apos;s safety is not a feature. It&apos;s the foundation everything is built on.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-navy-light border border-white/10 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${pillar.iconBg} border border-aqua/20 rounded-xl flex items-center justify-center`}>
                <pillar.icon size={22} className={pillar.iconColor} />
              </div>
              <div>
                <h3 className="font-nunito font-bold text-white text-base mb-2">{pillar.title}</h3>
                <p className="font-lato text-white/50 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
