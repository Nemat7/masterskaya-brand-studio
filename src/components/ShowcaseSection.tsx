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

  // Map scroll progress to active index
  const indexProgress = useTransform(scrollYProgress, [0, 1], [0, showcaseItems.length - 0.01]);
  
  indexProgress.on("change", (latest) => {
    const newIndex = Math.floor(latest);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < showcaseItems.length) {
      setActiveIndex(newIndex);
    }
  });

  // Image transforms
  const imageScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);

  return (
    <section 
      id="showcase" 
      ref={containerRef} 
      className="relative bg-foreground text-background"
      style={{ height: `${(showcaseItems.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="section-padding pt-20 pb-8">
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

        {/* Content area */}
        <div className="section-padding flex-1">
          <div className="container-wide h-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" style={{ height: "calc(100vh - 200px)" }}>
              
              {/* Left: Large image */}
              <div className="lg:col-span-7 h-full relative">
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
                  </motion.div>
                ))}
              </div>

              {/* Right: Thumbnails + text */}
              <div className="lg:col-span-5 flex flex-col justify-center gap-6 h-full py-8">
                {/* Thumbnails */}
                <div className="flex flex-col gap-4">
                  {showcaseItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-500 ${
                        index === activeIndex 
                          ? "bg-background/10" 
                          : "bg-transparent hover:bg-background/5"
                      }`}
                      animate={{
                        opacity: index === activeIndex ? 1 : 0.4,
                        x: index === activeIndex ? 0 : -10,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Small thumbnail */}
                      <div className="w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base md:text-lg truncate">{t(item.titleKey)}</h4>
                        <p className="text-background/50 text-sm mt-1 line-clamp-2">{t(item.descKey)}</p>
                      </div>

                      {/* Active indicator */}
                      <motion.div
                        className="w-1.5 h-8 rounded-full bg-background flex-shrink-0"
                        animate={{ opacity: index === activeIndex ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Active item description */}
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 p-6 rounded-2xl bg-background/5 border border-background/10"
                >
                  <p className="text-background/70 text-base leading-relaxed">
                    {t(showcaseItems[activeIndex].descKey)}
                  </p>
                </motion.div>
              </div>
            </div>
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
