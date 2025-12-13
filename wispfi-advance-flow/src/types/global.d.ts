// Global type definitions
export {};

declare global {
  interface Window {
    hbspt?: any;
    __MCA_FORM_MOUNTED?: "hero" | "modal";
    dataLayer?: Array<Record<string, any>>;
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    clarity?: (action: string, event: string) => void;
  }
}