import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

// Wording taken from the About us page.
const mission = [
  "Foster a strong network of British Bangladeshi Chartered Accountants in the UK.",
  "Promote professional development, mentorship and mutual support.",
  "Highlight the achievements and contributions of our members across the UK and beyond.",
  "Bridge generations of finance professionals, encouraging innovation, diversity and integrity.",
];

export default function AboutIntro() {
  return (
    <section aria-labelledby="about-intro-heading" className="site-container py-14  sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 id="about-intro-heading" className="mt-2 text-3xl font-bold text-brand-950 sm:text-4xl">
            Connecting the excellence of British Bangladeshi accountants
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            The Professional Accountants&apos; Society is a UK-based organisation representing British Bangladeshi
            Accountants. We unite professionals of Bangladeshi heritage into one network that fosters collaboration,
            professional excellence and community impact.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Members share technical knowledge, skills and experience to support one another professionally and
            personally, and contribute positively to the wider business and professional community across the UK.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about-us" className="btn-primary">
              About the Society
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/members/benefits" className="btn-outline">
              Member benefits
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-8 text-white shadow-lift sm:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-300">Our mission</p>
            <ul className="mt-6 space-y-5">
              {mission.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent-300" />
                  </span>
                  <span className="leading-relaxed text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
