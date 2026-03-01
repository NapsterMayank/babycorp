"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "10,000",
    period: "/year",
    icon: Star,
    color: "from-aqua to-aqua/80",
    borderColor: "border-aqua/30",
    features: [
      "Swimming classes (group)",
      "Monthly progress report",
      "Nutritionist consultation (quarterly)",
      "Basic parent dashboard",
    ],
    popular: false,
  },
  {
    name: "Champion",
    price: "18,000",
    period: "/year",
    icon: Crown,
    color: "from-orange to-gold",
    borderColor: "border-orange",
    features: [
      "Swimming + Gymnastics",
      "Sport of choice (Chess/Badminton/TT)",
      "Monthly progress report",
      "Nutritionist (monthly)",
      "Priority partner institution referrals",
      "Full parent dashboard access",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "28,000",
    period: "/year",
    icon: Zap,
    color: "from-gold to-orange",
    borderColor: "border-gold/30",
    features: [
      "Full program (all 5 sports)",
      "Personal coach matching",
      "Weekly nutritionist check-in",
      "Full parent dashboard access",
      "Direct academy placement support",
      "Priority event invitations",
    ],
    popular: false,
  },
];

export default function Pricing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="pricing" className="relative py-20 md:py-32 bg-cream overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-orange/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gold/20 text-navy font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Investment
          </span>
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-4">
            An Olympic Pathway for{" "}
            <span className="gradient-text">₹10,000 a Year.</span>
          </h2>
          <p className="text-navy/60 font-poppins text-lg max-w-2xl mx-auto">
            Less than what most parents spend on a single year of tuition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative group ${plan.popular ? "md:-mt-4 md:mb-0" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange to-gold text-navy font-poppins font-bold text-xs px-4 py-1.5 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div
                  className={`bg-white rounded-3xl p-8 h-full border-2 ${
                    plan.popular ? "border-orange shadow-2xl shadow-orange/10" : "border-navy/5 shadow-lg"
                  } hover:shadow-2xl hover:shadow-orange/15 hover:-translate-y-2 transition-all duration-500`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  <h3 className="font-nunito font-bold text-2xl text-navy mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-bebas text-4xl text-navy">
                      ₹{plan.price}
                    </span>
                    <span className="text-navy/50 font-lato text-sm">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-navy/70 font-lato text-sm"
                      >
                        <Check
                          size={16}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`block text-center font-poppins font-semibold py-3 rounded-full transition-all duration-300 btn-press ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30"
                        : "bg-navy/5 text-navy hover:bg-navy hover:text-white"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
