import { useEffect, useState } from 'react';
import { ENV } from '@/lib/env';

// Third-party script loader with performance optimization
const loadScript = (src: string, id: string, defer = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    if (defer) script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

export const ThirdPartyScripts = () => {
  useEffect(() => {
    // Load scripts with priority order and error handling
    const loadAllScripts = async () => {
      try {
        // GTM is now loaded via index.html for proper site-wide coverage

        // Hotjar - Analytics
        if (ENV.HOTJAR_ID) {
          (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
            h.hj = h.hj || function(...args: any[]) {
              (h.hj.q = h.hj.q || []).push(args);
            };
            h._hjSettings = { hjid: ENV.HOTJAR_ID, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script');
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
          })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
        }

        // Trustpilot - Social proof
        if (ENV.TRUSTPILOT_ENABLED) {
          await loadScript(
            'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
            'trustpilot-script'
          );
        }

        // reCAPTCHA v3 - Security (load only with a valid site key)
        // if (ENV.RECAPTCHA_SITE_KEY && ENV.RECAPTCHA_SITE_KEY !== 'YOUR_RECAPTCHA_SITE_KEY' && /^6[0-9A-Za-z-_]{20,}$/.test(ENV.RECAPTCHA_SITE_KEY)) {
        //   await loadScript(
        //     `https://www.google.com/recaptcha/api.js?render=${ENV.RECAPTCHA_SITE_KEY}`,
        //     'recaptcha-script'
        //   );
        // }

      } catch (error) {
        console.warn('Some third-party scripts failed to load:', error);
      }
    };

    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAllScripts);
    } else {
      setTimeout(loadAllScripts, 100);
    }
  }, []);

  return null; // This component doesn't render anything
};

// Cookie consent banner
export const CookieConsent = () => {  
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check localStorage on component mount
    const consentStatus = localStorage.getItem('cookieConsent');
    if (consentStatus === 'accepted') {
      setHasConsent(true);
    }

    if (ENV.ONETRUST_DOMAIN_ID) {
      loadScript(
        `https://cdn.cookielaw.org/scripttemplates/otSDKStub.js`,
        'onetrust-script'
      ).then(() => {
        // Initialize OneTrust
        (window as any).OptanonWrapper = function() {
          // OneTrust callback
        };
      });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setHasConsent(true);
  };

  if (!ENV.ONETRUST_DOMAIN_ID) {
    // Fallback simple cookie notice - only show if consent not given
    if (hasConsent) {
      return null;
    }

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <span>
            We use cookies to improve your experience and analyze site usage. 
            By continuing, you agree to our cookie policy.
          </span>
          <button 
            className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white ml-4"
            onClick={handleAccept}
          >
            Accept
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="onetrust-consent-sdk"
      data-domain-script={ENV.ONETRUST_DOMAIN_ID}
    />
  );
};

// Exit intent popup component - DISABLED to prevent duplicate with React ExitIntentModal
// Keeping the React ExitIntentModal.tsx component as the single exit-intent mechanism
export const ExitIntentPopup = () => {
  // This component is disabled to avoid duplicate exit-intent popups
  // The React ExitIntentModal.tsx component handles exit-intent behavior
  return null;
};