"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuConfig } from "../../utils/menuConfig.js";
import SearchInput from "./SearchInput";
import { motion, AnimatePresence } from "framer-motion";
import { HoverScale } from "./Motion.jsx";

const SideBar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const mainMenu = menuConfig.filter((item) => item.section === "main");
  const manageMenu = menuConfig.filter((item) => item.section === "manage");

  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 w-[280px] bg-bg-card p-6 flex flex-col border-r border-white/5 z-50 lg:hidden shadow-2xl"
          >
            <SidebarContent 
              mainMenu={mainMenu} 
              manageMenu={manageMenu} 
              isActive={isActive} 
              onLinkClick={onClose} 
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:flex flex-col bg-bg-card h-screen w-[280px] p-6 border-r border-white/5 sticky top-0 z-40 shrink-0">
        <SidebarContent 
          mainMenu={mainMenu} 
          manageMenu={manageMenu} 
          isActive={isActive} 
        />
      </aside>
    </>
  );
};

const SidebarContent = ({ mainMenu, manageMenu, isActive, onLinkClick }) => (
  <>
    <Link href="/" className="flex items-center gap-3 mb-10 group" onClick={onLinkClick}>
      <motion.div
        whileHover={{ rotate: 5, scale: 1.05 }}
        className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/20"
      >
        <img src="/assets/Logo.png" alt="Logo" className="w-6 h-6 invert brightness-0" />
      </motion.div>
      <span className="text-xl font-black tracking-tighter text-white">
        8Threads<span className="text-accent">Quizzy</span>
      </span>
    </Link>

    <div className="mb-8">
      <SearchInput className="bg-white/5 border-white/5 rounded-2xl focus:border-accent/40" />
    </div>

    <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
      <section>
        <nav className="space-y-1">
          {mainMenu.map((item) => (
            <MenuItem key={item.path} item={item} active={isActive(item.path)} onClick={onLinkClick} />
          ))}
        </nav>
      </section>

      <section>
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-4">Manage</p>
        <nav className="space-y-1">
          {manageMenu.map((item) => (
            <MenuItem key={item.path} item={item} active={isActive(item.path)} onClick={onLinkClick} />
          ))}
        </nav>
      </section>
    </div>

    <div className="mt-auto pt-6 border-t border-white/5">
      <div className="bg-accent-gradient/5 rounded-2xl p-4 border border-accent/10">
        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-1">Status</p>
        <p className="text-xs font-bold text-white flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Teacher Portal Active
        </p>
      </div>
    </div>
  </>
);

const MenuItem = ({ item, active, onClick }) => (
  <Link
    href={item.path}
    onClick={onClick}
    className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${active
      ? "bg-white/5 text-white"
      : "text-text-secondary hover:bg-white/[0.03] hover:text-white"
      }`}
  >
    <item.icon size={20} className={`transition-colors ${active ? "text-accent" : "text-text-muted group-hover:text-text-secondary"}`} />
    <span className="text-sm font-bold tracking-tight">{item.label}</span>
    {active && (
      <motion.div
        layoutId="active-nav-indicator"
        className="absolute left-0 w-1 h-5 bg-accent rounded-full"
      />
    )}
  </Link>
);

export default SideBar;
