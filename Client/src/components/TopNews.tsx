"use client";

import Link from "next/link";
import React, { useState } from "react";

const menuItems = [
  {
    title: "For members",
    links: [
      { label: "Member benefits", href: "/members/benefits" },
      { label: "Join us", href: "/members/join" },
      { label: "Guidance", href: "/members/guidance" },
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
    title: "Qualifying and education",
    links: [
      { label: "Legal education", href: "/education/legal" },
      { label: "Training", href: "/education/training" },
      { label: "Exams", href: "/education/exams" },
    ],
  },
  {
    title: "Research and policy",
    links: [
      { label: "Reports", href: "/research/reports" },
      { label: "Consultations", href: "/research/consultations" },
      { label: "Surveys", href: "/research/surveys" },
    ],
  },
  {
    title: "For the public",
    links: [
      { label: "Find a solicitor", href: "/public/find" },
      { label: "Legal info", href: "/public/info" },
      { label: "Complaints", href: "/public/complaints" },
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
    <div className="hidden lg:block bg-white w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-[100px] py-3">
      <div className="flex justify-between items-center text-center relative">
        {/* First separator */}
        <div className="w-px h-8 bg-gray-300"></div>
        
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="relative group flex-1"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Title */}
              <div className="text-gray-800 font-medium hover:text-green-600 cursor-pointer py-2 px-4">
                {item.title}
              </div>

              {/* Dropdown */}
              {activeIndex === index && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white border rounded shadow-md z-50 w-52 transition-all duration-200">
                  <ul className="flex flex-col text-left py-2">
                    {item.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
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
            <div className="w-px h-8 bg-gray-300"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopNews;