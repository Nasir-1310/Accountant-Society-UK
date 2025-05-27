import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import HomePage from "./HomePage";
import FindAccountantNavbar from "./FindAccountantNavbar";

const Navbar=()=>{
    return(
        <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 relative bg-white shadow-lg border-b border-gray-200 z-50">


            {/* Mobile */}
            <div className=" h-full flex items-center justify-between md:hidden">

                 <Menu></Menu>
                 <Link href="/">
                    <Image src="/logo2.jpg" alt="Logo" height={70} width={100} className="cursor-pointer"/>
                  </Link>
        
            </div>
             {/* Bigger Screen */}
            <div className="hidden md:flex items-center justify-between gap-8 h-full">

             {/* Left */}
             <div className="w-1/3 ">
                  <Link href="/" className="flex items-center gap-3">
                         <Image src="/logo1.jpg" alt="Logo" height={100} width={150} className="cursor-pointer"/>
                 </Link>
             </div>
             {/* Right */}
             <div className="w-2/3 flex items-center justify-between gap-1">
                <HomePage></HomePage>
                <SearchBar></SearchBar>
                <FindAccountantNavbar></FindAccountantNavbar>
                <ContactUs></ContactUs>
                <AboutUs></AboutUs>
                <SignIn></SignIn>
              </div>
            </div>

            
    </div>

        
    )
}
export default Navbar;