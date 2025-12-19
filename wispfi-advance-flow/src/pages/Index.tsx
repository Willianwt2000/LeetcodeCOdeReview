import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import { mountMCAForm } from "@/lib/mcaForm";
import FormShellMCA from "@/components/forms/FormShellMCA";
import { HubSpotPrequalForm } from "@/components/wispfi/HubSpotPrequalForm";
import MCAFormAPI from "@/components/wispfi/MCAFormAPI";

import { MCAModal } from "@/components/common/MCAModal";
import "@/styles/home.hero.card.css";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  CheckCircle2,
  Clock,
  Shield,
  BadgeCheck,
  FileText,
  Banknote,
  Zap,
  RefreshCw,
  Headset,
  Users,
  Star,
  Award,
} from "lucide-react";
import { canonical } from "@/lib/seo";

import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { ReviewsCarousel } from "@/components/wispfi/ReviewsCarousel";
import indRestaurants from "@/assets/industries/restaurants-people.jpg";
import indRetail from "@/assets/industries/retail-people.jpg";
import indTrucking from "@/assets/industries/trucking-people.jpg";
import indSalons from "@/assets/industries/salons-people.jpg";
import indContractors from "@/assets/industries/contractors-people.jpg";
import indBroadband from "@/assets/industries/wireless-fiber-broadband.jpg";
import luisTruckingOwner from "@/assets/reviewers/luis-trucking-owner.jpg";
import { CaseStudies } from "@/components/wispfi/CaseStudies";
import { FundingCalculator } from "@/components/wispfi/FundingCalculator";
import { HeroVideo, WhoQualifies } from "@/components/wispfi/HeroVideo";
import { TrustSecurity } from "@/components/wispfi/TrustSecurity";
import { ProcessTimeline } from "@/components/wispfi/ProcessTimeline";
import { BlogPreview } from "@/components/wispfi/BlogPreview";
import { QualificationCriteria } from "@/components/wispfi/QualificationCriteria";
import { IndustryStrip } from "@/components/wispfi/IndustryStrip";
import { TrustBar } from "@/components/wispfi/TrustBar";
// import { ABTestExitIntentModal } from "@/components/wispfi/ABTestExitIntentModal";
import { MobileStickyCTA } from "@/components/wispfi/MobileStickyCTA";
import { AdvancedAnalytics } from "@/components/wispfi/AdvancedAnalytics";
import { ReviewsSection } from "@/components/wispfi/ReviewsSection";

import { captureAttributionOnce } from "@/lib/attribution";

