import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  { photo: team1, nameKey: "team.1.name", roleKey: "team.1.role" },
  { photo: team2, nameKey: "team.2.name", roleKey: "team.2.role" },
  { photo: team3, nameKey: "team.3.name", roleKey: "team.3.role" },
  { photo: team4, nameKey: "team.4.name", roleKey: "team.4.role" },
  { photo: team5, nameKey: "team.5.name", roleKey: "team.5.role" },
  { photo: team6, nameKey: "team.6.name", roleKey: "team.6.role" },
];

function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl mb-5 bg-secondary aspect-[3/4]">
        <motion.img
          src={member.photo}
          alt={t(member.nameKey)}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      >
        <h3 className="text-lg font-semibold">{t(member.nameKey)}</h3>
        <p className="text-muted-foreground text-sm mt-1">{t(member.roleKey)}</p>
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        <div className="container-wide">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="heading-section mb-4">{t("team.title")}</h2>
            <p className="text-background/60 text-lg max-w-xl mx-auto">{t("team.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
