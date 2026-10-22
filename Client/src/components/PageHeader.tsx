import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
}

/** Consistent page title band with breadcrumb, used across content pages. */
export default function PageHeader({ title, description, eyebrow, breadcrumbs = [], children }: PageHeaderProps) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl"
      />
      <div className="site-container relative py-10 sm:py-14 ">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            {crumbs.map((crumb, index) => {
              const last = index === crumbs.length - 1;
              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                  {crumb.href && !last ? (
                    <Link href={crumb.href} className="hover:text-brand-900 hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className={last ? "font-medium text-slate-700" : ""}>
                      {crumb.label}
                    </span>
                  )}
                  {!last && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className={`${eyebrow ? "mt-2" : "mt-6"} text-3xl font-bold text-brand-950 sm:text-4xl lg:text-[2.75rem] lg:leading-tight`}>
          {title}
        </h1>
        {description && <p className="mt-4 max-w-3xl text-base text-slate-600 sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}
