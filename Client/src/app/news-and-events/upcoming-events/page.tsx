// src/app/events/page.tsx
import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react"; // calendar icon
import upcomingEvents from "@/app/data/upcomingEvents";
import { Square_Button } from "@/components/Square_Button";

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
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
            {upcomingEvents.map((event, idx) => (
              <div
                data-aos="fade-up"
                key={idx}
                className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  width={800}
                  height={500}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <CalendarDays className="w-4 h-4 mr-2 text-teal-600" />
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
