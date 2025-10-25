// src/components/ConditionalHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on admin routes
//   if (pathname.startsWith("/admin")) {
//     return null;
//   }

  return <Navbar />;
}