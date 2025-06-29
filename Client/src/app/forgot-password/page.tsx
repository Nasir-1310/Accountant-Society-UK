import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import ForgotPasswordForm from "@/components/ForgotPassForm";

export const metadata: Metadata = {
  title: "Forgot Password | Society of Professional Accountants",
  description:
    "Recover your password securely by entering your registered email. A reset link will be sent to your inbox.",
};

export default function ForgotPasswordPage() {
  return (
    <Container>
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your email and we’ll send you a reset link.
          </p>
          <ForgotPasswordForm />
          <div className="text-center mt-4 text-sm">
            <Link href="/signin" className="text-green-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>
    </Container>
  );
}
