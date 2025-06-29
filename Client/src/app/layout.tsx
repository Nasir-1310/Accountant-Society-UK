// src/app/layout.tsx
import AOSInitializer from "@/components/AOSInitealizer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopNews from "@/components/TopNews";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

// Configure the font
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// ✅ Metadata export with proper type
export const metadata: Metadata = {
  metadataBase: new URL("https://accountantssociety.org"),
  title: "The Professional Accountants' Society",
  description: "Official site of the society...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${notoSans.variable} font-sans antialiased`}>
        <AOSInitializer />
        <Navbar />
        <TopNews />
        {children}
        <Footer />
      </body>
    </html>
  );
}
