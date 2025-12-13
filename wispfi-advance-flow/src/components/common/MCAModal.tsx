import { useEffect, useRef } from "react";

export function MCAModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e?.data?.type === "MCA_IFRAME_RESIZE" && typeof e.data.height === "number") {
        if (frameRef.current && e.source === frameRef.current.contentWindow) {
          frameRef.current.style.height = `${Math.max(520, e.data.height)}px`;
        }
      }
      if (e?.data?.type === "MCA_IFRAME_SUBMIT") {
        (window as any).dataLayer?.push({ event: "mca_form_submit", placement: "modal" });
        // Optional: onClose(); // close after submit
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl">
        <button
          className="absolute right-4 top-4 text-2xl leading-none"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <iframe
          ref={frameRef}
          title="MCA Form (Modal)"
          src="/embed/mca-form"
          style={{ width: "100%", height: "640px", border: 0, background: "transparent", display: "block" }}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}