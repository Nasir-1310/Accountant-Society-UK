"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "./Container";

interface NewsItem {
  _id: string;
  type: "news" | "blog" | "event";
  title: string;
  category: string;
  date: string;
  description: string;
  icon: string;
  link: string;
  tags?: string[];
  isPublished?: boolean;
}

const NewsAndBlogsSection: React.FC = () => {
  const [newsBlogs, setNewsBlogs] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
      news: "📄",
      blog: "✏️",
      event: "📅"
    };
    return iconMap[type] || "📄";
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchNewsBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch("/api/news-blogs/");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const result = await res.json();
        console.log("API Response:", result); // Debug log
        
        if (result.success && Array.isArray(result.data)) {
          setNewsBlogs(result.data);
        } else {
          console.error("Unexpected response format:", result);
          setNewsBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching news/blogs:", err);
        setError(err instanceof Error ? err.message : "Failed to load content");
        setNewsBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsBlogs();
  }, []);

  if (loading) {
    return (
      <Container>
        <section className="bg-white py-10">
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Loading news and blogs...</div>
          </div>
        </section>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <section className="bg-white py-10">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg">Error: {error}</div>
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section  className="bg-white py-10">
        <div>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Latest news and blogs
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* News and Blogs List */}
          {newsBlogs.length > 0 ? (
            <div className="space-y-2">
              {newsBlogs.map((item, index) => (
                <article
                  key={item._id}
                  className="relative m-3 bg-white border border-gray-300 rounded-lg p-3 hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div data-aos="fade-up" className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-2xl">
                        {item.icon || getIcon(item.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-900 mb-0.5">
                        <Link href={item.link} className="hover:underline" target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-0.5">
                        <span className="font-medium">{item.category}</span>
                        <span className="flex items-center gap-1">
                          📅 {formatDate(item.date)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-0">
                        {item.description}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {index < newsBlogs.length - 1 && (
                    <div className="mt-8 border-b border-gray-300"></div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                No news or blogs available at the moment
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};

export default NewsAndBlogsSection;