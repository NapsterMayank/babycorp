"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  IndianRupee,
  FileText,
  Settings,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  Users,
  Clock,
  Menu,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";

type Tab = "dashboard" | "academies" | "bookings" | "revenue" | "content" | "settings";

const PLATFORM_STATS = [
  { label: "Total Academies", value: "312", icon: Building2, trend: "+8 this week", trendUp: true, iconBg: "bg-orange/10", iconColor: "text-orange" },
  { label: "Active Parents", value: "4,891", icon: Users, trend: "+124 this week", trendUp: true, iconBg: "bg-aqua/10", iconColor: "text-aqua" },
  { label: "GMV This Month", value: "₹38.4L", icon: IndianRupee, trend: "+22% vs last month", trendUp: true, iconBg: "bg-green-500/10", iconColor: "text-green-400" },
  { label: "Commission Earned", value: "₹3.84L", icon: TrendingUp, trend: "10% of GMV", trendUp: true, iconBg: "bg-gold/10", iconColor: "text-gold" },
];

const VERIFICATION_QUEUE = [
  { id: "v1", name: "Mumbai Cricket Club", owner: "Anil Kapoor", sport: "Cricket", icon: "🏏", city: "Mumbai", submitted: "Apr 4, 2026", docs: 4 },
  { id: "v2", name: "Bengaluru Swim Academy", owner: "Deepa Rao", sport: "Swimming", icon: "🏊", city: "Bengaluru", submitted: "Apr 3, 2026", docs: 5 },
  { id: "v3", name: "Delhi Chess Club", owner: "Ravi Reddy", sport: "Chess", icon: "♟️", city: "Delhi", submitted: "Apr 2, 2026", docs: 3 },
];

const ACTIVITY_FEED = [
  { type: "academy", content: "Mumbai Cricket Club submitted for verification", time: "2h ago", icon: Building2, color: "text-orange" },
  { type: "enrollment", content: "Priya Sharma enrolled Aryan in Champions Cricket", time: "3h ago", icon: Users, color: "text-aqua" },
  { type: "booking", content: "12 new trial bookings today", time: "5h ago", icon: Calendar, color: "text-gold" },
  { type: "payment", content: "April renewals: ₹8.2L processed", time: "6h ago", icon: IndianRupee, color: "text-green-400" },
  { type: "review", content: "New 5-star review for Champions Cricket Club", time: "8h ago", icon: CheckCircle, color: "text-aqua" },
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
  const router = useRouter();
  const { isLoggedIn, role } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) { router.push("/auth/login"); return; }
    if (role !== "admin") router.push("/");
  }, [isLoggedIn, role, router]);

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex pt-16">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-60 bg-navy border-r border-white/10 flex flex-col z-50 lg:z-auto transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-white/10">
          <p className="font-nunito font-bold text-white text-base">BabyCorp Admin</p>
          <p className="font-lato text-white/40 text-xs mt-0.5">Platform Control Center</p>
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
          <div className="flex items-center gap-4 relative z-10">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Menu size={16} className="text-white" />
            </button>
            <div>
              <p className="font-lato text-white/40 text-sm">Platform Overview</p>
              <h1 className="font-nunito font-black text-2xl text-white">Admin Dashboard</h1>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Platform stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PLATFORM_STATS.map((stat, i) => (
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
                />
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Verification queue */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-nunito font-bold text-navy text-xl">Pending Verification</h2>
                <span className="bg-orange/10 text-orange font-poppins font-bold text-sm px-3 py-1 rounded-full">
                  {VERIFICATION_QUEUE.length} pending
                </span>
              </div>
              <div className="space-y-3">
                {VERIFICATION_QUEUE.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white border border-cream-dark rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-nunito font-bold text-navy text-sm">{item.name}</p>
                        <p className="font-lato text-navy/50 text-xs">
                          {item.owner} · {item.city} · {item.docs} docs submitted
                        </p>
                      </div>
                      <span className="font-lato text-navy/30 text-xs flex items-center gap-1 shrink-0">
                        <Clock size={10} /> {item.submitted}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 bg-aqua/10 border border-aqua/20 text-aqua font-poppins font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-aqua/15 transition-colors">
                        <Eye size={12} /> Review
                      </button>
                      <button className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-600 font-poppins font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors">
                        <CheckCircle size={12} /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-500 font-poppins font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors">
                        <XCircle size={12} /> Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Activity feed */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-nunito font-bold text-navy text-xl mb-4">Activity Feed</h2>
              <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden shadow-sm">
                {ACTIVITY_FEED.map((event, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 ${i < ACTIVITY_FEED.length - 1 ? "border-b border-cream-dark" : ""}`}
                  >
                    <div className="w-8 h-8 bg-cream rounded-xl flex items-center justify-center shrink-0">
                      <event.icon size={14} className={event.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-lato text-navy/70 text-sm leading-snug">{event.content}</p>
                      <p className="font-lato text-navy/30 text-xs mt-0.5">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
