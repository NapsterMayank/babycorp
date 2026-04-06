"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, TrendingUp, CreditCard, Calendar, Star, Share2, Clock, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import ChildCard from "@/components/ui/ChildCard";


const CHILDREN = [
  { id: "c1", name: "Aryan", age: 8, sports: ["Cricket", "Chess"], gradientFrom: "from-orange", gradientTo: "to-gold" },
  { id: "c2", name: "Meera", age: 5, sports: ["Swimming", "Gymnastics"], gradientFrom: "from-aqua", gradientTo: "to-gold" },
];

const SESSIONS = [
  { id: 1, date: "Sat", dateNum: 12, month: "Apr", academy: "Delhi Chess Academy", sport: "Chess", sportColor: "border-l-amber-700", icon: "♟️", time: "9:00 AM – 10:00 AM", child: "Aryan" },
  { id: 2, date: "Sun", dateNum: 13, month: "Apr", academy: "SwimStar Noida", sport: "Swimming", sportColor: "border-l-aqua", icon: "🏊", time: "7:00 AM – 8:00 AM", child: "Meera" },
  { id: 3, date: "Wed", dateNum: 16, month: "Apr", academy: "Champions Cricket Club", sport: "Cricket", sportColor: "border-l-green-500", icon: "🏏", time: "8:00 AM – 9:00 AM", child: "Aryan" },
];

const MILESTONES = [
  { id: 1, name: "First Checkmate!", icon: "♟️", child: "Aryan", date: "Apr 6, 2026", description: "Won first practice game" },
  { id: 2, name: "10-Day Streak", icon: "🔥", child: "Meera", date: "Apr 3, 2026", description: "10 consecutive sessions" },
  { id: 3, name: "Level Up", icon: "⭐", child: "Aryan", date: "Mar 28, 2026", description: "Moved to Intermediate batch" },
];

const QUICK_ACTIONS = [
  { href: "/discover", label: "Find Academies", icon: Search, color: "from-orange to-orange-hover" },
  { href: "/dashboard/progress/c1", label: "View Progress", icon: TrendingUp, color: "from-aqua to-aqua/80" },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard, color: "from-gold to-yellow-400" },
  { href: "/book/trial/b1", label: "Book Trial", icon: Calendar, color: "from-purple-500 to-purple-400" },
];

const DASHBOARD_STATS = [
  { label: "Sessions This Month", value: "12", trend: "+3 vs last month", trendUp: true, icon: Calendar, iconBg: "bg-orange/10", iconColor: "text-orange" },
  { label: "Active Sports", value: "4", trend: "2 per child", trendUp: true, icon: Star, iconBg: "bg-gold/10", iconColor: "text-gold" },
  { label: "Badges Earned", value: "8", trend: "+2 this month", trendUp: true, icon: TrendingUp, iconBg: "bg-aqua/10", iconColor: "text-aqua" },
  { label: "Next Session In", value: "2d", trend: "Sat, Apr 12", trendUp: true, icon: Clock, iconBg: "bg-purple-500/10", iconColor: "text-purple-400" },
];

const RECOMMENDED = [
  { id: "badminton-001", name: "Smash Badminton Academy", sport: "Badminton", icon: "🏸", rating: 4.7, price: 2000, distance: "3.2 km", gradient: "from-[#166534] to-[#22c55e]" },
  { id: "gym-001", name: "Little Champions Gymnastics", sport: "Gymnastics", icon: "🤸", rating: 4.7, price: 3500, distance: "3.5 km", gradient: "from-[#6B2FA0] to-[#8B5CF6]" },
];

