import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";
import galleryData from "@/app/data/galleryData";
import { Square_Button } from "@/components/Square_Button";

const GalleryPage = () => {
  return (
    <Container>
      <div className="w-full px-4 py-12">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">|</span>
          <Link href="/events" className="hover:text-teal-600 transition-colors">
            News and Events
          </Link>
          <span className="mx-2">|</span>
          <span>Gallery</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Gallery
          </h1>
          <p className="text-gray-600">
            Explore memories from our past events, tours, and member gatherings.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {galleryData.map((item) => (
            <div
              key={item.slug}
              className="bg-gray-300 border rounded-lg shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* Fixed aspect ratio container */}
              <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-gray-500 text-xs mb-4">{item.date}</p>
                <Link href={`/news-and-events/gallery/${item.slug}`}>
                  <Square_Button>
                         View Details
                  </Square_Button>
                   
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default GalleryPage;