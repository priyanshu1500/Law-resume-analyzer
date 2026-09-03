import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "LexIntent Resume Analyser — AI resume analysis for the legal field",
  description:
    "LexIntent's Resume Analyser: specialised AI analysis for law students and legal professionals. Understand where your resume stands, improve it, and get hired.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
