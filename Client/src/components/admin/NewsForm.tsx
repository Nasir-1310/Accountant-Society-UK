// src/components/admin/NewsForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NewsFormData {
  type: "news" | "blog" | "event";
  title: string;
  category: string;
  date: string; // string format like "23rd May 2025"
  description: string;
  icon: string;
  link: string;
}

interface NewsFormProps {
  postId?: string;
  initialData?: Partial<NewsFormData>;
}

export default function NewsForm({ postId, initialData }: NewsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NewsFormData>({
    type: "news",
    title: "",
    category: "",
    date: "",
    description: "",
    icon: "📄",
    link: "",
    ...initialData,
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId || initialData) return;
      
      try {
        const response = await fetch(`/api/admin/news-blogs/${postId}`, {
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setFormData({
            type: result.data.type,
            title: result.data.title,
            category: result.data.category,
            date: result.data.date,
            description: result.data.description,
            icon: result.data.icon || "📄",
            link: result.data.link || "",
          });
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Failed to fetch post data");
      }
    };

    fetchPost();
  }, [postId, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = postId
        ? `/api/admin/news-blogs/${postId}`
        : "/api/admin/news-blogs/create";
      const method = postId ? "PUT" : "POST";

      const payload = {
        title: formData.title,
        type: formData.type,
        category: formData.category,
        date: formData.date,
        description: formData.description,
        icon: formData.icon,
        link: formData.link,
        isPublished: false, // default false, can add checkbox later
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies for auth
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        router.push("/admin/news-blogs");
      } else {
        alert(result.error || "Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">
          {postId ? "Edit" : "Create New"}{" "}
          {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as "news" | "blog" | "event",
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="news">News</option>
              <option value="blog">Blog</option>
              <option value="event">Event</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, icon: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="📄"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              External Link *
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/article"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : postId ? "Update" : "Create"}{" "}
              {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/news-blogs")}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}