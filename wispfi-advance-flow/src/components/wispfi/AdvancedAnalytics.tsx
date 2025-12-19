import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const AdvancedAnalytics = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page load time
    const trackPageLoadTime = () => {
      const loadTime = Math.round(performance.now());
      trackEvent({
        action: "page_load_time",
        category: "performance",
        value: loadTime,
      });
    };

    // Track scroll depth
    let maxScrollPercent = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      if (scrollPercent > maxScrollPercent) {
        maxScrollPercent = scrollPercent;

        // Track at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackEvent({
            action: "scroll_depth",
            category: "engagement",
            label: `${scrollPercent}%`,
            value: scrollPercent,
          });
        }
      }
    };

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      trackEvent({
        action: "time_on_page",
        category: "engagement",
        value: timeOnPage,
      });
    };

    // Track form interactions
    const trackFormInteractions = () => {
      document.querySelectorAll("form").forEach((form, index) => {
        form.addEventListener(
          "focusin",
          () => {
            trackEvent({
              action: "form_start",
              category: "conversion",
              label: form.id || `form_${index}`,
            });
          },
          { once: true },
        );

        form.addEventListener("submit", () => {
          trackEvent({
            action: "form_submit",
            category: "conversion",
            label: form.id || `form_${index}`,
          });
        });
      });
    };

    // Track CTA clicks
    const trackCTAClicks = () => {
      document.querySelectorAll('button, a[href*="eligibility"], a[href*="apply"]').forEach((el) => {
        el.addEventListener("click", () => {
          const text = el.textContent?.trim() || "";
          const href = (el as HTMLAnchorElement).href || "";

          trackEvent({
            action: "cta_click",
            category: "conversion",
            label: text,
            source: window.location.pathname,
            campaign: href,
          });
        });
      });
    };

    // Track exit intent
    let hasTrackedExitIntent = false;
    const trackExitIntent = (e: MouseEvent) => {
      if (!hasTrackedExitIntent && e.clientY <= 0) {
        hasTrackedExitIntent = true;
        trackEvent({
          action: "exit_intent",
          category: "engagement",
          source: window.location.pathname,
        });
      }
    };

    // Initialize tracking
    setTimeout(trackPageLoadTime, 1000);
    trackFormInteractions();
    trackCTAClicks();

    // Add event listeners
    window.addEventListener("scroll", trackScrollDepth, { passive: true });
    window.addEventListener("beforeunload", trackTimeOnPage);
    document.addEventListener("mouseleave", trackExitIntent);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
      window.removeEventListener("beforeunload", trackTimeOnPage);
      document.removeEventListener("mouseleave", trackExitIntent);
    };
  }, [trackEvent]);

  return null;
};
