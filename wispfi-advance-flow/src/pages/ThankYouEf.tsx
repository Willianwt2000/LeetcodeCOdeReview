import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Clock, Phone, Mail, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";

const ThankYouEf = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // noindex
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Thank You - Equipment Financing Application Received | WispFi</title>
        <meta name="description" content="Your equipment financing application has been received. Our team will review and contact you within 24 hours." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteHeader />

      <main className="container py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Success Header */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t('thankYouEf.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {t('thankYouEf.subtitle')}
            </p>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{t('thankYouEf.contactBadge')}</span>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t('thankYouEf.applicationReview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('thankYouEf.applicationReviewDesc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t('thankYouEf.personalContact')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('thankYouEf.personalContactDesc')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t('thankYouEf.fastDecision')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('thankYouEf.fastDecisionDesc')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="bg-muted p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('thankYouEf.needAssistance')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{t('thankYouEf.callUsDirect')}</p>
                  <a href="tel:+18188580184" className="text-primary hover:underline">
                    (818) 858-0184
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{t('thankYouEf.emailUs')}</p>
                  <a href="mailto:sales@wispfi.com" className="text-primary hover:underline">
                    sales@wispfi.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">{t('thankYouEf.whileYouWait')}</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="/industries">{t('thankYouEf.exploreIndustries')}</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/case-studies">{t('thankYouEf.readSuccessStories')}</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/blog">{t('thankYouEf.learnAboutFunding')}</a>
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 pt-8 border-t border-muted">
            <p className="text-xs text-muted-foreground">
              {t('thankYouEf.disclaimer')}
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ThankYouEf;