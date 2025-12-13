import { useEffect } from "react";

// Lightweight Tawk.to integration. Replace propertyId and widgetId when available.
export const TawkChat = () => {
  useEffect(() => {
    if ((window as any).Tawk_API || document.getElementById("tawk-script")) return;
    const s1 = document.createElement("script");
    s1.id = "tawk-script";
    s1.async = true;
    s1.src = "https://embed.tawk.to/YOUR_TAWK_PROPERTY_ID/YOUR_WIDGET_ID"; // TODO: replace with real IDs
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    // Defer loading until idle to avoid blocking
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => document.body.appendChild(s1));
    } else {
      setTimeout(() => document.body.appendChild(s1), 1000);
    }
  }, []);
  return null;
};

export default TawkChat;
