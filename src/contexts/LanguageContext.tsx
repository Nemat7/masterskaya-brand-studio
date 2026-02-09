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
    
    // Team
    "team.title": "Наша команда",
    "team.subtitle": "Люди, которые создают результат",
    "team.1.name": "Артём Волков",
    "team.1.role": "Креативный директор",
    "team.2.name": "Камила Рахимова",
    "team.2.role": "Стратег по маркетингу",
    "team.3.name": "Сергей Новиков",
    "team.3.role": "Арт-директор",
    "team.4.name": "Айгуль Тохирова",
    "team.4.role": "UX/UI дизайнер",
    "team.5.name": "Максим Орлов",
    "team.5.role": "Менеджер проектов",
    "team.6.name": "Елена Карпова",
    "team.6.role": "Продюсер ивентов",
    "team.1.bio": "10+ лет опыта в креативной индустрии. Руководит стратегическим и творческим процессом всех проектов студии.",
    "team.2.bio": "Эксперт в маркетинговых стратегиях и аналитике. Разрабатывает комплексные планы продвижения для клиентов.",
    "team.3.bio": "Создаёт визуальные концепции мирового уровня. Отвечает за брендинг и дизайн-направление студии.",
    "team.4.bio": "Проектирует интуитивные интерфейсы для веб- и мобильных приложений с фокусом на пользовательский опыт.",
    "team.5.bio": "Координирует команды и процессы. Обеспечивает своевременную реализацию проектов любого масштаба.",
    "team.6.bio": "Организует масштабные мероприятия от концепции до реализации. Опыт работы с аудиторией до 10 000 человек.",
    
    // Showcase
    "showcase.title": "Три направления. Безграничные возможности.",
    "showcase.subtitle": "Каждое направление — это отдельная вселенная экспертизы",
    "showcase.1.title": "Премиум-брендинг",
    "showcase.1.desc": "Создаём идентичность, которая выделяет бренд среди конкурентов. От стратегии позиционирования до полного визуального языка.",
    "showcase.1.label": "Брендинг",
    "showcase.2.title": "Цифровые продукты",
    "showcase.2.desc": "Проектируем и разрабатываем платформы, приложения и сервисы, которые решают реальные бизнес-задачи.",
    "showcase.2.label": "Диджитал",
    "showcase.3.title": "Масштабные ивенты",
    "showcase.3.desc": "Создаём незабываемые впечатления и опыт, которые объединяют людей и усиливают бренд.",
    "showcase.3.label": "Ивенты",

    // Floating CTA
    "floating.title": "Получить КП",
    "floating.name": "Ваше имя",
    "floating.name.placeholder": "Как к вам обращаться?",
    "floating.telegram": "Telegram",
    "floating.telegram.placeholder": "@username или номер",
    "floating.submit": "Отправить КП",
    "floating.success": "Заявка отправлена!",
    "floating.success.text": "Мы свяжемся с вами в Telegram",
    
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
    
    // Team
    "team.title": "Our Team",
    "team.subtitle": "People who deliver results",
    "team.1.name": "Artem Volkov",
    "team.1.role": "Creative Director",
    "team.2.name": "Kamila Rakhimova",
    "team.2.role": "Marketing Strategist",
    "team.3.name": "Sergey Novikov",
    "team.3.role": "Art Director",
    "team.4.name": "Aigul Tokhirova",
    "team.4.role": "UX/UI Designer",
    "team.5.name": "Maxim Orlov",
    "team.5.role": "Project Manager",
    "team.6.name": "Elena Karpova",
    "team.6.role": "Event Producer",
    "team.1.bio": "10+ years in the creative industry. Leads strategic and creative processes across all studio projects.",
    "team.2.bio": "Expert in marketing strategies and analytics. Develops comprehensive promotion plans for clients.",
    "team.3.bio": "Creates world-class visual concepts. Leads branding and design direction for the studio.",
    "team.4.bio": "Designs intuitive interfaces for web and mobile apps with a focus on user experience.",
    "team.5.bio": "Coordinates teams and processes. Ensures timely delivery of projects at any scale.",
    "team.6.bio": "Organizes large-scale events from concept to execution. Experience with audiences up to 10,000.",
    
    // Showcase
    "showcase.title": "Three directions. Endless possibilities.",
    "showcase.subtitle": "Each direction is a universe of expertise",
    "showcase.1.title": "Premium Branding",
    "showcase.1.desc": "Creating identity that sets brands apart. From positioning strategy to complete visual language.",
    "showcase.1.label": "Branding",
    "showcase.2.title": "Digital Products",
    "showcase.2.desc": "Designing and developing platforms, apps, and services that solve real business challenges.",
    "showcase.2.label": "Digital",
    "showcase.3.title": "Large-scale Events",
    "showcase.3.desc": "Creating unforgettable experiences that unite people and amplify brands.",
    "showcase.3.label": "Events",

    // Floating CTA
    "floating.title": "Get a Proposal",
    "floating.name": "Your Name",
    "floating.name.placeholder": "What should we call you?",
    "floating.telegram": "Telegram",
    "floating.telegram.placeholder": "@username or number",
    "floating.submit": "Send Proposal",
    "floating.success": "Request sent!",
    "floating.success.text": "We'll contact you via Telegram",
    
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
