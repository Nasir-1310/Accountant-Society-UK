// src/app/news-and-events/gallery/[slug]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import galleryData, { type GalleryItem } from "@/app/data/galleryData";
import Masonry from "react-masonry-css";
import { getImagesFromFolder, type DriveImage } from "@/lib/googleDrive";

type Props = {
  params: Promise<{ slug: string }>;
};

const GalleryDetailPage = ({ params }: Props) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<DriveImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        const foundGallery = galleryData.find(
          (item) => item.slug === resolvedParams.slug
        );

        if (!foundGallery) {
          notFound();
          return;
        }

        setSlug(resolvedParams.slug);
        setGallery(foundGallery);

        // Fetch images from Google Drive folder
        const folderImages = await getImagesFromFolder(
          foundGallery.googleDriveFolderId
        );

        if (folderImages.length === 0) {
          setError(
            "No images found. Please check folder permissions and API key."
          );
        }

        setImages(folderImages);
      } catch (error) {
        console.error("Error resolving params:", error);
        setError("Failed to load gallery. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (loading) {
    return (
      <Container>
        <div className="w-full px-4 py-12 flex justify-center items-center min-h-screen">
          <div className="text-lg text-gray-600">Loading gallery...</div>
        </div>
      </Container>
    );
  }

  if (!gallery || !slug) {
    return notFound();
  }

  return (
    <Container>
      <div className="w-full px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600">
            Home
          </Link>
          <span className="mx-2">|</span>
          <Link href="/news-and-events" className="hover:text-teal-600">
            News and Events
          </Link>
          <span className="mx-2">|</span>
          <Link href="/news-and-events/gallery" className="hover:text-teal-600">
            Gallery
          </Link>
          <span className="mx-2">|</span>
          <span>{gallery.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          {gallery.title}
        </h1>
        <p className="text-gray-600 mb-6">{gallery.description}</p>
        <p className="text-xs text-gray-400 mb-8">{gallery.date}</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Images */}
        {images.length === 0 && !error ? (
          <p className="text-gray-500">No images found in this gallery.</p>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="mb-6 overflow-hidden rounded shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={image.url}
                  alt={image.name || `Photo ${index + 1}`}
                  width={600}
                  height={400}
                  className="rounded w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </Container>
  );
};

export default GalleryDetailPage;