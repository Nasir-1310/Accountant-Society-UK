import type { Metadata } from "next";

// The contact page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Professional Accountants' Society — membership, events, partnerships and general enquiries.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
