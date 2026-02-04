import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Layers, Smartphone, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  { icon: Layers, labelKey: "digital.platforms" },
  { icon: Smartphone, labelKey: "digital.products" },
  { icon: Globe, labelKey: "digital.services" },
  { icon: Zap, labelKey: "digital.mvps" },
];

export function DigitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="digital" className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(220 15% 88%) 0%, transparent 70%)",
        }}
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-padding relative z-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left column - content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("digital.label")}
              </motion.span>
              <h2 className="heading-section mb-6">
                {t("digital.title")}
              </h2>
              <p className="text-body mb-10">
                {t("digital.subtitle")}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <FeatureCard key={feature.labelKey} feature={feature} index={index} isInView={isInView} />
                ))}
              </div>
            </motion.div>

            {/* Right column - visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary via-card to-secondary/50 p-8 md:p-12 flex items-center justify-center overflow-hidden">
                {/* Animated UI mockup */}
                <div className="w-full max-w-sm space-y-4 relative">
                  <motion.div 
                    className="h-8 bg-muted rounded-lg w-1/3"
                    animate={{ width: ["33%", "40%", "33%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="h-32 bg-background rounded-xl shadow-sm"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="h-24 bg-background rounded-xl shadow-sm"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div 
                      className="h-24 bg-background rounded-xl shadow-sm"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  <motion.div 
                    className="h-12 bg-primary rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-card rounded-2xl shadow-lg flex items-center justify-center"
              >
                <Zap className="w-10 h-10 text-foreground" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-2xl shadow-lg flex items-center justify-center"
              >
                <Layers className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  feature, 
  index, 
  isInView 
}: { 
  feature: { icon: typeof Layers; labelKey: string }; 
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 transition-all duration-300 hover:bg-secondary cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div animate={{ rotate: isHovered ? 15 : 0 }} transition={{ duration: 0.2 }}>
        <feature.icon className="w-5 h-5 text-foreground" />
      </motion.div>
      <span className="font-medium">{t(feature.labelKey)}</span>
    </motion.div>
  );
}
