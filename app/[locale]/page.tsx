import HeroSection from "@/components/website/sections/HeroSection";
import WhyUsStatsSection from "@/components/website/sections/WhyUsStatsSection";
import EdarahServicesSection from "@/components/website/sections/EdarahServicesSection";
import EdarahSectorsSection from "@/components/website/sections/EdarahSectorsSection";
import EdarahMechanismSection from "@/components/website/sections/HowWeWorkSection";
import EdarahContactSection from "@/components/website/sections/Edarahcontactsection";
import EdarahAboutSection from "@/components/website/sections/EdarahAboutSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyUsStatsSection />
      <EdarahAboutSection />
      <EdarahServicesSection />
      <EdarahSectorsSection />
      <EdarahMechanismSection />
      <EdarahContactSection />
    </>
  );
}
