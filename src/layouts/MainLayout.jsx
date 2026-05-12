import SideBar from "../components/ui/SideBar.jsx";
import Navbar from "../components/ui/Navbar.jsx";
import { GlowOrb } from "../components/ui/Motion.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen bg-black overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 relative overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden relative z-10">
          <GlowOrb className="-top-40 -left-40 h-[600px] w-[600px]" color="purple" />
          <GlowOrb className="top-1/2 -right-40 h-[700px] w-[700px] -translate-y-1/2" color="blue" />
          <GlowOrb className="-bottom-40 left-1/4 h-[500px] w-[500px]" color="orange" />

          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
