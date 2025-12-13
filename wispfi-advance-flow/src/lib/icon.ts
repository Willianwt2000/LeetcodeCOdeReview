import { ENV } from './env';

export function loadIconScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!src) return reject(new Error("Icon script URL missing"));
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Icon script failed to load"));
    document.head.appendChild(s);
  });
}

export function mountIconInline(targetSelector: string) {
  const target = document.querySelector(targetSelector);
  if (target && (window as any).Calendly) {
    const utm = Object.fromEntries(new URLSearchParams(window.location.search));
    (window as any).Calendly.initInlineWidget({
      url: ENV.ICON_INLINE_BOOK_URL,
      parentElement: target,
      utm
    });
  }
}