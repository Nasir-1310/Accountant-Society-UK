"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Ben Kemp appointed new Law Society CEO",
    description:
      "General Counsel, Executive Director and dual-qualified Scotland as Chief Executive Officer in August.",
    img: "/slide1.jpg",
    url: "/news/ceo-appointment",
    dotColor: "bg-purple-500",
  },
  {
    id: 2,
    title: "Second Slide Title",
    description: "Description for the second slide.",
    img: "/slide2.jpg",
    url: "/news/second",
    dotColor: "bg-green-500",
  },
  {
    id: 3,
    title: "Third Slide Title",
    description: "Description for the third slide.",
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
    <div
      className="
        bg-white 
        sm:max-w-[425px] sm:mx-8
        md:max-w-[768px] md:mx-10 
        lg:max-w-[1024px] lg:mx-15 lg:px-[25px]
        xl:max-w-[1440px] xl:mx-[80px] xl:px-[5px]
        2xl:max-w-[2560px] 2xl:mx-[600px] 2xl:px-[10px]
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
        <div className="w-full group flex flex-col lg:flex-row bg-white shadow-lg overflow-hidden relative min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
          {/* Text Section */}
          <div className="w-full lg:w-2/5 px-4 sm:px-6 py-4 sm:py-6 flex bg-gray-50 flex-col justify-center relative">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
              {slides[current].title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
              {slides[current].description}
            </p>
            <Link href={slides[current].url}>
              <button className="border border-green-500 text-green-600 px-4 sm:px-5 py-2 rounded hover:bg-green-50 hover:border-green-600 transition w-fit text-sm sm:text-base">
                Read more
              </button>
            </Link>

            {/* Left Arrow - Only on xl screens and above */}
            <button
              onClick={handlePrev}
              className="hidden xl:flex absolute top-1/2 -translate-y-1/2 left-2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-3/5 relative min-h-[200px] sm:min-h-[250px] lg:min-h-[400px]">
            <Image
              src={slides[current].img}
              alt="Slide image"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />

            {/* Right Arrow - Only on xl screens and above */}
            <button
              onClick={handleNext}
              className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-2 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1.5 sm:gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white transition-all duration-300 cursor-pointer hover:scale-110 ${
                    current === index ? slide.dotColor : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>

            {/* Mobile Navigation Arrows */}
            <div className="flex xl:hidden absolute bottom-3 sm:bottom-4 left-3 sm:left-4 gap-2">
              <button
                onClick={handlePrev}
                className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full shadow hover:bg-black/70 transition"
              >
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full shadow hover:bg-black/70 transition"
              >
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
