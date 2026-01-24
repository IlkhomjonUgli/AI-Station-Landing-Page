import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Generate dynamic XML sitemap
 * Combines static routes with dynamic content from database
 * Includes multilingual hreflang tags
 */
export const generateSitemap = async (req, res) => {
  try {
    const siteUrl = process.env.SITE_URL || 'https://aistation.uz';
    const currentDate = new Date().toISOString().split('T')[0];

    // Static routes with priorities and change frequencies
    const staticRoutes = [
      { path: '', priority: '1.0', changefreq: 'daily' }, // Home
      { path: '/programs', priority: '0.9', changefreq: 'weekly' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
      { path: '/blog', priority: '0.8', changefreq: 'daily' },
      { path: '/news', priority: '0.8', changefreq: 'daily' }
    ];

    // Fetch all published blog posts
    const blogPosts = await prisma.post.findMany({
      where: {
        type: 'blog',
        status: 'published'
      },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });

    // Fetch all published news articles
    const newsPosts = await prisma.post.findMany({
      where: {
        type: 'news',
        status: 'published'
      },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });

    // Fetch all active portfolio projects
    const portfolioProjects = await prisma.portfolio.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Helper function to generate URL entry with hreflang
    const generateUrlEntry = (path, lastmod, priority, changefreq) => {
      const url = path ? `${siteUrl}${path}` : siteUrl;
      return `
  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${url}?lang=en"/>
    <xhtml:link rel="alternate" hreflang="uz" href="${url}?lang=uz"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${url}?lang=ru"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    };

    // Helper function for dynamic content without hreflang (specific posts)
    const generateDynamicUrlEntry = (path, lastmod, priority, changefreq) => {
      return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    };

    // Build XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    // Add static routes
    staticRoutes.forEach(route => {
      sitemap += generateUrlEntry(route.path, currentDate, route.priority, route.changefreq);
    });

    // Add blog posts
    blogPosts.forEach(post => {
      const lastmod = post.updatedAt
        ? post.updatedAt.toISOString().split('T')[0]
        : post.publishedAt.toISOString().split('T')[0];
      sitemap += generateDynamicUrlEntry(`/blog/${post.slug}`, lastmod, '0.7', 'monthly');
    });

    // Add news articles
    newsPosts.forEach(post => {
      const lastmod = post.updatedAt
        ? post.updatedAt.toISOString().split('T')[0]
        : post.publishedAt.toISOString().split('T')[0];
      sitemap += generateDynamicUrlEntry(`/news/${post.slug}`, lastmod, '0.7', 'monthly');
    });

    // Add portfolio projects
    portfolioProjects.forEach(project => {
      const lastmod = project.updatedAt
        ? project.updatedAt.toISOString().split('T')[0]
        : currentDate;
      sitemap += generateDynamicUrlEntry(`/portfolio/${project.id}`, lastmod, '0.6', 'monthly');
    });

    sitemap += '\n</urlset>';

    // Set proper headers for XML
    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(sitemap);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
  }
};

export default generateSitemap;
