import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { canonical } from "@/lib/seo";
import { ENV } from "@/lib/env";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SiteHeader from '@/components/wispfi/SiteHeader';
import SiteFooter from '@/components/wispfi/SiteFooter';
import { ExitIntentOffer } from '@/components/wispfi/ExitIntentOffer';
import { Check, Phone, Clock, CheckCircle, MessageCircle, DollarSign, Calendar, Users, Shield, HelpCircle, Award, TrendingUp, Zap, Star } from 'lucide-react';
import { useConversionTracking } from '@/hooks/useConversionTracking';
import welcomingProfessionalHero from '@/assets/funding/welcoming-professional-hero.jpg';

const ThankYou = () => {
  const { t } = useTranslation();
  
  const { eligible, source, formType } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      eligible: params.get("eligible"),
      source: params.get("source"),
      formType: params.get("form_type") || "unknown"
    };
  }, []);
  
  const { trackDocumentUpload } = useConversionTracking({
    source: source || undefined,
    eligible: eligible || undefined,
    formType
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Thank You - Your Funding Application | WispFi</title>
        <meta name="description" content="Thank you for applying! A funding specialist will contact you within 1 business day. Join thousands of businesses we've funded with fast, transparent solutions." />
        <meta name="keywords" content="merchant cash advance approval, business funding process, WISP financing, fiber network loans, fast business funding" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={canonical("/thank-you")} />
      </Helmet>
      
      <SiteHeader />
      
      <ExitIntentOffer />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{ 
              backgroundImage: `url(${welcomingProfessionalHero})`,
              backgroundPosition: '65% center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/55 via-gray-800/35 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-left lg:text-center text-white">
              {/* Urgency Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                  <Clock className="h-4 w-4" />
                  {t('thankYou.expiresBadge')}
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                {t('thankYou.title')}
              </h1>
              <p className="text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                {t('thankYou.subtitle')}
              </p>
              
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between text-white/90 text-sm mb-2">
                  <span>{t('thankYou.progress')}</span>
                  <span>{t('thankYou.complete')}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full shadow-lg" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Eligibility Message Box with Social Proof */}
        <section className="py-12 bg-[#E6F7EC]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-green-200 bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      {eligible === "true" ? (
                        <>
                          <p className="text-lg font-semibold text-green-800 mb-2">
                            {t('thankYou.eligibleTrue')}
                          </p>
                          <p className="text-green-700">
                            {t('thankYou.eligibleTrueDesc')}
                          </p>
                        </>
                      ) : eligible === "false" ? (
                        <>
                          <p className="text-lg font-semibold text-green-800 mb-2">
                            {t('thankYou.eligibleFalse')}
                          </p>
                          <p className="text-green-700">
                            {t('thankYou.eligibleFalseDesc')}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-green-800 mb-2">
                            {t('thankYou.eligibleDefault')}
                          </p>
                          <p className="text-green-700">
                            {t('thankYou.eligibleDefaultDesc')}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Social Proof Bar */}
                  <div className="border-t border-green-200 pt-4">
                    <div className="flex items-center justify-between text-sm text-green-700">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                          <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                        </div>
                        <span>{t('thankYou.socialProof')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{t('thankYou.deployedThisWeek')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Metrics & Social Proof Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {t('thankYou.joinTitle')}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('thankYou.joinSubtitle')}
                </p>
              </div>

              {/* Success Metrics Grid */}
              <div className="grid gap-6 lg:grid-cols-4 mb-12">
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-600 mb-1">$847M+</div>
                    <p className="text-sm text-muted-foreground">{t('thankYou.totalFunding')}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-600 mb-1">24-48hrs</div>
                    <p className="text-sm text-muted-foreground">{t('thankYou.avgFundingTime')}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-purple-600 mb-1">15,000+</div>
                    <p className="text-sm text-muted-foreground">{t('thankYou.businessesFunded')}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-orange-600 mb-1">4.8/5</div>
                    <p className="text-sm text-muted-foreground">{t('thankYou.clientSatisfaction')}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Trust & Security Badges */}
              <div className="bg-white rounded-lg border p-6 text-center">
                <div className="flex items-center justify-center gap-8 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold">{t('thankYou.bankLevelSecurity')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-semibold">{t('thankYou.bbbAccredited')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-orange-600" />
                    <span className="text-sm font-semibold">4.8/5 Rating</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('thankYou.protectedInfo')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call Prep Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
                {t('thankYou.whatToExpect')}
              </h2>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('thankYou.reviewNeeds')}</h3>
                      <p className="text-muted-foreground">
                        {t('thankYou.reviewNeedsDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('thankYou.discussOptions')}</h3>
                      <p className="text-muted-foreground">
                        {t('thankYou.discussOptionsDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('thankYou.answerQuestions')}</h3>
                      <p className="text-muted-foreground">
                        {t('thankYou.answerQuestionsDesc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t('thankYou.quickDecisions')}</h3>
                      <p className="text-muted-foreground">
                        {t('thankYou.quickDecisionsDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <Card className="bg-gradient-to-br from-primary/5 to-orange-500/5 border-primary/20">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <blockquote className="text-lg font-medium text-foreground mb-6">
                        "{t('thankYou.testimonial')}"
                      </blockquote>
                      <footer className="text-muted-foreground">
                        <strong>{t('thankYou.testimonialAuthor')}</strong>
                      </footer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Timeline */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-orange-500/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t('thankYou.next48Hours')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('thankYou.next48HoursSubtitle')}
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border">
                  <div className="bg-primary rounded-full p-3 flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{t('thankYou.within2_4Hours')}</h3>
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{t('thankYou.today')}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {t('thankYou.callConfirm')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border">
                  <div className="bg-green-500 rounded-full p-3 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{t('thankYou.nextBusinessDay')}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{t('thankYou.hours24_48')}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {t('thankYou.reviewComplete')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{t('thankYou.fundingDecision')}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{t('thankYou.hours48Max')}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {t('thankYouCommon.fundingDecisionDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics & Social Proof */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t('thankYouCommon.greatCompany')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('thankYouCommon.greatCompanySubtitle')}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-8 text-center">
                    <div className="bg-green-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-700 mb-2">{t('thankYouCommon.businessesFundedCount')}</h3>
                    <p className="text-green-600 font-medium">{t('thankYouCommon.businessesFunded')}</p>
                    <p className="text-sm text-green-700 mt-2">{t('thankYouCommon.inLast12Months')}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <div className="bg-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-700 mb-2">{t('thankYouCommon.totalDeployed')}</h3>
                    <p className="text-blue-600 font-medium">{t('thankYouCommon.totalDeployedLabel')}</p>
                    <p className="text-sm text-blue-700 mt-2">{t('thankYouCommon.helpingGrow')}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-8 text-center">
                    <div className="bg-purple-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-purple-700 mb-2">{t('thankYouCommon.avgApproval')}</h3>
                    <p className="text-purple-600 font-medium">{t('thankYouCommon.avgApprovalLabel')}</p>
                    <p className="text-sm text-purple-700 mt-2">{t('thankYouCommon.fromAppToOffer')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t('thankYouCommon.faqTitle')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('thankYouCommon.faqSubtitle')}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <HelpCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">{t('thankYouCommon.missCallQ')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t('thankYouCommon.missCallA')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">{t('thankYouCommon.howLongCallQ')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t('thankYouCommon.howLongCallA')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">{t('thankYouCommon.infoSecureQ')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t('thankYouCommon.infoSecureA')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">{t('thankYouCommon.notApprovedQ')}</h3>
                        <p className="text-sm text-muted-foreground">
                          {t('thankYouCommon.notApprovedA')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {t('thankYouCommon.needReachUs')}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t('thankYouCommon.needReachUsSubtitle')}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-xl mb-2">{t('thankYouCommon.speakSpecialist')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('thankYouCommon.callDirectly')}
                    </p>
                    <a 
                      href="tel:1-800-WISPFI-1" 
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      1-800-WISPFI-1
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('thankYouCommon.businessHours')}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-xl mb-2">{t('thankYouCommon.questionsOrConcerns')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('thankYouCommon.emailResponse')}
                    </p>
                    <a 
                      href="mailto:support@wispfi.com" 
                      className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-600/80 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      support@wispfi.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('thankYouCommon.typicalResponse')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final Reassurance */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('thankYouCommon.finalReassurance')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ThankYou;
