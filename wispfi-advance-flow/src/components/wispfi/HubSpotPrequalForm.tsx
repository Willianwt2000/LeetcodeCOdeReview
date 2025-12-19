import React, { useEffect, useRef } from "react";
import { HUBSPOT_PORTAL_ID, MCA_FORM_ID } from "@/lib/mcaForm";
import { attachHSListener } from "@/lib/hs/hsPostMessageBridge";
import { ensureHubSpotForms } from "@/lib/hs/ensureHubSpotForms";

type Props = {
  className?: string;
  portalId?: string;
  formId?: string;
  onReady?: () => void;
};

declare global {
  interface Window {
    hbspt?: any;
    __HS_FORM_MOUNTED__?: Record<string, boolean>;
  }
}

export const HubSpotPrequalForm: React.FC<Props> = ({
  className = "hs-form-frame w-full",
  portalId = HUBSPOT_PORTAL_ID,
  formId = MCA_FORM_ID,
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const idRef = React.useRef("hsf-" + Math.random().toString(36).slice(2));
  const mountedRef = useRef(false);

  useEffect(() => {
    console.log("[EF TRACK] HubSpotPrequalForm start useEffect");

    let detach: (() => void) | null = null;

    if (!window.__HS_FORM_MOUNTED__) window.__HS_FORM_MOUNTED__ = {};
    const container = containerRef.current;
    if (!container || mountedRef.current) return;

    const guardKey = `${portalId}:${formId}:${idRef.current}`;
    if (window.__HS_FORM_MOUNTED__[guardKey]) return; // StrictMode/dup guard

    console.log("[EF TRACK] HubSpotPrequalForm end useEffect");

    function isVisible(el: HTMLElement) {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== "none" && rect.width > 0 && rect.height >= 0;
    }

    async function createForm() {
      console.log("createForm on HubSpotPrequalForm.tsx");
      const currentContainer = containerRef.current;
      if (!window.hbspt?.forms?.create || !currentContainer || mountedRef.current) return;

      if (!isVisible(currentContainer)) {
        // wait for layout (e.g., absolute float on desktop)
        requestAnimationFrame(createForm);
        return;
      }

      window.__HS_FORM_MOUNTED__[guardKey] = true;
      mountedRef.current = true;

      console.log("[EF TRACK] HubSpotPrequalForm waiting for ensureHubSpotForms...");
      await ensureHubSpotForms();
      console.log("[EF TRACK] HubSpotPrequalForm ensured HubSpot forms loaded");

      window.hbspt.forms.create({
        portalId,
        formId,
        target: `#${containerId}`, // ✅ safe CSS selector string
        css: "", // prevent loading HS default theme, use our shell styles
        onFormReady: () => onReady?.(),
      });

      detach = attachHSListener(formId!, (eventName, payload) => {
        console.log(`[EF TRACK] HubSpotPrequalForm ${eventName} (bridge)`, payload);
        if (eventName === "onFormReady") onReady?.();
        if (eventName === "onFormSubmitted") {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({ event: "hs_prequal_form_submitted", formId });
        }
      });
    }

    const scriptSrc = "https://js.hsforms.net/forms/v2.js";
    const existing = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;

    if (!existing) {
      const s = document.createElement("script");
      s.async = true;
      s.defer = true;
      s.src = scriptSrc;
      s.onload = createForm;
      document.head.appendChild(s);
    } else if (window.hbspt?.forms?.create) {
      createForm();
    } else {
      existing.addEventListener("load", createForm, { once: true });
    }

    return () => {
      mountedRef.current = false;
      if (detach) detach();
      if (window.__HS_FORM_MOUNTED__[guardKey]) {
        delete window.__HS_FORM_MOUNTED__[guardKey];
      }
    };
  }, [portalId, formId, onReady]);

  const containerId = "hs-form-" + idRef.current;
  return <div ref={containerRef} id={containerId} className={className} />;
};
