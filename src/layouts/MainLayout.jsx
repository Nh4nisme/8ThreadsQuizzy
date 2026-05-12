"use client";

import React, { useState } from "react";
import SideBar from "../components/ui/SideBar.jsx";
import Navbar from "../components/ui/Navbar.jsx";
import { GlowOrb } from "../components/ui/Motion.jsx";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-[100dvh] bg-[#050505] overflow-hidden selection:bg-accent selection:text-white relative">
      {/* Sidebar - Desktop: Fixed, Mobile: Drawer */}
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 relative overflow-hidden w-full h-full">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">
          {/* Global Ambient Glows (Subtle and cohesive) */}
          <GlowOrb className="-top-60 -left-60 h-[800px] w-[800px] opacity-40 md:opacity-100" color="purple" />
          <GlowOrb className="-bottom-60 -right-60 h-[800px] w-[800px] opacity-40 md:opacity-100" color="blue" />
          
          <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full min-h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
