"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "./Container";
import { Rounded_Button } from "./Rounded_Button";

const images = [
  "/landing_page/1.jpg",
  "/landing_page/2.jpg",
  "/landing_page/3.jpg",
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Container>
      <div className="relative h-[90vh] mx-3 overflow-hidden  shadow-lg bg-black mb-4">
        {/* Background Images */}
        {images.map((src, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === prevIndex;

          return (
            <Image
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out duration-1000 transform 
                ${isActive ? "opacity-100 z-20 animate-zoom-in" : isPrev ? "opacity-0 z-10" : "hidden"}`}
              priority={index === 0}
            />
          );
        })}

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0b0b5b]/50 z-30 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
          <h1 className="text-xl sm:text-3xl  md:text-4xl xl:text-5xl font-bold mb-4 leading-tight max-w-5xl">
            The Professional Accountants&apos; Society
          </h1>

          <p className="text-xs sm:text-lg text-white max-w-3xl mb-4 leading-relaxed">
            A UK-based organisation representing British Bangladeshi Chartered and Chartered Certified Accountants.
          </p>

          <p className="text-xs sm:text-lg text-white max-w-3xl mb-4 leading-relaxed">
            We create an environment where members share knowledge, skills, and experience — empowering individuals while
            contributing positively to the UK’s wider business and professional community.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 ">
            <Rounded_Button href="/members/membership-and-fees" className=" text-xs sm:text-lg bg-transparent border-white text-white hover:text-[#0b0b5b]">
              Membership & Fees
            </Rounded_Button>
            <Rounded_Button href="/members/benefits" className="text-xs sm:text-lg bg-transparent border-white text-white hover:text-[#0b0b5b]">
              Member Benefits
            </Rounded_Button>
            <Rounded_Button href="/contact-us" className="text-xs sm:text-lg bg-transparent border-white text-white hover:text-black">
              Join Us
            </Rounded_Button>
          </div>
        </div>
      </div>

      {/* Zoom-in Keyframe Animation */}
      <style jsx global>{`
        @keyframes zoomInFade {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.15);
          }
        }

        .animate-zoom-in {
          animation: zoomInFade 6s ease-in-out forwards;
        }
      `}</style>
    </Container>
  );
}
