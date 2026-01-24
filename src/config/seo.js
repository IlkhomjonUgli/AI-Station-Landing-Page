// SEO Configuration for AI Station
// Contains meta tags, keywords, and structured data for all pages in all languages

export const seoConfig = {
  // Site-wide defaults
  defaultTitle: "AI Station - AI Education Hub of Uzbekistan",
  titleTemplate: "%s | AI Station",
  siteUrl: "https://aistation.uz",
  defaultImage: "/og-default.jpg",

  // Organization details for structured data
  organization: {
    name: "AI Station",
    legalName: "AI Station Education Center",
    alternateName: "AI Station Uzbekistan",
    foundingDate: "2020",
    address: {
      streetAddress: "", // Will be filled with actual address
      addressLocality: "Tashkent",
      addressRegion: "Tashkent",
      postalCode: "",
      addressCountry: "UZ"
    },
    geo: {
      latitude: "41.2995",
      longitude: "69.2401"
    },
    telephone: "+998 55 512 55 77",
    email: "info@aistation.uz",
    url: "https://aistation.uz",
    logo: "https://aistation.uz/logo.png",
    sameAs: [
      "https://linkedin.com/company/aistation",
      "https://facebook.com/aistation",
      "https://instagram.com/aistation",
      "https://twitter.com/aistation",
      "https://t.me/aistation"
    ],
    areaServed: ["Uzbekistan", "Central Asia", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan"],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "AI Education",
      "AI Consulting",
      "AI Development"
    ]
  },

  // Page-specific SEO metadata
  pages: {
    home: {
      en: {
        title: "AI Station - Transform Your Future with AI Education in Tashkent, Uzbekistan",
        description: "Uzbekistan's premier AI education hub in Tashkent. Learn Artificial Intelligence, Machine Learning, and Data Science from international experts. Join 5000+ students building careers in AI across Central Asia.",
        keywords: [
          "AI education Uzbekistan",
          "AI courses Tashkent",
          "machine learning Uzbekistan",
          "data science Central Asia",
          "AI bootcamp Tashkent",
          "AI training Uzbekistan",
          "AI Station",
          "artificial intelligence education Tashkent",
          "ML courses Uzbekistan",
          "AI academy Central Asia"
        ],
        image: "/og-default.jpg"
      },
      uz: {
        title: "AI Station - Sun'iy Intellekt Ta'limi | Toshkent, O'zbekiston",
        description: "O'zbekistonning yetakchi sun'iy intellekt ta'lim markazi Toshkentda. Xalqaro mutaxassislardan AI, mashina o'rganish va ma'lumotlar fanini o'rganing. Markaziy Osiyoda AI sohasida martaba qurayotgan 5000+ talabaga qo'shiling.",
        keywords: [
          "AI ta'lim O'zbekiston",
          "AI kurslari Toshkent",
          "mashina o'rganish O'zbekiston",
          "ma'lumotlar fani Markaziy Osiyo",
          "AI bootcamp Toshkent",
          "AI Station"
        ],
        image: "/og-default.jpg"
      },
      ru: {
        title: "AI Station - Образование в Сфере ИИ | Ташкент, Узбекистан",
        description: "Ведущий образовательный центр искусственного интеллекта в Узбекистане, Ташкент. Изучайте ИИ, машинное обучение и Data Science у международных экспертов. Присоединяйтесь к 5000+ студентам, строящим карьеру в ИИ в Центральной Азии.",
        keywords: [
          "AI образование Узбекистан",
          "курсы AI Ташкент",
          "машинное обучение Узбекистан",
          "data science Центральная Азия",
          "AI bootcamp Ташкент",
          "AI Station"
        ],
        image: "/og-default.jpg"
      }
    },

    programs: {
      en: {
        title: "AI & Machine Learning Programs - Professional Training in Tashkent",
        description: "Comprehensive AI, Machine Learning, and Data Science programs in Tashkent, Uzbekistan. From fundamentals to advanced topics: Deep Learning, NLP, Computer Vision. Taught in English, Uzbek, and Russian. 2-6 month intensive courses.",
        keywords: [
          "AI programs Uzbekistan",
          "machine learning courses Tashkent",
          "data science bootcamp Central Asia",
          "deep learning course Tashkent",
          "NLP training Uzbekistan",
          "computer vision course Tashkent",
          "AI certification Uzbekistan"
        ],
        image: "/og-programs.jpg"
      },
      uz: {
        title: "AI va Mashina O'rganish Dasturlari - Toshkentda Professional Ta'lim",
        description: "Toshkent, O'zbekistonda keng qamrovli AI, mashina o'rganish va ma'lumotlar fani dasturlari. Asoslardan ilg'or mavzulargacha: Chuqur o'rganish, NLP, Kompyuter ko'rishi. Ingliz, o'zbek va rus tillarida o'qitiladi. 2-6 oylik intensiv kurslar.",
        keywords: [
          "AI dasturlari O'zbekiston",
          "mashina o'rganish kurslari Toshkent",
          "ma'lumotlar fani bootcamp Markaziy Osiyo"
        ],
        image: "/og-programs.jpg"
      },
      ru: {
        title: "Программы ИИ и Машинного Обучения - Профессиональное Обучение в Ташкенте",
        description: "Комплексные программы по ИИ, машинному обучению и Data Science в Ташкенте, Узбекистан. От основ до продвинутых тем: глубокое обучение, NLP, компьютерное зрение. Преподавание на английском, узбекском и русском. Интенсивные курсы 2-6 месяцев.",
        keywords: [
          "программы ИИ Узбекистан",
          "курсы машинного обучения Ташкент",
          "bootcamp data science Центральная Азия"
        ],
        image: "/og-programs.jpg"
      }
    },

    services: {
      en: {
        title: "AI Consulting & Development Services - Enterprise Solutions in Central Asia",
        description: "Professional AI consulting, custom development, and corporate training services in Uzbekistan. Transform your business with AI solutions. Hybrid, digital, and offline engagement models for banking, government, healthcare, and more.",
        keywords: [
          "AI consulting Uzbekistan",
          "AI development Tashkent",
          "corporate AI training Central Asia",
          "enterprise AI solutions Uzbekistan",
          "AI transformation Tashkent"
        ],
        image: "/og-services.jpg"
      },
      uz: {
        title: "AI Konsalting va Ishlab Chiqish Xizmatlari - Korporativ Yechimlar",
        description: "O'zbekistonda professional AI konsalting, maxsus ishlab chiqish va korporativ o'qitish xizmatlari. Biznesingizni AI yechimlari bilan o'zgartiring. Bank, davlat, sog'liqni saqlash va boshqalar uchun gibrid, raqamli va oflayn xizmat modellari.",
        keywords: [
          "AI konsalting O'zbekiston",
          "AI ishlab chiqish Toshkent",
          "korporativ AI o'qitish Markaziy Osiyo"
        ],
        image: "/og-services.jpg"
      },
      ru: {
        title: "Консалтинг и Разработка ИИ - Корпоративные Решения в Центральной Азии",
        description: "Профессиональные услуги консалтинга, разработки и корпоративного обучения ИИ в Узбекистане. Трансформируйте свой бизнес с решениями ИИ. Гибридные, цифровые и офлайн модели для банков, правительства, здравоохранения и других сфер.",
        keywords: [
          "AI консалтинг Узбекистан",
          "разработка AI Ташкент",
          "корпоративное обучение AI Центральная Азия"
        ],
        image: "/og-services.jpg"
      }
    },

    portfolio: {
      en: {
        title: "Success Stories & Case Studies - AI Projects in Uzbekistan",
        description: "Real AI projects with real impact. Explore our portfolio of successful AI implementations with Ministry of Justice, Aloqabank, and corporate partners across Uzbekistan. 150+ projects, 95% client satisfaction, 340% average ROI.",
        keywords: [
          "AI projects Uzbekistan",
          "AI case studies Central Asia",
          "AI success stories Tashkent",
          "AI implementation Uzbekistan",
          "corporate AI projects Tashkent"
        ],
        image: "/og-default.jpg"
      },
      uz: {
        title: "Muvaffaqiyat Hikoyalari va Tadqiqotlar - O'zbekistonda AI Loyihalari",
        description: "Haqiqiy ta'sirga ega bo'lgan haqiqiy AI loyihalari. Adliya Vazirligi, Aloqabank va O'zbekiston bo'ylab korporativ hamkorlar bilan muvaffaqiyatli amalga oshirilgan AI loyihalarimiz bilan tanishing. 150+ loyiha, 95% mijoz mamnunligi.",
        keywords: [
          "AI loyihalari O'zbekiston",
          "AI tadqiqotlari Markaziy Osiyo",
          "AI muvaffaqiyat Toshkent"
        ],
        image: "/og-default.jpg"
      },
      ru: {
        title: "Истории Успеха и Кейсы - ИИ Проекты в Узбекистане",
        description: "Реальные ИИ проекты с реальным воздействием. Изучите наше портфолио успешных внедрений ИИ с Министерством юстиции, Aloqabank и корпоративными партнерами по Узбекистану. 150+ проектов, 95% удовлетворенность клиентов.",
        keywords: [
          "AI проекты Узбекистан",
          "AI кейсы Центральная Азия",
          "истории успеха AI Ташкент"
        ],
        image: "/og-default.jpg"
      }
    },

    blog: {
      en: {
        title: "AI Education Blog - Insights from Central Asia's Leading AI Hub",
        description: "Latest insights, trends, and tutorials on AI, Machine Learning, and Data Science. Expert articles from AI Station instructors in Tashkent, Uzbekistan. Learn about AI education, career paths, and industry trends in Central Asia.",
        keywords: [
          "AI blog Uzbekistan",
          "machine learning articles Tashkent",
          "AI education insights Central Asia",
          "AI tutorials Uzbekistan",
          "AI trends Tashkent"
        ],
        image: "/og-default.jpg"
      },
      uz: {
        title: "AI Ta'lim Blogi - Markaziy Osiyoning Yetakchi AI Markazidan Tushunchalar",
        description: "AI, mashina o'rganish va ma'lumotlar fani bo'yicha so'nggi tushunchalar, tendentsiyalar va darsliklar. Toshkent, O'zbekistondagi AI Station o'qituvchilarining mutaxassis maqolalari.",
        keywords: [
          "AI blog O'zbekiston",
          "mashina o'rganish maqolalari Toshkent",
          "AI ta'lim tushunchalari Markaziy Osiyo"
        ],
        image: "/og-default.jpg"
      },
      ru: {
        title: "Блог об Образовании в ИИ - Инсайты от Ведущего Центра ИИ Центральной Азии",
        description: "Последние инсайты, тренды и обучающие материалы по ИИ, машинному обучению и Data Science. Экспертные статьи от инструкторов AI Station в Ташкенте, Узбекистан.",
        keywords: [
          "AI блог Узбекистан",
          "статьи машинное обучение Ташкент",
          "инсайты AI образование Центральная Азия"
        ],
        image: "/og-default.jpg"
      }
    },

    news: {
      en: {
        title: "AI Station News - Latest Updates from Uzbekistan's AI Education Hub",
        description: "Stay updated with the latest news, announcements, and events from AI Station in Tashkent, Uzbekistan. New programs, partnerships, success stories, and AI community updates across Central Asia.",
        keywords: [
          "AI news Uzbekistan",
          "AI Station updates",
          "AI events Tashkent",
          "AI education news Central Asia"
        ],
        image: "/og-default.jpg"
      },
      uz: {
        title: "AI Station Yangiliklari - O'zbekistonning AI Ta'lim Markazidan So'nggi Yangiliklar",
        description: "Toshkent, O'zbekistondagi AI Stationdan so'nggi yangil iklar, e'lonlar va tadbirlar bilan yangilanib turing. Yangi dasturlar, hamkorliklar, muvaffaqiyat hikoyalari.",
        keywords: [
          "AI yangiliklari O'zbekiston",
          "AI Station yangilanishlar",
          "AI tadbirlari Toshkent"
        ],
        image: "/og-default.jpg"
      },
      ru: {
        title: "Новости AI Station - Последние Обновления от Образовательного Центра ИИ Узбекистана",
        description: "Следите за последними новостями, объявлениями и событиями от AI Station в Ташкенте, Узбекистан. Новые программы, партнерства, истории успеха и обновления AI сообщества.",
        keywords: [
          "AI новости Узбекистан",
          "обновления AI Station",
          "AI события Ташкент"
        ],
        image: "/og-default.jpg"
      }
    },

    contact: {
      en: {
        title: "Contact AI Station - Get in Touch with Tashkent's Leading AI Education Hub",
        description: "Contact AI Station in Tashkent, Uzbekistan. Inquire about AI courses, corporate training, consulting services. Phone: +998 55 512 55 77 | Email: info@aistation.uz | Visit us near WIUT Campus, Tashkent.",
        keywords: [
          "contact AI Station",
          "AI courses inquiry Tashkent",
          "AI training Uzbekistan contact",
          "AI Station Tashkent address"
        ],
        image: "/og-default.jpg"
      },
      uz: {
        title: "AI Station Bilan Bog'lanish - Toshkentning Yetakchi AI Ta'lim Markazi",
        description: "Toshkent, O'zbekistonda AI Station bilan bog'laning. AI kurslari, korporativ o'qitish, konsalting xizmatlari haqida so'rang. Telefon: +998 55 512 55 77 | Email: info@aistation.uz",
        keywords: [
          "AI Station bilan bog'lanish",
          "AI kurslariga so'rov Toshkent",
          "AI Station Toshkent manzil"
        ],
        image: "/og-default.jpg"
      },
      ru: {
        title: "Связаться с AI Station - Свяжитесь с Ведущим Образовательным Центром ИИ Ташкента",
        description: "Свяжитесь с AI Station в Ташкенте, Узбекистан. Запросите информацию о курсах ИИ, корпоративном обучении, консалтинге. Телефон: +998 55 512 55 77 | Email: info@aistation.uz",
        keywords: [
          "связаться AI Station",
          "запрос курсы AI Ташкент",
          "AI Station Ташкент адрес"
        ],
        image: "/og-default.jpg"
      }
    }
  }
};

// Helper function to get page SEO config based on language
export const getPageSEO = (page, language = 'en') => {
  const pageSEO = seoConfig.pages[page]?.[language] || seoConfig.pages[page]?.en;

  return {
    ...pageSEO,
    url: `${seoConfig.siteUrl}/${page === 'home' ? '' : page}`,
    language
  };
};

// Helper to generate hreflang links
export const getHreflangLinks = (pathname) => {
  const basePath = pathname === '/' ? '' : pathname;
  return [
    { hrefLang: 'en', href: `${seoConfig.siteUrl}${basePath}?lang=en` },
    { hrefLang: 'uz', href: `${seoConfig.siteUrl}${basePath}?lang=uz` },
    { hrefLang: 'ru', href: `${seoConfig.siteUrl}${basePath}?lang=ru` },
    { hrefLang: 'x-default', href: `${seoConfig.siteUrl}${basePath}` }
  ];
};

export default seoConfig;
