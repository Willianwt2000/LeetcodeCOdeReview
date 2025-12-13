// HubSpot PostMessage Bridge - Cleaned up for EF API form
export type HSFormEvent = "onFormReady" | "onFormSubmit" | "onFormSubmitted";

// This is kept for legacy compatibility but not used by the new EF form API
export function attachHSListener(
  formId: string,
  handler: (event: HSFormEvent, payload: any) => void
) {
  console.log('[EF TRACK] attachHSListener:init - Legacy listener (not used by EF API form)');
  
  // Return empty cleanup function since EF API form doesn't use postMessage events
  return () => {
    console.log('[EF TRACK] attachHSListener:cleanup - Legacy cleanup');
  }
}