import SectionHeading from "./SectionHeading";
import NewsBlogList from "./NewsBlogList";
import NewsBlogsClientFallback from "./NewsBlogsClientFallback";
import type { NewsBlogItem } from "@/lib/newsBlogs";

export default function NewsAndBlogsSection({ items }: { items: NewsBlogItem[] | null }) {
  return (
    <section aria-labelledby="news-blogs-heading" className="site-container py-14  sm:py-20">
      <SectionHeading
        id="news-blogs-heading"
        eyebrow="Stay informed"
        title="Latest news and blogs"
        description="Updates for accountants from HMRC, the profession and our community."
      />
      {/* null = the server couldn't load news in time; fetch it in the browser instead. */}
      {items === null ? <NewsBlogsClientFallback limit={6} /> : <NewsBlogList items={items} />}
    </section>
  );
}
