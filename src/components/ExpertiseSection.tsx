import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Palette, Share2, Calendar, Cpu } from "lucide-react";

const expertiseAreas = [
  {
    icon: TrendingUp,
    title: "Marketing",
    description: "Strategies that work in real business.",
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Identity and meaning that truly differentiate.",
  },
  {
    icon: Share2,
    title: "SMM & Content",
    description: "Content that builds brands, not just metrics.",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Large-scale events as experiences and marketing tools.",
  },
  {
    icon: Cpu,
    title: "Digitalisation",
    description: "Creation of digital products, services, and platforms.",
  },
];

function ExpertiseCard({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: typeof TrendingUp; 
  title: string; 
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="card-premium group cursor-default"
    >
      <div className="mb-6">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="heading-card mb-3">{title}</h3>
      <p className="text-small">{description}</p>
    </motion.div>
  );
}

export function ExpertiseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="py-24 md:py-32 lg:py-40">
      <div className="section-padding">
        <div className="container-wide">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="heading-section mb-4">Ways of thinking</h2>
            <p className="text-body max-w-xl mx-auto">
              Not just services. Approaches that create lasting impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard key={area.title} {...area} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
