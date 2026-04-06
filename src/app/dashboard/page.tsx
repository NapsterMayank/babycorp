"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, TrendingUp, CreditCard, Calendar, Star, Share2, Clock, X } from "lucide-react";
import Link from "next/link";
import ChildCard from "@/components/ui/ChildCard";

const CHILDREN = [
  { id: "c1", name: "Aryan", age: 8, sports: ["Football", "Cricket"], gradientFrom: "from-orange", gradientTo: "to-gold" },
  { id: "c2", name: "Meera", age: 5, sports: ["Swimming", "Gymnastics"], gradientFrom: "from-aqua", gradientTo: "to-gold" },
];

const SESSIONS = [
  { id: 1, date: "Sat", dateNum: 12, month: "Apr", academy: "Delhi Football Academy", sport: "Football", icon: "⚽", time: "8:00 AM – 9:00 AM", child: "Aryan" },
  { id: 2, date: "Sun", dateNum: 13, month: "Apr", academy: "SwimStar Noida", sport: "Swimming", icon: "🏊", time: "7:00 AM – 8:00 AM", child: "Meera" },
  { id: 3, date: "Wed", dateNum: 16, month: "Apr", academy: "Delhi Football Academy", sport: "Football", icon: "⚽", time: "8:00 AM – 9:00 AM", child: "Aryan" },
];

const MILESTONES = [
  { id: 1, name: "First Goal!", icon: "⚽", child: "Aryan", date: "Apr 6, 2026", description: "Scored first goal in practice match" },
  { id: 2, name: "10-Day Streak", icon: "🔥", child: "Meera", date: "Apr 3, 2026", description: "10 consecutive sessions attended" },
  { id: 3, name: "Level Up", icon: "⭐", child: "Aryan", date: "Mar 28, 2026", description: "Moved to Intermediate batch" },
];

const QUICK_ACTIONS = [
  { href: "/discover", label: "Find Academies", icon: Search, color: "from-orange to-orange-hover" },
  { href: "/dashboard/progress/c1", label: "View Progress", icon: TrendingUp, color: "from-aqua to-aqua/80" },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard, color: "from-gold to-yellow-400" },
  { href: "/book/trial/b1", label: "Book Trial", icon: Calendar, color: "from-purple-500 to-purple-400" },
];

export default function DashboardPage() {
  const [activeChild, setActiveChild] = useState(0);
  const [markedAbsence, setMarkedAbsence] = useState<number[]>([]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen bg-cream pt-20 pb-10">
      {/* Header */}
      <div className="bg-navy py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-white/40 font-lato text-sm">Good morning</p>
              <h1 className="font-nunito font-black text-2xl text-white">
                Priya 👋
              </h1>
            </motion.div>
            <div className="flex items-center gap-3">
              <button className="relative w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Bell size={18} className="text-white/70" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-orange rounded-full" />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: "Total Sessions", value: "47" },
              { label: "Active Enrollments", value: "2" },
              { label: "Badges Earned", value: "8" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 rounded-2xl p-3 text-center"
              >
                <p className="font-nunito font-black text-orange text-2xl">{stat.value}</p>
                <p className="text-white/50 font-lato text-[10px] mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-8 mt-6">
        {/* My Children */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nunito font-bold text-navy text-xl">My Children</h2>
            <Link href="/auth/register" className="text-orange font-poppins text-sm hover:text-orange-hover transition-colors">
              + Add child
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
            {CHILDREN.map((child, i) => (
              <div key={child.id} className="shrink-0 w-52">
                <ChildCard
                  {...child}
                  selected={activeChild === i}
                  onSelect={() => setActiveChild(i)}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section {...fadeInUp}>
          <h2 className="font-nunito font-bold text-navy text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action, i) => (
              <Link key={action.href} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="bg-navy-light border border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon size={18} className="text-white" />
                  </div>
                  <span className="font-poppins font-semibold text-white text-sm">{action.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Upcoming Sessions */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nunito font-bold text-navy text-xl">Upcoming Sessions</h2>
            <Link href="/discover" className="text-orange font-poppins text-sm hover:text-orange-hover transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {SESSIONS.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white border border-cream-dark rounded-2xl p-4 flex items-center gap-4 shadow-sm ${
                  markedAbsence.includes(session.id) ? "opacity-50" : ""
                }`}
              >
                {/* Date badge */}
                <div className="bg-gradient-to-b from-orange to-orange-hover rounded-xl p-2 text-center shrink-0 min-w-[48px]">
                  <p className="text-white/80 font-poppins text-[10px] uppercase">{session.date}</p>
                  <p className="text-white font-nunito font-black text-xl leading-none">{session.dateNum}</p>
                  <p className="text-white/60 font-lato text-[10px]">{session.month}</p>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{session.icon}</span>
                    <p className="font-nunito font-bold text-navy text-sm truncate">{session.academy}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-navy/50 text-xs font-lato">
                    <Clock size={11} />
                    <span>{session.time}</span>
                    <span>•</span>
                    <span>{session.child}</span>
                  </div>
                </div>

                {!markedAbsence.includes(session.id) ? (
                  <button
                    onClick={() => setMarkedAbsence([...markedAbsence, session.id])}
                    className="text-navy/30 font-poppins text-xs hover:text-red-400 transition-colors shrink-0"
                  >
                    Mark absence
                  </button>
                ) : (
                  <button
                    onClick={() => setMarkedAbsence(markedAbsence.filter(id => id !== session.id))}
                    className="text-xs font-poppins text-red-400 flex items-center gap-1"
                  >
                    <X size={12} /> Absent
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Milestones */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nunito font-bold text-navy text-xl">Recent Milestones</h2>
            <Star size={18} className="text-gold fill-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-gradient-to-br from-gold/20 to-orange/10 border border-gold/30 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{milestone.icon}</span>
                  <button className="text-white/40 hover:text-gold transition-colors">
                    <Share2 size={14} />
                  </button>
                </div>
                <p className="font-nunito font-bold text-navy text-sm">{milestone.name}</p>
                <p className="text-navy/50 font-lato text-xs mt-0.5">{milestone.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-orange font-poppins text-xs font-medium">{milestone.child}</span>
                  <span className="text-navy/30 font-lato text-[10px]">{milestone.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
