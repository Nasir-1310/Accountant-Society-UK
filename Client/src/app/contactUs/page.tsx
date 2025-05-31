"use client"
import Container from "@/components/Container";
import { ChevronDown, Clock, Mail, MapPin, Pen, Phone, Trophy, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ContactUs = () => {
 const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});


 const toggleSection = (sectionName: string) => {
  setExpandedSections(prev => ({
    ...prev,
    [sectionName]: !prev[sectionName]
  }));
};


  const collapsibleSections = [
    {
      title: "Membership enquires",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Member Registration team:</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-teal-600" />
                Email: <a href="mailto:admin@accountantssociety.org" className="text-teal-600 hover:underline">admin@accountantssociety.org</a>
              </p>
              <p className="text-gray-700">
               <a href="/membership-fees" className="text-teal-600 hover:underline">
                     Visit the &#39;Membership and fees&#39; pages
</a>

              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Professional Practice",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Professional Practice Support:</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-teal-600" />
                Phone: <a href="tel:07988 834395" className="text-teal-600 hover:underline">07988 834395</a>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-teal-600" />
                Email: <a href="mailto:practice@profaccountants.org.uk" className="text-teal-600 hover:underline">admin@accountantssociety.org</a>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Financial compliance",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Compliance Team:</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-teal-600" />
                Phone: <a href="tel:07988 834395" className="text-teal-600 hover:underline">07988 834395</a>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-teal-600" />
                Email: <a href="mailto:admin@accountantssociety.org" className="text-teal-600 hover:underline">mailto:admin@accountantssociety.org</a>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Education and careers",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Education Support Team:</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-teal-600" />
                Phone: <a href="tel:+441234567892" className="text-teal-600 hover:underline">+44 123 456 7892</a>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-teal-600" />
                Email: <a href="mailto:education@profaccountants.org.uk" className="text-teal-600 hover:underline">education@profaccountants.org.uk</a>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Research and policy",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Research Team:</h4>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-teal-600" />
                Phone: <a href="tel:+441234567893" className="text-teal-600 hover:underline">+44 123 456 7893</a>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-teal-600" />
                Email: <a href="mailto:research@profaccountants.org.uk" className="text-teal-600 hover:underline">research@profaccountants.org.uk</a>
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

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
            <span className="text-gray-700">Contact us</span>
          </div>

          {/* Page Title */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-lg text-gray-600">Get in touch with Professional Accountants Society</p>
          </div>

          {/* Main Contact Information */}
          <div className="space-y-8 mb-10">
            {/* General Contact Section */}
            <section>
              <h2 className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-2">
                <Phone className="text-teal-600 w-6 h-6" />
                General Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Professional Accountants Society<br />
                        123 Business District<br />
                        London, EC1A 1BB<br />
                        United Kingdom
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-700">
                        <a href="tel:+442071234567" className="hover:text-teal-600 transition-colors">+44 20 7123 4567</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-700">
                        <a href="mailto:info@profaccountants.org.uk" className="hover:text-teal-600 transition-colors">info@profaccountants.org.uk</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Office Hours</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            <section>
              <h2 className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-2">
                <Mail className="text-teal-600 w-6 h-6" />
                Send us a Message
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white">
                      <option value="">Select a subject</option>
                      <option value="membership">Membership Enquiry</option>
                      <option value="general">General Information</option>
                      <option value="events">Events & Networking</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical"
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="button"
                    className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                    onClick={() => alert('Message sent successfully!')}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </section>
          </div>


           {/* Collapsible Sections */}
            <div className="space-y-3">
              {collapsibleSections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 text-sm lg:text-base">{section.title}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        expandedSections[section.title] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedSections[section.title] && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="pt-3">
                        {section.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
        <div className="w-full lg:w-1/4 order-2 lg:order-1 pt-10 pl-1 bg-gradient-to-br from-gray-50 to-gray-100 border-t lg:border-t-0 lg:border-r border-gray-200">

        {/* In this section */}
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



          <div className="px-6 py-8">
            {/* Find Accountant */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-md overflow-hidden mb-8">
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

            {/* About Us Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative">
                <Image src="/accountant.jpg" alt="image" width={400} height={250}></Image>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">About us</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  The Professional Accountants Society is the professional body for British Bangladeshi Chartered Accountants. We promote excellence among accountants through support and regulation of our members.
                </p>
                <a href="/about" className="text-teal-600 hover:text-teal-700 font-semibold text-sm hover:underline transition-colors">
                  Read more
                </a>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default ContactUs;