import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHub from "@/components/SectionHub";

export const metadata: Metadata = {
  title: "For Members",
  description:
    "Membership, benefits, CPD and training, guidance and support for members of The Professional Accountants' Society.",
  alternates: { canonical: "/members" },
};

const links = [
  { label: "Member benefits", href: "/members/benefits", summary: "What membership of TPAS includes." },
  { label: "Membership & fees", href: "/members/membership-and-fees", summary: "Membership types and how to join." },
  { label: "CPD & training", href: "/members/cpd-training", summary: "Courses, webinars and CPD resources." },
  { label: "Rules & guidance", href: "/members/rules-and-guidance", summary: "Standards and guidance for members." },
  { label: "Journal", href: "/members/journal", summary: "Articles and insight from the profession." },
  { label: "Professional support", href: "/members/professional-support", summary: "Help and advice for members." },
  { label: "TPAS Wellbeing", href: "/members/wellbeing", summary: "Wellbeing resources and support." },
  { label: "Strategic partners", href: "/members/strategic-partners", summary: "Offers and programmes from our partners." },
  { label: "Member sign in", href: "/signin", summary: "Access your member account." },
];

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For members"
        title="Membership & member services"
        description="Everything TPAS offers its members, from benefits and CPD to guidance, support and wellbeing."
        breadcrumbs={[{ label: "For Members" }]}
      />
      <SectionHub links={links} />
    </>
  );
}
