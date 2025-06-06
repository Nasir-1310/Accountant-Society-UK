// components/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import SignIn from "./SignIn";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import HomePage from "./HomePage";
import FindAccountantNavbar from "./FindAccountantNavbar";
import Container from "./Container";

const Navbar = () => {
  return (
    <Container>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="h-20 relative bg-white border-b border-l border-r border-gray-200 mx-3 px-5 py-3 z-50"
      >
        <div className="h-full text-black mx-auto w-full max-w-full">
          {/* Mobile and Tablet (xl and below) */}
          <div className="h-full flex items-center justify-between xl:hidden">
            <Menu />
            <Link href="/">
              <Image
                src="/Logo200_70px.svg"
                alt="Company Logo"
                width={120}
                height={60}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop (xl and above) */}
          <div className="hidden xl:block xl:flex items-center justify-between gap-4 xl:gap-8 h-full">
            {/* Left */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/Logo200_70px.svg"
                  alt="Company Logo"
                  height={70}
                  width={180}
                  className="cursor-pointer"
                />
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end gap-4 lg:gap-4 xl:gap-10 flex-1 text-black">
              <HomePage />
              <AboutUs />
              <FindAccountantNavbar />
              <ContactUs />
              <SignIn />
            </div>
          </div>
        </div>
      </motion.nav>
    </Container>
  );
};

export default Navbar;
