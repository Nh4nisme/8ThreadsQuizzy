import React from "react";

export default function HeroActions() {
  return (
    <div className="mt-8 flex gap-4">
      <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white font-medium text-lg shadow-md hover:opacity-90 transition">
        Get Started
      </button>
      <button className="px-6 py-3 rounded-lg bg-white text-black font-medium text-lg shadow-md hover:bg-gray-200 transition">
        Explore Quizzes
      </button>
    </div>
  );
}
