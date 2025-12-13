import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { canonical } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import {
  Radio,
  Wifi,
  Network,
  CheckCircle2,
  TrendingUp,
  Clock,
  UtensilsCrossed,
  ShoppingBag,
  Truck,
  Scissors,
  Hammer,
  Zap,
} from "lucide-react";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import fiberOpticHero from "@/assets/industries/fiber-optic-hero.jpg";
import cellTower from "@/assets/industries/cell-tower.jpg";
import fiberTechnician from "@/assets/industries/fiber-technician.jpg";
import networkEquipment from "@/assets/industries/network-equipment.jpg";
import businessMeeting from "@/assets/industries/business-planning-meeting.jpg";
import wirelessFiberBroadband from "@/assets/industries/wireless-fiber-broadband.jpg";

const Industries = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        <Helmet>
          <title>{t('industries.pageTitle')}</title>
          <meta name="description" content={t('industries.pageDescription')} />
          <meta
            name="keywords"
            content="wireless ISP financing, fiber infrastructure funding, broadband funding, telecom business loans, WISP funding, cellular tower financing, network equipment loans, ISP working capital"
          />
          <link rel="canonical" href={canonical("/industries")} />
        </Helmet>

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${fiberOpticHero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
          <div className="container relative z-10 py-16 lg:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {t('industries.heroTitle')}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                {t('industries.heroSubtitle')}
              </p>
              <Button size="lg" variant="cta" onClick={() => setOpen(true)}>
                {t('industries.checkEligibility')}
              </Button>
            </div>
          </div>
        </section>

        {/* Industries We Serve - WISP */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Radio className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">{t('industries.wisp.title')}</h2>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.challenge')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.wisp.challengeDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.useCases')}</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• {t('industries.wisp.useCase1')}</li>
                    <li>• {t('industries.wisp.useCase2')}</li>
                    <li>• {t('industries.wisp.useCase3')}</li>
                    <li>• {t('industries.wisp.useCase4')}</li>
                    <li>• {t('industries.wisp.useCase5')}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.solution')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.wisp.solutionDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.results')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{t('industries.wisp.result1')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>{t('industries.wisp.result2')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{t('industries.wisp.result3')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={cellTower}
                  alt="Cell tower infrastructure for wireless internet service providers"
                  className="w-full aspect-video object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Fiber Network Providers */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="lg:order-last space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">{t('industries.fiber.title')}</h2>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.challenge')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.fiber.challengeDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.useCases')}</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• {t('industries.fiber.useCase1')}</li>
                    <li>• {t('industries.fiber.useCase2')}</li>
                    <li>• {t('industries.fiber.useCase3')}</li>
                    <li>• {t('industries.fiber.useCase4')}</li>
                    <li>• {t('industries.fiber.useCase5')}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.solution')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.fiber.solutionDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.results')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{t('industries.fiber.result1')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>{t('industries.fiber.result2')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{t('industries.fiber.result3')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:order-first">
                <img
                  src={fiberTechnician}
                  alt="Fiber optic technician working on network infrastructure"
                  className="w-full aspect-video object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Telecom Infrastructure Companies */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Network className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">{t('industries.telecom.title')}</h2>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.challenge')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.telecom.challengeDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.useCases')}</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• {t('industries.telecom.useCase1')}</li>
                    <li>• {t('industries.telecom.useCase2')}</li>
                    <li>• {t('industries.telecom.useCase3')}</li>
                    <li>• {t('industries.telecom.useCase4')}</li>
                    <li>• {t('industries.telecom.useCase5')}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.solution')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.telecom.solutionDesc')}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.wisp.results')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{t('industries.telecom.result1')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span>{t('industries.telecom.result2')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{t('industries.telecom.result3')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={networkEquipment}
                  alt="Network equipment and telecommunications infrastructure"
                  className="w-full aspect-video object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Wireless, Fiber & Broadband */}
        <section id="wireless-fiber-broadband" className="py-16 lg:py-24 bg-muted scroll-mt-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="lg:order-last space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Network className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">{t('industries.broadband.title')}</h2>
                <p className="text-xl text-muted-foreground">
                  {t('industries.broadband.subtitle')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('industries.broadband.description')}
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.broadband.challengeTitle')}</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• {t('industries.broadband.challenge1')}</li>
                    <li>• {t('industries.broadband.challenge2')}</li>
                    <li>• {t('industries.broadband.challenge3')}</li>
                    <li>• {t('industries.broadband.challenge4')}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.broadband.useCasesTitle')}</h3>
                  <ul className="space-y-2 text-lg">
                    <li>• {t('industries.broadband.useCase1')}</li>
                    <li>• {t('industries.broadband.useCase2')}</li>
                    <li>• {t('industries.broadband.useCase3')}</li>
                    <li>• {t('industries.broadband.useCase4')}</li>
                    <li>• {t('industries.broadband.useCase5')}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.broadband.solutionTitle')}</h3>
                  <p className="text-lg leading-relaxed">
                    {t('industries.broadband.solutionDesc')}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="bg-primary/10 px-3 py-1 rounded-full">{t('industries.broadband.requirement1')}</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">{t('industries.broadband.requirement2')}</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">{t('industries.broadband.requirement3')}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-muted-foreground">{t('industries.broadband.faqTitle')}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{t('industries.broadband.faq1Q')}</h4>
                        <p className="text-muted-foreground">
                          {t('industries.broadband.faq1A')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('industries.broadband.faq2Q')}</h4>
                        <p className="text-muted-foreground">
                          {t('industries.broadband.faq2A')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('industries.broadband.faq3Q')}</h4>
                        <p className="text-muted-foreground">
                          {t('industries.broadband.faq3A')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" variant="cta" onClick={() => setOpen(true)}>
                      {t('industries.checkMyEligibility')}
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="/contact#contact-form">{t('industries.talkToSpecialist')}</a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('industries.noHardPull')}</p>
                </div>
              </div>
              <div className="lg:order-first">
                <img
                  src={wirelessFiberBroadband}
                  alt="Field tech working on fiber/wireless equipment"
                  className="w-full aspect-video object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Industry Success Stats */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            {/* Equipment Financing Card */}
            <div className="mb-12">
              <div className="max-w-4xl mx-auto rounded-xl border p-6 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{t('industries.equipment.title')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('industries.equipment.description')}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3 text-sm text-muted-foreground mb-4">
                      <div>• {t('industries.equipment.asset1')}</div>
                      <div>• {t('industries.equipment.asset2')}</div>
                      <div>• {t('industries.equipment.asset3')}</div>
                    </div>
                    <Button asChild>
                      <a href="/equipment-financing">{t('industries.equipment.explore')}</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('industries.stats.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('industries.stats.subtitle')}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">89%</div>
                    <div className="text-lg">{t('industries.stats.approvalRate')}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {t('industries.stats.approvalRateDesc')}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">$2.5M</div>
                    <div className="text-lg">{t('industries.stats.avgFunding')}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{t('industries.stats.avgFundingDesc')}</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">36h</div>
                    <div className="text-lg">{t('industries.stats.avgDecisionTime')}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{t('industries.stats.avgDecisionTimeDesc')}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Industries Section */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('industries.more.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('industries.more.subtitle')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Restaurants */}
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('industries.more.restaurants.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('industries.more.restaurants.description')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/industries/restaurants">{t('industries.learnMore')}</Link>
                </Button>
              </div>

              {/* Retail */}
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('industries.more.retail.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('industries.more.retail.description')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/industries/retail">{t('industries.learnMore')}</Link>
                </Button>
              </div>

              {/* Trucking */}
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('industries.more.trucking.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('industries.more.trucking.description')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/industries/trucking">{t('industries.learnMore')}</Link>
                </Button>
              </div>

              {/* Salons */}
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Scissors className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('industries.more.salons.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('industries.more.salons.description')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/industries/salons">{t('industries.learnMore')}</Link>
                </Button>
              </div>

              {/* Contractors */}
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Hammer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('industries.more.contractors.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('industries.more.contractors.description')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/industries/contractors">{t('industries.learnMore')}</Link>
                </Button>
              </div>

              {/* WISP */}
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Radio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('industries.more.wisp.title')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('industries.more.wisp.description')}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/industries/wisp">{t('industries.learnMore')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative min-h-[50vh] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${businessMeeting})` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          <div className="container relative z-10 text-center py-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Zap className="h-4 w-4" />
              {t('industries.finalCta.badge')}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              {t('industries.finalCta.title')}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {t('industries.finalCta.subtitle')}
            </p>
            <Button size="lg" variant="cta" onClick={() => setOpen(true)}>
              {t('industries.checkEligibility')}
            </Button>
          </div>
        </section>
        <PrequalModal open={open} onOpenChange={setOpen} />
      </main>
      <SiteFooter />
    </>
  );
};

export default Industries;
