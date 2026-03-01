"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const stats = [
  {
    number: 7,
    suffix: "",
    label: "medals India won at Paris 2024 Olympics",
    color: "text-orange",
  },
  {
    number: 0.2,
    suffix: "%",
    decimals: 1,
    label: "of India's population knows how to swim",
    color: "text-aqua",
  },
  {
    number: 1,
    suffix: "%",
    prefix: "<",
    label: "of Indian children get structured sports education before age 6",
    color: "text-gold",
  },
  {
    number: 5,
    suffix: " Lakh+",
    prefix: "₹",
    label: "spent per year by Tier 1 parents on their child's education",
    color: "text-orange",
  },
];

export default function Problem() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-20 md:py-32 bg-cream overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-aqua/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-orange/10 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            The Wake-Up Call
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy max-w-4xl mx-auto leading-tight">
            25 Million Babies Born in India Every Year.{" "}
            <span className="gradient-text">
              Less Than 0.2% Will Ever Learn to Swim.
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-navy/5 border border-navy/5 hover:shadow-xl hover:shadow-orange/10 hover:-translate-y-1 transition-all duration-300">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange/10 to-transparent rounded-tr-2xl rounded-bl-[40px]" />

                <div className={`stat-number ${stat.color} mb-2`}>
                  {inView && (
                    <>
                      {stat.prefix || ""}
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        decimals={stat.decimals || 0}
                        delay={0.3 + i * 0.15}
                      />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <p className="text-navy/70 font-lato text-sm leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-navy/60 font-poppins text-base md:text-lg max-w-2xl mx-auto">
            The window for early physical development closes fast. Every day
            without structured sports training is a day of potential lost.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
