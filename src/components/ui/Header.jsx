import React from "react";

const navItems = [
  { id: "quiz", label: "Quiz" },
  { id: "weekly-quiz", label: "Weekly Quiz" },
  { id: "rewards", label: "Rewards" },
  { id: "about", label: "About" },
];

export default function Header({ onSignIn, onSignUp, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-border-main bg-bg-main/80 px-6 py-4 backdrop-blur-xl md:px-10">
      <button
        type="button"
        onClick={() => onNavigate?.("quiz")}
        className="bg-accent-gradient bg-clip-text text-[22px] font-bold text-transparent tracking-tight"
      >
        8ThreadsQuizzy
      </button>

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

      <div className="flex gap-3">
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
      </div>
    </header>
  );
}
