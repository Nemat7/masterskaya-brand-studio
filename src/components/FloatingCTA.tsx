import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScroll } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsVisible(latest > 500);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && telegram) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setName("");
        setTelegram("");
      }, 2500);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-8 right-8 z-50 w-[90vw] max-w-sm bg-background rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b">
                <h2 className="text-lg font-semibold">{t("floating.title")}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-5">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="font-semibold">{t("floating.success")}</p>
                    <p className="text-muted-foreground text-sm mt-1">{t("floating.success.text")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("floating.name")}</label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("floating.name.placeholder")}
                        className="h-11"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">{t("floating.telegram")}</label>
                      <Input
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        placeholder={t("floating.telegram.placeholder")}
                        className="h-11"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-11 gap-2">
                      <Send className="w-4 h-4" />
                      {t("floating.submit")}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
