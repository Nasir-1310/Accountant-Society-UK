"use client";

import { ReactNode } from "react";
import Container from "@/components/Container";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Container>

    
    <div className="min-h-screen bg-gray-100 flex flex-col px-3">
      {/* Admin Header */}
      <header className="bg-white shadow   flex justify-between items-center px-3">
        
        {/* Logout button will be inside dashboard, optional here */}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

      
    </div>
    </Container>
  );
}
