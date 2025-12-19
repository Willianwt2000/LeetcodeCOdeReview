import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { LabelWithAsterisk } from "@/components/ui/label-with-asterisk";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPhoneNumber, isValidEmail, isValidPhone } from "@/lib/form-utils";
// import RecaptchaV2 from "./RecaptchaV2";
import { getLeadSourceFromCookie } from "@/lib/attribution";

import { useTranslation } from "react-i18next";
import { FORM_IDS, PORTAL_ID } from "@/config/formIds";

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
    // Metadata
    { name: "form_source", value: "MCA React API" },
    { name: "funnel", value: "MCA" },
    { name: "lead_type", value: "MCA" },
    { name: "product_line", value: "MCA" },
    { name: "lead_source", value: leadSource },
  ];
}

export default function MCAFormAPI() {
  const { t, i18n } = useTranslation();
  const currentFormId = i18n.language === "es" ? FORM_IDS.mca.es : FORM_IDS.mca.en;
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
    return form.industry && form.state_region && form.time_in_business && form.monthly_revenue && form.privacy_consent;
  }, [form.industry, form.state_region, form.time_in_business, form.monthly_revenue, form.privacy_consent]);

  const canProceed = useMemo(() => {
    if (currentStep === 1) return isStep1Valid;
    if (currentStep === 2) return isStep2Valid;
    return false;
  }, [currentStep, isStep1Valid, isStep2Valid]);

  const onChange = (field: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format phone number as user types
    if (field === "phone") {
      value = formatPhoneNumber(value);
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSelectChange = (field: keyof State) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (canProceed && currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  async function onSubmit() {
    if (!isStep2Valid) return;

    setLoading(true);
    setErr("");

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
      } else {
        console.log(`POST to HS ${submitUrl}`);
        console.log(payload);
        console.log(res);
        console.log("------------------------------------------");
      }

      console.log("Pushing MCA to dataLayer", {
        event: "mca_form_submit",
        formSource: "MCAFormAPI",
        email: form.email,
        phone: normPhone(form.phone),
        business_name: form.business_name,
        monthly_revenue: form.monthly_revenue,
        time_in_business: form.time_in_business,
        state: form.state_region,
        industry: form.industry,
      });

      window.dataLayer.push({
        event: "mca_form_submit",
        formSource: "MCAFormAPI",
        email: form.email,
        phone: normPhone(form.phone),
        business_name: form.business_name,
        monthly_revenue: form.monthly_revenue,
        time_in_business: form.time_in_business,
        state: form.state_region,
        industry: form.industry,
      });

      // fbq('track', 'Lead', {
      // product: 'MCA',
      // form_id: 'c2d82757-2966-40ac-948f-d1bca5405185',
      // source: 'FB'
      // });

      navigate("/thank-you", { replace: true });
    } catch (e: any) {
      setErr(e?.message ?? t("components.mcaForm.errors.submit"));
    } finally {
      setLoading(false);
    }
  }

  // Helpers
  const getIndustryLabel = (industry: string) => t(`components.mcaForm.options.industries.${industry}`, industry);
  const getTimeInBusinessLabel = (time: string) => t(`components.mcaForm.options.timeInBusiness.${time}`, time);

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
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"
              }`}
            >
              {step}
            </div>
            {step < 2 && <div className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-orange-500" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {err && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {err}
        </div>
      )}

      {/* Step 1: Business Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center mb-4">{t("components.mcaForm.steps.basicInfo")}</h3>

          <div>
            <LabelWithAsterisk htmlFor="business_name" required>
              {t("components.mcaForm.labels.businessName")}
            </LabelWithAsterisk>
            <Input
              id="business_name"
              type="text"
              placeholder={t("components.mcaForm.placeholders.businessName")}
              value={form.business_name}
              onChange={onChange("business_name")}
              className={
                !form.business_name.trim() && form.business_name !== initial.business_name ? "border-destructive" : ""
              }
              required
            />
          </div>

          <div>
            <LabelWithAsterisk htmlFor="time_in_business" required>
              {t("components.mcaForm.labels.timeInBusiness")}{" "}
              <span className="font-bold text-red-600">{t("components.mcaForm.labels.timeInBusinessHint")}</span>
            </LabelWithAsterisk>
            <Select value={form.time_in_business} onValueChange={onSelectChange("time_in_business")}>
              <SelectTrigger>
                <SelectValue placeholder={t("components.mcaForm.placeholders.timeInBusiness")} />
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <LabelWithAsterisk htmlFor="first_name" required>
                {t("components.mcaForm.labels.firstName")}
              </LabelWithAsterisk>
              <Input
                id="first_name"
                type="text"
                placeholder={t("components.mcaForm.placeholders.firstName")}
                value={form.first_name}
                onChange={onChange("first_name")}
                className={
                  !form.first_name.trim() && form.first_name !== initial.first_name ? "border-destructive" : ""
                }
                required
              />
            </div>
            <div>
              <LabelWithAsterisk htmlFor="last_name" required>
                {t("components.mcaForm.labels.lastName")}
              </LabelWithAsterisk>
              <Input
                id="last_name"
                type="text"
                placeholder={t("components.mcaForm.placeholders.lastName")}
                value={form.last_name}
                onChange={onChange("last_name")}
                className={!form.last_name.trim() && form.last_name !== initial.last_name ? "border-destructive" : ""}
                required
              />
            </div>
          </div>

          <div>
            <LabelWithAsterisk htmlFor="email" required>
              {t("components.mcaForm.labels.email")}
            </LabelWithAsterisk>
            <Input
              id="email"
              type="email"
              placeholder={t("components.mcaForm.placeholders.email")}
              value={form.email}
              onChange={onChange("email")}
              className={form.email && !isValidEmail(form.email) ? "border-destructive" : ""}
              required
            />
            {form.email && !isValidEmail(form.email) && (
              <p className="text-sm text-destructive mt-1">{t("components.mcaForm.errors.email")}</p>
            )}
          </div>

          <div>
            <LabelWithAsterisk htmlFor="phone" required>
              {t("components.mcaForm.labels.phone")}
            </LabelWithAsterisk>
            <Input
              id="phone"
              type="tel"
              placeholder={t("components.mcaForm.placeholders.phone")}
              value={form.phone}
              onChange={onChange("phone")}
              className={form.phone && !isValidPhone(form.phone) ? "border-destructive" : ""}
              required
            />
            {form.phone && !isValidPhone(form.phone) && (
              <p className="text-sm text-destructive mt-1">{t("components.mcaForm.errors.phone")}</p>
            )}
          </div>

          <Button
            onClick={nextStep}
            disabled={!isStep1Valid}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 w-full"
          >
            {t("components.mcaForm.buttons.next")}
          </Button>
        </div>
      )}

      {/* Step 2: Business Details */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center mb-4">{t("components.mcaForm.steps.businessDetails")}</h3>

          <div>
            <LabelWithAsterisk htmlFor="industry" required>
              {t("components.mcaForm.labels.industry")}
            </LabelWithAsterisk>
            <Select value={form.industry} onValueChange={onSelectChange("industry")}>
              <SelectTrigger>
                <SelectValue placeholder={t("components.mcaForm.placeholders.industry")} />
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

          <div>
            <LabelWithAsterisk htmlFor="state_region" required>
              {t("components.mcaForm.labels.state")}
            </LabelWithAsterisk>
            <Select value={form.state_region} onValueChange={onSelectChange("state_region")}>
              <SelectTrigger>
                <SelectValue placeholder={t("components.mcaForm.placeholders.state")} />
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

          <div>
            <LabelWithAsterisk htmlFor="monthly_revenue" required>
              {t("components.mcaForm.labels.monthlyRevenue")}
            </LabelWithAsterisk>
            <Select value={form.monthly_revenue} onValueChange={onSelectChange("monthly_revenue")}>
              <SelectTrigger>
                <SelectValue placeholder={t("components.mcaForm.placeholders.monthlyRevenue")} />
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

          {/* reCAPTCHA v2 */}
          {/* <RecaptchaV2 onChange={setRecaptchaToken} className="mb-3" /> */}

          <div className="flex gap-3">
            <Button onClick={prevStep} variant="outline" className="flex-1 px-8">
              {t("components.mcaForm.buttons.back")}
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!isStep2Valid || loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 flex-1"
            >
              {loading ? t("components.mcaForm.buttons.submitting") : t("components.mcaForm.buttons.submit")}
            </Button>
          </div>
        </div>
      )}

      {/* Trust indicators */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          {t("components.mcaForm.trust.secure")}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{t("components.mcaForm.trust.noImpact")}</div>
      </div>
    </div>
  );
}
