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
    slug: "accountants-day-2025",
    title: "TPAS Magazine - Accountant's day-2025",
    cover: "/magazine/images/magazine1_cover.png",
    pdf: "https://drive.google.com/file/d/1X0ZpbAtMGVNKEOlQvZ3CJGB-wxqsbkZW/view?usp=sharing",
    date: "2025-10-07",
    description:
      "The January 2025 edition covers key insights into sustainable accounting practices, leadership stories, and community highlights.",
  },
];

export default magazines;