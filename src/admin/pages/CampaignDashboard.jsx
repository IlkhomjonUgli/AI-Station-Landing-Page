import React, { useState, useEffect } from 'react';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const CampaignDashboard = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [linkForm, setLinkForm] = useState({
        baseUrl: 'https://aistation.uz/',
        source: '',
        medium: '',
        campaign: '',
        content: '',
        term: ''
    });
    const [generatedLink, setGeneratedLink] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('admin_token');
            const res = await fetch(buildURL(`${API_ENDPOINTS.analyticsCampaigns}?period=30d`), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setCampaigns(data.data.campaigns);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLinkFormChange = (e) => {
        setLinkForm({ ...linkForm, [e.target.name]: e.target.value });
    };

    const generateLink = () => {
        const params = new URLSearchParams();
        if (linkForm.source) params.set('utm_source', linkForm.source);
        if (linkForm.medium) params.set('utm_medium', linkForm.medium);
        if (linkForm.campaign) params.set('utm_campaign', linkForm.campaign);
        if (linkForm.content) params.set('utm_content', linkForm.content);
        if (linkForm.term) params.set('utm_term', linkForm.term);

        const fullLink = `${linkForm.baseUrl}?${params.toString()}`;
        setGeneratedLink(fullLink);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('Link copied to clipboard!');
    };

    if (loading) {
        return <div style={styles.loading}>Loading campaign data...</div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Campaign Tracking</h1>

            {/* Link Generator Tool */}
            <div style={styles.linkGenerator}>
                <h2 style={styles.subtitle}>🔗 Campaign Link Generator</h2>
                <p style={styles.description}>Create tracking links for your marketing campaigns</p>

                <div style={styles.form}>
                    <div style={styles.formRow}>
                        <div style={styles.formField}>
                            <label style={styles.label}>Base URL *</label>
                            <input
                                type="text"
                                name="baseUrl"
                                value={linkForm.baseUrl}
                                onChange={handleLinkFormChange}
                                style={styles.input}
                                placeholder="https://aistation.uz/"
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formField}>
                            <label style={styles.label}>Source * (where traffic comes from)</label>
                            <input
                                type="text"
                                name="source"
                                value={linkForm.source}
                                onChange={handleLinkFormChange}
                                style={styles.input}
                                placeholder="instagram, linkedin, telegram, google"
                            />
                        </div>
                        <div style={styles.formField}>
                            <label style={styles.label}>Medium * (marketing medium)</label>
                            <input
                                type="text"
                                name="medium"
                                value={linkForm.medium}
                                onChange={handleLinkFormChange}
                                style={styles.input}
                                placeholder="paid, organic, social, email"
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formField}>
                            <label style={styles.label}>Campaign Name *</label>
                            <input
                                type="text"
                                name="campaign"
                                value={linkForm.campaign}
                                onChange={handleLinkFormChange}
                                style={styles.input}
                                placeholder="jan_ai_course, summer_sale"
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formField}>
                            <label style={styles.label}>Content (ad variant - optional)</label>
                            <input
                                type="text"
                                name="content"
                                value={linkForm.content}
                                onChange={handleLinkFormChange}
                                style={styles.input}
                                placeholder="carousel_ad, video_ad, banner_1"
                            />
                        </div>
                        <div style={styles.formField}>
                            <label style={styles.label}>Term (keywords - optional)</label>
                            <input
                                type="text"
                                name="term"
                                value={linkForm.term}
                                onChange={handleLinkFormChange}
                                style={styles.input}
                                placeholder="ai education, machine learning"
                            />
                        </div>
                    </div>

                    <button onClick={generateLink} style={styles.generateBtn}>
                        Generate Tracking Link
                    </button>

                    {generatedLink && (
                        <div style={styles.linkOutput}>
                            <label style={styles.label}>Generated Link:</label>
                            <div style={styles.linkBox}>
                                <code style={styles.linkText}>{generatedLink}</code>
                                <button onClick={copyToClipboard} style={styles.copyBtn}>
                                    📋 Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Campaign Performance Table */}
            <div style={styles.campaignsSection}>
                <h2 style={styles.subtitle}>📊 Campaign Performance (Last 30 Days)</h2>

                {campaigns.length === 0 ? (
                    <div style={styles.empty}>
                        <p>No campaign data yet. Start using tracking links to see performance data!</p>
                        <p style={styles.exampleHint}>👆 Use the link generator above to create your first campaign link</p>
                    </div>
                ) : (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Campaign</th>
                                    <th style={styles.th}>Source</th>
                                    <th style={styles.th}>Medium</th>
                                    <th style={styles.th}>Visits</th>
                                    <th style={styles.th}>Visitors</th>
                                    <th style={styles.th}>Avg. Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign, index) => (
                                    <tr key={index} style={styles.tr}>
                                        <td style={styles.td}>{campaign.campaign}</td>
                                        <td style={styles.td}>
                                            <span style={styles.badge}>{campaign.source}</span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.mediumBadge}>{campaign.medium}</span>
                                        </td>
                                        <td style={styles.td}>{campaign.visits}</td>
                                        <td style={styles.td}>{campaign.visitors}</td>
                                        <td style={styles.td}>
                                            {Math.floor(campaign.avgDuration / 60)}m {campaign.avgDuration % 60}s
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Quick Examples */}
            <div style={styles.examples}>
                <h3 style={styles.examplesTitle}>💡 Example Tracking Links:</h3>
                <div style={styles.examplesList}>
                    <div style={styles.example}>
                        <strong>Instagram Ad:</strong>
                        <code style={styles.exampleCode}>
                            ?utm_source=instagram&utm_medium=paid&utm_campaign=jan_course
                        </code>
                    </div>
                    <div style={styles.example}>
                        <strong>LinkedIn Post:</strong>
                        <code style={styles.exampleCode}>
                            ?utm_source=linkedin&utm_medium=social&utm_campaign=thought_leadership
                        </code>
                    </div>
                    <div style={styles.example}>
                        <strong>Telegram Channel:</strong>
                        <code style={styles.exampleCode}>
                            ?utm_source=telegram&utm_medium=organic&utm_campaign=channel_announcement
                        </code>
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
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#000000',
        marginBottom: '24px'
    },
    subtitle: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#000000',
        marginBottom: '12px'
    },
    description: {
        fontSize: '14px',
        color: '#737373',
        marginBottom: '20px'
    },
    linkGenerator: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        marginBottom: '24px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
    },
    formField: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#000000',
        marginBottom: '6px'
    },
    input: {
        padding: '10px',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px'
    },
    generateBtn: {
        padding: '12px 24px',
        background: '#2563EB',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '8px'
    },
    linkOutput: {
        marginTop: '16px'
    },
    linkBox: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        padding: '12px',
        background: '#F5F5F5',
        borderRadius: '4px'
    },
    linkText: {
        flex: 1,
        fontSize: '13px',
        color: '#000000',
        wordBreak: 'break-all'
    },
    copyBtn: {
        padding: '8px 16px',
        background: '#16A34A',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    },
    campaignsSection: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        marginBottom: '24px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#737373'
    },
    exampleHint: {
        fontSize: '13px',
        marginTop: '12px'
    },
    tableContainer: {
        overflowX: 'auto'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        textAlign: 'left',
        padding: '12px',
        borderBottom: '2px solid #E5E5E5',
        fontSize: '13px',
        fontWeight: 600,
        color: '#737373'
    },
    tr: {
        borderBottom: '1px solid #F5F5F5'
    },
    td: {
        padding: '12px',
        fontSize: '14px',
        color: '#000000'
    },
    badge: {
        padding: '4px 8px',
        background: '#DBEAFE',
        color: '#2563EB',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600
    },
    mediumBadge: {
        padding: '4px 8px',
        background: '#DCFCE7',
        color: '#16A34A',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600
    },
    examples: {
        background: '#FFFBEB',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #FDE68A'
    },
    examplesTitle: {
        fontSize: '16px',
        fontWeight: 600,
        marginBottom: '12px'
    },
    examplesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    example: {
        fontSize: '13px'
    },
    exampleCode: {
        display: 'block',
        marginTop: '4px',
        padding: '8px',
        background: '#FFFFFF',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '12px'
    }
};

export default CampaignDashboard;
