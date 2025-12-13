import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export const PerformanceOptimizer = ({ children }: PerformanceOptimizerProps) => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Lazy load images optimization
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }

    // Track Core Web Vitals
    import('web-vitals').then((webVitals) => {
      if (webVitals.onCLS) {
        webVitals.onCLS((metric) => {
          trackEvent({
            action: 'web_vital_cls',
            category: 'performance',
            label: 'cumulative_layout_shift',
            value: Math.round(metric.value * 1000),
          });
        });
      }

      if (webVitals.onINP) {
        webVitals.onINP((metric) => {
          trackEvent({
            action: 'web_vital_inp',
            category: 'performance',
            label: 'interaction_to_next_paint',
            value: Math.round(metric.value),
          });
        });
      }

      if (webVitals.onFCP) {
        webVitals.onFCP((metric) => {
          trackEvent({
            action: 'web_vital_fcp',
            category: 'performance',
            label: 'first_contentful_paint',
            value: Math.round(metric.value),
          });
        });
      }

      if (webVitals.onLCP) {
        webVitals.onLCP((metric) => {
          trackEvent({
            action: 'web_vital_lcp',
            category: 'performance',
            label: 'largest_contentful_paint',
            value: Math.round(metric.value),
          });
        });
      }

      if (webVitals.onTTFB) {
        webVitals.onTTFB((metric) => {
          trackEvent({
            action: 'web_vital_ttfb',
            category: 'performance',
            label: 'time_to_first_byte',
            value: Math.round(metric.value),
          });
        });
      }
    }).catch(() => {
      // Web vitals not available
    });

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent({
          action: 'scroll_depth',
          category: 'engagement',
          label: `${scrollPercent}%`,
          value: scrollPercent,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackEvent]);

  return <>{children}</>;
};