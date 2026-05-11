import MainLayout from "../../layouts/MainLayout.jsx";
import { requireServerRole } from "../../lib/auth-server.js";

export default async function DashboardLayout({ children }) {
  await requireServerRole("teacher");
  return <MainLayout>{children}</MainLayout>;
}
