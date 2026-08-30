import type { Metadata } from "next";
import { Anton, Inter, Caveat, Newsreader } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-caveat",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "LexIntent - AI Career Analysis for Law Students",
  description:
    "We simulate how recruiters read your resume, score it across five hiring signals, and show you exactly what to fix to get shortlisted.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${anton.variable} ${inter.variable} ${caveat.variable} ${newsreader.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
