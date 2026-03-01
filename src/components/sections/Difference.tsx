"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X } from "lucide-react";

const comparisonRows = [
  { feature: "Starting Age", regular: "4-5 years", babycorp: "6 months" },
  { feature: "Approach", regular: "Single sport", babycorp: "Multi-discipline" },
  { feature: "Nutrition", regular: "Not included", babycorp: "Custom nutrition plan" },
  { feature: "Progress Tracking", regular: "None", babycorp: "Monthly progress reports" },
  { feature: "Partner Institutions", regular: "None", babycorp: "Top academies network" },
  { feature: "Coach Certification", regular: "Varies", babycorp: "Fully certified & verified" },
  { feature: "Swimming", regular: "Rarely offered", babycorp: "From 6 months" },
];

export default function Difference() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-20 md:py-32 bg-navy overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-orange to-aqua" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gold/10 text-gold font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            The Difference
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Not Just Classes.{" "}
            <span className="gradient-text">A System.</span>
          </h2>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full comparison-table">
            <thead>
              <tr>
                <th className="text-left text-white/50 font-poppins text-sm uppercase tracking-wider py-4 px-6">
                  Feature
                </th>
                <th className="text-center text-white/50 font-poppins text-sm uppercase tracking-wider py-4 px-6">
                  Regular Classes
                </th>
                <th className="text-center font-poppins text-sm uppercase tracking-wider py-4 px-6">
                  <span className="gradient-text font-bold">BabyCorp</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="border-b border-white/5"
                >
                  <td className="text-white font-poppins font-medium text-sm py-4 px-6">
                    {row.feature}
                  </td>
                  <td className="text-center py-4 px-6">
                    <div className="inline-flex items-center gap-2 text-white/40 text-sm font-lato">
                      <X size={14} className="text-red-400" />
                      {row.regular}
                    </div>
                  </td>
                  <td className="text-center py-4 px-6">
                    <div className="inline-flex items-center gap-2 text-gold text-sm font-lato font-medium">
                      <Check size={14} className="text-green-400" />
                      {row.babycorp}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
