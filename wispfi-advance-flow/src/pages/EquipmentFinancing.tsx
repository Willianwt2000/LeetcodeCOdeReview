import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { canonical } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CheckCircle2, Clock, Shield, BadgeCheck, FileText, Banknote, Zap, Users, Star, Award, TrendingUp, Hammer, Truck, Network, UtensilsCrossed, Wrench, Computer, CreditCard } from "lucide-react";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { TestimonialCarousel } from "@/components/wispfi/TestimonialCarousel";
import { EFHeroNew } from "@/components/wispfi/EFHeroNew";
import { IndustryStrip } from "@/components/wispfi/IndustryStrip";
import { WhoWeServe } from "@/components/wispfi/WhoWeServe";
import { MiniFAQ } from "@/components/wispfi/MiniFAQ";
import { TrustBar } from "@/components/wispfi/TrustBar";
import { DealerPrivateToggle } from "@/components/wispfi/DealerPrivateToggle";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import { EquipmentFinancingCalculator } from "@/components/wispfi/EquipmentFinancingCalculator";
import { QualificationCriteria } from "@/components/wispfi/QualificationCriteria";
import { EquipmentFinancingTestimonials } from "@/components/wispfi/EquipmentFinancingTestimonials";
import FormShellMCA from "@/components/forms/FormShellMCA";
import { EquipmentBlogPreview } from "@/components/wispfi/EquipmentBlogPreview";
import { ABTestExitIntentModal } from "@/components/wispfi/ABTestExitIntentModal";
import MobileStickyCTA from "@/components/wispfi/MobileStickyCTA";
import { useIsMobile } from "@/hooks/use-mobile";

// Industry photo imports
import constructionMachinery from "@/assets/industries/construction-machinery.webp";
import trucksTransportation from "@/assets/industries/trucks-transportation.webp";
import telecomBroadband from "@/assets/industries/telecom-broadband.webp";
import restaurantsFoodservice from "@/assets/industries/restaurants-foodservice.webp";
import medicalDental from "@/assets/industries/medical-dental.webp";
import manufacturing from "@/assets/industries/manufacturing.webp";
import officeIT from "@/assets/industries/office-it.webp";
import posPayments from "@/assets/industries/pos-payments.webp";
import warmMeetingRoom from '@/assets/backgrounds/warm-meeting-room.jpg';
import warmOfficeSpace from '@/assets/backgrounds/warm-office-space.jpg';

