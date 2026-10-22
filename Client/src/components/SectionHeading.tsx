import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  id?: string;
}

/** Heading row for homepage and listing sections, with an optional "view all" link. */
export default function SectionHeading({ eyebrow, title, description, action, id }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="mt-2 text-2xl font-bold text-brand-950 sm:text-3xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-slate-600">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-800 hover:text-brand-600"
        >
          {action.label}
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
