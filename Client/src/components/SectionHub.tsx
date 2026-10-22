import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type HubLink = { label: string; href: string; summary?: string };

/** Overview grid linking to every page in a site section. */
export default function SectionHub({ links }: { links: HubLink[] }) {
  return (
    <div className="site-container py-12  sm:py-16">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="card card-hover group flex h-full flex-col p-6">
              <span className="text-lg font-bold text-brand-950">{link.label}</span>
              {link.summary && <span className="mt-2 text-sm text-slate-600">{link.summary}</span>}
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-800">
                Visit page
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
