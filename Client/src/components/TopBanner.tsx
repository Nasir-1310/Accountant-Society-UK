import Link from "next/link";

const TopBanner = () => {
  const message = `Welcome to the Professional Accountants Society, the dedicated network for British
  Bangladeshi Chartered Accountants and finance professionals. We are committed to fostering
  connections, celebrating achievements, and building a platform where excellence thrives.`;

  return (
    <div
      className="
        w-full bg-blue-300 text-black
        overflow-hidden whitespace-nowrap
        py-2 text-sm sm:text-base font-medium
        sm:max-w-[425px] sm:mx-auto sm:px-8
        md:max-w-[768px] md:mx-auto md:px-10 
        lg:max-w-[1024px] lg:px-[20px]
        xl:max-w-[1440px]xl:mx-[100px]
        2xl:max-w-[2560px]2xl:mx-20
      "
    >
      <div className="inline-block  animate-marquee ">
        <span>{message}</span>
        <span className="ml-80">
          {message}{" "}
          <Link
            href="/contact"
            className="underline text-yellow-900 pointer-events-auto hover:text-yellow-500"
          >
            Not a member yet? Click here.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default TopBanner;
