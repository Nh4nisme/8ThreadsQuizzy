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
    <nav className="bg-[#101010] shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <SearchInput className="border border-transparent bg-[#23232b] rounded-[10px] h-10 py-1 focus:border-[#a78bfa] pr-3" />
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right md:block">
          <p className="text-sm font-medium text-white">{user?.fullName || user?.username || "User"}</p>
          <p className="text-xs text-zinc-400">{user?.email}</p>
        </div>
        <button className="border border-[#FFFFFF]/20 text-white px-4 py-2 rounded-[10px] flex items-center space-x-2 hover:bg-[#7C3AED] h-10">
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
          className="h-10 rounded-[10px] border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
