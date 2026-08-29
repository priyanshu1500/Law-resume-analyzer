import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LexIntent AI - Law Career Intelligence",
  description:
    "A data-driven evaluation of your legal profile. Answer the intake, get your resume analysed by AI, and receive an editorial report on where you stand.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${newsreader.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
