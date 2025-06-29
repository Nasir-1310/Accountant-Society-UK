import Container from "./Container";
import { Square_Button } from "./Square_Button";

// components/Hero.tsx
export default function Hero() {
  return (
    <Container>
      <section
        className="relative h-[75vh]  md:h-[95vh]  mx-3 bg-black/60 bg-blend-overlay text-white flex items-center"
        style={{
          backgroundImage: "url('/hero_section_image/hero_image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-6 sm:px-10 z-10">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl relative inline-block uppercase tracking-wide text-red-500 font-semibold mb-6 after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:h-[2px] after:w-full after:bg-red-500 after:rounded-full">
            The Professional Accountants&apos; Society
          </p>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-5">
            Connecting Excellence of British Bangladeshi Chartered Accountants
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-200 mb-6 max-w-3xl">
            Empowering a community of finance professionals through networking,
            mentorship, and recognition.
          </p>

          <Square_Button href="/about-us" className="text-lg md:text-xl bg-red-900  ">
            Find More →
          </Square_Button>
        </div>

        {/* Optional: Overlay dark background for better readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-0" />
      </section>
    </Container>
  );
}
