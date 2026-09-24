import type { Metadata } from "next";
import Slider from "@/components/Slider";

const registrationUrl = "https://accountantssociety.org/register/accountants-day-2026";

export const metadata: Metadata = {
  title: "Register for British Bangladeshi Accountants’ Day 2026",
  description: "Register for The British Bangladeshi Accountants’ Day on 26 September 2026.",
  alternates: { canonical: registrationUrl },
  openGraph: {
    title: "British Bangladeshi Accountants’ Day 2026 Registration",
    description: "Register for the event on 26 September 2026.",
    url: registrationUrl,
    type: "website",
  },
};

export default function AccountantsDayRegistrationPage() {
  return (
    <section aria-label="British Bangladeshi Accountants’ Day registration" className="bg-white py-6">
      <Slider initialRegistrationOpen autoOpenRegistration={false} />
    </section>
  );
}
