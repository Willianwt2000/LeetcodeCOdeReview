export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://wispfi.com";
export const canonical = (path = "/") => `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;