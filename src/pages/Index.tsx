import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ApproachSection } from "@/components/ApproachSection";
import { CasesSection } from "@/components/CasesSection";
import { DigitalSection } from "@/components/DigitalSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ExpertiseSection />
          <ApproachSection />
          <CasesSection />
          <DigitalSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
