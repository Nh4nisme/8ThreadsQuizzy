import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/Auth/LoginPage";
import { ShareQuiz } from "../pages/Quizzes/ShareQuiz";
import { Quiz } from "../pages/Quizzes/Quiz";

const adminRoute: RouteObject[] = [];

const userRoute: RouteObject[] = [];

const guestRoute = [
  {
    path: "/login", // Đường dẫn trên trình duyệt
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/shareQuiz",
    element: <ShareQuiz />,
  },
  {
    path: "/Quiz",
    element: <Quiz />,
  },
  {
    path: "/exitMessage",
    element: <Quiz />,
  },
];

export const routes = createBrowserRouter([
  ...guestRoute,
  ...userRoute,
  ...adminRoute,
]);
