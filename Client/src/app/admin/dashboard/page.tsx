// src/app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Calendar, 
  FileText, 
  LogOut,
  Shield
} from "lucide-react";

interface AdminData {
  email: string;
  name?: string;
}

interface DashboardStats {
  totalPosts: number;
  totalEvents: number;
  totalMembers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalEvents: 0,
    totalMembers: 0
  });

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }

        const data = await res.json();
        setAdminData(data.admin);

        // Fetch dashboard stats
        try {
          const statsRes = await fetch("/api/admin/stats", {
            method: "GET",
            credentials: "include",
          });
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            setStats(statsData);
          }
        } catch (statsErr) {
          console.warn("Could not fetch stats:", statsErr);
        }

      } catch (err) {
        console.error("Auth check error:", err);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [mounted, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Still redirect even if logout fails
      router.replace("/admin/login");
    }
  };

  

  const dashboardCards = [
    {
      title: "News & Blogs",
      description: "Create, edit, and manage blog posts and news articles.",
      icon: FileText,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      count: stats.totalPosts,
      href: "/admin/news-blogs"
    },
    {
      title: "Latest News",
      description: "Post and manage the latest news.",
      icon: Calendar,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      count: stats.totalMembers,
      href: "/admin/latest-news"
    },
    {
      title: "Members",
      description: "View and manage registered community members.",
      icon: Users,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
       count: stats.totalMembers,
      href: "/admin/members"
    }
    
  ];

  // Show loading state during hydration and auth check
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {adminData?.name || adminData?.email || "Admin"}
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome back, {adminData?.name || "Admin"}!
          </h2>
          <p className="text-gray-600">
            Manage your website content and monitor site activity from this dashboard.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => router.push(card.href)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {card.count !== null && (
                    <span className="text-2xl font-bold text-gray-900">{card.count}</span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                
                <button className={`w-full ${card.color} ${card.hoverColor} text-white font-medium py-2 px-4 rounded-md transition-colors`}>
                  Manage
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}