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
    
    // Clients
    "clients.title": "Нам доверяют",
    
    // Stats
    "stats.title": "Цифры говорят сами",
    "stats.subtitle": "Результаты, которыми мы гордимся",
    "stats.projects": "Проектов",
    "stats.clients": "Клиентов",
    "stats.years": "Лет опыта",
    "stats.team": "Человек в команде",
    
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
    
    // Testimonials
    "testimonials.title": "Что говорят клиенты",
    "testimonials.1.name": "Александр Петров",
    "testimonials.1.role": "CEO",
    "testimonials.1.text": "Masterskaya полностью изменили наш подход к маркетингу. Результаты превзошли все ожидания — рост продаж на 340% за первый год.",
    "testimonials.2.name": "Мария Иванова",
    "testimonials.2.role": "Директор по маркетингу",
    "testimonials.2.text": "Профессионализм и внимание к деталям на высшем уровне. Ребрендинг прошёл идеально, и мы получили множество положительных отзывов.",
    "testimonials.3.name": "Дмитрий Сидоров",
    "testimonials.3.role": "Основатель",
    "testimonials.3.text": "Команда создала для нас цифровой продукт с нуля. От идеи до работающего MVP — всего 3 месяца. Рекомендую всем!",
    
    // Digital
    "digital.label": "Ключевой фокус",
    "digital.title": "Диджитал — это не услуга. Это направление.",
    "digital.subtitle": "Мы создаём цифровые продукты — сервисы, платформы, MVP и решения, ориентированные на пользователя. От идеи до работающего продукта.",
    "digital.platforms": "Платформы",
    "digital.products": "Продукты",
    "digital.services": "Сервисы",
    "digital.mvps": "MVP",
    
    // Form
    "form.title": "Заявка на проект",
    "form.step1.title": "Какая услуга вас интересует?",
    "form.step2.title": "Какой у вас бюджет?",
    "form.step3.title": "Как с вами связаться?",
    "form.step4.title": "Расскажите о проекте",
    "form.service.marketing": "Маркетинг",
    "form.service.branding": "Брендинг",
    "form.service.smm": "SMM и контент",
    "form.service.events": "Ивенты",
    "form.service.digital": "Диджитализация",
    "form.budget.small": "до 500 000 ₽",
    "form.budget.medium": "500 000 — 2 млн ₽",
    "form.budget.large": "2 — 5 млн ₽",
    "form.budget.enterprise": "от 5 млн ₽",
    "form.name": "Имя",
    "form.name.placeholder": "Ваше имя",
    "form.email": "Email",
    "form.email.placeholder": "email@company.com",
    "form.phone": "Телефон",
    "form.phone.placeholder": "+7 (999) 999-99-99",
    "form.description.placeholder": "Опишите ваш проект, цели и задачи...",
    "form.back": "Назад",
    "form.next": "Далее",
    "form.submit": "Отправить заявку",
    "form.success.title": "Заявка отправлена!",
    "form.success.text": "Мы свяжемся с вами в ближайшее время.",
    
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
    
    // Clients
    "clients.title": "Trusted by",
    
    // Stats
    "stats.title": "Numbers speak for themselves",
    "stats.subtitle": "Results we're proud of",
    "stats.projects": "Projects",
    "stats.clients": "Clients",
    "stats.years": "Years of experience",
    "stats.team": "Team members",
    
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
    
    // Testimonials
    "testimonials.title": "What clients say",
    "testimonials.1.name": "Alexander Petrov",
    "testimonials.1.role": "CEO",
    "testimonials.1.text": "Masterskaya completely transformed our marketing approach. Results exceeded all expectations — 340% sales growth in the first year.",
    "testimonials.2.name": "Maria Ivanova",
    "testimonials.2.role": "Marketing Director",
    "testimonials.2.text": "Professionalism and attention to detail at the highest level. The rebrand went perfectly, and we received numerous positive feedback.",
    "testimonials.3.name": "Dmitry Sidorov",
    "testimonials.3.role": "Founder",
    "testimonials.3.text": "The team created a digital product for us from scratch. From idea to working MVP — just 3 months. Highly recommend!",
    
    // Digital
    "digital.label": "Key Focus",
    "digital.title": "Digital is not a service. It's a direction.",
    "digital.subtitle": "We create digital products — services, platforms, MVPs, and user-centered solutions. From idea to a working product.",
    "digital.platforms": "Platforms",
    "digital.products": "Products",
    "digital.services": "Services",
    "digital.mvps": "MVPs",
    
    // Form
    "form.title": "Project Request",
    "form.step1.title": "What service interests you?",
    "form.step2.title": "What's your budget?",
    "form.step3.title": "How can we contact you?",
    "form.step4.title": "Tell us about your project",
    "form.service.marketing": "Marketing",
    "form.service.branding": "Branding",
    "form.service.smm": "SMM & Content",
    "form.service.events": "Events",
    "form.service.digital": "Digitalisation",
    "form.budget.small": "up to $10,000",
    "form.budget.medium": "$10,000 — $50,000",
    "form.budget.large": "$50,000 — $150,000",
    "form.budget.enterprise": "$150,000+",
    "form.name": "Name",
    "form.name.placeholder": "Your name",
    "form.email": "Email",
    "form.email.placeholder": "email@company.com",
    "form.phone": "Phone",
    "form.phone.placeholder": "+1 (999) 999-9999",
    "form.description.placeholder": "Describe your project, goals and objectives...",
    "form.back": "Back",
    "form.next": "Next",
    "form.submit": "Submit request",
    "form.success.title": "Request sent!",
    "form.success.text": "We'll get back to you shortly.",
    
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