export default function DashboardPage() {
  const [activeChild, setActiveChild] = useState(0);
  const [markedAbsence, setMarkedAbsence] = useState<number[]>([]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-cream pb-10">
      {/* Navy greeting banner */}
      <div className="relative bg-navy pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-aqua/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-white/40 font-lato text-sm">Good morning,</p>
              <h1 className="font-nunito font-black text-3xl text-white flex items-center gap-2">
                Priya Sharma 👋
              </h1>
            </motion.div>
            <div className="flex items-center gap-3">
              <button className="relative w-11 h-11 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/15 transition-colors">
                <Bell size={18} className="text-white/70" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-orange rounded-full animate-pulse" />
              </button>
            </div>
          </div>

          {/* Child switcher tabs */}
          <div className="flex gap-2 mb-6">
            {CHILDREN.map((child, i) => (
              <button
                key={child.id}
                onClick={() => setActiveChild(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-poppins font-semibold text-sm transition-all duration-200 ${
                  activeChild === i
                    ? "bg-orange text-white shadow-md shadow-orange/30"
                    : "bg-white/10 text-white/60 hover:bg-white/15"
                }`}
              >
                <span>{child.name[0]}</span>
                {child.name}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DASHBOARD_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/8 border border-white/10 rounded-2xl p-3 flex flex-col gap-1"
              >
                <p className="font-poppins text-white/40 text-[10px] uppercase tracking-wider">{stat.label}</p>
                <p className="font-bebas text-3xl text-white tracking-wide">{stat.value}</p>
                <p className="font-lato text-white/35 text-[10px]">{stat.trend}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-8 mt-8">
        {/* My Children */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nunito font-bold text-navy text-xl">My Children</h2>
            <Link href="/auth/register" className="text-orange font-poppins text-sm hover:text-orange-hover transition-colors flex items-center gap-1">
              + Add child
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
            {CHILDREN.map((child, i) => (
              <div key={child.id} className="shrink-0 w-56">
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
                  className="bg-navy-light border border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer group hover:border-white/20 transition-all duration-200"
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
                className={`bg-white border border-cream-dark rounded-2xl p-4 flex items-center gap-4 shadow-sm border-l-4 ${session.sportColor} ${
                  markedAbsence.includes(session.id) ? "opacity-50" : ""
                }`}
              >
                {/* Date badge */}
                <div className="bg-gradient-to-b from-orange to-orange-hover rounded-xl p-2 text-center shrink-0 min-w-[52px]">
                  <p className="text-white/80 font-poppins text-[10px] uppercase">{session.date}</p>
                  <p className="text-white font-bebas text-2xl leading-none">{session.dateNum}</p>
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
                    <span>·</span>
                    <span>{session.child}</span>
                  </div>
                </div>

                {!markedAbsence.includes(session.id) ? (
                  <button
                    onClick={() => setMarkedAbsence([...markedAbsence, session.id])}
                    className="text-navy/25 font-poppins text-xs hover:text-red-400 transition-colors shrink-0"
                  >
                    Mark absent
                  </button>
                ) : (
                  <button
                    onClick={() => setMarkedAbsence(markedAbsence.filter((id) => id !== session.id))}
                    className="text-xs font-poppins text-red-400 flex items-center gap-1 shrink-0"
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
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-gradient-to-br from-gold/20 to-orange/10 border border-gold/30 rounded-2xl p-5 shadow-sm shrink-0 w-48"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{milestone.icon}</span>
                  <button className="text-navy/30 hover:text-gold transition-colors">
                    <Share2 size={13} />
                  </button>
                </div>
                <p className="font-nunito font-bold text-navy text-sm mb-1">{milestone.name}</p>
                <p className="text-navy/50 font-lato text-xs mb-3 leading-tight">{milestone.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange font-poppins text-xs font-semibold">{milestone.child}</span>
                  <span className="text-navy/30 font-lato text-[10px]">{milestone.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recommended Academies */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-nunito font-bold text-navy text-xl">Recommended for You</h2>
            <Link href="/discover" className="text-orange font-poppins text-sm hover:text-orange-hover transition-colors flex items-center gap-1">
              See all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RECOMMENDED.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`h-24 bg-gradient-to-br ${a.gradient} flex items-center justify-center relative`}>
                  <span className="text-5xl opacity-25">{a.icon}</span>
                  <div className="absolute bottom-2 left-3">
                    <span className="bg-navy/70 text-white/90 font-poppins text-xs px-2.5 py-1 rounded-full">
                      {a.icon} {a.sport}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-nunito font-bold text-navy text-sm">{a.name}</p>
                    <p className="font-lato text-navy/50 text-xs">{a.distance} · ⭐ {a.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bebas text-xl text-navy">₹{a.price.toLocaleString()}</p>
                    <p className="font-lato text-navy/40 text-xs">/mo</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
