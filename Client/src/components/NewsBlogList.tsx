import { CalendarDays, ExternalLink, FileText, PenLine } from "lucide-react";
import type { NewsBlogItem } from "@/lib/newsBlogs";

const typeStyles: Record<NewsBlogItem["type"], { label: string; icon: typeof FileText; className: string }> = {
  news: { label: "News", icon: FileText, className: "bg-brand-50 text-brand-800" },
  blog: { label: "Blog", icon: PenLine, className: "bg-accent-50 text-accent-700" },
  event: { label: "Event", icon: CalendarDays, className: "bg-amber-50 text-amber-800" },
};

// Dates are entered as free text in the admin panel; show them as written
// when they can't be parsed.
const formatDate = (value: string) => {
  const parsed = new Date(value);
  if (!value || Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

const isExternal = (href: string) => /^https?:\/\//i.test(href);

/** Presentational grid of news/blog cards (used by server and client). */
export default function NewsBlogList({ items }: { items: NewsBlogItem[] }) {
  if (items.length === 0) {
    return <p className="card px-6 py-10 text-center text-slate-600">No news has been published yet.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const style = typeStyles[item.type] || typeStyles.news;
        const Icon = style.icon;
        const external = isExternal(item.link);
        return (
          <li key={item.id}>
            <article className="card card-hover group relative flex h-full flex-col p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${style.className}`}>
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  {style.label}
                </span>
                {item.category && <span className="font-medium text-slate-500">{item.category}</span>}
              </div>

              <h3 className="mt-4 text-lg font-bold leading-snug text-brand-950">
                <a
                  href={item.link}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand-700"
                >
                  {item.title}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </h3>

              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600">{item.description}</p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-slate-500">
                {item.date && <time>{formatDate(item.date)}</time>}
                {external && (
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-800">
                    Read more
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
