"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone, Mail, ArrowRight, Chrome, FlaskConical } from "lucide-react";
import { TEST_ACCOUNTS, isTestModeEnabled } from "@/lib/testAccounts";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const loginAsTest = useAuthStore((s) => s.loginAsTest);

  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { mode, phone, email });
  };

  const handleTestLogin = (accountId: string) => {
    const account = TEST_ACCOUNTS.find((a) => a.id === accountId);
    if (!account) return;
    setLoadingRole(accountId);
    // Simulate brief loading then redirect
    setTimeout(() => {
      loginAsTest(account);
      router.push(account.dashboardPath);
    }, 700);
  };

  const showTestPanel = isTestModeEnabled();

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 space-y-4"
      >
        {/* ── TEST ACCOUNTS PANEL (dev only) ────────────────────────── */}
        {showTestPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gold/10 border border-gold/30 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical size={16} className="text-gold shrink-0" />
              <p className="font-poppins font-semibold text-gold text-sm">
                Test Accounts — Dev Mode
              </p>
            </div>

            {/* Credentials cheatsheet */}
            <div className="bg-navy/60 rounded-xl p-3 mb-4 font-mono text-xs space-y-1">
              <p className="text-white/40">OTP (any test number):</p>
              <p className="text-gold font-bold text-base tracking-[0.3em]">000000</p>
              <p className="text-white/40 mt-2">Password (email login):</p>
              <p className="text-aqua font-bold">Test@123</p>
            </div>

            {/* One-click role buttons */}
            <p className="text-white/40 font-lato text-xs mb-3">
              Or jump straight in as:
            </p>
            <div className="space-y-2">
              {TEST_ACCOUNTS.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleTestLogin(account.id)}
                  disabled={loadingRole !== null}
                  className="w-full flex items-center gap-3 bg-navy-light hover:bg-white/5 border border-white/10 hover:border-gold/40 rounded-xl px-4 py-3 transition-all duration-200 group disabled:opacity-60"
                >
                  <span className="text-2xl">{account.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="font-poppins font-semibold text-white text-sm group-hover:text-gold transition-colors">
                      {account.name}
                    </p>
                    <p className="font-lato text-white/40 text-xs">
                      {account.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {loadingRole === account.id ? (
                      <div className="w-4 h-4 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
                    ) : (
                      <ArrowRight size={14} className="text-white/20 group-hover:text-gold transition-colors" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Role → path legend */}
            <div className="mt-3 flex gap-3 flex-wrap">
              {TEST_ACCOUNTS.map((a) => (
                <span key={a.id} className="text-white/30 font-mono text-[10px]">
                  {a.role} → {a.dashboardPath}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── LOGIN CARD ────────────────────────────────────────────── */}
        <div className="bg-navy-light border border-white/10 rounded-3xl p-8 shadow-2xl shadow-navy/50">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center shadow-lg shadow-orange/30 mb-3">
              <Image src="/logo.png" alt="BabyCorp" width={40} height={40} className="object-contain" />
            </div>
            <h1 className="font-nunito font-black text-2xl text-white">Sign in to BabyCorp</h1>
            <p className="text-white/50 font-lato text-sm mt-1 text-center">India's early childhood sports marketplace</p>
          </motion.div>

          {/* Google Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex items-center justify-center gap-3 bg-white text-navy font-poppins font-semibold text-sm py-3 rounded-full hover:bg-cream transition-all duration-200 shadow-sm hover:shadow-md mb-5"
          >
            <Chrome size={18} className="text-orange" />
            Continue with Google
          </motion.button>

          {/* OR divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 font-lato text-xs">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {mode === "phone" ? (
              <div>
                <label className="block text-white/60 font-poppins text-xs mb-1.5 font-medium">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-3 shrink-0">
                    <span className="text-base">🇮🇳</span>
                    <span className="text-white font-poppins text-sm font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    maxLength={10}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 focus:bg-white/8 transition-all"
                  />
                </div>
                {showTestPanel && (
                  <p className="text-white/25 font-mono text-[10px] mt-1.5">
                    Test numbers: 9999900001 · 9999900002 · 9999900003
                  </p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-white/60 font-poppins text-xs mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@babycorp.test"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                  />
                  {showTestPanel && (
                    <p className="text-white/25 font-mono text-[10px] mt-1.5">
                      Test: parent@babycorp.test · academy@babycorp.test · admin@babycorp.test
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-white/60 font-poppins text-xs mb-1.5 font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                  />
                  {showTestPanel && (
                    <p className="text-white/25 font-mono text-[10px] mt-1.5">
                      Test password: Test@123
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {mode === "phone" ? "Send OTP" : "Sign In"}
              <ArrowRight size={16} />
            </button>
          </motion.form>

          {/* Toggle mode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 text-center"
          >
            <button
              onClick={() => setMode(mode === "phone" ? "email" : "phone")}
              className="text-aqua font-poppins text-sm hover:text-aqua/80 transition-colors flex items-center gap-1.5 mx-auto"
            >
              {mode === "phone" ? <Mail size={14} /> : <Phone size={14} />}
              {mode === "phone" ? "Use email instead" : "Use mobile number"}
            </button>
          </motion.div>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 text-center text-white/40 font-lato text-sm"
          >
            New here?{" "}
            <Link href="/auth/register" className="text-orange hover:text-orange-hover font-poppins font-semibold transition-colors">
              Create account
            </Link>
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/20 font-lato text-xs mt-2"
        >
          By signing in, you agree to BabyCorp's Terms & Privacy Policy
        </motion.p>
      </motion.div>
    </div>
  );
}
