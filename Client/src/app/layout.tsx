// src/app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import AOSInitializer from "@/components/AOSInitealizer";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import TopNews from "@/components/TopNews";

// ✅ Load Google Font
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// ✅ SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://accountantssociety.org"),
  title: {
    default: "The Professional Accountants' Society",
    template: "%s | The Professional Accountants' Society",
  },
  description:
    "Official website of The Professional Accountants' Society — connecting accountants, promoting professional excellence, and sharing industry news.",
  keywords: [
    "accounting society",
    "professional accountants",
    "UK accountants",
    "finance community",
    "accountant network",
  ],
  openGraph: {
    title: "The Professional Accountants' Society",
    description:
      "Join The Professional Accountants' Society to stay updated with news, events, and networking opportunities.",
    url: "https://accountantssociety.org",
    siteName: "The Professional Accountants' Society",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/OG_image.png", // ✅ Add a proper OG image in your /public folder
        width: 1200,
        height: 630,
        alt: "The Professional Accountants' Society",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Professional Accountants' Society",
    description:
      "Stay informed with accounting news, events, and resources from The Professional Accountants' Society.",
    images: ["/OG_image.png"],
  },
  alternates: {
    canonical: "https://accountantssociety.org",
  },
};

// ✅ Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>

      <body
        className={`${notoSans.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <AOSInitializer />

        {/* ✅ Keep conditional header logic inside the component */}
        <ConditionalHeader />

        {/* ✅ Global section order for better UX and SEO */}
        <main>
          <TopNews />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
