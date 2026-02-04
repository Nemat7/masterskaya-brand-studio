import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Smartphone, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Layers,
    label: "Platforms",
  },
  {
    icon: Smartphone,
    label: "Products",
  },
  {
    icon: Globe,
    label: "Services",
  },
  {
    icon: Zap,
    label: "MVPs",
  },
];

export function DigitalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="digital" className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Abstract background element */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(220 15% 90%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left column - content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 block">
                Key Focus
              </span>
              <h2 className="heading-section mb-6">
                Digital is not a service. It's a direction.
              </h2>
              <p className="text-body mb-10">
                We create digital products — services, platforms, MVPs, and user-centered solutions. From idea to a working product.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 transition-colors hover:bg-secondary"
                  >
                    <feature.icon className="w-5 h-5 text-foreground" />
                    <span className="font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column - visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary via-card to-secondary/50 p-8 md:p-12 flex items-center justify-center">
                {/* Abstract UI mockup */}
                <div className="w-full max-w-sm space-y-4">
                  <div className="h-8 bg-muted rounded-lg w-1/3" />
                  <div className="h-32 bg-background rounded-xl shadow-sm" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-background rounded-xl shadow-sm" />
                    <div className="h-24 bg-background rounded-xl shadow-sm" />
                  </div>
                  <div className="h-12 bg-primary rounded-xl" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-card rounded-2xl shadow-lg flex items-center justify-center"
              >
                <Zap className="w-8 h-8 text-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
