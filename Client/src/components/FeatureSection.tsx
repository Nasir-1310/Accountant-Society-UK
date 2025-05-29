"use client";

import Link from "next/link";
import Image from "next/image";


const featureCards = [
  {
    id: 1,
    title: "Member sign in",
    image: "/log-in-400px-250px.jpg", // Replace with your actual image path
    link: "/members/signin",
    buttonText: "Sign in",
    bgColor: "bg-red-300",
    titleColor: "text-purple-600"
  },
  {
    id: 2,
    title: "CPD & Training",
    image: "/light-400px-250px.jpg", // Replace with your actual image path
    link: "/education/cpd",
    buttonText: "Find out more",
    bgColor: "bg-orange-400",
    titleColor: "text-green-600"
  },
  {
    id: 3,
    title: "Rules and guidance",
    image: "/tir-400px-250px.jpg", // Replace with your actual image path
    link: "Rules and Guidance.png",
    buttonText: "Read more",
    bgColor: "bg-teal-500",
    titleColor: "text-blue-600"
  },
  {
    id: 4,
    title: "Journal",
    image: "/journal.jpg", // Replace with your actual image path
    link: "/publications/journal",
    buttonText: "Read more",
    bgColor: "bg-blue-500",
    titleColor: "text-red-600"
  }
];

// bg-white 
//         sm:max-w-[425px] sm:mx-8
//         md:max-w-[768px] md:mx-10 
//         lg:max-w-[1024px] lg:mx-15 lg:px-[25px]
//         xl:max-w-[1440px] xl:mx-[80px] xl:px-[5px]
//         2xl:max-w-[2560px] 2xl:mx-[600px] 2xl:px-[10px]
//         py-0

const FeatureSection = () => {
  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-screen-xl
      2xl:max-w-[2560px] 2xl:mx-[610px] 2xl:px-[10px]
      xl:max-w-[1440px] xl:mx-[90px] xl:px-[5px]
      lg:max-w-[1024px] lg:mx-[1px] lg:px-[20px]
      md:max-w-[768px] md:mx-[30px]
      mx-auto px-4 sm:px-6 lg:px-[80px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featureCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Image Section */}
              <div className={`relative h-48 ${card.bgColor} flex items-center justify-center overflow-hidden`}>
                {/* Uncomment below when you have actual images */}
                
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title with Link */}
                <h3 className="mb-4">
                  <Link
                    href={card.link}
                    className={`text-xl font-semibold ${card.titleColor} hover:underline transition-colors duration-200`}
                  >
                    {card.title}
                  </Link>
                </h3>

                {/* Button */}
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-300 hover:border-gray-400 transition-colors duration-200 font-medium">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;