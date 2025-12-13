import React, { useEffect, useRef } from "react";
import { ENV } from "@/lib/env";

// Lightweight reCAPTCHA v2 checkbox component
// - Loads the script once
// - Renders a visible checkbox
// - Emits token via onChange when verified, and empty string on expire/error

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

let loadPromise: Promise<void> | null = null;

function loadRecaptchaV2(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (loadPromise) return loadPromise;

  // Avoid duplicate script tags
  const existing = document.querySelector('script[src*="recaptcha/api.js"]');
  if (existing) {
    loadPromise = new Promise<void>((resolve) => {
      const check = () => (window.grecaptcha ? resolve() : setTimeout(check, 50));
      check();
    });
    return loadPromise;
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load reCAPTCHA v2"));
    document.head.appendChild(s);
  });
  return loadPromise;
}

export function RecaptchaV2({ onChange, className }: { onChange: (token: string) => void; className?: string; }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        if (!ENV.RECAPTCHA_SITE_KEY) return;
        await loadRecaptchaV2();
        const render = () => {
          if (cancelled || !containerRef.current || !window.grecaptcha) return;
          if (widgetIdRef.current !== null) return; // already rendered
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: ENV.RECAPTCHA_SITE_KEY,
            callback: (token: string) => onChange(token || ""),
            "expired-callback": () => onChange(""),
            "error-callback": () => onChange("")
          });
        };
        if (window.grecaptcha && window.grecaptcha.render) {
          render();
        } else if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(render);
        } else {
          // Fallback small delay
          setTimeout(render, 100);
        }
      } catch (_) {
        onChange("");
      }
    };
    init();
    return () => { cancelled = true; };
  }, [onChange]);

  return (
    <div className={className}>
      <div ref={containerRef} className="g-recaptcha" />
    </div>
  );
}

export default RecaptchaV2;
