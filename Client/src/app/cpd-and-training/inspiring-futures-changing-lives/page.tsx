// src/app/cpd and training/inspiring future ahanging lives/page.tsx
import inspiring_futures_changing_livesCarts from "@/app/data/inspiring-futures-changing-livesCarts";
import Container from "@/components/Container";
import { Handshake, Trophy } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CPD & Training | The Professional Accountants Society",
  description:
    "Advance your accounting career with CPD and training programs from the Society of Professional Accountants. Access expert-led courses, webinars, and up-to-date industry knowledge to meet your professional development goals.",
  keywords: [
    "CPD for accountants",
    "TPAC",
    "accounting training",
    "continuing professional development",
    "professional development for accountants",
    "accounting webinars",
    "accounting courses",
    "Society of Professional Accountants CPD",
  ],
  openGraph: {
    title: "CPD & Training | Society of Professional Accountants",
    description:
      "Advance your accounting career with CPD and training programs from the Society of Professional Accountants. Access expert-led courses, webinars, and up-to-date industry knowledge to meet your professional development goals.",
    url: "https://accountantssociety.org/members/cpd-and-training",
    siteName: "Society of Professional Accountants",
    type: "website",
  },
};

const CPD_and_Training = () => {
  return (
    <Container>
      <div className="w-full flex justify-center mt-12 px-4">
        <div className="w-full flex flex-col lg:flex-row bg-white shadow-lg overflow-hidden">
          {/* Main Content Section - First on mobile/tablet */}
          <div className="w-full lg:w-3/4 order-1 lg:order-2 px-6 lg:px-10 py-8">
            {/* Breadcrumb */}
            <div data-aos="fade-up" className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
              <span className="mx-2">|</span>
              <Link href="/members/cpd-training" className="text-gray-700">
                CPD and Training
              </Link>
              <span className="mx-2">|</span>
              <span className="text-gray-700">
                Inspiring Futures, Changing Lives
              </span>
            </div>

            {/* Page Title */}
            <div
              data-aos="fade-up"
              className="relative w-full h-[350px] md:h-[400px] bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center items-center px-4 text-center"
              style={{
                backgroundImage:
                  "url('/inspiring_futures_changing_lives/inspiring-future-bg.jpg')",
              }} // Replace with your actual image path
            >
              <div className="bg-black/50 w-full h-full absolute top-0 left-0 z-0" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Inspiring Futures, Changing Lives
                </h1>
                <p className="text-base md:text-lg lg:text-xl mb-6">
                  Supporting school leavers to begin their journey in
                  accountancy
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/"
                    className="bg-white text-green-700 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/"
                    className="bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-green-800 transition"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div data-aos="fade-up" className="space-y-8 mb-10">
              {/* Vision Section */}
              <section data-aos="fade-up" id="vision" className="mt-10">
                <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                  <Trophy
                    data-aos="fade-up"
                    className="text-teal-600 w-6 h-6"
                  />
                  Why We Do What We Do
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-lg"
                >
                  The Professional Accountants Society is committed to unlocking
                  potential and transforming lives. We empower school leavers by
                  offering support, resources, and mentorship to help them
                  pursue successful careers in accountancy.
                </p>
              </section>
            </div>

            {/* Cards Section - Feature Cards Grid */}
            <div data-aos="fade-up" className="mb-8">
              <section data-aos="fade-up" className="w-full bg-white py-0">
                <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                  <Handshake className="text-teal-600 w-6 h-6" /> How We Help
                </h2>
                <div className="w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-6 lg:gap-8">
                    {inspiring_futures_changing_livesCarts.map((card) => (
                      <div
                        key={card.id}
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                      >
                        {/* Image Container with fixed aspect ratio */}
                        <div className="relative w-full overflow-hidden">
                          <div
                            className={`relative ${card.bgColor}`}
                            style={{ aspectRatio: "400 / 250" }}
                          >
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              priority={false}
                            />
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                          <h3 data-aos="fade-up" className="mb-4">
                            <p
                              className={`text-lg  font-semibold ${card.titleColor} transition-colors duration-200 line-clamp-2`}
                            >
                              {card.title}
                            </p>
                          </h3>
                          <div>
                            <p
                              data-aos="fade-up"
                              className="text-base px-4 py-0  text-gray-700"
                            >
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Section - Second on mobile/tablet, first on desktop */}
          <div
            data-aos="fade-up"
            className="w-full lg:w-1/4 order-2 lg:order-1 bg-gradient-to-br from-gray-200 to-gray-100 border-t lg:border-t-0 lg:border-r border-gray-200"
          >
            <div className="px-6 py-8">
              {/* Cards Container - Horizontal on mobile/tablet, vertical on desktop */}
              <div className="flex flex-col md:flex-row lg:flex-col gap-6">
                {/* About Us Card */}
                <div
                  data-aos="fade-up"
                  className="bg-white rounded-lg shadow-md overflow-hidden flex-1"
                >
                  <div className="flex flex-col">
                    {/* Image Section */}
                    <div className="relative w-full">
                      <div
                        style={{ aspectRatio: "400 / 250" }}
                        className="relative overflow-hidden"
                      >
                        <Image
                          src="/accountant.jpg"
                          alt="About us - Professional Accountants"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 md:w-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        About us
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-grow">
                        The Professional Accountants Society is British
                        Bangladeshi Chartered Accountants. We promote excellence
                        among accountants through support and regulation of our
                        members.
                      </p>
                      <Link href="/about-us">
                        <button className="inline-flex items-center text-teal-600 hover:text-white hover:bg-teal-600 font-semibold text-sm px-3 py-2 rounded-md border border-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                          Learn more
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Contact Us Card */}
                <div
                  data-aos="fade-up"
                  className="bg-white rounded-lg shadow-md overflow-hidden flex-1"
                >
                  <div className="flex flex-col">
                    {/* Image Section */}
                    <div className="relative w-full">
                      <div
                        style={{ aspectRatio: "400 / 250" }}
                        className="relative overflow-hidden"
                      >
                        <Image
                          src="/contact-us.png"
                          alt="Contact us - Professional Accountants Society"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 md:w-2/3 lg:w-full flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Contact us
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-grow">
                        Get in touch with our team for support, inquiries, or
                        guidance on your professional development journey.
                        We&apos;re here to help you succeed.
                      </p>
                      <Link href="/contact-us">
                        <button className="inline-flex items-center text-teal-600 hover:text-white hover:bg-teal-600 font-semibold text-sm px-3 py-2 rounded-md border border-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                          Learn more
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CPD_and_Training;
