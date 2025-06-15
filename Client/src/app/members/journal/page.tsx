import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Square_Button } from "@/components/Square_Button";
import journal from "@/app/data/journal";

export const metadata: Metadata = {
  title: "Journal | Society of Professional Accountants",
  description:
    "Explore peer-contributed articles, research findings, and thought leadership from the Society of Professional Accountants.",
  openGraph: {
    title: "Journal | Society of Professional Accountants",
    description:
      "The official journal of the Society of Professional Accountants. Read in-depth articles, original research, and expert insights contributed by our members.",
    type: "website",
    url: "https://www.accountantssociety.org/journal",
    images: [
      {
        url: "https://www.accountantssociety.org/og/journal.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Journal - Society of Professional Accountants",
      },
    ],
  },
};

export default function Journal() {
  return (
    <Container>
      <div className="max-w-7xl py-12 px-4 sm:px-6 lg:px-8 border-l border-r border-b mx-[12px]">
        {/* Breadcrumb */}
        <div data-aos="fade-up" className="text-[10px] md:text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span className="mx-2">|</span>
          <Link href="/members" className="hover:text-teal-600">For Members</Link>
          <span className="mx-2">|</span>
          <span className="text-gray-700">Journal</span>
        </div>

        {/* Section Label */}
        <p data-aos="fade-up" className="text-sm text-teal-600 font-medium uppercase mb-2 tracking-wider">
          Member Contributions · Research · Insight
        </p>

        {/* Title */}
        <div data-aos="fade-up" className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Journal of TPAS
          </h1>
          <p className="text-lg text-gray-700 ">
            Welcome to TPAS our official Journal — a curated platform for
            member-driven research, professional commentary, and thought
            leadership in the field of accounting and finance. Every article
            represents the voice, expertise, and insights of our esteemed
            members.
          </p>
        </div>

        {/* Journal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {journal.map((article) => (
            <div
              key={article.id}
              data-aos="fade-up"
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 flex flex-col h-full"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
              <div className="p-6 flex flex-col flex-1 justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  By {article.author} &middot; {new Date(article.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-600 mb-6">{article.description}</p>
                <Square_Button
                  href={article.link}
                  className="w-auto px-6 self-start"
                >
                  {article.buttonText}
                </Square_Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
