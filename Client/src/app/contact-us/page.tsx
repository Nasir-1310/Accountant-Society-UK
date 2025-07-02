"use client"
import Container from "@/components/Container";
import { ChevronDown, Mail, MapPin, Pen, Phone, Trophy, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import collapsibleSections from "../data/faqsForContactUsPage";
import { Square_Button } from "@/components/Square_Button";


const ContactUsPage = () => {
 const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});


 const toggleSection = (sectionName: string) => {
  setExpandedSections(prev => ({
    ...prev,
    [sectionName]: !prev[sectionName]
  }));
};


const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { firstName, lastName, email, subject, message } = form;
    if (!firstName || !lastName || !email || !subject || !message) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setSuccess(true);
      setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
    <div className="w-full flex justify-center mt-12 px-4">
      <div className="w-full flex flex-col lg:flex-row bg-white shadow-lg  overflow-hidden">
        
        {/* Main Content Section - First on mobile/tablet */}
        <div  className="w-full lg:w-3/4 order-1 lg:order-2 px-6 lg:px-10 py-8">
          {/* Breadcrumb */}
          <div data-aos="fade-up" className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link> 
            <span className="mx-2">|</span> 
            <span className="text-gray-700">Contact us</span>
          </div>

          {/* Page Title */}
          <div data-aos="fade-up" className="border-b border-gray-200 pb-6 mb-8">
            <h1  className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-lg text-gray-600">Get in touch with The Professional Accountants Society</p>
          </div>

          {/* Main Contact Information */}
          <div className="space-y-8 mb-10">
            {/* General Contact Section */}
            <section>
              <h2  data-aos="fade-up" className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-2">
                <Phone className="text-teal-600 w-6 h-6" />
                General Contact Information
              </h2>
              <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div data-aos="fade-up" className="flex items-start gap-3">
                    <MapPin className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                       The Professional Accountants Society<br />
                        513 London Road,<br />
                        Cheam,
                        Sutton, SM3 8JR<br />
                      
                      </p>
                    </div>
                  </div>
                  
                  <div data-aos="fade-up" className="flex items-start gap-3">
                    <Phone className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-700">
                        <a href="tel:07988834395" className="text-black hover:text-teal-500 transition-colors">07988 834395</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div data-aos="fade-up" className="flex items-start gap-3">
                    <Mail className="text-teal-600 w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-700">
                        <a href="admin@accountantssociety.org" className=" text-black hover:text-teal-500 transition-colors">admin@accountantssociety.org</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form Section */}
            
    <section>
      <h2 data-aos="fade-up" className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-2">
        <Mail className="text-teal-600 w-6 h-6" /> Send us a Message
      </h2>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div data-aos="fade-up">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your first name"
              />
            </div>
            <div data-aos="fade-up">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div data-aos="fade-up">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email address"
            />
          </div>

          <div data-aos="fade-up">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">Select a subject</option>
              <option value="Membership Enquiry">Membership Enquiry</option>
              <option value="General Information">General Information</option>
              <option value="Events & Networking">Events & Networking</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div data-aos="fade-up">
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-vertical"
              placeholder="Enter your message here..."
            ></textarea>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Message sent successfully!</p>}

          <Square_Button data-aos="fade-up" type="button" onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </Square_Button>
        </div>
      </div>
    </section>
          </div>


           {/* Collapsible Sections */}
            <div data-aos="fade-up" className="space-y-3">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 mt-8">
            {/* Professional Development Card */}
            <div data-aos="fade-up" className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col">
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
            <div data-aos="fade-up"  className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col">
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
            <div data-aos="fade-up"  className="bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:col-span-2 xl:col-span-1">
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

        

            {/* In this section - Desktop */}
            <div data-aos="fade-up"  className="hidden lg:block mb-8 px-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-3">
                In this section
              </h3>
        
            </div>



          <div className="px-6 py-8">
            {/* Find Accountant */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600  rounded-lg shadow-md overflow-hidden mb-8">
              <div data-aos="fade-up"  className="p-4 lg:p-6">
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
            <div data-aos="fade-up"  className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative">
                <Image src="/accountant.jpg" alt="image" width={400} height={250}></Image>
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">About us</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  The Professional Accountants’ Society is a vibrant network of British Bangladeshi Chartered Accountants dedicated to collaboration, professional growth, and community impact. We aim to support members through shared knowledge, networking opportunities, and initiatives that inspire excellence in the accounting profession.
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

export default ContactUsPage;