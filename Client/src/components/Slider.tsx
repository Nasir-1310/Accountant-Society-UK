"use client";
import { ChevronLeft, ChevronRight, X, User, Phone, Mail, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Container from "./Container";

interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  dotColor: string;
  order: number;
}

interface FormData {
  first_name: string;
  middle_name: string;
  surname: string;
  phone: string;
  email: string;
  company: string;
}

const Slider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    middle_name: "",
    surname: "",
    phone: "",
    email: "",
    company: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/sliders");
        if (response.ok) {
          const data = await response.json();
          setSlides(data);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const handlePrev = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const handleNext = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field: keyof FormData) => {
    if (!touched[field]) return "";
    if (field === "first_name" && !formData.first_name.trim()) return "First name is required";
    if (field === "surname" && !formData.surname.trim()) return "Surname is required";
    if (field === "phone" && !formData.phone.trim()) return "Phone number is required";
    if (field === "email") {
      if (!formData.email.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) return "Enter a valid email address";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Mark all mandatory fields as touched
    setTouched({ first_name: true, surname: true, phone: true, email: true });

    if (!formData.first_name.trim()) return setError("First name is required.");
    if (!formData.surname.trim()) return setError("Surname is required.");
    if (!formData.phone.trim()) return setError("Phone number is required.");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      return setError("A valid email is required.");

    setSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          first_name: formData.first_name,
          middle_name: formData.middle_name || "N/A",
          surname: formData.surname,
          phone: formData.phone,
          email: formData.email,
          company: formData.company || "N/A",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
      setFormData({ first_name: "", middle_name: "", surname: "", phone: "", email: "", company: "" });
      setTouched({});
    } catch {
      setError("Failed to send registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setError("");
    setTouched({});
    setFormData({ first_name: "", middle_name: "", surname: "", phone: "", email: "", company: "" });
  };

  // ── Loading ──
  if (loading) {
    return (
      <Container>
        <div className="bg-white w-full py-0">
          <div className="px-3 mx-auto w-full max-w-full">
            <div className="w-full flex flex-col-reverse lg:flex-row bg-white shadow-lg overflow-hidden relative min-h-[280px] sm:min-h-[320px] md:min-h-[350px]">
              <div className="w-full lg:w-2/5 px-6 py-6 flex bg-gray-200 flex-col justify-center animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="w-full lg:w-3/5 bg-gray-300 animate-pulse min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[350px]"></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // ── No slides ──
  if (slides.length === 0) {
    return (
      <Container>
        <div className="bg-white w-full py-0">
          <div className="px-3 mx-auto w-full max-w-full">
            <div className="w-full flex items-center justify-center bg-gray-100 shadow-lg min-h-[280px]">
              <p className="text-gray-500 text-lg">No slides available</p>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="bg-white w-full py-0">
          <div className="px-3 mx-auto w-full max-w-full">
            <div className="w-full group flex flex-col lg:flex-row shadow-lg overflow-hidden relative">

              {/* ── Left: Text Section ── */}
              <div
                className="w-full lg:w-2/5 px-4 sm:px-6 py-5 sm:py-8 flex flex-col justify-center gap-3 relative order-2 lg:order-1"
                style={{ background: "linear-gradient(160deg, #1e3a6e 0%, #1a4fa8 50%, #1565c0 100%)" }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight break-words hyphens-auto">
                  {slides[current].title}
                </h2>

                <p className="text-sm text-white/70 hidden md:block leading-relaxed line-clamp-3 lg:line-clamp-none">
                  {slides[current].description}
                </p>

                {/* Register button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: "#ffffff",
                    color: "#0a3681",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
                  }}
                >
                  Register Now
                  <span className="bg-blue-100 border border-blue-200 text-blue-700 text-[10px] px-2 py-0.5 rounded-full tracking-wide font-semibold">
                    FREE
                  </span>
                </button>

                {/* Prev arrow */}
                <button
                  onClick={handlePrev}
                  className="hidden xl:flex absolute top-1/2 -translate-y-1/2 left-2 bg-white/10 border border-white/20 text-white p-2 rounded-full hover:bg-white/25 transition opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              {/* ── Right: Image Section ── */}
              <div
                className="w-full lg:w-3/5 relative order-1 lg:order-2"
                style={{ aspectRatio: "8/3" }}
              >
                <Image
                  src={slides[current].image}
                  alt={`${slides[current].title} - Professional accountants slider`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                  style={{ objectPosition: "center center" }}
                />

                {/* Next arrow */}
                <button
                  onClick={handleNext}
                  className="hidden xl:flex absolute top-1/2 -translate-y-1/2 right-2 bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 right-3 flex gap-1.5 z-10">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrent(index)}
                      className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 hover:scale-110 ${current === index ? slide.dotColor : "bg-gray-300"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Mobile arrows */}
                <div className="flex xl:hidden absolute bottom-3 left-3 gap-2 z-10">
                  <button
                    onClick={handlePrev}
                    className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition"
                    aria-label="Next"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="absolute inset-0 bg-gray-200 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ── Registration Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm px-4 py-6"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">

            {/* Modal top banner with logo */}
            <div
              className="px-6 pt-6 pb-5 relative"
              style={{ background: "linear-gradient(135deg, #1e3a6e 0%, #1a4fa8 60%, #1565c0 100%)" }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition rounded-full hover:bg-white/10 p-1"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/logo/logo-mobile.svg"
                  alt="Logo"
                  width={120}
                  height={80}
                  className="object-contain"
                />
                {/* <div>
                  <p className="text-white font-bold text-sm leading-tight">
                    British Bangladeshi
                  </p>
                  <p className="text-blue-200 text-xs">
                    Chartered Accountants
                  </p>
                </div> */}
              </div>

              <h3 className="text-white font-bold text-base">
                Register for Accountants&apos; Day 2026
              </h3>
              <p className="text-blue-200 text-xs mt-0.5">
                26 September 2026 — Free Registration
              </p>
            </div>

            {submitted ? (
              /* ── Success ── */
              <div className="text-center py-8 px-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Thank you for registering. A confirmation has been sent to{" "}
                  <strong className="text-gray-700">tpasbd@gmail.com</strong>.
                  We look forward to seeing you on the day!
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 px-8 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:brightness-110"
                  style={{
                    background: "linear-gradient(90deg, #1e3a6e, #1a4fa8)",
                    boxShadow: "0 4px 14px rgba(26,79,168,0.3)",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <div className="px-6 py-5">
                {/* Required fields note */}
                <p className="text-xs text-gray-400 mb-4">
                  Fields marked with <span className="text-red-400 font-semibold">*</span> are mandatory
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">

                  {/* First + Middle name row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        <User size={11} className="inline mr-1 mb-0.5" />
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("first_name")}
                        placeholder="John"
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${getFieldError("first_name")
                          ? "border-red-300 focus:ring-red-300 bg-red-50"
                          : "border-gray-200 focus:ring-blue-400"
                          }`}
                      />
                      {getFieldError("first_name") && (
                        <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {getFieldError("first_name")}
                        </p>
                      )}
                    </div>

                    {/* Middle Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Middle Name{" "}
                        <span className="text-gray-300 font-normal text-[10px]">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        placeholder="Robert"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Surname */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      <User size={11} className="inline mr-1 mb-0.5" />
                      Surname <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      onBlur={() => handleBlur("surname")}
                      placeholder="Ahmed"
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${getFieldError("surname")
                        ? "border-red-300 focus:ring-red-300 bg-red-50"
                        : "border-gray-200 focus:ring-blue-400"
                        }`}
                    />
                    {getFieldError("surname") && (
                      <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {getFieldError("surname")}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      <Phone size={11} className="inline mr-1 mb-0.5" />
                      Phone / Telephone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+44 7XXX XXXXXX"
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${getFieldError("phone")
                        ? "border-red-300 focus:ring-red-300 bg-red-50"
                        : "border-gray-200 focus:ring-blue-400"
                        }`}
                    />
                    {getFieldError("phone") && (
                      <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {getFieldError("phone")}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      <Mail size={11} className="inline mr-1 mb-0.5" />
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="your@email.com"
                      className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${getFieldError("email")
                        ? "border-red-300 focus:ring-red-300 bg-red-50"
                        : "border-gray-200 focus:ring-blue-400"
                        }`}
                    />
                    {getFieldError("email") && (
                      <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {getFieldError("email")}
                      </p>
                    )}
                  </div>
                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1 mb-0.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                      Company / Organisation
                      <span className="text-gray-300 font-normal text-[10px] ml-1">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. ACCA, ICAEW, Self-employed"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                  </div>

                  {/* Global error */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <AlertCircle size={13} /> {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                    style={{
                      background: "linear-gradient(90deg, #1e3a6e 0%, #1a4fa8 60%, #1565c0 100%)",
                      boxShadow: "0 4px 14px rgba(26,79,168,0.35)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Registration →"
                    )}
                  </button>

                  <p className="text-center text-[11px] text-gray-400">
                    Your details will be sent to tpasbd@gmail.com
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;