import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHub from "@/components/SectionHub";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "News, events, photo galleries and the TPAS Magazine from The Professional Accountants' Society.",
  alternates: { canonical: "/news-and-events" },
};

const links = [
  { label: "Latest news", href: "/news-and-events/latest-news", summary: "Announcements and updates from TPAS." },
  { label: "Upcoming events", href: "/news-and-events/upcoming-events", summary: "Our events and selected industry events for CPD." },
  { label: "Gallery", href: "/news-and-events/gallery", summary: "Photos and videos from past events." },
  { label: "Magazine", href: "/news-and-events/magazine", summary: "Read every issue of the TPAS Magazine." },
  { label: "CPD & networking", href: "/members/cpd-training", summary: "Training and networking opportunities." },
];

export default function NewsAndEventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stay up to date"
        title="News & Events"
        description="News, events, photo galleries and magazines from The Professional Accountants' Society."
        breadcrumbs={[{ label: "News & Events" }]}
      />
      <SectionHub links={links} />
    </>
  );
}
