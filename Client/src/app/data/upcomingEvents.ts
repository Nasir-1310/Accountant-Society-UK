// Events are hidden automatically once their (end) date has passed.
// Dates use YYYY-MM-DD. `image` is optional: use 800x500 or 1200x675
// jpg/webp for sharp display. Without an image the card shows a branded
// date header instead.
export type UpcomingEvent = {
  title: string;
  date: string;
  endDate?: string;
  location: string;
  organiser: string;
  description: string;
  link?: string;
  image?: string;
};

const upcomingEvents: UpcomingEvent[] = [
  {
    title: "ICAEW Annual Conference 2026",
    date: "2026-10-16",
    location: "InterContinental London – The O2",
    organiser: "ICAEW",
    description:
      "Senior finance leaders explore 'Turning business complexity and change into value' — AI and technology, sustainability, leadership and transformation. Eight hours of verifiable CPD.",
    link: "https://events.icaew.com/pd/31870/icaew-annual-conference-friday-16-october-2026",
  },
  {
    title: "Indirect Taxes Annual Conference 2026",
    date: "2026-11-12",
    location: "London (Goodenough House) and online",
    organiser: "Chartered Institute of Taxation (CIOT)",
    description:
      "Topical sessions on VAT for land, property and construction, trading internationally (VAT, customs and CBAM), VAT and financial services, and a case law update.",
    link: "https://www.tax.org.uk/indirecttaxes2026",
  },
  {
    title: "Accounting for the Future 2026",
    date: "2026-11-24",
    endDate: "2026-11-26",
    location: "Online",
    organiser: "ACCA",
    description:
      "A free three-day virtual conference on 'Risk, resilience and reinvention' — AI, supply chain resilience, cyber security and ethical leadership — with up to 21 units of free CPD.",
    link: "https://www.accaglobal.com/learning-and-events/drive-and-leadership/aff-2026.html",
  },
  {
    title: "Accountex London 2027",
    date: "2027-05-12",
    endDate: "2027-05-13",
    location: "ExCeL London",
    organiser: "Accountex",
    description:
      "The UK's largest accountancy and finance technology show, with exhibitors, CPD seminars and networking for accountants and bookkeepers.",
    link: "https://www.accountex.co.uk/london/",
  },
];

export const parseEventDate = (value: string) => new Date(`${value}T00:00:00Z`);

export const formatEventDateRange = (event: UpcomingEvent) => {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" };
  const start = parseEventDate(event.date);
  if (!event.endDate) return start.toLocaleDateString("en-GB", opts);
  const end = parseEventDate(event.endDate);
  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  return sameMonth
    ? `${start.getUTCDate()}–${end.toLocaleDateString("en-GB", opts)}`
    : `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
};

/** Events that haven't finished yet, soonest first. */
export const getUpcomingEvents = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return upcomingEvents
    .filter((event) => parseEventDate(event.endDate || event.date) >= today)
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime());
};

export default upcomingEvents;
