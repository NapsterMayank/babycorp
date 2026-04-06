"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  IndianRupee,
  FileText,
  Settings,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

type Tab = "dashboard" | "academies" | "bookings" | "revenue" | "content" | "settings";

const PLATFORM_STATS = [
  { label: "Total Academies", value: "312", icon: Building2, trend: "+8 this week", trendUp: true },
  { label: "Active Parents", value: "4,891", icon: Users, trend: "+124 this week", trendUp: true },
  { label: "GMV This Month", value: "₹38.4L", icon: IndianRupee, trend: "+22% vs last month", trendUp: true },
  { label: "Commission Earned", value: "₹3.84L", icon: TrendingUp, trend: "10% of GMV", trendUp: true },
];

const VERIFICATION_QUEUE = [
  { id: "v1", name: "Mumbai Cricket Club", owner: "Anil Kapoor", sport: "Cricket", city: "Mumbai", submitted: "Apr 4, 2026", docs: 4 },
  { id: "v2", name: "Bengaluru Swim Academy", owner: "Deepa Rao", sport: "Swimming", city: "Bengaluru", submitted: "Apr 3, 2026", docs: 5 },
  { id: "v3", name: "Hyderabad FC Youth", owner: "Ravi Reddy", sport: "Football", city: "Hyderabad", submitted: "Apr 2, 2026", docs: 3 },
];

const ACTIVE_ACADEMIES = [
  { id: "a1", name: "Delhi Football Academy", owner: "Rahul Mehra", sport: "Football", city: "Delhi", students: 48, rating: 4.8, status: "active" },
  { id: "a2", name: "SwimStar Noida", owner: "Anjali Singh", sport: "Swimming", city: "Noida", students: 35, rating: 4.6, status: "active" },
  { id: "a3", name: "Champions Cricket Club", owner: "Vikas Yadav", sport: "Cricket", city: "Delhi", students: 62, rating: 4.9, status: "active" },
  { id: "a4", name: "Little Champions Gymnastics", owner: "Priya Nair", sport: "Gymnastics", city: "Mumbai", students: 28, rating: 4.7, status: "active" },
  { id: "a5", name: "Ace Tennis Academy", owner: "Arjun Kapoor", sport: "Tennis", city: "Gurgaon", students: 20, rating: 4.5, status: "suspended" },
];

