// src/app/events/page.tsx
import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import upcomingEvents, { type UpcomingEvent } from "@/app/data/upcomingEvents";
import { Square_Button } from "@/components/Square_Button";

// Rebuild daily so events drop off once they have finished.
export const revalidate = 86400;

const parseDate = (value: string) => new Date(`${value}T00:00:00Z`);

const formatDateRange = (event: UpcomingEvent) => {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" };
  const start = parseDate(event.date);
  if (!event.endDate) return start.toLocaleDateString("en-GB", opts);
  const end = parseDate(event.endDate);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  return sameMonth
    ? `${start.getUTCDate()}–${end.toLocaleDateString("en-GB", opts)}`
    : `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
};

const getCurrentEvents = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return upcomingEvents
    .filter((event) => parseDate(event.endDate || event.date) >= today)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
};

export const metadata: Metadata = {
  title: "Upcoming Events | The Professional Accountants' Society",
  description:
    "Stay informed about upcoming events organized by the Professional Accountants’ Society. Discover networking opportunities, training, and community engagement sessions.",
  openGraph: {
    title: "Upcoming Events | The Professional Accountants' Society",
    description:
      "Explore key events hosted by TPAS. From professional training to impactful community projects, be a part of the journey.",
    url: "https://www.accountantssociety.org/events",
    type: "website",
    images: [
      {
        url: "https://www.accountantssociety.org/og/events.jpg",
        width: 1200,
        height: 630,
        alt: "Upcoming Events - TPAS",
      },
    ],
  },
};

export default function UpcomingEventsPage() {
  const events = getCurrentEvents();

  return (
    <Container>
      <div className="mx-3 px-5 border-l border-r border-gray-200 bg-white">
        <main className="w-full py-20 max-w-full">
          {/* Header */}
          <div data-aos="fade-up" className="mb-10">
            {/* Breadcrumb */}
            <div
              data-aos="fade-up"
              className="text-[10px] md:text-sm text-gray-500 mb-6"
            >
              <Link href="/" className="hover:text-teal-600">
                Home
              </Link>
              <span className="mx-2">|</span>
              <Link href="/members" className="hover:text-teal-600">
                News & Events
              </Link>
              <span className="mx-2">|</span>
              <span className="text-gray-700">Upcoming Events</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              TPAS Events Calendar
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Stay engaged with the Professional Accountants’ Society through
              our series of events. From professional development and networking
              to community service, there&apos;s something for everyone.
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              We also list selected industry events from professional bodies
              that are useful for our members&apos; CPD and networking.
            </p>
          </div>

          {/* Event Cards */}
          {events.length === 0 ? (
            <div className="mb-12 rounded-xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
              <CalendarDays className="mx-auto mb-3 h-10 w-10 text-teal-600" />
              <p className="text-lg font-semibold text-gray-800">No upcoming events right now</p>
              <p className="mt-1 text-gray-600">
                Please check back soon, or browse photos from our{" "}
                <Link href="/news-and-events/gallery" className="text-teal-700 underline hover:text-teal-900">
                  past events
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
              {events.map((event) => {
                const start = parseDate(event.date);
                return (
                  <article
                    data-aos="fade-up"
                    key={`${event.title}-${event.date}`}
                    className="flex flex-col rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white"
                  >
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={800}
                        height={500}
                        className="w-full h-56 object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-40 items-center gap-4 px-6 text-white"
                        style={{ background: "linear-gradient(160deg, #1e3a6e 0%, #1a4fa8 50%, #1565c0 100%)" }}
                      >
                        <div className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-white text-blue-900 shadow">
                          <span className="text-xs font-bold uppercase tracking-wide">
                            {start.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
                          </span>
                          <span className="text-3xl font-bold leading-none">{start.getUTCDate()}</span>
                          <span className="text-xs">{start.getUTCFullYear()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-wider text-white/70">Organised by</p>
                          <p className="font-semibold leading-snug">{event.organiser}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <CalendarDays className="w-4 h-4 mr-2 flex-shrink-0 text-teal-600" />
                        {formatDateRange(event)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-teal-600" />
                        {event.location}
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base mb-4">
                        {event.description}
                      </p>
                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                        >
                          Event details &amp; booking
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Call to Action */}
          <div data-aos="fade-up" className="text-center">
            <Link href="/contact-us">
              <Square_Button>
                 Contact Us to Participate
              </Square_Button>
               
             
            </Link>
          </div>
        </main>
      </div>
    </Container>
  );
}
