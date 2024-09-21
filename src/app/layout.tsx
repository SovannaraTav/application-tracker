import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/authentication/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Application Record Tracker",
  description: "A personal website application project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*Provides authentication context to the entire website application */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
