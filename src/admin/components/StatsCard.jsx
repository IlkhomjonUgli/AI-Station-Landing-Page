import React from 'react';

const StatsCard = ({ title, value, change, icon, color = '#000000' }) => {
    const isPositive = change && parseFloat(change) >= 0;

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <span style={styles.icon}>{icon}</span>
                <span style={styles.title}>{title}</span>
            </div>
            <div style={styles.value}>{value}</div>
            {change && (
                <div style={{
                    ...styles.change,
                    color: isPositive ? '#16A34A' : '#DC2626'
                }}>
                    {isPositive ? '↗' : '↘'} {change}%
                </div>
            )}
        </div>
    );
};

const styles = {
    card: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
    },
    icon: {
        fontSize: '20px'
    },
    title: {
        fontSize: '14px',
        color: '#737373',
        fontWeight: 500
    },
    value: {
        fontSize: '32px',
        fontWeight: 700,
        color: '#000000',
        marginBottom: '8px'
    },
    change: {
        fontSize: '14px',
        fontWeight: 600
    }
};

export default StatsCard;
