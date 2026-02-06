import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = [
  "Технолайн",
  "Банк Развития", 
  "МегаСтрой",
  "ИнноТех",
  "Альфа Групп",
  "Глобал Медиа",
  "СмартСити",
  "Фуд Маркет",
  "Энерго Плюс",
  "Дигитал Про",
];

export function ClientsMarquee() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 overflow-hidden border-y border-border/50 bg-secondary/20">
      <div className="section-padding mb-12">
        <motion.p 
          className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("clients.title")}
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Marquee container */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-12 md:gap-20 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Double the items for seamless loop */}
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-6 md:px-8"
              >
                <span className="text-2xl md:text-4xl font-semibold text-foreground/20 hover:text-foreground/60 transition-colors duration-500 whitespace-nowrap cursor-default">
                  {client}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
