import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { LabelWithAsterisk } from "@/components/ui/label-with-asterisk";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPhoneNumber, isValidEmail, isValidPhone, formatCurrency, parseCurrency } from "@/lib/form-utils";
// import RecaptchaV2 from "./RecaptchaV2";
import { getLeadSourceFromCookie } from "@/lib/attribution";

//new fix
import { useTranslation } from "react-i18next";
import { FORM_IDS, PORTAL_ID } from "@/config/formIds";

// const PORTAL_ID = "50393587";
// const FORM_ID = "1b34c1c7-050d-4963-a3bd-c1c34d6ce07b"; // EF form only
// const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

type State = {
  // Step 1
  business_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  // Step 2
  industry: string;
  state_region: string;
  time_in_business: string;
  monthly_revenue: string;
  // Step 3
  equipment_type: string;
  equipment_condition: string;
  estimated_cost: string;
  funding_timeline: string;
  privacy_consent: boolean;
  website?: string; // honeypot
};

const initial: State = {
  business_name: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  industry: "",
  state_region: "",
  time_in_business: "",
  monthly_revenue: "",
  equipment_type: "",
  equipment_condition: "",
  estimated_cost: "",
  funding_timeline: "",
  privacy_consent: false,
  website: "",
};

// Dropdown options
const INDUSTRIES = [
  "Construction",
  "Trucking / Transportation",
  "Telecom & ISPs",
  "Retail",
  "Restaurants / Food Service",
  "Healthcare",
  "Spa & Salon",
  "Other",
];

const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

const TIME_IN_BUSINESS = ["1-2 years", "2-5 years", "5+"];

const MONTHLY_REVENUE = [
  "$10,000-$25,000",
  "$25,0001-$50,000",
  "$50,001-$100,000",
  "$100,001-$250,000",
  "$250,001-$500,000",
  "$500,000+",
];

const EQUIPMENT_TYPES = [
  "It/Computers",
  "Manufacturing/Machinery",
  "Medical",
  "Restaurant/Kitchen",
  "Retail/Point-Of-Sale",
  "Telecom/Broadband Gear",
  "Track/Trailers",
  "Other",
];

const FUNDING_TIMELINE = ["ASAP (This week)", "1-2 weeks", "3-4 weeks", "Researching Options"];

// Removed ESTIMATED_COSTS array - now using input field

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="))
    ?.split("=")[1];
}

function normPhone(v: string) {
  return v.replace(/[^\d+]/g, "");
}

function toHsFields(s: State) {
  const persisted = getLeadSourceFromCookie("last");
  const leadSource = persisted || "Organic";

  return [
    // Step 1
    { name: "email", value: s.email.trim() },
    { name: "0-2/name", value: s.business_name.trim() },
    { name: "firstname", value: s.first_name.trim() },
    { name: "lastname", value: s.last_name.trim() },
    { name: "phone", value: normPhone(s.phone) },
    // Step 2
    { name: "simplified_industry", value: s.industry },
    { name: "state_mca", value: s.state_region },
    { name: "time_in_business", value: s.time_in_business },
    { name: "monthly_revenue", value: s.monthly_revenue },
    { name: "lead_type", value: "EF" },
    // Step 3
    { name: "wispfi_equipment_type", value: s.equipment_type },
    { name: "wispfi_new_or_used", value: s.equipment_condition },
    { name: "wispfi_estimated_equipment_cost", value: s.estimated_cost },
    { name: "wispfi_funding_timeline", value: s.funding_timeline },
    // Metadata
    { name: "form_source", value: "EF React API" },
    { name: "funnel", value: "EF" },
    { name: "product_line", value: "EF" },
    { name: "lead_source", value: leadSource },
  ];
}

