"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Check } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@babycorp.in",
    sub: "We reply within 24 hours",
    color: "text-orange",
    bg: "bg-orange/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9 AM – 6 PM IST",
    color: "text-aqua",
    bg: "bg-aqua/10",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 98765 43210",
    sub: "Quick responses on WhatsApp",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "New Delhi, India 🇮🇳",
    sub: "Serving Delhi · Mumbai · Bengaluru",
    color: "text-gold",
    bg: "bg-gold/10",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative bg-navy pt-28 pb-12 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-orange/10 border border-orange/20 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Contact Us
            </span>
            <h1 className="font-nunito font-black text-4xl md:text-5xl text-white mb-4">
              We&apos;d love to{" "}
              <span className="bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent">
                hear from you
              </span>
            </h1>
            <p className="font-lato text-white/55 text-lg">
              Questions, partnership inquiries, or just saying hi — we&apos;re here.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-cream-dark rounded-3xl p-10 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-green-500" />
                </div>
                <h3 className="font-nunito font-bold text-navy text-xl mb-2">Message sent!</h3>
                <p className="font-lato text-navy/60 text-base">
                  We&apos;ll get back to you within 24 hours. Check your email for a confirmation.
                </p>
              </motion.div>
            ) : (
              <div className="bg-white border border-cream-dark rounded-3xl p-8 shadow-sm">
                <h2 className="font-nunito font-bold text-navy text-2xl mb-6">Send us a message</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins font-semibold text-navy/60 text-xs uppercase tracking-wider mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Priya Sharma"
                        required
                        className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-3 font-poppins text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:border-orange/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-semibold text-navy/60 text-xs uppercase tracking-wider mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="98765 43210"
                        className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-3 font-poppins text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:border-orange/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins font-semibold text-navy/60 text-xs uppercase tracking-wider mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="priya@example.com"
                      required
                      className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-3 font-poppins text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:border-orange/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-poppins font-semibold text-navy/60 text-xs uppercase tracking-wider mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-3 font-poppins text-navy text-sm focus:outline-none focus:border-orange/50 transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="parent">Parent enquiry</option>
                      <option value="academy">Academy partnership</option>
                      <option value="school">School partnership</option>
                      <option value="press">Press / media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-poppins font-semibold text-navy/60 text-xs uppercase tracking-wider mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                      className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-3 font-poppins text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:border-orange/50 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_INFO.map((item, i) => (
              <div key={i} className="bg-white border border-cream-dark rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <p className="font-poppins font-semibold text-navy/50 text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="font-nunito font-bold text-navy text-base">{item.value}</p>
                  <p className="font-lato text-navy/40 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Response time */}
            <div className="bg-navy-light border border-white/10 rounded-2xl p-5 flex items-center gap-3">
              <Clock size={18} className="text-gold shrink-0" />
              <div>
                <p className="font-poppins font-semibold text-white text-sm">Average response time</p>
                <p className="font-bebas text-3xl text-gold tracking-wide">&lt; 4 hours</p>
                <p className="font-lato text-white/40 text-xs">During business hours</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-cream-dark rounded-2xl h-36 flex items-center justify-center border border-cream-dark">
              <div className="text-center">
                <MapPin size={24} className="text-navy/20 mx-auto mb-1" />
                <p className="font-lato text-navy/30 text-sm">New Delhi, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
