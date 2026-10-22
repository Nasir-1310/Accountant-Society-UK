import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Linkedin, ArrowRight } from "lucide-react";

const linkGroups = [
  {
    title: "About us",
    links: [
      { name: "Who we are", href: "/about-us" },
      { name: "Founding members", href: "/founding-members/members" },
      { name: "Constitution", href: "/policies/constitution" },
      { name: "Strategic partners", href: "/members/strategic-partners" },
      { name: "Contact us", href: "/contact-us" },
    ],
  },
  {
    title: "For members",
    links: [
      { name: "Member benefits", href: "/members/benefits" },
      { name: "Membership & fees", href: "/members/membership-and-fees" },
      { name: "CPD & training", href: "/members/cpd-training" },
      { name: "Rules & guidance", href: "/members/rules-and-guidance" },
      { name: "Professional support", href: "/members/professional-support" },
      { name: "TPAS Wellbeing", href: "/members/wellbeing" },
    ],
  },
  {
    title: "News & events",
    links: [
      { name: "Latest news", href: "/news-and-events/latest-news" },
      { name: "Upcoming events", href: "/news-and-events/upcoming-events" },
      { name: "Gallery", href: "/news-and-events/gallery" },
      { name: "Magazine", href: "/news-and-events/magazine" },
      { name: "Journal", href: "/members/journal" },
      { name: "Find an accountant", href: "/find-an-accountants" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1B1fzAS6ru/?mibextid=wwXIfr", label: "Facebook" },
  { icon: Linkedin, href: "http://www.linkedin.com/in/the-professional-accountants-society-12700035a", label: "LinkedIn" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-brand-950 text-slate-300">
      {/* Join call to action */}
      <div className="border-b border-white/10">
        <div className="site-container flex flex-col gap-6 py-10  lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent-400">Not a member yet?</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Join a growing network of British Bangladeshi accountants
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/members/membership-and-fees" className="btn-accent">
              Become a member
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/contact-us" className="btn-ghost-light">
              Contact us
            </Link>
          </div>
        </div>
      </div>

      <div className="site-container py-14 ">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Organisation */}
          <div className="space-y-5">
            <Image
              src="/Logofooter114_50px.svg"
              alt="The Professional Accountants' Society"
              width={180}
              height={70}
              className="h-14 w-auto"
            />
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-400" />
                <address className="not-italic">
                  513 London Road, Cheam,
                  <br />
                  Sutton, SM3 8JR
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-accent-400" />
                <a href="tel:+447988834395" className="hover:text-white">
                  07988 834395
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-accent-400" />
                <a href="mailto:admin@accountantssociety.org" className="break-all hover:text-white">
                  admin@accountantssociety.org
                </a>
              </li>
            </ul>
            <div className="flex gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TPAS on ${label} (opens in a new tab)`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white hover:text-brand-900"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.href + link.name}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-3 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between ">
          <p>© {currentYear} The Professional Accountants&apos; Society United Kingdom. All rights reserved.</p>
          <p>
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/nasir-uddin-2a6498269/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white"
            >
              N3 Journey
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
