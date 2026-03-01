"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Star, Crown, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "10,000",
    icon: Star,
    color: "from-aqua to-aqua/80",
    features: [
      { text: "Swimming classes (group)", included: true },
      { text: "Monthly progress report", included: true },
      { text: "Nutritionist consultation (quarterly)", included: true },
      { text: "Basic parent dashboard", included: true },
      { text: "Gymnastics", included: false },
      { text: "Sport specialization", included: false },
      { text: "Personal coach", included: false },
      { text: "Academy placement", included: false },
    ],
    popular: false,
  },
  {
    name: "Champion",
    price: "18,000",
    icon: Crown,
    color: "from-orange to-gold",
    features: [
      { text: "Swimming + Gymnastics", included: true },
      { text: "Sport of choice (Chess/Badminton/TT)", included: true },
      { text: "Monthly progress report", included: true },
      { text: "Nutritionist (monthly)", included: true },
      { text: "Full parent dashboard", included: true },
      { text: "Priority partner referrals", included: true },
      { text: "Personal coach", included: false },
      { text: "Academy placement", included: false },
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "28,000",
    icon: Zap,
    color: "from-gold to-orange",
    features: [
      { text: "All 5 sports included", included: true },
      { text: "Personal coach matching", included: true },
      { text: "Weekly nutritionist check-in", included: true },
      { text: "Full parent dashboard", included: true },
      { text: "Direct academy placement support", included: true },
      { text: "Priority event invitations", included: true },
      { text: "Video analysis of sessions", included: true },
      { text: "Quarterly assessments", included: true },
    ],
    popular: false,
  },
];

export default function PricingPage() {
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
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-white/60 font-poppins text-lg max-w-2xl mx-auto">
              An Olympic pathway for less than most parents spend monthly on
              tutors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative ${plan.popular ? "md:-mt-4" : ""}`}
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
                      plan.popular
                        ? "border-orange shadow-2xl shadow-orange/10"
                        : "border-navy/5 shadow-lg"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5`}
                    >
                      <Icon className="text-white" size={24} />
                    </div>

                    <h3 className="font-nunito font-bold text-2xl text-navy mb-1">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="font-bebas text-5xl text-navy">
                        ₹{plan.price}
                      </span>
                      <span className="text-navy/50 font-lato text-sm">
                        /year
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.text}
                          className={`flex items-start gap-3 text-sm font-lato ${
                            feature.included ? "text-navy/70" : "text-navy/30 line-through"
                          }`}
                        >
                          <Check
                            size={16}
                            className={`mt-0.5 flex-shrink-0 ${
                              feature.included ? "text-green-500" : "text-navy/20"
                            }`}
                          />
                          {feature.text}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/#contact"
                      className={`block text-center font-poppins font-semibold py-3 rounded-full transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30"
                          : "bg-navy/5 text-navy hover:bg-navy hover:text-white"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Note */}
          <div className="text-center mt-12">
            <p className="text-navy/40 font-lato text-sm">
              All prices are per child, per year. Family discounts available for
              2+ children. EMI options coming soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