const scrollToForm = () => {
  const el = document.getElementById("eligibility-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  // Alias for backward compatibility with components expecting onOpenModal
  const onOpenModal = openModal;

  useEffect(() => {
    // Persist attribution every time a user lands with UTMs / click IDs.
    // For an SPA with client-side routing, call this on route change too.
    console.log("captureAttributionOnce");
    captureAttributionOnce("last");
  }, []);

  // Visibility logger (keep)
  useEffect(() => {
    const el = document.getElementById("home-mca-form-card");
    if (!el) return;
    const cs = getComputedStyle(el);
    console.log(">>>> MCA hero visibility @mount:", {
      display: cs.display,
      opacity: cs.opacity,
      visibility: cs.visibility,
    });
  }, []);

  // Removed old HubSpot hero mount - now using HeroVideo with MCAFormFloat component

  // Removed old MCA decision inline mount - now using HubSpotPrequalForm component

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>WispFi MCA Funding | Funding available in as little as 24–48 hours*</title>
        <meta
          name="description"
          content="WispFi helps small businesses access working capital fast. Not a bank loan. Check eligibility quickly, with no obligation."
        />
        <link rel="canonical" href={canonical("/")} />

        {/* OpenGraph Tags */}
        <meta property="og:title" content="WispFi MCA Funding | Funding available in as little as 24–48 hours*" />
        <meta
          property="og:description"
          content="WispFi helps small businesses access working capital fast. Not a bank loan. Check eligibility quickly, with no obligation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og/wispfi-default.jpg" />

        <meta name="facebook-domain-verification" content="3tgbjt3e6xwguga93s57tta0jqjbe2" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og/wispfi-default.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "WispFi",
            url: "/",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+18188580184",
                contactType: "customer service",
                email: "sales@wispfi.com",
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "1317 EDGEWATER DR, #4212",
              addressLocality: "Orlando",
              addressRegion: "FL",
              postalCode: "32804",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this a loan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. It's a purchase of future receivables, also known as an MCA.",
                },
              },
              {
                "@type": "Question",
                name: "How fast can I get funding?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If approved, funding as soon as 1–2 business days (subject to approval).",
                },
              },
              {
                "@type": "Question",
                name: "Do you check my credit?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No hard pull to prequalify. We look at overall business performance.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <SiteHeader />

      <main>
        <HeroVideo onOpenModal={openModal} />

        {/* Qualification Criteria */}
        <QualificationCriteria />

        {/* Industry Strip */}
        <IndustryStrip />

        {/* Trust Bar */}
        <TrustBar />

        <FundingCalculator onOpenModal={openModal} />

        {/* Use Case Callouts */}
        <section className="sm:bg-muted/30 bg-gradient-to-br from-orange-50 via-white to-yellow-50 sm:py-16 py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">{t("home.businessTypes.title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                {t("home.businessTypes.subtitle")}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
                <div className="sm:bg-card bg-white/80 backdrop-blur-sm rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <p className="font-semibold text-lg mb-3 text-foreground">
                    {t("home.businessTypes.isp.title")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("home.businessTypes.isp.description")}
                  </p>
                </div>
                <div className="sm:bg-card bg-white/80 backdrop-blur-sm rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <p className="font-semibold text-lg mb-3 text-foreground">
                    {t("home.businessTypes.cardPayments.title")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("home.businessTypes.cardPayments.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Snapshot */}
        <section className="border-t sm:bg-muted/30 bg-gradient-to-br from-purple-50 via-white to-pink-50 sm:py-16 py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">{t("home.industries.title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("home.industries.subtitle")}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  titleKey: "home.industries.restaurants.title",
                  img: indRestaurants,
                  altKey: "home.industries.restaurants.alt",
                  href: "/industries/restaurants",
                  descKey: "home.industries.restaurants.description",
                },
                {
                  titleKey: "home.industries.retail.title",
                  img: indRetail,
                  altKey: "home.industries.retail.alt",
                  href: "/industries/retail",
                  descKey: "home.industries.retail.description",
                },
                {
                  titleKey: "home.industries.trucking.title",
                  img: indTrucking,
                  altKey: "home.industries.trucking.alt",
                  href: "/industries/trucking",
                  descKey: "home.industries.trucking.description",
                },
                {
                  titleKey: "home.industries.salons.title",
                  img: indSalons,
                  altKey: "home.industries.salons.alt",
                  href: "/industries/salons",
                  descKey: "home.industries.salons.description",
                },
                {
                  titleKey: "home.industries.contractors.title",
                  img: indContractors,
                  altKey: "home.industries.contractors.alt",
                  href: "/industries/contractors",
                  descKey: "home.industries.contractors.description",
                },
                {
                  titleKey: "home.industries.broadband.title",
                  img: indBroadband,
                  altKey: "home.industries.broadband.alt",
                  href: "/industries/wisp",
                  descKey: "home.industries.broadband.description",
                },
              ].map((i) => (
                <div
                  key={i.titleKey}
                  className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 sm:bg-card bg-white/80 backdrop-blur-sm"
                >
                  <img src={i.img} alt={t(i.altKey)} className="h-48 w-full object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{t(i.titleKey)}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{t(i.descKey)}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button size="sm" variant="cta" onClick={openModal} className="flex-1">
                        {t("cta.checkMyEligibility")}
                      </Button>
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a href={i.href}>{t("cta.learnMore")}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center justify-center">
              <div className="text-center">
                <Button variant="cta" onClick={openModal} className="px-8 py-6 text-lg font-semibold">
                  {t("cta.checkMyOptions")}
                </Button>
                <div className="mt-3 text-sm text-muted-foreground">
                  {t("home.industries.needEquipment", { link: "" })}
                  <a className="underline text-primary hover:text-primary/80 font-medium" href="/equipment-financing">
                    {t("nav.equipmentFinancing")}
                  </a>
                  ?
                </div>
              </div>
              <Button variant="outline" asChild className="px-6 py-3">
                <a href="/industries">{t("cta.seeAllIndustries")}</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <CaseStudies />

        {/* Latest Blog Insights */}
        <BlogPreview />

        {/* Client Reviews */}
        <ReviewsSection />

        {/* Testimonials at scale */}
        <ReviewsCarousel />
        <div className="container mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Button variant="link" asChild className="text-primary hover:text-primary/80">
            <a href="/case-studies" aria-label="Read more success stories">
              {t("cta.readMoreStories")}
            </a>
          </Button>
          <Button variant="cta" onClick={openModal} className="px-8 py-6 text-lg font-semibold w-full sm:w-auto">
            {t("cta.seeIfIQualify")}
          </Button>
        </div>

        {/* FAQs */}
        <section id="faq" className="py-16 scroll-mt-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">{t("home.faq.title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("home.faq.subtitle")}
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t("home.faq.q1")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a1")}{" "}
                  <a
                    href="/blog/rising-interest-rates-small-business-funding-2025"
                    className="text-primary hover:underline"
                  >
                    {t("home.faq.learnMore")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t("home.faq.q2")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a2")}{" "}
                  <a href="/blog/real-cost-waiting-fund-business" className="text-primary hover:underline">
                    {t("home.faq.costOfWaiting")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t("home.faq.q3")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a3")}{" "}
                  <a href="/blog/prepare-business-funding-approval-2025" className="text-primary hover:underline">
                    {t("home.faq.approvalGuide")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>{t("home.faq.q4")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a4")}{" "}
                  <a href="/industries" className="text-primary hover:underline">
                    {t("home.faq.calculateFunding")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>{t("home.faq.q5")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a5")}{" "}
                  <a href="/blog/prepare-business-funding-approval-2025" className="text-primary hover:underline">
                    {t("home.faq.fullChecklist")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>{t("home.faq.q6")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a6")}{" "}
                  <a href="/blog/working-capital-matters-more-2025" className="text-primary hover:underline">
                    {t("home.faq.flexibleFunding")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>{t("home.faq.q7")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a7")}{" "}
                  <a href="/blog/industries-thriving-higher-interest-rates" className="text-primary hover:underline">
                    {t("home.faq.industriesThriving")}
                  </a>{" "}
                  and{" "}
                  <a href="/industries" className="text-primary hover:underline">
                    {t("home.faq.applyToQualify")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>{t("home.faq.q8")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a8")}{" "}
                  <a href="/contact#contact-form" className="text-primary hover:underline">
                    {t("home.faq.talkToSpecialist")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>{t("home.faq.q9")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a9")}{" "}
                  <a href="/why" className="text-primary hover:underline">
                    {t("home.faq.completeProcess")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger>{t("home.faq.q10")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a10")}{" "}
                  <a href="/blog/funding-business-economic-uncertainty-2025" className="text-primary hover:underline">
                    {t("home.faq.uncertaintyGuide")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger>{t("home.faq.q11")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a11")}{" "}
                  <a
                    href="/blog/rising-interest-rates-small-business-funding-2025"
                    className="text-primary hover:underline"
                  >
                    {t("home.faq.ratesImpact")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger>{t("home.faq.q12")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a12")}{" "}
                  <a href="/blog/working-capital-matters-more-2025" className="text-primary hover:underline">
                    {t("home.faq.seasonalHelp")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-13">
                <AccordionTrigger>{t("home.faq.q13")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a13")}{" "}
                  <a href="/blog/real-cost-waiting-fund-business" className="text-primary hover:underline">
                    {t("home.faq.costCalculate")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-14">
                <AccordionTrigger>{t("home.faq.q14")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a14")}{" "}
                  <a href="/blog/funding-expansion-economic-slowdown" className="text-primary hover:underline">
                    {t("home.faq.expansionStrategies")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-15">
                <AccordionTrigger>{t("home.faq.q15")}</AccordionTrigger>
                <AccordionContent>
                  {t("home.faq.a15")}{" "}
                  <a href="/blog/working-capital-matters-more-2025" className="text-primary hover:underline">
                    {t("home.faq.workingCapitalMatters")}
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Premium Two-Column Form Section */}
        <section
          id="eligibility-form"
          className="relative bg-gradient-to-br from-background via-muted/20 to-background border-t overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

          <div className="relative container py-8">
            {/* Two-Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Compelling Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {t("home.eligibilityForm.title")}{" "}
                    <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">
                      {t("home.eligibilityForm.highlight")}
                    </span>{" "}
                    {t("home.eligibilityForm.titleEnd")}
                  </h3>
                  <p className="text-xl text-muted-foreground mb-6">
                    {t("home.eligibilityForm.subtitle")}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t("home.eligibilityForm.benefits.funding24")}</p>
                      <p className="text-xs text-muted-foreground">{t("home.eligibilityForm.benefits.funding24Desc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t("home.eligibilityForm.benefits.flexible")}</p>
                      <p className="text-xs text-muted-foreground">{t("home.eligibilityForm.benefits.flexibleDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t("home.eligibilityForm.benefits.noCredit")}</p>
                      <p className="text-xs text-muted-foreground">{t("home.eligibilityForm.benefits.noCreditDesc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Headset className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t("home.eligibilityForm.benefits.support")}</p>
                      <p className="text-xs text-muted-foreground">{t("home.eligibilityForm.benefits.supportDesc")}</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-card/50 backdrop-blur border rounded-xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic mb-3">
                    {t("home.eligibilityForm.testimonial")}
                  </blockquote>
                  <cite className="text-xs text-muted-foreground font-medium">{t("home.eligibilityForm.testimonialAuthor")}</cite>
                </div>

                {/* Guarantee */}
                <div className="flex items-start gap-3 p-4 bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/50 rounded-lg">
                  <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-green-800 dark:text-green-200">
                      {t("home.eligibilityForm.guarantee.title")}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      {t("home.eligibilityForm.guarantee.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="relative shadow-2xl rounded-xl">
                <div className="flex justify-center mb-4 mt-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full animate-pulse backdrop-blur">
                    <span className="text-xs font-medium text-primary">{t("home.eligibilityForm.formHeader.limitedTime")}</span>
                    <span className="text-xs text-muted-foreground">{t("home.eligibilityForm.formHeader.ratesRise")}</span>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold mb-2">{t("home.eligibilityForm.formHeader.title")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("home.eligibilityForm.formHeader.subtitle")}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6 mb-0 pb-6 border-b border-border/50">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">{t("home.eligibilityForm.badges.ssl")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">{t("home.eligibilityForm.badges.quick")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">{t("home.eligibilityForm.badges.noHit")}</span>
                  </div>
                </div>
                <div id="home-mca-form-card" className="max-w-[560px] w-full">
                  <FormShellMCA variant="mca-b" className="max-w-[560px] w-full">
                    <MCAFormAPI />
                  </FormShellMCA>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-center gap-6 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{t("home.eligibilityForm.badges.funded")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{t("home.eligibilityForm.badges.rating")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>{t("home.eligibilityForm.badges.security")}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mb-5 p-5">
                    {t("home.eligibilityForm.footerNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Trust Indicators */}
              <div className="text-center p-6 bg-card/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">{t("home.trustSection.bankSecurity")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.trustSection.bankSecurityDesc")}</p>
              </div>

              <div className="text-center p-6 bg-card/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">{t("home.trustSection.trusted")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.trustSection.trustedDesc")}</p>
              </div>

              <div className="text-center p-6 bg-card/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">{t("home.trustSection.fast")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.trustSection.fastDesc")}</p>
              </div>

              <div className="text-center p-6 bg-card/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <BadgeCheck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2 text-foreground">{t("home.trustSection.bbb")}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("home.trustSection.bbbDesc")}</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold mb-6 animate-pulse">
                <Clock className="h-5 w-5" />
                {t("home.trustSection.limitedTime")}
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("home.trustSection.finalCta")}
              </p>
              <Button
                variant="cta"
                onClick={openModal}
                className="px-8 py-6 text-lg font-semibold w-full sm:w-auto sm:min-w-[280px]"
              >
                {t("cta.startMyApplication")}
              </Button>
            </div>
          </div>
        </section>
        {/* Sticky desktop CTA */}
        <div className="hidden lg:flex fixed bottom-8 right-8 z-40 shadow-2xl">
          <Button
            size="lg"
            variant="cta"
            onClick={openModal}
            aria-label={t("cta.checkEligibility")}
            className="px-6 py-4 text-base font-semibold"
          >
            {t("cta.checkMyEligibility")}
          </Button>
        </div>
      </main>

      <SiteFooter />

      {/* A/B Test Exit Intent Modal (TEMP disabled while stabilizing hero) */}
      {/* <ABTestExitIntentModal /> */}

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      {/* Advanced Analytics */}
      <AdvancedAnalytics />

      {/* Prequalification Modal */}
      <PrequalModal open={modalOpen} onOpenChange={setModalOpen} formType="general" />
    </div>
  );
};

export default Index;
