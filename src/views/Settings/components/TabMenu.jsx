"use client";

import { motion } from "framer-motion";

const tabs = [
  "Profile",
  "Account",
  "Notifications",
  "Appearance",
  "Privacy",
  "Billing",
];

export default function TabMenu({ active, setActive }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/5 rounded-2xl overflow-x-auto custom-scrollbar no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`relative px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shrink-0 ${
            active === tab 
              ? "text-white" 
              : "text-text-muted hover:text-text-secondary hover:bg-white/5"
          }`}
        >
          {active === tab && (
            <motion.div
              layoutId="active-settings-tab"
              className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl shadow-lg shadow-black/20"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
