import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play } from "lucide-react";

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

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[87vw] md:w-[80vw] lg:w-[75vw] snap-center"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-foreground aspect-[16/9]">
        <img
          src={study.image}
          alt={t(study.titleKey)}
          className="w-full h-full object-cover"
        />

        {/* Video play button */}
        {study.hasVideo && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center">
            <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
          </div>
        )}

        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <p className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-background leading-tight max-w-2xl">
            {t(study.titleKey)}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export function CasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / caseStudies.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  return (
    <section id="cases" className="py-24 md:py-32 lg:py-40 bg-background">
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
            <p className="text-body max-w-xl mx-auto">{t("cases.subtitle")}</p>
          </motion.div>
        </div>
      </div>

      {/* Apple-style horizontal media gallery */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "calc((100vw - 87vw) / 2)",
          paddingRight: "calc((100vw - 87vw) / 2)",
        }}
      >
        {caseStudies.map((study, index) => (
          <CaseCard key={study.id} study={study} index={index} />
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {caseStudies.map((_, index) => (
          <motion.div
            key={index}
            className="h-2 rounded-full bg-foreground"
            animate={{
              width: index === activeIndex ? 32 : 8,
              opacity: index === activeIndex ? 1 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  );
}
