import { useEffect } from 'react';
import { ENV } from '@/lib/env';
import { Star } from 'lucide-react';

interface TrustpilotWidgetProps {
  businessunitId?: string;
  templateId?: string;
  theme?: 'light' | 'dark';
  stars?: string;
  schemeId?: string;
  reviewLanguages?: string;
  className?: string;
}

export const TrustpilotWidget = ({ 
  businessunitId = ENV.TRUSTPILOT_BUSINESS_ID || '507f1f77bcf86cd799439011',
  templateId = '5419b6a8b0d04a076446a9ad', // Default review template
  theme = 'light',
  stars = '4,5', // Show 4 and 5 star reviews
  schemeId = '0',
  reviewLanguages = 'en',
  className = ''
}: TrustpilotWidgetProps) => {
  const widgetId = `trustpilot-widget-${Math.random().toString(36).substr(2, 9)}`;

  // Don't render if Trustpilot is not enabled
  if (!ENV.TRUSTPILOT_ENABLED || !ENV.TRUSTPILOT_BUSINESS_ID) {
    return null;
  }

  useEffect(() => {
    // Load Trustpilot script if not already loaded
    const loadTrustpilotScript = () => {
      if (document.querySelector('script[src*="trustpilot"]')) {
        renderWidget();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    };

    const renderWidget = () => {
      // Clear any existing widget
      const container = document.getElementById(widgetId);
      if (container && (window as any).Trustpilot) {
        (window as any).Trustpilot.loadFromElement(container);
      }
    };

    loadTrustpilotScript();
  }, [widgetId, businessunitId, templateId]);

  return (
    <div
      id={widgetId}
      className={`trustpilot-widget ${className}`}
      data-locale="en-US"
      data-template-id={templateId}
      data-businessunit-id={businessunitId}
      data-style-height="100%"
      data-style-width="100%"
      data-theme={theme}
      data-stars={stars}
      data-scheme-id={schemeId}
      data-review-languages={reviewLanguages}
    >
      {/* Fallback content while loading or when Trustpilot is unavailable */}
      <div className={`flex items-center gap-2 ${className ?? ""}`}>
        <span className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-semibold">
          <Star className="h-3 w-3 text-green-600 fill-green-600" aria-hidden />
          TRUSTPILOT
        </span>
        <span className="text-sm font-bold">4.8/5</span>
        <span className="text-xs text-muted-foreground">from WispFi clients</span>
      </div>
    </div>
  );
};

// Compact footer badge version
export const TrustpilotBadge = () => {
  // Don't render if Trustpilot is not enabled
  if (!ENV.TRUSTPILOT_ENABLED || !ENV.TRUSTPILOT_BUSINESS_ID) {
    return null;
  }
  
  return (
    <TrustpilotWidget 
      templateId="5419b6ffb0d04a076446a9af" // Micro star template
      className="inline-block max-w-[220px]"
    />
  );
};