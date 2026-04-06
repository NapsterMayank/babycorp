"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Download, Pause, CreditCard, IndianRupee, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

const SUBSCRIPTIONS = [
  {
    id: "sub1",
    academy: "Champions Cricket Club",
    sport: "Cricket",
    sportColor: "bg-green-500",
    icon: "🏏",
    child: "Aryan",
    amount: 3000,
    nextRenewal: "May 1, 2026",
    status: "active",
  },
  {
    id: "sub2",
    academy: "SwimStar Noida",
    sport: "Swimming",
    sportColor: "bg-aqua",
    icon: "🏊",
    child: "Meera",
    amount: 3500,
    nextRenewal: "May 5, 2026",
    status: "active",
  },
];

const TRANSACTIONS = [
  { id: "t1", date: "Apr 1, 2026", description: "Cricket - Monthly (Apr)", amount: 3000, status: "paid", receipt: true },
  { id: "t2", date: "Apr 1, 2026", description: "Swimming - Monthly (Apr)", amount: 3500, status: "paid", receipt: true },
  { id: "t3", date: "Mar 12, 2026", description: "Cricket - Trial Booking", amount: 236, status: "paid", receipt: true },
  { id: "t4", date: "Mar 1, 2026", description: "Cricket - Monthly (Mar)", amount: 3000, status: "paid", receipt: true },
  { id: "t5", date: "Mar 1, 2026", description: "Swimming - Monthly (Mar)", amount: 3500, status: "paid", receipt: true },
  { id: "t6", date: "Feb 15, 2026", description: "Gymnastics - Trial Booking", amount: 200, status: "refunded", receipt: true },
  { id: "t7", date: "Feb 1, 2026", description: "Cricket - Monthly (Feb)", amount: 3000, status: "paid", receipt: true },
  { id: "t8", date: "Jan 28, 2026", description: "Chess Trial - Pending", amount: 236, status: "pending", receipt: false },
];

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-green-50", text: "text-green-600", label: "Paid" },
  refunded: { bg: "bg-blue-50", text: "text-blue-600", label: "Refunded" },
  pending: { bg: "bg-amber-50", text: "text-amber-600", label: "Pending" },
};

const totalSpent = TRANSACTIONS
  .filter((t) => t.status === "paid")
  .reduce((sum, t) => sum + t.amount, 0);

const nextPayment = SUBSCRIPTIONS.reduce((sum, s) => sum + s.amount, 0);

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-cream pb-12">
      {/* Header */}
      <div className="relative bg-navy pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 w-fit">
            <ChevronLeft size={18} />
            <span className="font-poppins text-sm">Dashboard</span>
          </Link>

          <h1 className="font-nunito font-black text-3xl text-white mb-6">Payments & Billing</h1>

          {/* Summary banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Spent (2026)", value: `₹${totalSpent.toLocaleString()}`, icon: IndianRupee, color: "text-gold" },
              { label: "Active Subscriptions", value: String(SUBSCRIPTIONS.length), icon: Calendar, color: "text-aqua" },
              { label: "Next Payment", value: `₹${nextPayment.toLocaleString()}`, icon: TrendingUp, color: "text-orange" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/8 border border-white/10 rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <item.icon size={18} className={item.color} />
                </div>
                <div>
                  <p className="font-poppins text-white/40 text-xs">{item.label}</p>
                  <p className={`font-bebas text-2xl tracking-wide ${item.color}`}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* Active subscriptions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Active Subscriptions</h2>
          <div className="space-y-3">
            {SUBSCRIPTIONS.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-cream-dark rounded-2xl p-5 flex items-center gap-4 shadow-sm"
              >
                {/* Sport accent stripe */}
                <div className={`w-1 h-12 ${sub.sportColor} rounded-full shrink-0`} />

                <div className="text-3xl">{sub.icon}</div>

                <div className="flex-1 min-w-0">
                  <p className="font-nunito font-bold text-navy text-base truncate">{sub.academy}</p>
                  <p className="font-lato text-navy/50 text-sm">{sub.child} · Renews {sub.nextRenewal}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-bebas text-2xl text-navy tracking-wide">₹{sub.amount.toLocaleString()}</p>
                  <p className="font-lato text-navy/40 text-xs">/month</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-green-50 text-green-600 font-poppins font-semibold text-xs px-2.5 py-1 rounded-full">
                    Active
                  </span>
                  <button className="w-8 h-8 bg-cream rounded-lg flex items-center justify-center hover:bg-cream-dark transition-colors">
                    <Pause size={14} className="text-navy/50" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Transaction history */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nunito font-bold text-navy text-xl">Transaction History</h2>
            <button className="flex items-center gap-1.5 text-orange font-poppins text-sm hover:text-orange-hover transition-colors">
              <Download size={14} />
              Export
            </button>
          </div>

          <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-12 px-5 py-3 bg-cream border-b border-cream-dark">
              <span className="col-span-2 font-poppins font-semibold text-navy/50 text-xs uppercase tracking-wide">Date</span>
              <span className="col-span-6 font-poppins font-semibold text-navy/50 text-xs uppercase tracking-wide">Description</span>
              <span className="col-span-2 font-poppins font-semibold text-navy/50 text-xs uppercase tracking-wide text-right">Amount</span>
              <span className="col-span-2 font-poppins font-semibold text-navy/50 text-xs uppercase tracking-wide text-right">Status</span>
            </div>

            {TRANSACTIONS.map((txn, i) => {
              const status = STATUS_CONFIG[txn.status] ?? STATUS_CONFIG.pending;
              return (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-12 px-5 py-4 items-center ${
                    i < TRANSACTIONS.length - 1 ? "border-b border-cream-dark" : ""
                  } hover:bg-cream/50 transition-colors`}
                >
                  <span className="col-span-2 font-lato text-navy/50 text-xs">{txn.date}</span>
                  <span className="col-span-6 font-lato text-navy text-sm">{txn.description}</span>
                  <span className={`col-span-2 font-bebas text-lg tracking-wide text-right ${
                    txn.status === "refunded" ? "text-blue-500" : "text-navy"
                  }`}>
                    {txn.status === "refunded" ? "-" : ""}₹{txn.amount.toLocaleString()}
                  </span>
                  <div className="col-span-2 flex items-center justify-end gap-1.5">
                    <span className={`${status.bg} ${status.text} font-poppins font-semibold text-xs px-2.5 py-0.5 rounded-full`}>
                      {status.label}
                    </span>
                    {txn.receipt && (
                      <button className="w-6 h-6 bg-cream rounded flex items-center justify-center hover:bg-cream-dark transition-colors">
                        <Download size={11} className="text-navy/40" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Saved card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Payment Method</h2>
          <div className="bg-gradient-to-br from-navy to-navy-light border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <CreditCard size={24} className="text-white/60" />
            <div>
              <p className="font-poppins font-semibold text-white text-sm">Visa ending in •••• 4242</p>
              <p className="font-lato text-white/40 text-xs">Expires 09/28 · Powered by Razorpay</p>
            </div>
            <button className="ml-auto text-orange font-poppins text-sm font-semibold hover:text-orange-hover transition-colors">
              Change
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
