import Container from "@/components/Container";
import { Pen, Users, Handshake, Trophy, Heart } from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <Container>

    
    <div className="w-full flex justify-center mt-12 px-4">
      <div className="w-full flex flex-col lg:flex-row bg-white shadow-lg  overflow-hidden">
        
        {/* Main Content Section - First on mobile/tablet */}
        <div className="w-full lg:w-3/4 order-1 lg:order-2 px-6 lg:px-10 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link> 
            <span className="mx-2">|</span> 
            <span className="text-gray-700">About us</span>
          </div>

          {/* Page Title */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">About Us</h1>
            <p className="text-lg text-gray-600">The Professional Accountants Society</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 mb-10">
            {/* Vision Section */}
            <section id="vision">
              <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Trophy className="text-teal-600 w-6 h-6" />
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To build a thriving, collaborative community that celebrates and connects the excellence of British Bangladeshi Chartered Accountants, empowering them to lead, inspire, and shape the future of the accounting profession.
              </p>
            </section>

            {/* Mission Section */}
            <section id="mission">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">Our Mission</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1 font-bold ">•</span>
                  To foster a strong network of British Bangladeshi Chartered Accountants in UK.
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1 font-bold">•</span>
                  To promote professional development, mentorship, and mutual support.
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1 font-bold">•</span>
                  To highlight the achievements and contributions of our members across the UK and beyond.
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1 font-bold">•</span>
                  To act as a bridge between generations of finance professionals, encouraging innovation, diversity, and integrity in accounting practices.
                </p>
              </div>
            </section>

            {/* Who We Are Section */}
            <section id="who-we-are">
              <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Users className="text-teal-600 w-6 h-6" />
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The <strong>Professional Accountants Society</strong> is a platform formed by and for British Bangladeshi Chartered Accountants and finance professionals. We are a collective of individuals who share a commitment to professional excellence, ethical leadership, and community upliftment. Our members come from a wide range of industries — public practice, corporate finance, public sector, academia, and entrepreneurship — united by a shared heritage and a passion for financial stewardship.
              </p>
            </section>

            {/* What We Do Section */}
            <section id="what-we-do">
              <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Handshake className="text-teal-600 w-6 h-6" />
                What We Do
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Networking & Collaboration</h3>
                  <p className="leading-relaxed">We organise professional meet-ups, seminars, and virtual forums to create opportunities for meaningful connections and collaborations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Mentorship & Guidance</h3>
                  <p className="leading-relaxed">Through structured mentorship programs, we support young professionals and students on their path to qualification and career success.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Recognition & Representation</h3>
                  <p className="leading-relaxed">We spotlight the success stories and impact of British Bangladeshi accountants to inspire the next generation and elevate our collective voice in the profession.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Community Engagement</h3>
                  <p className="leading-relaxed">We engage in social responsibility initiatives, encouraging our members to give back to the community and act as role models for others.</p>
                </div>
              </div>
            </section>

            {/* Why We Exist Section */}
            <section id="why-we-exist">
              <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                <Heart className="text-teal-600 w-6 h-6" />
                Why We Exist
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Despite growing numbers of British Bangladeshi professionals in the accounting field, there has long been a gap in representation, recognition, and structured support. This society aims to fill that gap — to connect, uplift, and showcase the immense talent within our community, and to ensure that our voices are heard at every level of the profession.
              </p>
            </section>
          </div>

          {/* Cards Section - Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Professional Development Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-teal-600 w-8 h-8" />
                <a href="/professional-development" className="hover:text-teal-600 transition-colors">
                  <h2 className="text-xl font-bold text-gray-800 hover:underline">Professional Development</h2>
                </a>
              </div>
              <p className="text-gray-600 leading-relaxed flex-1 mb-4">
                Access exclusive training programs, workshops, and certification courses designed to advance your career in accounting and finance.
              </p>
              <a href="/professional-development" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors">
                Read more →
              </a>
            </div>

            {/* Networking Events Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-teal-600 w-8 h-8" />
                <a href="/networking-events" className="hover:text-teal-600 transition-colors">
                  <h2 className="text-xl font-bold text-gray-800 hover:underline">Networking Events</h2>
                </a>
              </div>
              <p className="text-gray-600 leading-relaxed flex-1 mb-4">
                Join our regular meetups, conferences, and social gatherings to connect with like-minded professionals and expand your network.
              </p>
              <a href="/networking-events" className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors">
                Read more →
              </a>
            </div>

            {/* Membership Benefits Card */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Pen className="text-teal-600 w-8 h-8" />
                <a href="/membership" className="hover:text-teal-600 transition-colors">
                  <h2 className="text-xl font-bold text-gray-800 hover:underline">Join Our Community</h2>
                </a>
              </div>
              <p className="text-gray-600 leading-relaxed flex-1 mb-4">
                Become a member today and unlock exclusive benefits, resources, and opportunities to grow your professional network.
              </p>
              <a href="/membership" className="inline-block">
                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors font-semibold">
                  Join Now →
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Section - Second on mobile/tablet, first on desktop */}
        <div className="w-full lg:w-1/4 order-2 lg:order-1 bg-gradient-to-br from-gray-50 to-gray-100 border-t lg:border-t-0 lg:border-r border-gray-200">
          <div className="px-6 py-8">
            {/* In this section - Mobile/Tablet */}
            <div className="lg:hidden mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">In this section</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Our Vision", href: "#vision" },
                  { label: "Our Mission", href: "#mission" },
                  { label: "Who We Are", href: "#who-we-are" },
                  { label: "What We Do", href: "#what-we-do" }
                ].map((item, index) => (
                  <a key={index} href={item.href} className="block">
                    <button className="w-full text-center text-sm border border-green-500 text-green-600 px-3 py-2 rounded-md hover:bg-green-50 hover:border-green-600 transition-all duration-200 font-medium">
                      {item.label}
                    </button>
                  </a>
                ))}
              </div>
            </div>

            {/* In this section - Desktop */}
            <div className="hidden lg:block mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-3">
                In this section
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Our Vision", href: "#vision" },
                  { label: "Our Mission", href: "#mission" },
                  { label: "Who We Are", href: "#who-we-are" },
                  { label: "What We Do", href: "#what-we-do" }
                ].map((item, index) => (
                  <a key={index} href={item.href} className="block w-full">
                    <button className="w-full text-left border border-green-500 text-green-600 px-4 py-3 rounded-md hover:bg-green-50 hover:border-green-600 transition-all duration-200 font-medium">
                      {item.label}
                    </button>
                  </a>
                ))}
              </div>
            </div>

            {/* Find Accountant */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 lg:p-6">
                <div className="flex items-center gap-2 text-white text-lg font-semibold mb-4">
                  <Pen className="text-white w-5 h-5" />
                  <span>Find an Accountant</span>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Postcode"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300 text-gray-800"
                  />
                  
                  <select 
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 text-gray-800"
                    defaultValue=""
                  >
                    <option value="" disabled>Choose area...</option>
                    <option value="audit">Audit & Assurance</option>
                    <option value="tax">Tax Advisory</option>
                    <option value="corporate">Corporate Finance</option>
                    <option value="forensic">Forensic Accounting</option>
                    <option value="management">Management Accounting</option>
                  </select>
                  
                  <button className="w-full px-4 py-3 border border-white text-white rounded-md hover:bg-white hover:text-teal-600 transition-all duration-200 font-semibold">
                    Search for an Accountant
                  </button>
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

export default AboutUs;