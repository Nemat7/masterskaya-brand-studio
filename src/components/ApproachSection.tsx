import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    number: "01",
    titleKey: "approach.step1",
    descKey: "approach.step1.desc",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    number: "02",
    titleKey: "approach.step2",
    descKey: "approach.step2.desc",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    number: "03",
    titleKey: "approach.step3",
    descKey: "approach.step3.desc",
    color: "from-pink-500/20 to-orange-500/20",
  },
  {
    number: "04",
    titleKey: "approach.step4",
    descKey: "approach.step4.desc",
    color: "from-orange-500/20 to-yellow-500/20",
  },
];

function StickyStep({ 
  step, 
  index, 
  totalSteps,
  progress,
}: { 
  step: typeof steps[0];
  index: number;
  totalSteps: number;
  progress: any;
}) {
  const { t } = useLanguage();
  
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, index === totalSteps - 1 ? 1 : 0]
  );
  
  const scale = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0.8, 1, 1, index === totalSteps - 1 ? 1 : 0.8]
  );

  const y = useTransform(
    progress,
    [start, start + 0.1],
    [100, 0]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className={`w-full max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br ${step.color}`}>
        <motion.div 
          className="text-8xl md:text-9xl font-bold text-foreground/10 mb-6"
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {step.number}
        </motion.div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          {t(step.titleKey)}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          {t(step.descKey)}
        </p>
      </div>
    </motion.div>
  );
}

export function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="approach" ref={containerRef} className="relative" style={{ height: `${(steps.length + 1) * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="section-padding pt-24 pb-8 text-center">
          <motion.h2 
            className="heading-section mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("approach.title")}
          </motion.h2>
          <motion.p 
            className="text-body max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("approach.subtitle")}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="section-padding">
          <div className="container-narrow">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => {
                const stepProgress = useTransform(
                  scrollYProgress,
                  [index / steps.length, (index + 0.5) / steps.length],
                  [0.3, 1]
                );
                
                return (
                  <motion.div 
                    key={step.number}
                    style={{ opacity: stepProgress }}
                    className="text-sm font-medium"
                  >
                    {step.number}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Steps container */}
        <div className="flex-1 relative section-padding">
          <div className="container-wide h-full relative">
            {steps.map((step, index) => (
              <StickyStep
                key={step.number}
                step={step}
                index={index}
                totalSteps={steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
