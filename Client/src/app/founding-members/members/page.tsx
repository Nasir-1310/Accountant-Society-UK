import Image from "next/image";
import Container from "@/components/Container";
import { Metadata } from "next";
import FoundingMembers from "@/app/data/foundingMembers";
import Link from "next/link"; // ✅ Use next/link instead of lucide-react

export const metadata: Metadata = {
  title: "Founding Members | Society of Professional Accountants",
  description:
    "Meet the founding members of the Society of Professional Accountants. Learn about their experience, expertise, and dedication to ethical finance and leadership.",
  openGraph: {
    title: "Founding Members | Society of Professional Accountants",
    description:
      "Meet the founding members of the Society of Professional Accountants. Learn about their experience, expertise, and dedication to ethical finance and leadership.",
    type: "website",
    url: "https://yourdomain.com/founding-members",
    images: [
      {
        url: "https://yourdomain.com/og/founding-members.jpg",
        width: 1200,
        height: 630,
        alt: "Founding Members of the Society",
      },
    ],
  },
};

export default function FoundingMembersPage() {
  return (
    <Container>
      <div className="max-w-7xl  py-12 px-4 sm:px-6 lg:px-8 border-l border-r border-b mx-[12px] ">
        {/* Breadcrumb */}
        <div data-aos="fade-up" className=" text-[10px] md:text-sm text-gray-500 mb-6">
          <Link href="/" className=" hover:text-teal-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">|</span>
          <Link href="/members" className="hover:text-teal-600 transition-colors">
           Founding Members
          </Link>
          <span className="mx-2">|</span>
          <span className="text-gray-700"> Members</span>
        </div>

        {/* Page Title */}
        <h1 data-aos="fade-up" className="text-2xl md:text-4xl font-bold  text-gray-900 mb-12">
          Founding Members
        </h1>

        {/* Members Grid */}
        <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {FoundingMembers.map((member, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="text-center flex flex-col items-center"
            >
              <div className="w-32 h-32 relative mb-4">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-gray-300 object-cover bg-gray-100 shadow-sm"
                  priority
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
