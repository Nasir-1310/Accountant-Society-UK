import Container from "@/components/Container";
import { Rounded_Button } from "@/components/Rounded_Button";
import { Handshake, IdCard } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Square_Button } from "@/components/Square_Button";

export const metadata: Metadata = {
  title: "Strategic Partners | Society of Professional Accountants",
  description:
    "Discover our trusted strategic partners who empower TPAS members with exclusive services and benefits, including insurance, tax support, and professional tools.",
  openGraph: {
    title: "Strategic Partners | Society of Professional Accountants",
    description:
      "Explore TPAS's strategic partnerships that bring added value to our community of professionals.",
    type: "website",
    url: "https://yourdomain.com/strategic-partners",
    images: [
      {
        url: "https://yourdomain.com/og/strategic-partners.jpg",
        width: 1200,
        height: 630,
        alt: "TPAS Strategic Partners",
      },
    ],
  },
};

const partners = [
  {
    id: 1,
    image: "/partners/tide_bank.jpg",
    title: "TIDE PARTNER PROGRAMME: Boost your earnings by partnering with Tide",
    description:
      "Join the Tide referral partner programme and earn top commission. Drive customer acquisition and grow retention with partner perks. We’ll help your clients spend less time on finance admin and more time running their business.",
    link: "https://www.tide.co/partners",
    buttonText: "Explore More",
  },
  {
    id: 2,
    image: "/partners/cornor_i.jpg",
    title: "In partnership with ACCOUNTANTS MILLIONAIRES club, Croder-i Lite. Register for your login details to Croner-i Lite",
    description: "Croner-i are the experts in providing accountants with the most current guidance, tools, mind-maps and model documents on Tax, Accounting, Auditing, HR, and Health & Safety. As an AMC member, you can claim your login details, plus, you get an onboarding call from Croner-i to access a great starting point on market-leading advice regarding tax, accounting news and earning CPD points!",
    link: "/signin",
    buttonText: "Find More Information",
  },
];

export default function StrategicPartnersPage() {
  return (
    <Container>
      <div className="max-w-7xl  py-12 px-4 sm:px-6 lg:px-8 border-l border-r border-b mx-[12px]">
        {/* Breadcrumb */}
        <div
          data-aos="fade-up"
          className=" text-[10px] md:text-sm text-gray-500 mb-6"
        >
          <Link href="/" className="hover:text-teal-600">
            Home
          </Link>
          <span className="mx-2">|</span>
          <Link href="/members" className="hover:text-teal-600">
            For Members
          </Link>
          <span className="mx-2">|</span>
          <span className="text-gray-700">Strategic Partners</span>
        </div>

        {/* Title */}
        <div data-aos="fade-up" className="mb-10 ">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See Who We Work With
          </h1>
          <p className="text-lg text-gray-700 w-auto ">
            Exclusive collaborations that empower our members to thrive.
          </p>
        </div>

        {/* Description */}
        <div
          data-aos="fade-up"
          className="mb-10 text-gray-600 w-auto space-y-5 text-[16px] leading-7"
        >
          <p>
            At TPAS, we believe in the power of meaningful partnerships. That’s
            why we’ve built a network of trusted organisations and service
            providers who offer exclusive value to our members.
          </p>
          <ul className="list-disc pl-5 space-y-1 pl-10 ">
            <li>
              Provide professional services and practical benefits to our
              members, such as good value health insurance, professional
              indemnity insurance (PII), and tax support.
            </li>
            <li>
              Offer services that complement and broaden the scope of what our
              members can offer their clients.
            </li>
          
          <li>
             These collaborations are carefully selected to support the
            professional and personal success of our members.
          </li>
           
          </ul>
        </div>

        <div className="mt-12 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto place-items-center">
          {/* Card 1 - Accessing Partner Benefits */}
          <div
            data-aos="fade-up"
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center">
              <IdCard size={64} className="text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Accessing Partner Benefits
              </h3>
              <p className="text-gray-600 mb-4">
               To take advantage of any partnership benefits, please provide your TPAS membership ID number when contacting our partners.<br></br>Forgot your membership ID?    
              </p>
            </div>
            <div className="flex justify-center mt-auto">
              <Rounded_Button href="/signin"> Find Membership ID</Rounded_Button>
            </div>
          </div>

          {/* Card 2 - Suggest a Partner */}
          <div
            data-aos="fade-up"
            className="bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center">
              <Handshake size={64} className="text-blue-800 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Suggest a Partner
              </h3>
              <p className="text-gray-600 mb-4">
                Help us expand our network. Suggest new partnerships that
                benefit TPAS members. <br></br>Want to share Ideas?
              </p>
            </div>
            <div className="flex justify-center mt-auto">
              <Rounded_Button href="/contact-us">
                        Contact us
              </Rounded_Button>
               
            
            </div>
          </div>
        </div>

        {/* Main  Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              data-aos="fade-up"
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 flex flex-col h-full"
            >
              <Image
                src={partner.image}
                alt={partner.title}
                width={800}
                height={500}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col flex-1 justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {partner.title}
                </h3>
                <p className="text-gray-600 pb-10">{partner.description}</p>
                <Square_Button href={partner.link} className="w-auto px-6 self-start">
                  {partner.buttonText}
                </Square_Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
