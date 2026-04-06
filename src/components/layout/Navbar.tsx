"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/sports", label: "Sports" },
  { href: "/schools", label: "Schools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/safety", label: "Safety" },
  { href: "/contact", label: "Contact" },
];

const ROLE_CONFIG = {
  parent: {
    label: "Parent",
    dashboardPath: "/dashboard",
    dashboardLabel: "My Dashboard",
    color: "from-orange to-gold",
    emoji: "👩",
  },
  academy: {
    label: "Academy",
    dashboardPath: "/academy-dashboard",
    dashboardLabel: "Academy Dashboard",
    color: "from-aqua to-navy",
    emoji: "🏋️",
  },
  admin: {
    label: "Admin",
    dashboardPath: "/admin",
    dashboardLabel: "Admin Panel",
    color: "from-gold to-orange",
    emoji: "🛡️",
  },
};

export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const roleConfig = user ? ROLE_CONFIG[user.role] : null;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy/95 backdrop-blur-lg shadow-lg shadow-navy/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative transform group-hover:scale-110 transition-transform duration-300">
              <Image src="/logo.png" alt="BabyCorp Logo" width={40} height={40} className="w-10 h-10 object-contain rounded" />
            </div>
            <div className="flex flex-col">
              <span className="font-nunito font-black text-lg text-white tracking-tight leading-none">
                BABYCORP
              </span>
              <span className="text-[9px] text-gold/80 font-poppins tracking-widest uppercase">
                Building Champions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-poppins font-medium text-white/80 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-orange group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* ── Logged OUT ── */}
            {!isLoggedIn && (
              <>
                <Link
                  href="/auth/login"
                  className="relative text-sm font-poppins font-medium text-white/80 hover:text-white transition-colors group"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-orange group-hover:w-full transition-all duration-300" />
                </Link>
                <Link
                  href="/discover"
                  className="bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Enroll Now
                </Link>
              </>
            )}

            {/* ── Logged IN — profile dropdown ── */}
            {isLoggedIn && user && roleConfig && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 bg-white/8 border border-white/15 hover:border-white/30 rounded-full pl-1.5 pr-3 py-1.5 transition-all duration-200"
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${roleConfig.color} flex items-center justify-center text-sm`}>
                    {roleConfig.emoji}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-poppins font-semibold text-xs leading-none">
                      {user.name.split(" ")[0]}
                    </p>
                    <p className="text-white/40 font-poppins text-[10px] leading-none mt-0.5 capitalize">
                      {roleConfig.label}
                    </p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-white/40 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-navy-light border border-white/10 rounded-2xl shadow-2xl shadow-navy/40 overflow-hidden"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-white/8">
                        <p className="font-poppins font-semibold text-white text-sm truncate">{user.name}</p>
                        <p className="font-lato text-white/40 text-xs truncate">{user.email}</p>
                        <span className={`inline-block mt-1.5 text-[10px] font-poppins font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${roleConfig.color} text-white`}>
                          {roleConfig.label}
                        </span>
                      </div>

                      {/* Dashboard link */}
                      <Link
                        href={roleConfig.dashboardPath}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all font-poppins text-sm"
                      >
                        <LayoutDashboard size={15} className="text-orange" />
                        {roleConfig.dashboardLabel}
                      </Link>

                      {/* Profile link */}
                      <Link
                        href={user.role === "parent" ? "/dashboard" : roleConfig.dashboardPath}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all font-poppins text-sm"
                      >
                        <User size={15} className="text-aqua" />
                        My Profile
                      </Link>

                      {/* Logout */}
                      <div className="border-t border-white/8">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-all font-poppins text-sm"
                        >
                          <LogOut size={15} />
                          Log Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile avatar pill when logged in */}
            {isLoggedIn && user && roleConfig && (
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${roleConfig.color} flex items-center justify-center text-base`}>
                {roleConfig.emoji}
              </div>
            )}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy/98 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-1">

              {/* Logged in: user info card */}
              {isLoggedIn && user && roleConfig && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleConfig.color} flex items-center justify-center text-xl shrink-0`}>
                    {roleConfig.emoji}
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-white text-sm">{user.name}</p>
                    <p className="font-lato text-white/40 text-xs">{user.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-white/80 font-poppins font-medium text-base py-2.5 px-2 hover:text-gold transition-colors rounded-xl hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 mt-3 border-t border-white/8 space-y-2">
                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="block text-white/80 font-poppins font-medium text-base py-2.5 px-2 hover:text-gold transition-colors rounded-xl hover:bg-white/5"
                    >
                      Login
                    </Link>
                    <Link
                      href="/discover"
                      onClick={() => setIsMobileOpen(false)}
                      className="block bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-center py-3 rounded-full"
                    >
                      Enroll Your Champion
                    </Link>
                  </>
                ) : (
                  <>
                    {roleConfig && (
                      <Link
                        href={roleConfig.dashboardPath}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-3 bg-white/5 text-white font-poppins font-medium text-base py-3 px-4 rounded-xl hover:bg-white/8 transition-colors"
                      >
                        <LayoutDashboard size={18} className="text-orange" />
                        {roleConfig.dashboardLabel}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 text-red-400 font-poppins font-medium text-base py-3 px-4 rounded-xl hover:bg-red-500/8 transition-colors"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
