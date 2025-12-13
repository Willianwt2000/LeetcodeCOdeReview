import { useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

interface ConversionTrackingProps {
  source?: string;
  eligible?: string;
  formType?: string;
}

export const useConversionTracking = ({ source, eligible, formType }: ConversionTrackingProps) => {
  const { trackEvent } = useAnalytics();

  

  const trackDocumentUpload = (docType: string) => {
    trackEvent({
      action: 'document_upload',
      category: 'engagement',
      label: docType,
      value: 1
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'document_upload',
        document_type: docType,
        page_type: 'thank_you',
        timestamp: new Date().toISOString()
      });
    }
  };

  const trackBookingInteraction = (action: string) => {
    trackEvent({
      action: 'booking_interaction',
      category: 'conversion',
      label: action,
      value: 1
    });

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'booking_interaction',
        interaction_type: action,
        page_type: 'thank_you',
        timestamp: new Date().toISOString()
      });
    }
  };

  return {
    trackDocumentUpload,
    trackBookingInteraction
  };
};