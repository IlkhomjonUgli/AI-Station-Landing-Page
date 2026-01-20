import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { buildURL, API_ENDPOINTS } from '../../config/api';
import StatsCard from '../components/StatsCard';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [trends, setTrends] = useState([]);
    const [sources, setSources] = useState(null);
    const [popularPages, setPopularPages] = useState([]);
    const [realTimeUsers, setRealTimeUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
        // Refresh real-time users every 30 seconds
        const interval = setInterval(fetchRealTimeUsers, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('admin_token');
            const headers = {
                'Authorization': `Bearer ${token} `
            };

            // Fetch all analytics data
            const [dashboardRes, trendsRes, sourcesRes, pagesRes, realtimeRes] = await Promise.all([
                fetch(buildURL(`${API_ENDPOINTS.analyticsDashboard}?period = 30d`), { headers }),
                fetch(buildURL(`${API_ENDPOINTS.analyticsTrends}?days = 30`), { headers }),
                fetch(buildURL(`${API_ENDPOINTS.analyticsSources}?period = 30d`), { headers }),
                fetch(buildURL(`${API_ENDPOINTS.analyticsPages}?period = 30d & limit=10`), { headers }),
                fetch(buildURL(API_ENDPOINTS.analyticsRealtime), { headers })
            ]);

            const statsData = await dashboardRes.json();
            const trendsData = await trendsRes.json();
            const sourcesData = await sourcesRes.json();
            const pagesData = await pagesRes.json();
            const realtimeData = await realtimeRes.json();

            if (statsData.success) setStats(statsData.data);
            if (trendsData.success) {
                // Format trends data for chart
                const formattedTrends = trendsData.data.trends.map(t => ({
                    date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    views: parseInt(t.views),
                    visitors: parseInt(t.visitors)
                }));
                setTrends(formattedTrends);
            }
            if (sourcesData.success) setSources(sourcesData.data.sources);
            if (pagesData.success) setPopularPages(pagesData.data.pages);
            if (realtimeData.success) setRealTimeUsers(realtimeData.data.activeUsers);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRealTimeUsers = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(buildURL(API_ENDPOINTS.analyticsRealtime), {
                headers: { 'Authorization': `Bearer ${token} ` }
            });
            const data = await res.json();
            if (data.success) setRealTimeUsers(data.data.activeUsers);
        } catch (error) {
            console.error('Error fetching real-time users:', error);
        }
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs} s`;
    };

    if (loading) {
        return (
            <div style={styles.loading}>
                <p>Loading analytics...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Analytics Dashboard</h1>
                    <p style={styles.subtitle}>Website performance insights (Last 30 days)</p>
                </div>
                <div style={styles.realTime}>
                    <span style={styles.pulse}>●</span>
                    <span>{realTimeUsers} active now</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <StatsCard
                    title="Total Visitors"
                    value={stats?.totalVisitors?.toLocaleString() || '0'}
                    icon="👥"
                />
                <StatsCard
                    title="Page Views"
                    value={stats?.totalPageViews?.toLocaleString() || '0'}
                    icon="👁️"
                />
                <StatsCard
                    title="Avg. Duration"
                    value={stats?.avgDuration ? formatDuration(stats.avgDuration) : '0s'}
                    icon="⏱️"
                />
                <StatsCard
                    title="Bounce Rate"
                    value={`${stats?.bounceRate || 0}% `}
                    icon="📉"
                />
            </div>

            {/* Visitor Trends Chart */}
            <div style={styles.chartContainer}>
                <h3 style={styles.chartTitle}>Visitor Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visitors" stroke="#2563EB" strokeWidth={2} name="Visitors" />
                        <Line type="monotone" dataKey="views" stroke="#16A34A" strokeWidth={2} name="Page Views" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Row: Sources and Popular Pages */}
            <div style={styles.bottomRow}>
                {/* Traffic Sources */}
                <div style={styles.sourcesContainer}>
                    <h3 style={styles.chartTitle}>Traffic Sources</h3>
                    {sources && (
                        <div style={styles.sourcesList}>
                            <div style={styles.sourceItem}>
                                <div style={styles.sourceLabel}>
                                    <span style={styles.sourceIcon}>🌐</span>
                                    <span>Direct</span>
                                </div>
                                <div style={styles.sourceBar}>
                                    <div
                                        style={{
                                            ...styles.sourceBarFill,
                                            width: `${(sources.direct / (sources.direct + sources.search + sources.social + sources.referral) * 100)}% `,
                                            background: '#2563EB'
                                        }}
                                    />
                                </div>
                                <span style={styles.sourceValue}>{sources.direct}</span>
                            </div>

                            <div style={styles.sourceItem}>
                                <div style={styles.sourceLabel}>
                                    <span style={styles.sourceIcon}>🔍</span>
                                    <span>Search</span>
                                </div>
                                <div style={styles.sourceBar}>
                                    <div
                                        style={{
                                            ...styles.sourceBarFill,
                                            width: `${(sources.search / (sources.direct + sources.search + sources.social + sources.referral) * 100)}% `,
                                            background: '#16A34A'
                                        }}
                                    />
                                </div>
                                <span style={styles.sourceValue}>{sources.search}</span>
                            </div>

                            <div style={styles.sourceItem}>
                                <div style={styles.sourceLabel}>
                                    <span style={styles.sourceIcon}>📱</span>
                                    <span>Social</span>
                                </div>
                                <div style={styles.sourceBar}>
                                    <div
                                        style={{
                                            ...styles.sourceBarFill,
                                            width: `${(sources.social / (sources.direct + sources.search + sources.social + sources.referral) * 100)}% `,
                                            background: '#CA8A04'
                                        }}
                                    />
                                </div>
                                <span style={styles.sourceValue}>{sources.social}</span>
                            </div>

                            <div style={styles.sourceItem}>
                                <div style={styles.sourceLabel}>
                                    <span style={styles.sourceIcon}>🔗</span>
                                    <span>Referral</span>
                                </div>
                                <div style={styles.sourceBar}>
                                    <div
                                        style={{
                                            ...styles.sourceBarFill,
                                            width: `${(sources.referral / (sources.direct + sources.search + sources.social + sources.referral) * 100)}% `,
                                            background: '#DC2626'
                                        }}
                                    />
                                </div>
                                <span style={styles.sourceValue}>{sources.referral}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Popular Pages */}
                <div style={styles.pagesContainer}>
                    <h3 style={styles.chartTitle}>Popular Pages</h3>
                    <div style={styles.pagesList}>
                        {popularPages.map((page, index) => (
                            <div key={index} style={styles.pageItem}>
                                <span style={styles.pageRank}>{index + 1}</span>
                                <span style={styles.pagePath}>{page.path}</span>
                                <span style={styles.pageViews}>{page.views} views</span>
                            </div>
                        ))}
                        {popularPages.length === 0 && (
                            <p style={styles.emptyText}>No data yet. Visit some pages to see analytics!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: '#FAFAFA',
        padding: '20px'
    },
    loading: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#737373'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#000000',
        margin: 0,
        marginBottom: '4px'
    },
    subtitle: {
        fontSize: '14px',
        color: '#737373',
        margin: 0
    },
    realTime: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: '#DCFCE7',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 600,
        color: '#16A34A'
    },
    pulse: {
        fontSize: '12px',
        animation: 'pulse 2s infinite'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
    },
    chartContainer: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        marginBottom: '24px'
    },
    chartTitle: {
        fontSize: '18px',
        fontWeight: 600,
        color: '#000000',
        marginBottom: '20px',
        marginTop: 0
    },
    bottomRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
    },
    sourcesContainer: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5'
    },
    sourcesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    sourceItem: {
        display: 'grid',
        gridTemplateColumns: '140px 1fr 60px',
        alignItems: 'center',
        gap: '12px'
    },
    sourceLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 500
    },
    sourceIcon: {
        fontSize: '18px'
    },
    sourceBar: {
        height: '24px',
        background: '#F5F5F5',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    sourceBarFill: {
        height: '100%',
        transition: 'width 0.3s ease'
    },
    sourceValue: {
        fontSize: '14px',
        fontWeight: 600,
        textAlign: 'right'
    },
    pagesContainer: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5'
    },
    pagesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    pageItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        background: '#FAFAFA',
        borderRadius: '4px'
    },
    pageRank: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#2563EB',
        color: '#FFFFFF',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 700,
        flexShrink: 0
    },
    pagePath: {
        flex: 1,
        fontSize: '14px',
        color: '#000000',
        fontFamily: 'monospace'
    },
    pageViews: {
        fontSize: '12px',
        color: '#737373',
        fontWeight: 600
    },
    emptyText: {
        textAlign: 'center',
        color: '#A3A3A3',
        fontSize: '14px',
        padding: '40px 20px'
    }
};

export default AnalyticsDashboard;
