import React from 'react';
import { motion } from 'framer-motion';

const MentorNetwork = () => {
    const internationalMentors = [
        {
            name: 'Javokhir Jurakhodjaev',
            role: 'Data & AI',
            company: 'Bloomberg',
            location: 'London',
            initials: 'JJ'
        },
        {
            name: 'Timur Turatali',
            role: 'Co-founder at CorePod',
            company: 'ex-Citibank',
            location: 'International',
            initials: 'TT'
        },
        {
            name: 'Adkham Zokhirov',
            role: 'Developer Expert',
            company: 'Google',
            location: 'International',
            initials: 'AZ'
        },
        {
            name: 'Timur Sattarov',
            role: 'Data Scientist',
            company: 'Deutsche Bundesbank',
            location: 'Germany',
            initials: 'TS'
        },
        {
            name: 'Jawad Raza',
            role: 'Head of Data Analytics',
            company: 'ex-Barclays VP',
            location: 'International',
            initials: 'JR'
        },
        {
            name: 'Mashrab Ochilov',
            role: 'Cyber Security Specialist',
            company: 'Group-IB',
            location: 'International',
            initials: 'MO'
        }
    ];

    const regionalLeaders = [
        {
            name: 'Davron Ikhmatullayev',
            role: 'Lead AI Engineer',
            company: 'Ucell',
            location: 'Uzbekistan',
            initials: 'DI'
        },
        {
            name: 'Farrukh Kholmukhamedov',
            role: 'CPO',
            company: 'Paynet',
            location: 'Uzbekistan',
            initials: 'FK'
        },
        {
            name: 'Sardorbek Khujaev',
            role: 'Team Lead',
            company: 'Uzum Bank',
            location: 'Uzbekistan',
            initials: 'SK'
        },
        {
            name: 'Ruslan Ensebaev',
            role: 'Chief of Directorate',
            company: 'CenterCredit',
            location: 'Kazakhstan',
            initials: 'RE'
        }
    ];

    const MentorCard = ({ mentor, index, isInternational }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={styles.card}
        >
            {/* Photo Placeholder */}
            <div style={{
                ...styles.avatar,
                background: isInternational
                    ? 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)'
                    : 'linear-gradient(135deg, #6B97FC 0%, #9B8AFF 100%)'
            }}>
                <span style={styles.initials}>{mentor.initials}</span>
            </div>

            {/* Mentor Info */}
            <div style={styles.info}>
                <h3 style={styles.name}>{mentor.name}</h3>
                <p style={styles.role}>{mentor.role}</p>
                <div style={styles.companyBadge}>
                    <span style={styles.companyName}>{mentor.company}</span>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section id="mentors" style={styles.section}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.header}
                >
                    <span style={styles.kicker}>OUR NETWORK</span>
                    <h2 style={styles.title}>Global Mentor Network</h2>
                    <p style={styles.subtitle}>
                        Learn from industry leaders who've built AI solutions at the world's top companies
                    </p>
                </motion.div>

                {/* International Mentors */}
                <div style={styles.subsection}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={styles.subsectionHeader}
                    >
                        <div style={styles.subsectionIcon}>🌍</div>
                        <div>
                            <h3 style={styles.subsectionTitle}>International Mentors</h3>
                            <p style={styles.subsectionSubtitle}>Global expertise from Fortune 500 & Big Tech</p>
                        </div>
                    </motion.div>

                    <div style={styles.grid}>
                        {internationalMentors.map((mentor, index) => (
                            <MentorCard
                                key={mentor.name}
                                mentor={mentor}
                                index={index}
                                isInternational={true}
                            />
                        ))}
                    </div>
                </div>

                {/* Regional Leaders */}
                <div style={styles.subsection}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={styles.subsectionHeader}
                    >
                        <div style={styles.subsectionIcon}>🏛️</div>
                        <div>
                            <h3 style={styles.subsectionTitle}>Regional Industry Leaders</h3>
                            <p style={styles.subsectionSubtitle}>Driving innovation across Central Eurasia</p>
                        </div>
                    </motion.div>

                    <div style={styles.gridRegional}>
                        {regionalLeaders.map((mentor, index) => (
                            <MentorCard
                                key={mentor.name}
                                mentor={mentor}
                                index={index}
                                isInternational={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: 'var(--space-12) 0',
        position: 'relative'
    },
    header: {
        textAlign: 'center',
        marginBottom: 'var(--space-8)',
        maxWidth: '700px',
        margin: '0 auto var(--space-8)'
    },
    kicker: {
        display: 'inline-block',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: 'var(--primary-spectrum)',
        marginBottom: 'var(--space-2)'
    },
    title: {
        fontSize: 'var(--text-h1)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-3)',
        fontFamily: 'var(--font-display)',
        lineHeight: 1.2
    },
    subtitle: {
        fontSize: 'var(--text-h4)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6
    },
    subsection: {
        marginBottom: 'var(--space-8)'
    },
    subsectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-4)',
        paddingBottom: 'var(--space-2)',
        borderBottom: '1px solid rgba(107, 151, 252, 0.2)'
    },
    subsectionIcon: {
        fontSize: '2rem',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(107, 151, 252, 0.1)',
        borderRadius: 'var(--radius-md)'
    },
    subsectionTitle: {
        fontSize: 'var(--text-h3)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        margin: 0,
        fontFamily: 'var(--font-display)'
    },
    subsectionSubtitle: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        margin: 0
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)'
    },
    gridRegional: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-4)'
    },
    card: {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        border: '1px solid rgba(107, 151, 252, 0.15)',
        textAlign: 'center',
        cursor: 'default',
        transition: 'all 0.3s ease'
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto var(--space-3)',
        boxShadow: '0 4px 20px rgba(84, 88, 255, 0.2)'
    },
    initials: {
        color: '#fff',
        fontSize: 'var(--text-h3)',
        fontWeight: 700,
        fontFamily: 'var(--font-display)'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    name: {
        fontSize: 'var(--text-body)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        margin: 0,
        fontFamily: 'var(--font-display)'
    },
    role: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        fontStyle: 'italic',
        margin: 0
    },
    companyBadge: {
        marginTop: '8px'
    },
    companyName: {
        display: 'inline-block',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        color: '#5458FF',
        background: 'rgba(84, 88, 255, 0.1)',
        padding: '4px 12px',
        borderRadius: '20px',
        letterSpacing: '0.05em'
    }
};

// Add responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 1024px) {
    #mentors .grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    #mentors .grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default MentorNetwork;
