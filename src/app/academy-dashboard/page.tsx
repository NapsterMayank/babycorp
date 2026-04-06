"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  IndianRupee,
  Settings,
  Search,
  MessageCircle,
  Flame,
  AlertCircle,
  Plus,
  ChevronDown,
  Star,
} from "lucide-react";

type Tab = "overview" | "students" | "schedule" | "progress";

const STATS = [
  { label: "Active Students", value: "48", icon: Users, trend: "+3 this month", trendUp: true },
  { label: "Revenue (Apr)", value: "₹1.44L", icon: IndianRupee, trend: "+12%", trendUp: true },
  { label: "Trial Conversion", value: "72%", icon: TrendingUp, trend: "+5% vs last month", trendUp: true },
  { label: "Avg Rating", value: "4.8", icon: Star, trend: "Based on 124 reviews", trendUp: true },
];

const TODAY_SESSIONS = [
  { time: "7:00 AM", batch: "Football U8–U10", sport: "Football", icon: "⚽", students: 8, color: "from-orange to-orange-hover" },
  { time: "8:00 AM", batch: "Football U11–U14", sport: "Football", icon: "⚽", students: 10, color: "from-orange to-orange-hover" },
  { time: "5:00 PM", batch: "Cricket U10+", sport: "Cricket", icon: "🏏", students: 6, color: "from-gold to-yellow-400" },
];

const STUDENTS = [
  { id: "s1", name: "Aryan Sharma", age: 8, enrolled: "Jan 15, 2026", streak: 12, status: "active", batch: "Football U8–U10" },
  { id: "s2", name: "Rohan Gupta", age: 9, enrolled: "Feb 2, 2026", streak: 8, status: "active", batch: "Football U8–U10" },
  { id: "s3", name: "Kavya Nair", age: 10, enrolled: "Dec 10, 2025", streak: 0, status: "absent", batch: "Football U8–U10" },
  { id: "s4", name: "Dev Patel", age: 8, enrolled: "Mar 1, 2026", streak: 5, status: "active", batch: "Football U8–U10" },
  { id: "s5", name: "Isha Mehta", age: 9, enrolled: "Jan 20, 2026", streak: 15, status: "active", batch: "Football U8–U10" },
  { id: "s6", name: "Aditya Singh", age: 11, enrolled: "Nov 5, 2025", streak: 3, status: "active", batch: "Football U11–U14" },
];

