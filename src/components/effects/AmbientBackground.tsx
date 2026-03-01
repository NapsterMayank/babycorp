"use client";

import { useEffect, useState } from "react";

const particles = [
  { emoji: "🍼", size: 20, duration: 15, delay: 0, left: 5 },
  { emoji: "🏊", size: 16, duration: 20, delay: 3, left: 15 },
  { emoji: "♟️", size: 18, duration: 18, delay: 6, left: 25 },
  { emoji: "🏸", size: 16, duration: 22, delay: 1, left: 35 },
  { emoji: "🏓", size: 14, duration: 16, delay: 8, left: 45 },
  { emoji: "🤸", size: 18, duration: 19, delay: 4, left: 55 },
  { emoji: "⭐", size: 12, duration: 14, delay: 7, left: 65 },
  { emoji: "🏅", size: 16, duration: 21, delay: 2, left: 75 },
  { emoji: "👶", size: 18, duration: 17, delay: 9, left: 85 },
  { emoji: "🏆", size: 14, duration: 23, delay: 5, left: 95 },
];

export default function AmbientBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="float-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
