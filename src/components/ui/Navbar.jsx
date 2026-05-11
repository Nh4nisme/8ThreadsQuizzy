"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-bg-main border-b border-border-main shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-2">
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-text-main">{user?.fullName || user?.username || "User"}</p>
          <p className="text-xs text-text-muted">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/quizzes/create")}
          className="bg-accent-gradient text-text-on-accent px-4 py-2 rounded-[10px] flex items-center space-x-2 hover:opacity-90 transition-opacity h-10 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Create Quiz</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="h-10 rounded-[10px] border border-border-main px-4 py-2 text-text-main transition hover:bg-bg-secondary"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
