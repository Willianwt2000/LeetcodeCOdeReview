import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { canonical } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Users, Star, Zap, Shield, Target } from "lucide-react";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import SiteHeader from "@/components/wispfi/SiteHeader";
import heroImage from "@/assets/about/hero-team-collaboration.jpg";
import handshakeImage from "@/assets/about/handshake-deal.jpg";
import teamPortrait from "@/assets/about/team-portrait.jpg";
import processImage from "@/assets/about/process-illustration.jpg";
import techBackground from "@/assets/about/tech-background.jpg";
import customerServiceImage from "@/assets/about/customer-service-team.jpg";
import yamilMedinaImage from "@/assets/team-yamil-medina.webp";
import jamieKuriaImage from "@/assets/team-jamie-kuria.webp";
import { useTranslation } from "react-i18next";

const About = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
  <main className="min-h-screen bg-background text-foreground">
    <SiteHeader />
    <Helmet>
      <title>About Wispfi | Equipment Financing & WISP Funding Solutions</title>
      <meta name="description" content="Financing that keeps pace with connectivity. Fast business funding for WISPs, fiber networks, and equipment financing. 24-hour decisions, transparent terms." />
      <meta name="keywords" content="equipment financing, WISP funding, fiber network financing, fast business funding, transparent terms, 24-hour business loans" />
      <link rel="canonical" href={canonical("/about")} />
    </Helmet>

    {/* Hero Section */}
    <section className="relative min-h-[70vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>
      <div className="container relative z-10 py-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
            {t('about.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="cta" onClick={() => setOpen(true)}>
              {t('cta.checkEligibility')}
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/why">{t('about.hero.whyWispfi')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Our Story & Mission */}
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">{t('about.story.title')}</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {t('about.story.p1')}
              </p>
              <p>
                {t('about.story.p2')}
              </p>
            </div>
          </div>
          <div>
            <img 
              src={handshakeImage} 
              alt={t('about.story.imageAlt')}
              className="w-full aspect-video object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    {/* What We've Achieved */}
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('about.achievements.title')}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary">2,000+</div>
            <div className="text-muted-foreground">{t('about.achievements.businessesFunded')}</div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary">$150M+</div>
            <div className="text-muted-foreground">{t('about.achievements.fundingDelivered')}</div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary">24–48h</div>
            <div className="text-muted-foreground">{t('about.achievements.decisionTime')}</div>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary">4.8/5</div>
            <div className="text-muted-foreground">{t('about.achievements.clientRating')}</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-8">
          {t('about.achievements.disclaimer')}
        </p>
      </div>
    </section>

    {/* Meet the Team */}
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('about.team.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about.team.subtitle')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Ivan Gomez */}
          <div className="text-center">
            <img 
              src="/images/team/ivan-gomez-2024.jpg?v=ivg-002"
              alt={`${t('about.team.ivan.name')} - ${t('about.team.ivan.role')}`}
              className="w-48 h-48 mx-auto object-cover rounded-full mb-4"
              style={{ objectPosition: 'center 20%' }}
              width="192"
              height="192"
              loading="lazy"
            />
            <h3 className="font-semibold text-lg">{t('about.team.ivan.name')}</h3>
            <p className="text-muted-foreground">{t('about.team.ivan.role')}</p>
          </div>
          
          {/* Paul Ponce */}
          <div className="text-center">
            <img 
              src="/images/team/paul-ponce-new-2025.jpg?v=ppl-004"
              alt={`${t('about.team.paul.name')} - ${t('about.team.paul.role')}`}
              className="w-48 h-48 mx-auto object-cover rounded-full mb-4"
              style={{ objectPosition: 'center 25%' }}
              width="192"
              height="192"
              loading="lazy"
            />
            <h3 className="font-semibold text-lg">{t('about.team.paul.name')}</h3>
            <p className="text-muted-foreground">{t('about.team.paul.role')}</p>
          </div>
          
          {/* Yamil Medina - keeping existing */}
          <div className="text-center">
            <img 
              src={yamilMedinaImage}
              alt={`${t('about.team.yamil.name')} - ${t('about.team.yamil.role')}`}
              className="w-48 h-48 mx-auto object-cover rounded-full mb-4"
              width="192"
              height="192"
              loading="lazy"
            />
            <h3 className="font-semibold text-lg">{t('about.team.yamil.name')}</h3>
            <p className="text-muted-foreground">{t('about.team.yamil.role')}</p>
          </div>
          
          {/* Jamie Kuria - keeping existing */}
          <div className="text-center">
            <img 
              src={jamieKuriaImage}
              alt={`${t('about.team.jamie.name')} - ${t('about.team.jamie.role')}`}
              className="w-48 h-48 mx-auto object-cover rounded-full mb-4"
              width="192"
              height="192"
              loading="lazy"
            />
            <h3 className="font-semibold text-lg">{t('about.team.jamie.name')}</h3>
            <p className="text-muted-foreground">{t('about.team.jamie.role')}</p>
          </div>
        </div>
      </div>
    </section>

    {/* How We Work */}
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <img 
              src={processImage} 
              alt={t('about.howWeWork.imageAlt')}
              className="w-full aspect-video object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">{t('about.howWeWork.title')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.howWeWork.step1.title')}</h3>
                  <p className="text-muted-foreground">{t('about.howWeWork.step1.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.howWeWork.step2.title')}</h3>
                  <p className="text-muted-foreground">{t('about.howWeWork.step2.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('about.howWeWork.step3.title')}</h3>
                  <p className="text-muted-foreground">{t('about.howWeWork.step3.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Why Wispfi vs Others */}
    <section className="py-16 lg:py-24 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${techBackground})` }}
      ></div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('about.whyWispfi.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about.whyWispfi.subtitle')}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{t('about.whyWispfi.speed.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.whyWispfi.speed.desc')}
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{t('about.whyWispfi.expertise.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.whyWispfi.expertise.desc')}
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{t('about.whyWispfi.transparency.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t('about.whyWispfi.transparency.desc')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* Looking Ahead */}
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">{t('about.vision.title')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.vision.desc')}
          </p>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="relative min-h-[50vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${customerServiceImage})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="container relative z-10 text-center py-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">{t('about.finalCta.title')}</h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          {t('about.finalCta.subtitle')}
        </p>
        <Button size="lg" variant="cta" onClick={() => setOpen(true)}>
          {t('cta.checkMyEligibility')}
        </Button>
      </div>
    </section>
    <PrequalModal open={open} onOpenChange={setOpen} />
  </main>
  );
};

export default About;
