import { useCallback } from 'react';
import { ENV } from '@/lib/env';

// Hook for reCAPTCHA v3 integration
export const useRecaptcha = () => {
  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!ENV.RECAPTCHA_SITE_KEY || typeof window === 'undefined') {
      console.warn('reCAPTCHA not configured or running on server');
      return null;
    }

    // Wait for reCAPTCHA to be ready
    if (!(window as any).grecaptcha) {
      console.warn('reCAPTCHA not loaded');
      return null;
    }

    try {
      await new Promise((resolve) => {
        (window as any).grecaptcha.ready(resolve);
      });

      const token = await (window as any).grecaptcha.execute(ENV.RECAPTCHA_SITE_KEY, {
        action: action
      });

      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return null;
    }
  }, []);

  return { executeRecaptcha };
};