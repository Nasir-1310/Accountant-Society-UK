import Link from "next/link";
import Image from "next/image";
import featureCards from "@/app/data/featureCards";

const FeatureSection = () => {
  return (
    <section aria-label="Quick links" className="site-container">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {featureCards.map((card) => (
          <li key={card.id}>
            <Link
              href={card.link}
              className="card card-hover group flex h-full flex-col overflow-hidden"
            >
              <div className={`relative overflow-hidden ${card.bgColor}`} style={{ aspectRatio: "400 / 250" }}>
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col items-start p-6">
                <h3 className={`text-xl font-semibold ${card.titleColor} group-hover:underline`}>{card.title}</h3>
                <span className="mt-4 inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-900 transition-colors group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-white">
                  {card.buttonText}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeatureSection;
