import { Metadata } from "next";
import Container from "@/components/Container";
import Link from "next/link";
import SigninForm from "@/components/SigninForm";

export const metadata: Metadata = {
  title: "Sign In | Society of Professional Accountants",
  description: "Sign in securely with your email to access exclusive member benefits.",
};

export default function SignInPage() {
  return (
    <Container>
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900">Sign In</h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link href="/register" className="text-green-600 font-medium hover:underline">
              Register
            </Link>
          </p>
          <SigninForm />
          <div className="text-center mt-4 text-sm">
            <Link href="/forgot-password" className="text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>
    </Container>
  );
}
