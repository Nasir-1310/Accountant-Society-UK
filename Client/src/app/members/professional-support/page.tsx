// src/app/members/professional-support/page.tsx
import cpdCards from "@/app/data/cpdCards";
import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// SEO Metadata
export const metadata: Metadata = {
  title: "Professional Support |The Professional Accountants Society",
  description:
    "Discover tailored professional support for members of the Professional Accountants Society. Access mentoring, legal advice, career guidance, and more.",
  keywords: [
    "Professional Support",
    "Accountant Support",
    "Career Guidance",
    "Mentorship",
    "Legal Helpline",
    "Professional Accountants Society",
    "TPAS",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Professional Support | Professional Accountants Society",
    description:
      "Explore how TPAS supports members in their professional journey with mentoring, legal guidance, and career development.",
    url: "https://accountantssociety.org/members/professional-support",
    siteName: "Professional Accountants Society",
    images: [
      {
        url: "/accountant.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Support - Accountants",
      },
    ],
    type: "website",
  },
};

const Professional_Support = () => {
  return (
    <Container>
      <div className="w-full flex justify-center mt-12 px-4">
        <div className="w-full flex flex-col lg:flex-row bg-white shadow-lg overflow-hidden">
          {/* Main Content */}
          <main className="w-full lg:w-3/4 order-1 lg:order-2 px-6 lg:px-10 py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" data-aos="fade-up" className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600">Home</Link>
              <span className="mx-2">|</span>
              <Link href="/members" className="text-gray-700">For Members</Link>
              <span className="mx-2">|</span>
              <span className="text-gray-700">Professional Support</span>
            </nav>

            {/* Page Title */}
            <header data-aos="fade-up" className="border-b border-gray-200 pb-6 mb-8">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-2">
                Professional Support
              </h1>
            </header>

            {/* Services Section */}
            <section data-aos="fade-up" className="space-y-8 mb-10">
              <h2 className="text-xl lg:text-2xl text-teal-700 mb-4">
                TPAS provides tailored support to help members navigate their professional journeys. Our services include:
              </h2>
              <ul className="space-y-3 text-sm lg:text-lg text-gray-700 leading-relaxed list-disc list-inside">
                <li>Technical helpdesk for compliance, tax, and audit queries</li>
                <li>Mentoring programmes matching experienced professionals with early-career members</li>
                <li>Career development support including CV reviews, interview prep, and career coaching</li>
                <li>Legal and wellbeing helplines (confidential and free for members)</li>
              </ul>
              <p className="mt-5 text-gray-800">
                Members can access the support team through the member portal or by emailing
                <Link
                  href="mailto:support@pas.org.uk"
                  className="text-green-800 underline ml-1"
                >
                  support@pas.org.uk
                </Link>.
              </p>
            </section>

            {/* CPD Cards Section */}
            <section data-aos="fade-up" className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Explore More Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 gap-6 lg:gap-8">
                {cpdCards.map((card) => (
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
                      <h3 className="mb-4">
                        <Link
                          href={card.link}
                          className={`text-lg lg:text-xl font-semibold ${card.titleColor} hover:underline`}
                        >
                          {card.title}
                        </Link>
                      </h3>
                      <Link href={card.link}>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:text-white rounded-md hover:bg-teal-800 hover:border-teal-500 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                          {card.buttonText}
                        </button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside data-aos="fade-up" className="w-full lg:w-1/4 order-2 lg:order-1 bg-gradient-to-br from-gray-200 to-gray-100 border-t lg:border-t-0 lg:border-r border-gray-200">
            <div className="px-6 py-8 flex flex-col gap-6">
              {/* About Us */}
              <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: "400 / 250" }}>
                  <Image
                    src="/accountant.jpg"
                    alt="Professional Accountants Society team working together"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">About us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    The Professional Accountants Society is British Bangladeshi Chartered Accountants. We promote excellence among accountants through support and regulation of our members.
                  </p>
                  <Link href="/about-us">
                    <button className="inline-flex items-center text-teal-600 hover:text-white hover:bg-teal-600 font-semibold text-sm px-3 py-2 rounded-md border border-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </section>

              {/* Contact Us */}
              <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: "400 / 250" }}>
                  <Image
                    src="/contact-us.png"
                    alt="Contact Professional Accountants Society for support"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Contact us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Get in touch with our team for support, inquiries, or guidance on your professional development journey. We&apos;re here to help you succeed.
                  </p>
                  <Link href="/contact-us">
                    <button className=" inline-flex items-center text-teal-600 hover:text-white hover:bg-teal-600 font-semibold text-sm px-3 py-2 rounded-md border border-teal-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
};

export default Professional_Support;
