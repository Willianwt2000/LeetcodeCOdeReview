let _hsFormsPromise: Promise<void> | null = null;

export async function ensureHubSpotForms(): Promise<void> {
  if ((window as any).hbspt?.forms?.create) return;
  if (_hsFormsPromise) return _hsFormsPromise;

  _hsFormsPromise = new Promise<void>((resolve, reject) => {
    const scriptId = "hs-forms-v2-js";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    const waitForHbspt = () => {
      const check = () => {
        if ((window as any).hbspt?.forms?.create) return resolve();
        setTimeout(check, 50);
      };
      check();
    };

    if (existing) {
      waitForHbspt();
      return;
    }

    const s = document.createElement("script");
    s.id = scriptId;
    s.src = "https://js.hsforms.net/forms/v2.js";
    s.async = true;
    s.onload = () => waitForHbspt();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });

  return _hsFormsPromise;
}