import { useEffect, useRef } from "react";

declare global { interface Window { hbspt?: any } }

const FORM = { portalId: "50393587", formId: "c2d82757-2966-40ac-948f-d1bca5405185", region: "na1" };

function loadHS(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hbspt?.forms?.create) return Promise.resolve();
  const src = "https://js.hsforms.net/forms/v2.js";
  if (!document.querySelector(`script[src="${src}"]`)) {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
  }
  return new Promise((res) => {
    const tick = () => (window.hbspt?.forms?.create ? res() : setTimeout(tick, 40));
    tick();
  });
}

export default function MCAFormTest() {
  const host = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadHS();
      if (cancelled || !host.current) return;
      host.current.replaceChildren();
      window.hbspt.forms.create({
        ...FORM,
        target: host.current,
        onFormReady: () => console.log("MCA test: ready"),
        onFormSubmitted: () => console.log("MCA test: submitted"),
      });
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{maxWidth:560, margin:"40px auto"}}>
      <h1>MCA Form — Smoke Test</h1>
      <div ref={host}/>
    </div>
  );
}