import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40">
      <div className="section-padding">
        <div className="container-narrow">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="heading-section mb-6">
              Let's create something meaningful
            </h2>
            <p className="text-body max-w-xl mx-auto mb-10">
              Tell us about your challenge — we'll design the solution.
            </p>
            <Button 
              size="lg" 
              className="rounded-full px-10 py-6 text-base group"
            >
              Contact us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
