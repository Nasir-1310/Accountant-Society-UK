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
    slug: "TPAS-Magazine-Accountant's-day-2025",
    title: "TPAS Magazine - Accountant's day-2025",
    cover: "/magazine/images/magazine1_cover.png",
    pdf: "https://drive.google.com/file/d/1X0ZpbAtMGVNKEOlQvZ3CJGB-wxqsbkZW/view?usp=sharing",
    date: "2025-10-07",
    description:
      "This year magazine covers Sustainability, Personal Finance, Halal Mortgage and British Bangladeshi Accountants’ contributions to the UK and Bangladesh Economy.",
  },
];

export default magazines;