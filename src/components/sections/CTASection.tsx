"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { MessageCircle, Send, MapPin } from "lucide-react";

const cities = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
];

export default function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && city) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-navy overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-orange to-aqua" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-nunito font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            The Next Gukesh, Sindhu, or Srihari is Probably Already Born.{" "}
            <span className="gradient-text">
              Make Sure It&apos;s Your Child.
            </span>
          </h2>
          <p className="text-white/60 font-poppins text-lg max-w-2xl mx-auto">
            Register your interest today. We&apos;ll contact you with batch
            availability in your city.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email or phone number"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/40 font-lato focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-5 py-4 text-white font-lato focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300 appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-navy text-white/40">
                    Select your city
                  </option>
                  {cities.map((c) => (
                    <option key={c} value={c} className="bg-navy text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold text-lg py-4 rounded-xl hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Register Your Interest
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-nunito font-bold text-2xl text-white mb-2">
                Welcome to BabyCorp!
              </h3>
              <p className="text-white/60 font-lato">
                We&apos;ll reach out to you soon with batch details for {city}.
              </p>
            </motion.div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 font-lato text-sm">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919876543210?text=Hi%20BabyCorp!%20I%27m%20interested%20in%20enrolling%20my%20child."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-poppins font-bold text-lg py-4 rounded-xl hover:bg-[#22C35E] hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 whatsapp-pulse"
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </a>
          <p className="text-center text-white/30 text-xs font-lato mt-4">
            Most parents prefer WhatsApp — we respond within 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
