import FindAccountant from "@/components/FindAccountant";
import Slider from "@/components/Slider";
import FeatureSection from "@/components/FeatureSection";
import NewsAndBlogsSection from "@/components/NewsAndBlogsSection";


export default function Home() {
  return (
    <div className=" ">
      <Slider></Slider>
      <FindAccountant></FindAccountant>
      <FeatureSection></FeatureSection>
      <NewsAndBlogsSection></NewsAndBlogsSection>
       
    </div>
  );
}
