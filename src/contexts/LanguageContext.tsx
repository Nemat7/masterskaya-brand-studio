import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    "nav.expertise": "Экспертиза",
    "nav.approach": "Подход",
    "nav.cases": "Кейсы",
    "nav.digital": "Диджитал",
    "nav.contact": "Контакт",
    "cta.discuss": "Обсудить проект",
    
    // Hero
    "hero.title": "Создаём бренды, продукты и цифровые решения",
    "hero.subtitle": "Маркетинг, креатив, ивенты и диджитализация — от идеи до результата.",
    
    // Expertise
    "expertise.title": "Способы мышления",
    "expertise.subtitle": "Не просто услуги. Подходы, которые создают устойчивое влияние.",
    "expertise.marketing": "Маркетинг",
    "expertise.marketing.desc": "Стратегии, которые работают в реальном бизнесе.",
    "expertise.branding": "Брендинг",
    "expertise.branding.desc": "Идентичность и смысл, которые действительно отличают.",
    "expertise.smm": "SMM и контент",
    "expertise.smm.desc": "Контент, который строит бренды, а не только метрики.",
    "expertise.events": "Ивенты",
    "expertise.events.desc": "Масштабные мероприятия как опыт и маркетинговый инструмент.",
    "expertise.digital": "Диджитализация",
    "expertise.digital.desc": "Создание цифровых продуктов, сервисов и платформ.",
    
    // Approach
    "approach.title": "Мы подходим к проектам как к продуктам",
    "approach.subtitle": "Каждое взаимодействие мы рассматриваем с той же тщательностью и заботой, с какой строили бы свой собственный бизнес.",
    "approach.step1": "Понять бизнес",
    "approach.step1.desc": "Глубокое погружение в ваши цели, рынок и вызовы.",
    "approach.step2": "Спроектировать решение",
    "approach.step2.desc": "Стратегические и креативные фреймворки, адаптированные под вас.",
    "approach.step3": "Создать и запустить",
    "approach.step3.desc": "Реализация с точностью и вниманием к деталям.",
    "approach.step4": "Развивать и масштабировать",
    "approach.step4.desc": "Непрерывное улучшение и поддержка роста.",
    
    // Cases
    "cases.title": "Избранные проекты",
    "cases.subtitle": "Работы, которыми мы гордимся",
    "cases.view": "Смотреть кейс",
    "cases.brand.title": "Ребрендинг Технолайн",
    "cases.brand.desc": "Полный ребрендинг для технологической компании",
    "cases.event.title": "Tech Summit 2024",
    "cases.event.desc": "Организация конференции на 5000 участников",
    "cases.digital.title": "Платформа для обучения",
    "cases.digital.desc": "EdTech продукт от идеи до запуска",
    "cases.smm.title": "SMM-кампания",
    "cases.smm.desc": "Рост аудитории x10 за 6 месяцев",
    
    // Digital
    "digital.label": "Ключевой фокус",
    "digital.title": "Диджитал — это не услуга. Это направление.",
    "digital.subtitle": "Мы создаём цифровые продукты — сервисы, платформы, MVP и решения, ориентированные на пользователя. От идеи до работающего продукта.",
    "digital.platforms": "Платформы",
    "digital.products": "Продукты",
    "digital.services": "Сервисы",
    "digital.mvps": "MVP",
    
    // CTA
    "cta.title": "Давайте создадим что-то значимое",
    "cta.subtitle": "Расскажите о вашем вызове — мы спроектируем решение.",
    "cta.button": "Связаться с нами",
    
    // Footer
    "footer.tagline": "Создаём бренды, продукты и цифровые решения.",
    "footer.navigation": "Навигация",
    "footer.contact": "Контакты",
    "footer.rights": "Все права защищены.",
    "footer.crafted": "Сделано с заботой",
  },
  en: {
    // Header
    "nav.expertise": "Expertise",
    "nav.approach": "Approach",
    "nav.cases": "Cases",
    "nav.digital": "Digital",
    "nav.contact": "Contact",
    "cta.discuss": "Discuss a project",
    
    // Hero
    "hero.title": "Creating brands, products, and digital solutions",
    "hero.subtitle": "Marketing, creativity, events, and digitalisation — from idea to result.",
    
    // Expertise
    "expertise.title": "Ways of thinking",
    "expertise.subtitle": "Not just services. Approaches that create lasting impact.",
    "expertise.marketing": "Marketing",
    "expertise.marketing.desc": "Strategies that work in real business.",
    "expertise.branding": "Branding",
    "expertise.branding.desc": "Identity and meaning that truly differentiate.",
    "expertise.smm": "SMM & Content",
    "expertise.smm.desc": "Content that builds brands, not just metrics.",
    "expertise.events": "Events",
    "expertise.events.desc": "Large-scale events as experiences and marketing tools.",
    "expertise.digital": "Digitalisation",
    "expertise.digital.desc": "Creation of digital products, services, and platforms.",
    
    // Approach
    "approach.title": "We approach projects as products",
    "approach.subtitle": "Every engagement is treated with the same rigor and care we'd give to building our own business.",
    "approach.step1": "Understand the business",
    "approach.step1.desc": "Deep dive into your goals, market, and challenges.",
    "approach.step2": "Design the solution",
    "approach.step2.desc": "Strategic and creative frameworks tailored to you.",
    "approach.step3": "Create and launch",
    "approach.step3.desc": "Execution with precision and attention to detail.",
    "approach.step4": "Develop and scale",
    "approach.step4.desc": "Continuous improvement and growth support.",
    
    // Cases
    "cases.title": "Featured Projects",
    "cases.subtitle": "Work we're proud of",
    "cases.view": "View case",
    "cases.brand.title": "Technoline Rebrand",
    "cases.brand.desc": "Complete rebrand for a technology company",
    "cases.event.title": "Tech Summit 2024",
    "cases.event.desc": "Conference organization for 5000 attendees",
    "cases.digital.title": "Learning Platform",
    "cases.digital.desc": "EdTech product from idea to launch",
    "cases.smm.title": "SMM Campaign",
    "cases.smm.desc": "10x audience growth in 6 months",
    
    // Digital
    "digital.label": "Key Focus",
    "digital.title": "Digital is not a service. It's a direction.",
    "digital.subtitle": "We create digital products — services, platforms, MVPs, and user-centered solutions. From idea to a working product.",
    "digital.platforms": "Platforms",
    "digital.products": "Products",
    "digital.services": "Services",
    "digital.mvps": "MVPs",
    
    // CTA
    "cta.title": "Let's create something meaningful",
    "cta.subtitle": "Tell us about your challenge — we'll design the solution.",
    "cta.button": "Contact us",
    
    // Footer
    "footer.tagline": "Creating brands, products, and digital solutions.",
    "footer.navigation": "Navigation",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.crafted": "Crafted with precision",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
