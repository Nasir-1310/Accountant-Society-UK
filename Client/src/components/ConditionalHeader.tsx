// src/components/ConditionalHeader.tsx
"use client";

// import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalHeader() {
//   const pathname = usePathname();
  
  // Don't show navbar on admin routes
//   const isAdminRoute = pathname.startsWith("/admin");
  
//   if (isAdminRoute) {
//     return null;
//   }

  return <Navbar />;
}