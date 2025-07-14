import Container from "@/components/Container";
import Link from "next/link";
import { Metadata } from "next";
import { Square_Button } from "@/components/Square_Button";

export const metadata: Metadata = {
  title: "Constitution | The Professional Accountants' Society (TPAS)",
  description:
    "Review the official constitution of TPAS outlining its definitions, structure, and guiding principles.",
  keywords: [
    "TPAS Constitution",
    "Articles of Association",
    "Memorandum of Understanding",
    "Professional Accountants Society",
    "Chartered Accountants UK",
    "Society Rules",
    "Accounting Network Governance",
  ],
  openGraph: {
    title: "Constitution | The Professional Accountants' Society",
    description:
      "Explore the official constitution of TPAS defining its mission, structure, and operational principles.",
    url: "https://professionalssocitey.org/members/constitution",
    siteName: "The Professional Accountants' Society",
    images: [
      {
        url: "https://professionalssocitey.org/images/tpas-cover.png",
        width: 1200,
        height: 630,
        alt: "TPAS Constitution Cover Image",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Constitution | TPAS",
    description:
      "Discover TPAS's constitutional principles governing its membership and activities.",
    images: ["https://professionalssocitey.org/images/tpas-cover.png"],
  },
  alternates: {
    canonical: "https://professionalssocitey.org/members/constitution",
  },
};

const ConstitutionPage = () => {
  return (
    <Container>
      <div className=" flex flex-col lg:flex-row mt-12 px-4 bg-white shadow-lg mx-3">
        {/* Sidebar Menu on Left for Large Screens */}
        <div className="hidden lg:block lg:w-1/4 bg-gradient-to-br from-gray-200 to-gray-100 border-r border-gray-200 px-6 py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-3">
            Constitution Menu
          </h3>
          <div className="space-y-3">
            <a href="#definitions" className=" block mb-2">
              <Square_Button className="w-full">1) Definitions</Square_Button>
            </a>
            <a href="#Name_and_Official_Registration" className="block mb-2">
              <Square_Button className="w-full  ">
                2) Name and Official Registration
              </Square_Button>
            </a>
            <a href="#Aims" className="block mb-2">
              <Square_Button className="w-full  ">3) Aims</Square_Button>
            </a>
            <a href="#Objectives" className="block mb-2">
              <Square_Button className="w-full  ">4) Objectives</Square_Button>
            </a>
            <a href="#Powers" className="block mb-2">
              <Square_Button className="w-full  ">5) Powers</Square_Button>
            </a>
            <a
              href="#Application_of_Income_and_Property"
              className="block mb-2"
            >
              <Square_Button className="w-full  ">
                6) Application of Income and Property
              </Square_Button>
            </a>
            <a href="#Benefits_and_payments" className="block mb-2">
              <Square_Button className="w-full  ">
                7) Benefits and payments
              </Square_Button>
            </a>
            <a href="#Conflicts_of_interest" className="block mb-2">
              <Square_Button className="w-full  ">
                8) Conflicts of interest and conflicts of loyalty
              </Square_Button>
            </a>
            <a href="#Executive_Committee" className="block mb-2">
              <Square_Button className="w-full  ">
                9) Executive Committee
              </Square_Button>
            </a>
            <a href="#Founding_Members" className="block mb-2">
              <Square_Button className="w-full  ">
                10) Founding Members
              </Square_Button>
            </a>
            <a href="#Office_Bearers" className="block mb-2">
              <Square_Button className="w-full  ">
                11) Office Bearers
              </Square_Button>
            </a>
            <a href="#Membership" className="block mb-2">
              <Square_Button className="w-full  ">12) Membership</Square_Button>
            </a>
            <a href="#Modus_Operandi" className="block mb-2">
              <Square_Button className="w-full  ">
                13) Modus Operandi
              </Square_Button>
            </a>
            <a href="#Year_End_Accounts" className="block mb-2">
              <Square_Button className="w-full  ">
                14) Year End Accounts
              </Square_Button>
            </a>
            <a href="#Annual_General_Meeting_(AGM)" className="block mb-2">
              <Square_Button className="w-full  ">
                15) Annual General Meeting (AGM)
              </Square_Button>
            </a>

            <a href="#Executive_Committee_Meeting" className="block mb-2">
              <Square_Button className="w-full  ">
                15) Executive Committee Meeting
              </Square_Button>
            </a>
            <a href="#Quorum" className="block mb-2">
              <Square_Button className="w-full  ">17) Quorum</Square_Button>
            </a>
            <a href="#Extraordinary_General_Meeting" className="block mb-2">
              <Square_Button className="w-full  ">
                18) Extraordinary General Meeting (EGM)
              </Square_Button>
            </a>
            <a href="#Votes_at_the_Meeting" className="block mb-2">
              <Square_Button className="w-full  ">
                19) Votes at the Meeting
              </Square_Button>
            </a>
            <a href="#Amendments_to_the_Constitution" className="block mb-2">
              <Square_Button className="w-full  ">
                20) Amendments to the Constitution
              </Square_Button>
            </a>
            <a href="#Interpretation_of_Rules" className="block mb-2">
              <Square_Button className="w-full  ">
                21) Interpretation of Rules
              </Square_Button>
            </a>
            <a href="#discussion" className="block mb-2">
              <Square_Button className="w-full  ">
                22) Dissolutions & winding up
              </Square_Button>
            </a>
            <a href="#Internal_Procedures" className="block mb-2">
              <Square_Button className="w-full  ">
                23) Internal Procedures
              </Square_Button>
            </a>
            <a href="#Bank" className="block mb-2">
              <Square_Button className="w-full  ">24) Bank</Square_Button>
            </a>
            <a href="#Disclaimer" className="block mb-2">
              <Square_Button className="w-full  ">25) Disclaimer</Square_Button>
            </a>

            {/* Add more buttons here */}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 px-6 lg:px-10 py-8">
          {/* Breadcrumb */}
          <div className=" text-[10px] sm:text-sm text-gray-500 mb-6 ">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <span className="mx-2">|</span>
            <Link href="/members" className="text-gray-700">
              For Members
            </Link>
            <span className="mx-2">|</span>
            <span>Constitution</span>
          </div>

          {/* Page Title */}
          <div className="border-b border-gray-400 pb-6 mb-8">
            <h1 className=" text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Constitution
            </h1>
          </div>
          <div className="border-b border-gray-400 pb-6 mb-8 flex flex-col items-center text-center">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                THE PROFESSIONAL ACCOUNTANTS’ SOCIETY(TPAS)
            </h1>
            <p><strong className="text-[14px] sm:text-base">Articles of association and memorandum</strong> </p>
            
          </div>

          {/* Mobile Menu (Above Definition Section) */}
          <div className="block lg:hidden mb-8">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Constitution Menu
            </h3>
            <div className="space-y-3">
              <a href="#definitions" className=" block mb-2">
                <Square_Button className="w-full">1) Definitions</Square_Button>
              </a>
              <a href="#Name_and_Official_Registration" className="block mb-2">
                <Square_Button className="w-full  ">
                  2) Name and Official Registration
                </Square_Button>
              </a>
              <a href="#Aims" className="block mb-2">
                <Square_Button className="w-full  ">3) Aims</Square_Button>
              </a>
              <a href="#Objectives" className="block mb-2">
                <Square_Button className="w-full  ">
                  4) Objectives
                </Square_Button>
              </a>
              <a href="#Powers" className="block mb-2">
                <Square_Button className="w-full  ">5) Powers</Square_Button>
              </a>
              <a
                href="#Application_of_Income_and_Property"
                className="block mb-2"
              >
                <Square_Button className="w-full  ">
                  6) Application of Income and Property
                </Square_Button>
              </a>
              <a href="#Benefits_and_payments" className="block mb-2">
                <Square_Button className="w-full  ">
                  7) Benefits and payments
                </Square_Button>
              </a>
              <a href="#Conflicts_of_interest" className="block mb-2">
                <Square_Button className="w-full  ">
                  8) Conflicts of interest and conflicts of loyalty
                </Square_Button>
              </a>
              <a href="#Executive_Committee" className="block mb-2">
                <Square_Button className="w-full  ">
                  9) Executive Committee
                </Square_Button>
              </a>
              <a href="#Founding_Members" className="block mb-2">
                <Square_Button className="w-full  ">
                  10) Founding Members
                </Square_Button>
              </a>
              <a href="#Office_Bearers" className="block mb-2">
                <Square_Button className="w-full  ">
                  11) Office Bearers
                </Square_Button>
              </a>
              <a href="#Membership" className="block mb-2">
                <Square_Button className="w-full  ">
                  12) Membership
                </Square_Button>
              </a>
              <a href="#Modus_Operandi" className="block mb-2">
                <Square_Button className="w-full  ">
                  13) Modus Operandi
                </Square_Button>
              </a>
              <a href="#Year_End_Accounts" className="block mb-2">
                <Square_Button className="w-full  ">
                  14) Year End Accounts
                </Square_Button>
              </a>
              <a href="#Annual_General_Meeting_(AGM)" className="block mb-2">
                <Square_Button className="w-full  ">
                  15) Annual General Meeting (AGM)
                </Square_Button>
              </a>

              <a href="#Executive_Committee_Meeting" className="block mb-2">
                <Square_Button className="w-full  ">
                  15) Executive Committee Meeting
                </Square_Button>
              </a>
              <a href="#Quorum" className="block mb-2">
                <Square_Button className="w-full  ">17) Quorum</Square_Button>
              </a>
              <a href="#Extraordinary_General_Meeting" className="block mb-2">
                <Square_Button className="w-full  ">
                  18) Extraordinary General Meeting (EGM)
                </Square_Button>
              </a>
              <a href="#Votes_at_the_Meeting" className="block mb-2">
                <Square_Button className="w-full  ">
                  19) Votes at the Meeting
                </Square_Button>
              </a>
              <a href="#Amendments_to_the_Constitution" className="block mb-2">
                <Square_Button className="w-full  ">
                  20) Amendments to the Constitution
                </Square_Button>
              </a>
              <a href="#Interpretation_of_Rules" className="block mb-2">
                <Square_Button className="w-full  ">
                  21) Interpretation of Rules
                </Square_Button>
              </a>
              <a href="#discussion" className="block mb-2">
                <Square_Button className="w-full  ">
                  22) Dissolutions & winding up
                </Square_Button>
              </a>
              <a href="#Internal_Procedures" className="block mb-2">
                <Square_Button className="w-full  ">
                  23) Internal Procedures
                </Square_Button>
              </a>
              <a href="#Bank" className="block mb-2">
                <Square_Button className="w-full  ">24) Bank</Square_Button>
              </a>
              <a href="#Disclaimer" className="block mb-2">
                <Square_Button className="w-full  ">
                  25) Disclaimer
                </Square_Button>
              </a>
              {/* Add more mobile buttons if needed */}
            </div>
          </div>

          {/* Definitions Section */}
          <section
            id="definitions"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              1) Definitions
            </h2>
            <p className="text-md text-gray-700 leading-relaxed mb-4">
              In this constitution, the following terms and phrases shall have
              the following meaning unless the context otherwise requires:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>“Chartered”:</strong> Refers to all supervisory bodies
                that constitute The Consultative Committee of Accountancy Bodies
                (CCAB) and the Chartered Institute of Management Accountants
                (CIMA).
              </li>
              <li>
                <strong>“The Society”:</strong> Refers to “The Society of
                British Bangladeshi Accountants”.
              </li>
              <li>
                <strong>“British Bangladeshi”:</strong> A Bangladeshi citizen or
                their children who are living permanently in the UK.
              </li>
              <li>
                <strong>“Supervisory Bodies”:</strong> Includes:
                <ul className="list-decimal pl-6 mt-2 space-y-1">
                  <li>
                    The Institute of Chartered Accountants in England and Wales
                    (ICAEW)
                  </li>
                  <li>
                    The Association of Chartered Certified Accountants (ACCA)
                  </li>
                  <li>
                    The Institute of Chartered Accountants of Scotland (ICAS)
                  </li>
                  <li>
                    The Chartered Institute of Management Accountants (CIMA)
                  </li>
                  <li>
                    The Chartered Institute of Public Finance and Accountancy
                    (CIPFA)
                  </li>
                  <li>The Chartered Accountants of Ireland (CAI)</li>
                  <li>
                    The Institute of Chartered Accountants of Bangladesh (ICAB)
                    –members/affiliates residing in the UK only
                  </li>
                </ul>
                <p className="mt-2">
                  This includes any other UK accountancy body that gains
                  chartered status.
                </p>
              </li>
              <li>
                <strong>“Membership”:</strong> Refers to membership in the
                Society.
              </li>
              <li>
                <strong>“Executive Committee”:</strong> The individuals who
                operate the Society.
              </li>
              <li>
                <strong>“Founding Members”:</strong> The original individuals
                who established or initiated the formation of the Society.
              </li>
              <li>
                <strong>“Membership fee”:</strong> A non-refundable joining fee
                set by the trustees for each member to pay upon joining.
              </li>
              <li>
                <strong>“Annual subscription”:</strong> The annual fee set by
                the trustees for each member to pay yearly.
              </li>
              <li>
                <strong>“AGM”:</strong> Annual General Meeting.
              </li>
              <li>
                <strong>“Registered Member”:</strong> A member who has paid a
                one-off joining fee and the annual subscription fee.
              </li>
            </ul>
          </section>

          {/*Name and Official Registration Section */}
          <section
            id="Name_and_Official_Registration"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              2) Name and Official Registration
            </h2>

            <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
              <li>
                The name of the Society shall be “The Professional Accountants
                Society” (hereinafter called “the Society”).
              </li>
              <li>
                The principal office address: 513 London Road, Cheam, Surrey,
                SM3 8JR
              </li>
            </ul>
          </section>

          {/*3) Aims Section */}
          <section
            id="Aims"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">3) Aims</h2>

            <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
              <li>
                The Professional Accountants Society aspires to unite British
                Bangladeshi Chartered Accountants into one cohesive professional
                network. The Society aims to foster an environment that enhances
                the sharing of technical knowledge, skills, and experiences
                among its members. By facilitating professional collaboration
                and mutual support, the Society seeks to create value for its
                members and extend this positive impact beyond the community
              </li>
            </ul>
          </section>

          {/*Objectives Section */}
          <section
            id="Objectives" className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              4) Objectives:
            </h2>

            <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
              <li>
                To provide a professional and social platform for the meeting
                and socialising of all members.
              </li>
              <li>
                To foster and uphold professionalism, mutual respect, and
                cooperation among members.
              </li>
              <li>
                To use knowledge sharing and reverse mentoring to establish
                business, professional development, and learning opportunities
                for members, affiliates, and students.
              </li>
              <li>
                Arranging events for continuous professional development (CPD)
                to stay current with changes in the industry and ensure that the
                highest standards of professionalism are always upheld.
              </li>
              <li>
                To make use of members’ networks to promote each other and
                foster collaboration with current and new contacts.
              </li>
              <li>
                To raise awareness of The Professional Accountants Society, its
                members, and the accounting and finance industries to influence
                business, oversight organizations, and society at large
                positively and professionally
              </li>
              <li>
                {" "}
                To create a forum for members to discuss topics of shared
                interest, a channel for experts to voice their professional
                opinions on topics of public interest, and an official channel
                for communication between the Society and the appropriate
                professional oversight organizations.
              </li>
              <li>
                To plan frequent social and family gatherings to foster close
                ties between families and work.
              </li>
              <li>
                Take any action that could benefit the Society, its members, and
                the accounting industry without endangering the Society &apos;s
                reputation.
              </li>
              <li>
                To provide educational support for accountancy and finance
                students in the UK.
              </li>
            </ul>
          </section>

          {/*Powers Section */}
          <section
            id="Powers"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              5) Powers:
            </h2>

            <p className="mb-4">
              The Society and its executive committee shall have the power to
              undertake any action necessary to further its objectives or
              actions that are conducive or incidental to achieving them.
              Specifically, the executive committee holds the power to:
            </p>

            <ol className="list-decimal pl-6 mt-2 space-y-2">
              <li>
                <strong>Borrow Money:</strong> Borrow money and use the entirety
                or a portion of its property as collateral for loan repayment.
              </li>
              <li>
                <strong>Acquire Property:</strong> Purchase, lease, exchange,
                hire, or otherwise acquire any property and maintain or equip it
                for use.
              </li>
              <li>
                <strong>Dispose of Property:</strong> Sell, lease, or otherwise
                dispose of any part or all of the Society&apos;s property.
              </li>
              <li>
                <strong>Employ and Remunerate Staff:</strong> Hire and pay staff
                as necessary to carry out the Society&apos;s activities.
              </li>
              <li>
                <strong>Manage Investments:</strong> Deposit or invest funds,
                employ a professional fund manager, and arrange for the
                Society&apos;s investments or property to be held in the name of
                a nominee.
              </li>
            </ol>
          </section>

          {/*Application of Income and Property Section */}
          <section
            id="Application_of_Income_and_Property"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              6) Application of Income and Property:
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Non-Profit Distribution Clause:
            </h3>

            <ol className="list-decimal pl-6 mt-2 space-y-3">
              <li>
                <strong>Income and Profits:</strong> The income and property of
                the Society shall be applied solely towards the promotion of its
                stated objectives and purposes as outlined in this Constitution.
              </li>
              <li>
                <strong>No Distribution to Members:</strong> No portion of the
                income or property shall be paid or transferred, directly or
                indirectly, by way of dividend, bonus, or otherwise as profit to
                any member of the Society.
              </li>
              <li>
                <strong>Exceptions:</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    This clause shall not prevent reasonable and proper
                    remuneration for any services rendered to the Society by any
                    member who is not serving as a trustee or executive
                    committee member.
                  </li>
                  <li>
                    Members may be reimbursed for expenses incurred while
                    performing services on behalf of the Society.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Reinvestment:</strong> Any surplus generated at the end
                of the financial year shall be retained and reinvested into the
                Society&apos;s activities or reserves to promote and support the
                Society&apos;s objectives.
              </li>
            </ol>
          </section>

          {/*Benefits and Payments Section */}
          <section
            id="Benefits_and_payments"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              7) Benefits and payments to executive committee member and
              connected persons
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  (1) General provisions:
                </h3>
                <p className="mb-3">
                  No executive committee member or connected person may:
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    buy or receive any goods or services from the Society on
                    terms preferential to those applicable to members of the
                    public.
                  </li>
                  <li>
                    sell goods, services, or any interest in land to the
                    Society.
                  </li>
                  <li>
                    be employed by, or receive any remuneration from, the
                    Society.
                  </li>
                  <li>receive any other financial benefit from the Society;</li>
                </ol>
                <p className="mt-3 mb-2">
                  unless the payment or benefit is permitted by subclause (2) of
                  this clause or authorized by the court.
                </p>
                <p className="italic">
                  In this clause, a &quot;financial benefit&quot; means a
                  benefit, direct or indirect, which is either money or has a
                  monetary value.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  (2) Scope and powers permitting executive committee
                  member&apos; or connected persons&apos; benefits
                </h3>
                <ol className="list-[lower-alpha] pl-6 space-y-3">
                  <li>
                    An executive committee member or connected person may
                    receive a benefit from the Society as a beneficiary of the
                    Society provided that a majority of the executive committee
                    member do not benefit in this way.
                  </li>
                  <li>
                    An executive committee member or connected person may enter
                    into a contract for the supply of services and/or goods to
                    the Society where that is permitted in accordance with UK
                    Companies act.
                  </li>
                  <li>
                    An executive committee member or connected person may
                    receive interest on money lent to the Society at a
                    reasonable and proper rate which must be not more than the
                    Bank of England bank rate (also known as the base rate).
                  </li>
                  <li>
                    An executive committee member or connected person may
                    receive rent for premises let by the trustee or connected
                    person to the Society. The amount of the rent and the other
                    terms of the lease must be reasonable and proper. The
                    executive committee concerned must withdraw from any meeting
                    at which such a proposal or the rent or other terms of the
                    lease are under discussion.
                  </li>
                  <li>
                    An executive committee member or connected person may take
                    part in the normal trading and fundraising activities of the
                    Society on the same terms as members of the public.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  (3) In sub-clause (2) of this clause:
                </h3>
                <ol className="list-[lower-alpha] pl-6 space-y-3">
                  <li>
                    &quot;the Society&quot; includes any organization in which
                    the Society:
                    <ol className="list-[lower-roman] pl-6 mt-2 space-y-1">
                      <li>holds more than 50% of the shares; or</li>
                      <li>
                        controls more than 50% of the voting rights attached to
                        the shares; or
                      </li>
                      <li>
                        has the right to appoint one or more directors to the
                        board of the company;
                      </li>
                    </ol>
                  </li>
                  <li>
                    &quot;connected person&quot; includes any person within the
                    definition set out in clause [30] (Interpretation).
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/*Conflicts of Interest Section */}
          <section
            id="Conflicts_of_interest"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              8) Conflicts of interest and conflicts of loyalty
            </h2>

            <p className="mb-4">A executive committee member must:</p>

            <ol className="list-decimal pl-6 space-y-3">
              <li>
                declare the nature and extent of any interest, direct or
                indirect, which he or she has in a proposed transaction or
                arrangement with the Society or in any transaction or
                arrangement entered into by the Society which has not previously
                been declared; and
              </li>
              <li>
                absent himself or herself from any discussions of the executive
                committee member in which it is possible that a conflict of
                interest will arise between his or her duty to act solely in the
                interests of the Society and any personal interest (including
                but not limited to any financial interest).
              </li>
            </ol>

            <p className="mt-4 font-medium">
              Any executive committee member absenting himself or herself from
              any discussions in accordance with this clause must not vote or be
              counted as part of the quorum in any decision of the executive
              committee on the matter.
            </p>
          </section>

          {/*Executive Committee Section */}
          <section
            id="Executive_Committee"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              9) Executive Committee:
            </h2>

            <div className="space-y-6">
              <p>
                The Executive Committee (EC) will consist of nine members,
                including a President, Secretary, Treasurer, and other members
                with portfolios as necessary to delegate work. The committee
                will be selected by the founding members of the society and will
                be responsible for the day-to-day operations of the society.
              </p>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Casual Vacancies:
                </h3>
                <p>
                  In the event of a vacancy arising due to the death,
                  incapacity, or resignation of a committee member, the
                  remaining members will continue to manage the committee. The
                  founding members will appoint a replacement from the
                  registered members of the society within one month of the
                  vacancy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Co-opting Members:
                </h3>
                <p>
                  The founding members have the authority to co-opt additional
                  members for any purpose they deem necessary.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Sub-Committees:
                </h3>
                <p>
                  The founding members have the power to establish
                  sub-committees and co-opt members to these sub-committees as
                  needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Authority and Expenditure:
                </h3>
                <p>
                  The Executive Committee members are empowered to carry out all
                  necessary actions and incur expenditures required for the
                  day-to-day management of the society.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Term of Office:
                </h3>
                <p>
                  The Executive Committee shall be appointed for a term of 24
                  months. However, if necessary, the current EC will remain in
                  office until a new committee is formed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Eligibility for Executive Committee Member:
                </h3>
                <ol className="list-[lower-roman] pl-6 space-y-2">
                  <li>
                    Every executive committee member must be a natural person,
                    meaning they must be a human being (not a corporation or
                    other entity).
                  </li>
                  <li>
                    The individual must meet the initial entry criteria for
                    general membership of the society.
                  </li>
                  <li>
                    They must have a previous track record of involvement with a
                    charitable/social organization.
                  </li>
                  <li>
                    No one under the age of 18 years may be appointed as a
                    charity trustee.
                  </li>
                </ol>
                <p className="mt-3">
                  An individual is not entitled to act as an executive committee
                  member upon appointment or reappointment until they have
                  expressly acknowledged their acceptance of the office, in
                  whatever manner the current executive committee member decide.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Appointment of Executive Committee member:
                </h3>
                <p>
                  Every Executive Committee member must be appointed by a
                  resolution passed at a properly convened meeting of the
                  founding members. In selecting individuals for appointment to
                  the Executive Committee, the founding members must consider
                  the skills, knowledge, and experience required for the
                  effective administration of the society.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Information for new Executive Committee member:
                </h3>
                <p className="mb-3">
                  The Executive Committee member will make available to each new
                  Executive Committee member, on or before his or her first
                  appointment:
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-1">
                  <li>
                    A copy of the current version of this constitution; and
                  </li>
                  <li>
                    A copy of the society&apos;s latest Trustees&apos; Annual
                    Report and statement of accounts.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Retirement and removal of Executive Committee member:
                </h3>
                <p className="mb-3">
                  A Executive Committee member ceases to hold office if he or
                  she:
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    retires by notifying the society in writing (but only if
                    enough Executive Committee member will remain in office when
                    the notice of resignation takes effect to form a quorum for
                    meetings);
                  </li>
                  <li>
                    is absent without the permission of the Executive Committee
                    member from all their meetings held within a period of three
                    months and the Executive Committee member resolve that his
                    or her office be vacated;
                  </li>
                  <li>dies;</li>
                  <li>
                    in the written opinion, given to the society, of a
                    registered medical practitioner treating that person, has
                    become physically or mentally incapable of acting as a
                    Executive Committee member and may remain so for more than
                    three months;
                  </li>
                  <li>
                    is disqualified from acting as an Executive Committee member
                    if, in the opinion of the founding members, their
                    involvement is likely to damage the image of the society or
                    bring discredit to the society, either in the short term or
                    in the long run.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Taking of decisions by Executive Committee member:
                </h3>
                <p className="mb-3">
                  Any decision may be taken by resolution in writing or
                  electronic form agreed by a majority of all of the Executive
                  Committee member, which may comprise either a single document
                  or several documents containing the text of the resolution in
                  like form to which the majority of all of the Executive
                  Committee member has signified their agreement. Such a
                  resolution shall be effective provided that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    a copy of the proposed resolution has been sent, at or as
                    near as reasonably practicable to the same time, to all of
                    the Executive Committee member; and
                  </li>
                  <li>
                    the majority of all of the Executive Committee member has
                    signified agreement to the resolution in a document or
                    documents which has or have been authenticated by their
                    signature, by a statement of their identity accompanying the
                    document or documents, or in such other manner as the
                    Executive Committee member have previously resolved, and
                    delivered to the society at its principal office or such
                    other place as the Executive Committee member may resolve
                    within 28 days of the circulation date.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Delegation by Executive Committee member:
                </h3>
                <p className="mb-3">
                  (1) The Executive Committee member may delegate any of their
                  powers or functions to a committee or committees, and, if they
                  do, they shall determine the terms and conditions on which the
                  delegation is made. The Executive Committee member may at any
                  time alter those terms and conditions, or revoke the
                  delegation. This power is in addition to the power of
                  delegation in the General Regulations and any other power of
                  delegation available to the Executive Committee member, but is
                  subject to the following requirements:
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    a committee may consist of two or more persons, but at least
                    one member of each committee must be a Executive Committee
                    member;
                  </li>
                  <li>
                    the acts and proceedings of any committee must be brought to
                    the attention of the Executive Committee member as a whole
                    as soon as is reasonably practicable; and
                  </li>
                  <li>
                    the Executive Committee member shall from time to time
                    review the arrangements which they have made for the
                    delegation of their powers.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Meetings of Executive Committee member:
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      (1) Calling meetings:
                    </h4>
                    <p>
                      Any Executive Committee member may call a meeting of the
                      Executive Committee member. Subject to that, the Executive
                      Committee member shall decide how their meetings are to be
                      called, and what notice is required.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      (2) Chairing of meetings:
                    </h4>
                    <p>
                      The President of the Executive Committee member may chair
                      their meetings. If no-one has been so appointed, or if the
                      person appointed is unwilling to preside or is not present
                      within 10 minutes after the time of the meeting, the
                      Executive Committee member present may appoint one of
                      their number to chair that meeting.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      (3) Procedure at meetings:
                    </h4>
                    <ol className="list-[lower-alpha] pl-6 space-y-2">
                      <li>
                        No decision shall be taken at a meeting unless a quorum
                        is present at the time when the decision is taken. The
                        quorum is five Executive Committee member, or the number
                        nearest to two third of the total number of Executive
                        Committee member, whichever is greater, or such larger
                        number as the Executive Committee member may decide from
                        time to time. An Executive Committee member shall not be
                        counted in the quorum present when any decision is made
                        about a matter upon which he or she is not entitled to
                        vote.
                      </li>
                      <li>
                        Questions arising at a meeting shall be decided by a
                        majority of those eligible to vote.
                      </li>
                      <li>
                        In the case of an equality of votes, the person who
                        chairs the meeting shall have a second or casting vote.
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      (4) Participation in meetings by electronic means:
                    </h4>
                    <ol className="list-[lower-alpha] pl-6 space-y-2">
                      <li>
                        A meeting may be held by suitable electronic means
                        agreed by the Executive Committee member in which each
                        participant may communicate with all the other
                        participants.
                      </li>
                      <li>
                        Any Executive Committee member participating at a
                        meeting by suitable electronic means agreed by the
                        Executive Committee member in which a participant or
                        participants may communicate with all the other
                        participants shall qualify as being present at the
                        meeting.
                      </li>
                      <li>
                        Meetings held by electronic means must comply with rules
                        for meetings, including chairing and the taking of
                        minutes.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*Founding Members Section */}
          <section
            id="Founding_Members"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              10) Founding Members:
            </h2>

            <p className="mb-4">
              The following individuals are the founding members of the society
              and will have direct access to every executive committee meeting.
              They are expected to actively contribute to the day-to-day
              decision-making process:
            </p>

            <ol className="list-decimal pl-6 space-y-1">
              <li>Mohammed Iftekharul Islam Chowdhury</li>
              <li>Suraiya Khatun Haque</li>
              <li>Mohammed Ali Ashraf Chowdhury</li>
              <li>MD Khasruzzaman</li>
              <li>Hossain Al-Mamun</li>
              <li>Kazi Farhana Akhter</li>
              <li>Afroza Amin Jhuma</li>
              <li>Nazmul Hossain</li>
              <li>Md Mijanur Rahman</li>
              <li>Mohammed Kamrul Aziz</li>
              <li>Harisa Islam</li>
              <li>Md Tofazzel Hossain</li>
              <li>Anam Mahmud</li>
              <li>Md Mahmudul Haque</li>
              <li>MD Sultanul Abedin</li>
              <li>Mohammad Sarfaraz Ninad</li>
              <li>Md Alinur Rahman</li>
              <li>F M Raisul Ferdous</li>
              <li>Dabir Ahmed</li>
            </ol>
          </section>

          {/*Office Bearers Section */}
          <section
            id="Office_Bearers"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              11) Office bearers of the Executive Committee member board and
              their duties:
            </h2>

            <p className="mb-6">
              The Executive Committee members shall have duties assigned to them
              as shown below:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11.1. The President
                </h3>
                <p className="mb-3">
                  The President shall be the Chief Executive of the Society.
                  He/she shall have the overall responsibility for providing
                  leadership and direction to other members of Committee.
                </p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    She/he shall oversee all functions of the Society, set out
                    goals and priorities, fully participate in the planning and
                    programming of all activities, review progress and suggest
                    appropriate actions if any programme is not progressing
                    well.
                  </li>
                  <li>She/he shall help other Committee members as needed.</li>
                  <li>
                    She/he shall take the lead in making representation to any
                    professional and other bodies.
                  </li>
                  <li>
                    Any function which does not readily fit into the operational
                    areas of any other Committee members shall automatically be
                    his responsibility unless he has delegated it to any other
                    Committee member.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11.2. The Secretary
                </h3>
                <p className="mb-3">The Secretary shall be responsible for:</p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>Maintaining minutes of Society&apos;s meetings.</li>
                  <li>
                    Convening Society&apos;s meetings as required under the
                    constitution.
                  </li>
                  <li>
                    Maintaining an up-to-date Register of the Society&apos;s
                    members.
                  </li>
                  <li>
                    Performing any other duties required for the operational
                    needs of the Society or as delegated by the President.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11.3. Treasurer
                </h3>
                <p className="mb-3">The Treasurer shall be responsible for:</p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>Maintaining the Society&apos;s financial records.</li>
                  <li>
                    Collecting the Society&apos;s annual subscription from
                    members.
                  </li>
                  <li>
                    Presenting the Society&apos;s examined annual financial
                    statements and report to the AGM within three months from
                    the end of the financial year. To meet this deadline, the
                    financial statements in the draft should be available within
                    three months from the end of the financial year for
                    discussion amongst the EC members and then for the
                    independent examiner to carry out the independent
                    examinations.
                  </li>
                  <li>
                    Answering any questions arising from annual financial
                    statements and reports.
                  </li>
                  <li>
                    Preparing a business plan and annual budget to be presented
                    in the AGM with annual financial statements and reports.
                  </li>
                  <li>
                    Performing any other duties required for the operational
                    needs of the Society or as delegated by the President.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  11.4. Trustees without portfolio
                </h3>
                <p className="mb-3">He/she shall be responsible for:</p>
                <ol className="list-[lower-alpha] pl-6 space-y-2">
                  <li>
                    Miscellaneous duties, in close liaison with the President,
                    which have not been specifically assigned to other committee
                    members.
                  </li>
                  <li>Helping other committee members as needed.</li>
                  <li>
                    Performing any other duties as required or delegated by the
                    President.
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/*Membership Section */}
          <section
            id="Membership"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              12) Membership:
            </h2>

            <p className="mb-6">
              The members of the Society shall be its founding members and
              general members. Applications for membership in the Society in all
              categories must be submitted to the secretary online or on paper,
              as the executive committee may determine.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  a) Eligibility Criteria:
                </h3>
                <p className="mb-3">
                  The potential applicant must be an active member or affiliate
                  of the following supervisory bodies:
                </p>
                <ol className="list-[lower-roman] pl-6 space-y-1 mb-4">
                  <li>
                    The Institute of Chartered Accountants in England and Wales
                    (ICAEW).
                  </li>
                  <li>
                    The Association of Chartered Certified Accountants (ACCA).
                  </li>
                  <li>
                    The Institute of Chartered Accountants of Scotland (ICAS).
                  </li>
                  <li>
                    The Chartered Institute of Management Accountants (CIMA).
                  </li>
                  <li>
                    The Chartered Institute of Public Finance and Accountancy
                    (CIPFA).
                  </li>
                  <li>The Chartered Accountants of Ireland (CAI).</li>
                  <li>
                    The Institute of Chartered Accountants of Bangladesh (ICAB).
                  </li>
                </ol>
                <p>
                  A person who is an ordinary resident for UK tax purposes and a
                  member/associate/affiliate of any of the above supervisory
                  bodies or their successors shall be eligible for membership of
                  the Society.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  b) Membership approval:
                </h3>
                <p>
                  Membership applications shall be approved in the executive
                  committee meeting following the completion of the due
                  verification process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  c) Termination & disciplinary procedures:
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">i)</h4>
                    <p className="mb-2">
                      The executive committee and founding members retain the
                      power to refuse general membership to or terminate
                      membership of any member whose standard of professional
                      conduct, in the committee&apos;s opinion, is inconsistent
                      with any of the objectives and ethical standards of the
                      Society or if, in the opinion of the trustees, that
                      person&apos;s membership is no longer in the interest of
                      the Society.
                    </p>
                    <p>
                      The executive committee and founding members shall have
                      the power, at its discretion, to reinstate his/her
                      membership.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">ii)</h4>
                    <p>
                      Any decision taken on c(i) can be appealed by the
                      respective member to the independent Committee will be
                      formed by the founding members.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  d) Resignation:
                </h3>
                <p>
                  Any general member may resign his or her membership by giving
                  the president a notice in writing or online to that effect,
                  for submission to the executive committee, which will deal
                  with the resignation process within 28 days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  e) Membership fee:
                </h3>
                <p>
                  Members are required to pay a certain non-refundable joining
                  fee, the amount of which will be fixed by the executive
                  committee.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  f) Members&apos; annual subscription:
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">i)</h4>
                    <p>
                      All members are required to pay the annual subscription
                      fees based on their date of joining (if joining before the
                      year ended 31 March; on a pro-rata basis) and thereafter
                      the full amount in each subsequent year. Any member who
                      fails to pay dues within 30 days after the due date shall
                      be notified in writing by the secretary. If fees are not
                      paid within 30 days after the notification, the executive
                      committee may terminate membership at its discretion.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">ii)</h4>
                    <p>
                      The executive committee may reinstate the former member to
                      membership if the former member submits a request and pays
                      all dues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">iii)</h4>
                    <p>
                      Changes in the annual subscription may be made from time
                      to time at the executive committee meetings.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  g) Decisions made by the general members:
                </h3>
                <p className="mb-3">
                  Any decision to amend the constitution of the Society,
                  amalgamate the Society with, or transfer its undertaking to,
                  one or more other organizations, or wind up or dissolve the
                  Society (including transferring its business to any other
                  charity) must be made by a resolution of the general members
                  of the Society rather than a resolution of the executive
                  committee by resolution at a general meeting.
                </p>
                <p className="mb-3">
                  The resolution to be agreed by a 75% majority of those members
                  voting at a general meeting, or agreed by all members in
                  writing.
                </p>
                <p>
                  A copy of the proposed resolution has been sent to all the
                  members eligible to vote; and the required majority of members
                  have signified its agreement to the resolution in a document
                  or documents which are received at the principal office within
                  the period of 28 days beginning with the circulation date. The
                  document signifying a member&apos;s agreement must be
                  authenticated by their signature, by a statement of their
                  identity accompanying the document, or in such other manner as
                  the club has specified.
                </p>
              </div>
            </div>
          </section>

          {/*Modus Operandi Section */}
          <section
            id="Modus_Operandi"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              13) Modus Operandi:
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">a)</h3>
                <p>
                  The executive committee shall establish a fund under its
                  management and control. All monies received shall be paid into
                  the Society&apos;s bank account within five working days. All
                  expenses and liabilities incurred for the Society and approved
                  by the committee shall be paid out of it.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">b)</h3>
                <p>
                  The committee shall maintain proper records of the
                  Society&apos;s transactions and take necessary steps to
                  safeguard its assets. These records shall normally be kept at
                  the Treasurer&apos;s office and shall be available for
                  inspection by the general members on demand. The Treasurer
                  shall provide financial information and explanations as
                  requested by the executive committee.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">c)</h3>
                <p>
                  The executive committee shall maintain a Register of the
                  Society&apos;s members with full details, along with a list of
                  members who are in default in payment of their annual
                  subscriptions.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">d)</h3>
                <p>
                  The executive committee shall discharge their responsibilities
                  to the best of their abilities and by the best working
                  procedures necessary for their respective areas of duties
                  considering the operational needs of the Society. They shall
                  act within their powers given in the constitution exercise due
                  care and diligence and act in the best interest of the
                  Society. They have a collective responsibility and activities
                  shall normally be undertaken by agreement amongst them. In
                  case of any disagreement on any important matter, records
                  shall be kept in the minutes of such a disagreement for any
                  future reference.
                </p>
              </div>
            </div>
          </section>

          {/*Year End Accounts Section */}
          <section
            id="Year_End_Accounts"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              14) Year End Accounts:
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  14.1. Financial Year and Statement Preparation
                </h3>
                <p className="mb-3">
                  The financial year of the Society shall end on 31 March and
                  financial statements shall be prepared in accordance with UK
                  Companies act within 3 months after the year&apos;s end each
                  year for submission to the AGM. Such accounts shall be subject
                  to examination and reported on by the independent honorary
                  reporting accountant.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  14.2. Independent Examiner
                </h3>
                <p className="mb-3">
                  The independent examiner will be appointed at the Annual
                  General Meeting together with his/her fees. The independent
                  examiner will give his/her report to the members of the
                  Society.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  14.3. Strategic Business Plan and Annual Budgets
                </h3>
                <p className="mb-3">
                  The committee shall prepare a strategic business plan and
                  annual budgets including the proposed yearly subscription.
                  These should be discussed and agreed upon amongst the founding
                  members first and then presented to the members of the Society
                  at the Annual General Meeting for their agreement. A strategic
                  business plan normally covers two years and is prepared on a
                  rolling forecast basis with annual updates.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  14.4. Annual Budget Elements
                </h3>
                <p className="mb-3">
                  The annual budgets shall identify the planned elements of
                  income and expenditure relating to the Society&apos;s
                  functions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  14.5. Variance Reporting
                </h3>
                <p className="mb-3">
                  Any significant variance (normally more than 10%) between the
                  budgeted and actual income/expenditure shall be explained in a
                  note to annual financial statements.
                </p>
              </div>
            </div>
          </section>

          {/*Annual General Meeting Section */}
          <section
            id="Annual_General_Meeting_(AGM)"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              15) Annual General Meeting (AGM):
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  15.1. AGM Requirements and Business
                </h3>
                <p className="mb-3">
                  The AGM of the Society shall be held in a proposed physical
                  venue every year within three months of the financial year end
                  to transact the following affairs:
                </p>
                <ol className="list-[lower-roman] pl-6 space-y-2">
                  <li>To receive the annual report.</li>
                  <li>To receive the accounts for the past financial year.</li>
                  <li>
                    To appoint an independent honorary reporting accountant.
                  </li>
                  <li>
                    To transact any other business of which due notice has been
                    given to the board of trustees.
                  </li>
                  <li>To approve constitutional amendments.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  15.2. Notice of Other Business
                </h3>
                <p className="mb-3">
                  Notice of other business to be transacted must be received by
                  the committee within 30 days after the accounting year-end
                  date, giving details of the proposed resolution and the name
                  of the proposer and seconder.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  15.3. AGM Notice Period
                </h3>
                <p className="mb-3">
                  Notice of the AGM shall be given 28 days in advance in
                  writing.
                </p>
              </div>
            </div>
          </section>

          {/*Executive Committee Meeting Section */}
          <section
            id="Executive_Committee_Meeting"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              16) Executive Committee Meeting:
            </h2>

            <p className="mb-3">
              There shall be a regular board of trustees meeting for the
              day-to-day operation of the Society.
            </p>
          </section>
          {/*Quorum Section */}
          <section
            id="Quorum"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              17) Quorum:
            </h2>

            <p className="mb-3">
              For any decision made at the AGM or EGM, 75% of the registered
              attendees must vote in favor. However, a quorum for the Executive
              Committee will require only a simple majority. If a quorum is not
              present when the meeting moves to business, no decisions or
              business may be conducted at the Executive Committee meeting, AGM,
              or EGM. Any absence that is preceded by written notice (electronic
              or paper) may still be counted towards the Executive Committee
              meeting quorum.
            </p>
          </section>

          {/*Extraordinary General Meeting Section */}
          <section
            id="Extraordinary_General_Meeting"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              18) Extraordinary General Meeting (EGM):
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  18.1. Calling an EGM
                </h3>
                <p className="mb-3">
                  The Executive Committee may call an extraordinary general
                  meeting at any time by giving fourteen days&apos; notice in writing
                  or other means and shall convince such a meeting on the
                  written requisition of a simple majority of members present at
                  a quorum meeting. The objectives of the meeting shall be
                  specified in the notice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  18.2. Constitutional Amendments
                </h3>
                <p className="mb-3">
                  If an extraordinary general meeting is called to approve or
                  rectify amendments to the Society&apos;s constitution, the
                  resolutions must be passed by a simple majority of the members
                  present, including all general registered members. The
                  Executive Committee will delegate responsibilities for
                  constitutional amendment works.
                </p>
              </div>
            </div>
          </section>

          {/*Votes at the Meeting Section */}
          <section
            id="Votes_at_the_Meeting"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              19) Votes at the Meeting:
            </h2>

            <p className="mb-3">
              Every registered member/attendees present at a general meeting
              that calls for a vote is entitled to one vote. The meeting&apos;s
              president will cast a casting vote in the event of an equal number
              of votes.
            </p>
          </section>

          {/*Amendments to the Constitution Section */}
          <section
            id="Amendments_to_the_Constitution"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              20) Amendments to the Constitution:
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  20.1. Meeting Requirements
                </h3>
                <p className="mb-3">
                  No additions to or alterations of this constitution shall be
                  made other than at any annual general meeting or at an
                  extraordinary general meeting was called for that purpose.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  20.2. Proposal Process
                </h3>
                <p className="mb-3">
                  Any member wishing to propose such alterations or additions
                  must send the proposal, duly seconded, in writing to the
                  President of the Society for submission to the Committee. The
                  Executive committee shall, if possible, bring the proposal at
                  least 30 calendar days before the next AGM, or, if it thinks
                  it desirable, may convene an extraordinary general meeting.
                </p>
              </div>
            </div>
          </section>

          {/*Interpretation of Rules Section */}
          <section
            id="Interpretation_of_Rules"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              21) Interpretation of Rules:
            </h2>

            <p className="mb-3">
              The Executive committee and founding members shall be the sole
              authority for the interpretation of this constitution, and the
              decision of the committee upon any question of interpretation or
              any matter affecting the Society and not provided for by this
              constitution shall be final and binding on the members except for
              where it clashes with Companies House act and Other UK Law.
            </p>
          </section>
          {/*Dissolutions & Winding Up Section */}
          <section
            id="discussion"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              22) Dissolutions & Winding Up:
            </h2>

            <p className="mb-3">
              A resolution passed at an extraordinary general meeting may
              dissolve the Society. In that case, any property left over after
              the Society&apos;s debts and liabilities have been paid off or
              transferred to charitable organizations that support the welfare
              of any British Bangladeshi registered charity organization in the
              UK, as decided by the founding members. All registered
              members&apos; shares equal liabilities limited to £1 each in the
              event of winding up. But subject to that, the members of the
              Society have no liability to contribute to its assets if it is
              wound up, and accordingly have no personal responsibility for the
              settlement of its debts and liabilities beyond the amount that
              they are liable to contribute.
            </p>
          </section>

          {/*Internal Procedures Section */}
          <section
            id="Internal_Procedures"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              23) Internal Procedures:
            </h2>

            <div className="space-y-6">
              <div>
                <p className="mb-3">
                  a) The management of the Society is vested upon the Executive
                  committee and is a collective responsibility. Each committee
                  member shall play his/her part properly. There shall be utmost
                  cooperation amongst the members. Each member shall undertake
                  his/her duties with a missionary zeal. Rules and procedures,
                  though there will be some as a safeguard, there are no
                  substitute for the spirit of co-operation and zeal.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  b) Members shall approach the duties in their respective areas
                  in a business-like manner.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  c) Members shall innovate and improvise ways and means to
                  discharge their duties effectively, efficiently, and
                  economically. They shall devise procedures appropriate to the
                  areas of their duties and strengthen communication with other
                  members.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  d) Members shall strive to achieve transparency in any dealing
                  and financial transactions carried out on behalf of the
                  Society in an official capacity. They shall not use the names
                  of their practice or their franking machines, calendars, tax
                  tables etc, in any correspondence, which could give the
                  impression of advertising their practice and any other
                  business.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  e) The Society disclaims all liability for any financial
                  transactions or expenses that a member may incur while acting
                  in their personal capacity at any event that the Society
                  organises.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  f) Members shall maintain records of activities undertaken in
                  their areas and keep evidence or explanations of any
                  expenditure wholly and exclusively defrayed in the performance
                  of their duties.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  g) Members shall submit claims for reimbursement of any
                  expenditure as soon as practicable, normally within two weeks
                  of defraying them on the Society&apos;s business.
                </p>
              </div>

              <div>
                <p className="mb-3">
                  h) The Treasurer shall reimburse members&apos; expenses after
                  approval by the executive committee, being satisfied, based on
                  documentary evidence and/or explanations, that these have been
                  incurred on the Society&apos;s business.
                </p>
              </div>
            </div>
          </section>

          {/*Bank Section */}
          <section
            id="Bank"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">24) Bank:</h2>

            <p className="mb-3">
              The Society shall have UK registered bank account. Bank
              signatories/mandate holders of three individuals from the founding
              members. Any bank payment must be reviewed and authorised at least
              by two signatories out of three signatories/mandate holders. Any
              single invoice of more than £1,000 must be approved by the three
              signatories. The Society will hold a maximum £100 petty cash float
              at any time. A bank signatory can be replaced/terminated by a
              simple majority vote of a present member of the founding members.
            </p>
          </section>

          {/*Disclaimer Section */}
          <section
            id="Disclaimer"
            className="mb-10 border-b border-gray-300 pb-10 scroll-mt-20"
          >
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              25) Disclaimer
            </h2>

            <p className="mb-3">
              It is strictly forbidden to promote, discuss, suggest, or debate
              any contentious political, religious or any other controversial
              issues on any of our platforms or at any of our gatherings.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default ConstitutionPage;
