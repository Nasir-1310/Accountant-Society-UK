"use client";
// src/app/admin/sliders/page.tsx
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface SliderItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  dotColor: string;
  order: number;
  active: boolean;
}

export default function AdminSlidersPage() {
  const router = useRouter();
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState<SliderItem | null>(null);

  const fetchSliders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/sliders", {
        credentials: "include",
      });

      if (!res.ok) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json();
      setSliders(data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slider?")) return;

    try {
      const res = await fetch(`/api/admin/sliders/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setSliders(sliders.filter((item) => item.id !== id));
        alert("Slider deleted successfully!");
      } else {
        alert("Failed to delete slider");
      }
    } catch (error) {
      console.error("Error deleting slider:", error);
      alert("Error deleting slider");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sliders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Slider Management</h1>
          <p className="text-gray-600 mt-2">Manage homepage slider images and content</p>
        </div>
        <button
          onClick={() => {
            setEditingSlider(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Slide
        </button>
      </div>

      {/* Sliders List */}
      {sliders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No slider items yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add First Slide
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Order
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    URL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sliders.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                      #{item.order}
                    </td>
                    <td className="px-4 py-4">
                      <div className="relative w-32 h-16">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate mt-1">
                          {item.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <a 
                        href={item.url} 
                        target={item.url.startsWith('http') ? "_blank" : "_self"}
                        rel={item.url.startsWith('http') ? "noopener noreferrer" : ""}
                        className="text-sm text-blue-600 hover:underline truncate block max-w-[180px]"
                      >
                        {item.url}
                      </a>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.active ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => {
                            setEditingSlider(item);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <SliderFormModal
          slider={editingSlider}
          onClose={() => {
            setShowForm(false);
            setEditingSlider(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingSlider(null);
            fetchSliders();
          }}
        />
      )}
    </div>
  );
}

// Form Modal Component
function SliderFormModal({
  slider,
  onClose,
  onSuccess,
}: {
  slider: SliderItem | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: slider?.title || "",
    description: slider?.description || "",
    url: slider?.url || "",
    dotColor: slider?.dotColor || "bg-purple-500",
    order: slider?.order || 0,
    active: slider?.active ?? true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(slider?.image || "");
  const [submitting, setSubmitting] = useState(false);

  const dotColorOptions = [
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-red-500", label: "Red" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-pink-500", label: "Pink" },
  ];

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
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("url", formData.url);
      formDataToSend.append("dotColor", formData.dotColor);
      formDataToSend.append("order", formData.order.toString());
      formDataToSend.append("active", formData.active.toString());

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const url = slider
        ? `/api/admin/sliders/${slider.id}`
        : "/api/admin/sliders";
      const method = slider ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        body: formDataToSend,
      });

      if (res.ok) {
        alert(`Slider ${slider ? "updated" : "created"} successfully!`);
        onSuccess();
      } else {
        const error = await res.json();
        alert(`Failed to ${slider ? "update" : "create"} slider: ${error.error}`);
      }
    } catch (error) {
      console.error("Error submitting slider:", error);
      alert("Error submitting slider");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {slider ? "Edit Slider" : "Add New Slider"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={200}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter slider title"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              maxLength={500}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter slider description"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="/about-us or https://example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Internal link (e.g., /about-us) or external URL (e.g., https://example.com)
            </p>
          </div>

          {/* Dot Color and Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Indicator Color
              </label>
              <select
                value={formData.dotColor}
                onChange={(e) =>
                  setFormData({ ...formData, dotColor: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dotColorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-500">Preview:</span>
                <div className={`w-4 h-4 rounded-full ${formData.dotColor}`}></div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower number shows first</p>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slider Image {!slider && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              required={!slider}
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {imagePreview && (
              <div className="mt-4 relative w-full h-48">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="rounded-lg border border-gray-300 object-cover"
                />
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Recommended size: 1920x800px (16:9 aspect ratio) for best quality
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-700">
              Active (Display on homepage)
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Submitting..."
                : slider
                ? "Update Slider"
                : "Create Slider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
