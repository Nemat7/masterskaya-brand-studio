import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { labelKey: "nav.expertise", href: "#expertise" },
    { labelKey: "nav.approach", href: "#approach" },
    { labelKey: "nav.cases", href: "#cases" },
    { labelKey: "nav.digital", href: "#digital" },
    { labelKey: "nav.contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding">
        <div className="container-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="text-xl md:text-2xl font-semibold text-foreground tracking-tight"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Masterskaya
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.labelKey}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {t(item.labelKey)}
              </motion.a>
            ))}
          </nav>

          {/* Right side - Language toggle & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </motion.button>
            <Button variant="default" size="sm" className="rounded-full px-6">
              {t("cta.discuss")}
            </Button>
          </div>

          {/* Mobile - Language + Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggleLanguage}
              className="p-2 text-muted-foreground hover:text-foreground"
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="section-padding py-6 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.labelKey}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-lg font-medium text-foreground py-3 border-b border-border/50 last:border-b-0"
                >
                  {t(item.labelKey)}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="default" className="rounded-full mt-4 w-full">
                  {t("cta.discuss")}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
