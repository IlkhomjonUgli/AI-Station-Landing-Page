import prisma from '../config/database.js';

// Track a page view
export const trackPageView = async (req, res, next) => {
    try {
        const {
            sessionId,
            path,
            referrer,
            userAgent,
            duration,
            utmSource,
            utmMedium,
            utmCampaign,
            utmContent,
            utmTerm
        } = req.body;

        if (!sessionId || !path) {
            return res.status(400).json({
                success: false,
                error: 'SessionId and path are required'
            });
        }

        // Get IP address (basic - can be enhanced with X-Forwarded-For)
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Check if session exists, create or update
        const session = await prisma.session.upsert({
            where: { id: sessionId },
            create: {
                id: sessionId,
                referrer: referrer || null,
                pageCount: 1,
                isReturning: false
            },
            update: {
                pageCount: { increment: 1 },
                lastVisit: new Date()
            }
        });

        // Create page view record
        const pageView = await prisma.pageView.create({
            data: {
                sessionId,
                path,
                referrer: referrer || null,
                userAgent: userAgent || null,
                ipAddress,
                duration: duration || null,
                utmSource: utmSource || null,
                utmMedium: utmMedium || null,
                utmCampaign: utmCampaign || null,
                utmContent: utmContent || null,
                utmTerm: utmTerm || null
            }
        });

        res.json({
            success: true,
            data: { pageView }
        });
    } catch (error) {
        next(error);
    }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res, next) => {
    try {
        const { period = '30d' } = req.query;

        // Calculate date range
        const days = parseInt(period.replace('d', ''));
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Total page views
        const totalPageViews = await prisma.pageView.count({
            where: { createdAt: { gte: startDate } }
        });

        // Total unique visitors (unique sessions)
        const totalVisitors = await prisma.session.count({
            where: { firstVisit: { gte: startDate } }
        });

        // New vs returning visitors
        const newVisitors = await prisma.session.count({
            where: {
                firstVisit: { gte: startDate },
                isReturning: false
            }
        });

        const returningVisitors = await prisma.session.count({
            where: {
                firstVisit: { gte: startDate },
                isReturning: true
            }
        });

        // Average pages per session
        const avgPagesPerSession = totalVisitors > 0
            ? (totalPageViews / totalVisitors).toFixed(2)
            : 0;

        // Calculate bounce rate (sessions with only 1 page view)
        const singlePageSessions = await prisma.session.count({
            where: {
                firstVisit: { gte: startDate },
                pageCount: 1
            }
        });
        const bounceRate = totalVisitors > 0
            ? ((singlePageSessions / totalVisitors) * 100).toFixed(1)
            : 0;

        // Average session duration (using page durations)
        const avgDurationResult = await prisma.pageView.aggregate({
            where: {
                createdAt: { gte: startDate },
                duration: { not: null }
            },
            _avg: { duration: true }
        });
        const avgDuration = Math.round(avgDurationResult._avg.duration || 0);

        res.json({
            success: true,
            data: {
                totalPageViews,
                totalVisitors,
                newVisitors,
                returningVisitors,
                avgPagesPerSession: parseFloat(avgPagesPerSession),
                bounceRate: parseFloat(bounceRate),
                avgDuration,
                period: `${days} days`
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get visitor trends (daily breakdown)
export const getVisitorTrends = async (req, res, next) => {
    try {
        const { days = 30 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        // Get page views grouped by date
        const pageViews = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT session_id) as visitors
      FROM page_views
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

        res.json({
            success: true,
            data: { trends: pageViews }
        });
    } catch (error) {
        next(error);
    }
};

// Get traffic sources breakdown
export const getTrafficSources = async (req, res, next) => {
    try {
        const { period = '30d' } = req.query;
        const days = parseInt(period.replace('d', ''));
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Get all sessions with their referrers
        const sessions = await prisma.session.findMany({
            where: { firstVisit: { gte: startDate } },
            select: { referrer: true }
        });

        // Categorize traffic sources
        const sources = {
            direct: 0,
            search: 0,
            social: 0,
            referral: 0
        };

        sessions.forEach(session => {
            if (!session.referrer || session.referrer === '') {
                sources.direct++;
            } else if (
                session.referrer.includes('google') ||
                session.referrer.includes('bing') ||
                session.referrer.includes('yahoo') ||
                session.referrer.includes('duckduckgo')
            ) {
                sources.search++;
            } else if (
                session.referrer.includes('facebook') ||
                session.referrer.includes('twitter') ||
                session.referrer.includes('linkedin') ||
                session.referrer.includes('instagram')
            ) {
                sources.social++;
            } else {
                sources.referral++;
            }
        });

        res.json({
            success: true,
            data: { sources }
        });
    } catch (error) {
        next(error);
    }
};

// Get popular pages
export const getPopularPages = async (req, res, next) => {
    try {
        const { period = '30d', limit = 10 } = req.query;
        const days = parseInt(period.replace('d', ''));
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Get page views grouped by path
        const popularPages = await prisma.pageView.groupBy({
            by: ['path'],
            where: { createdAt: { gte: startDate } },
            _count: { path: true },
            orderBy: { _count: { path: 'desc' } },
            take: parseInt(limit)
        });

        const pages = popularPages.map(page => ({
            path: page.path,
            views: page._count.path
        }));

        res.json({
            success: true,
            data: { pages }
        });
    } catch (error) {
        next(error);
    }
};

// Get real-time active users (sessions in last 5 minutes)
export const getRealTimeUsers = async (req, res, next) => {
    try {
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

        const activeUsers = await prisma.session.count({
            where: { lastVisit: { gte: fiveMinutesAgo } }
        });

        res.json({
            success: true,
            data: { activeUsers }
        });
    } catch (error) {
        next(error);
    }
};

// Get campaign performance
export const getCampaignPerformance = async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;
    const days = parseInt(period.replace('d', ''));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get campaigns with performance metrics
    const campaigns = await prisma.pageView.groupBy({
      by: ['utmSource', 'utmMedium', 'utmCampaign'],
      where: {
        createdAt: { gte: startDate },
        utmCampaign: { not: null }
      },
      _count: { id: true },
      _sum: { duration: true },
      orderBy: { _count: { id: 'desc' } }
    });

    // Format campaign data
    const campaignData = await Promise.all(
      campaigns.map(async (campaign) => {
        // Get unique visitors for this campaign
        const uniqueVisitors = await prisma.pageView.findMany({
          where: {
            createdAt: { gte: startDate },
            utmSource: campaign.utmSource,
            utmMedium: campaign.utmMedium,
            utmCampaign: campaign.utmCampaign
          },
          distinct: ['sessionId'],
          select: { sessionId: true }
        });

        return {
          source: campaign.utmSource,
          medium: campaign.utmMedium,
          campaign: campaign.utmCampaign,
          visits: campaign._count.id,
          visitors: uniqueVisitors.length,
          avgDuration: campaign._sum.duration 
            ? Math.round(campaign._sum.duration / campaign._count.id)
            : 0
        };
      })
    );

    res.json({
      success: true,
      data: { campaigns: campaignData }
    });
  } catch (error) {
    next(error);
  }
};
