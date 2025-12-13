// Import FIRST
import { ensureHubSpotForms } from "@/lib/hs/ensureHubSpotForms";

export const HUBSPOT_PORTAL_ID = "50393587";
export const MCA_FORM_ID = "c2d82757-2966-40ac-948f-d1bca5405185";
export const PORTAL_ID = "50393587";
export const FORM_ID = "c2d82757-2966-40ac-948f-d1bca5405185";
export const REGION = "na1";

// ✅ Official HubSpot Share URL for MCA form
export const MCA_IFRAME_URL =
  "https://u03xv.share.hsforms.com/2wtgnVylmQKyUj9G8pUBRhQ";

// Debug toggle → FALSE in production
const DEBUG = true;
const dlog = (...args: any[]) => { if (DEBUG) console.log("[mcaForm]", ...args); };

function isPreviewDomain() {
  return true;
}

export function renderMCAIframeFallback(hostEl: HTMLElement) {
  dlog("fallback → iframe");
  hostEl.replaceChildren();
  const iframe = document.createElement("iframe");
  iframe.title = "MCA Form (Fallback)";
  iframe.src = MCA_IFRAME_URL;
  iframe.style.width = "100%";
  iframe.style.height = "640px";
  iframe.style.border = "0";
  iframe.style.background = "transparent";
  iframe.loading = "eager";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  hostEl.appendChild(iframe);
}

// One-time "winner lock" per host via dataset
function lockHost(host: HTMLElement, winner: "js" | "iframe") {
  host.dataset.mcaMounted = winner;
}

export async function mountMCAForm(
  opts: { hostSelector: string; locationTag: string; }
): Promise<() => void> {   // Explicit return type
  const { hostSelector, locationTag } = opts;
  const host = document.querySelector<HTMLElement>(hostSelector);
  if (!host) { dlog("host not found", hostSelector); return () => {}; }

  // Double-mount guard
  if (host.dataset.mcaMounted) {
    dlog("already mounted", hostSelector);
    return () => {};
  }

  // Clean slate
  host.replaceChildren();
  delete host.dataset.mcaMounted;

  let destroyed = false;
  let ready = false;
  let finalized = false;

  // On preview domains, FORCE iframe for stability (avoid blocked JS + flicker)
  if (isPreviewDomain()) {
    finalized = true;
    lockHost(host, "iframe");
    renderMCAIframeFallback(host);
    return () => {
      destroyed = true;
      host.replaceChildren();
      dlog("cleanup (preview forced iframe)");
    };
  }

  // Failover timer: if JS doesn't mount in time, fall back to iframe
  const failoverTimer = window.setTimeout(() => {
    if (!ready && !finalized && !destroyed) {
      finalized = true;
      lockHost(host, "iframe");
      renderMCAIframeFallback(host);
    }
  }, 2000);

  try {
    await ensureHubSpotForms();
    if (destroyed) { window.clearTimeout(failoverTimer); return () => {}; }

    dlog("try JS embed");
    (window as any).hbspt.forms.create({
      region: REGION,
      portalId: PORTAL_ID,
      formId: FORM_ID,
      target: hostSelector,
      onFormReady: () => {
        ready = true;
        if (!finalized && !destroyed) {
          finalized = true;
          window.clearTimeout(failoverTimer);
          lockHost(host, "js");
          dlog("JS embed mounted");
          (window as any).dataLayer?.push({ event: "mca_form_mount", location: locationTag });
        }
      },
      onFormSubmitted: () => {
        (window as any).dataLayer?.push({ event: "mca_form_submit", product: "MCA", location: locationTag });
      },
    });
  } catch (err) {
    dlog("JS embed error → fallback", err);
    if (!finalized && !destroyed) {
      finalized = true;
      window.clearTimeout(failoverTimer);
      lockHost(host, "iframe");
      renderMCAIframeFallback(host);
    }
  }

  return () => {
    destroyed = true;
    window.clearTimeout(failoverTimer);
    host.replaceChildren();
    dlog("cleanup complete");
  };
}