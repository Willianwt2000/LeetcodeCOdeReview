import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { LabelWithAsterisk } from "@/components/ui/label-with-asterisk";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPhoneNumber, isValidEmail, isValidPhone } from "@/lib/form-utils";
import { useAnalytics } from "@/hooks/useAnalytics";
// import RecaptchaV2 from "./RecaptchaV2";
import { getLeadSourceFromCookie } from "@/lib/attribution";


import { useTranslation } from "react-i18next";
import { FORM_IDS, PORTAL_ID } from "@/config/formIds";

// const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

type State = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  service_mca: string;
  message: string;
  privacy_consent: boolean;
  website?: string; // honeypot
};

const initial: State = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  service_mca: "",
  message: "",
  privacy_consent: false,
  website: "",
};

const SERVICES = [
  "Equipment Financing",
  "Working Capital",
  "Business Loan",
  "Line of Credit",
  "General Consultation"
];


function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith(name + "="))
    ?.split("=")[1];
}

function normPhone(v: string) {
  return v.replace(/[^\d+]/g, "");
}

function toHsFields(s: State) {
  const persisted = getLeadSourceFromCookie("last");
  const leadSource = persisted || "Organic";

  return [
    { name: "firstname", value: s.firstname.trim() },
    { name: "lastname", value: s.lastname.trim() },
    { name: "email", value: s.email.trim() },
    { name: "phone", value: normPhone(s.phone) },
    { name: "service_mca", value: s.service_mca },
    { name: "message", value: s.message.trim() },
    // Metadata
    { name: "form_source", value: "Contact React API" },
    { name: "funnel", value: "Contact" },
    { name: "lead_type", value: "Contact" },
    { name: "product_line", value: "CONTACT" },
    { name: "lead_source", value: leadSource },
  ];
}

