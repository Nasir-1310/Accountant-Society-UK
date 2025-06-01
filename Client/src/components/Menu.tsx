"use client";

import { useState } from "react";
import Link from "next/link";
import { menuItems } from "@/app/data/menuItems";
import {
  XIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  MenuIcon,
} from "lucide-react"; // using lucide icons for modern styling
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import FindAccountantNavbar from "./FindAccountantNavbar";
import ContactUs from "./ContactUs";
import SignIn from "./SignIn";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<number | null>(null);

  const handleMenuClick = (index: number) => setExpandedMenu(index);
  const handleCloseExpanded = () => setExpandedMenu(null);
  const handleMainMenuClose = () => {
    setOpen(false);
    setExpandedMenu(null);
  };

  return (
    <div className="relative">
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="p-2 text-blue-600 hover:text-blue-900 xl:hidden transition duration-300"
                    >
                    <span className="relative block w-10 h-10">
                        {/* Menu Icon (Hamburger) */}
                        <MenuIcon
                        className={`absolute inset-0 w-10 h-10 transition-transform duration-300 ease-in-out ${
                            open ? "scale-0 rotate-45" : "scale-100 rotate-0"
                        }`}
                        />

                        {/* Cross Icon */}
                        <XIcon
                        className={`absolute inset-0 w-10 h-10 transition-transform duration-300 ease-in-out ${
                            open ? "scale-100 rotate-0" : "scale-0 -rotate-45"
                        }`}
                        />
                    </span>
            </button>

      {open && (
        <>
          <div
  className={`fixed bg-white shadow-xl top-20 left-0 w-full sm:w-80 h-[700px] z-30 transform transition-transform duration-300 ease-in-out ${
    expandedMenu !== null ? "-translate-x-full" : open ? "translate-x-0" : "-translate-x-full"
  }`}
>


            {/* Static Menu */}
            <div className="flex flex-col px-6 space-y-4 py-10 pb-5">
                <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                    <HomePage />
                </div>
               <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                    <AboutUs />
                </div>
              
               <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                    <FindAccountantNavbar />
                </div>
             
               <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                    <ContactUs />
                </div>
                 <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-700 rounded-full"></span>
                    <SignIn />
                </div>
              
              
            </div>

            {/* Dynamic Menu */}
            <div className="flex-1 overflow-y-auto ">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100">
                  <button
                    onClick={() => handleMenuClick(index)}
                    className="w-full flex items-center justify-between px-10 py-4 hover:bg-gray-300 transition-colors"
                  >
                    <span className="font-medium text-gray-800 font-semibold">{item.title}</span>
                    <ChevronRightIcon className="w-7 h-7 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Expanded Submenu */}
{expandedMenu !== null && (
  <div
    className="fixed top-20 left-0 w-full sm:w-80 h-screen bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out translate-x-0"
  >
    <div className="flex items-center justify-between p-4 border-b bg-gray-50">
      <button
        onClick={handleCloseExpanded}
        className="p-2 hover:bg-gray-200 rounded-full"
      >
        <ChevronLeftIcon className="w-7 h-7 text-gray-600" />
      </button>
      <h2 className="text-center font-semibold text-gray-800 flex-1">
        {menuItems[expandedMenu].title}
      </h2>
    </div>

    <div className="flex-1 overflow-y-auto">
      {menuItems[expandedMenu].links.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          className="block px-4 py-4 hover:bg-gray-300 border-b text-gray-700 font-semibold hover:text-blue-900"
          onClick={handleMainMenuClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
)}


          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-0 z-20"
            onClick={handleMainMenuClose}
          ></div>
        </>
      )}
    </div>
  );
};

export default Menu;
