"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { ChevronDown, Menu as MenuIcon, X } from "lucide-react";
import { menuItems } from "@/app/data/menuItems";

const utilityLinks = [
  { label: "About us", href: "/about-us" },
  { label: "Find an Accountant", href: "/find-an-accountants" },
  { label: "Contact us", href: "/contact-us" },
];

const utilityHrefs = new Set(utilityLinks.map((link) => link.href));

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

function DesktopDropdown({
  item,
  open,
  onOpen,
  onClose,
  pathname,
}: {
  item: (typeof menuItems)[number];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
}) {
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Pages with their own header link (e.g. Contact us) shouldn't also
  // highlight a menu group that happens to link to them.
  const groupActive = item.links.some(
    (link) => !utilityHrefs.has(link.href) && isActive(pathname, link.href)
  );

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          onClose();
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? onClose() : onOpen())}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
          open || groupActive ? "text-brand-900" : "text-slate-700 hover:text-brand-900"
        }`}
      >
        {item.title}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {groupActive && (
        <span aria-hidden="true" className="absolute inset-x-3 -bottom-[7px] h-0.5 rounded-full bg-accent-500" />
      )}

      {open && (
        <div className="absolute left-0 top-full z-50 pt-2 animate-fade-in">
          <ul
            id={menuId}
            className="min-w-[15rem] overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lift"
          >
            {item.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(pathname, link.href)
                      ? "bg-brand-50 font-semibold text-brand-900"
                      : "text-slate-700 hover:bg-slate-50 hover:text-brand-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on navigation.
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileGroup(null);
  }, [pathname]);

  // Close desktop dropdowns when clicking elsewhere.
  useEffect(() => {
    if (openGroup === null) return;
    const handle = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openGroup]);

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="site-container ">
        {/* Top row: logo, utility links, account actions */}
        <div className="flex h-16 items-center justify-between gap-6 xl:h-[4.5rem]">
          <Link href="/" aria-label="The Professional Accountants' Society — home" className="flex-shrink-0">
            <Image
              src="/logo/logo-laptop.svg"
              alt="The Professional Accountants' Society"
              width={180}
              height={52}
              priority
              className="h-10 w-auto xl:h-12"
            />
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(pathname, link.href) ? "text-brand-900" : "text-slate-600 hover:text-brand-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <span aria-hidden="true" className="mx-2 h-5 w-px bg-slate-200" />
            <Link href="/signin" className="rounded-md px-3 py-2 text-sm font-semibold text-brand-900 hover:text-brand-700">
              Sign in
            </Link>
            <Link href="/members/membership-and-fees" className="btn-accent ml-2">
              Become a member
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-900 hover:bg-brand-50 xl:hidden"
          >
            <span className="sr-only">Open menu</span>
            <MenuIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Second row: section menus (desktop) */}
        <nav ref={navRef} aria-label="Main" className="hidden border-t border-slate-100 xl:block">
          <ul className="-mx-3 flex h-12 items-center gap-1">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={`relative block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  pathname === "/" ? "text-brand-900" : "text-slate-700 hover:text-brand-900"
                }`}
              >
                Home
                {pathname === "/" && (
                  <span aria-hidden="true" className="absolute inset-x-3 -bottom-[7px] h-0.5 rounded-full bg-accent-500" />
                )}
              </Link>
            </li>
            {menuItems.map((item, index) => (
              <DesktopDropdown
                key={item.title}
                item={item}
                open={openGroup === index}
                onOpen={() => setOpenGroup(index)}
                onClose={() => setOpenGroup((current) => (current === index ? null : current))}
                pathname={pathname}
              />
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile / tablet menu. Rendered into <body> through a portal: the
          header's backdrop blur would otherwise trap this fixed overlay inside
          the 64px-tall header. */}
      {mobileOpen && createPortal(
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-lift"
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
              <Image src="/Logo200_70px.svg" alt="" width={120} height={42} className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-900 hover:bg-brand-50"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-0.5">
                {[{ label: "Home", href: "/" }, ...utilityLinks].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      className={`block rounded-lg px-3 py-3 text-base font-semibold ${
                        isActive(pathname, link.href) ? "bg-brand-50 text-brand-900" : "text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-3 space-y-0.5 border-t border-slate-100 pt-3">
                {menuItems.map((item, index) => {
                  const expanded = mobileGroup === index;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setMobileGroup(expanded ? null : index)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-slate-800 hover:bg-slate-50"
                      >
                        {item.title}
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      {expanded && (
                        <ul className="mb-2 ml-3 border-l-2 border-brand-100 pl-2">
                          {item.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                                className={`block rounded-lg px-3 py-2.5 text-[0.95rem] ${
                                  isActive(pathname, link.href)
                                    ? "font-semibold text-brand-900"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-900"
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-4">
              <Link href="/signin" className="btn-outline">
                Sign in
              </Link>
              <Link href="/members/membership-and-fees" className="btn-accent">
                Become a member
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
