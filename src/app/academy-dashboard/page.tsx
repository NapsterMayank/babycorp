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
  Flame,
  AlertCircle,
  Star,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";

type Tab = "overview" | "students" | "schedule" | "progress";

const STATS = [
  { label: "Active Students", value: "48", icon: Users, trend: "+3 this month", trendUp: true, iconBg: "bg-aqua/10", iconColor: "text-aqua" },
  { label: "Revenue (Apr)", value: "₹1.44L", icon: IndianRupee, trend: "+12% vs last month", trendUp: true, iconBg: "bg-green-500/10", iconColor: "text-green-400" },
  { label: "Trial Conversion", value: "72%", icon: TrendingUp, trend: "+5% vs last month", trendUp: true, iconBg: "bg-orange/10", iconColor: "text-orange" },
  { label: "Avg Rating", value: "4.8", icon: Star, trend: "Based on 124 reviews", trendUp: true, iconBg: "bg-gold/10", iconColor: "text-gold" },
];

const TODAY_SESSIONS = [
  { time: "7:00 AM", batch: "Cricket U8–U10", sport: "Cricket", icon: "🏏", students: 8, color: "from-[#1a3a1a] to-[#15803d]" },
  { time: "8:00 AM", batch: "Cricket U11–U14", sport: "Cricket", icon: "🏏", students: 10, color: "from-[#1a3a1a] to-[#15803d]" },
  { time: "5:00 PM", batch: "Chess Beginners", sport: "Chess", icon: "♟️", students: 6, color: "from-[#3E2723] to-[#6D4C41]" },
];

const STUDENTS = [
  { id: "s1", name: "Aryan Sharma", age: 8, enrolled: "Jan 15, 2026", streak: 12, status: "active", batch: "Cricket U8–U10" },
  { id: "s2", name: "Rohan Gupta", age: 9, enrolled: "Feb 2, 2026", streak: 8, status: "active", batch: "Cricket U8–U10" },
  { id: "s3", name: "Kavya Nair", age: 10, enrolled: "Dec 10, 2025", streak: 0, status: "absent", batch: "Cricket U8–U10" },
  { id: "s4", name: "Dev Patel", age: 8, enrolled: "Mar 1, 2026", streak: 5, status: "active", batch: "Cricket U8–U10" },
  { id: "s5", name: "Isha Mehta", age: 9, enrolled: "Jan 20, 2026", streak: 15, status: "active", batch: "Cricket U8–U10" },
];

