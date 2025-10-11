// src/app/data/galleryData.ts

export type GalleryItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImageUrl: string;
  googleDriveFolderId: string;
};

const galleryData: GalleryItem[] = [
  {
    slug: "meet_the_press",
    title: "Meet the press, 04 April 2025",
    description:
      "Connecting to the excellence of British Bangladeshi Chartered Accountants.",
    date: "04 April, 2025",
    coverImageUrl:"https://drive.google.com/thumbnail?id=15_23CzwhlTjBq9RKMJV4BuXsY5ct_pGH&sz=w2000",
      
    googleDriveFolderId: "1cg2tXMhtwoPGuj5GP2YZ2WFLtEeYz3AV",
  },
   {
    slug: "cpd_and_networking_event_june_2025",
    title: "CPD and Networking Event, June 2025",
    description: "A day of CPD and networking for TPAS members.",
    date: "June, 2025",
    coverImageUrl: "https://drive.google.com/thumbnail?id=19eT2RjfRuQ021snCcZ6Y2up2bOJOB61V&sz=w2000",
    googleDriveFolderId: "123Z39NIcXYyLMIGtkHZZWH8j_5m2IraQ",
  },
  {
    slug: "we-were-at-accountex-london-2025",
    title: "We were at ACCOUNTEX LONDON, 2025",
    description:
      "We proudly participated in ACCOUNTEX London 2025, connecting with industry leaders and showcasing our commitment to the accounting profession.",
    date: "July, 2025",
    coverImageUrl:
      "https://drive.google.com/thumbnail?id=1DhMBBMRz8W2l937ozub0LydAauyyo96m&sz=w2000",
    googleDriveFolderId: "1Ny8EPGeMUwcaUnfmpekH3rjK0Z2W-1be",
  },
  {
    slug: "British_bangladeshi_accountants_day_2025",
    title: "British Bangladeshi Accountants' day 2025",
    description:
      "This year magazine covers Sustainability, Personal Finance, Halal Mortgage and British Bangladeshi Accountants’ contributions to the UK and Bangladesh Economy.",
    date: "Septembar, 2025",
    coverImageUrl: "https://drive.google.com/thumbnail?id=1Lvxr5kYeZd6O-T1r0w8CTsuOu1FHFjPD&sz=w2000",
    googleDriveFolderId: "1hwANP7zt3uPyDBy7w9XhUR9Ah70bgNZX",
    
  },
];

export default galleryData;