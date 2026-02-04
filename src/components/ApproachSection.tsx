import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Understand the business",
    description: "Deep dive into your goals, market, and challenges.",
  },
  {
    number: "02",
    title: "Design the solution",
    description: "Strategic and creative frameworks tailored to you.",
  },
  {
    number: "03",
    title: "Create and launch",
    description: "Execution with precision and attention to detail.",
  },
  {
    number: "04",
    title: "Develop and scale",
    description: "Continuous improvement and growth support.",
  },
];

function StepItem({ 
  number, 
  title, 
  description, 
  index,
  isLast
}: { 
  number: string; 
  title: string; 
  description: string;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
          {number}
        </div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="w-px flex-1 bg-border origin-top my-4"
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 ${isLast ? '' : ''}`}>
        <h3 className="heading-card mb-2">{title}</h3>
        <p className="text-small max-w-md">{description}</p>
      </div>
    </motion.div>
  );
}

export function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="approach" className="py-24 md:py-32 lg:py-40 bg-secondary/50">
      <div className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left column - heading */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <h2 className="heading-section mb-6">
                We approach projects as products
              </h2>
              <p className="text-body max-w-lg">
                Every engagement is treated with the same rigor and care we'd give to building our own business.
              </p>
            </motion.div>

            {/* Right column - steps */}
            <div>
              {steps.map((step, index) => (
                <StepItem 
                  key={step.number} 
                  {...step} 
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
