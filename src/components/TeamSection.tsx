import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";

import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  {
    photo: team1,
    nameKey: "team.1.name",
    roleKey: "team.1.role",
    bioKey: "team.1.bio",
    socials: { telegram: "https://t.me/", instagram: "https://instagram.com/", linkedin: "https://linkedin.com/" },
  },
  {
    photo: team2,
    nameKey: "team.2.name",
    roleKey: "team.2.role",
    bioKey: "team.2.bio",
    socials: { telegram: "https://t.me/", instagram: "https://instagram.com/", linkedin: "https://linkedin.com/" },
  },
  {
    photo: team3,
    nameKey: "team.3.name",
    roleKey: "team.3.role",
    bioKey: "team.3.bio",
    socials: { telegram: "https://t.me/", instagram: "https://instagram.com/", linkedin: "https://linkedin.com/" },
  },
  {
    photo: team4,
    nameKey: "team.4.name",
    roleKey: "team.4.role",
    bioKey: "team.4.bio",
    socials: { telegram: "https://t.me/", instagram: "https://instagram.com/", linkedin: "https://linkedin.com/" },
  },
  {
    photo: team5,
    nameKey: "team.5.name",
    roleKey: "team.5.role",
    bioKey: "team.5.bio",
    socials: { telegram: "https://t.me/", instagram: "https://instagram.com/", linkedin: "https://linkedin.com/" },
  },
  {
    photo: team6,
    nameKey: "team.6.name",
    roleKey: "team.6.role",
    bioKey: "team.6.bio",
    socials: { telegram: "https://t.me/", instagram: "https://instagram.com/", linkedin: "https://linkedin.com/" },
  },
];

function TeamCard({ member, index, onClick }: { member: typeof teamMembers[0]; index: number; onClick: () => void }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl mb-5 bg-secondary aspect-[3/4]">
        <motion.img
          src={member.photo}
          alt={t(member.nameKey)}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
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

function TeamModal({ member, onClose }: { member: typeof teamMembers[0]; onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative z-10 bg-background rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img src={member.photo} alt={t(member.nameKey)} className="w-full h-full object-cover" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{t(member.nameKey)}</h3>
          <p className="text-muted-foreground text-sm mt-1">{t(member.roleKey)}</p>
          <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{t(member.bioKey)}</p>
          <div className="flex gap-3 mt-5">
            <a href={member.socials.telegram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              Telegram
            </a>
            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              Instagram
            </a>
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-foreground text-background relative overflow-hidden">
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
              <TeamCard key={index} member={member} index={index} onClick={() => setSelectedMember(member)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
