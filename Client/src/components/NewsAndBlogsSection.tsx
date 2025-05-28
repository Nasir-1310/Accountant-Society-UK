"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useState } from "react";
 import { ChangeEvent } from 'react';
=======
import { useState, ChangeEvent } from "react";
>>>>>>> 70f07fa7e0caf949b6a23b80ed723c61d9a09c84

interface NewsItem {
  id: number;
  type: "news" | "blog" | "event";
  title: string;
  category: string;
  date: string;
  description: string;
  icon: string;
  link: string;
  tags?: string[];
}

interface FormData {
  type: "news" | "blog" | "event";
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string;
  link: string;
}

interface NewsAndBlogsSectionProps {
  isAdmin?: boolean;
  userRole?: string;
}




const initialNewsBlogs: NewsItem[] = [
  {
    id: 1,
    type: "news",
    title: "Concerned about a compliance check? Use our new tool to find support and what to do next.",
    category: "Government News",
    date: "23rd May 2025",
    description: "HMRCs new free online Interactive Compliance Guidance tool can help businesses and individuals understand HMRC compliance checks.",
    icon: "📄",
    link: "https://www.gov.uk/government/news/hmrc-launches-new-online-interactive-help-for-compliance-checks"
  },
  {
    id: 2,
    type: "blog",
    title: "Sole traders and landlords urged to act now, with one year until Making Tax Digital for Income Tax launches",
    category: "News",
    date: "20th May 2025",
    description: "Making Tax Digital for Income Tax starts in April 2026 for sole traders and landlords with qualifying income over £50,000.",
    icon: "✏️",
    link: "https://www.gov.uk/government/news/one-year-until-making-tax-digital-for-income-tax-launches"
  },
  {
    id: 3,
    type: "event",
    title: "Child Benefit boost for millions of families",
    category: "News",
    date: "27th May 2025 09:30 - 12:00",
    description: "Join us this May for our annual Wills, Trusts and Executries Conference.",
    tags: ["CPD & training events", "Conference", "Wills, executries and trusts", "Civil court work"],
    icon: "📅",
    link: "https://www.gov.uk/government/news/child-benefit-boost-for-millions-of-families"
  }
];

const NewsAndBlogsSection: React.FC<NewsAndBlogsSectionProps> = ({ 
  isAdmin = false, 
  userRole = "user" 
}) => {
  const [newsBlogs, setNewsBlogs] = useState<NewsItem[]>(initialNewsBlogs);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    type: "news",
    title: "",
    category: "",
    date: "",
    description: "",
    tags: "",
    link: ""
  });

  // Check if user has admin privileges
  const hasAdminAccess = isAdmin || userRole === "admin" || userRole === "super_admin";

  const typeOptions = [
    { value: "news" as const, label: "News", icon: "📄" },
    { value: "blog" as const, label: "Blog", icon: "✏️" },
    { value: "event" as const, label: "Event", icon: "📅" }
  ];

<<<<<<< HEAD
  const getIcon = (type: string) => {
  const typeOption = typeOptions.find(option => option.value === type);
  return typeOption ? typeOption.icon : "📄";
};


 

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};

=======
  const getIcon = (type: string): string => {
    const typeOption = typeOptions.find(option => option.value === type);
    return typeOption ? typeOption.icon : "📄";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
>>>>>>> 70f07fa7e0caf949b6a23b80ed723c61d9a09c84

  const handleAddItem = () => {
    if (!formData.title || !formData.category || !formData.date || !formData.description) return;
    
    const newItem: NewsItem = {
      ...formData,
      id: Date.now(),
      icon: getIcon(formData.type),
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
    };
    
    setNewsBlogs(prev => [newItem, ...prev]);
    resetForm();
  };

  const handleEditItem = (item: NewsItem) => {
    setEditingItem(item.id);
    setFormData({
      ...item,
      tags: item.tags ? item.tags.join(', ') : ''
    });
    setShowAddForm(true);
  };

  const handleUpdateItem = () => {
    if (editingItem === null) return;
    
    setNewsBlogs(prev => 
      prev.map(item => 
        item.id === editingItem 
          ? { 
              ...formData, 
              id: editingItem, 
              icon: getIcon(formData.type),
              tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
            }
          : item
      )
    );
    resetForm();
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setNewsBlogs(prev => prev.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
    setFormData({
      type: "news",
      title: "",
      category: "",
      date: "",
      description: "",
      tags: "",
      link: ""
    });
  };

  const formatDate = (dateString: string): string => {
    // Handle both simple dates and date ranges
    return dateString.includes('-') ? dateString : dateString;
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-[100px]">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Latest news and blogs
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Admin Controls */}
        {hasAdminAccess && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Content Management</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Role: {userRole}
              </span>
            </div>
            
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <span>+</span> Add News/Blog/Event
              </button>
            ) : (
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-medium mb-4">
                  {editingItem ? "Edit Item" : "Add New Item"}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {typeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g., Law Society news)"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="date"
                    placeholder="Date (e.g., 23rd May 2025)"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <input
                    type="text"
                    name="link"
                    placeholder="Link URL"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma-separated, for events only)"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={editingItem ? handleUpdateItem : handleAddItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-200 font-medium"
                  >
                    {editingItem ? "Update" : "Add"} Item
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors duration-200 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* News and Blogs List */}
        <div className="space-y-8">
          {newsBlogs.map((item, index) => (
            <article 
              key={item.id}
              className="relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Admin Controls */}
              {hasAdminAccess && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-sm"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-sm"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-800 mb-2">
                    <Link href={item.link} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="font-medium">{item.category}</span>
                    <span className="flex items-center gap-1">
                      📅 {formatDate(item.date)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags (for events) */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Separator line (except for last item) */}
              {index < newsBlogs.length - 1 && (
                <div className="mt-8 border-b border-gray-200"></div>
              )}
            </article>
          ))}
        </div>

        {/* Empty State */}
        {newsBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No news or blogs available</div>
            {hasAdminAccess && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-200 font-medium"
              >
                Add Your First Item
              </button>
            )}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {/* {newsBlogs.length > 0 && !hasAdminAccess && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors duration-200 font-medium">
              Load More News
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default NewsAndBlogsSection;