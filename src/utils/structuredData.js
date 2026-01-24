// Structured Data (JSON-LD) Generators for SEO & GEO
// Schema.org markup for AI Station

import { seoConfig } from '../config/seo';

/**
 * Organization Schema - Use on homepage and site-wide
 * Tells search engines and AI about AI Station as an organization
 */
export const generateOrganizationSchema = (language = 'en') => {
  const org = seoConfig.organization;

  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${seoConfig.siteUrl}/#organization`,
    "name": org.name,
    "legalName": org.legalName,
    "alternateName": org.alternateName,
    "url": org.url,
    "logo": {
      "@type": "ImageObject",
      "url": org.logo,
      "width": "512",
      "height": "512"
    },
    "image": org.logo,
    "description": language === 'en'
      ? "AI Station is Central Asia's leading artificial intelligence education and innovation hub, located in Tashkent, Uzbekistan. We provide world-class AI, machine learning, and data science training programs."
      : language === 'uz'
      ? "AI Station Markaziy Osiyoning yetakchi sun'iy intellekt ta'lim va innovatsiya markazi bo'lib, Toshkent, O'zbekistonda joylashgan. Biz jahon darajasidagi AI, mashina o'rganish va ma'lumotlar fani ta'lim dasturlarini taqdim etamiz."
      : "AI Station - ведущий образовательный и инновационный центр искусственного интеллекта в Центральной Азии, расположенный в Ташкенте, Узбекистан. Мы предоставляем мировые программы обучения ИИ, машинному обучению и Data Science.",
    "foundingDate": org.foundingDate,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": org.address.streetAddress,
      "addressLocality": org.address.addressLocality,
      "addressRegion": org.address.addressRegion,
      "postalCode": org.address.postalCode,
      "addressCountry": org.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": org.geo.latitude,
      "longitude": org.geo.longitude
    },
    "telephone": org.telephone,
    "email": org.email,
    "sameAs": org.sameAs,
    "areaServed": org.areaServed.map(area => ({
      "@type": area.includes("Uzbekistan") || area.includes("Kazakhstan") ? "Country" : "AdministrativeArea",
      "name": area
    })),
    "knowsAbout": org.knowsAbout,
    "slogan": language === 'en'
      ? "The AI Hub of Uzbekistan - Where Innovation Meets Opportunity"
      : language === 'uz'
      ? "O'zbekistonning AI Markazi - Innovatsiya Imkoniyat Bilan Uchrashadi"
      : "ИИ Хаб Узбекистана - Где Инновации Встречают Возможности"
  };
};

/**
 * LocalBusiness Schema - Enhanced version for local SEO
 * Use on homepage and contact page
 */
export const generateLocalBusinessSchema = (language = 'en') => {
  const org = seoConfig.organization;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seoConfig.siteUrl}/#localbusiness`,
    "name": org.name,
    "image": org.logo,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": org.address.streetAddress,
      "addressLocality": org.address.addressLocality,
      "addressRegion": org.address.addressRegion,
      "postalCode": org.address.postalCode,
      "addressCountry": org.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": org.geo.latitude,
      "longitude": org.geo.longitude
    },
    "url": org.url,
    "telephone": org.telephone,
    "email": org.email,
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };
};

/**
 * Course Schema - For each AI/ML program
 * Use on Programs page for each course
 */
export const generateCourseSchema = (course, language = 'en') => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "AI Station",
      "url": seoConfig.siteUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tashkent",
        "addressCountry": "UZ"
      }
    },
    "courseCode": course.id || course.title.replace(/\s+/g, '-').toLowerCase(),
    "educationalLevel": course.level || "Professional",
    "timeRequired": course.duration,
    "inLanguage": ["en", "uz", "ru"],
    "availableLanguage": ["English", "Uzbek", "Russian"],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["onsite", "online"],
      "location": {
        "@type": "Place",
        "name": "AI Station Tashkent",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tashkent",
          "addressRegion": "Tashkent",
          "addressCountry": "Uzbekistan"
        }
      },
      "instructor": {
        "@type": "Organization",
        "name": "AI Station Expert Instructors"
      }
    },
    "teaches": course.features || [],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    },
    "isAccessibleForFree": false,
    "locationCreated": {
      "@type": "Place",
      "name": "Tashkent, Uzbekistan"
    }
  };
};

