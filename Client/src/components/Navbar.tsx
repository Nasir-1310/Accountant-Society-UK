import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import SignIn from "./SignIn";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import HomePage from "./HomePage";
import FindAccountantNavbar from "./FindAccountantNavbar";

const Navbar = () => {
  return (
    <nav
      className="
        h-20 
        relative 
        bg-white 
       
      
        border-gray-200
        w-full
        sm:max-w-[425px] sm:mx-auto sm:px-8
        md:max-w-[768px] md:mx-auto md:px-10 
        lg:max-w-[1024px] lg:mx-auto lg:px-[20px]
        xl:max-w-[1440px] xl:mx-auto xl:px-[100px]
        2xl:max-w-[2560px] 2xl:mx-auto 2xl:px-[620px]
        z-50
      "
    >
      <div
        className="
          h-full
          text-black
          px-3 py-3
          mx-auto
          w-full
          max-w-full
        "
      >
        {/* Mobile and Tablet (lg and below) */}
        <div className="h-full flex items-center justify-between lg:hidden">
          <Menu />
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="Company Logo"
              height={50}
              width={114}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop (lg and above) */}
        <div className="hidden lg:flex items-center justify-between gap-4 xl:gap-8 h-full">
          {/* Left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo4.jpg"
                alt="Company Logo"
                height={80}
                width={190}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-2 lg:gap-4 xl:gap-10 flex-1 text-black">
            <HomePage />
            <AboutUs />
            <FindAccountantNavbar />
            <ContactUs />
            <SignIn />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;