// //src/components/NewsAndBlogsSection.tsx

// "use client";

// import Link from "next/link";
// import { useState, useEffect, ChangeEvent } from "react";
// import Container from "./Container";

// interface NewsItem {
//   _id: string;          // MongoDB ID
//   type: "news" | "blog" | "event";
//   title: string;
//   category: string;
//   date: string;
//   description: string;
//   icon: string;
//   link: string;
//   tags?: string[];
// }

// interface FormData {
//   type: "news" | "blog" | "event";
//   title: string;
//   category: string;
//   date: string;
//   description: string;
//   tags: string;
//   link: string;
// }

// interface NewsAndBlogsSectionProps {
//   isAdmin?: boolean;
//   userRole?: string;
// }

// const NewsAndBlogsSection: React.FC<NewsAndBlogsSectionProps> = ({ 
//   isAdmin = false, 
//   userRole = "user" 
// }) => {
//   const [newsBlogs, setNewsBlogs] = useState<NewsItem[]>([]);
//   const [showAddForm, setShowAddForm] = useState<boolean>(false);
//   const [editingItem, setEditingItem] = useState<string | null>(null);
  
//   const [formData, setFormData] = useState<FormData>({
//     type: "news",
//     title: "",
//     category: "",
//     date: "",
//     description: "",
//     tags: "",
//     link: ""
//   });

//   const hasAdminAccess = isAdmin || userRole === "admin" || userRole === "super_admin";

//   const typeOptions = [
//     { value: "news" as const, label: "News", icon: "📄" },
//     { value: "blog" as const, label: "Blog", icon: "✏️" },
//     { value: "event" as const, label: "Event", icon: "📅" }
//   ];

//   const getIcon = (type: string): string => {
//     const typeOption = typeOptions.find(option => option.value === type);
//     return typeOption ? typeOption.icon : "📄";
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const resetForm = () => {
//     setShowAddForm(false);
//     setEditingItem(null);
//     setFormData({
//       type: "news",
//       title: "",
//       category: "",
//       date: "",
//       description: "",
//       tags: "",
//       link: ""
//     });
//   };

//   const formatDate = (dateString: string): string => dateString;

//   // ✅ Fetch news/blogs from backend API
//   useEffect(() => {
//     const fetchNewsBlogs = async () => {
//       try {
//         const res = await fetch("/api/admin/news-blogs");
//         if (!res.ok) throw new Error("Failed to fetch news/blogs");
//         const data = await res.json();
//         if (data.success && Array.isArray(data.data)) {
//           setNewsBlogs(data.data); // ✅ Correct field
//         } else {
//           setNewsBlogs([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setNewsBlogs([]);
//       }
//     };
//     fetchNewsBlogs();
//   }, []);

//   return (
//     <Container>
//       <section data-aos="fade-up" className="bg-white py-10">
//         <div>
//           {/* Section Header */}
//           <div className="text-center mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//               Latest news and blogs
//             </h2>
//             <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
//           </div>

//           {/* News and Blogs List */}
//           <div className="space-y-2">
//             {newsBlogs.map((item, index) => (
//               <article
//                 key={item._id}
//                 className="relative bg-white border border-gray-300 rounded-lg p-3 hover:shadow-lg transition-shadow duration-300 group"
//               >
//                 <div data-aos="fade-up" className="flex flex-col lg:flex-row lg:items-start gap-4">
//                   <div className="flex-shrink-0">
//                     <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-2xl">
//                       {item.icon || getIcon(item.type)}
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-900 mb-0.5">
//                       <Link href={item.link} className="hover:underline">{item.title}</Link>
//                     </h3>
//                     <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-0.5">
//                       <span className="font-medium">{item.category}</span>
//                       <span className="flex items-center gap-1">📅 {formatDate(item.date)}</span>
//                     </div>
//                     <p className="text-gray-700 leading-relaxed mb-0">{item.description}</p>
//                   </div>
//                 </div>
//                 {index < newsBlogs.length - 1 && <div className="mt-8 border-b border-gray-300"></div>}
//               </article>
//             ))}
//           </div>

//           {newsBlogs.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-500 text-lg mb-4">No news or blogs available</div>
//             </div>
//           )}
//         </div>
//       </section>
//     </Container>
//   );
// };

// export default NewsAndBlogsSection;
