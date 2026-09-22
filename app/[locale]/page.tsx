import HeroSection from "@/components/website/sections/HeroSection";
import PeopleQualitySection from "@/components/website/sections/PeopleQualitySection";
import SpecializedEnvironmentsSection from "@/components/website/sections/SpecializedEnvironmentsSection";
import Proposaldownload from "@/components/website/sections/Proposaldownload";
import CallToAction from "@/components/website/sections/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PeopleQualitySection />
      <SpecializedEnvironmentsSection />
      <Proposaldownload />
      <CallToAction />
    </>
  );
}
