// src/app/find-an-accountants/page.tsx
import { Metadata } from "next";
import FindAccountantWrapper from "@/components/FindAccountantsWrapper";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Find an Accountant",
  description: "Find qualified professional accountants who are members of The Professional Accountants' Society.",
  alternates: { canonical: "/find-an-accountants" },
};

const FindPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="Directory"
        title="Find an Accountant"
        description="Search for qualified accountants by name, location or area of expertise."
        breadcrumbs={[{ label: "Find an Accountant" }]}
      />
      <div className="site-container py-12  sm:py-16">
        <FindAccountantWrapper />
      </div>
    </>
  );
};

export default FindPage;
