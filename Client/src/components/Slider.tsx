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
      "General Counsel, Executive Director and dual-qualified  Scotland as Chief Executive Officer in August.",
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
    <div className="w-full flex justify-center   px-4 md:px-[100px]">
      <div className="w-full group flex flex-col md:flex-row bg-white shadow rounded overflow-hidden relative max-h-[350px] min-h-[350px]">
        {/* Text Section */}
        <div className="w-full md:w-2/5 px-6 py-6 flex bg-gray-200 flex-col justify-center relative">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {slides[current].title}
          </h2>
          <p className="text-gray-600 mb-5 hidden md:block">
            {slides[current].description}
          </p>
          <Link href={slides[current].url}>
            <button className="border border-green-500 text-green-600 px-5 py-2 rounded hover:bg-yellow-600 transition w-fit">
              Read more
            </button>
          </Link>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 transition opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-2/3 relative min-h-[200px]">
          <Image
            src={slides[current].img}
            alt="Slide image"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className=" hidden md:flex absolute top-1/2 -translate-y-1/2 right-2 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                  current === index ? slide.dotColor : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
