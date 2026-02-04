import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = {
  navigation: [
    { label: "Expertise", href: "#expertise" },
    { label: "Approach", href: "#approach" },
    { label: "Digital", href: "#digital" },
    { label: "Contact", href: "#contact" },
  ],
  contact: [
    { label: "hello@masterskaya.com", href: "mailto:hello@masterskaya.com" },
  ],
};

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

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
                <a href="#" className="text-2xl font-semibold text-foreground tracking-tight inline-block mb-4">
                  Masterskaya
                </a>
                <p className="text-small max-w-xs">
                  Creating brands, products, and digital solutions.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                  Navigation
                </h4>
                <ul className="space-y-3">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors link-underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                  Contact
                </h4>
                <ul className="space-y-3">
                  {footerLinks.contact.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors link-underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Masterskaya. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Crafted with precision
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
