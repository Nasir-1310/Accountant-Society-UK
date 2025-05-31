"use client";

import Link from "next/link";
import React, { useState } from "react";
import Container from "./Container";

const menuItems = [
  {
    title: "For members",
    links: [
      { label: "Member benefits", href: "/members/benefits" },
      { label: "Join us", href: "/contactUs" },
      { label: "Member sign In", href: "/members/guidance" },
    ],
  },
  {
    title: "News and events",
    links: [
      { label: "Latest news", href: "/news/latest" },
      { label: "Events", href: "/news/events" },
      { label: "Webinars", href: "/news/webinars" },
    ],
  },
  {
    title: "CPD & Training",
    links: [
      { label: "CPD", href: "/cpd" },
      { label: "Mentoring", href: "/mentoring" },
      
    ],
  },
  {
    title: "Policies",
    links: [{ label: "Rules & Guidance", href: "/research/report" }],
  },
  {
    title: "For the public",
    links: [
      { label: "Find an Accountants", href: "/public/find" },
      { label: "Make a Query", href: "/contactUs" },
    ],
  },
];

const TopNews = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Container>

   
    <div
      className="
        hidden lg:block
        bg-white 
       
        w-full
        
        py-3
      "
    >
      <div
        className="
          h-full
          px-3
          mx-auto
          w-full
          max-w-full
        "
      >
        <div className="flex justify-between items-center text-center relative">
          {/* First separator */}
          <div className="w-px h-8 bg-gray-300"></div>

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className="relative group flex-1 min-w-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Title */}
                <div className="text-gray-800 font-medium hover:text-blue-900 cursor-pointer py-2 px-2 lg:px-3 xl:px-4 transition-colors duration-150 text-sm lg:text-base truncate">
                  {item.title}
                </div>

                {/* Dropdown */}
                {activeIndex === index && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white border rounded shadow-lg z-50 w-48 lg:w-52 transition-all duration-200">
                    <ul className="flex flex-col text-left py-2">
                      {item.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 transition-colors duration-150 whitespace-nowrap"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Separator line after each menu item */}
              <div className="w-0.5 h-8 bg-gray-300 flex-shrink-0"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
     </Container>
  );
};

export default TopNews;