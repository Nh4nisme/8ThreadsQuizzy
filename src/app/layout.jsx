import "./globals.css";

export const metadata = {
  title: "8ThreadsQuizzy",
  description: "Quiz platform UI migrated to Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