const ALERTS = [
  { student: "Kavya Nair", absences: 4, batch: "Cricket U8–U10" },
  { student: "Dev Patel", absences: 3, batch: "Cricket U8–U10" },
];

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "revenue", label: "Revenue", icon: IndianRupee },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AcademyDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const filteredStudents = STUDENTS.filter((s) =>
    search ? s.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-cream flex pt-16">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-60 bg-navy border-r border-white/10 flex flex-col z-50 lg:z-auto transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-white/10">
          <p className="font-nunito font-bold text-white text-base">Champions Cricket Club</p>
          <p className="font-lato text-white/40 text-xs mt-0.5">Coach Vikas Yadav</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as Tab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-poppins font-medium text-sm transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-orange/15 text-orange border border-orange/20"
                  : "text-white/55 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="relative bg-navy border-b border-white/10 px-6 py-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange/8 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"
            >
              <Menu size={16} className="text-white" />
            </button>
            <div className="flex-1 relative z-10">
              <p className="font-lato text-white/40 text-sm">Good morning, Coach Vikas!</p>
              <h1 className="font-nunito font-black text-2xl text-white">{dateStr}</h1>
            </div>
            <button className="w-10 h-10 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center">
              <Search size={16} className="text-white/60" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  iconBg={stat.iconBg}
                  iconColor={stat.iconColor}
                  trend={stat.trend}
                  trendUp={stat.trendUp}
                  dark={false}
                />
              </motion.div>
            ))}
          </div>

          {/* Today's sessions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-nunito font-bold text-navy text-xl mb-4">Today&apos;s Sessions</h2>
            <div className="space-y-3">
              {TODAY_SESSIONS.map((session, i) => (
                <div
                  key={i}
                  className="bg-white border border-cream-dark rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${session.color} rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                    {session.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-nunito font-bold text-navy text-base">{session.batch}</p>
                    <p className="font-lato text-navy/50 text-sm flex items-center gap-2">
                      <Calendar size={12} /> {session.time}
                      <span>·</span>
                      <Users size={12} /> {session.students} students
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 text-orange font-poppins font-semibold text-sm hover:text-orange-hover transition-colors">
                    Manage <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Absence alerts */}
          {ALERTS.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-nunito font-bold text-navy text-xl mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" />
                Attendance Flags
              </h2>
              <div className="space-y-3">
                {ALERTS.map((alert, i) => (
                  <div
                    key={i}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <AlertCircle size={18} className="text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-poppins font-semibold text-amber-700 text-sm">
                        {alert.student} — {alert.absences} absences this month
                      </p>
                      <p className="font-lato text-amber-600/70 text-xs">{alert.batch}</p>
                    </div>
                    <button className="text-amber-600 font-poppins font-semibold text-xs hover:text-amber-700">
                      Notify Parent
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Student roster */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-nunito font-bold text-navy text-xl">Student Roster</h2>
              <div className="flex items-center gap-2 bg-white border border-cream-dark rounded-xl px-3 py-2">
                <Search size={14} className="text-navy/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search students..."
                  className="bg-transparent font-poppins text-sm text-navy placeholder:text-navy/30 focus:outline-none w-36"
                />
              </div>
            </div>

            <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 px-5 py-3 bg-cream border-b border-cream-dark text-navy/50 font-poppins font-semibold text-xs uppercase tracking-wide">
                <span className="col-span-4">Student</span>
                <span className="col-span-3">Batch</span>
                <span className="col-span-2 text-center">Streak</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-1" />
              </div>

              {filteredStudents.map((student, i) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`grid grid-cols-12 px-5 py-3.5 items-center hover:bg-cream-dark/50 transition-colors cursor-pointer ${
                    i < filteredStudents.length - 1 ? "border-b border-cream-dark" : ""
                  }`}
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-white font-nunito font-black text-sm shrink-0">
                      {student.name[0]}
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-navy text-sm">{student.name}</p>
                      <p className="font-lato text-navy/40 text-xs">{student.age} yrs · Since {student.enrolled}</p>
                    </div>
                  </div>
                  <span className="col-span-3 font-lato text-navy/60 text-sm">{student.batch}</span>
                  <div className="col-span-2 flex items-center justify-center gap-1">
                    <Flame size={13} className={student.streak > 0 ? "text-orange" : "text-navy/20"} />
                    <span className="font-bebas text-lg text-navy">{student.streak}</span>
                  </div>
                  <span className={`col-span-2 text-xs font-poppins font-semibold px-2.5 py-0.5 rounded-full w-fit ${
                    student.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                  }`}>
                    {student.status === "active" ? "Active" : "Absent"}
                  </span>
                  <button className="col-span-1 text-orange/60 hover:text-orange transition-colors flex justify-end">
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      {/* Backdrop for drawer */}
      {selectedStudent && (
        <div
          className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSelectedStudent(null)}
        />
      )}

      {/* Student Details Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-cream shadow-2xl border-l border-cream-dark z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          selectedStudent ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedStudent && (
          <>
            <div className="p-6 border-b border-cream-dark flex items-center justify-between bg-white shrink-0">
              <h3 className="font-nunito font-bold text-navy text-xl">Student Profile</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 flex items-center justify-center bg-cream rounded-full hover:bg-cream-dark transition-colors"
              >
                <X size={18} className="text-navy" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-white font-nunito font-black text-2xl shrink-0 shadow-md">
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h4 className="font-nunito font-bold text-navy text-xl">{selectedStudent.name}</h4>
                  <p className="font-lato text-navy/60 text-sm mt-0.5">
                    {selectedStudent.age} yrs · Enrolled {selectedStudent.enrolled}
                  </p>
                  <p className="font-poppins text-orange font-semibold text-xs mt-1">
                    {selectedStudent.batch}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm space-y-5">
                <h5 className="font-nunito font-bold text-navy flex items-center gap-2">
                  <TrendingUp size={18} className="text-orange" />
                  Performance Overview
                </h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-poppins text-navy/70 text-xs font-semibold uppercase tracking-wider">Attendance Rate</span>
                      <span className="font-poppins text-green-600 font-bold">92%</span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-poppins text-navy/70 text-xs font-semibold uppercase tracking-wider">Skill Progression</span>
                      <span className="font-poppins text-orange font-bold">Level 4</span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden">
                      <div className="h-full bg-orange rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm space-y-4">
                <h5 className="font-nunito font-bold text-navy flex items-center gap-2">
                  <Star size={18} className="text-gold" />
                  Recent Activity
                </h5>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 bg-cream-dark p-1.5 rounded-lg"><Calendar size={14} className="text-navy" /></div>
                    <div>
                      <p className="font-poppins text-sm text-navy font-semibold">Attended Match Practice</p>
                      <p className="font-lato text-xs text-navy/50 mt-0.5">Today, 8:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 bg-gold/10 p-1.5 rounded-lg"><Star size={14} className="text-gold" /></div>
                    <div>
                      <p className="font-poppins text-sm text-navy font-semibold">Awarded Player of the Week</p>
                      <p className="font-lato text-xs text-navy/50 mt-0.5">Last week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
