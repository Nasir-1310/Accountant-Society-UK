//src/app/signin/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import { Square_Button } from "@/components/Square_Button";

export const metadata: Metadata = {
  title: "Sign In | Accountants Society UK",
  description: "Choose your sign in option: Admin or Member. Access your Accountants Society UK dashboard securely.",
};

export default function SignInPage() {
  return (
    <Container>

    
    <section data-aos="fade-up" className="m-3 border-xl flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome to Accountants&apos; Society.
        </h1>
        <p className="text-gray-600 mb-8">
          Please select your sign in type below
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Admin Sign In */}
          <Square_Button>

          
          <Link
            href="/admin/login"
            className="group w-40 text-lg   flex items-center justify-center"
          >
            Admin Sign In
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          </Square_Button>

          {/* Member Sign In */}
          {/* <Link
            href="/member/signin"
            className="group w-60 rounded-2xl bg-gray-800 px-6 py-4 text-white text-lg font-semibold shadow-md transition-all hover:bg-gray-900 hover:shadow-lg flex items-center justify-center"
          >
            Member Sign In
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link> */}
        </div>
      </div>
    </section>
    </Container>
  );
}
