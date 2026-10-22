import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/app/data/upcomingEvents";

export default function EventsPreview() {
  const events = getUpcomingEvents().slice(0, 3);
  if (events.length === 0) return null;

  return (
    <section aria-labelledby="events-preview-heading" className="bg-surface py-14 sm:py-20">
      <div className="site-container ">
        <SectionHeading
          id="events-preview-heading"
          eyebrow="What's on"
          title="Upcoming events"
          description="Professional development and networking opportunities for our members."
          action={{ label: "View all events", href: "/news-and-events/upcoming-events" }}
        />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={`${event.title}-${event.date}`}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
