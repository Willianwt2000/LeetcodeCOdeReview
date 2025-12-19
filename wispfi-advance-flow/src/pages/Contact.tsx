import { Helmet } from "react-helmet-async";
import { canonical } from "@/lib/seo";
import { useState, useEffect } from "react";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import { loadIconScript, mountIconInline } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import { TrackedButton } from "@/components/wispfi/TrackedButton";
import ContactFormAPI from "@/components/wispfi/ContactFormAPI";
import { Mail, Phone, MapPin, Shield, Clock, Users, Zap, Heart } from "lucide-react";
import friendlyTeamImage from "@/assets/about/friendly-team.jpg";
import SiteHeader from "@/components/wispfi/SiteHeader";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

import { ENV } from "@/lib/env";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  
  
  useEffect(() => {
    const url = ENV.ICON_SCRIPT_URL;
    if (url) {
      loadIconScript(url)
        .then(() => mountIconInline("#icon-inline-booking"))
        .catch(() => { /* fallback link remains visible */ });
    }
  }, []);
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Helmet>
        <title>Contact WispFi | Apply for Equipment Financing | Speak to a Funding Expert</title>
        <meta name="description" content="Contact WispFi for equipment financing, wireless ISP funding, and business loans. Speak to a funding expert today. Apply for financing now." />
        <meta name="keywords" content="contact Wispfi, apply for equipment financing, speak to a funding expert, wireless ISP funding, business loans" />
        <link rel="canonical" href={canonical("/contact")} />
        
        {/* OpenGraph Tags */}
        <meta property="og:title" content="Contact WispFi | Apply for Equipment Financing | Speak to a Funding Expert" />
        <meta property="og:description" content="Contact WispFi for equipment financing, wireless ISP funding, and business loans. Speak to a funding expert today. Apply for financing now." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og/wispfi-default.jpg" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og/wispfi-default.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${friendlyTeamImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Heart className="h-4 w-4" />
            {t('contact.hero.badge')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
            {t('contact.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-green-500" />
              {t('contact.hero.noHardPull')}
            </div>
            <span className="hidden sm:block">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-500" />
              {t('contact.hero.fastFunding')}
            </div>
            <span className="hidden sm:block">•</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-purple-500" />
              {t('contact.hero.businessesFunded')}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Heart className="h-4 w-4" />
                {t('contact.form.badge')}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {t('contact.form.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('contact.form.subtitle')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{t('contact.form.fastApproval')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{t('contact.form.noHiddenFees')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>{t('contact.form.industryExperts')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative" id="contact-form">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-sm"></div>
              <div className="relative bg-card/90 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('contact.form.cardTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('contact.form.cardSubtitle')}</p>
                  </div>
                </div>
                <ContactFormAPI />
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {t('contact.form.sslSecured')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('contact.form.response24hr')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {t('contact.form.expertTeam')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information & Benefits */}
          <div className="space-y-8">
            {/* Direct Contact Info */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{t('contact.info.title')}</h3>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">
                        <a href="tel:+18188580184" className="hover:underline text-green-600">818-858-0184</a>
                      </p>
                      <p className="text-sm text-muted-foreground">{t('contact.info.phone.hours')}</p>
                      <p className="text-sm font-medium text-green-600 mt-1">{t('contact.info.phone.cta')}</p>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">
                        <a href="mailto:sales@wispfi.com" className="hover:underline text-blue-600">sales@wispfi.com</a>
                      </p>
                      <p className="text-sm text-muted-foreground">{t('contact.info.email.response')}</p>
                      <p className="text-sm font-medium text-blue-600 mt-1">{t('contact.info.email.cta')}</p>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">{t('contact.info.office.title')}</p>
                      <p className="text-muted-foreground">1317 EDGEWATER DR, #4212</p>
                      <p className="text-muted-foreground">ORLANDO, FL, 32804</p>
                      <p className="text-sm font-medium text-purple-600 mt-1">{t('contact.info.office.cta')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose WispFi */}
            <div className="bg-card border border-primary/10 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                {t('contact.whyChoose.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.whyChoose.reason1.title')}</p>
                    <p className="text-sm text-muted-foreground">{t('contact.whyChoose.reason1.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.whyChoose.reason2.title')}</p>
                    <p className="text-sm text-muted-foreground">{t('contact.whyChoose.reason2.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.whyChoose.reason3.title')}</p>
                    <p className="text-sm text-muted-foreground">{t('contact.whyChoose.reason3.desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.whyChoose.reason4.title')}</p>
                    <p className="text-sm text-muted-foreground">{t('contact.whyChoose.reason4.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-card border border-primary/10 rounded-xl overflow-hidden shadow-lg">
              <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
                <h4 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t('contact.map.title')}
                </h4>
              </div>
              <iframe
                title="WispFi Office Location"
                src="https://www.google.com/maps?q=1317+EDGEWATER+DR,+%234212,+ORLANDO,+FL,+32804&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>

            {/* FAQ Teaser */}
            <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-xl p-8 border border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❓</span>
                </div>
                <h3 className="text-xl font-semibold">{t('contact.faqTeaser.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                {t('contact.faqTeaser.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild className="flex-1">
                  <a href="/#faq">{t('contact.faqTeaser.browseFaqs')}</a>
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => {
                    toast({
                      title: t('contact.faqTeaser.docsNoted'),
                      description: t('contact.faqTeaser.docsNotedDesc')
                    });
                    const form = document.getElementById('contact-form');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('contact.faqTeaser.sendDocsLater')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary/5 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">{t('contact.finalCta.title')}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('contact.finalCta.subtitle')}
          </p>
          <TrackedButton
            href="/#eligibility-form"
            variant="default"
            size="lg"
            trackingData={{
              action: "check_eligibility_clicked",
              category: "conversion",
              label: "contact_page_final_cta",
              source: "contact_page"
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
          >
            {t('contact.finalCta.button')}
          </TrackedButton>
        </div>
      </section>

      {/* Enhanced Trust & Security Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('contact.trust.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('contact.trust.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Trust Indicators */}
            <div className="text-center p-8 bg-card rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('contact.trust.privacy.title')}</h3>
              <p className="text-muted-foreground">
                {t('contact.trust.privacy.desc')}
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('contact.trust.time.title')}</h3>
              <p className="text-muted-foreground">
                {t('contact.trust.time.desc')}
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('contact.trust.understanding.title')}</h3>
              <p className="text-muted-foreground">
                {t('contact.trust.understanding.desc')}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Heart className="h-4 w-4" />
              {t('contact.trust.successBadge')}
            </div>
            <div className="bg-card/50 rounded-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">{t('contact.trust.notAlone.title')}</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t('contact.trust.notAlone.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="default" onClick={() => setOpen(true)}>
                  {t('contact.trust.startConversation')}
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+18188580184">{t('contact.trust.callUs')}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PrequalModal open={open} onOpenChange={setOpen} />
    </main>
  );
};

export default Contact;