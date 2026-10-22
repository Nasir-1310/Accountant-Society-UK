import type { Metadata } from "next";

// The page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Inspiring Futures, Changing Lives",
  description:
    "How The Professional Accountants' Society supports students and future accountants through mentoring and outreach.",
  alternates: { canonical: "/cpd-and-training/inspiring-futures-changing-lives" },
};

export default function InspiringFuturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
