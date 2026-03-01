"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Eye, Heart } from "lucide-react";

export default function AboutPage() {
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
              About <span className="gradient-text">BabyCorp</span>
            </h1>
            <p className="text-white/60 font-poppins text-lg max-w-2xl mx-auto">
              The story of why we believe every Indian baby deserves a shot at
              becoming a champion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-orange/10 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              Our Origin Story
            </span>
            <h2 className="font-nunito font-black text-3xl md:text-4xl text-navy mb-6">
              &ldquo;Why does India, a country of 1.4 billion, win so few
              Olympic medals?&rdquo;
            </h2>
            <div className="space-y-4 text-navy/70 font-lato text-base leading-relaxed">
              <p>
                That question haunted the BabyCorp founding team. India sent 117
                athletes to the Paris 2024 Olympics and came home with 6 medals.
                Meanwhile, countries with a fraction of our population — Australia,
                Netherlands, New Zealand — consistently dominate.
              </p>
              <p>
                The difference? They start earlier. Much earlier. In countries
                like Australia, structured swimming programs for infants are the
                norm. In Hungary, children play chess competitively before age 5.
                In China, gymnastics academies identify talent in toddlers.
              </p>
              <p>
                In India, most children don&apos;t receive any structured sports
                training until they&apos;re 8 or 9 years old — by which point, the
                critical window for physical and cognitive foundation-building has
                already closed.
              </p>
              <p className="font-poppins font-semibold text-navy text-lg">
                BabyCorp was born to close this gap. Not to produce Olympic
                athletes (though we&apos;d love that) — but to give every Indian
                child the physical and mental foundation that the world&apos;s best
                athletes get from birth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                text: "To make world-class early childhood sports development accessible to every Indian family, starting from day one.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                text: "A generation of Indian children who are physically strong, mentally sharp, and confident — ready to compete on any global stage.",
              },
              {
                icon: Heart,
                title: "Our Values",
                text: "Safety first. Joy before competition. Data-driven development. Inclusivity. Parental partnership. Excellence without pressure.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="text-gold" size={28} />
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60 font-lato text-sm leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-nunito font-bold text-3xl text-navy mb-4">
            Join the Revolution
          </h2>
          <p className="text-navy/60 mb-8 font-lato">
            Be part of India&apos;s first generation of infant sports development.
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
