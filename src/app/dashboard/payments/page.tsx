"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Download, Pause, X, CreditCard, AlertCircle } from "lucide-react";
import Link from "next/link";

const SUBSCRIPTIONS = [
  {
    id: "sub1",
    academy: "Delhi Football Academy",
    sport: "Football",
    icon: "⚽",
    child: "Aryan",
    amount: 3000,
    nextRenewal: "May 1, 2026",
    status: "active",
  },
  {
    id: "sub2",
    academy: "SwimStar Noida",
    sport: "Swimming",
    icon: "🏊",
    child: "Meera",
    amount: 3500,
    nextRenewal: "May 5, 2026",
    status: "active",
  },
];

const TRANSACTIONS = [
  { id: "t1", date: "Apr 1, 2026", description: "Football - Monthly (Apr)", amount: 3000, status: "paid", receipt: true },
  { id: "t2", date: "Apr 1, 2026", description: "Swimming - Monthly (Apr)", amount: 3500, status: "paid", receipt: true },
  { id: "t3", date: "Mar 12, 2026", description: "Football - Trial Booking", amount: 236, status: "paid", receipt: true },
  { id: "t4", date: "Mar 1, 2026", description: "Football - Monthly (Mar)", amount: 3000, status: "paid", receipt: true },
  { id: "t5", date: "Mar 1, 2026", description: "Swimming - Monthly (Mar)", amount: 3500, status: "paid", receipt: true },
  { id: "t6", date: "Feb 15, 2026", description: "Gymnastics - Trial Booking", amount: 200, status: "refunded", receipt: true },
  { id: "t7", date: "Feb 1, 2026", description: "Football - Monthly (Feb)", amount: 3000, status: "paid", receipt: true },
  { id: "t8", date: "Jan 28, 2026", description: "Cricket Trial - Pending", amount: 236, status: "pending", receipt: false },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
  refunded: { bg: "bg-blue-100", text: "text-blue-700", label: "Refunded" },
  pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" },
};

const totalSpentThisYear = TRANSACTIONS.filter((t) => t.status === "paid" && t.date.includes("2026")).reduce(
  (sum, t) => sum + t.amount,
  0
);

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-cream pt-20 pb-10">
      {/* Header */}
      <div className="bg-navy py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard">
            <button className="flex items-center gap-1.5 text-white/50 font-poppins text-sm mb-5 hover:text-white transition-colors">
              <ChevronLeft size={16} /> Back to Dashboard
            </button>
          </Link>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-nunito font-black text-2xl text-white mb-1">Payment History</h1>
            <p className="text-white/50 font-lato text-sm">Manage subscriptions and view transactions</p>
          </motion.div>

          {/* Stat */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 bg-white/10 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white/50 font-lato text-xs">Total spent in 2026</p>
              <p className="font-nunito font-black text-3xl text-white">
                ₹{totalSpentThisYear.toLocaleString("en-IN")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-8">
        {/* Active Subscriptions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Active Subscriptions</h2>
          <div className="space-y-3">
            {SUBSCRIPTIONS.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-gold/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    {sub.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-nunito font-bold text-navy">{sub.academy}</p>
                        <p className="text-navy/50 font-lato text-xs">{sub.sport} · {sub.child}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-nunito font-bold text-navy text-lg">₹{sub.amount.toLocaleString()}</p>
                        <p className="text-navy/40 font-lato text-xs">/month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-navy/50 font-lato text-xs">
                        Renews: <span className="text-orange font-poppins font-medium">{sub.nextRenewal}</span>
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-navy/40 font-poppins text-xs hover:text-amber-500 transition-colors">
                          <Pause size={12} /> Pause
                        </button>
                        <button className="flex items-center gap-1 text-navy/40 font-poppins text-xs hover:text-red-500 transition-colors">
                          <X size={12} /> Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Transaction History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Transaction History</h2>
          {TRANSACTIONS.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-cream-dark rounded-2xl">
              <AlertCircle size={40} className="text-navy/20 mb-3" />
              <p className="font-nunito font-bold text-navy/40 text-lg">No transactions yet</p>
              <p className="text-navy/30 font-lato text-sm mt-1">Your payment history will appear here</p>
            </div>
          ) : (
            <div className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden">
              {/* Table header — hidden on mobile */}
              <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 bg-cream-dark text-navy/50 font-poppins text-xs font-medium uppercase tracking-wide">
                <span className="col-span-1">Date</span>
                <span className="col-span-2">Description</span>
                <span className="col-span-1 text-right">Amount</span>
                <span className="col-span-1 text-center">Status</span>
              </div>

              {TRANSACTIONS.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex flex-col sm:grid sm:grid-cols-5 gap-2 sm:gap-4 px-5 py-4 ${
                    i < TRANSACTIONS.length - 1 ? "border-b border-cream-dark" : ""
                  } hover:bg-cream/50 transition-colors`}
                >
                  {/* Date */}
                  <span className="text-navy/50 font-lato text-xs col-span-1">{tx.date}</span>

                  {/* Description */}
                  <div className="col-span-2">
                    <p className="font-poppins font-medium text-navy text-sm">{tx.description}</p>
                  </div>

                  {/* Amount */}
                  <div className="col-span-1 sm:text-right flex items-center sm:justify-end gap-3">
                    <span className="font-nunito font-bold text-navy text-sm">
                      {tx.status === "refunded" && "-"}₹{tx.amount.toLocaleString()}
                    </span>
                    {tx.receipt && (
                      <button className="text-orange/60 hover:text-orange transition-colors sm:hidden">
                        <Download size={14} />
                      </button>
                    )}
                  </div>

                  {/* Status + receipt */}
                  <div className="col-span-1 flex items-center justify-between sm:justify-center gap-2">
                    <span
                      className={`${STATUS_STYLES[tx.status].bg} ${STATUS_STYLES[tx.status].text} text-xs font-poppins font-semibold px-2.5 py-1 rounded-full`}
                    >
                      {STATUS_STYLES[tx.status].label}
                    </span>
                    {tx.receipt && (
                      <button className="hidden sm:block text-orange/60 hover:text-orange transition-colors">
                        <Download size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
