import { FaThLarge, FaRegListAlt, FaRegCalendarAlt, FaUserGraduate, FaCog } from "react-icons/fa";

export const menuConfig = [
    {
        path: "/",
        label: "Dashboard",
        icon: FaThLarge,
        section: "main"
    },
    {
        path: "/quizzes",
        label: "Quizzes",
        icon: FaRegListAlt,
        section: "main"
    },
    {
        path: "/events",
        label: "Events",
        icon: FaRegCalendarAlt,
        section: "main"
    },
    {
        path: "/students",
        label: "Students",
        icon: FaUserGraduate,
        section: "main"
    },
    {
        path: "/settings",
        label: "Settings",
        icon: FaCog,
        section: "manage"
    }
];
