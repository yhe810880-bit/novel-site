import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "书香阁 - 个人小说阅读站",
  description: "一个简洁优雅的个人小说阅读网站",
};

const inlineScript = `
try {
  let theme = localStorage.getItem('theme');
  if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
} catch(e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="text-center py-6 text-sm text-muted border-t border-card-border">
            <p>书香阁 &copy; {new Date().getFullYear()} &mdash; 个人小说阅读站</p>
          </footer>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
