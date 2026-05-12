import "./globals.css";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";

export const metadata = {
  title: "8ThreadsQuizzy",
  description: "Quiz platform UI migrated to Next.js",
};

import { ToastContainer } from "../components/ui/Toast.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('app-theme') || 'dark';
                  var accent = localStorage.getItem('app-accent-color') || 'purple';
                  
                  if (theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.setAttribute('data-accent', accent);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <ToastContainer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
