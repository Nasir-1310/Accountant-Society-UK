import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Society of Professional Accountants",
  description: "Join the Society of Professional Accountants by registering with your email.",
};

export default function RegisterPage() {
  return (
    <Container>
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-green-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>
          <RegisterForm />
        </div>
      </main>
    </Container>
  );
}
