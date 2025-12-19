import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { canonical } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Clock, DollarSign } from "lucide-react";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface IndustryTemplateProps {
  title: string;
  description: string;
  keywords: string;
  heroTitle: string;
  heroSubtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  challenges: string[];
  useCases: string[];
  solutions: string[];
  benefits: Array<{ icon: React.ComponentType<{ className?: string }>; text: string }>;
  stats: Array<{ label: string; value: string; description: string }>;
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    role: string;
  };
  faq: Array<{ question: string; answer: string }>;
  images: {
    hero: string;
    challenge: string;
    solution: string;
  };
  slug: string;
}

export const IndustryTemplate: React.FC<IndustryTemplateProps> = ({
  title,
  description,
  keywords,
  heroTitle,
  heroSubtitle,
  icon: Icon,
  challenges,
  useCases,
  solutions,
  benefits,
  stats,
  testimonial,
  faq,
  images,
  slug,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        <Helmet>
          <title>{title} | WispFi</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="canonical" href={canonical(`/industries/${slug}`)} />
        </Helmet>

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center mobile-py-6">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images.hero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
          <div className="container relative z-10 py-16 lg:py-24 mobile-px-4">
            <div className="max-w-4xl mobile-text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 touch-target">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 mobile-text-2xl mobile-leading-tight">
                {heroTitle}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 mobile-text-lg">{heroSubtitle}</p>
              <Button
                size="lg"
                variant="cta"
                onClick={() => setModalOpen(true)}
                className="touch-friendly-button touch-feedback mobile-min-h-touch"
              >
                {t("industryTemplate.checkEligibility")}
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                    <CardDescription className="text-lg font-semibold">{stat.label}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges & Use Cases */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t("industryTemplate.theChallenge")}</h2>
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t("industryTemplate.commonUseCases")}</h2>
                <ul className="space-y-3">
                  {useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions & Benefits */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t("industryTemplate.ourSolution")}</h2>
                <ul className="space-y-3">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t("industryTemplate.expectedResults")}</h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <li key={index} className="flex items-start gap-3">
                        <BenefitIcon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-lg">{benefit.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {testimonial && (
          <section className="py-16 lg:py-24">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center">
                <blockquote className="text-2xl lg:text-3xl font-medium italic mb-6">"{testimonial.quote}"</blockquote>
                <div className="text-lg">
                  <span className="font-semibold">{testimonial.author}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    — {testimonial.role}, {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="py-16 lg:py-24 bg-muted">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">{t("industryTemplate.faq")}</h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faq.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-lg px-6">
                      <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">{t("industryTemplate.readyToStart")}</h2>
            <Button size="lg" variant="cta" onClick={() => setModalOpen(true)}>
              {t("industryTemplate.checkEligibility")}
            </Button>
          </div>
        </section>

        <PrequalModal open={modalOpen} onOpenChange={setModalOpen} />
      </main>
      <SiteFooter />
    </>
  );
};
