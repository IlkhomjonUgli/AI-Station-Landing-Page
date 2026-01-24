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
      kicker: 'CENTRAL EURASIA\'S INNOVATION HUB',
      title: 'The AI Hub of Uzbekistan',
      subtitle: 'Where innovation meets opportunity. Build, learn, and grow with Central Asia\'s leading AI ecosystem for education, research, and business transformation.',
      getStarted: 'Join the Hub',
      learnMore: 'Explore',
      studentsServed: 'Community Members',
      engagementRate: 'Success Rate',
      programsOffered: 'Programs & Services',
      jobPlacement: 'Career Placements',
      startupsIncubated: 'Startups Incubated',
      hoursInnovation: 'Hours of Innovation',
      globalMentors: 'Global Mentors',
      corporatePartners: 'Major Corporate Partners'
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
    globalContext: {
      kicker: 'GLOBAL TREND',
      title: 'The Race to Become an AI Hub',
      description: 'Nations like France (Station F) serve as global examples of how ecosystems empower innovation. AI Station is Central Eurasia\'s answer to this global trend—a centralized platform to attract regional talent, international partners, and corporate leaders to build the AI economy of tomorrow.',
      marketSize: 'Global AI Market by 2030',
      growthRate: 'Annual Growth Rate',
      mapLabel: 'Global Innovation Ecosystem'
    },
    missionStatement: {
      kicker: 'OUR MISSION',
      title: 'Building the AI Economy of Central Eurasia',
      subtitle: 'AI Station exists at the intersection of education, innovation, and industry—creating a thriving ecosystem where ideas become reality.',
      aim1Title: 'Attract Regional Talent',
      aim1Description: 'Draw the brightest minds from Central Eurasia and connect them with global partners and opportunities.',
      aim2Title: 'Co-Create with Corporations',
      aim2Description: 'Partner with industry leaders to develop practical AI solutions that address real business challenges.',
      aim3Title: 'Develop AI Entrepreneurs',
      aim3Description: 'Nurture the next generation of AI-driven founders who will build the companies of tomorrow.'
    },
    mentorNetwork: {
      leadershipKicker: 'WHO WE ARE',
      leadershipTitle: 'Leadership Team',
      leadershipSubtitle: 'The visionaries driving AI Station\'s mission forward',
      networkKicker: 'OUR NETWORK',
      title: 'Global Mentor Network',
      subtitle: 'Learn from industry leaders who\'ve built AI solutions at the world\'s top companies',
      internationalTitle: 'International Mentors',
      internationalSubtitle: 'Global expertise from Fortune 500 & Big Tech',
      regionalTitle: 'Regional Industry Leaders',
      regionalSubtitle: 'Driving innovation across Central Eurasia'
    },
    caseStudies: {
      kicker: 'PROVEN IMPACT',
      title: 'Corporate Success Stories',
      subtitle: 'Real transformations with measurable results for government and enterprise clients',
      trustedPartners: 'Trusted Partners',
      viewCase: 'View Case Study',
      close: 'Close',
      challenge: 'Challenge:',
      solution: 'Solution:',
      results: 'Results',
      participants: 'Participants',
      bootcampDuration: 'Bootcamp',
      workshopHours: 'Workshop Hours',
      mentors: 'Mentors',
      mvps: 'Ready MVPs',
      offlineHours: 'Offline Hours'
    },
    innovationGallery: {
      kicker: 'LIFE AT STATION',
      title: 'The Innovation Atmosphere',
      subtitle: 'Where ideas transform into reality, one workshop at a time',
      ctaText: '🎥 Want to see more? Follow us on social media for live updates from our community.',
      item1Title: 'Hackathons & Demo Days',
      item1Description: 'Teams presenting innovative AI solutions',
      item2Title: 'Hands-on Workshops',
      item2Description: 'Intensive classroom sessions',
      item3Title: 'Corporate Partnerships',
      item3Description: 'Networking with Aloqabank & partners',
      item4Title: 'Mentor Sessions',
      item4Description: 'One-on-one guidance from experts',
      item5Title: 'Team Building',
      item5Description: 'Collaborative problem solving',
      item6Title: 'Award Ceremonies',
      item6Description: 'Celebrating innovation achievements'
    },
    contactForm: {
      title: 'Get In Touch',
      subtitle: 'Have a question or want to work together?',
      nameLabel: 'Full Name *',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+998 90 123 45 67',
      programLabel: 'Program of Interest',
      programPlaceholder: 'Select a program or service',
      messageLabel: 'Message *',
      messagePlaceholder: 'Tell us about your goals and how we can help you...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successMessage: '✅ Thank you for your message! We\'ll get back to you soon.',
      errorMessage: 'Oops! Something went wrong. Please try again.',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      invalidEmail: 'Invalid email address',
      messageRequired: 'Message is required'
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
      kicker: 'MARKAZIY OSIYONING INNOVATSIYA MARKAZI',
      title: 'O\'zbekistonning AI Markazi',
      subtitle: 'Innovatsiya va imkoniyatlar birlashgan joy. Markaziy Osiyoning yetakchi AI ekotizimida o\'rganing, yarating va rivojlaning.',
      getStarted: 'Qo\'shiling',
      learnMore: 'Ko\'rish',
      studentsServed: 'Jamiyat a\'zolari',
      engagementRate: 'Muvaffaqiyat darajasi',
      programsOffered: 'Dasturlar va Xizmatlar',
      jobPlacement: 'Karyera joylashtirish',
      startupsIncubated: 'Inkubatsiya qilingan startaplar',
      hoursInnovation: 'Innovatsiya soatlari',
      globalMentors: 'Global mentorlar',
      corporatePartners: 'Asosiy korporativ hamkorlar'
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
    globalContext: {
      kicker: 'GLOBAL TENDENTSIYA',
      title: 'AI Markaziga Aylanish Poygasi',
      description: 'Frantsiya (Station F) kabi davlatlar ekotizimlar innovatsiyani qanday qo\'llab-quvvatlashining jahon misollariga xizmat qiladi. AI Station Markaziy Osiyoning bu global tendentsiyaga javobi - mintaqaviy iste\'dodlarni, xalqaro hamkorlarni va korporativ rahbarlarni ertangi AI iqtisodiyotini qurish uchun jalb qiluvchi markazlashgan platforma.',
      marketSize: '2030 yilga qadar Global AI Bozori',
      growthRate: 'Yillik O\'sish Sur\'ati',
      mapLabel: 'Global Innovatsiya Ekotizimi'
    },
    missionStatement: {
      kicker: 'BIZNING MISSIYAMIZ',
      title: 'Markaziy Osiyoning AI Iqtisodiyotini Qurish',
      subtitle: 'AI Station ta\'lim, innovatsiya va sanoat chorrahasi,da mavjud - g\'oyalar haqiqatga aylanadigan gullab-yashnagan ekotizimni yaratmoqda.',
      aim1Title: 'Mintaqaviy Iste\'dodlarni Jalb Qilish',
      aim1Description: 'Markaziy Osiyoning eng yorqin aqllarini jalb qiling va ularni global hamkorlar va imkoniyatlar bilan bog\'lang.',
      aim2Title: 'Korporatsiyalar Bilan Hamkorlikda Yaratish',
      aim2Description: 'Haqiqiy biznes muammolarini hal qiluvchi amaliy AI yechimlarini ishlab chiqish uchun sanoat yetakchilari bilan hamkorlik qiling.',
      aim3Title: 'AI Tadbirkorlarni Rivojlantirish',
      aim3Description: 'Ertangi kompaniyalarni quradigan AI-ga asoslangan asoschilarn ing keyingi avlodini tarbiyalang.'
    },
    mentorNetwork: {
      leadershipKicker: 'BIZ KIMLAR',
      leadershipTitle: 'Rahbariyat Jamoasi',
      leadershipSubtitle: 'AI Station missiyasini oldinga olib borayotgan vizionerlar',
      networkKicker: 'BIZNING TARMOQ',
      title: 'Global Mentor Tarmog\'i',
      subtitle: 'Dunyoning eng yaxshi kompaniyalarida AI yechimlari yaratgan sanoat yetakchilaridan o\'rganing',
      internationalTitle: 'Xalqaro Mentorlar',
      internationalSubtitle: 'Fortune 500 va Big Tech\'dan global tajriba',
      regionalTitle: 'Mintaqaviy Sanoat Yetakchilari',
      regionalSubtitle: 'Markaziy Evroosiyoda innovatsiyalarni rivojlantirish'
    },
    caseStudies: {
      kicker: 'ISBOTLANGAN TA\'SIR',
      title: 'Korporativ Muvaffaqiyat Hikoyalari',
      subtitle: 'Davlat va korxona mijozlari uchun o\'lchanishi mumkin bo\'lgan natijalar bilan haqiqiy o\'zgarishlar',
      trustedPartners: 'Ishonchli Hamkorlar',
      viewCase: 'Ish Tahlilini Ko\'rish',
      close: 'Yopish',
      challenge: 'Muammo:',
      solution: 'Yechim:',
      results: 'Natijalar',
      participants: 'Ishtirokchilar',
      bootcampDuration: 'Bootcamp',
      workshopHours: 'Seminar Soatlari',
      mentors: 'Mentorlar',
      mvps: 'Tayyor MVPlar',
      offlineHours: 'Oflayn Soatlar'
    },
    innovationGallery: {
      kicker: 'STANSIYADA HAYOT',
      title: 'Innovatsiya Atmosferasi',
      subtitle: 'G\'oyalar haqiqatga aylanadigan joy, bir seminar orqali',
      ctaText: '🎥 Ko\'proq ko\'rishni xohlaysizmi? Bizning jamiyatimizdan jonli yangiliklar uchun ijtimoiy tarmoqlarda kuzatib boring.',
      item1Title: 'Hakatonlar va Demo Kunlar',
      item1Description: 'Innovatsion AI yechimlarini taqdim etayotgan jamoalar',
      item2Title: 'Amaliy Seminarlar',
      item2Description: 'Intensiv sinf mashg\'ulotlari',
      item3Title: 'Korporativ Hamkorliklar',
      item3Description: 'Aloqabank va hamkorlar bilan tarmoqqa ulanish',
      item4Title: 'Mentor Seanslari',
      item4Description: 'Ekspertlardan yakkama-yakka yo\'l-yo\'riq',
      item5Title: 'Jamoani Qurish',
      item5Description: 'Hamkorlikda muammolarni hal qilish',
      item6Title: 'Mukofot Marosimlari',
      item6Description: 'Innovatsiya yutuqlarini nishonlash'
    },
    contactForm: {
      title: 'Bog\'laning',
      subtitle: 'Savolingiz bormi yoki birga ishlashni xohlaysizmi?',
      nameLabel: 'To\'liq Ism *',
      namePlaceholder: 'Ismingiz Familiyangiz',
      emailLabel: 'Elektron Pochta Manzili *',
      emailPlaceholder: 'ism@misol.uz',
      phoneLabel: 'Telefon Raqami',
      phonePlaceholder: '+998 90 123 45 67',
      programLabel: 'Qiziqtirgan Dastur',
      programPlaceholder: 'Dastur yoki xizmatni tanlang',
      messageLabel: 'Xabar *',
      messagePlaceholder: 'Bizga maqsadlaringiz va sizga qanday yordam berishimiz mumkinligi haqida ayting...',
      sendMessage: 'Xabar Yuborish',
      sending: 'Yuborilmoqda...',
      successMessage: '✅ Xabaringiz uchun rahmat! Biz tez orada siz bilan bog\'lanamiz.',
      errorMessage: 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.',
      nameRequired: 'Ism talab qilinadi',
      emailRequired: 'Elektron pochta talab qilinadi',
      invalidEmail: 'Noto\'g\'ri elektron pochta manzili',
      messageRequired: 'Xabar talab qilinadi'
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
      kicker: 'ИННОВАЦИОННЫЙ ХАБ ЦЕНТРАЛЬНОЙ ЕВРАЗИИ',
      title: 'AI Хаб Узбекистана',
      subtitle: 'Где инновации встречаются с возможностями. Учитесь, создавайте и развивайтесь в ведущей AI экосистеме Центральной Азии.',
      getStarted: 'Присоединиться',
      learnMore: 'Подробнее',
      studentsServed: 'Членов сообщества',
      engagementRate: 'Показатель успеха',
      programsOffered: 'Программы и Услуги',
      jobPlacement: 'Трудоустройство',
      startupsIncubated: 'Стартапов инкубировано',
      hoursInnovation: 'Часов инноваций',
      globalMentors: 'Глобальных менторов',
      corporatePartners: 'Крупных корпоративных партнеров'
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
    globalContext: {
      kicker: 'ГЛОБАЛЬНЫЙ ТРЕНД',
      title: 'Гонка за Звание AI Хаба',
      description: 'Такие страны, как Франция (Station F), служат глобальными примерами того, как экосистемы стимулируют инновации. AI Station - это ответ Центральной Евразии на этот глобальный тренд - централизованная платформа для привлечения региональных талантов, международных партнеров и корпоративных лидеров для создания AI экономики завтрашнего дня.',
      marketSize: 'Глобальный Рынок AI к 2030',
      growthRate: 'Годовой Темп Роста',
      mapLabel: 'Глобальная Инновационная Экосистема'
    },
    missionStatement: {
      kicker: 'НАША МИССИЯ',
      title: 'Построение AI Экономики Центральной Евразии',
      subtitle: 'AI Station существует на пересечении образования, инноваций и промышленности, создавая процветающую экосистему, где идеи становятся реальностью.',
      aim1Title: 'Привлечение Региональных Талантов',
      aim1Description: 'Привлекайте лучшие умы Центральной Евразии и объединяйте их с глобальными партнерами и возможностями.',
      aim2Title: 'Совместное Создание с Корпорациями',
      aim2Description: 'Партнерство с отраслевыми лидерами для разработки практических AI решений, которые решают реальные бизнес-задачи.',
      aim3Title: 'Развитие AI Предпринимателей',
      aim3Description: 'Воспитывайте следующее поколение AI-ориентированных основателей, которые создадут компании завтрашнего дня.'
    },
    mentorNetwork: {
      leadershipKicker: 'КТО МЫ',
      leadershipTitle: 'Команда Руководства',
      leadershipSubtitle: 'Визионеры, продвигающие миссию AI Station',
      networkKicker: 'НАША СЕТЬ',
      title: 'Глобальная Сеть Менторов',
      subtitle: 'Учитесь у лидеров индустрии, создавших AI решения в ведущих мировых компаниях',
      internationalTitle: 'Международные Менторы',
      internationalSubtitle: 'Глобальная экспертиза из Fortune 500 и Big Tech',
      regionalTitle: 'Региональные Отраслевые Лидеры',
      regionalSubtitle: 'Развитие инноваций в Центральной Евразии'
    },
    caseStudies: {
      kicker: 'ДОКАЗАННОЕ ВЛИЯНИЕ',
      title: 'Корпоративные Истории Успеха',
      subtitle: 'Реальные трансформации с измеримыми результатами для государственных и корпоративных клиентов',
      trustedPartners: 'Надежные Партнеры',
      viewCase: 'Посмотреть Кейс',
      close: 'Закрыть',
      challenge: 'Проблема:',
      solution: 'Решение:',
      results: 'Результаты',
      participants: 'Участники',
      bootcampDuration: 'Буткемп',
      workshopHours: 'Часы Воркшопа',
      mentors: 'Менторы',
      mvps: 'Готовые MVP',
      offlineHours: 'Офлайн Часы'
    },
    innovationGallery: {
      kicker: 'ЖИЗНЬ НА СТАНЦИИ',
      title: 'Атмосфера Инноваций',
      subtitle: 'Где идеи превращаются в реальность, один воркшоп за раз',
      ctaText: '🎥 Хотите увидеть больше? Следите за нами в социальных сетях для живых обновлений из нашего сообщества.',
      item1Title: 'Хакатоны и Демо Дни',
      item1Description: 'Команды представляют инновационные AI решения',
      item2Title: 'Практические Воркшопы',
      item2Description: 'Интенсивные аудиторные занятия',
      item3Title: 'Корпоративные Партнерства',
      item3Description: 'Нетворкинг с Aloqabank и партнерами',
      item4Title: 'Менторские Сессии',
      item4Description: 'Индивидуальное руководство от экспертов',
      item5Title: 'Тимбилдинг',
      item5Description: 'Совместное решение проблем',
      item6Title: 'Церемонии Награждения',
      item6Description: 'Празднование инновационных достижений'
    },
    contactForm: {
      title: 'Свяжитесь с Нами',
      subtitle: 'Есть вопрос или хотите сотрудничать?',
      nameLabel: 'Полное Имя *',
      namePlaceholder: 'Иван Иванов',
      emailLabel: 'Адрес Электронной Почты *',
      emailPlaceholder: 'ivan@primer.ru',
      phoneLabel: 'Номер Телефона',
      phonePlaceholder: '+998 90 123 45 67',
      programLabel: 'Интересующая Программа',
      programPlaceholder: 'Выберите программу или услугу',
      messageLabel: 'Сообщение *',
      messagePlaceholder: 'Расскажите нам о ваших целях и как мы можем вам помочь...',
      sendMessage: 'Отправить Сообщение',
      sending: 'Отправка...',
      successMessage: '✅ Спасибо за ваше сообщение! Мы скоро свяжемся с вами.',
      errorMessage: 'Упс! Что-то пошло не так. Попробуйте еще раз.',
      nameRequired: 'Имя обязательно',
      emailRequired: 'Email обязателен',
      invalidEmail: 'Неверный адрес электронной почты',
      messageRequired: 'Сообщение обязательно'
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
