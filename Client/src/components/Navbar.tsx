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
        shadow-lg
        border-b
        border-gray-200
        sm:max-w-[425px] sm:mx-8
        md:max-w-[768px] md:mx-10 
        lg:max-w-[1024px] lg:mx-20 lg:px-[20px]
        xl:max-w-[1440px] xl:mx-[100px] xl:px-[30px]
        2xl:max-w-[2560px] 2xl:mx-[620px] 2xl:px-[40px]
        z-50
      "
    >
      <div
        className="
          h-full
          px-3 py-3
          mx-auto
          w-full
          max-w-full
        "
      >
        {/* Mobile and Laptop (lg and below) */}
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

        {/* Extra Large Screens (lg and above) */}
        <div className="hidden lg:flex items-center justify-between gap-8 h-full">
          {/* Left */}
          <div className="w-1/3">
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
          <div className="w-2/3 flex items-center justify-between gap-1">
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
