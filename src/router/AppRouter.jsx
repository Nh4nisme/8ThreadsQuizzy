import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../pages/Dashbroad/Dashboard.jsx";
import Quizzes from "../pages/Quizzes/Quizzes.jsx";
import Events from "../pages/Events/Events.jsx";
import Students from "../pages/Students/Students.jsx";
import Settings from "../pages/Settings/Settings.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="events" element={<Events />} />
                <Route path="students" element={<Students />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
