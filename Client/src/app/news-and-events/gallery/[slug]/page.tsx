"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import galleryData from "@/app/data/galleryData";
import Masonry from "react-masonry-css";

// Define the gallery item type based on your data structure
type GalleryItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  imageCount: number;
};

type Props = {
  params: Promise<{ slug: string }>;
};

const GalleryDetailPage = ({ params }: Props) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        const foundGallery = galleryData.find((item) => item.slug === resolvedParams.slug);
        
        if (!foundGallery) {
          notFound();
          return;
        }
        
        setSlug(resolvedParams.slug);
        setGallery(foundGallery);
      } catch (error) {
        console.error("Error resolving params:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  if (loading) {
    return (
      <Container>
        <div className="w-full px-4 py-12 flex justify-center items-center">
          <div className="text-lg">Loading...</div>
        </div>
      </Container>
    );
  }

  if (!gallery || !slug) {
    return notFound();
  }

  // You can now get the image count dynamically from gallery data or folder
  const imageCount = gallery.imageCount || 15; // fallback to 15 if not set

  const imagePaths = Array.from(
    { length: imageCount },
    (_, i) => `/gallery/${slug}/${i + 1}.jpg`
  );

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Container>
      <div className="w-full px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span className="mx-2">|</span>
          <Link href="/news-and-events" className="hover:text-teal-600">News and Events</Link>
          <span className="mx-2">|</span>
          <Link href="/news-and-events/gallery" className="hover:text-teal-600">Gallery</Link>
          <span className="mx-2">|</span>
          <span>{gallery.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{gallery.title}</h1>
        <p className="text-gray-600 mb-6">{gallery.description}</p>
        <p className="text-xs text-gray-400 mb-8">{gallery.date}</p>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {imagePaths.map((src, index) => (
            <div key={index} className="mb-6 overflow-hidden rounded shadow-md">
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                width={600}
                height={400}
                layout="responsive"
                className="rounded w-full h-auto object-cover"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </Container>
  );
};

export default GalleryDetailPage;