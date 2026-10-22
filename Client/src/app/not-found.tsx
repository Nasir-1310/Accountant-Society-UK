// app/not-found.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const suggestions = [
  { label: "About the Society", href: "/about-us" },
  { label: "Latest news", href: "/news-and-events/latest-news" },
  { label: "Upcoming events", href: "/news-and-events/upcoming-events" },
  { label: "Contact us", href: "/contact-us" },
];

export default function NotFound() {
  return (
    <div className="site-container py-20  sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-3xl font-bold text-brand-950 sm:text-4xl">We can&apos;t find that page</h1>
        <p className="mt-4 text-lg text-slate-600">
          The page may have moved, or the link may be out of date. Try one of these instead.
        </p>
        <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="card card-hover group flex items-center justify-between px-5 py-4 font-semibold text-brand-900">
                {item.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="btn-primary mt-8">
          Go to the homepage
        </Link>
      </div>
    </div>
  );
}
