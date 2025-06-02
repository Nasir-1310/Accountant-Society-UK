import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import SignIn from "./SignIn";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import HomePage from "./HomePage";
import FindAccountantNavbar from "./FindAccountantNavbar";
import Container from "./Container";

const Navbar = () => {
  return (
    <Container>
    
    <nav 
      className=" h-20 relative bg-white border-b border-l border-r border-gray-200 mx-3 px-5 py-3 z-50 ">
      <div
        className=" h-full text-black mx-auto w-full max-w-full"
      >
        {/* Mobile and Tablet (lg and below) */}
        <div className="h-full flex items-center justify-between xl:hidden">
          <Menu />
          <Link href="/">
            <Image
              src="/logo2.2.1.jpg"
              alt="Company Logo"
              height={50}
              width={114}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop (lg and above) */}
        <div className="hidden xl:block xl:flex items-center justify-between gap-4 xl:gap-8 h-full">
          {/* Left */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo2.2.1.jpg"
                alt="Company Logo"
                height={70}
                width={200}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-4 lg:gap-4 xl:gap-10 flex-1 text-black ">
            <HomePage />
            <AboutUs />
            <FindAccountantNavbar />
            <ContactUs />
            <SignIn />
          </div>
        </div>
      </div>
    </nav>
    </Container>
  );
};

export default Navbar;