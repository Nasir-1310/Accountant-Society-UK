"use client";

import { useEffect, useState } from "react";
import NewsBlogList from "./NewsBlogList";
import type { NewsBlogItem } from "@/lib/newsBlogs";

type ApiItem = Omit<NewsBlogItem, "id" | "tags"> & { _id: string; tags?: string[] };

/**
 * Loads news in the browser when the server couldn't (e.g. a slow first
 * database connection), so visitors still see the latest posts.
 */
export default function NewsBlogsClientFallback({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = useState<NewsBlogItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/news-blogs?limit=${limit}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((result) => {
        if (cancelled) return;
        const data: ApiItem[] = Array.isArray(result?.data) ? result.data : [];
        setItems(data.map(({ _id, tags, ...rest }) => ({ ...rest, id: _id, tags: tags || [] })));
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (failed) {
    return (
      <p className="card px-6 py-10 text-center text-slate-600">
        News and blogs are temporarily unavailable. Please check back shortly.
      </p>
    );
  }

  if (!items) {
    return (
      <ul aria-busy="true" aria-label="Loading news" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="card h-56 animate-pulse p-6">
            <div className="h-5 w-20 rounded-full bg-slate-100" />
            <div className="mt-5 h-5 w-4/5 rounded bg-slate-100" />
            <div className="mt-3 h-4 w-full rounded bg-slate-100" />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
          </li>
        ))}
      </ul>
    );
  }

  return <NewsBlogList items={items} />;
}
