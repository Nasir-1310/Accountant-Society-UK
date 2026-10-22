import Image from "next/image";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { formatEventDateRange, parseEventDate, type UpcomingEvent } from "@/app/data/upcomingEvents";

export default function EventCard({ event }: { event: UpcomingEvent }) {
  const start = parseEventDate(event.date);

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      {event.image ? (
        <Image src={event.image} alt="" width={800} height={500} className="h-48 w-full object-cover" />
      ) : (
        <div className="flex h-36 items-center gap-4 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 px-6 text-white">
          <div className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-white text-brand-900 shadow-soft">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-accent-600">
              {start.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" })}
            </span>
            <span className="text-3xl font-bold leading-none">{start.getUTCDate()}</span>
            <span className="text-xs text-slate-500">{start.getUTCFullYear()}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-white/60">Organised by</p>
            <p className="font-semibold leading-snug">{event.organiser}</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-brand-950">{event.title}</h3>
        <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Date</dt>
            <CalendarDays aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-brand-500" />
            <dd>{formatEventDateRange(event)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-brand-500" />
            <dd>{event.location}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{event.description}</p>
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-semibold text-brand-800 hover:text-brand-600 hover:underline"
          >
            Event details &amp; booking
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
