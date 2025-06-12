// app/wellbeing/page.tsx

import Link from "next/link";
import { Metadata } from "next";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import { Brain, Scale, Handshake } from "lucide-react";
import Image from "next/image";
import wellbeingResources from "@/app/data/wellbeingResources";

export const metadata: Metadata = {
  title: "TPAS Wellbeing | The Professional Accountants Society",
  description:
    "Fostering mental health and resilience in accounting. Access resources on stress, work-life balance, and peer support tailored for TPAS members.",
  openGraph: {
    title: "TPAS Wellbeing | The Professional Accountants Society",
    description:
      "Supporting mental health and wellbeing in accounting. Discover strategies and resources with TPAS Wellbeing.",
    url: "https://www.accountantssociety.org/wellbeing",
    images: [
      {
        url: "/wellbeing-cover.jpg",
        width: 1200,
        height: 630,
        alt: "TPAS Wellbeing Cover",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TPAS Wellbeing | The Professional Accountants Society",
    description:
      "Explore TPAS Wellbeing for mental health and resilience resources in the accounting profession.",
    images: ["/wellbeing-cover.jpg"],
  },
};

export default function TPASWellbeingPage() {
  return (
    <Container>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-16 px-4 mx-3 text-center ">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Welcome to TPAS Wellbeing
        </h1>
        <p className="text-lg text-black mb-6 max-w-2xl mx-auto">
          Your trusted resource for fostering mental health and resilience within the accounting profession.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button >
            <Link href="/wellbeing/resources">Explore Resources</Link>
          </Button>
          <Button>
            <Link href="/join">Join the Community</Link>
          </Button>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="text-center py-16 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Why Wellbeing Matters in Accounting
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg mb-6">
          In the demanding landscape of accounting, prioritising your wellbeing isn’t optional – it’s essential. At TPAS Wellbeing, we are committed to supporting our members through a range of tools, expert insights, and practical guidance designed specifically for the profession.
        </p>
        <Button >
          <Link href="/wellbeing/about">Learn More</Link>
        </Button>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div>
            <Brain className="mx-auto h-10 w-10 text-blue-500 mb-3" />
            <h3 className="font-semibold text-lg">Mental Health & Stress Management</h3>
            <p className="text-gray-600 text-sm mt-1">
              Evidence-based strategies to manage pressure and maintain clarity.
            </p>
          </div>
          <div>
            <Scale className="mx-auto h-10 w-10 text-blue-500 mb-3" />
            <h3 className="font-semibold text-lg">Work-Life Balance</h3>
            <p className="text-gray-600 text-sm mt-1">
              Tools to help set boundaries and avoid burnout.
            </p>
          </div>
          <div>
            <Handshake className="mx-auto h-10 w-10 text-blue-500 mb-3" />
            <h3 className="font-semibold text-lg">Community & Peer Support</h3>
            <p className="text-gray-600 text-sm mt-1">
              A safe space to connect, share, and grow with like-minded professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Explore more resources Section */}
            <section data-aos="fade-up" className=" mt-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-6 lg:gap-8">
                {wellbeingResources.map((card) => (
                  <article
                    key={card.id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                  >
                    <div className="relative w-full overflow-hidden">
                      <div className={`relative ${card.bgColor}`} style={{ aspectRatio: "400 / 250" }}>
                        <Image
                         src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-3">
                        <Link
                          href={card.link}
                          className={`text-lg lg:text-xl font-semibold ${card.titleColor} hover:underline`}
                        >
                          {card.title}
                        </Link>
                      </h3>
                      <p className="mb-3" >
                        {card.description}
                      </p>
                      <Link href={card.link}>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-white hover:text-black  bg-blue-800 hover:bg-white hover:border-teal-500 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                          {card.buttonText}
                        </button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
    </Container>
  );
}
