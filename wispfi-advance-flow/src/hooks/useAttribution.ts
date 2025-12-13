import { useEffect, useState } from 'react';

interface AttributionData {
  gclid: string;
  gbraid: string;
  wbraid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_path: string;
  original_referrer: string;
  device_type: string;
}

const ATTRIBUTION_COOKIE_PREFIX = 'wispfi_attr_';
const COOKIE_EXPIRY_DAYS = 30;

export const useAttribution = () => {
  const [attribution, setAttribution] = useState<AttributionData>({
    gclid: '',
    gbraid: '',
    wbraid: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    landing_path: '',
    original_referrer: '',
    device_type: ''
  });

  const setCookie = (name: string, value: string, days: number = COOKIE_EXPIRY_DAYS) => {
    if (!value) return;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${ATTRIBUTION_COOKIE_PREFIX}${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  const getCookie = (name: string): string => {
    const nameEQ = `${ATTRIBUTION_COOKIE_PREFIX}${name}=`;
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return '';
  };

  const getDeviceType = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  };

  const captureAttribution = () => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const currentPath = window.location.pathname + window.location.search;
    const referrer = document.referrer;
    const deviceType = getDeviceType();

    // Capture URL parameters
    const newAttribution: AttributionData = {
      gclid: urlParams.get('gclid') || getCookie('gclid') || '',
      gbraid: urlParams.get('gbraid') || getCookie('gbraid') || '',
      wbraid: urlParams.get('wbraid') || getCookie('wbraid') || '',
      utm_source: urlParams.get('utm_source') || getCookie('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || getCookie('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || getCookie('utm_campaign') || '',
      utm_term: urlParams.get('utm_term') || getCookie('utm_term') || '',
      utm_content: urlParams.get('utm_content') || getCookie('utm_content') || '',
      landing_path: getCookie('landing_path') || currentPath,
      original_referrer: getCookie('original_referrer') || referrer,
      device_type: deviceType
    };

    // Store in cookies (only store new values from URL params)
    if (urlParams.get('gclid')) setCookie('gclid', newAttribution.gclid);
    if (urlParams.get('gbraid')) setCookie('gbraid', newAttribution.gbraid);
    if (urlParams.get('wbraid')) setCookie('wbraid', newAttribution.wbraid);
    if (urlParams.get('utm_source')) setCookie('utm_source', newAttribution.utm_source);
    if (urlParams.get('utm_medium')) setCookie('utm_medium', newAttribution.utm_medium);
    if (urlParams.get('utm_campaign')) setCookie('utm_campaign', newAttribution.utm_campaign);
    if (urlParams.get('utm_term')) setCookie('utm_term', newAttribution.utm_term);
    if (urlParams.get('utm_content')) setCookie('utm_content', newAttribution.utm_content);
    
    // Always update landing path and referrer if not set
    if (!getCookie('landing_path')) setCookie('landing_path', currentPath);
    if (!getCookie('original_referrer') && referrer) setCookie('original_referrer', referrer);

    setAttribution(newAttribution);

    // Push to dataLayer for GA4/Google Ads Enhanced Conversions
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'attribution_captured',
        attribution_data: newAttribution,
        timestamp: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    captureAttribution();
  }, []);

  const getAttributionForForm = () => {
    return attribution;
  };

  return {
    attribution,
    captureAttribution,
    getAttributionForForm
  };
};