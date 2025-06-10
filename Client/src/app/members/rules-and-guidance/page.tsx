import Container from "@/components/Container";
import Link from "next/link";

const AboutUsPage = () => {
  return (
    <Container>
      <div className="w-full flex justify-center mt-12 px-4">
        <div className="w-full flex flex-col lg:flex-row bg-white shadow-lg ">
          {/* Main Content Section - First on mobile/tablet */}
          <div className="w-full lg:w-3/4 order-1 lg:order-2 px-6 lg:px-10 py-8">
            {/* Breadcrumb */}
            <div data-aos="fade-up" className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
              <span className="mx-2">|</span>
              <Link href="/members" className="text-gray-700">Members</Link>
              <span className="mx-2">|</span>
              <span className="mx-2">Rules & Guidance</span>

            </div>

            {/* Page Title */}
            <div
              data-aos="fade-up"
              className="border-b  border-gray-400 pb-6 mb-8"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                Rules and guidance
              </h1>
               <h1 className="text-xl sm:text-3xl font-bold text-blue-900 mb-10 mt-8" id="purpose">
                1. Purpose 
              </h1>
              <p className="text-lg text-gray-600">
                These rules and guidance have been developed to ensure that all members of the Professional Accountants&apos; Society (TPAS) uphold the highest standards of professionalism, integrity, and collaboration. They apply to all TPAS events, platforms, and communications.
              </p>
            </div>

            {/* Content Sections */}
            <div data-aos="fade-up" className="space-y-8 mb-10 pb-10 border-b  border-gray-400">
              {/* Professional Conduct Section */}
              <section data-aos="fade-up" id="professional_conduction" className="border-b  border-gray-400 pb-6 mb-8 ">
                <h2 className="text-xl sm:text-3xl font-bold text-blue-900 mb-5 mt-8" >
                  2. Professional Conduct
                </h2>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">

                
                <h2 className=" text-[18px] text-center font-bold text-teal-700 mb-3 mt-2">
                  Uphold Integrity
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 Members must act honestly, ethically, and transparently, avoiding any conflict of interest or misleading conduct.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                  Maintain Confidentiality
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                All information shared within TPAS platforms must be treated as confidential unless explicit consent is given or disclosure is legally required.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                   Respect for Peers
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 All members must treat others with dignity, fairness, and respect. Discrimination, harassment, and bullying are strictly prohibited.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-2 mt-1">
                  Professional Behaviour
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 Members are expected to maintain professional decorum in all engagements, including events, forums, and digital platforms.
                </p>
                </div>
                
              </section>

              {/*. Practice Standards Section */}
              <section data-aos="fade-up" id="practice_standards" className="border-b  border-gray-400 pb-6 mb-8">
                
                <h2 className="text-xl sm:text-3xl font-bold text-blue-900 mb-5 mt-8">
                  3. Practice Standards
                </h2>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className=" text-[18px] text-center font-bold text-teal-700 mb-3 mt-2">
                  Promote Best Practices
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 Members should demonstrate commitment to excellence by adhering to recognised standards in accounting, auditing, taxation, and related disciplines.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                  Avoid Misrepresentation
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                False claims regarding qualifications, experience, or status are prohibited. Members must ensure their professional profiles remain accurate.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">

                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                   Commitment to CPD
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 Ongoing professional development is required. Members are expected to stay updated with current laws, standards, and industry changes.
                </p>
                </div>
              </section>

              {/* 4. Community Participation Section */}
             <section data-aos="fade-up" id="community_participation" className="border-b  border-gray-400 pb-6 mb-8">
                <h2 className="text-xl sm:text-3xl font-bold text-blue-900 mb-5 mt-8">
                 4. Community Participation
                </h2>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className=" text-[18px] text-center font-bold text-teal-700 mb-3 mt-2">
                  Constructive Engagement
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 All participation should be constructive, respectful, and aligned with TPAS values.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                  No Unauthorised Promotion
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                Members must not use TPAS platforms to promote services or products without prior approval.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                   Protection of TPAS Identity
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 Use of the TPAS name or logo requires written permission and must align with brand guidelines.
                </p>
                </div>
              </section>


              {/* What We Do Section */}
              <section data-aos="fade-up" id="reporting_misconduct" className="border-b  border-gray-400 pb-6 mb-8">
                <h2 className="text-xl sm:text-3xl font-bold text-blue-900 mb-5 mt-8">
                 5. Reporting Misconduct
                </h2>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className=" text-[18px] text-center font-bold text-teal-700 mb-3 mt-2">
                  Confidential Reporting
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                 Members are encouraged to report misconduct by contacting <span className="text-bold text-blue-900" >ethics@accountantssociety.org.</span> All reports are handled confidentially.
                </p>
                </div>
                <div className="border px-2 py-3 sm:px-4 sm:py-5 mb-4">
                <h2 className="text-[18px] text-center font-bold text-teal-700 mb-5 mt-2">
                 Disciplinary Action
                </h2>
                <p
                  data-aos="fade-up"
                  className="text-gray-700 leading-relaxed text-md"
                >
                Breaches of these rules may lead to warnings, suspension, or termination of membership following due process.
                </p>
                </div>
                
                
              </section>

              {/* Why We Exist Section */}
              <section data-aos="fade-up" id="member_agreement">
                <h2
                  data-aos="fade-up"
                  className="text-xl sm:text-3xl font-bold text-blue-900 mb-5 mt-8"
                >
                  
                 6. Member Agreement
                </h2>
                <p data-aos="fade-up" className="text-gray-700 leading-relaxed">
                 Participation in TPAS implies agreement to uphold these rules and contribute to a safe, respectful, and professional community for all.
                </p>
              </section>
            </div>

            {/* Cards Section - Responsive grid */}
            
          </div>

          {/* Sidebar Section - Second on mobile/tablet, first on desktop */}
          <div
            data-aos="fade-up"
            className="w-full lg:w-1/4 order-2 lg:order-1 bg-gradient-to-br from-gray-200 to-gray-100 border-t lg:border-t-0 lg:border-r border-gray-200"
          >
            <div className="px-6 py-8">
              {/* In this section - Mobile/Tablet */}
              <div className="lg:hidden mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  In this section
                </h3>
                <div className="grid grid-cols  gap-3 font-2">
                  {[
                    { label: "Purpose", href: "#purpose" },
                    { label: "Professional Conduction", href: "#professional_conduction" },
                    { label: "Practice Standards", href: "#practive_standards" },
                    { label: "Community Participation", href: "#community_participation" },
                    { label: "Reporting Misconduct", href: "#reporting_misconduct" },
                    { label: "Member Agreement", href: "#member_agreement" },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="block w-full">
                      <span className="w-full inline-block text-left border border-green-500 text-green-900 hover:text-white px-4 py-3 rounded-md bg-green-200 hover:bg-green-600 hover:border-green-600 transition-all duration-200 font-medium">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* In this section - Desktop */}
              <div data-aos="fade-up" className="hidden lg:block mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-3">
                  In this section
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Purpose", href: "#purpose" },
                    { label: "Professional Conduct", href: "#professional_conduction" },
                    { label: "Practice Standards", href: "#practice_standards" },
                    { label: "Community Participation", href: "#community_participation" },
                    { label: "Reporting Misconduct", href: "#reporting_misconduct" },
                    { label: "Member Agreement", href: "#member_agreement" },
                  ].map((item, index) => (
                    <a key={index} href={item.href} className="block w-full">
                      <button className="w-full text-left border border-green-500 text-green-900 hover:text-white px-4 py-3 rounded-md bg-green-200 hover:bg-green-600 hover:border-green-600 transition-all duration-200 font-medium">
                        {item.label}
                      </button>
                    </a>
                  ))}
                </div>
              </div>

              {/* Find Accountant */}
              {/* <div
                data-aos="fade-up"
                className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-md overflow-hidden"
              >
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
                      <option value="" disabled>
                        Choose area...
                      </option>
                      <option value="Personal Tax Return">
                        Bookkeeping & Accounts Preparatio
                      </option>
                      <option value="option 02">Corporation Tax Return</option>
                      <option value="option 02">Capital Gains Tax</option>
                      <option value="option 02">Inheritance Tax</option>
                      <option value="option 02">VAT & Indirect Taxes</option>
                      <option value="option 02">Self-Assessment</option>
                      <option value="option 02">Payroll Services</option>
                      <option value="option 02">
                        Business Start-up & Advisory
                      </option>
                      <option value="option 02">
                        HMRC Investigations & Disputes
                      </option>
                      <option value="option 02">R&D Tax Credits</option>
                      <option value="option 02">
                        Tax Planning & Consultancy
                      </option>
                      <option value="option 02">Trust & Estate Planning</option>
                      <option value="option 02">International Tax</option>
                      <option value="option 02">Transfer Pricing </option>
                    </select>

                    <button className="w-full px-4 py-3 border border-white text-white rounded-md hover:bg-white hover:text-teal-600 transition-all duration-200 font-semibold">
                      Search for an Accountant
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUsPage;
