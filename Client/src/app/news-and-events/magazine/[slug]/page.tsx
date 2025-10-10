// ============================================
// FILE 3: src/app/news-and-events/magazine/[slug]/page.tsx
// ============================================

import Container from "@/components/Container";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import magazines from "@/app/data/magazines";
import { FileText } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Helper function to convert Google Drive link to embed URL
function getGoogleDriveEmbedUrl(url: string): string {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const magazine = magazines.find(
    (mag) =>
      mag.slug.toLowerCase() ===
      decodeURIComponent(resolvedParams.slug).toLowerCase()
  );

  if (!magazine) {
    return {
      title: "Magazine Not Found | TPAS",
      description: "The requested magazine could not be found.",
    };
  }

  return {
    title: `${magazine.title} | TPAS Magazine`,
    description: magazine.description,
    openGraph: {
      title: `${magazine.title} | TPAS Magazine`,
      description: magazine.description,
      url: `https://www.accountantssociety.org/news-and-events/magazine/${magazine.slug}`,
      type: "article",
      images: [
        {
          url: magazine.cover,
          width: 1200,
          height: 630,
          alt: magazine.title,
        },
      ],
    },
  };
}

export default async function MagazineDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const magazine = magazines.find(
    (mag) =>
      mag.slug.toLowerCase() ===
      decodeURIComponent(resolvedParams.slug).toLowerCase()
  );

  if (!magazine) return notFound();

  // Convert Google Drive link to embed format
  const embedUrl = getGoogleDriveEmbedUrl(magazine.pdf);

  return (
    <Container>
      <div className="mx-3 px-5 border-l border-r border-gray-200 bg-white">
        <main className="w-full py-20 max-w-full">
          {/* Breadcrumbs */}
          <div
            data-aos="fade-up"
            className="text-[10px] md:text-sm text-gray-500 mb-6"
          >
            <Link href="/" className="hover:text-teal-600">
              Home
            </Link>
            <span className="mx-2">|</span>
            <Link href="/news-and-events" className="hover:text-teal-600">
              News & Events
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/news-and-events/magazine"
              className="hover:text-teal-600"
            >
              Magazine
            </Link>
            <span className="mx-2">|</span>
            <span className="text-gray-700">{magazine.title}</span>
          </div>

          {/* Header */}
          <div data-aos="fade-up" className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {magazine.title}
            </h2>
            <div className="flex justify-center items-center text-sm text-gray-500 mb-4">
              <FileText className="w-4 h-4 mr-2 text-teal-600" />
              {new Date(magazine.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
              {magazine.description}
            </p>
          </div>

          {/* Embedded PDF Viewer - Google Drive Preview */}
          <div
            data-aos="fade-up"
            className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg bg-gray-50"
          >
            <iframe
              src={embedUrl}
              className="w-full h-[85vh] min-h-[600px]"
              style={{
                border: "none",
              }}
              title={magazine.title}
              allow="autoplay"
            />
          </div>

          {/* Info Note */}
          <div data-aos="fade-up" className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> This magazine is displayed in read-only mode. 
              Download and print options are controlled by document settings.
            </p>
          </div>

          {/* Back Button */}
          <div data-aos="fade-up" className="text-center mt-10">
            <Link
              href="/news-and-events/magazine"
              className="inline-block text-sm font-medium text-white bg-teal-600 px-6 py-3 rounded-xl shadow hover:bg-teal-700 transition"
            >
              ← Back to Magazines
            </Link>
          </div>
        </main>
      </div>
    </Container>
  );
}