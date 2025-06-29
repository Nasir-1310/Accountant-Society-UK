// import FindAccountant from "@/components/FindAccountant";
// import Slider from "@/components/Slider";
import FeatureSection from "@/components/FeatureSection";
import NewsAndBlogsSection from "@/components/NewsAndBlogsSection";
import Hero from "@/components/Hero";
// import LandingPage from "@/components/LandingPage";


export default function Home() {
  return (
    <div className=" ">
      {/* <LandingPage></LandingPage> */}
      <Hero/>
      {/* <Slider></Slider> */}
      {/* <FindAccountant></FindAccountant> */}
      <FeatureSection></FeatureSection>
      <NewsAndBlogsSection></NewsAndBlogsSection>
       
    </div>
  );
}
