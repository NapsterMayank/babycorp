"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is swimming safe for babies under 1 year?",
    answer:
      "Yes, absolutely. Our infant swimming program follows international water safety standards used in countries like Australia and the UK, where baby swimming is common from 3 months. Our pools are UV-treated, maintained at optimal temperature, and all sessions are led by certified infant aquatics coaches. For babies under 18 months, a parent must be present in the water.",
  },
  {
    question: "What if my child doesn't enjoy a particular sport?",
    answer:
      "That's completely normal! The beauty of our multi-sport approach is that children get exposure to different activities. If your child doesn't enjoy one sport, we simply focus more on what they love. Our coaches are trained to observe and adapt. There is zero pressure — the goal is joyful physical development.",
  },
  {
    question: "Are coaches certified and background-verified?",
    answer:
      "Every BabyCorp coach holds relevant certifications (e.g., STA for swimming, FIG-recognized for gymnastics). All coaches undergo a thorough background check, including police verification. We maintain a strict hiring process with multiple interview rounds and reference checks.",
  },
  {
    question: "How is nutrition advice personalized?",
    answer:
      "Our certified pediatric nutritionists create age-appropriate meal plans based on your child's activity level, dietary preferences, and any allergies. Plans are updated quarterly for Starter members and monthly for Champion/Elite members, with weekly check-ins for Elite families.",
  },
  {
    question: "Which cities is BabyCorp available in?",
    answer:
      "We are launching in Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, and Pune. More cities are planned for 2026. Register your interest for early access in your city!",
  },
  {
    question: "What is the batch size / child-to-coach ratio?",
    answer:
      "For swimming (under 2 years): maximum 3 babies per coach (with parent present). For gymnastics and land sports: maximum 5 children per coach. For chess: maximum 6 children per instructor. We never compromise on attention and safety.",
  },
];

export default function FAQ() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-navy/10 text-navy font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight">
            Questions?{" "}
            <span className="gradient-text">We&apos;ve Got Answers.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-cream rounded-2xl border border-navy/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group"
              >
                <span className="font-poppins font-semibold text-navy text-base pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown
                    size={20}
                    className="text-navy/40 group-hover:text-orange transition-colors"
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-navy/60 font-lato text-sm leading-relaxed">
                        {faq.answer}
                      </p>
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
