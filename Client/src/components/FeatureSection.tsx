"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "./Container";

const featureCards = [
  {
    id: 1,
    title: "Member sign in",
    image: "/log-in-400px-250px.jpg",
    link: "/signin",
    buttonText: "Sign in",
    bgColor: "bg-red-300",
    titleColor: "text-purple-600",
  },
  {
    id: 2,
    title: "CPD & Training",
    image: "/light-400px-250px.jpg",
    link: "/education/cpd",
    buttonText: "Find out more",
    bgColor: "bg-orange-400",
    titleColor: "text-green-600",
  },
  {
    id: 3,
    title: "Rules and guidance",
    image: "/tir-400px-250px.jpg",
    link: "/rules-guidance",
    buttonText: "Read more",
    bgColor: "bg-teal-500",
    titleColor: "text-blue-600",
  },
  {
    id: 4,
    title: "Journal",
    image: "/journal.jpg",
    link: "/publications/journal",
    buttonText: "Read more",
    bgColor: "bg-blue-500",
    titleColor: "text-red-600",
  },
];

const FeatureSection = () => {
  return (
    <Container>

   
    <section data-aos="fade-up" className="w-full bg-white py-10">
      <div
        className="
          w-full 
          px-2
        "
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featureCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Image Container with aspect ratio */}
              <div
                className={`relative ${card.bgColor}`}
                style={{ aspectRatio: "400 / 250" }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="mb-4">
                  <Link
                    href={card.link}
                    className={`text-xl font-semibold ${card.titleColor} hover:underline transition-colors duration-200`}
                  >
                    {card.title}
                  </Link>
                </h3>
                <button className=" px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-green-300 hover:border-gray-900 transition-colors duration-200 font-medium">
                  <Link href={card.link}>
                  {card.buttonText}
                  </Link>
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
     </Container>
  );
};

export default FeatureSection;
