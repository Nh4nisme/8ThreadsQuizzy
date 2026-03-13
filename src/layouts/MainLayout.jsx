import SideBar from "../components/ui/SideBar.jsx";
import Navbar from "../components/ui/Navbar.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex w-screen h-screen">

            <SideBar/>
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden bg-black relative">
                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#AC63E6]/30 blur-[200px] rounded-full"></div>
                    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#C45037]/30 blur-[200px] rounded-full"></div>

                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default MainLayout;