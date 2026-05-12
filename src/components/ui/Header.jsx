import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navItems = [
  { id: "quiz", label: "Quiz" },
  { id: "weekly-quiz", label: "Weekly Quiz" },
  { id: "rewards", label: "Rewards" },
  { id: "about", label: "About" },
];

export default function Header({ onSignIn, onSignUp, onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border-main bg-bg-main/80 px-6 py-4 backdrop-blur-xl md:px-10">
      <Link
        href="/"
        className="bg-accent-gradient bg-clip-text text-[22px] font-bold text-transparent tracking-tight hover:opacity-80 transition-opacity"
      >
        8ThreadsQuizzy
      </Link>

      <nav className="ml-8 hidden gap-8 md:flex">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate?.(id)}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex gap-3 items-center">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 bg-bg-secondary hover:bg-bg-tertiary border border-border-main rounded-2xl px-4 py-1.5 transition-all group"
            >
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-text-main leading-tight">{user.username}</span>
                <span className="text-[10px] text-text-muted capitalize leading-tight">{user.role}</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-accent-gradient flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-border-main bg-bg-main shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 border-b border-border-main bg-bg-secondary/50">
                  <p className="text-xs font-bold text-text-main px-3 pt-1 truncate">{user.fullName || user.username}</p>
                  <p className="text-[10px] text-text-muted px-3 pb-1 truncate">{user.email}</p>
                </div>
                <div className="p-1.5">
                  <Link
                    href={user.role === "teacher" ? "/dashboard" : "/quizzes"}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-text-main hover:bg-bg-secondary rounded-xl transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              className="rounded-xl border border-border-main bg-bg-secondary px-6 py-2 text-sm font-semibold text-text-main transition-all hover:bg-bg-tertiary"
              onClick={onSignIn}
            >
              Sign In
            </button>
            <button
              className="rounded-xl bg-accent-gradient px-6 py-2 text-sm font-semibold text-text-on-accent transition-all hover:opacity-90 shadow-lg shadow-accent/20"
              onClick={onSignUp}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}
