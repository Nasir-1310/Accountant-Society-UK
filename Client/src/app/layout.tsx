import AOSInitializer from "@/components/AOSInitealizer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopNews from "@/components/TopNews";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Accountants Society",
  description: "The professional Accountants Society.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${notoSans.variable} font-sans antialiased`}>
        {/* 👇 Mount AOS globally as client-side component */}
        <AOSInitializer />
        <Navbar />
        <TopNews />
        {children}
        <Footer />
      </body>
    </html>
  );
}
