// src/app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Calendar,
  FileText,
  Newspaper,
  ImageIcon // ✅ Import ImageIcon from lucide-react
} from "lucide-react";

interface DashboardStats {
  totalPosts: number;
  totalEvents: number;
  totalMembers: number;
  totalLatestNews: number;
  totalSliders: number;
  totalRegistrations: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState<string>("");
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalEvents: 0,
    totalMembers: 0,
    totalLatestNews: 0,
    totalSliders: 0,
    totalRegistrations: 0
  });

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
        setAdminName(data.admin?.name || data.admin?.email || "Admin");

        // Fetch dashboard stats
        await fetchStats();

      } catch (err) {
        console.error("Auth check error:", err);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [mounted, router]);

  const fetchStats = async () => {
    try {
      // Fetch all data in parallel
      const [newsBlogsRes, latestNewsRes, slidersRes, statsRes, registrationsRes] = await Promise.all([
        fetch("/api/admin/news-blogs", { method: "GET", credentials: "include" }),
        fetch("/api/admin/latest-news", { method: "GET", credentials: "include" }),
        fetch("/api/admin/sliders", { method: "GET", credentials: "include" }),
        fetch("/api/admin/stats", { method: "GET", credentials: "include" }).catch(() => null),
        fetch("/api/admin/registrations", { method: "GET", credentials: "include" })
      ]);

      // Handle news-blogs response
      if (newsBlogsRes.ok) {
        const newsBlogsData = await newsBlogsRes.json();
        console.log("📝 News-Blogs data:", newsBlogsData);

        // Extract stats from the response
        const totalPosts = newsBlogsData.stats?.total || 0;
        const totalEvents = newsBlogsData.stats?.byType?.event || 0;

        setStats(prev => ({
          ...prev,
          totalPosts,
          totalEvents,
        }));
      }

      // Handle latest news response - it returns an array directly
      if (latestNewsRes.ok) {
        const newsData = await latestNewsRes.json();
        console.log("📰 Latest news data:", newsData);

        // newsData is an array, so count its length
        const newsCount = Array.isArray(newsData) ? newsData.length : 0;

        setStats(prev => ({
          ...prev,
          totalLatestNews: newsCount
        }));
      }

      // Handle sliders response - it returns an array directly
      if (slidersRes.ok) {
        const slidersData = await slidersRes.json();
        console.log("🖼️ Sliders data:", slidersData);

        // slidersData is an array, so count its length
        const slidersCount = Array.isArray(slidersData) ? slidersData.length : 0;

        setStats(prev => ({
          ...prev,
          totalSliders: slidersCount
        }));
      }

      // Handle registrations response - it returns an array directly
      if (registrationsRes.ok) {
        const registrationsData = await registrationsRes.json();
        const registrationsCount = Array.isArray(registrationsData) ? registrationsData.length : 0;

        setStats(prev => ({
          ...prev,
          totalRegistrations: registrationsCount,
        }));
      }

      // Handle stats response (if exists)
      if (statsRes && statsRes.ok) {
        const statsData = await statsRes.json();
        console.log("📊 Additional stats data:", statsData);

        setStats(prev => ({
          ...prev,
          totalMembers: statsData.totalMembers || prev.totalMembers,
        }));
      }

    } catch (statsErr) {
      console.error("❌ Could not fetch stats:", statsErr);
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
      description: "Manage latest news with images stored in S3.",
      icon: Newspaper,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      count: stats.totalLatestNews,
      href: "/admin/latest-news"
    },
    {
      title: "Sliders",
      description: "Manage homepage slider images and content.",
      icon: ImageIcon, // ✅ Use ImageIcon from lucide-react
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      count: stats.totalSliders,
      href: "/admin/sliders"
    },
    {
      title: "Events",
      description: "Post and manage upcoming events.",
      icon: Calendar,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      count: stats.totalEvents,
      href: "/admin/events"
    },
    {
      title: "Members",
      description: "View and manage registered community members.",
      icon: Users,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      count: stats.totalMembers,
      href: "/admin/members"
    },
    {
      title: "Registrations",
      description: "View event registrations and download CSV.",
      icon: Users,
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      count: stats.totalRegistrations,
      href: "/admin/registrations"
    }
  ];

  if (!mounted) {
    return null;
  }

  if (loading) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome back, {adminName}!
          </h2>
          <p className="text-gray-600">
            Manage your website content and monitor site activity from this dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
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

                <button
                  onClick={() => {
                    console.log("Navigating to:", card.href);
                    router.push(card.href);
                  }}
                  className={`w-full ${card.color} ${card.hoverColor} text-white font-medium py-2 px-4 rounded-md transition-colors`}
                >
                  Manage
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}