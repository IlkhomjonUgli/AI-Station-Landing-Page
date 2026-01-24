import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig, getHreflangLinks } from '../config/seo';

/**
 * SEO Component - Manages meta tags, Open Graph, Twitter Cards, and hreflang
 *
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {array} keywords - Array of keywords
 * @param {string} image - Absolute URL to Open Graph image
 * @param {string} type - Page type (website, article)
 * @param {object} article - Article-specific metadata (for blog posts)
 * @param {string} language - Current language (en, uz, ru)
 */
const SEO = ({
  title,
  description,
  keywords = [],
  image,
  type = 'website',
  article,
  language = 'en'
}) => {
  const location = useLocation();

  // Construct full URLs
  const canonicalUrl = `${seoConfig.siteUrl}${location.pathname}`;
  const fullTitle = title.includes('|') ? title : `${title} | AI Station`;
  const ogImage = image?.startsWith('http') ? image : `${seoConfig.siteUrl}${image || seoConfig.defaultImage}`;
  const hreflangLinks = getHreflangLinks(location.pathname);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content="AI Station" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="AI Station" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'uz' ? 'uz_UZ' : 'ru_RU'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@aistation" />
      <meta name="twitter:creator" content="@aistation" />

      {/* Article-specific meta tags (for blog posts) */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Hreflang for multilingual support */}
      {hreflangLinks.map((link) => (
        <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
      ))}

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Mobile & PWA */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="AI Station" />

      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="UZ-TK" />
      <meta name="geo.placename" content="Tashkent" />
      <meta name="geo.position" content="41.2995;69.2401" />
      <meta name="ICBM" content="41.2995, 69.2401" />
    </Helmet>
  );
};

export default SEO;
