import SideBar from "../components/ui/SideBar.jsx";
import Navbar from "../components/ui/Navbar.jsx";
import { GlowOrb } from "../components/ui/Motion.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen bg-[#050505] overflow-hidden selection:bg-accent selection:text-white">
      <SideBar />
      <div className="flex flex-col flex-1 relative overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 custom-scrollbar">
          {/* Global Ambient Glows (Subtle and cohesive) */}
          <GlowOrb className="-top-60 -left-60 h-[800px] w-[800px]" color="purple" />
          <GlowOrb className="-bottom-60 -right-60 h-[800px] w-[800px]" color="blue" />
          
          <div className="p-8 max-w-[1600px] mx-auto w-full min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
