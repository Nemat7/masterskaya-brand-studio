import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, Palette, Share2, Calendar, Cpu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const expertiseAreas = [
  {
    icon: TrendingUp,
    titleKey: "expertise.marketing",
    descKey: "expertise.marketing.desc",
  },
  {
    icon: Palette,
    titleKey: "expertise.branding",
    descKey: "expertise.branding.desc",
  },
  {
    icon: Share2,
    titleKey: "expertise.smm",
    descKey: "expertise.smm.desc",
  },
  {
    icon: Calendar,
    titleKey: "expertise.events",
    descKey: "expertise.events.desc",
  },
  {
    icon: Cpu,
    titleKey: "expertise.digital",
    descKey: "expertise.digital.desc",
  },
];

function ExpertiseCard({ 
  icon: Icon, 
  titleKey, 
  descKey, 
  index 
}: { 
  icon: typeof TrendingUp; 
  titleKey: string; 
  descKey: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="card-premium group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="mb-6"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          animate={{ rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </motion.div>
      <motion.h3 
        className="heading-card mb-3"
        animate={{ x: isHovered ? 5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {t(titleKey)}
      </motion.h3>
      <p className="text-small">{t(descKey)}</p>
    </motion.div>
  );
}

export function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="expertise" className="py-24 md:py-32 lg:py-40">
      <div className="section-padding">
        <div className="container-wide">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="heading-section mb-4">{t("expertise.title")}</h2>
            <p className="text-body max-w-xl mx-auto">
              {t("expertise.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard 
                key={area.titleKey} 
                icon={area.icon}
                titleKey={area.titleKey}
                descKey={area.descKey}
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
