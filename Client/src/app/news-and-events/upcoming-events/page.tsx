// src/app/news-and-events/upcoming-events/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/app/data/upcomingEvents";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Stay informed about upcoming events organised by the Professional Accountants’ Society, plus selected industry events for CPD and networking.",
  alternates: { canonical: "/news-and-events/upcoming-events" },
  openGraph: {
    title: "Upcoming Events | The Professional Accountants' Society",
    description:
      "Explore key events for TPAS members — from professional training to networking and community projects.",
    url: "/news-and-events/upcoming-events",
    type: "website",
    images: [{ url: "/OG_image.png", width: 1200, height: 630, alt: "Upcoming Events - TPAS" }],
  },
};

// Rebuild daily so events drop off once they have finished.
export const revalidate = 86400;

export default function UpcomingEventsPage() {
  const events = getUpcomingEvents();

  return (
    <>
      <PageHeader
        eyebrow="News & events"
        title="TPAS Events Calendar"
        description="Stay engaged with the Professional Accountants’ Society through our events, from professional development and networking to community service. We also list selected industry events from professional bodies that are useful for our members’ CPD and networking."
        breadcrumbs={[{ label: "News & Events", href: "/news-and-events" }, { label: "Upcoming Events" }]}
      />

      <div className="site-container py-12  sm:py-16">
        {events.length === 0 ? (
          <div className="card px-6 py-14 text-center">
            <CalendarDays aria-hidden="true" className="mx-auto mb-3 h-10 w-10 text-brand-500" />
            <p className="text-lg font-semibold text-brand-950">No upcoming events right now</p>
            <p className="mt-1 text-slate-600">
              Please check back soon, or browse photos from our{" "}
              <Link href="/news-and-events/gallery" className="font-medium text-brand-800 underline hover:text-brand-600">
                past events
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {events.map((event) => (
              <li key={`${event.title}-${event.date}`}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl bg-brand-50 px-6 py-10 text-center">
          <h2 className="text-xl font-bold text-brand-950">Want to take part or suggest an event?</h2>
          <p className="max-w-xl text-slate-600">Get in touch and we&apos;ll let you know how to get involved.</p>
          <Link href="/contact-us" className="btn-primary mt-2">
            Contact us to participate
          </Link>
        </div>
      </div>
    </>
  );
}
