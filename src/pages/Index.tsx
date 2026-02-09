import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { StatsSection } from "@/components/StatsSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ApproachSection } from "@/components/ApproachSection";
import { CasesSection } from "@/components/CasesSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { TeamSection } from "@/components/TeamSection";
import { DigitalSection } from "@/components/DigitalSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        
        <ScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <ClientsMarquee />
          <StatsSection />
          <ExpertiseSection />
          <ApproachSection />
          <CasesSection />
          <ShowcaseSection />
          <TeamSection />
          <DigitalSection />
          <CTASection />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </LanguageProvider>
  );
};

export default Index;
