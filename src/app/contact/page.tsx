"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";

const cities = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    childAge: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-white/60 font-poppins text-lg max-w-2xl mx-auto">
              Have questions? Want to visit a facility? We&apos;d love to hear
              from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-nunito font-bold text-2xl text-navy mb-6">
                Send Us a Message
              </h2>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-white border border-navy/10 rounded-xl px-5 py-3.5 font-lato text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-white border border-navy/10 rounded-xl px-5 py-3.5 font-lato text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-white border border-navy/10 rounded-xl px-5 py-3.5 font-lato text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300"
                      required
                    />
                    <select
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="bg-white border border-navy/10 rounded-xl px-5 py-3.5 font-lato text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300 appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Child's Age (e.g., 6 months, 2 years)"
                    value={formData.childAge}
                    onChange={(e) =>
                      setFormData({ ...formData, childAge: e.target.value })
                    }
                    className="w-full bg-white border border-navy/10 rounded-xl px-5 py-3.5 font-lato text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300"
                  />
                  <textarea
                    placeholder="Your Message (optional)"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-white border border-navy/10 rounded-xl px-5 py-3.5 font-lato text-navy placeholder:text-navy/30 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all duration-300 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-bold text-lg py-4 rounded-xl hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-12 text-center shadow-lg"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-nunito font-bold text-2xl text-navy mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-navy/60 font-lato">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-nunito font-bold text-2xl text-navy mb-6">
                  Other Ways to Reach Us
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                      <Mail className="text-orange" size={20} />
                    </div>
                    <div>
                      <p className="text-navy/50 text-xs font-poppins">Email</p>
                      <p className="font-lato text-navy font-medium">
                        hello@babycorp.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Phone className="text-gold" size={20} />
                    </div>
                    <div>
                      <p className="text-navy/50 text-xs font-poppins">Phone</p>
                      <p className="font-lato text-navy font-medium">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-aqua/10 flex items-center justify-center">
                      <Clock className="text-aqua" size={20} />
                    </div>
                    <div>
                      <p className="text-navy/50 text-xs font-poppins">Hours</p>
                      <p className="font-lato text-navy font-medium">
                        Mon-Sat: 8:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-navy/50 text-xs font-poppins">
                        Cities
                      </p>
                      <p className="font-lato text-navy font-medium">
                        Mumbai • Delhi • Bengaluru • Hyderabad • Chennai • Pune
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hi%20BabyCorp!%20I%27m%20interested%20in%20enrolling%20my%20child."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] text-white font-poppins font-bold text-lg py-4 rounded-xl hover:bg-[#22C35E] hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-[0.98] transition-all duration-300 text-center whatsapp-pulse"
              >
                <span className="flex items-center justify-center gap-3">
                  <MessageCircle size={24} />
                  Chat on WhatsApp
                </span>
              </a>
              <p className="text-navy/40 text-sm font-lato text-center">
                Most parents prefer WhatsApp — we respond within 2 hours
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