/**
 * BlogPosting Schema - For blog articles
 * Use on individual blog post pages
 */
export const generateBlogPostingSchema = (post, language = 'en') => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content?.substring(0, 160),
    "image": post.featuredImage || `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "AI Station Team",
      "url": post.author?.id ? `${seoConfig.siteUrl}/team/${post.author.id}` : seoConfig.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Station",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${seoConfig.siteUrl}/blog/${post.slug}`
    },
    "keywords": post.tags?.join(', ') || "",
    "inLanguage": language,
    "about": {
      "@type": "Thing",
      "name": "Artificial Intelligence Education"
    },
    "locationCreated": {
      "@type": "Place",
      "name": "Tashkent, Uzbekistan"
    }
  };
};

/**
 * NewsArticle Schema - For news posts
 * Use on individual news article pages
 */
export const generateNewsArticleSchema = (news, language = 'en') => {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": news.title,
    "description": news.excerpt || news.content?.substring(0, 160),
    "image": news.featuredImage || `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    "author": {
      "@type": "Person",
      "name": news.author?.name || "AI Station Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Station",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/logo.png`
      }
    },
    "datePublished": news.publishedAt,
    "dateModified": news.updatedAt || news.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${seoConfig.siteUrl}/news/${news.slug}`
    },
    "keywords": news.tags?.join(', ') || "",
    "inLanguage": language
  };
};

/**
 * FAQPage Schema - For FAQ section
 * Use on pages with FAQ content
 */
export const generateFAQSchema = (faqs, language = 'en') => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Person Schema - For team members
 * Use on About page or team profiles
 */
export const generatePersonSchema = (person) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.role,
    "description": person.bio,
    "image": person.image,
    "worksFor": {
      "@type": "Organization",
      "name": "AI Station"
    },
    "sameAs": [
      person.linkedin,
      person.twitter,
      person.github
    ].filter(Boolean)
  };
};

/**
 * BreadcrumbList Schema - For navigation breadcrumbs
 * Use on all pages to show hierarchy
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${seoConfig.siteUrl}${crumb.path}`
    }))
  };
};

/**
 * ItemList Schema - For lists of courses, blog posts, etc.
 * Use on Programs page, Blog page
 */
export const generateItemListSchema = (items, listType = "Course") => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": listType,
        "name": item.title || item.name,
        "description": item.description,
        "url": item.url
      }
    }))
  };
};

/**
 * Service Schema - For AI consulting and development services
 * Use on Services page
 */
export const generateServiceSchema = (service, language = 'en') => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "AI Station"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Uzbekistan"
    },
    "serviceType": service.category || "AI Consulting",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": seoConfig.siteUrl,
      "serviceLocation": {
        "@type": "Place",
        "name": "Tashkent, Uzbekistan"
      }
    }
  };
};

/**
 * Review Schema - For testimonials
 * Use on homepage or testimonials section
 */
export const generateReviewSchema = (review) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.authorName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating || "5",
      "bestRating": "5"
    },
    "reviewBody": review.text,
    "itemReviewed": {
      "@type": "EducationalOrganization",
      "name": "AI Station"
    }
  };
};

/**
 * WebSite Schema - For site-wide search functionality
 * Use on homepage
 */
export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Station",
    "url": seoConfig.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${seoConfig.siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

export default {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateCourseSchema,
  generateBlogPostingSchema,
  generateNewsArticleSchema,
  generateFAQSchema,
  generatePersonSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateServiceSchema,
  generateReviewSchema,
  generateWebSiteSchema
};
