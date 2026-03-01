"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const partners = [
  { name: "SwimIndia Academy", type: "Swimming" },
  { name: "National Chess Academy", type: "Chess" },
  { name: "SportFirst India", type: "Multi-Sport" },
  { name: "NutriKids", type: "Nutrition" },
  { name: "PediaHealth", type: "Pediatrics" },
  { name: "AquaSplash", type: "Swimming" },
  { name: "Shuttle Stars", type: "Badminton" },
  { name: "TableTop Pro", type: "Table Tennis" },
  { name: "FlexyKids Gym", type: "Gymnastics" },
  { name: "MindMasters", type: "Chess" },
];

export default function Partners() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative py-20 md:py-32 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-aqua/10 text-aqua font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Ecosystem
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            We Know Who to Call{" "}
            <span className="gradient-text-aqua">
              When Your Child Is Ready.
            </span>
          </h2>
        </motion.div>

        {/* Scrolling logos - two rows */}
        <div className="space-y-6 overflow-hidden">
          {/* Row 1 */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy to-transparent z-10" />
            <div className="partner-scroll">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/10 hover:border-aqua/30 transition-colors duration-300"
                >
                  <p className="text-white font-poppins font-semibold text-sm whitespace-nowrap">
                    {partner.name}
                  </p>
                  <p className="text-white/40 text-xs font-lato">
                    {partner.type}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - reverse direction */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy to-transparent z-10" />
            <div
              className="partner-scroll"
              style={{ animationDirection: "reverse" }}
            >
              {[...[...partners].reverse(), ...[...partners].reverse()].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/10 hover:border-gold/30 transition-colors duration-300"
                >
                  <p className="text-white font-poppins font-semibold text-sm whitespace-nowrap">
                    {partner.name}
                  </p>
                  <p className="text-white/40 text-xs font-lato">
                    {partner.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-white/40 font-lato text-sm mt-8"
        >
          Partner logos to be added — institutions verified and growing
        </motion.p>
      </div>
    </section>
  );
}
