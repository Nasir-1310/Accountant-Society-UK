import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, LogIn, Scale } from "lucide-react";
import featureCards from "@/app/data/featureCards";

// Short, navigational summaries for each quick link (keyed by link).
const details: Record<string, { icon: typeof LogIn; summary: string }> = {
  "/signin": { icon: LogIn, summary: "Access your member account and resources." },
  "/members/cpd-training": { icon: GraduationCap, summary: "Keep your CPD on track with training and events." },
  "/members/rules-and-guidance": { icon: Scale, summary: "The standards and guidance our members follow." },
  "/members/journal": { icon: BookOpen, summary: "Articles and insight from the profession." },
};

const FeatureSection = () => {
  return (
    <section aria-label="Quick links" className="site-container ">
      <ul className="relative z-10 -mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {featureCards.map((card) => {
          const detail = details[card.link];
          const Icon = detail?.icon ?? ArrowRight;
          return (
            <li key={card.id}>
              <Link
                href={card.link}
                className="card card-hover group flex h-full items-start gap-4 p-5 sm:flex-col sm:p-6"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-800 transition-colors group-hover:bg-brand-900 group-hover:text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-base font-bold text-brand-950">{card.title}</span>
                  {detail && <span className="mt-1 text-sm text-slate-600">{detail.summary}</span>}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
                    {card.buttonText}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FeatureSection;
