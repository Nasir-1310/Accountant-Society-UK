// app/find/page.tsx
import { Metadata } from "next";
import FindAccountantWrapper from "@/components/FindAccountantsWrapper";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Find an Accountant | Society of Professional Accountants",
  description: "Locate qualified professional accountants by name, postcode, or area of expertise.",
};

const FindPage=()=> {
  return (
    <Container>
    <div className="mx-3 px-5  border-l border-r border-gray-200 bg-white">
      <main data-aos="fade-up"   className="py-20 w-full max-w-full">
        <h1 className="text-xs sm:text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
          Home | Find an Accountant
        </h1>
        <FindAccountantWrapper />
      </main>
    </div>
    </Container>
    
  );
}
export default FindPage;
