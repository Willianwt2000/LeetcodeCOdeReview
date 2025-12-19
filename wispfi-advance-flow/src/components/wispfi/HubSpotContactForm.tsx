import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";
import { attachHSListener } from "@/lib/hs/hsPostMessageBridge";
import { ensureHubSpotForms } from "@/lib/hs/ensureHubSpotForms";

interface HubSpotContactFormProps {
  onFormReady?: () => void;
  onFormSubmit?: () => void;
  className?: string;
}

// Add DNS preconnect and prefetch for faster loading
if (typeof document !== "undefined") {
  const addLink = (rel: string, href: string) => {
    if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    }
  };

  const addRecaptchaScript = () => {
    if (document.querySelector("script[data-recaptcha-parent]")) return;
    const s = document.createElement("script");
    s.setAttribute("data-recaptcha-parent", "true");
    s.src = "https://www.google.com/recaptcha/api.js";
    s.async = true;
    s.defer = true;
    s.onerror = () => {
      // Fallback domain
      const alt = document.createElement("script");
      alt.setAttribute("data-recaptcha-parent", "true");
      alt.src = "https://www.recaptcha.net/recaptcha/api.js";
      alt.async = true;
      alt.defer = true;
      document.head.appendChild(alt);
    };
    document.head.appendChild(s);
  };

  addLink("preconnect", "https://js.hsforms.net");
  addLink("preconnect", "https://forms-na1.hsforms.com");
  addLink("dns-prefetch", "https://forms-na1.hsforms.com");
  addLink("preconnect", "https://www.google.com");
  addLink("preconnect", "https://www.gstatic.com");
  addLink("preconnect", "https://www.recaptcha.net");
  addRecaptchaScript();

  // Preload the HubSpot forms script for instant parsing
  if (!document.querySelector('link[rel="preload"][href="https://js.hsforms.net/forms/v2.js"]')) {
    const l = document.createElement("link");
    l.rel = "preload";
    // @ts-ignore - link.as not in older TS libdom
    l.as = "script";
    l.href = "https://js.hsforms.net/forms/v2.js";
    document.head.appendChild(l);
  }
}

