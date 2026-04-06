"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "phone" && !otpMode) {
      setOtpMode(true);
      return;
    }
    console.log("Login attempt:", { mode, phone, email });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  };

  const handleTestLogin = (accountId: string) => {
    const account = TEST_ACCOUNTS.find((a) => a.id === accountId);
    if (!account) return;
    setLoadingRole(accountId);
    setTimeout(() => {
      loginAsTest(account);
      router.push(account.dashboardPath);
    }, 700);
  };

  const showTestPanel = isTestModeEnabled();

  const ROLE_COLORS: Record<string, string> = {
    parent: "text-aqua bg-aqua/10 border-aqua/20",
    academy: "text-orange bg-orange/10 border-orange/20",
    admin: "text-gold bg-gold/10 border-gold/20",
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange/12 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10 space-y-4"
      >
        {/* Test accounts panel */}
        {showTestPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gold/8 border border-gold/25 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical size={15} className="text-gold shrink-0" />
              <p className="font-poppins font-semibold text-gold text-sm">Demo Accounts — Dev Mode</p>
            </div>

            <div className="bg-navy/60 rounded-xl p-3 mb-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/40">OTP (any test number):</span>
                <span className="text-gold font-bold tracking-[0.3em]">000000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Password:</span>
                <span className="text-aqua font-bold">Test@123</span>
              </div>
            </div>

            <p className="text-white/35 font-lato text-xs mb-3">Quick jump as:</p>
            <div className="space-y-2">
              {TEST_ACCOUNTS.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleTestLogin(account.id)}
                  disabled={loadingRole !== null}
                  className="w-full flex items-center gap-3 bg-navy-light hover:bg-white/5 border border-white/8 hover:border-gold/30 rounded-xl px-4 py-3 transition-all duration-200 group disabled:opacity-60"
                >
                  <span className="text-2xl">{account.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="font-poppins font-semibold text-white text-sm group-hover:text-gold transition-colors">
                      {account.name}
                    </p>
                    <p className="font-lato text-white/35 text-xs">{account.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full border ${ROLE_COLORS[account.role] ?? "text-white/40 bg-white/5 border-white/10"}`}>
                      {account.role}
                    </span>
                    {loadingRole === account.id ? (
                      <div className="w-4 h-4 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
                    ) : (
                      <ArrowRight size={13} className="text-white/20 group-hover:text-gold transition-colors" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Login card */}
        <div className="relative">
          {/* Shimmer border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange/20 via-gold/10 to-aqua/20 blur-sm pointer-events-none" />
          <div className="relative bg-navy-light border border-white/10 rounded-3xl p-8 shadow-2xl shadow-navy/60">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange to-gold rounded-2xl flex items-center justify-center shadow-lg shadow-orange/30 mb-3">
                <Image src="/logo.png" alt="BabyCorp" width={40} height={40} className="object-contain" />
              </div>
              <h1 className="font-nunito font-black text-2xl text-white">Welcome back</h1>
              <p className="text-white/40 font-lato text-sm mt-1">India&apos;s early childhood sports platform</p>
            </motion.div>

            {/* Google button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full flex items-center justify-center gap-3 bg-white text-navy font-poppins font-semibold text-sm py-3.5 rounded-full hover:bg-cream transition-all duration-200 shadow-sm hover:shadow-md mb-5"
            >
              <Chrome size={18} className="text-orange" />
              Continue with Google
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/25 font-lato text-xs">OR</span>
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
              <AnimatePresence mode="wait">
                {mode === "phone" && !otpMode && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Mobile Number</label>
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
                      <p className="text-white/20 font-mono text-[10px] mt-1.5">Test: 9999900001 · 9999900002 · 9999900003</p>
                    )}
                  </motion.div>
                )}

                {mode === "phone" && otpMode && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-white/50 font-lato text-sm mb-4">
                      OTP sent to <span className="text-orange font-poppins font-semibold">+91 {phone || "98765 43210"}</span>
                    </p>
                    <div className="flex gap-2 justify-between">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`login-otp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-11 h-13 text-center text-white font-nunito font-bold text-xl bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange/60 transition-all py-3"
                        />
                      ))}
                    </div>
                    {showTestPanel && (
                      <p className="text-white/20 font-mono text-[10px] mt-2">Test OTP: 000000</p>
                    )}
                    <button type="button" onClick={() => setOtpMode(false)} className="text-white/30 font-lato text-xs mt-2 hover:text-white/50 transition-colors">
                      ← Change number
                    </button>
                  </motion.div>
                )}

                {mode === "email" && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@babycorp.test"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 font-poppins text-xs mb-1.5 font-medium uppercase tracking-wider">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-poppins text-sm placeholder:text-white/20 focus:outline-none focus:border-orange/50 transition-all"
                      />
                    </div>
                    {showTestPanel && (
                      <p className="text-white/20 font-mono text-[10px]">Test password: Test@123</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange to-orange-hover text-white font-poppins font-semibold text-sm py-3.5 rounded-full hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {mode === "phone" ? (otpMode ? "Verify & Sign In" : "Send OTP") : "Sign In"}
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
                onClick={() => { setMode(mode === "phone" ? "email" : "phone"); setOtpMode(false); }}
                className="text-aqua font-poppins text-sm hover:text-aqua/80 transition-colors flex items-center gap-1.5 mx-auto"
              >
                {mode === "phone" ? <Mail size={14} /> : <Phone size={14} />}
                {mode === "phone" ? "Use email instead" : "Use mobile number"}
              </button>
            </motion.div>

            {/* Register */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-6 text-center text-white/35 font-lato text-sm"
            >
              New here?{" "}
              <Link href="/auth/register" className="text-orange hover:text-orange-hover font-poppins font-semibold transition-colors">
                Create account
              </Link>
            </motion.p>
          </div>
        </div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 font-lato text-xs"
        >
          Trusted by 10,000+ parents across Delhi, Mumbai &amp; Bengaluru
        </motion.p>
      </motion.div>
    </div>
  );
}
