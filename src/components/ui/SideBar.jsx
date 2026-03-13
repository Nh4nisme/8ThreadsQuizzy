import { NavLink } from "react-router-dom";
import { menuConfig } from "../../utils/menuConfig.js";
import Logo from "../../assets/logo.png";
import SearchInput from "./SearchInput"; // Import the SearchInput component

const SideBar = () => {
    const mainMenu = menuConfig.filter(item => item.section === "main");
    const manageMenu = menuConfig.filter(item => item.section === "manage");

    return (
        <div className="bg-[#101010] h-screen w-[350px] p-6 flex flex-col text-white">
            {/* Logo & Title */}
            <div className="flex items-center mb-8">
                <img src={Logo} alt="Quizzy Logo" className="w-15 h-15" />
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent text-2xl font-bold">8ThreadsQuizzy</span>
            </div>
            {/* Search */}
            <div className="mb-6">
                <SearchInput className="bg-[#23232b] rounded-[6px] border border-[#23232b] focus:border-[#a78bfa]" />
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {mainMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-md px-4 py-2 ${
                                isActive
                                    ? "bg-[#a78bfa] text-black font-medium"
                                    : "hover:bg-[#23232b]"
                            }`
                        }
                    >
                        <item.icon />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            {/* Manage Section */}
            <div className="mt-8 text-xs text-[#a1a1aa] font-semibold">Manage</div>
            {manageMenu.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md px-4 py-2 mt-2 ${
                            isActive
                                ? "bg-[#a78bfa] text-black font-medium"
                                : "hover:bg-[#23232b]"
                        }`
                    }
                >
                    <item.icon />
                    {item.label}
                </NavLink>
            ))}
        </div>
    );
};

export default SideBar;
