import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(40 20% 96%) 0%, transparent 50%)",
        }}
      />
      
      <div className="section-padding w-full relative z-10">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="heading-hero text-foreground mb-6 text-balance">
              Creating brands, products, and digital solutions
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-body max-w-2xl mx-auto mb-10"
          >
            Marketing, creativity, events, and digitalisation — from idea to result.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-base group"
            >
              Discuss a project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
      </motion.div>
    </section>
  );
}
