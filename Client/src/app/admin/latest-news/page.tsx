"use client";
//src/app/admin/latest-news/page.tsx
import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, Image as ImageIcon, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";

interface NewsItem {
  id: string; // Changed from _id to id
  title: string;
  description: string;
  date: string;
  image: string;
  link?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminLatestNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split('T')[0],
    link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/latest-news");
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("✅ Fetched news:", data);
      setNews(data); // Backend returns array directly
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      alert("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("date", formData.date);
      if (formData.link) form.append("link", formData.link);
      if (imageFile) form.append("image", imageFile);

      const url = editingItem
        ? `/api/admin/latest-news/${editingItem.id}` // Changed from _id to id
        : "/api/admin/latest-news";
      const method = editingItem ? "PUT" : "POST";

      console.log(`📤 ${method} request to:`, url);

      const res = await fetch(url, { method, body: form });
      const data = await res.json();

      console.log("📥 Response:", data);

      // Backend returns the news object directly, not wrapped in {success: true}
      if (res.ok) {
        alert(`✅ ${editingItem ? "Updated" : "Created"} successfully!`);
        closeModal();
        fetchNews();
      } else {
        alert(`❌ Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("❌ An error occurred");
      console.error("❌ Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      date: new Date(item.date).toISOString().split('T')[0],
      link: item.link || "",
    });
    setImagePreview(item.image);
    setShowModal(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    console.log("🗑️ Deleting news with ID:", id);
    setDeleteLoading(id);
    
    try {
      const res = await fetch(`/api/admin/latest-news/${id}`, { 
        method: "DELETE" 
      });
      
      const data = await res.json();
      console.log("📥 Delete response:", data);

      // Backend returns {message: "..."} on success, not {success: true}
      if (res.ok) {
        alert("✅ Deleted successfully!");
        fetchNews();
      } else {
        alert(`❌ Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("❌ Failed to delete");
      console.error("❌ Delete error:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ 
      title: "", 
      description: "", 
      date: new Date().toISOString().split('T')[0], 
      link: "" 
    });
    setImageFile(null);
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Latest News</h1>
            <p className="text-gray-600 mt-1">Manage latest news items with images</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add News
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm flex items-center gap-1 mb-4 hover:text-blue-800"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Link
                  </a>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    disabled={deleteLoading === item.id}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deleteLoading === item.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No news items yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Create your first news item
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingItem ? "Edit News" : "Add New News"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image {editingItem ? "(Leave empty to keep current)" : "*"}
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={!editingItem}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 800x500px or 1200x675px, JPEG/PNG/WebP, max 5MB
                    </p>
                  </div>

                  {imagePreview && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Saving..." : editingItem ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}