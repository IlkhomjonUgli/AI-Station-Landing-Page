import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../config/api';

// Get or create session ID
const getSessionId = () => {
    let sessionId = localStorage.getItem('analytics_session_id');

    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('analytics_session_id', sessionId);
    }

    return sessionId;
};

// Track page view
const trackPageView = async (data) => {
    try {
        await fetch(buildURL(API_ENDPOINTS.analyticsTrack), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error('Analytics tracking error:', error);
    }
};

export const useAnalytics = () => {
    const location = useLocation();
    const startTime = useRef(Date.now());

    useEffect(() => {
        // Reset start time on route change
        startTime.current = Date.now();

        // Extract UTM parameters from URL
        const params = new URLSearchParams(location.search);
        const utmParams = {
            utmSource: params.get('utm_source') || null,
            utmMedium: params.get('utm_medium') || null,
            utmCampaign: params.get('utm_campaign') || null,
            utmContent: params.get('utm_content') || null,
            utmTerm: params.get('utm_term') || null
        };

        // Track page view with UTM data
        const sessionId = getSessionId();
        trackPageView({
            sessionId,
            path: location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            ...utmParams
        });

        // Track duration when leaving page
        return () => {
            const duration = Math.round((Date.now() - startTime.current) / 1000); // in seconds

            // Send duration  update
            if (duration > 0) {
                trackPageView({
                    sessionId,
                    path: location.pathname,
                    referrer: document.referrer,
                    userAgent: navigator.userAgent,
                    duration
                });
            }
        };
    }, [location]);
};
