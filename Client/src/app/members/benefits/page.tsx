// src/app/members/benefits/page.tsx
import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member Benefits | Society of Professional Accountants",
  description:
    "Explore the exclusive member benefits of the Society of Professional Accountants including webinars, tax resources, networking, and expert advice.",
};

const benefits = [
  {
    icon: "/icons/world.gif",
    title: "The latest industry developments",
    description:
      "Stay updated on industry trends and how to adopt them effectively.",
  },
  {
    icon: "/icons/computer.gif",
    title: "CPD and Training",
    description: "Access to relevant CPD programs and Training sessions.",
  },
  {
    icon: "/icons/writing_book.gif",
    title: "Platform to share your achievements and inspire others",
    description:
      "Allows members to showcase their success, motivate peers, and encourage positive action within the community.",
  },
  {
    icon: "/icons/support.gif",
    title: "Expert Advice",
    description:
      "Benefit from experienced professionals' support and knowledge.",
  },
  {
    icon: "/icons/virtual_meeting.gif",
    title: "Networking Opportunities",
    description:
      "Meet peers at live and virtual events to share experiences and knowledge.",
  },
  {
    icon: "/icons/voice.gif",
    title: "Community impact and volunteering projects",
    description:
      "To improve communities through activities like supporting education and awareness campaigns.",
  },
];

export default function MemberBenefitsPage() {
  return (
    <Container>
      <div className="mx-3 px-5 border-l border-r border-gray-200 bg-white">
        <main className="w-full py-12 max-w-full">
          <div className="mb-10">
            <h1 className="text-xs sm:text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
              Home | Member Benefits
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Join the TPAS
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Membership with the Professional Accountants’ Society gives you
              access to a growing network of British Bangladeshi finance
              professionals across the UK. Whether you&apos;re newly qualified,
              mid-career, or an industry expert, you&apos;ll find value in
              joining our community.
            </p>
            <p className="text-base sm:text-lg text-gray-700">
              Membership will give you access to:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center px-4">
                <Image
                  src={benefit.icon}
                  alt={benefit.title}
                  width={96}
                  height={96}
                  className="mx-auto mb-4"
                  priority
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact-us">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold uppercase px-6 py-3 rounded-md transition duration-200">
                Register
              </button>
            </Link>
          </div>
        </main>
      </div>
    </Container>
  );
}
