import { useEffect, useRef } from "react";

declare global { interface Window { hbspt?: any } }

const FORM = { portalId: "50393587", formId: "c2d82757-2966-40ac-948f-d1bca5405185", region: "na1" };

function loadHS(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hbspt?.forms?.create) return Promise.resolve();
  const src = "https://js.hsforms.net/forms/v2.js";
  if (!document.querySelector(`script[src="${src}"]`)) {
    const s = document.createElement("script");
    s.src = src; s.async = true; document.head.appendChild(s);
  }
  return new Promise((res)=>{ const t=()=>window.hbspt?.forms?.create?res():setTimeout(t,40); t(); });
}

export default function MCAHeroInline() {
  const host = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let destroyed = false;

    // Quick visibility logger: make sure card is visible at mount
    const card = document.getElementById("home-mca-form-card");
    if (card) {
      const cs = getComputedStyle(card);
      console.log("MCA hero visibility @mount:", {
        display: cs.display,
        opacity: cs.opacity,
        visibility: cs.visibility,
      });
    }

    // Singleton guard: refuse a 2nd MCA instance
    if ((window as any).__MCA_FORM_MOUNTED) {
      console.warn("MCA guard: attempt to mount a 2nd instance blocked");
      return;
    }
    (window as any).__MCA_FORM_MOUNTED = "hero";

    const mount = async () => {
      await loadHS();
      if (destroyed || !host.current) return;

      // Ensure a clean container (prevents recycled shells)
      host.current.replaceChildren();

      // IMPORTANT: use hbspt.forms.create (not data-attrs auto embed)
      (window as any).hbspt.forms.create({
        ...FORM,
        target: host.current,
        onFormReady: (_$form: any) => {
          console.log("MCA hero: ready");
          // 8s MutationObserver to remove stray duplicate labels outside .hs-form-field
          const root = host.current!;
          const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
              if (!(m.target instanceof HTMLElement)) continue;
              // Example cleanup: kill orphaned "Business/Company Name" labels that appear outside fields
              const badLabels = root.querySelectorAll(
                ':scope label:not(.hs-form-field label)'
              );
              badLabels.forEach((n) => {
                if (n.textContent?.toLowerCase().includes("business") || n.textContent?.toLowerCase().includes("company")) {
                  n.remove();
                }
              });
            }
          });
          observer.observe(root, { childList: true, subtree: true });
          setTimeout(() => observer.disconnect(), 8000);
        },
        onFormSubmitted: () => (window as any).dataLayer?.push({event:"mca_form_submit", placement:"hero"}),
      });
    };

    mount();

    return () => {
      destroyed = true;
      host.current?.replaceChildren();
      if ((window as any).__MCA_FORM_MOUNTED === "hero") {
        delete (window as any).__MCA_FORM_MOUNTED;
      }
    };
  }, []);

  return (
    <div id="home-mca-form-card">
      <style>{`
        /* Scoped sandbox: minimal reset for fonts only */
        #home-mca-form-card, #home-mca-form-card * { font-family: inherit; }
        #home-mca-form-card .hs-form iframe { max-width: 100%; }
      `}</style>
      <div ref={host} />
    </div>
  );
}