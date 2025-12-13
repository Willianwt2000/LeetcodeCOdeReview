/**
 * Attribution tracking utilities for WispFi
 * Handles UTM parameters, Google Ads tracking, and conversion attribution
 */

type RawParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
};

const ATTR_FIRST = "attr_first_touch";
const ATTR_LAST = "attr_last_touch";
const TTL_DAYS = 90;

// --- cookies ---
function setCookie(name: string, value: string, days = TTL_DAYS) {
  const exp = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}
function getCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="))
    ?.split("=")[1];
}

// --- parse helpers ---
function qs() {
  const q = new URLSearchParams(window.location.search);
  const o: RawParams = {};
  q.forEach((v, k) => {
    (o as any)[k] = v;
  });
  return o;
}
function host(href?: string) {
  try {
    return href ? new URL(href).hostname : "";
  } catch {
    return "";
  }
}

// --- classification ---
function isPaidMedium(m?: string) {
  const m2 = (m || "").toLowerCase();
  return ["cpc", "ppc", "paid", "paid_social", "display", "remarketing"].includes(m2);
}
export function classifyLeadSource(raw: RawParams): "GoogleAds" | "MetaAds" | "Organic" {
  const src = (raw.utm_source || "").toLowerCase();
  const med = (raw.utm_medium || "").toLowerCase();

  const hasGoogleClickId = !!(raw.gclid || raw.wbraid || raw.gbraid);
  const hasMetaClickId = !!raw.fbclid;

  // Priority: explicit click IDs
  if (hasGoogleClickId) return "GoogleAds";
  if (hasMetaClickId) return "MetaAds";

  // Next: paid UTMs
  if (["google", "adwords", "gads"].includes(src) && isPaidMedium(med)) return "GoogleAds";
  if (["facebook", "instagram", "meta"].includes(src) && isPaidMedium(med)) return "MetaAds";

  // Fallback: everything else = organic (direct, SEO, social organic, referral)
  // If you want to treat social organic separately, split on referrer host here.
  return "Organic";
}

// --- capture & persist ---
export function captureAttributionOnce(perTouch: "first" | "last" = "last") {
  const raw: RawParams = {
    ...qs(),
    referrer: document.referrer || "",
    landing_page: window.location.href,
  };

  const payload = {
    lead_source: classifyLeadSource(raw),
    raw,
    ts: Date.now(),
  };

  // Always write last-touch
  setCookie(ATTR_LAST, JSON.stringify(payload), TTL_DAYS);

  // Write first-touch only if not set
  if (!getCookie(ATTR_FIRST)) {
    setCookie(ATTR_FIRST, JSON.stringify(payload), TTL_DAYS);
  }

  // Optionally return the chosen touchpoint
  if (perTouch === "first") {
    return getLeadSourceFromCookie("first");
  } else {
    return payload.lead_source;
  }
}

export function getLeadSourceFromCookie(which: "first" | "last" = "last") {
  const raw = getCookie(which === "first" ? ATTR_FIRST : ATTR_LAST);
  if (!raw) return undefined;
  try {
    return (JSON.parse(decodeURIComponent(raw)) as any).lead_source as string;
  } catch {
    return undefined;
  }
}
