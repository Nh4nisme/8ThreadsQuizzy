import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Quizzes from "../pages/Quizzes/Quizzes.jsx";
import Events from "../pages/Events/Events.jsx";
import Students from "../pages/Students/Students.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import Landing from "../pages/Landing/Landing.jsx";
import Setting from "../pages/Settings/pages/Setting.jsx";
import AuthPage from "../pages/Auth/AuthPage";

const AppRouter = () => {
    return (
        <Routes>
            {/* Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthPage mode="signin" />} />
            <Route path="/register" element={<AuthPage mode="signup" />} />

            {/* Main app layout */}
            <Route path="/" element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="events" element={<Events />} />
                <Route path="students" element={<Students />} />
                <Route path="settings" element={<Settings />} />
                <Route path="settings/*" element={<Setting />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;