import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  source?: string;
  campaign?: string;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    try {
      // GTM/GA4 tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_parameter_source: event.source,
          custom_parameter_campaign: event.campaign,
        });
      }

      console.log('Analytics Event:', event);

      // Microsoft Clarity custom events
      if (typeof window !== 'undefined' && window.clarity) {
        window.clarity('event', `${event.category}_${event.action}`);
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, []);

  const trackNewsletterSignup = useCallback((source: string) => {
    trackEvent({
      action: 'newsletter_signup',
      category: 'engagement',
      label: source,
      source: source,
    });
  }, [trackEvent]);

  const trackCTAClick = useCallback((ctaText: string, source: string, destination: string) => {
    trackEvent({
      action: 'cta_click',
      category: 'conversion',
      label: ctaText,
      source: source,
      campaign: destination,
    });
  }, [trackEvent]);

  const trackBlogEngagement = useCallback((action: 'view' | 'read_time' | 'scroll', postSlug: string, value?: number) => {
    trackEvent({
      action: `blog_${action}`,
      category: 'content',
      label: postSlug,
      value: value,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackNewsletterSignup,
    trackCTAClick,
    trackBlogEngagement,
  };
};

// Extend window object for TypeScript
declare global {
  interface Window {
    clarity?: (action: string, event: string) => void;
  }
}