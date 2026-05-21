"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
      setFormData({ first_name: "", middle_name: "", surname: "", phone: "", email: "" });
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setError("");
    setFormData({ first_name: "", middle_name: "", surname: "", phone: "", email: "" });
  };

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
              <div className="w-full lg:w-2/5 px-4 sm:px-6 py-5 sm:py-8 flex flex-col justify-center gap-3 relative order-2 lg:order-1"
                style={{ background: "linear-gradient(160deg, #1e3a6e 0%, #1a4fa8 50%, #1565c0 100%)" }}>

                {/* Event badge */}
                {/* <div className="flex items-center gap-2 w-fit bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span className="text-xs font-semibold text-emerald-300 tracking-widest uppercase">
                    British Bangladeshi
                  </span>
                </div> */}

                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight break-words hyphens-auto">
                  {slides[current].title}
                </h2>

                <p className="text-sm text-white/70 hidden md:block leading-relaxed line-clamp-3 lg:line-clamp-none">
                  {slides[current].description}
                </p>

                {/* Register button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-50"
                  style={{
                    background: "#ffffff",
                    color: "#0a3681",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
                  }}
                >
                  🎓 Register Now
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
              <div className="w-full lg:w-3/5 relative order-1 lg:order-2" style={{ aspectRatio: "8/3" }}>
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
                  <button onClick={handlePrev} className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition" aria-label="Previous">
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={handleNext} className="bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition" aria-label="Next">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative">

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition rounded-full hover:bg-gray-100 p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {submitted ? (
              /* ── Success ── */
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Thank you for registering for British Bangladeshi Accountants&apos; Day 2026.
                  A confirmation has been sent to{" "}
                  <strong className="text-gray-700">tpasbd@gmail.com</strong>.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 bg-green-600 text-white px-8 py-2.5 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <div className="mb-5">
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 tracking-wide">
                    BBAD 2026
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">
                    Register for Accountants&apos; Day 2026
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    British Bangladeshi Chartered Accountants
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* First + Middle */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Middle Name{" "}
                        <span className="text-gray-300 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        onChange={handleChange}
                        placeholder="Robert"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Surname */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Surname <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Ahmed"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Phone / Telephone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7XXX XXXXXX"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      <span>⚠️</span> {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(90deg, #15803d 0%, #16a34a 60%, #ca8a04 100%)",
                      boxShadow: "0 4px 14px rgba(21,128,61,0.3)",
                    }}
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "✉ Submit Registration"
                    )}
                  </button>

                  {/* <p className="text-center text-xs text-gray-400 pt-1">
                    Your information will be sent to tpasbd@gmail.com
                  </p> */}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;