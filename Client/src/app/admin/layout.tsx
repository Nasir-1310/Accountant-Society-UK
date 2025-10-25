// src/app/admin/layout.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Container from "@/components/Container";
import { Shield, LogOut, Menu, X } from "lucide-react";

interface AdminData {
  email: string;
  name?: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show header on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // If on login page, skip auth check
    if (isLoginPage) {
      setLoading(false);
      setIsAuthenticated(true); // Allow login page to render
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          // Not authenticated, redirect to login
          setIsAuthenticated(false);
          router.replace("/admin/login");
          return;
        }

        const data = await res.json();
        setAdminData(data.admin);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuthenticated(false);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [mounted, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.replace("/admin/login");
    }
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Show loading spinner while checking authentication (only for protected routes)
  if (loading && !isLoginPage) {
    return (
      <Container>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying authentication...</p>
          </div>
        </div>
      </Container>
    );
  }

  // If not on login page and not authenticated, show redirect message
  if (!isLoginPage && !isAuthenticated && !loading) {
    return (
      <Container>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Admin Header - Responsive */}
        {!isLoginPage && isAuthenticated && (
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Desktop Header */}
              <div className="hidden md:flex justify-between items-center py-4">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-blue-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
                
                {adminData && (
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {adminData.name || adminData.email || "Admin"}
                      </p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Header */}
              <div className="md:hidden">
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center">
                    <Shield className="h-6 w-6 text-blue-600 mr-2" />
                    <h1 className="text-lg font-bold text-gray-900">Admin</h1>
                  </div>
                  
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    {mobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && adminData && (
                  <div className="pb-3 pt-2 border-t border-gray-200">
                    <div className="px-2 space-y-3">
                      <div className="px-3 py-2 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {adminData.name || adminData.email || "Admin"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Administrator</p>
                      </div>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </Container>
  );
}