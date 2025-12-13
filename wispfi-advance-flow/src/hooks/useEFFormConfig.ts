import { useMemo } from "react";

export const useEFFormConfig = () => {
  return useMemo(() => ({
    lead_type: "Equipment Financing",
    ef_lead_quality_band: "",
    ef_deal_size_band: "",
    utm_source: "{{utm_source}}",
    utm_medium: "{{utm_medium}}",
    utm_campaign: "{{utm_campaign}}",
    gclid: "{{gclid}}",
    wbraid: "{{wbraid}}",
    gbraid: "{{gbraid}}",
  }), []);
};

export const EF_FORM_CONFIG = {
  portalId: "50393587",
  formId: "1b34c1c7-050d-4963-a3bd-c1c34d6ce07b",
  region: "na1" as const,
};