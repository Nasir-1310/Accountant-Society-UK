"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";

const slides = [
  {
    id: 1,
    title: "Connecting the Excellence of British Bangladeshi Chartered Accountants",
    description:
      "Empowering a community of finance professionals through networking, mentorship, and recognition.",
    img: "/slide1.jpg",
    url: "/news/ceo-appointment",
    dotColor: "bg-purple-500",
  },
  {
    id: 2,
    title: "Driving Impact Through Collaboration and Innovation ",
    description: "Uniting expertise and forward-thinking to shape the future of accountancy and empower our professional community.",
    img: "/slide2.jpg",
    url: "/news/second",
    dotColor: "bg-green-500",
  },
  {
    id: 3,
    title: "Find an Accountant Near You",
    description: "No matter what you're facing—tax, business, or personal finance—use our trusted directory to connect with a qualified, regulated accountant who can guide you through it. Bottom Logo need to be changed with same colour background",
    img: "/slide3.jpg",
    url: "/news/third",
    dotColor: "bg-blue-500",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const handleNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <Container>

   
    <div
      className="
        bg-white 
        w-full
        
        py-0
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
        <div className="w-full group flex flex-col-reverse lg:flex-row bg-white shadow-lg overflow-hidden relative min-h-[280px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[350px] xl:min-h-[350px]">
          {/* Text Section */}
          <div className="w-full lg:w-2/5 px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex bg-gray-100 flex-col justify-center relative order-2 lg:order-1">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight break-words hyphens-auto">
              {slides[current].title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-5 line-clamp-2 sm:line-clamp-3 lg:line-clamp-none leading-relaxed break-words">
              {slides[current].description}
            </p>
            <Link href={slides[current].url}>
              <button className="border border-green-500 text-green-600 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded hover:bg-green-400 hover:border-green-600 hover:text-white transition w-fit text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                Read more
              </button>
            </Link>

            {/* Left Arrow - Only on xl screens and above */}
            <button
              onClick={handlePrev}
              className="hidden xl:flex absolute top-1/2 -translate-y-1/2 left-2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 transition opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-3/5 relative min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[350px] xl:min-h-[350px] order-1 lg:order-2 aspect-[900/350] lg:aspect-auto">
            <Image
              src={slides[current].img}
              alt={`Slide image for ${slides[current].title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
              className="object-cover w-full h-full"
              priority
              style={{
                objectPosition: 'center center',
                aspectRatio: '900/350'
              }}
            />

            {/* Right Arrow - Only on xl screens and above */}
            <button
              onClick={handleNext}
              className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-2 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1.5 sm:gap-2 z-10">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border-2 border-white transition-all duration-300 cursor-pointer hover:scale-110 flex-shrink-0 ${
                    current === index ? slide.dotColor : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex xl:hidden absolute bottom-3 sm:bottom-4 left-3 sm:left-4 gap-2 z-10">
              <button
                onClick={handlePrev}
                className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full shadow hover:bg-black/70 transition flex-shrink-0"
                aria-label="Previous slide"
              >
                <ChevronLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={handleNext}
                className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full shadow hover:bg-black/70 transition flex-shrink-0"
                aria-label="Next slide"
              >
                <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Loading overlay for better UX */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ zIndex: -1 }}>
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </Container>
  );
};

export default Slider;