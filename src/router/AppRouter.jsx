import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Quizzes from "../pages/Quizzes/Quizzes.jsx";
import Events from "../pages/Events/Events.jsx";
import Students from "../pages/Students/Students.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import Landing from "../pages/Landing/Landing.jsx";
import LoginPage from "../pages/Auth/LoginPage.js";

const AppRouter = () => {
  return (
    <Routes>
      {/* Standalone Landing homepage */}
      <Route path="/" element={<Landing />} />
      <Route path="auth" element={<LoginPage />} />
      {/* Main app layout for other pages */}
      <Route path="/" element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="events" element={<Events />} />
        <Route path="students" element={<Students />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
