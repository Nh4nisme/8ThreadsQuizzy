import "./globals.css";
import { AuthProvider } from "../context/AuthContext.jsx";

export const metadata = {
  title: "8ThreadsQuizzy",
  description: "Quiz platform UI migrated to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
