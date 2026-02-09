import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const clients = [
  { name: "Технолайн", logo: "TL" },
  { name: "Банк Развития", logo: "БР" },
  { name: "МегаСтрой", logo: "MC" },
  { name: "ИнноТех", logo: "IT" },
  { name: "Альфа Групп", logo: "AG" },
  { name: "Глобал Медиа", logo: "GM" },
  { name: "СмартСити", logo: "SC" },
  { name: "Фуд Маркет", logo: "FM" },
  { name: "Энерго Плюс", logo: "E+" },
  { name: "Дигитал Про", logo: "DP" },
];

function ClientLogo({ client }: { client: typeof clients[0] }) {
  return (
    <div className="flex-shrink-0 px-6 md:px-10 group">
      <div className="flex items-center gap-3 opacity-25 hover:opacity-60 transition-opacity duration-500 cursor-default">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
          <span className="text-sm md:text-base font-bold text-foreground/60">{client.logo}</span>
        </div>
        <span className="text-lg md:text-2xl font-semibold text-foreground whitespace-nowrap">
          {client.name}
        </span>
      </div>
    </div>
  );
}

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
        
        {/* Row 1 */}
        <div className="flex overflow-hidden mb-6">
          <motion.div
            className="flex items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...clients, ...clients].map((client, index) => (
              <ClientLogo key={index} client={client} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - reverse */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...clients.slice(5), ...clients.slice(0, 5), ...clients.slice(5), ...clients.slice(0, 5)].map((client, index) => (
              <ClientLogo key={index} client={client} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
