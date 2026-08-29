import HeroSection from "@/components/website/sections/HeroSection";
import WhyUsStatsSection from "@/components/website/sections/WhyUsStatsSection";
import EdarahServicesSection from "@/components/website/sections/EdarahServicesSection";
import EdarahSectorsSection from "@/components/website/sections/EdarahSectorsSection";
import EdarahMechanismSection from "@/components/website/sections/HowWeWorkSection";
import EdarahAboutSection from "@/components/website/sections/EdarahAboutSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EdarahAboutSection />
      <WhyUsStatsSection />
      <EdarahServicesSection />
      <EdarahSectorsSection />
      <EdarahMechanismSection />
    </>
  );
}
