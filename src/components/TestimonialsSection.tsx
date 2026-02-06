import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  nameKey: string;
  roleKey: string;
  textKey: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    nameKey: "testimonials.1.name",
    roleKey: "testimonials.1.role",
    textKey: "testimonials.1.text",
    company: "Технолайн",
  },
  {
    id: "2",
    nameKey: "testimonials.2.name",
    roleKey: "testimonials.2.role",
    textKey: "testimonials.2.text",
    company: "ИнноТех",
  },
  {
    id: "3",
    nameKey: "testimonials.3.name",
    roleKey: "testimonials.3.role",
    textKey: "testimonials.3.text",
    company: "Глобал Медиа",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-foreground text-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-narrow">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-4">{t("testimonials.title")}</h2>
          </motion.div>

          <div className="relative">
            {/* Quote icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-8 left-0 md:left-12"
            >
              <Quote className="w-24 h-24 md:w-32 md:h-32" />
            </motion.div>

            {/* Testimonial content */}
            <div className="relative min-h-[300px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : 50,
                    pointerEvents: index === currentIndex ? "auto" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 max-w-3xl">
                    "{t(testimonial.textKey)}"
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{t(testimonial.nameKey)}</p>
                    <p className="text-background/60">
                      {t(testimonial.roleKey)}, {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-background w-8" 
                        : "bg-background/30 hover:bg-background/50"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
