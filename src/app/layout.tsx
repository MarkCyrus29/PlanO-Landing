import type { Metadata } from "next";
import { Inter, Fraunces, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "PlanO — AI-Powered Event Briefs & Supplier Matching for Filipino Coordinators",
  description:
    "PlanO turns messy client chats into professional event briefs and finds the right suppliers for your budget, instantly. Built for event coordinators in the Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${dmMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
