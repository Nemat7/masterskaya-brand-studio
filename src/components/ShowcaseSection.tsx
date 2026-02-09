import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";

const showcaseItems = [
  {
    id: 0,
    image: showcase1,
    titleKey: "showcase.1.title",
    descKey: "showcase.1.desc",
    labelKey: "showcase.1.label",
  },
  {
    id: 1,
    image: showcase2,
    titleKey: "showcase.2.title",
    descKey: "showcase.2.desc",
    labelKey: "showcase.2.label",
  },
  {
    id: 2,
    image: showcase3,
    titleKey: "showcase.3.title",
    descKey: "showcase.3.desc",
    labelKey: "showcase.3.label",
  },
];

export function ShowcaseSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const indexProgress = useTransform(scrollYProgress, [0, 1], [0, showcaseItems.length - 0.01]);

  indexProgress.on("change", (latest) => {
    const newIndex = Math.floor(latest);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < showcaseItems.length) {
      setActiveIndex(newIndex);
    }
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative bg-foreground text-background"
      style={{ height: `${(showcaseItems.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="section-padding pt-20 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-section mb-3">{t("showcase.title")}</h2>
            <p className="text-background/60 text-lg">{t("showcase.subtitle")}</p>
          </motion.div>
        </div>

        {/* Full-width image area */}
        <div className="flex-1 section-padding pb-20 relative">
          <div className="container-wide h-full relative">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.95,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ scale: imageScale, opacity: imageOpacity }}
                />
                {/* Label badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-background/10 backdrop-blur-md text-sm font-medium text-background">
                    {t(item.labelKey)}
                  </span>
                </div>
                {/* Title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent">
                  <motion.h3
                    key={`title-${activeIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-background"
                  >
                    {t(item.titleKey)}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {showcaseItems.map((_, index) => (
            <motion.div
              key={index}
              className="h-1.5 rounded-full bg-background"
              animate={{
                width: index === activeIndex ? 32 : 6,
                opacity: index === activeIndex ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
