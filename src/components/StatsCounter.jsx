import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { animateCounter } from '../utils/helpers';
import { useLanguage } from '../utils/contexts';

const StatsCounter = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([
    { value: 0, target: 300, suffix: '+', label: t('hero.studentsServed') },
    { value: 0, target: 95, suffix: '%', label: t('hero.engagementRate') },
    { value: 0, target: 5, suffix: '+', label: t('hero.programsOffered') },
    { value: 0, target: 92, suffix: '%', label: t('hero.jobPlacement') }
  ]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      counters.forEach((counter, index) => {
        setTimeout(() => {
          animateCounter(0, counter.target, 2000, (current) => {
            setCounters(prev => {
              const updated = [...prev];
              updated[index] = { ...updated[index], value: current };
              return updated;
            });
          });
        }, index * 100);
      });
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} style={statsStyles.section}>
      <div className="container">
        <div style={statsStyles.grid}>
          {counters.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={statsStyles.statCard}
            >
              <div style={statsStyles.statValue}>
                <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '3rem' }}>
                  {stat.value}{stat.suffix}
                </span>
              </div>
              <div style={statsStyles.statLabel}>{stat.label}</div>
              <div style={statsStyles.statBar}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: '100%' } : {}}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  style={statsStyles.statBarFill}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const statsStyles = {
  section: {
    padding: 'var(--space-12) 0',
    background: 'var(--bg-primary)',
    position: 'relative'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-4)'
  },
  statCard: {
    padding: 'var(--space-4)',
    textAlign: 'center',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    transition: 'all 0.3s ease'
  },
  statValue: {
    marginBottom: 'var(--space-2)'
  },
  statLabel: {
    fontSize: 'var(--text-body)',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    marginBottom: 'var(--space-2)'
  },
  statBar: {
    height: '4px',
    background: 'var(--bg-tertiary)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  statBarFill: {
    height: '100%',
    background: 'var(--gradient-primary)',
    borderRadius: '2px'
  }
};

// Responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default StatsCounter;