const scrollToForm = () => {
  const el = document.getElementById("ef-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const EquipmentFinancing = () => {
  const { t } = useTranslation();
  const [isFormReady, setIsFormReady] = useState(false);
  const [isPrequalModalOpen, setIsPrequalModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleFormSubmit = () => {
    // GTM tracking for Equipment conversion
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'lead_equipment',
        page_url: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Enhanced Conversions tracking is now handled directly in EFHeroNew.tsx

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{t('meta.equipmentFinancing.title')}</title>
        <meta name="description" content={t('meta.equipmentFinancing.description')} />
        <meta name="keywords" content="equipment financing, equipment leasing, truck financing, construction equipment loans, restaurant equipment financing, WISP equipment funding" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical("/equipment-financing")} />

        {/* OpenGraph Tags */}
        <meta property="og:title" content={t('meta.equipmentFinancing.title')} />
        <meta property="og:description" content={t('meta.equipmentFinancing.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og/wispfi-default.jpg" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og/wispfi-default.jpg" />

        {/* Service Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Equipment Financing",
          "provider": {
            "@type": "Organization",
            "name": "WispFi"
          },
          "areaServed": "US",
          "serviceType": "Equipment Financing and Leasing"
        })}</script>

        {/* FAQ Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you finance used equipment?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, used equipment may be eligible depending on condition and underwriting." }
            },
            {
              "@type": "Question",
              "name": "Dealer vs private party purchases?",
              "acceptedAnswer": { "@type": "Answer", "text": "We consider both dealer and private-party transactions; private-party may require extra verification." }
            },
            {
              "@type": "Question",
              "name": "What terms are available?",
              "acceptedAnswer": { "@type": "Answer", "text": "Terms vary by asset type, age, and applicant profile. Underwriting determines specifics." }
            },
            {
              "@type": "Question",
              "name": "Is a down payment required?",
              "acceptedAnswer": { "@type": "Answer", "text": "Not always; requirements depend on equipment and profile." }
            },
            {
              "@type": "Question",
              "name": "What collateral is used?",
              "acceptedAnswer": { "@type": "Answer", "text": "Usually the equipment itself serves as collateral." }
            },
            {
              "@type": "Question",
              "name": "How fast can funding close?",
              "acceptedAnswer": { "@type": "Answer", "text": "Funding can close in as little as 24–48 hours with complete documents, subject to approval." }
            },
            {
              "@type": "Question",
              "name": "Will applying affect my credit?",
              "acceptedAnswer": { "@type": "Answer", "text": "An initial review may use a soft pull; final approval may require a hard pull." }
            },
            {
              "@type": "Question",
              "name": "Can I deduct equipment purchases?",
              "acceptedAnswer": { "@type": "Answer", "text": "Tax advantages may be available. Consult a qualified tax advisor for specific deductions." }
            }
          ]
        })}</script>

      </Helmet>

      <SiteHeader />

      <main>
        {/* Hero Section - New Layout */}
        <EFHeroNew onFormSubmit={handleFormSubmit} />


        {/* Qualification Criteria */}
        <QualificationCriteria />

        {/* Industry Strip */}
        <IndustryStrip />

        {/* Trust Bar */}
        <TrustBar />

        {/* Equipment Financing Calculator */}
        <EquipmentFinancingCalculator onOpenModal={() => setIsPrequalModalOpen(true)} />


        {/* Value Strip */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <CardTitle>{t("equipmentFinancing.value.newOrUsed")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t("equipmentFinancing.value.newOrUsedDesc")}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t("equipmentFinancing.value.newOrUsedNote")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <CardTitle>{t("equipmentFinancing.value.fast")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{t("equipmentFinancing.value.fastDesc")}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t("equipmentFinancing.value.fastNote")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Finance - Photo Tiles */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("equipmentFinancing.whatWeFinance.title")}</h2>
              <p className="text-xl text-muted-foreground">{t("equipmentFinancing.whatWeFinance.subtitle")}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  titleKey: "equipmentFinancing.whatWeFinance.construction.title",
                  descKey: "equipmentFinancing.whatWeFinance.construction.desc",
                  image: constructionMachinery
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.trucks.title",
                  descKey: "equipmentFinancing.whatWeFinance.trucks.desc",
                  image: trucksTransportation
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.telecom.title",
                  descKey: "equipmentFinancing.whatWeFinance.telecom.desc",
                  image: telecomBroadband
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.restaurants.title",
                  descKey: "equipmentFinancing.whatWeFinance.restaurants.desc",
                  image: restaurantsFoodservice
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.medical.title",
                  descKey: "equipmentFinancing.whatWeFinance.medical.desc",
                  image: medicalDental
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.manufacturing.title",
                  descKey: "equipmentFinancing.whatWeFinance.manufacturing.desc",
                  image: manufacturing
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.office.title",
                  descKey: "equipmentFinancing.whatWeFinance.office.desc",
                  image: officeIT
                },
                {
                  titleKey: "equipmentFinancing.whatWeFinance.pos.title",
                  descKey: "equipmentFinancing.whatWeFinance.pos.desc",
                  image: posPayments
                }
              ].map((item) => (
                <Card key={item.titleKey} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/2] relative">
                    <img
                      src={item.image}
                      alt={t(item.titleKey)}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-semibold mb-1">{t(item.titleKey)}</h3>
                      <p className="text-sm opacity-90">{t(item.descKey)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-6">
                {t("equipmentFinancing.whatWeFinance.cantFind")}
              </p>
            </div>
          </div>
        </section>

        {/* Equipment Financing Testimonials */}
        <EquipmentFinancingTestimonials />

        {/* Equipment Financing Blog Preview */}
        <EquipmentBlogPreview />

        {/* How It Works Section */}
        <section
          className="py-16 lg:py-24 relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${warmMeetingRoom})` }}
        >
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
          <div className="container max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("equipmentFinancing.howItWorks.title")}</h2>
              <p className="text-muted-foreground text-lg">{t("equipmentFinancing.howItWorks.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-orange-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t("equipmentFinancing.howItWorks.step1.title")}</h3>
                  <p className="text-muted-foreground mb-2">{t("equipmentFinancing.howItWorks.step1.desc")}</p>
                  <p className="text-sm text-gray-600">{t("equipmentFinancing.howItWorks.step1.detail")}</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t("equipmentFinancing.howItWorks.step2.title")}</h3>
                  <p className="text-muted-foreground mb-2">{t("equipmentFinancing.howItWorks.step2.desc")}</p>
                  <p className="text-sm text-gray-600">{t("equipmentFinancing.howItWorks.step2.detail")}</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t("equipmentFinancing.howItWorks.step3.title")}</h3>
                  <p className="text-muted-foreground mb-2">{t("equipmentFinancing.howItWorks.step3.desc")}</p>
                  <p className="text-sm text-gray-600">{t("equipmentFinancing.howItWorks.step3.detail")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <WhoWeServe />

        {/* Dealer vs Private Party Toggle */}
        <DealerPrivateToggle />

        {/* Industries We Serve */}
        <section
          id="industries-we-serve"
          className="py-16 lg:py-24 relative bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${warmOfficeSpace})` }}
        >
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("equipmentFinancing.industries.title")}</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Hammer className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-lg">{t("equipmentFinancing.industries.construction.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t("equipmentFinancing.industries.construction.desc")}</p>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">{t("equipmentFinancing.industries.construction.assets")}</p>
                    <ul className="space-y-1">
                      <li>• {t("equipmentFinancing.industries.construction.asset1")}</li>
                      <li>• {t("equipmentFinancing.industries.construction.asset2")}</li>
                      <li>• {t("equipmentFinancing.industries.construction.asset3")}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Truck className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-lg">{t("equipmentFinancing.industries.trucking.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t("equipmentFinancing.industries.trucking.desc")}</p>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">{t("equipmentFinancing.industries.trucking.assets")}</p>
                    <ul className="space-y-1">
                      <li>• {t("equipmentFinancing.industries.trucking.asset1")}</li>
                      <li>• {t("equipmentFinancing.industries.trucking.asset2")}</li>
                      <li>• {t("equipmentFinancing.industries.trucking.asset3")}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Network className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-lg">{t("equipmentFinancing.industries.telecom.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t("equipmentFinancing.industries.telecom.desc")}</p>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">{t("equipmentFinancing.industries.telecom.assets")}</p>
                    <ul className="space-y-1">
                      <li>• {t("equipmentFinancing.industries.telecom.asset1")}</li>
                      <li>• {t("equipmentFinancing.industries.telecom.asset2")}</li>
                      <li>• {t("equipmentFinancing.industries.telecom.asset3")}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <UtensilsCrossed className="w-8 h-8 text-primary mb-4" />
                  <CardTitle className="text-lg">{t("equipmentFinancing.industries.restaurants.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{t("equipmentFinancing.industries.restaurants.desc")}</p>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">{t("equipmentFinancing.industries.restaurants.assets")}</p>
                    <ul className="space-y-1">
                      <li>• {t("equipmentFinancing.industries.restaurants.asset1")}</li>
                      <li>• {t("equipmentFinancing.industries.restaurants.asset2")}</li>
                      <li>• {t("equipmentFinancing.industries.restaurants.asset3")}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mini FAQ */}
        <MiniFAQ />

        {/* Form Section - Mobile Only REMOVED - Single form only */}

        {/* Compliance Footer */}
        <section className="py-8 bg-background border-t">
          <div className="container">
            <p className="text-xs text-muted-foreground text-center">
              {t("equipmentFinancing.compliance")}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      {/* Modals */}
      <PrequalModal open={isPrequalModalOpen} onOpenChange={setIsPrequalModalOpen} formType="ef" />
      <ABTestExitIntentModal />
    </div>
  );
};

export default EquipmentFinancing;