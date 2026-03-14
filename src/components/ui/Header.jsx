import React from "react";

export default function Header() {
  return (
    <header className="bg-black px-10 py-4 flex items-center justify-between w-full">
      {/* Logo */}
      <span className="font-bold text-[22px] bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">
        8ThreadsQuizzy
      </span>
      {/* Navigation */}
      <nav className="flex gap-6 ml-8">
        <span className="text-sm text-white hover:text-purple-400 cursor-pointer">
          Quiz
        </span>
        <span className="text-sm text-white hover:text-purple-400 cursor-pointer">
          Weekly Quiz
        </span>
        <span className="text-sm text-white hover:text-purple-400 cursor-pointer">
          Rewards
        </span>
        <span className="text-sm text-white hover:text-purple-400 cursor-pointer">
          About
        </span>
      </nav>
      {/* Buttons */}
      <div className="flex gap-2">
        <button className="bg-white text-black rounded-lg px-6 py-2 font-medium text-sm hover:bg-gray-200 transition">
          Sign In
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-lg px-6 py-2 font-medium text-sm hover:opacity-90 transition">
          Register
        </button>
      </div>
    </header>
  );
}
