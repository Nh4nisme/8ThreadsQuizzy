import React from "react";

export default function HeroBadge() {
  return (
    <span className="flex items-center gap-2 px-4 py-2 bg-black bg-opacity-60 rounded-full text-xs text-white font-medium">
      <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a1 1 0 0 1 1 1v2.07a7.001 7.001 0 0 1 6.93 6.93H22a1 1 0 1 1 0 2h-2.07a7.001 7.001 0 0 1-6.93 6.93V22a1 1 0 1 1-2 0v-2.07a7.001 7.001 0 0 1-6.93-6.93H2a1 1 0 1 1 0-2h2.07a7.001 7.001 0 0 1 6.93-6.93V3a1 1 0 0 1 1-1z"/></svg>
      The ultimate quiz experience
    </span>
  );
}

