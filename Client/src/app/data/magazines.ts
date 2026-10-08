type Magazine = {
  slug: string;
  title: string;
  cover: string;
  pdf: string;
  date: string;
  description: string;
};



const magazines: Magazine[] = [
  {
    slug: "TPAS-Magazine-Accountant's-day-2026",
    title: "TPAS Magazine - British Bangladeshi Accountants' Day 2026",
    cover: "/magazine/images/magazine2_cover.png",
    // Hosted on Google Drive: the PDF (345 MB) is too large for the repo.
    pdf: "https://drive.google.com/file/d/1ybj52xC1g3_9hZQ5u_kAIDwA6yY4EoZi/view?usp=sharing",
    date: "2026-10-08",
    description:
      "The 2026 edition of the TPAS Magazine, published for The British Bangladeshi Accountants' Day 2026.",
  },
  {
    slug: "TPAS-Magazine-Accountant's-day-2025",
    title: "TPAS Magazine -British Bangladeshi Accountant's day-2025",
    cover: "/magazine/images/magazine1_cover.png",
    pdf: "https://drive.google.com/file/d/1pAxUHBPSy3LsdXRL1wO6ISysIplVkwIe/view?usp=sharing",
    date: "2025-10-07",
    description:
      "This year magazine covers Sustainability, Personal Finance, Halal Mortgage and British Bangladeshi Accountants’ contributions to the UK and Bangladesh Economy.",
  },
];

export default magazines;