export const HubSpotContactForm = ({ onFormReady, onFormSubmit, className = "" }: HubSpotContactFormProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [sent, setSent] = useState(false);
  const { trackEvent } = useAnalytics();
  const formRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const initializedRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const retriedRef = useRef(false);

  useEffect(() => {
    console.log("[EF TRACK] HubSpotContactForm start useEffect");
    if (typeof window === "undefined") return;
    console.log("[EF TRACK] HubSpotContactForm end useEffect");

    let mounted = true;
    const uniqueId = `hs-contact-${Math.random().toString(36).slice(2)}`;
    const HS_FORM_ID = "72916fb5-56f1-4665-a3ad-d132bdd3c45b";

    let detach: (() => void) | null = null;

    const initForm = async () => {
      if (!mounted || !formRef.current || !(window as any).hbspt) return;

      if (initializedRef.current) return;
      initializedRef.current = true;

      // Ensure single mount: if content exists, mark as loaded and skip creating again
      const container = formRef.current;
      if (container.querySelector("iframe, form, input, select, textarea")) {
        loadedRef.current = true;
        setIsLoaded(true);
        setHasError(false);
        return;
      }

      formRef.current.id = uniqueId;

      try {
        const setupObserver = () => {
          if (!mounted || !formRef.current) return;
          observerRef.current?.disconnect();
          const obs = new MutationObserver(() => {
            if (!formRef.current) return;
            if (formRef.current.querySelector("iframe, form, input, select, textarea")) {
              loadedRef.current = true;
              setIsLoaded(true);
              setHasError(false);
              obs.disconnect();
              observerRef.current = null;
            }
          });
          obs.observe(formRef.current, { childList: true, subtree: true });
          observerRef.current = obs;

          // Safety: if nothing rendered, re-init once without duplicating
          window.setTimeout(() => {
            if (!mounted || loadedRef.current) return;
            const c = formRef.current;
            if (!c) return;
            const hasContent = !!c.querySelector("iframe, form, input, select, textarea");
            if (!retriedRef.current && !hasContent) {
              retriedRef.current = true;
              c.innerHTML = "";
              initializedRef.current = false;
              setTimeout(() => initForm(), 0);
            }
          }, 8000);
        };

        console.log("[EF TRACK] HubSpotContactForm waiting for ensureHubSpotForms...");
        await ensureHubSpotForms();
        console.log("[EF TRACK] HubSpotContactForm ensured HubSpot forms loaded");

        (window as any).hbspt.forms.create({
          region: "na1",
          portalId: "50393587",
          formId: "72916fb5-56f1-4665-a3ad-d132bdd3c45b",
          target: `#${uniqueId}`,
          onFormReady: () => {
            if (!mounted) return;
            loadedRef.current = true;
            setIsLoaded(true);
            setHasError(false);
            onFormReady?.();

            trackEvent({
              action: "contact_start",
              category: "engagement",
              label: "contact_form",
            });

            // Cleanup stray business name labels
            setTimeout(() => {
              const removeStrayTextNodes = (container: Element) => {
                const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);

                const textNodesToRemove: Text[] = [];
                let node: Text | null;

                while ((node = walker.nextNode() as Text)) {
                  const text = node.textContent?.trim().toLowerCase();
                  if (
                    text &&
                    (text === "business name" ||
                      text === "company name" ||
                      text.includes("business name") ||
                      text.includes("company name"))
                  ) {
                    textNodesToRemove.push(node);
                  }
                }

                textNodesToRemove.forEach((textNode) => {
                  textNode.parentNode?.removeChild(textNode);
                });
              };

              const removeOrphanedLabels = (container: Element) => {
                const labels = container.querySelectorAll("label");
                labels.forEach((label) => {
                  const text = label.textContent?.trim().toLowerCase();
                  if (
                    text &&
                    (text === "business name" ||
                      text === "company name" ||
                      text.includes("business name") ||
                      text.includes("company name"))
                  ) {
                    const associatedInput = label.getAttribute("for")
                      ? container.querySelector(`#${label.getAttribute("for")}`)
                      : null;

                    if (!associatedInput || !associatedInput.closest(".hs-form-field")) {
                      label.remove();
                    }
                  }
                });
              };

              const addStrayLabelCSS = (container: Element) => {
                const style = document.createElement("style");
                style.textContent = `
                  .hubspot-contact-form-container label:not([for]):empty,
                  .hubspot-contact-form-container label[for=""]:empty,
                  .hubspot-contact-form-container label:not([for]) {
                    display: none !important;
                  }
                  .hubspot-contact-form-container *:not(input):not(select):not(textarea):not(button) {
                    white-space: pre-line;
                  }
                  .hubspot-contact-form-container *:not(input):not(select):not(textarea):not(button):empty {
                    display: none !important;
                  }
                `;
                document.head.appendChild(style);
              };

              const performCleanup = () => {
                const container = formRef.current;
                if (!container) return;

                removeStrayTextNodes(container);
                removeOrphanedLabels(container);
                addStrayLabelCSS(container);

                // Also clean inside iframe if present
                const iframe = container.querySelector(".hs-form-iframe") as HTMLIFrameElement;
                if (iframe && iframe.contentDocument) {
                  removeStrayTextNodes(iframe.contentDocument.body);
                  removeOrphanedLabels(iframe.contentDocument.body);

                  const iframeStyle = iframe.contentDocument.createElement("style");
                  iframeStyle.textContent = `
                    label:not([for]):empty,
                    label[for=""]:empty,
                    label:not([for]) {
                      display: none !important;
                    }
                  `;
                  iframe.contentDocument.head.appendChild(iframeStyle);
                }
              };

              performCleanup();

              // Set up MutationObserver for ongoing cleanup
              const cleanupObserver = new MutationObserver(() => {
                performCleanup();
              });

              if (formRef.current) {
                cleanupObserver.observe(formRef.current, {
                  childList: true,
                  subtree: true,
                });
              }
            }, 100);
          },
          onFormSubmit: () => {
            trackEvent({
              action: "contact_submit",
              category: "conversion",
              label: "contact_form",
            });

            if ((window as any).dataLayer) {
              (window as any).dataLayer.push({
                event: "hs_contact_form_submit",
                formId: "72916fb5-56f1-4665-a3ad-d132bdd3c45b",
                form_type: "contact",
                conversion_step: "form_submit",
              });
            }

            onFormSubmit?.();
          },
        });

        detach = attachHSListener(HS_FORM_ID, (eventName, payload) => {
          console.log(`[EF TRACK] HubSpotContactForm ${eventName} (bridge)`, payload);
          if (eventName === "onFormSubmitted") {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: "hs_contact_form_submitted",
              formId: HS_FORM_ID,
              form_type: "contact",
            });
            onFormSubmit?.();
          }
        });

        setupObserver();
      } catch (e) {
        console.error("HubSpot create failed", e);
        initializedRef.current = false;
        if (mounted) setHasError(true);
      }
    };

    const ensureScript = () => {
      // Script is preloaded in main.tsx, but handle cases where it's not ready yet
      if ((window as any).hbspt) {
        initForm();
        return;
      }

      const existing = document.querySelector('script[src*="js.hsforms.net/forms/v2.js"]') as HTMLScriptElement | null;
      if (existing) {
        const onLoad = () => initForm();
        existing.addEventListener("load", onLoad);
        cleanupFns.push(() => existing.removeEventListener("load", onLoad));
      } else {
        // Fallback: load script if missing
        const script = document.createElement("script");
        script.src = "https://js.hsforms.net/forms/v2.js";
        script.defer = true;
        script.async = true;
        script.crossOrigin = "anonymous";
        const onLoad = () => initForm();
        script.addEventListener("load", onLoad);
        script.onerror = () => {
          if (!mounted) return;
          console.warn("[HubSpot] script failed, retrying with cache-bust");
          const retry = document.createElement("script");
          retry.src = "https://js.hsforms.net/forms/v2.js?v=" + Date.now();
          retry.defer = true;
          retry.async = true;
          retry.crossOrigin = "anonymous";
          retry.addEventListener("load", onLoad);
          retry.onerror = () => console.error("[HubSpot] retry failed");
          document.head.appendChild(retry);
          cleanupFns.push(() => retry.removeEventListener("load", onLoad));
        };
        document.head.appendChild(script);
        cleanupFns.push(() => script.removeEventListener("load", onLoad));
      }

      // Quick retry loop in case hbspt appears after load
      let tries = 0;
      const iv = window.setInterval(() => {
        if ((window as any).hbspt) {
          window.clearInterval(iv);
          initForm();
        } else if (++tries > 200) {
          window.clearInterval(iv);
        }
      }, 150);
      cleanupFns.push(() => window.clearInterval(iv));
    };

    const cleanupFns: Array<() => void> = [];
    const failTimeout = window.setTimeout(() => {
      if (mounted && !loadedRef.current) {
        setHasError(true);
      }
    }, 15000);
    cleanupFns.push(() => window.clearTimeout(failTimeout));

    ensureScript();

    return () => {
      mounted = false;
      if (detach) detach();
      cleanupFns.forEach((fn) => fn());
      observerRef.current?.disconnect();
      if (formRef.current) {
        formRef.current.innerHTML = "";
      }
    };
  }, [onFormReady, onFormSubmit, trackEvent]);

  if (sent) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-semibold mb-3 text-primary">Thank You!</h3>
        <p className="text-muted-foreground mb-6">We received your message and will reply within 24 hours.</p>
        <Button onClick={() => setSent(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className={`hubspot-contact-form-container ${className} w-full`}>
      {!isLoaded && !hasError && (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="text-center py-8">
          <p className="text-destructive mb-4">Unable to load contact form.</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload Page
          </Button>
        </div>
      )}

      <div
        ref={formRef}
        style={{
          minHeight: !isLoaded ? "400px" : "auto",
          display: hasError ? "none" : "block",
        }}
      />
    </div>
  );
};
