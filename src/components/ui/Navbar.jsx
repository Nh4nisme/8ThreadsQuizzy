"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext.jsx";
import { LogOut, User, Settings, Bell, ChevronDown, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onMenuToggle }) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-bg-main/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-text-muted hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Logo (Visible only on mobile navbar) */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
            <img src="/assets/Logo.png" alt="Logo" className="w-5 h-5 invert brightness-0" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="relative p-2 text-text-muted hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-accent rounded-full border border-bg-main" />
        </button>

        <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 md:gap-3 rounded-2xl p-1 md:p-1.5 hover:bg-white/5 transition-all duration-300"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-gradient flex items-center justify-center font-black text-white text-xs md:text-sm shadow-lg shadow-accent/10">
              {(user?.fullName || user?.username || "U")[0].toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <p className="text-sm font-bold text-white max-w-[120px] truncate">
                {user?.fullName || user?.username || "User"}
              </p>
              <p className="text-[9px] md:text-[10px] font-black text-text-muted uppercase tracking-widest">
                {user?.role || "Teacher"}
              </p>
            </div>
            <ChevronDown size={14} className={`text-text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 mt-4 w-60 rounded-3xl border border-white/10 bg-bg-card shadow-2xl p-2 z-50 backdrop-blur-xl"
              >
                <div className="px-4 py-3 border-b border-white/5 mb-2">
                   <p className="text-xs font-bold text-text-muted truncate">{user?.email}</p>
                </div>
                
                <button
                  onClick={() => router.push("/settings")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-text-secondary hover:bg-white/5 hover:text-white transition-all"
                >
                  <User size={18} />
                  Account Profile
                </button>
                
                <button
                  onClick={() => router.push("/settings?tab=preferences")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-text-secondary hover:bg-white/5 hover:text-white transition-all"
                >
                  <Settings size={18} />
                  Preferences
                </button>
                
                <div className="h-[1px] bg-white/5 my-2" />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;