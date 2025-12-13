// Environment variables with defaults
export const ENV = {
  LEAD_ENDPOINT: import.meta.env.VITE_LEAD_ENDPOINT || "YOUR_LEAD_ENDPOINT",
  // Public reCAPTCHA site key (safe to expose on client)
  RECAPTCHA_SITE_KEY: "6LeCpccrAAAAAIuEb8rh4dZWaCXyV8PVvh9gkzPN", 
  GTM_ID: import.meta.env.VITE_GTM_ID || "",
  HOTJAR_ID: import.meta.env.VITE_HOTJAR_ID || "",
  TRUSTPILOT_DOMAIN: import.meta.env.VITE_TRUSTPILOT_DOMAIN || "",
  TRUSTPILOT_BUSINESS_ID: import.meta.env.VITE_TRUSTPILOT_BUSINESS_ID || "",
  TRUSTPILOT_ENABLED: import.meta.env.VITE_TRUSTPILOT_ENABLED === 'true',
  ONETRUST_DOMAIN_ID: import.meta.env.VITE_ONETRUST_DOMAIN_ID || "",
  ICON_SCRIPT_URL: import.meta.env.VITE_ICON_SCRIPT_URL || "https://cdn.icon.com/widget.js",
  ICON_INLINE_BOOK_URL: import.meta.env.VITE_ICON_INLINE_BOOK_URL || "https://icon.com/wispfi/booking",
  // Contact Information
  PHONE_E164: "+18188580184",
  PHONE_DISPLAY: "818-858-0184", 
  EMAIL: "sales@wispfi.com",
  ADDRESS: "1317 EDGEWATER DR, #4212, ORLANDO, FL, 32804",
  // Legal
  LEGAL_LAST_UPDATED: "2025-08-01"
} as const;