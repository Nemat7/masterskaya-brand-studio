import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ApproachSection } from "@/components/ApproachSection";
import { DigitalSection } from "@/components/DigitalSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <ApproachSection />
        <DigitalSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
