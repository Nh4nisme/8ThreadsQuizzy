import {FaThLarge, FaRegCalendarAlt, FaUserGraduate, FaCog, FaRegListAlt} from "react-icons/fa";
import Logo from "../../assets/logo.png";

const SideBar = () => {
    return (
        <div className="bg-[#101010] h-screen w-[350px] p-6 flex flex-col text-white">
            {/* Logo & Title */}
            <div className="flex items-center mb-8">
                <img src={Logo} alt="Quizzy Logo" className="w-15 h-15" />
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent text-2xl font-bold">8ThreadsQuizzy</span>
            </div>
            {/* Search */}
            <input
                type="text"
                placeholder="Search"
                className="bg-[#23232b] rounded-md px-4 py-2 mb-6 outline-none border border-[#23232b] focus:border-[#a78bfa] text-sm"
            />
            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                <button className="flex items-center gap-3 bg-[#a78bfa] text-black rounded-md px-4 py-2 font-medium">
                    <FaThLarge/>
                    Dashboard
                </button>
                <button className="flex items-center gap-3 hover:bg-[#23232b] rounded-md px-4 py-2">
                    <FaRegListAlt/>
                    Quizzes
                </button>
                <button className="flex items-center gap-3 hover:bg-[#23232b] rounded-md px-4 py-2">
                    <FaRegCalendarAlt/>
                    Events
                </button>
                <button className="flex items-center gap-3 hover:bg-[#23232b] rounded-md px-4 py-2">
                    <FaUserGraduate/>
                    Students
                </button>
            </nav>
            {/* Manage Section */}
            <div className="mt-8 text-xs text-[#a1a1aa] font-semibold">Manage</div>
            <button className="flex items-center gap-3 hover:bg-[#23232b] rounded-md px-4 py-2 mt-2">
                <FaCog/>
                Settings
            </button>
        </div>
    );
};

export default SideBar;
