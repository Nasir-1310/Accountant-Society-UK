// src/components/admin/NewsListView.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  type: 'news' | 'blog' | 'event';
  category: string;
  date: string;
  description: string;
  icon: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  byType: {
    news: number;
    blog: number;
    event: number;
  };
}

export default function NewsListView() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    page: 1,
    limit: 20
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.type) params.append('type', filters.type);
        params.append('page', filters.page.toString());
        params.append('limit', filters.limit.toString());

        const response = await fetch(`/api/admin/news-blogs?${params}`);
        const result = await response.json();

        if (result.success) {
          setPosts(result.data);
          setStats(result.stats);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]);

  const refetchPosts = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      params.append('page', filters.page.toString());
      params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/admin/news-blogs?${params}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/news-blogs/${postId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        alert('Post deleted successfully');
        refetchPosts();
      } else {
        alert(result.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News & Blogs Management</h1>
        <button
          onClick={() => router.push('/admin/news-blogs/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Post
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Posts</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">News</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.byType.news}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Blogs</h3>
            <p className="text-2xl font-bold text-green-600">{stats.byType.blog}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Events</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.byType.event}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value, page: 1 }))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="news">News</option>
            <option value="blog">Blog</option>
            <option value="event">Event</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title & Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                {/* Title & Description */}
                <td className="px-6 py-4 whitespace-normal">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{post.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {post.description}
                      </p>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xs hover:underline"
                      >
                        View Source
                      </a>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {post.category}
                </td>

                {/* Type */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    post.type === 'news' ? 'bg-blue-100 text-blue-800' :
                    post.type === 'blog' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {post.type.toUpperCase()}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4  text-sm text-gray-500">
                  {post.date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/admin/news-blogs/edit/${post._id}`)}
                      className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found. Create your first post!</p>
        </div>
      )}
    </div>
  );
}