import SideBar from "../components/ui/SideBar.jsx";
import Navbar from "../components/ui/Navbar.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex w-screen h-screen bg-amber-600">

            <SideBar/>
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 p-6 bg-amber-200 overflow-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default MainLayout;