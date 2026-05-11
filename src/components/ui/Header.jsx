import React from "react";

const navItems = [
  { id: "quiz", label: "Quiz" },
  { id: "weekly-quiz", label: "Weekly Quiz" },
  { id: "rewards", label: "Rewards" },
  { id: "about", label: "About" },
];

export default function Header({ onSignIn, onSignUp, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between border-b border-white/10 bg-black/90 px-6 py-4 backdrop-blur md:px-10">
      <button
        type="button"
        onClick={() => onNavigate?.("quiz")}
        className="bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-[22px] font-bold text-transparent"
      >
        8ThreadsQuizzy
      </button>

      <nav className="ml-8 hidden gap-6 md:flex">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate?.(id)}
            className="text-sm text-white transition hover:text-purple-400"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex gap-2">
        <button
          className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition hover:bg-gray-200"
          onClick={onSignIn}
        >
          Sign In
        </button>
        <button
          className="rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 px-6 py-2 text-sm font-medium text-white transition hover:opacity-90"
          onClick={onSignUp}
        >
          Register
        </button>
      </div>
    </header>
  );
}
