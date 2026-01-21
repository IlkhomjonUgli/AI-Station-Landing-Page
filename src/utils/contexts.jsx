import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('ai-station-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ai-station-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Language Context
const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      home: 'Home',
      programs: 'Programs',
      services: 'Services',
      portfolio: 'Portfolio',
      mentors: 'Mentors',
      about: 'About',
      resources: 'Resources',
      careers: 'Careers',
      blog: 'Blog',
      news: 'News',
      contact: 'Contact',
      applyNow: 'Apply Now'
    },
    hero: {
      title: 'The AI Hub of Uzbekistan',
      subtitle: 'Where innovation meets opportunity. Build, learn, and grow with Central Asia\'s leading AI ecosystem for education, research, and business transformation.',
      getStarted: 'Join the Hub',
      learnMore: 'Explore',
      studentsServed: 'Community Members',
      engagementRate: 'Success Rate',
      programsOffered: 'Programs & Services',
      jobPlacement: 'Career Placements'
    },
    sections: {
      services: 'Our Services',
      servicesSubtitle: 'Comprehensive AI solutions tailored to your business needs',
      programs: 'Our Programs',
      programsSubtitle: 'Comprehensive AI training programs for every skill level',
      portfolio: 'Success Stories',
      portfolioSubtitle: 'Real projects, real results, real impact',
      team: 'Meet Our Team',
      teamSubtitle: 'Expert instructors passionate about AI education',
      resources: 'Learning Resources',
      resourcesSubtitle: 'Free access to comprehensive AI learning materials',
      careers: 'Join Our Team',
      careersSubtitle: 'Be part of the AI revolution - explore open positions',
      contact: 'Get In Touch',
      contactSubtitle: 'Ready to transform your future with AI? Contact us today'
    },
    services: {
      aiConsulting: {
        title: 'AI Consulting',
        description: 'Expert AI strategy consulting to transform your business.'
      },
      customDevelopment: {
        title: 'Custom AI Development',
        description: 'Build tailored AI solutions for your unique challenges.'
      },
      dataAnalytics: {
        title: 'Data Analytics',
        description: 'Unlock the power of your data with advanced analytics.'
      },
      aiTraining: {
        title: 'AI Training',
        description: 'Upskill your team with hands-on AI training programs.'
      },
      learnMore: 'Learn More',
      popular: 'Popular'
    },
    programs: {
      aiFundamentals: {
        title: 'AI Fundamentals',
        description: 'Master the basics of artificial intelligence, machine learning, and practical applications.',
        duration: '2 months',
        level: 'Beginner',
        features: ['Introduction to AI & ML', 'Hands-on projects', 'AI tools mastery', 'Certification']
      },
      aipreneurs: {
        title: 'AIpreneurs',
        description: 'Build AI-powered businesses and turn your ideas into reality.',
        duration: '3 months',
        level: 'Intermediate',
        features: ['AI product development', 'Business model design', 'Go-to-market strategy', 'Investor pitching']
      },
      dataScienceMastery: {
        title: 'Data Science Mastery',
        description: 'Deep dive into data analysis, visualization, and predictive modeling.',
        duration: '4 months',
        level: 'Advanced',
        features: ['Advanced statistics', 'Python, R, SQL', 'ML algorithms', 'Real-world projects']
      },
      popular: 'Popular'
    },
    portfolio: {
      smartBanking: {
        title: 'Smart Banking Platform',
        client: 'Major Financial Institution',
        description: 'AI-powered analytics reducing fraud by 85%',
        results: '$12M annual savings'
      },
      healthcareDiagnostic: {
        title: 'Healthcare Diagnostic AI',
        client: 'Regional Medical Center',
        description: '94% diagnostic accuracy assistant',
        results: '500+ patients helped daily'
      },
      ecommerceRecommender: {
        title: 'E-Commerce Recommender',
        client: 'Leading Online Retailer',
        description: 'Personalized recommendations increasing sales 45%',
        results: '$8.5M additional revenue'
      },
      resultsLabel: 'Results:',
      featured: 'Featured'
    },
    team: {
      member1: {
        name: 'Isomiddin Ergashev',
        role: 'Lead AI Instructor',
        expertise: 'Machine Learning, Data Engineering'
      },
      member2: {
        name: 'Sarvar Karimov',
        role: 'Data Science Expert',
        expertise: 'Analytics, Visualization'
      },
      member3: {
        name: 'Nilufar Rashidova',
        role: 'AI Business Strategist',
        expertise: 'AI Strategy, Product Management'
      }
    },
    resources: {
      mlCourse: {
        title: 'Machine Learning Course',
        type: 'Video Course',
        duration: '8 hours'
      },
      aiForBusiness: {
        title: 'AI for Business Leaders',
        type: 'E-Book',
        pages: '120 pages'
      },
      nlpMasterclass: {
        title: 'NLP Masterclass',
        type: 'Interactive',
        duration: '12 hours'
      },
      accessNow: 'Access Now',
      popular: 'Popular'
    },
    careers: {
      seniorEngineer: {
        title: 'Senior AI/ML Engineer',
        location: 'Remote / Tashkent',
        type: 'Full-time'
      },
      productManager: {
        title: 'AI Product Manager',
        location: 'Hybrid / Tashkent',
        type: 'Full-time'
      },
      dataScientist: {
        title: 'Data Scientist',
        location: 'Remote',
        type: 'Full-time'
      },
      applyNow: 'Apply Now'
    },
    cta: {
      title: 'Ready to Join Uzbekistan\'s AI Revolution?',
      subtitle: 'Connect with Uzbekistan\'s leading AI community – learn, build, and innovate with us',
      getStarted: 'Get Started Today'
    },
    footer: {
      tagline: 'Uzbekistan\'s Premier AI Hub for Innovation & Education',
      newsletter: 'Subscribe to Newsletter',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      allRightsReserved: 'All rights reserved'
    },
    servicesPage: {
      heroTitle: 'AI Solutions for',
      heroTitleHighlight: 'Every Need',
      heroSubtitle: 'From strategy to implementation, we provide comprehensive AI services that transform businesses and drive innovation.',
      allServices: 'All Services',
      getStarted: 'Get Started',
      mostPopular: 'Most Popular',
      ctaTitle: 'Ready to Transform Your Business with AI?',
      ctaSubtitle: 'Let\'s discuss how our AI services can help you achieve your goals. Schedule a free consultation with our experts today.',
      scheduleConsultation: 'Schedule Consultation',
      viewOurWork: 'View Our Work'
    },
    portfolioPage: {
      heroTitle: 'Transforming Businesses with',
      heroTitleHighlight: 'AI Innovation',
      heroSubtitle: 'Explore our portfolio of successful AI implementations that have delivered measurable results for our clients.',
      allProjects: 'All Projects',
      viewCaseStudy: 'View Case Study',
      featured: 'Featured',
      projectsCompleted: 'Projects Completed',
      clientSatisfaction: 'Client Satisfaction',
      industryCoverage: 'Industries Covered',
      avgROI: 'Average ROI',
      close: 'Close',
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'Results',
      technologiesUsed: 'Technologies Used'
    }
  },
  uz: {
    nav: {
      home: 'Bosh sahifa',
      programs: 'Dasturlar',
      services: 'Xizmatlar',
      portfolio: 'Portfel',
      mentors: 'Mentorlar',
      about: 'Biz haqimizda',
      resources: 'Resurslar',
      careers: 'Karyera',
      blog: 'Blog',
      news: 'Yangiliklar',
      contact: 'Aloqa',
      applyNow: 'Ro\'yxatdan o\'tish'
    },
    hero: {
      title: 'O\'zbekistonning AI Markazi',
      subtitle: 'Innovatsiya va imkoniyatlar birlashgan joy. Markaziy Osiyoning yetakchi AI ekotizimida o\'rganing, yarating va rivojlaning.',
      getStarted: 'Qo\'shiling',
      learnMore: 'Ko\'rish',
      studentsServed: 'Jamiyat a\'zolari',
      engagementRate: 'Muvaffaqiyat darajasi',
      programsOffered: 'Dasturlar va Xizmatlar',
      jobPlacement: 'Karyera joylashtirish'
    },
    sections: {
      services: 'Bizning Xizmatlarimiz',
      servicesSubtitle: 'Biznesingiz uchun maxsus AI yechimlari',
      programs: 'Bizning Dasturlarimiz',
      programsSubtitle: 'Har bir darajadagi o\'quvchilar uchun AI ta\'lim dasturlari',
      portfolio: 'Muvaffaqiyat Tarixi',
      portfolioSubtitle: 'Haqiqiy loyihalar, haqiqiy natijalar, haqiqiy ta\'sir',
      team: 'Bizning Jamoa',
      teamSubtitle: 'AI ta\'limiga ishtiyoqli ekspert o\'qituvchilar',
      resources: 'O\'quv Resurslari',
      resourcesSubtitle: 'Keng qamrovli AI o\'quv materiallariga bepul kirish',
      careers: 'Bizga Qo\'shiling',
      careersSubtitle: 'AI inqilobining bir qismi bo\'ling - ochiq lavozimlarni ko\'ring',
      contact: 'Aloqa',
      contactSubtitle: 'AI bilan kelajagingizni o\'zgartirishga tayyormisiz? Bugun biz bilan bog\'laning'
    },
    services: {
      aiConsulting: {
        title: 'AI Konsalting',
        description: 'Biznesingizni o\'zgartirish uchun AI strategiyasi bo\'yicha ekspert maslahat.'
      },
      customDevelopment: {
        title: 'Maxsus AI Ishlab Chiqish',
        description: 'O\'ziga xos muammolaringiz uchun AI yechimlarini yarating.'
      },
      dataAnalytics: {
        title: 'Ma\'lumotlar Tahlili',
        description: 'Ilg\'or tahlil bilan ma\'lumotlaringiz kuchini oching.'
      },
      aiTraining: {
        title: 'AI Ta\'lim',
        description: 'Jamoangizni amaliy AI ta\'lim dasturlari bilan rivojlantiring.'
      },
      learnMore: 'Batafsil',
      popular: 'Mashhur'
    },
    programs: {
      aiFundamentals: {
        title: 'AI Asoslari',
        description: 'Sun\'iy intellekt, mashina o\'rganish va amaliy qo\'llanmalarning asoslarini o\'rganing.',
        duration: '2 oy',
        level: 'Boshlang\'ich',
        features: ['AI va ML kirish', 'Amaliy loyihalar', 'AI vositalari', 'Sertifikat']
      },
      aipreneurs: {
        title: 'AIpreneurs',
        description: 'AI asosidagi bizneslarni quring va g\'oyaleringizni amalga oshiring.',
        duration: '3 oy',
        level: 'O\'rtacha',
        features: ['AI mahsulot ishlab chiqish', 'Biznes modeli dizayni', 'Bozorga chiqish strategiyasi', 'Investor taqdimoti']
      },
      dataScienceMastery: {
        title: 'Ma\'lumotlar Fani Mahorati',
        description: 'Ma\'lumotlar tahlili, vizualizatsiya va bashoratli modellashtirish.',
        duration: '4 oy',
        level: 'Ilg\'or',
        features: ['Ilg\'or statistika', 'Python, R, SQL', 'ML algoritmlari', 'Haqiqiy loyihalar']
      },
      popular: 'Mashhur'
    },
    portfolio: {
      smartBanking: {
        title: 'Aqlli Bank Platformasi',
        client: 'Yirik Moliya Instituti',
        description: 'Firibgarlikni 85% ga kamaytiradigan AI tahlili',
        results: '$12M yillik tejamkorlik'
      },
      healthcareDiagnostic: {
        title: 'Sog\'liqni Saqlash Diagnostik AI',
        client: 'Mintaqaviy Tibbiyot Markazi',
        description: '94% aniqlikdagi diagnostika yordamchisi',
        results: 'Kuniga 500+ bemorga yordam'
      },
      ecommerceRecommender: {
        title: 'Elektron Tijorat Tavsiyachisi',
        description: 'Sotuvni 45% ga oshiradigan shaxsiylashtirilgan tavsiyalar',
        client: 'Yetakchi Onlayn Chakana Savdogar',
        results: '$8.5M qo\'shimcha daromad'
      },
      resultsLabel: 'Natijalar:',
      featured: 'Taniqli'
    },
    team: {
      member1: {
        name: 'Isomiddin Ergashev',
        role: 'Bosh AI O\'qituvchisi',
        expertise: 'Mashina O\'rganish, Ma\'lumotlar Muhandisligi'
      },
      member2: {
        name: 'Sarvar Karimov',
        role: 'Ma\'lumotlar Fani Eksperti',
        expertise: 'Tahlil, Vizualizatsiya'
      },
      member3: {
        name: 'Nilufar Rashidova',
        role: 'AI Biznes Strategi',
        expertise: 'AI Strategiyasi, Mahsulot Boshqaruvi'
      }
    },
    resources: {
      mlCourse: {
        title: 'Mashina O\'rganish Kursi',
        type: 'Video Kurs',
        duration: '8 soat'
      },
      aiForBusiness: {
        title: 'Biznes Rahbarlari uchun AI',
        type: 'Elektron Kitob',
        pages: '120 sahifa'
      },
      nlpMasterclass: {
        title: 'NLP Master-klass',
        type: 'Interaktiv',
        duration: '12 soat'
      },
      accessNow: 'Kirish',
      popular: 'Mashhur'
    },
    careers: {
      seniorEngineer: {
        title: 'Katta AI/ML Muhandisi',
        location: 'Masofaviy / Toshkent',
        type: 'To\'liq vaqtli'
      },
      productManager: {
        title: 'AI Mahsulot Menejeri',
        location: 'Gibrid / Toshkent',
        type: 'To\'liq vaqtli'
      },
      dataScientist: {
        title: 'Ma\'lumotlar Olimi',
        location: 'Masofaviy',
        type: 'To\'liq vaqtli'
      },
      applyNow: 'Ariza Topshirish'
    },
    cta: {
      title: 'O\'zbekiston AI Inqilobiga Qo\'shilishga Tayyormisiz?',
      subtitle: 'O\'zbekistonning yetakchi AI jamoasiga qo\'shiling – biz bilan o\'rganing, yarating va innovatsiya qiling',
      getStarted: 'Bugun Boshlang'
    },
    footer: {
      tagline: 'O\'zbekistonning Yetakchi AI Markazi – Innovatsiya va Ta\'lim',
      newsletter: 'Yangiliklar ro\'yxatiga obuna bo\'lish',
      emailPlaceholder: 'Emailingizni kiriting',
      subscribe: 'Obuna bo\'lish',
      allRightsReserved: 'Barcha huquqlar himoyalangan'
    },
    servicesPage: {
      heroTitle: 'Har Qanday Ehtiyoj Uchun',
      heroTitleHighlight: 'AI Yechimlari',
      heroSubtitle: 'Strategiyadan amalga oshirishgacha, biz bizneslarni o\'zgartiruvchi va innovatsiyalarni rivojlantiruvchi keng qamrovli AI xizmatlarini taqdim etamiz.',
      allServices: 'Barcha Xizmatlar',
      getStarted: 'Boshlash',
      mostPopular: 'Eng Mashhur',
      ctaTitle: 'Biznesingizni AI Bilan O\'zgartirishga Tayyormisiz?',
      ctaSubtitle: 'AI xizmatlarimiz maqsadlaringizga erishishga qanday yordam berishi mumkinligini muhokama qilaylik.',
      scheduleConsultation: 'Konsultatsiya Rejalashtirish',
      viewOurWork: 'Ishlarimizni Ko\'ring'
    },
    portfolioPage: {
      heroTitle: 'Bizneslarni O\'zgartirish',
      heroTitleHighlight: 'AI Innovatsiyasi Bilan',
      heroSubtitle: 'Mijozlarimizga o\'lchovli natijalar bergan muvaffaqiyatli AI loyihalarimiz portfelini ko\'ring.',
      allProjects: 'Barcha Loyihalar',
      viewCaseStudy: 'Keys Tadqiqotini Ko\'rish',
      featured: 'Taniqli',
      projectsCompleted: 'Tugallangan Loyihalar',
      clientSatisfaction: 'Mijozlar Mamnuniyati',
      industryCoverage: 'Qoplangan Sohalar',
      avgROI: 'O\'rtacha ROI',
      close: 'Yopish',
      challenge: 'Muammo',
      solution: 'Bizning Yechim',
      results: 'Natijalar',
      technologiesUsed: 'Ishlatilgan Texnologiyalar'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      programs: 'Программы',
      services: 'Услуги',
      portfolio: 'Портфолио',
      mentors: 'Менторы',
      about: 'О нас',
      resources: 'Ресурсы',
      careers: 'Карьера',
      blog: 'Блог',
      news: 'Новости',
      contact: 'Контакты',
      applyNow: 'Записаться'
    },
    hero: {
      title: 'AI Хаб Узбекистана',
      subtitle: 'Где инновации встречаются с возможностями. Учитесь, создавайте и развивайтесь в ведущей AI экосистеме Центральной Азии.',
      getStarted: 'Присоединиться',
      learnMore: 'Подробнее',
      studentsServed: 'Членов сообщества',
      engagementRate: 'Показатель успеха',
      programsOffered: 'Программы и Услуги',
      jobPlacement: 'Трудоустройство'
    },
    sections: {
      services: 'Наши Услуги',
      servicesSubtitle: 'Комплексные AI решения, адаптированные к потребностям вашего бизнеса',
      programs: 'Наши Программы',
      programsSubtitle: 'Комплексные программы обучения AI для любого уровня подготовки',
      portfolio: 'Истории Успеха',
      portfolioSubtitle: 'Реальные проекты, реальные результаты, реальное влияние',
      team: 'Наша Команда',
      teamSubtitle: 'Опытные преподаватели, увлеченные AI образованием',
      resources: 'Учебные Ресурсы',
      resourcesSubtitle: 'Бесплатный доступ к комплексным учебным материалам по AI',
      careers: 'Присоединяйтесь к Нам',
      careersSubtitle: 'Станьте частью AI революции - откройте вакансии',
      contact: 'Свяжитесь с Нами',
      contactSubtitle: 'Готовы преобразовать свое будущее с помощью AI? Свяжитесь с нами сегодня'
    },
    services: {
      aiConsulting: {
        title: 'AI Консалтинг',
        description: 'Экспертная консультация по AI стратегии для преобразования вашего бизнеса.'
      },
      customDevelopment: {
        title: 'Разработка AI Решений',
        description: 'Создайте индивидуальные AI решения для ваших уникальных задач.'
      },
      dataAnalytics: {
        title: 'Аналитика Данных',
        description: 'Раскройте потенциал ваших данных с помощью передовой аналитики.'
      },
      aiTraining: {
        title: 'Обучение AI',
        description: 'Повысьте квалификацию вашей команды с помощью практических программ обучения AI.'
      },
      learnMore: 'Узнать больше',
      popular: 'Популярно'
    },
    programs: {
      aiFundamentals: {
        title: 'Основы AI',
        description: 'Освойте основы искусственного интеллекта, машинного обучения и практических применений.',
        duration: '2 месяца',
        level: 'Начальный',
        features: ['Введение в AI и ML', 'Практические проекты', 'Освоение AI инструментов', 'Сертификация']
      },
      aipreneurs: {
        title: 'AIpreneurs',
        description: 'Создавайте бизнесы на базе AI и воплощайте свои идеи в жизнь.',
        duration: '3 месяца',
        level: 'Средний',
        features: ['Разработка AI продуктов', 'Дизайн бизнес-модели', 'Стратегия выхода на рынок', 'Презентация инвесторам']
      },
      dataScienceMastery: {
        title: 'Мастерство Data Science',
        description: 'Углубленное изучение анализа данных, визуализации и прогнозного моделирования.',
        duration: '4 месяца',
        level: 'Продвинутый',
        features: ['Продвинутая статистика', 'Python, R, SQL', 'ML алгоритмы', 'Реальные проекты']
      },
      popular: 'Популярно'
    },
    portfolio: {
      smartBanking: {
        title: 'Умная Банковская Платформа',
        client: 'Крупное Финансовое Учреждение',
        description: 'AI-аналитика, сокращающая мошенничество на 85%',
        results: '$12M экономии в год'
      },
      healthcareDiagnostic: {
        title: 'Диагностический AI для Здравоохранения',
        client: 'Региональный Медицинский Центр',
        description: 'Ассистент диагностики с точностью 94%',
        results: 'Помощь 500+ пациентам ежедневно'
      },
      ecommerceRecommender: {
        title: 'E-Commerce Рекомендатель',
        client: 'Ведущий Онлайн Ритейлер',
        description: 'Персонализированные рекомендации, увеличивающие продажи на 45%',
        results: '$8.5M дополнительного дохода'
      },
      resultsLabel: 'Результаты:',
      featured: 'Избранное'
    },
    team: {
      member1: {
        name: 'Исомиддин Эргашев',
        role: 'Ведущий AI Инструктор',
        expertise: 'Машинное Обучение, Data Engineering'
      },
      member2: {
        name: 'Сарвар Каримов',
        role: 'Эксперт Data Science',
        expertise: 'Аналитика, Визуализация'
      },
      member3: {
        name: 'Нилуфар Рашидова',
        role: 'AI Бизнес Стратег',
        expertise: 'AI Стратегия, Управление Продуктом'
      }
    },
    resources: {
      mlCourse: {
        title: 'Курс Машинного Обучения',
        type: 'Видео Курс',
        duration: '8 часов'
      },
      aiForBusiness: {
        title: 'AI для Бизнес-Лидеров',
        type: 'Электронная Книга',
        pages: '120 страниц'
      },
      nlpMasterclass: {
        title: 'Мастер-класс NLP',
        type: 'Интерактивный',
        duration: '12 часов'
      },
      accessNow: 'Получить Доступ',
      popular: 'Популярно'
    },
    careers: {
      seniorEngineer: {
        title: 'Старший AI/ML Инженер',
        location: 'Удаленно / Ташкент',
        type: 'Полная занятость'
      },
      productManager: {
        title: 'AI Менеджер Продукта',
        location: 'Гибрид / Ташкент',
        type: 'Полная занятость'
      },
      dataScientist: {
        title: 'Data Scientist',
        location: 'Удаленно',
        type: 'Полная занятость'
      },
      applyNow: 'Подать Заявку'
    },
    cta: {
      title: 'Готовы Присоединиться к AI Революции Узбекистана?',
      subtitle: 'Станьте частью ведущего AI сообщества Узбекистана – учитесь, создавайте и внедряйте инновации вместе с нами',
      getStarted: 'Начать Сегодня'
    },
    footer: {
      tagline: 'Ведущий AI Хаб Узбекистана – Инновации и Образование',
      newsletter: 'Подписаться на рассылку',
      emailPlaceholder: 'Введите ваш email',
      subscribe: 'Подписаться',
      allRightsReserved: 'Все права защищены'
    },
    servicesPage: {
      heroTitle: 'AI Решения для',
      heroTitleHighlight: 'Любых Задач',
      heroSubtitle: 'От стратегии до внедрения, мы предоставляем комплексные AI услуги, которые трансформируют бизнес и стимулируют инновации.',
      allServices: 'Все Услуги',
      getStarted: 'Начать',
      mostPopular: 'Самое Популярное',
      ctaTitle: 'Готовы Трансформировать Свой Бизнес с AI?',
      ctaSubtitle: 'Давайте обсудим, как наши AI услуги могут помочь вам достичь ваших целей.',
      scheduleConsultation: 'Запланировать Консультацию',
      viewOurWork: 'Посмотреть Наши Работы'
    },
    portfolioPage: {
      heroTitle: 'Трансформация Бизнеса с',
      heroTitleHighlight: 'AI Инновациями',
      heroSubtitle: 'Изучите наше портфолио успешных AI внедрений, которые принесли измеримые результаты нашим клиентам.',
      allProjects: 'Все Проекты',
      viewCaseStudy: 'Просмотреть Кейс',
      featured: 'Избранное',
      projectsCompleted: 'Завершенных Проектов',
      clientSatisfaction: 'Удовлетворенность Клиентов',
      industryCoverage: 'Охваченных Отраслей',
      avgROI: 'Средний ROI',
      close: 'Закрыть',
      challenge: 'Проблема',
      solution: 'Наше Решение',
      results: 'Результаты',
      technologiesUsed: 'Используемые Технологии'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('ai-station-language');
    return savedLang || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ai-station-language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const changeLanguage = (lang) => {
    if (['en', 'uz', 'ru'].includes(lang)) {
      setLanguage(lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
