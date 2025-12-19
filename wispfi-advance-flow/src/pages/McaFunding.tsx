import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { canonical } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  CheckCircle2,
  Clock,
  Shield,
  BadgeCheck,
  FileText,
  Banknote,
  Zap,
  Users,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { HubSpotPrequalForm } from "@/components/wispfi/HubSpotPrequalForm";
import MCAFormAPI from "@/components/wispfi/MCAFormAPI";
import { ReviewsCarousel } from "@/components/wispfi/ReviewsCarousel";
import businessOwnerLaptop from "@/assets/blog/business-owner-laptop-smiling.jpg";

const scrollToForm = () => {
  const el = document.getElementById("mca-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const McaFunding = () => {
  const { t } = useTranslation();
  const [isFormReady, setIsFormReady] = useState(false);

  const handleFormSubmit = () => {
    // GTM tracking for MCA conversion
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "lead_mca",
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Merchant Cash Advance (MCA) — Business Funding in as little as 24–48 Hours | WispFi</title>
        <meta
          name="description"
          content="Get fast working capital in as little as 24–48 hours. MCA funding to cover payroll, inventory, and seasonal cash flow. Subject to approval."
        />
        <meta
          name="keywords"
          content="merchant cash advance, MCA funding, business working capital, fast business funding, payroll funding, inventory financing"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical("/mca-funding")} />

        {/* OpenGraph Tags */}
        <meta
          property="og:title"
          content="Merchant Cash Advance (MCA) — Business Funding in as little as 24–48 Hours | WispFi"
        />
        <meta
          property="og:description"
          content="Get fast working capital in as little as 24–48 hours. MCA funding to cover payroll, inventory, and seasonal cash flow. Subject to approval."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og/wispfi-default.jpg" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og/wispfi-default.jpg" />

        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Merchant Cash Advance",
            provider: {
              "@type": "Organization",
              name: "WispFi",
            },
            areaServed: "US",
            serviceType: "Business Funding",
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How fast can I get funded?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Funding can occur in as little as 24–48 hours, subject to approval and completed documentation.",
                },
              },
              {
                "@type": "Question",
                name: "Will applying affect my credit?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An initial review may use a soft pull; final approval may require a hard pull.",
                },
              },
              {
                "@type": "Question",
                name: "How is pricing structured?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Factor rates and fees vary by applicant profile and underwriting. There is no guaranteed approval.",
                },
              },
              {
                "@type": "Question",
                name: "What documents are required?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Typically 3–6 months of bank statements and a valid ID; more may be requested.",
                },
              },
              {
                "@type": "Question",
                name: "Any industry restrictions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most industries are eligible, though some may be limited by underwriting.",
                },
              },
              {
                "@type": "Question",
                name: "How do I start?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Complete the short form to begin the application — takes about 60–90 seconds.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${businessOwnerLaptop})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t("mcaFunding.hero.title")}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                {t("mcaFunding.hero.subtitle")}
              </p>
              <Button size="lg" variant="cta" onClick={scrollToForm}>
                {t("mcaFunding.hero.cta")}
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("mcaFunding.howItWorks.title")}</h2>
              <p className="text-xl text-muted-foreground">{t("mcaFunding.howItWorks.subtitle")}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t("mcaFunding.howItWorks.step1.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t("mcaFunding.howItWorks.step1.desc")}</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t("mcaFunding.howItWorks.step2.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t("mcaFunding.howItWorks.step2.desc")}</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Banknote className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{t("mcaFunding.howItWorks.step3.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t("mcaFunding.howItWorks.step3.desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">{t("mcaFunding.eligibility.title")}</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-3 bg-background p-6 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">{t("mcaFunding.eligibility.yearInBusiness")}</span>
                </div>
                <div className="flex items-center gap-3 bg-background p-6 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">{t("mcaFunding.eligibility.deposits")}</span>
                </div>
                <div className="flex items-center gap-3 bg-background p-6 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">{t("mcaFunding.eligibility.usBased")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <ReviewsCarousel />

        {/* FAQ Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t("mcaFunding.faq.title")}</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("mcaFunding.faq.q1")}</AccordionTrigger>
                <AccordionContent>{t("mcaFunding.faq.a1")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("mcaFunding.faq.q2")}</AccordionTrigger>
                <AccordionContent>{t("mcaFunding.faq.a2")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("mcaFunding.faq.q3")}</AccordionTrigger>
                <AccordionContent>{t("mcaFunding.faq.a3")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t("mcaFunding.faq.q4")}</AccordionTrigger>
                <AccordionContent>{t("mcaFunding.faq.a4")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>{t("mcaFunding.faq.q5")}</AccordionTrigger>
                <AccordionContent>{t("mcaFunding.faq.a5")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>{t("mcaFunding.faq.q6")}</AccordionTrigger>
                <AccordionContent>{t("mcaFunding.faq.a6")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Form Section */}
        <section id="mca-form" className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("mcaFunding.form.title")}</h2>
              <p className="text-xl text-muted-foreground">{t("mcaFunding.form.subtitle")}</p>
            </div>
            <MCAFormAPI />
          </div>
        </section>

        {/* Compliance Footer */}
        <section className="py-8 bg-background border-t">
          <div className="container">
            <p className="text-xs text-muted-foreground text-center">
              {t("mcaFunding.compliance")}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default McaFunding;
