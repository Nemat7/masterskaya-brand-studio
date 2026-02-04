import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight, Play } from "lucide-react";

import caseBranding from "@/assets/case-branding.jpg";
import caseEvent from "@/assets/case-event.jpg";
import caseDigital from "@/assets/case-digital.jpg";
import caseSmm from "@/assets/case-smm.jpg";

interface CaseStudy {
  id: string;
  titleKey: string;
  descKey: string;
  image: string;
  category: string;
  hasVideo?: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "branding",
    titleKey: "cases.brand.title",
    descKey: "cases.brand.desc",
    image: caseBranding,
    category: "Branding",
  },
  {
    id: "event",
    titleKey: "cases.event.title",
    descKey: "cases.event.desc",
    image: caseEvent,
    category: "Events",
    hasVideo: true,
  },
  {
    id: "digital",
    titleKey: "cases.digital.title",
    descKey: "cases.digital.desc",
    image: caseDigital,
    category: "Digital",
  },
  {
    id: "smm",
    titleKey: "cases.smm.title",
    descKey: "cases.smm.desc",
    image: caseSmm,
    category: "SMM",
  },
];

function CaseCard({ 
  study, 
  index 
}: { 
  study: CaseStudy;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`group cursor-pointer ${index === 0 ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3]">
        {/* Image */}
        <motion.img
          src={study.image}
          alt={t(study.titleKey)}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        />

        {/* Video play button */}
        {study.hasVideo && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-background/90 flex items-center justify-center"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 text-foreground ml-1" fill="currentColor" />
          </motion.div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <motion.span 
            className="inline-block text-xs font-medium uppercase tracking-widest text-primary-foreground/70 mb-2"
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {study.category}
          </motion.span>
          <motion.h3 
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-foreground mb-2"
            animate={{ y: isHovered ? 0 : 5 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {t(study.titleKey)}
          </motion.h3>
          <motion.p 
            className="text-sm md:text-base text-primary-foreground/80 mb-4"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {t(study.descKey)}
          </motion.p>
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-primary-foreground"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {t("cases.view")}
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function CasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="cases" className="py-24 md:py-32 lg:py-40 bg-secondary/30">
      <div className="section-padding">
        <div className="container-wide">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="heading-section mb-4">{t("cases.title")}</h2>
            <p className="text-body max-w-xl mx-auto">
              {t("cases.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {caseStudies.map((study, index) => (
              <CaseCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
