import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItemProps {
  value: number;
  suffix: string;
  labelKey: string;
  delay: number;
}

function AnimatedCounter({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0;
        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(easeOutQuart * value);
          
          setDisplayValue(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

function StatItem({ value, suffix, labelKey, delay }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: delay * 0.1 }}
      className="text-center group"
    >
      <motion.div 
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <AnimatedCounter value={value} suffix={suffix} delay={delay * 100} />
      </motion.div>
      <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-medium">
        {t(labelKey)}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: 150, suffix: "+", labelKey: "stats.projects" },
  { value: 50, suffix: "+", labelKey: "stats.clients" },
  { value: 8, suffix: "", labelKey: "stats.years" },
  { value: 25, suffix: "", labelKey: "stats.team" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--secondary)) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-padding relative z-10">
        <div className="container-wide">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="heading-section mb-4">{t("stats.title")}</h2>
            <p className="text-body max-w-xl mx-auto">
              {t("stats.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <StatItem key={stat.labelKey} {...stat} delay={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
