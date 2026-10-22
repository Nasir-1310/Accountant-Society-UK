// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AOSInitializer from "@/components/AOSInitealizer";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

// Keep the established Noto Sans typography available without a network request.
const notoSans = localFont({
  src: "./fonts/noto-sans-latin.woff2",
  variable: "--font-noto-sans",
  display: "swap",
  weight: "100 900",
});

const siteUrl = "https://accountantssociety.org";

// ✅ SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    "British Bangladeshi accountants",
    "finance community",
    "accountant network",
  ],
  openGraph: {
    title: "The Professional Accountants' Society",
    description:
      "Join The Professional Accountants' Society to stay updated with news, events, and networking opportunities.",
    url: siteUrl,
    siteName: "The Professional Accountants' Society",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/OG_image.png",
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
  // Canonical URLs are set per page; a site-wide canonical here would point
  // every page at the homepage.
};

export const viewport: Viewport = {
  themeColor: "#12115d",
};

// Organisation details shown in search results (taken from the site footer).
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Professional Accountants' Society",
  alternateName: "TPAS",
  url: siteUrl,
  logo: `${siteUrl}/logo/logo-laptop.svg`,
  email: "admin@accountantssociety.org",
  telephone: "+44 7988 834395",
  address: {
    "@type": "PostalAddress",
    streetAddress: "513 London Road, Cheam",
    addressLocality: "Sutton",
    postalCode: "SM3 8JR",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.facebook.com/share/1B1fzAS6ru/?mibextid=wwXIfr",
    "http://www.linkedin.com/in/the-professional-accountants-society-12700035a",
  ],
};

// ✅ Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </head>

      <body
        className={`${notoSans.variable} font-sans antialiased bg-white text-slate-800`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AOSInitializer />

        <SiteHeader />

        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