const ALERTS = [
  { student: "Kavya Nair", absences: 4, batch: "Football U8–U10" },
  { student: "Dev Patel", absences: 3, batch: "Football U8–U10" },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SCHEDULE_SLOTS = [
  { day: "Mon", time: "5:00 PM", batch: "Football U11–U14", sport: "football" },
  { day: "Wed", time: "5:00 PM", batch: "Football U11–U14", sport: "football" },
  { day: "Fri", time: "5:00 PM", batch: "Football U11–U14", sport: "football" },
  { day: "Tue", time: "5:00 PM", batch: "Cricket U10+", sport: "cricket" },
  { day: "Thu", time: "5:00 PM", batch: "Cricket U10+", sport: "cricket" },
  { day: "Sat", time: "7:00 AM", batch: "Football U8–U10", sport: "football" },
  { day: "Sat", time: "8:00 AM", batch: "Football U11–U14", sport: "football" },
  { day: "Sun", time: "7:00 AM", batch: "Football U8–U10", sport: "football" },
  { day: "Sun", time: "9:00 AM", batch: "Swimming Basics", sport: "swimming" },
];

const SKILL_COLUMNS = ["Ball Ctrl", "Dribbling", "Passing", "Shooting", "Stamina"];
const ASSESSMENT_DATA = [
  { student: "Aryan Sharma", scores: [72, 65, 78, 58, 80] },
  { student: "Rohan Gupta", scores: [65, 70, 60, 75, 72] },
  { student: "Kavya Nair", scores: [80, 78, 85, 70, 88] },
  { student: "Dev Patel", scores: [45, 50, 55, 40, 60] },
  { student: "Isha Mehta", scores: [90, 85, 88, 80, 92] },
];

const sportColor: Record<string, string> = {
  football: "bg-orange/20 text-orange border-orange/30",
  cricket: "bg-gold/20 text-yellow-600 border-gold/30",
  swimming: "bg-aqua/20 text-aqua border-aqua/30",
};

const scoreColor = (score: number) =>
  score >= 70 ? "bg-green-100 text-green-700" : score >= 40 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600";

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-600",
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "revenue", label: "Revenue", icon: IndianRupee },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AcademyDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("Football U8–U10");

  const filteredStudents = STUDENTS.filter(
    (s) =>
      s.batch === selectedBatch &&
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <div className="min-h-screen bg-cream pt-16 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-navy min-h-screen fixed left-0 top-16 pt-6 pb-8 z-20">
        <div className="px-4 mb-6">
          <p className="text-white/30 font-poppins text-xs uppercase tracking-widest">Academy Panel</p>
          <p className="text-white font-nunito font-bold text-sm mt-1">Delhi Football Academy</p>
        </div>
        <nav className="flex-1 space-y-1 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => item.id in { overview: 1, students: 1, schedule: 1, progress: 1 } && setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-poppins font-medium text-sm transition-all ${
                activeTab === item.id
                  ? "bg-orange text-white shadow-lg shadow-orange/30"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-56 p-4 lg:p-6">
        {/* Mobile tab bar */}
        <div className="lg:hidden flex gap-1 overflow-x-auto pb-2 mb-4 -mx-4 px-4">
          {NAV_ITEMS.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-xl font-poppins font-medium text-xs transition-all ${
                activeTab === item.id ? "bg-orange text-white" : "bg-white border border-cream-dark text-navy/60"
              }`}
            >
              <item.icon size={13} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-nunito font-black text-2xl text-navy"
            >
              Academy Overview
            </motion.h1>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-cream-dark rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-navy/50 font-poppins text-xs">{stat.label}</p>
                    <div className="bg-orange/10 p-1.5 rounded-lg">
                      <stat.icon size={14} className="text-orange" />
                    </div>
                  </div>
                  <p className="font-nunito font-black text-2xl text-navy">{stat.value}</p>
                  <p className="text-green-600 font-lato text-xs mt-1">{stat.trend}</p>
                </motion.div>
              ))}
            </div>

            {/* Alerts */}
            {ALERTS.length > 0 && (
              <motion.div {...fadeInUp} className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-amber-600" />
                  <p className="font-poppins font-semibold text-amber-700 text-sm">{ALERTS.length} students need attention</p>
                </div>
                <div className="space-y-2">
                  {ALERTS.map((alert, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-xl p-3">
                      <div>
                        <p className="font-poppins font-semibold text-navy text-sm">{alert.student}</p>
                        <p className="text-navy/50 font-lato text-xs">{alert.batch}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-700 font-poppins text-xs px-2 py-0.5 rounded-full">
                          {alert.absences} absences
                        </span>
                        <button className="text-[#25D366]">
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Today's sessions */}
            <motion.div {...fadeInUp}>
              <h2 className="font-nunito font-bold text-navy text-xl mb-4">Today's Sessions</h2>
              <div className="space-y-3">
                {TODAY_SESSIONS.map((session, i) => (
                  <div key={i} className="bg-white border border-cream-dark rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className={`bg-gradient-to-br ${session.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md`}>
                      {session.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-nunito font-bold text-navy">{session.batch}</p>
                      <p className="text-navy/50 font-lato text-xs">{session.time} · {session.students} students</p>
                    </div>
                    <button className="text-orange font-poppins text-sm font-medium hover:text-orange-hover transition-colors">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Students */}
        {activeTab === "students" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-nunito font-black text-2xl text-navy">Students</h1>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-white border border-cream-dark rounded-xl px-4 py-2.5 flex-1">
                <Search size={16} className="text-navy/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students..."
                  className="flex-1 font-poppins text-sm text-navy placeholder:text-navy/30 focus:outline-none bg-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="appearance-none bg-white border border-cream-dark rounded-xl px-4 py-2.5 font-poppins text-sm text-navy pr-8 focus:outline-none"
                >
                  {["Football U8–U10", "Football U11–U14", "Cricket U10+"].map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
              </div>
            </div>

            {/* Student list */}
            <div className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden">
              {filteredStudents.map((student, i) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`flex items-center gap-4 px-5 py-4 ${i < filteredStudents.length - 1 ? "border-b border-cream-dark" : ""} hover:bg-cream/50 transition-colors`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange to-gold rounded-xl flex items-center justify-center text-white font-nunito font-bold text-sm shadow-md shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins font-semibold text-navy text-sm">{student.name}</p>
                    <p className="text-navy/40 font-lato text-xs">Age {student.age} · Enrolled {student.enrolled}</p>
                  </div>

                  {/* Streak */}
                  <div className="flex items-center gap-1 shrink-0">
                    {student.streak >= 5 ? (
                      <span className="flex items-center gap-1 bg-orange/10 text-orange text-xs font-poppins font-semibold px-2 py-1 rounded-full">
                        <Flame size={11} /> {student.streak}d
                      </span>
                    ) : (
                      <span className="text-navy/30 font-lato text-xs">{student.streak}d</span>
                    )}
                  </div>

                  {/* Status */}
                  <span className={`${STATUS_STYLES[student.status]} text-xs font-poppins font-semibold px-2.5 py-1 rounded-full shrink-0`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="text-navy/40 hover:text-orange transition-colors p-1" title="WhatsApp">
                      <MessageCircle size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-navy/30 font-lato">No students found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schedule */}
        {activeTab === "schedule" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-nunito font-black text-2xl text-navy">Weekly Schedule</h1>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 bg-navy text-white font-poppins font-medium text-sm px-4 py-2 rounded-full">
                  <Plus size={14} /> Add Session
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {[
                { sport: "Football", color: "bg-orange/20 text-orange" },
                { sport: "Cricket", color: "bg-gold/20 text-yellow-600" },
                { sport: "Swimming", color: "bg-aqua/20 text-aqua" },
              ].map((l) => (
                <span key={l.sport} className={`flex items-center gap-1.5 text-xs font-poppins px-3 py-1.5 rounded-full ${l.color}`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {l.sport}
                </span>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[640px] bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="grid grid-cols-8 border-b border-cream-dark">
                  <div className="py-3 px-3 bg-cream-dark text-navy/50 font-poppins text-xs font-medium">Time</div>
                  {WEEK_DAYS.map((d) => (
                    <div key={d} className="py-3 px-2 bg-cream-dark text-center text-navy font-poppins font-semibold text-xs">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Time rows */}
                {["7:00 AM", "8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM"].map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b border-cream-dark last:border-0">
                    <div className="py-3 px-3 text-navy/40 font-lato text-xs flex items-center">{time}</div>
                    {WEEK_DAYS.map((day) => {
                      const slot = SCHEDULE_SLOTS.find((s) => s.day === day && s.time === time);
                      return (
                        <div key={day} className="py-2 px-1 min-h-[56px] flex items-center justify-center">
                          {slot ? (
                            <div className={`w-full rounded-lg px-2 py-1.5 text-[10px] font-poppins font-medium border ${sportColor[slot.sport]}`}>
                              {slot.batch}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress / Assessment */}
        {activeTab === "progress" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-nunito font-black text-2xl text-navy">Bulk Assessment</h1>
              <button className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/30 transition-all">
                Start Assessment
              </button>
            </div>
            <p className="text-navy/50 font-lato text-sm">Football — {selectedBatch}</p>

            <div className="overflow-x-auto">
              <div className="min-w-[600px] bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="flex border-b border-cream-dark bg-cream-dark">
                  <div className="py-3 px-4 w-40 shrink-0 text-navy/50 font-poppins text-xs font-medium uppercase">Student</div>
                  {SKILL_COLUMNS.map((col) => (
                    <div key={col} className="flex-1 py-3 px-2 text-center text-navy/50 font-poppins text-xs font-medium uppercase">
                      {col}
                    </div>
                  ))}
                </div>

                {ASSESSMENT_DATA.map((row, i) => (
                  <motion.div
                    key={row.student}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-center ${i < ASSESSMENT_DATA.length - 1 ? "border-b border-cream-dark" : ""} hover:bg-cream/30 transition-colors`}
                  >
                    <div className="w-40 shrink-0 py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-orange to-gold rounded-lg flex items-center justify-center text-white font-nunito font-bold text-xs">
                          {row.student.charAt(0)}
                        </div>
                        <p className="font-poppins font-medium text-navy text-xs truncate">{row.student.split(" ")[0]}</p>
                      </div>
                    </div>
                    {row.scores.map((score, j) => (
                      <div key={j} className="flex-1 py-3 px-2 text-center">
                        <span className={`${scoreColor(score)} text-xs font-poppins font-semibold px-2.5 py-1 rounded-lg`}>
                          {score}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "70–100: Good", color: "bg-green-100 text-green-700" },
                { label: "40–69: Average", color: "bg-amber-100 text-amber-700" },
                { label: "0–39: Needs work", color: "bg-red-100 text-red-600" },
              ].map((l) => (
                <span key={l.label} className={`text-xs font-poppins px-3 py-1 rounded-full ${l.color}`}>{l.label}</span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