const ACTIVITY_FEED = [
  { type: "new_academy", content: "Mumbai Cricket Club submitted for verification", time: "2h ago", icon: Building2 },
  { type: "enrollment", content: "Priya Sharma enrolled Aryan in Delhi Football Academy", time: "3h ago", icon: Users },
  { type: "booking", content: "12 new trial bookings today", time: "5h ago", icon: Calendar },
  { type: "payment", content: "April subscription renewals: ₹8.2L processed", time: "6h ago", icon: IndianRupee },
  { type: "review", content: "New 5-star review for Champions Cricket Club", time: "8h ago", icon: CheckCircle },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "academies", label: "Academies", icon: Building2 },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "revenue", label: "Revenue", icon: IndianRupee },
  { id: "content", label: "Content", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchAcademy, setSearchAcademy] = useState("");
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);

  const filteredAcademies = ACTIVE_ACADEMIES.filter((a) =>
    a.name.toLowerCase().includes(searchAcademy.toLowerCase()) ||
    a.city.toLowerCase().includes(searchAcademy.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cream pt-16 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-navy min-h-screen fixed left-0 top-16 pt-6 pb-8 z-20">
        <div className="px-4 mb-6">
          <p className="text-white/30 font-poppins text-xs uppercase tracking-widest">Admin Panel</p>
          <p className="text-white font-nunito font-bold text-sm mt-1">BabyCorp HQ</p>
        </div>

        {/* Pending badge */}
        <div className="mx-3 mb-4 bg-amber-500/20 border border-amber-500/30 rounded-xl p-3 flex items-center gap-2">
          <AlertCircle size={14} className="text-amber-400" />
          <div>
            <p className="text-amber-400 font-poppins text-xs font-semibold">{VERIFICATION_QUEUE.length} Pending</p>
            <p className="text-amber-400/70 font-lato text-[10px]">verifications</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-poppins font-medium text-sm transition-all ${
                activeTab === item.id
                  ? "bg-orange text-white shadow-lg shadow-orange/30"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === "academies" && VERIFICATION_QUEUE.length > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {VERIFICATION_QUEUE.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy border-t border-white/10 flex z-30">
        {NAV_ITEMS.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all ${
              activeTab === item.id ? "text-orange" : "text-white/40"
            }`}
          >
            <item.icon size={18} />
            <span className="text-[9px] font-poppins">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main */}
      <main className="flex-1 lg:ml-56 p-4 lg:p-6 pb-24 lg:pb-6">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-nunito font-black text-2xl text-navy">Platform Overview</h1>
              <p className="text-navy/50 font-lato text-sm">Sunday, 6 April 2026</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {PLATFORM_STATS.map((stat, i) => (
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

            {/* Verification alert */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-amber-600" />
                <div>
                  <p className="font-poppins font-semibold text-amber-700 text-sm">
                    {VERIFICATION_QUEUE.length} academies awaiting verification
                  </p>
                  <p className="text-amber-600/70 font-lato text-xs">Review and approve to maintain trust</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("academies")}
                className="shrink-0 bg-amber-500 text-white font-poppins font-semibold text-xs px-4 py-2 rounded-full hover:bg-amber-600 transition-colors"
              >
                Review Now
              </button>
            </motion.div>

            {/* Activity feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-nunito font-bold text-navy text-xl mb-4">Recent Activity</h2>
              <div className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden">
                {ACTIVITY_FEED.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 ${i < ACTIVITY_FEED.length - 1 ? "border-b border-cream-dark" : ""}`}
                  >
                    <div className="w-9 h-9 bg-orange/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={16} className="text-orange" />
                    </div>
                    <p className="flex-1 text-navy font-lato text-sm">{item.content}</p>
                    <div className="flex items-center gap-1 text-navy/30 font-lato text-xs shrink-0">
                      <Clock size={11} />
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Academies */}
        {activeTab === "academies" && (
          <div className="space-y-6">
            <h1 className="font-nunito font-black text-2xl text-navy">Academies</h1>

            {/* Verification Queue */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-nunito font-bold text-navy text-xl">Verification Queue</h2>
                <span className="bg-amber-100 text-amber-700 font-poppins font-bold text-xs px-2.5 py-1 rounded-full">
                  {VERIFICATION_QUEUE.filter((v) => !approvedIds.includes(v.id) && !rejectedIds.includes(v.id)).length}
                </span>
              </div>

              <div className="space-y-3">
                {VERIFICATION_QUEUE.map((academy, i) => {
                  const isApproved = approvedIds.includes(academy.id);
                  const isRejected = rejectedIds.includes(academy.id);
                  const isDone = isApproved || isRejected;
                  return (
                    <motion.div
                      key={academy.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${
                        isApproved ? "border-green-200 bg-green-50" : isRejected ? "border-red-200 bg-red-50" : "border-cream-dark"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-gold/10 rounded-xl flex items-center justify-center text-xl shrink-0">
                          🏫
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-nunito font-bold text-navy">{academy.name}</p>
                              <p className="text-navy/50 font-lato text-xs">
                                {academy.owner} · {academy.sport} · {academy.city}
                              </p>
                              <p className="text-navy/40 font-lato text-xs mt-1">
                                Submitted: {academy.submitted} · {academy.docs} documents
                              </p>
                            </div>
                            {isDone && (
                              <span className={`shrink-0 text-xs font-poppins font-semibold px-3 py-1 rounded-full ${isApproved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                {isApproved ? "Approved" : "Rejected"}
                              </span>
                            )}
                          </div>
                          {!isDone && (
                            <div className="flex gap-2 mt-4">
                              <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-cream-dark text-navy font-poppins font-medium text-xs hover:bg-cream transition-colors">
                                <Eye size={13} /> Review Docs
                              </button>
                              <button
                                onClick={() => setApprovedIds([...approvedIds, academy.id])}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-500 text-white font-poppins font-semibold text-xs hover:bg-green-600 transition-colors"
                              >
                                <CheckCircle size={13} /> Approve
                              </button>
                              <button
                                onClick={() => setRejectedIds([...rejectedIds, academy.id])}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-500 text-white font-poppins font-semibold text-xs hover:bg-red-600 transition-colors"
                              >
                                <XCircle size={13} /> Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Active Academies Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-nunito font-bold text-navy text-xl">Active Academies</h2>
              </div>

              <div className="flex items-center gap-2 bg-white border border-cream-dark rounded-xl px-4 py-2.5 mb-4">
                <Search size={16} className="text-navy/40" />
                <input
                  type="text"
                  value={searchAcademy}
                  onChange={(e) => setSearchAcademy(e.target.value)}
                  placeholder="Search academies or cities..."
                  className="flex-1 font-poppins text-sm text-navy placeholder:text-navy/30 focus:outline-none bg-transparent"
                />
              </div>

              <div className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-6 gap-3 px-5 py-3 bg-cream-dark text-navy/50 font-poppins text-xs font-medium uppercase">
                  <span className="col-span-2">Academy</span>
                  <span>Sport</span>
                  <span>City</span>
                  <span className="text-right">Students</span>
                  <span className="text-right">Actions</span>
                </div>

                {filteredAcademies.map((academy, i) => (
                  <motion.div
                    key={academy.id}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex flex-col sm:grid sm:grid-cols-6 gap-2 sm:gap-3 px-5 py-4 ${i < filteredAcademies.length - 1 ? "border-b border-cream-dark" : ""} hover:bg-cream/40 transition-colors`}
                  >
                    <div className="col-span-2">
                      <p className="font-poppins font-semibold text-navy text-sm">{academy.name}</p>
                      <p className="text-navy/40 font-lato text-xs">{academy.owner}</p>
                    </div>
                    <span className="text-navy/70 font-lato text-sm">{academy.sport}</span>
                    <span className="text-navy/70 font-lato text-sm">{academy.city}</span>
                    <div className="sm:text-right">
                      <span className="font-nunito font-bold text-navy text-sm">{academy.students}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-2">
                      <span className={`text-xs font-poppins font-semibold px-2.5 py-1 rounded-full ${academy.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {academy.status.charAt(0).toUpperCase() + academy.status.slice(1)}
                      </span>
                      <button className="text-red-400/60 hover:text-red-500 text-xs font-poppins transition-colors">
                        Suspend
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {(activeTab === "bookings" || activeTab === "revenue" || activeTab === "content" || activeTab === "settings") && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="text-6xl mb-4">
              {activeTab === "bookings" ? "📅" : activeTab === "revenue" ? "💰" : activeTab === "content" ? "📄" : "⚙️"}
            </div>
            <h2 className="font-nunito font-bold text-xl text-navy mb-2 capitalize">{activeTab}</h2>
            <p className="text-navy/40 font-lato text-sm">This section is coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
