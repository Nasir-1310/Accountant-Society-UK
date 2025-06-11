"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";

const members = [
  {
    id: 1,
    name: "Md Khasruzzaman Polash",
    designation: "IT Exprert",
    image: "/gallery_images/polash.jpg",
  },
  {
    id: 2,
    name: "Iftekhar Chowdhury Zakir",
    designation: "Financial Analyst",
    image: "/gallery_images/zakir.jpg",
  },
  {
    id: 3,
    name: "Mohammad Ali Rana",
    designation: "Senior Auditor",
    image: "/gallery_images/rana.jpg",
  },
  {
    id: 4,
    name: "Nasreen Akhter Rupa",
    designation: "Tax Consultant",
    image: "/gallery_images/rupa.jpg",
  },
   {
    id: 5,
    name: "Md. Imran Hossain FCA",
    designation: "Chartered Accountant",
    image: "/gallery_images/imran.jpg",
  },
   {
    id: 6,
    name: "Sarah Ahmed Juity",
    designation: "Financial Analyst",
    image: "/gallery_images/juity.jpg",
  },
];

export default function GalleryPage() {
  return (
    <Container>
      <div className="w-full flex justify-center mt-12 mx-3 px-4 border-l border-r border-b">
        <div className="w-full max-w-7xl flex flex-col">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span className="mx-2">|</span>
            <Link href="/news-and-events" className="hover:text-teal-600">News and Events</Link>
            <span className="mx-2">|</span>
            <span className="text-gray-700">Gallery</span>
          </nav>

          {/* Title */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gallery</h1>
            <p className="mt-2 text-gray-600">
              Moments from TPAS events and community engagements.
            </p>
          </header>

          {/* Gallery Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden border-l border-r border-b border-gray-300 group transition hover:shadow-xl"
              >
                {/* Maintain 3:4 aspect ratio */}
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.designation}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Note */}
          <div className="mt-10 text-sm text-gray-500 text-center">
            <p>
             
              <br />
              (Feature coming soon.)
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
