"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  LayoutDashboard, Users, Calendar, TrendingUp, IndianRupee, Settings,
  Search, Flame, AlertCircle, Star, Menu, X, ChevronRight,
  Bell, Shield, CreditCard, MapPin, Phone, Mail, Camera,
  Save, Eye, EyeOff, ToggleLeft, ToggleRight, Trash2, Plus,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";

type Tab = "overview" | "students" | "schedule" | "progress" | "revenue" | "settings";

// ── Static mock data ────────────────────────────────────────────
const STATS = [
  { label: "Active Students", value: "48",    icon: Users,       trend: "+3 this month",       trendUp: true,  iconBg: "bg-aqua/10",       iconColor: "text-aqua"       },
  { label: "Revenue (Apr)",   value: "₹1.44L", icon: IndianRupee, trend: "+12% vs last month",  trendUp: true,  iconBg: "bg-green-500/10",  iconColor: "text-green-400"  },
  { label: "Trial Conv.",     value: "72%",    icon: TrendingUp,  trend: "+5% vs last month",   trendUp: true,  iconBg: "bg-orange/10",     iconColor: "text-orange"     },
  { label: "Avg Rating",      value: "4.8",    icon: Star,        trend: "Based on 124 reviews", trendUp: true, iconBg: "bg-gold/10",       iconColor: "text-gold"       },
];

const TODAY_SESSIONS = [
  { time: "7:00 AM", batch: "Cricket U8–U10",  sport: "Cricket", icon: "🏏", students: 8,  color: "from-[#1a3a1a] to-[#15803d]" },
  { time: "8:00 AM", batch: "Cricket U11–U14", sport: "Cricket", icon: "🏏", students: 10, color: "from-[#1a3a1a] to-[#15803d]" },
  { time: "5:00 PM", batch: "Chess Beginners", sport: "Chess",   icon: "♟️", students: 6,  color: "from-[#3E2723] to-[#6D4C41]" },
];

const STUDENTS = [
  { id: "s1", name: "Aryan Sharma",  age: 8,  enrolled: "Jan 15, 2026", streak: 12, status: "active", batch: "Cricket U8–U10"  },
  { id: "s2", name: "Rohan Gupta",   age: 9,  enrolled: "Feb 2, 2026",  streak: 8,  status: "active", batch: "Cricket U8–U10"  },
  { id: "s3", name: "Kavya Nair",    age: 10, enrolled: "Dec 10, 2025", streak: 0,  status: "absent", batch: "Cricket U8–U10"  },
  { id: "s4", name: "Dev Patel",     age: 8,  enrolled: "Mar 1, 2026",  streak: 5,  status: "active", batch: "Cricket U8–U10"  },
  { id: "s5", name: "Isha Mehta",    age: 9,  enrolled: "Jan 20, 2026", streak: 15, status: "active", batch: "Cricket U8–U10"  },
];

const ALERTS = [
  { student: "Kavya Nair", absences: 4, batch: "Cricket U8–U10" },
  { student: "Dev Patel",  absences: 3, batch: "Cricket U8–U10" },
];

const NAV_ITEMS = [
  { id: "overview",  label: "Overview",  icon: LayoutDashboard },
  { id: "students",  label: "Students",  icon: Users           },
  { id: "schedule",  label: "Schedule",  icon: Calendar        },
  { id: "progress",  label: "Progress",  icon: TrendingUp      },
  { id: "revenue",   label: "Revenue",   icon: IndianRupee     },
  { id: "settings",  label: "Settings",  icon: Settings        },
];

// ── Settings panel ──────────────────────────────────────────────
type SettingsSection = "profile" | "notifications" | "payout" | "security";

