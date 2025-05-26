import FindAccountant from "@/components/FindAccountant";
import Slider from "@/components/Slider";
import TopNews from "@/components/TopNews";
import FeatureSection from "@/components/FeatureSection";
import NewsAndBlogsSection from "@/components/NewsAndBlogsSection";


export default function Home() {
  return (
    <div className=" ">
      <TopNews></TopNews>
      <Slider></Slider>
      <FindAccountant></FindAccountant>
      <FeatureSection></FeatureSection>
      <NewsAndBlogsSection></NewsAndBlogsSection>
       
    </div>
  );
}
