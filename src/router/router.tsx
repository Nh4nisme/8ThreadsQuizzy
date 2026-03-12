import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/Auth/components/LoginPage";

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
];

export const routes = createBrowserRouter([
  ...guestRoute,
  ...userRoute,
  ...adminRoute,
]);