export default function EFFormAPI() {
  const { t, i18n } = useTranslation();
  const currentFormId = i18n.language === "es" ? FORM_IDS.ef.es : FORM_IDS.ef.en;
  const submitUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${currentFormId}`;

  const [form, setForm] = useState<State>(initial);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
  }, []);

  // Step validation
  const isStep1Valid = useMemo(() => {
    return (
      form.business_name.trim() &&
      form.first_name.trim() &&
      form.last_name.trim() &&
      isValidEmail(form.email) &&
      isValidPhone(form.phone)
    );
  }, [form.business_name, form.first_name, form.last_name, form.email, form.phone]);

  const isStep2Valid = useMemo(() => {
    return form.industry && form.state_region && form.time_in_business && form.monthly_revenue;
  }, [form.industry, form.state_region, form.time_in_business, form.monthly_revenue]);

  const isStep3Valid = useMemo(() => {
    return (
      form.equipment_type &&
      form.equipment_condition &&
      form.estimated_cost &&
      parseCurrency(form.estimated_cost) > 0 &&
      form.funding_timeline &&
      form.privacy_consent
    );
  }, [form.equipment_type, form.equipment_condition, form.estimated_cost, form.funding_timeline, form.privacy_consent]);

  const canProceed = useMemo(() => {
    if (currentStep === 1) return isStep1Valid;
    if (currentStep === 2) return isStep2Valid;
    return isStep3Valid;
  }, [currentStep, isStep1Valid, isStep2Valid, isStep3Valid]);

  const onChange = (k: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format phone number as user types
    if (k === "phone") {
      value = formatPhoneNumber(value);
    }

    // Format currency for estimated cost
    if (k === "estimated_cost") {
      value = formatCurrency(value);
    }

    setForm((prev) => ({ ...prev, [k]: value }));
  };

  const onSelectChange = (k: keyof State) => (value: string) => {
    setForm((prev) => ({ ...prev, [k]: value }));
  };

  const nextStep = () => {
    if (canProceed && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (form.website && form.website.trim().length > 0) return;
    if (!isStep3Valid) return;

    setLoading(true);

    try {
      // Verify reCAPTCHA v2 checkbox
      // if (!recaptchaToken) {
      //   throw new Error('reCAPTCHA verification failed');
      // }

      const hutk = getCookie("hubspotutk");
      const hsFields = toHsFields(form);
      // Add reCAPTCHA token to form data
      // hsFields.push({ name: 'g-recaptcha-response', value: recaptchaToken });

      const payload = {
        fields: hsFields,
        context: {
          hutk,
          pageUri: window.location.href,
          pageName: document.title,
        },
      };

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`HubSpot ${res.status}: ${t}`);
      }

      console.log("Pushing to dataLayer", {
        event: "ef_form_submit",
        formSource: "EFFormAPI",
        email: form.email,
        phone: normPhone(form.phone),
        business_name: form.business_name,
        monthly_revenue: form.monthly_revenue,
        time_in_business: form.time_in_business,
        state: form.state_region,
        industry: form.industry,
      });

      window.dataLayer.push({
        event: "ef_form_submit",
        formSource: "EFFormAPI",
        email: form.email,
        phone: normPhone(form.phone),
        business_name: form.business_name,
        monthly_revenue: form.monthly_revenue,
        time_in_business: form.time_in_business,
        state: form.state_region,
        industry: form.industry,
      });

      navigate("/thank-you-ef", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? t("components.efForm.errors.submit"));
    } finally {
      setLoading(false);
    }
  }

  // Helpers for Dropdown Translations
  const getIndustryLabel = (industry: string) => t(`components.efForm.options.industries.${industry}`, industry);
  const getTimeInBusinessLabel = (time: string) => t(`components.efForm.options.timeInBusiness.${time}`, time);
  const getEquipmentTypeLabel = (type: string) => t(`components.efForm.options.equipmentTypes.${type}`, type);
  const getFundingTimelineLabel = (timeline: string) =>
    t(`components.efForm.options.fundingTimeline.${timeline}`, timeline);
  const getEquipmentConditionLabel = (condition: string) =>
    t(`components.efForm.options.equipmentCondition.${condition}`, condition);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={onChange("website")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Step indicators */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 3 && <div className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-orange-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">{t("components.efForm.steps.basicInfo")}</h3>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="business_name" required>
                {t("components.efForm.labels.businessName")}
              </LabelWithAsterisk>
              <Input
                id="business_name"
                type="text"
                value={form.business_name}
                onChange={onChange("business_name")}
                placeholder={t("components.efForm.placeholders.businessName")}
                className={
                  !form.business_name.trim() && form.business_name !== initial.business_name ? "border-destructive" : ""
                }
                required
              />
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="time_in_business" required>
                {t("components.efForm.labels.timeInBusiness")}{" "}
                <span className="font-bold text-red-600">{t("components.efForm.labels.timeInBusinessHint")}</span>
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("time_in_business")} value={form.time_in_business}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.timeInBusiness")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  {TIME_IN_BUSINESS.map((time) => (
                    <SelectItem key={time} value={time}>
                      {getTimeInBusinessLabel(time)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <LabelWithAsterisk htmlFor="first_name" required>
                  {t("components.efForm.labels.firstName")}
                </LabelWithAsterisk>
                <Input
                  id="first_name"
                  type="text"
                  value={form.first_name}
                  onChange={onChange("first_name")}
                  placeholder={t("components.efForm.placeholders.firstName")}
                  className={
                    !form.first_name.trim() && form.first_name !== initial.first_name ? "border-destructive" : ""
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <LabelWithAsterisk htmlFor="last_name" required>
                  {t("components.efForm.labels.lastName")}
                </LabelWithAsterisk>
                <Input
                  id="last_name"
                  type="text"
                  value={form.last_name}
                  onChange={onChange("last_name")}
                  placeholder={t("components.efForm.placeholders.lastName")}
                  className={!form.last_name.trim() && form.last_name !== initial.last_name ? "border-destructive" : ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="email" required>
                {t("components.efForm.labels.email")}
              </LabelWithAsterisk>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                placeholder={t("components.efForm.placeholders.email")}
                className={form.email && !isValidEmail(form.email) ? "border-destructive" : ""}
                required
              />
              {form.email && !isValidEmail(form.email) && (
                <p className="text-sm text-destructive mt-1">{t("components.efForm.errors.email")}</p>
              )}
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="phone" required>
                {t("components.efForm.labels.phone")}
              </LabelWithAsterisk>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={onChange("phone")}
                placeholder={t("components.efForm.placeholders.phone")}
                className={form.phone && !isValidPhone(form.phone) ? "border-destructive" : ""}
                required
              />
              {form.phone && !isValidPhone(form.phone) && (
                <p className="text-sm text-destructive mt-1">{t("components.efForm.errors.phone")}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">{t("components.efForm.steps.businessDetails")}</h3>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="industry" required>
                {t("components.efForm.labels.industry")}
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("industry")} value={form.industry}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.industry")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {getIndustryLabel(industry)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="state_region" required>
                {t("components.efForm.labels.state")}
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("state_region")} value={form.state_region}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.state")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  {US_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="monthly_revenue" required>
                {t("components.efForm.labels.monthlyRevenue")}
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("monthly_revenue")} value={form.monthly_revenue}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.monthlyRevenue")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  {MONTHLY_REVENUE.map((revenue) => (
                    <SelectItem key={revenue} value={revenue}>
                      {revenue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 3: Equipment Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">{t("components.efForm.steps.equipmentDetails")}</h3>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="equipment_type" required>
                {t("components.efForm.labels.equipmentType")}
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("equipment_type")} value={form.equipment_type}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.equipmentType")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  {EQUIPMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {getEquipmentTypeLabel(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="equipment_condition" required>
                {t("components.efForm.labels.equipmentCondition")}
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("equipment_condition")} value={form.equipment_condition}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.equipmentCondition")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  <SelectItem value="New">{getEquipmentConditionLabel("New")}</SelectItem>
                  <SelectItem value="Used">{getEquipmentConditionLabel("Used")}</SelectItem>
                  <SelectItem value="Both">{getEquipmentConditionLabel("Both")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="estimated_cost" required>
                {t("components.efForm.labels.estimatedCost")}
              </LabelWithAsterisk>
              <Input
                id="estimated_cost"
                type="text"
                value={form.estimated_cost}
                onChange={onChange("estimated_cost")}
                placeholder={t("components.efForm.placeholders.estimatedCost")}
                className={form.estimated_cost && parseCurrency(form.estimated_cost) === 0 ? "border-destructive" : ""}
                required
              />
              {form.estimated_cost && parseCurrency(form.estimated_cost) === 0 && (
                <p className="text-sm text-destructive mt-1">{t("components.efForm.errors.cost")}</p>
              )}
            </div>

            <div className="space-y-2">
              <LabelWithAsterisk htmlFor="funding_timeline" required>
                {t("components.efForm.labels.fundingTimeline")}
              </LabelWithAsterisk>
              <Select onValueChange={onSelectChange("funding_timeline")} value={form.funding_timeline}>
                <SelectTrigger>
                  <SelectValue placeholder={t("components.efForm.placeholders.fundingTimeline")} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg z-50">
                  {FUNDING_TIMELINE.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {getFundingTimelineLabel(timeline)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Privacy Consent Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-3">{t("components.contactForm.privacy.text")}</p>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy_consent"
                  checked={form.privacy_consent}
                  onCheckedChange={(checked) => setForm((prev) => ({ ...prev, privacy_consent: checked === true }))}
                  className="mt-1"
                />
                <div className="flex-1">
                  <LabelWithAsterisk htmlFor="privacy_consent" required className="text-sm font-normal cursor-pointer">
                    {t("components.contactForm.privacy.checkbox")}
                  </LabelWithAsterisk>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{t("components.contactForm.privacy.disclaimer")}</p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep} className="px-6">
              {t("components.efForm.buttons.previous")}
            </Button>
          )}

          <div className={currentStep === 1 ? "ml-auto" : ""}>
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                {t("components.efForm.buttons.next")}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!canProceed || loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                {loading ? t("components.efForm.buttons.submitting") : t("components.efForm.buttons.submit")}
              </Button>
            )}
          </div>
        </div>

        {err && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{err}</div>}
      </form>

      {/* Security badges */}
      <div className="mt-6 flex justify-center items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center">
          <span className="mr-1">🔒</span>
          {t("components.contactForm.badges.ssl")}
        </div>
        <div className="flex items-center">
          <span className="mr-1">✓</span>
          {t("components.contactForm.badges.ccpa")}
        </div>
      </div>
    </div>
  );
}