export default function ContactFormAPI() {

  const { t, i18n } = useTranslation();

  // Obtener el ID según el idioma actual (fallback a inglés si no existe)
  const currentFormId = i18n.language === 'es' ? FORM_IDS.contact.es : FORM_IDS.contact.en;
  // Construir la URL dinámicamente
  const submitUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${currentFormId}`;

  const [form, setForm] = useState<State>(initial);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  // const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const { trackEvent } = useAnalytics();

  useEffect(() => { window.dataLayer = window.dataLayer || []; }, []);

  const isFormValid = useMemo(() => {
    return (
      form.firstname.trim() &&
      form.lastname.trim() &&
      isValidEmail(form.email) &&
      isValidPhone(form.phone) &&
      form.service_mca &&
      form.message.trim() &&
      form.privacy_consent
    );
  }, [form.firstname, form.lastname, form.email, form.phone, form.service_mca, form.message, form.privacy_consent]);

  const onChange = (k: keyof State) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    // Format phone number as user types
    if (k === 'phone') {
      value = formatPhoneNumber(value);
    }

    setForm(prev => ({ ...prev, [k]: value }));
  };

  const onSelectChange = (k: keyof State) => (value: string) => {
    setForm(prev => ({ ...prev, [k]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (form.website && form.website.trim().length > 0) return;
    if (!isFormValid) return;

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
        event: "contact_form_submit",
        formSource: "ContactFormAPI",
        email: form.email,
        phone: normPhone(form.phone),
        service: form.service_mca,
      });

      window.dataLayer.push({
        event: "contact_form_submit",
        formSource: "ContactFormAPI",
        email: form.email,
        phone: normPhone(form.phone),
        service: form.service_mca,
      });

      setSent(true);
    } catch (e: any) {
      setErr(e?.message ?? t('components.contactForm.submitError'));
    } finally {
      setLoading(false);
    }
  }

  const getServiceLabel = (service: string) => {
    const map: Record<string, string> = {
      "Equipment Financing": "equipmentFinancing",
      "Working Capital": "workingCapital",
      "Business Loan": "businessLoan",
      "Line of Credit": "lineOfCredit",
      "General Consultation": "generalConsultation"
    };
    const key = map[service];
    return key ? t(`components.contactForm.services.${key}`) : service;
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-semibold mb-3 text-primary">{t('components.contactForm.success.title')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('components.contactForm.success.message')}
        </p>
        <Button onClick={() => setSent(false)} variant="outline">
          {t('components.contactForm.success.button')}
        </Button>
      </div>
    );
  }

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

      <form onSubmit={onSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-center mb-4">{t('components.contactForm.title')}</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <LabelWithAsterisk htmlFor="firstname" required>{t('components.contactForm.firstName')}</LabelWithAsterisk>
            <Input
              id="firstname"
              type="text"
              value={form.firstname}
              onChange={onChange("firstname")}
              placeholder={t('components.contactForm.firstNamePlaceholder')}
              className={!form.firstname.trim() && form.firstname !== initial.firstname ? "border-destructive" : ""}
              required
            />
          </div>
          <div className="space-y-2">
            <LabelWithAsterisk htmlFor="lastname" required>{t('components.contactForm.lastName')}</LabelWithAsterisk>
            <Input
              id="lastname"
              type="text"
              value={form.lastname}
              onChange={onChange("lastname")}
              placeholder={t('components.contactForm.lastNamePlaceholder')}
              className={!form.lastname.trim() && form.lastname !== initial.lastname ? "border-destructive" : ""}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <LabelWithAsterisk htmlFor="email" required>{t('components.contactForm.email')}</LabelWithAsterisk>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder={t('components.contactForm.emailPlaceholder')}
            className={form.email && !isValidEmail(form.email) ? "border-destructive" : ""}
            required
          />
          {form.email && !isValidEmail(form.email) && (
            <p className="text-sm text-destructive mt-1">{t('components.contactForm.emailError')}</p>
          )}
        </div>

        <div className="space-y-2">
          <LabelWithAsterisk htmlFor="phone" required>{t('components.contactForm.phone')}</LabelWithAsterisk>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={onChange("phone")}
            placeholder={t('components.contactForm.phonePlaceholder')}
            className={form.phone && !isValidPhone(form.phone) ? "border-destructive" : ""}
            required
          />
          {form.phone && !isValidPhone(form.phone) && (
            <p className="text-sm text-destructive mt-1">{t('components.contactForm.phoneError')}</p>
          )}
        </div>

        <div className="space-y-2">
          <LabelWithAsterisk htmlFor="service_mca" required>{t('components.contactForm.service')}</LabelWithAsterisk>
          <Select onValueChange={onSelectChange("service_mca")} value={form.service_mca}>
            <SelectTrigger>
              <SelectValue placeholder={t('components.contactForm.servicePlaceholder')} />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border shadow-lg z-50">
              {SERVICES.map((service) => (
                <SelectItem key={service} value={service}>
                  {getServiceLabel(service)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <LabelWithAsterisk htmlFor="message" required>{t('components.contactForm.message')}</LabelWithAsterisk>
          <Textarea
            id="message"
            value={form.message}
            onChange={onChange("message")}
            placeholder={t('components.contactForm.messagePlaceholder')}
            rows={4}
            className={!form.message.trim() && form.message !== initial.message ? "border-destructive" : ""}
            required
          />
        </div>

        {/* Privacy Consent Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="mb-3">
              {t('components.contactForm.privacy.text')}
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy_consent"
              checked={form.privacy_consent}
              onCheckedChange={(checked) =>
                setForm(prev => ({ ...prev, privacy_consent: checked === true }))
              }
              className="mt-1"
            />
            <div className="flex-1">
              <LabelWithAsterisk htmlFor="privacy_consent" required className="text-sm font-normal cursor-pointer">
                {t('components.contactForm.privacy.checkbox')}
              </LabelWithAsterisk>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {t('components.contactForm.privacy.disclaimer')}
          </p>
        </div>

        {/* reCAPTCHA v2 */}
        {/* <RecaptchaV2 onChange={setRecaptchaToken} className="mb-3" /> */}

        <Button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {loading ? t('components.contactForm.submitting') : t('components.contactForm.submit')}
        </Button>

        {err && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {err}
          </div>
        )}
      </form>

      {/* Security badges */}
      <div className="mt-6 flex justify-center items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center">
          <span className="mr-1">🔒</span>
          {t('components.contactForm.badges.ssl')}
        </div>
        <div className="flex items-center">
          <span className="mr-1">✓</span>
          {t('components.contactForm.badges.ccpa')}
        </div>
      </div>
    </div>
  );
}



