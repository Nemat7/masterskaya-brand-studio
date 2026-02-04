import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    number: "01",
    titleKey: "approach.step1",
    descKey: "approach.step1.desc",
  },
  {
    number: "02",
    titleKey: "approach.step2",
    descKey: "approach.step2.desc",
  },
  {
    number: "03",
    titleKey: "approach.step3",
    descKey: "approach.step3.desc",
  },
  {
    number: "04",
    titleKey: "approach.step4",
    descKey: "approach.step4.desc",
  },
];

function StepItem({ 
  number, 
  titleKey, 
  descKey, 
  index,
  isLast
}: { 
  number: string; 
  titleKey: string; 
  descKey: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="relative flex gap-6 md:gap-10 group"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0 transition-all duration-300 group-hover:scale-110"
          whileHover={{ rotate: 10 }}
        >
          {number}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-px flex-1 bg-border origin-top my-4"
          />
        )}
      </div>

      {/* Content */}
      <motion.div 
        className={`pb-14 ${isLast ? '' : ''}`}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="heading-card mb-2">{t(titleKey)}</h3>
        <p className="text-small max-w-md">{t(descKey)}</p>
      </motion.div>
    </motion.div>
  );
}

export function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="approach" className="py-24 md:py-32 lg:py-40 bg-secondary/50">
      <div className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left column - heading */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <h2 className="heading-section mb-6">
                {t("approach.title")}
              </h2>
              <p className="text-body max-w-lg">
                {t("approach.subtitle")}
              </p>
            </motion.div>

            {/* Right column - steps */}
            <div>
              {steps.map((step, index) => (
                <StepItem 
                  key={step.number} 
                  number={step.number}
                  titleKey={step.titleKey}
                  descKey={step.descKey}
                  index={index}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