function SettingsPanel() {
  const [section, setSection] = useState<SettingsSection>("profile");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    academyName: "Champions Cricket Club",
    coachName: "Coach Vikas Yadav",
    email: "vikas@champions.in",
    phone: "9876543210",
    city: "Delhi",
    address: "Sector 18, Noida, UP 201301",
    description: "Premier cricket academy for kids aged 6–18. Trained by national-level coaches.",
  });

  // Notifications state
  const [notifs, setNotifs] = useState({
    newEnrollment:   true,
    absenceAlert:    true,
    paymentReceived: true,
    reviewPosted:    false,
    weeklyReport:    true,
    appUpdates:      false,
  });

  // Payout state
  const [payout, setPayout] = useState({
    accountHolder: "Vikas Yadav",
    bankName: "HDFC Bank",
    accountNumber: "••••••••5432",
    ifsc: "HDFC0001234",
    upiId: "vikas@hdfcbank",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SECTIONS: { id: SettingsSection; label: string; icon: React.ElementType }[] = [
    { id: "profile",       label: "Academy Profile",    icon: Camera       },
    { id: "notifications", label: "Notifications",      icon: Bell         },
    { id: "payout",        label: "Payout & Billing",   icon: CreditCard   },
    { id: "security",      label: "Security",           icon: Shield       },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Section nav */}
      <div className="lg:w-52 shrink-0">
        <div className="bg-white border border-cream-dark rounded-2xl p-2 shadow-sm">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-poppins font-medium text-sm transition-all duration-200 ${
                section === s.id
                  ? "bg-orange/10 text-orange border border-orange/20"
                  : "text-navy/55 hover:text-navy hover:bg-cream"
              }`}
            >
              <s.icon size={15} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {/* ── Profile ── */}
          {section === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm space-y-5"
            >
              <h3 className="font-nunito font-bold text-navy text-lg">Academy Profile</h3>

              {/* Avatar row */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center text-white font-nunito font-black text-2xl shadow-md">
                  C
                </div>
                <div>
                  <button className="flex items-center gap-1.5 bg-orange/10 text-orange border border-orange/20 font-poppins font-semibold text-xs px-4 py-2 rounded-full hover:bg-orange/20 transition-all">
                    <Camera size={12} /> Change Logo
                  </button>
                  <p className="text-navy/35 font-lato text-xs mt-1.5">JPG or PNG · max 2 MB</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Academy Name",   key: "academyName", icon: LayoutDashboard },
                  { label: "Coach / Owner",  key: "coachName",   icon: Users           },
                  { label: "Email Address",  key: "email",       icon: Mail            },
                  { label: "Phone Number",   key: "phone",       icon: Phone           },
                  { label: "City",           key: "city",        icon: MapPin          },
                  { label: "Full Address",   key: "address",     icon: MapPin          },
                ].map(({ label, key, icon: Icon }) => (
                  <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                    <label className="block text-navy/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider flex items-center gap-1">
                      <Icon size={11} /> {label}
                    </label>
                    <input
                      type="text"
                      value={profile[key as keyof typeof profile]}
                      onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-2.5 text-navy font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="block text-navy/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">About Your Academy</label>
                  <textarea
                    value={profile.description}
                    onChange={(e) => setProfile((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-2.5 text-navy font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all resize-none"
                  />
                  <p className="text-navy/30 font-lato text-xs mt-1">{profile.description.length} / 300 characters</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-cream-dark">
                <button className="flex items-center gap-2 text-red-400 font-poppins font-semibold text-sm hover:text-red-500 transition-colors">
                  <Trash2 size={14} /> Delete Academy Account
                </button>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 ${
                    saved
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02]"
                  }`}
                >
                  <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Notifications ── */}
          {section === "notifications" && (
            <motion.div
              key="notifs"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm space-y-5"
            >
              <h3 className="font-nunito font-bold text-navy text-lg">Notification Preferences</h3>
              <p className="font-lato text-navy/45 text-sm -mt-2">Choose what alerts you receive via WhatsApp and email.</p>

              <div className="space-y-1">
                {[
                  { key: "newEnrollment",   label: "New enrollment",          desc: "When a parent enrolls their child in your batch"        },
                  { key: "absenceAlert",    label: "Absence alerts",          desc: "When a student misses 3+ sessions in a month"           },
                  { key: "paymentReceived", label: "Payment received",        desc: "When a new fee payment clears"                          },
                  { key: "reviewPosted",    label: "New review posted",       desc: "When a parent posts a rating or review"                 },
                  { key: "weeklyReport",    label: "Weekly summary report",   desc: "Every Monday — attendance, revenue, and new enrollments" },
                  { key: "appUpdates",      label: "BabyCorp product updates", desc: "New features and platform announcements"               },
                ].map(({ key, label, desc }) => {
                  const on = notifs[key as keyof typeof notifs];
                  return (
                    <div key={key} className="flex items-center justify-between py-3.5 border-b border-cream-dark last:border-0">
                      <div>
                        <p className="font-poppins font-semibold text-navy text-sm">{label}</p>
                        <p className="font-lato text-navy/40 text-xs mt-0.5">{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifs((n) => ({ ...n, [key]: !on }))}
                        className="shrink-0 ml-4 transition-colors duration-200"
                      >
                        {on
                          ? <ToggleRight size={30} className="text-orange" />
                          : <ToggleLeft  size={30} className="text-navy/25" />
                        }
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2 border-t border-cream-dark">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 ${
                    saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02]"
                  }`}
                >
                  <Save size={14} /> {saved ? "Saved!" : "Save Preferences"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Payout ── */}
          {section === "payout" && (
            <motion.div
              key="payout"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Bank account */}
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-nunito font-bold text-navy text-lg">Bank Account</h3>
                  <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 font-poppins font-semibold px-2.5 py-1 rounded-full">Verified</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Account Holder Name", key: "accountHolder" },
                    { label: "Bank Name",            key: "bankName"      },
                    { label: "Account Number",       key: "accountNumber" },
                    { label: "IFSC Code",            key: "ifsc"          },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-navy/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">{label}</label>
                      <input
                        type="text"
                        value={payout[key as keyof typeof payout]}
                        onChange={(e) => setPayout((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-2.5 text-navy font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 text-orange font-poppins font-semibold text-sm hover:text-orange-hover transition-colors">
                  <Plus size={14} /> Add another bank account
                </button>
              </div>

              {/* UPI */}
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-nunito font-bold text-navy text-lg">UPI ID</h3>
                <div>
                  <label className="block text-navy/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">UPI Handle</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={payout.upiId}
                      onChange={(e) => setPayout((p) => ({ ...p, upiId: e.target.value }))}
                      className="flex-1 bg-cream border border-cream-dark rounded-xl px-4 py-2.5 text-navy font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                    />
                    <button className="bg-cream border border-cream-dark text-navy font-poppins font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-cream-dark transition-all">
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              {/* Payout schedule */}
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-3">Payout Schedule</h3>
                <div className="space-y-2">
                  {["Weekly (every Friday)", "Bi-weekly (1st & 15th)", "Monthly (1st of month)"].map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer py-2 hover:bg-cream rounded-xl px-2 -mx-2 transition-colors">
                      <input type="radio" name="payout_sched" defaultChecked={i === 0} className="accent-orange" />
                      <span className="font-poppins text-navy text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 ${
                    saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-orange to-orange-hover text-white hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02]"
                  }`}
                >
                  <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Security ── */}
          {section === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Change password */}
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-nunito font-bold text-navy text-lg">Change Password</h3>
                {[
                  { label: "Current Password",  placeholder: "••••••••" },
                  { label: "New Password",       placeholder: "Min. 8 characters" },
                  { label: "Confirm New Password", placeholder: "Re-enter new password" },
                ].map(({ label, placeholder }, i) => (
                  <div key={i}>
                    <label className="block text-navy/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">{label}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        className="w-full bg-cream border border-cream-dark rounded-xl px-4 py-2.5 pr-10 text-navy font-poppins text-sm focus:outline-none focus:border-orange/50 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ))}
                <button className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] transition-all duration-300">
                  Update Password
                </button>
              </div>

              {/* 2FA */}
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-nunito font-bold text-navy text-lg">Two-Factor Authentication</h3>
                    <p className="font-lato text-navy/45 text-sm mt-1">Add an extra layer of security via SMS OTP on every login.</p>
                  </div>
                  <span className="shrink-0 text-[10px] bg-amber-50 text-amber-600 border border-amber-200 font-poppins font-semibold px-2.5 py-1 rounded-full">Off</span>
                </div>
                <button className="mt-4 flex items-center gap-2 bg-navy/5 hover:bg-navy/10 border border-navy/10 text-navy font-poppins font-semibold text-sm px-5 py-2.5 rounded-full transition-all">
                  <Shield size={14} /> Enable 2FA
                </button>
              </div>

              {/* Active sessions */}
              <div className="bg-white border border-cream-dark rounded-2xl p-6 shadow-sm">
                <h3 className="font-nunito font-bold text-navy text-lg mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: "Chrome on Windows 11",  location: "Delhi, IN", time: "Now",        current: true  },
                    { device: "Safari on iPhone 15",   location: "Delhi, IN", time: "2 hrs ago",  current: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0">
                      <div>
                        <p className="font-poppins font-semibold text-navy text-sm flex items-center gap-2">
                          {s.device}
                          {s.current && <span className="text-[9px] bg-green-50 text-green-600 border border-green-200 font-bold px-2 py-0.5 rounded-full">Current</span>}
                        </p>
                        <p className="font-lato text-navy/40 text-xs mt-0.5">{s.location} · {s.time}</p>
                      </div>
                      {!s.current && (
                        <button className="text-red-400 font-poppins font-semibold text-xs hover:text-red-500 transition-colors">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Main dashboard ──────────────────────────────────────────────
export default function AcademyDashboard() {
  const router = useRouter();
  const { isLoggedIn, role } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) { router.push("/auth/login"); return; }
    if (role !== "academy") router.push("/");
  }, [isLoggedIn, role, router]);

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const filteredStudents = STUDENTS.filter((s) =>
    search ? s.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  const TAB_TITLE: Record<Tab, string> = {
    overview:  dateStr,
    students:  "Students",
    schedule:  "Schedule",
    progress:  "Progress",
    revenue:   "Revenue",
    settings:  "Settings",
  };

  return (
    <div className="min-h-screen bg-cream flex pt-16">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
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
              <p className="font-lato text-white/40 text-sm capitalize">{activeTab}</p>
              <h1 className="font-nunito font-black text-2xl text-white">{TAB_TITLE[activeTab]}</h1>
            </div>
            {activeTab !== "settings" && (
              <button className="w-10 h-10 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center">
                <Search size={16} className="text-white/60" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">

            {/* ── Overview ── */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }} className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {STATS.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                      <StatCard label={stat.label} value={stat.value} icon={stat.icon} iconBg={stat.iconBg} iconColor={stat.iconColor} trend={stat.trend} trendUp={stat.trendUp} dark={false} />
                    </motion.div>
                  ))}
                </div>

                <section>
                  <h2 className="font-nunito font-bold text-navy text-xl mb-4">Today&apos;s Sessions</h2>
                  <div className="space-y-3">
                    {TODAY_SESSIONS.map((session, i) => (
                      <div key={i} className="bg-white border border-cream-dark rounded-2xl p-4 flex items-center gap-4 shadow-sm">
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
                </section>

                {ALERTS.length > 0 && (
                  <section>
                    <h2 className="font-nunito font-bold text-navy text-xl mb-4 flex items-center gap-2">
                      <AlertCircle size={18} className="text-amber-500" /> Attendance Flags
                    </h2>
                    <div className="space-y-3">
                      {ALERTS.map((alert, i) => (
                        <div key={i} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                            <AlertCircle size={18} className="text-amber-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-poppins font-semibold text-amber-700 text-sm">{alert.student} — {alert.absences} absences this month</p>
                            <p className="font-lato text-amber-600/70 text-xs">{alert.batch}</p>
                          </div>
                          <button className="text-amber-600 font-poppins font-semibold text-xs hover:text-amber-700">Notify Parent</button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            )}

            {/* ── Students ── */}
            {activeTab === "students" && (
              <motion.div key="students" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-nunito font-bold text-navy text-xl">Student Roster</h2>
                  <div className="flex items-center gap-2 bg-white border border-cream-dark rounded-xl px-3 py-2">
                    <Search size={14} className="text-navy/40" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="bg-transparent font-poppins text-sm text-navy placeholder:text-navy/30 focus:outline-none w-36" />
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
                    <div key={student.id} onClick={() => setSelectedStudent(student)} className={`grid grid-cols-12 px-5 py-3.5 items-center hover:bg-cream-dark/50 transition-colors cursor-pointer ${i < filteredStudents.length - 1 ? "border-b border-cream-dark" : ""}`}>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange to-gold rounded-full flex items-center justify-center text-white font-nunito font-black text-sm shrink-0">{student.name[0]}</div>
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
                      <span className={`col-span-2 text-xs font-poppins font-semibold px-2.5 py-0.5 rounded-full w-fit ${student.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                        {student.status === "active" ? "Active" : "Absent"}
                      </span>
                      <button className="col-span-1 text-orange/60 hover:text-orange transition-colors flex justify-end"><ChevronRight size={14} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Schedule placeholder ── */}
            {activeTab === "schedule" && (
              <motion.div key="schedule" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <div className="bg-white border border-cream-dark rounded-2xl p-12 text-center shadow-sm">
                  <Calendar size={40} className="text-navy/20 mx-auto mb-4" />
                  <p className="font-nunito font-bold text-navy text-xl mb-2">Schedule coming soon</p>
                  <p className="font-lato text-navy/45 text-sm">Full batch calendar with session management is on the way.</p>
                </div>
              </motion.div>
            )}

            {/* ── Progress placeholder ── */}
            {activeTab === "progress" && (
              <motion.div key="progress" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <div className="bg-white border border-cream-dark rounded-2xl p-12 text-center shadow-sm">
                  <TrendingUp size={40} className="text-navy/20 mx-auto mb-4" />
                  <p className="font-nunito font-bold text-navy text-xl mb-2">Progress tracking coming soon</p>
                  <p className="font-lato text-navy/45 text-sm">Skill rubrics, video analysis, and milestone reports will appear here.</p>
                </div>
              </motion.div>
            )}

            {/* ── Revenue placeholder ── */}
            {activeTab === "revenue" && (
              <motion.div key="revenue" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <div className="bg-white border border-cream-dark rounded-2xl p-12 text-center shadow-sm">
                  <IndianRupee size={40} className="text-navy/20 mx-auto mb-4" />
                  <p className="font-nunito font-bold text-navy text-xl mb-2">Revenue dashboard coming soon</p>
                  <p className="font-lato text-navy/45 text-sm">Detailed payout history, fee collection, and earnings analytics will appear here.</p>
                </div>
              </motion.div>
            )}

            {/* ── Settings ── */}
            {activeTab === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
                <SettingsPanel />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Student drawer backdrop */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedStudent(null)} />
      )}

      {/* Student Details Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-cream shadow-2xl border-l border-cream-dark z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${selectedStudent ? "translate-x-0" : "translate-x-full"}`}>
        {selectedStudent && (
          <>
            <div className="p-6 border-b border-cream-dark flex items-center justify-between bg-white shrink-0">
              <h3 className="font-nunito font-bold text-navy text-xl">Student Profile</h3>
              <button onClick={() => setSelectedStudent(null)} className="w-8 h-8 flex items-center justify-center bg-cream rounded-full hover:bg-cream-dark transition-colors">
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
                  <p className="font-lato text-navy/60 text-sm mt-0.5">{selectedStudent.age} yrs · Enrolled {selectedStudent.enrolled}</p>
                  <p className="font-poppins text-orange font-semibold text-xs mt-1">{selectedStudent.batch}</p>
                </div>
              </div>

              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm space-y-5">
                <h5 className="font-nunito font-bold text-navy flex items-center gap-2"><TrendingUp size={18} className="text-orange" /> Performance Overview</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-poppins text-navy/70 text-xs font-semibold uppercase tracking-wider">Attendance Rate</span>
                      <span className="font-poppins text-green-600 font-bold text-sm">92%</span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-poppins text-navy/70 text-xs font-semibold uppercase tracking-wider">Skill Progression</span>
                      <span className="font-poppins text-orange font-bold text-sm">Level 4</span>
                    </div>
                    <div className="h-2 bg-cream rounded-full overflow-hidden">
                      <div className="h-full bg-orange rounded-full" style={{ width: "65%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-cream-dark rounded-2xl p-5 shadow-sm space-y-4">
                <h5 className="font-nunito font-bold text-navy flex items-center gap-2"><Star size={18} className="text-gold" /> Recent Activity</h5>
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
