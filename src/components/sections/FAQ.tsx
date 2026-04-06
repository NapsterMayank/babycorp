"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What age can my child start?",
    a: "From 18 months for Swimming and Gymnastics, 3+ years for Chess, and 4+ years for Cricket and Badminton. Each academy lists exact age requirements on their profile.",
  },
  {
    q: "How do I know which sport is right for my child?",
    a: "Book a free trial for any sport. Our coaches assess fit in the first session and give you honest feedback. Many families try 2–3 sports before settling on one.",
  },
  {
    q: "What happens after I book a trial?",
    a: "You'll get a WhatsApp confirmation immediately and a reminder 24 hours before. Post-trial, the academy will follow up within 48 hours with enrollment options.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel with 7 days' notice. Prorated refunds are available per the academy's policy. We enforce fair refund policies across all partner academies.",
  },
  {
    q: "Are the coaches certified?",
    a: "Every coach goes through BabyCorp's 48-hour verification: certifications check, government ID verification, and background review. Verified badge = all three passed.",
  },
  {
    q: "What if my child misses a session?",
    a: "Notify via the app before the session. Most academies allow 1 makeup session per month. Makeup availability is shown on each academy's page.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-nunito font-black text-4xl md:text-5xl text-navy leading-tight">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                openIndex === i
                  ? "bg-white border-orange/20 border-l-4 border-l-orange shadow-sm"
                  : "bg-cream-dark/50 border-cream-dark hover:border-orange/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className={`font-poppins font-semibold text-base pr-4 ${openIndex === i ? "text-navy" : "text-navy/80"}`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  openIndex === i ? "bg-orange text-white" : "bg-white border border-cream-dark text-navy/40"
                }`}>
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="font-lato text-navy/60 text-base leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
