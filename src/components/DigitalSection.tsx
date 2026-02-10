import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Layers, Smartphone, Globe, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  { icon: Layers, labelKey: "digital.platforms", id: "platforms" },
  { icon: Smartphone, labelKey: "digital.products", id: "products" },
  { icon: Globe, labelKey: "digital.services", id: "services" },
  { icon: Zap, labelKey: "digital.mvps", id: "mvps" },
];

// Different animated mockups for each feature
function PlatformsMockup() {
  return (
    <div className="w-full max-w-sm space-y-3 relative">
      {/* Browser window */}
      <motion.div className="bg-background rounded-xl shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50">
          <div className="w-2 h-2 rounded-full bg-destructive/60" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-2 h-2 rounded-full bg-primary/20" />
          <div className="flex-1 h-4 bg-background rounded ml-2" />
        </div>
        <div className="p-4 space-y-3">
          <motion.div className="h-6 bg-muted rounded w-2/3"
            animate={{ width: ["60%", "75%", "60%"] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.div className="h-20 bg-secondary rounded-lg"
            animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 4, repeat: Infinity }} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="h-12 bg-muted/50 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
            ))}
          </div>
        </div>
      </motion.div>
      {/* DB icon floating */}
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-2 -right-2 w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center">
        <Layers className="w-5 h-5 text-foreground" />
      </motion.div>
    </div>
  );
}

function ProductsMockup() {
  return (
    <div className="w-full max-w-[200px] mx-auto relative">
      {/* Phone frame */}
      <motion.div className="bg-background rounded-[24px] shadow-lg border-4 border-muted overflow-hidden"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-2" />
        <div className="p-3 space-y-2 mt-2">
          <motion.div className="h-28 bg-secondary rounded-xl"
            animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }} />
          <motion.div className="h-5 bg-muted rounded w-3/4"
            animate={{ width: ["70%", "85%", "70%"] }} transition={{ duration: 2.5, repeat: Infinity }} />
          <motion.div className="h-4 bg-muted/50 rounded w-1/2" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <motion.div className="h-16 bg-secondary rounded-lg"
              animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="h-16 bg-secondary rounded-lg"
              animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
          </div>
          <motion.div className="h-10 bg-primary rounded-xl mt-2"
            animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
        <div className="h-1 w-24 bg-muted rounded-full mx-auto my-2" />
      </motion.div>
      <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-4 -right-6 w-14 h-14 bg-card rounded-2xl shadow-lg flex items-center justify-center">
        <Smartphone className="w-6 h-6 text-foreground" />
      </motion.div>
    </div>
  );
}

function ServicesMockup() {
  return (
    <div className="w-full max-w-sm space-y-4 relative">
      {/* API endpoints */}
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          className="bg-background rounded-xl shadow-sm p-4 flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.15 }}>
          <motion.div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-blue-400' : 'bg-amber-400'}`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
          <div className="flex-1 space-y-1.5">
            <motion.div className="h-3 bg-muted rounded w-1/2" />
            <motion.div className="h-2 bg-muted/40 rounded w-3/4"
              animate={{ width: ["70%", "90%", "70%"] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }} />
          </div>
          <motion.div className="h-6 w-14 bg-secondary rounded text-[10px] flex items-center justify-center text-muted-foreground font-mono"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
            200
          </motion.div>
        </motion.div>
      ))}
      <motion.div animate={{ x: [0, -5, 0], y: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -bottom-4 -left-4 w-14 h-14 bg-primary rounded-2xl shadow-lg flex items-center justify-center">
        <Globe className="w-6 h-6 text-primary-foreground" />
      </motion.div>
    </div>
  );
}

function MvpsMockup() {
  return (
    <div className="w-full max-w-sm space-y-4 relative">
      {/* Kanban-like board */}
      <div className="grid grid-cols-3 gap-3">
        {["To Do", "In Progress", "Done"].map((label, col) => (
          <div key={label} className="space-y-2">
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-center">{label}</div>
            {[0, 1].map(row => (
              <motion.div key={row}
                className="h-14 bg-background rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: col * 0.1 + row * 0.15 }}>
                <div className="p-2 space-y-1">
                  <motion.div className="h-2 bg-muted rounded w-4/5" />
                  <motion.div className="h-1.5 bg-muted/40 rounded w-3/5" />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <motion.div className="h-2 bg-secondary rounded-full overflow-hidden mt-4">
        <motion.div className="h-full bg-primary rounded-full"
          animate={{ width: ["20%", "75%", "20%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
      <motion.div animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-14 h-14 bg-card rounded-2xl shadow-lg flex items-center justify-center">
        <Zap className="w-6 h-6 text-foreground" />
      </motion.div>
    </div>
  );
}

const mockupComponents: Record<string, React.FC> = {
  platforms: PlatformsMockup,
  products: ProductsMockup,
  services: ServicesMockup,
  mvps: MvpsMockup,
};

export function DigitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const ActiveMockup = activeFeature ? mockupComponents[activeFeature] : null;

  return (
    <section id="digital" className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(220 15% 88%) 0%, transparent 70%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
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
              <h2 className="heading-section mb-6">{t("digital.title")}</h2>
              <p className="text-body mb-10">{t("digital.subtitle")}</p>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeFeature === feature.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 hover:bg-secondary"
                    }`}
                    onClick={() => setActiveFeature(prev => prev === feature.id ? null : feature.id)}
                  >
                    <motion.div animate={{ rotate: activeFeature === feature.id ? 15 : 0 }} transition={{ duration: 0.2 }}>
                      <feature.icon className={`w-5 h-5 ${activeFeature === feature.id ? "text-primary-foreground" : "text-foreground"}`} />
                    </motion.div>
                    <span className="font-medium">{t(feature.labelKey)}</span>
                  </motion.div>
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
                <AnimatePresence mode="wait">
                  {ActiveMockup ? (
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="w-full flex items-center justify-center"
                    >
                      <ActiveMockup />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-sm space-y-4 relative"
                    >
                      <motion.div className="h-8 bg-muted rounded-lg w-1/3"
                        animate={{ width: ["33%", "40%", "33%"] }}
                        transition={{ duration: 3, repeat: Infinity }} />
                      <motion.div className="h-32 bg-background rounded-xl shadow-sm"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 4, repeat: Infinity }} />
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div className="h-24 bg-background rounded-xl shadow-sm"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
                        <motion.div className="h-24 bg-background rounded-xl shadow-sm"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                      </div>
                      <motion.div className="h-12 bg-primary rounded-xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
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
