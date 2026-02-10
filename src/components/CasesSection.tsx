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

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-foreground aspect-[4/3]">
        {/* Image */}
        <motion.img
          src={study.image}
          alt={t(study.titleKey)}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Caption overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <motion.span
            className="inline-block text-xs font-medium uppercase tracking-widest text-background/60 mb-2"
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {study.category}
          </motion.span>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-background leading-tight"
            animate={{ y: isHovered ? 0 : 5 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {t(study.titleKey)}
          </motion.p>
          <motion.p
            className="text-sm md:text-base text-background/70 mt-2 max-w-md"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {t(study.descKey)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export function CasesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory px-[7.5vw] pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {caseStudies.map((study, index) => (
          <CaseCard key={study.id} study={study} index={index} />
        ))}
      </div>
    </section>
  );
}
