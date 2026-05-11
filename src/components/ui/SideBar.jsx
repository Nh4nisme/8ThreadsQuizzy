"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuConfig } from "../../utils/menuConfig.js";
import SearchInput from "./SearchInput";

const SideBar = () => {
  const pathname = usePathname();
  const mainMenu = menuConfig.filter((item) => item.section === "main");
  const manageMenu = menuConfig.filter((item) => item.section === "manage");
  const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="bg-bg-card h-screen w-[300px] p-6 flex flex-col text-text-main border-r border-border-main sticky top-0">
      <div className="flex items-center mb-8">
        <img src="/assets/Logo.png" alt="Quizzy Logo" className="w-15 h-15" />
        <span className="bg-accent-gradient bg-clip-text text-transparent text-2xl font-bold ml-2">
          8ThreadsQuizzy
        </span>
      </div>

      <div className="mb-6">
        <SearchInput className="bg-bg-input rounded-[10px] border border-border-main focus:border-accent transition-all" />
      </div>

      <nav className="flex flex-col gap-1.5">
        {mainMenu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 ${
              isActive(item.path)
                ? "bg-accent-gradient text-text-on-accent font-medium shadow-md shadow-accent/20"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text-main"
            }`}
          >
            <item.icon className={isActive(item.path) ? "text-text-on-accent" : "text-text-muted"} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 mb-2 px-4 text-[11px] uppercase tracking-wider text-text-muted font-bold">Manage</div>
      <nav className="flex flex-col gap-1.5">
        {manageMenu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 ${
              isActive(item.path)
                ? "bg-accent-gradient text-text-on-accent font-medium shadow-md shadow-accent/20"
                : "text-text-secondary hover:bg-bg-secondary hover:text-text-main"
            }`}
          >
            <item.icon className={isActive(item.path) ? "text-text-on-accent" : "text-text-muted"} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
