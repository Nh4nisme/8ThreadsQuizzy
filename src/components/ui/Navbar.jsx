"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  // đóng menu khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-bg-main border-b border-border-main shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div />

      <div className="relative" ref={dropdownRef}>
        {/* User button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-4 rounded-xl px-4 py-2.5 hover:bg-gray-200/80 dark:hover:bg-white/10 transition-all duration-200"
        >
          {/* avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center font-semibold text-white text-base shadow-sm">
            {(user?.fullName || user?.username || "U")[0]}
          </div>

          <div className="hidden md:flex flex-col items-start leading-tight">
            <p className="text-sm font-semibold text-text-main">
              {user?.fullName || user?.username || "User"}
            </p>
            <p className="text-xs text-text-muted mt-0.5 truncate max-w-[180px]">
              {user?.email}
            </p>
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-52 rounded-xl border border-border-main bg-bg-main shadow-xl overflow-hidden z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;