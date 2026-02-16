import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { labelKey: "nav.expertise", href: "#expertise" },
      { labelKey: "nav.approach", href: "#approach" },
      { labelKey: "nav.cases", href: "#cases" },
      { labelKey: "nav.digital", href: "#digital" },
      { labelKey: "nav.contact", href: "#contact" },
    ],
    contact: [
      { label: "hello@masterskaya.com", href: "mailto:hello@masterskaya.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Telegram", href: "https://t.me" },
    ],
  };

  return (
    <footer className="py-16 md:py-20 border-t border-border bg-secondary/30">
      <div className="section-padding">
        <div className="container-wide">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
              {/* Logo & tagline */}
              <div className="md:col-span-1">
                <motion.a 
                  href="#" 
                  className="text-2xl font-semibold text-foreground tracking-tight inline-block mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  Masterskaya
                </motion.a>
                <p className="text-small max-w-xs">
                  {t("footer.tagline")}
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                  {t("footer.navigation")}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.labelKey}>
                      <motion.a 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors link-underline"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        {t(link.labelKey)}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                  {t("footer.contact")}
                </h4>
                <ul className="space-y-3">
                  {footerLinks.contact.map((link) => (
                    <li key={link.label}>
                      <motion.a 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors link-underline"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Masterskaya. {t("footer.rights")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("footer.crafted")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
