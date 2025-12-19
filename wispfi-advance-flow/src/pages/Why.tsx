import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { canonical } from "@/lib/seo";
import { Zap, Brain, Eye, Check, X, Users, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import techBg from "@/assets/about/tech-background.jpg";
import handshakeImg from "@/assets/about/handshake-deal.jpg";
import customerServiceImg from "@/assets/about/customer-service-team.jpg";

const Why = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>The WispFi Advantage | Fast Business Financing for Connectivity Companies</title>
        <meta
          name="description"
          content="Discover why WispFi is the best choice for fast business financing, fiber optic business loans, and WISP funding with transparent terms and industry expertise."
        />
        <link rel="canonical" href={canonical("/why")} />
        <meta property="og:title" content="The WispFi Advantage | Fast Business Financing" />
        <meta
          property="og:description"
          content="Fast, transparent funding built for the connectivity industry. Get approvals in 24 hours."
        />
      </Helmet>
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src={techBg}
              alt="Advanced fiber optic technology background"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>
          <div className="container relative z-10 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">{t("why.pageTitle")}</h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">{t("why.heroSubtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setOpen(true)}
                >
                  {t("cta.checkMyEligibility")}
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/about">{t("why.learnOurStory")}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Advantages */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("why.whyChoose")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("why.whyChooseSubtitle")}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t("why.speed")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{t("why.speedDesc")}</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t("why.expertise")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{t("why.expertiseDesc")}</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t("why.transparency")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{t("why.transparencyDesc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("why.comparisonTitle")}</h2>
              <p className="text-xl text-muted-foreground">{t("why.comparisonSubtitle")}</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-6 font-semibold">{t("why.feature")}</th>
                          <th className="text-center p-6 font-semibold text-primary">WispFi</th>
                          <th className="text-center p-6 font-semibold text-muted-foreground">
                            {t("why.traditionalLenders")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-6 font-medium">{t("why.decisionSpeed")}</td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                              <Check className="w-5 h-5" />
                              <span className="font-semibold">{t("why.hours24_48")}</span>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-red-500">
                              <X className="w-5 h-5" />
                              <span>{t("why.weeks2_8")}</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-6 font-medium">{t("why.industryKnowledge")}</td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                              <Check className="w-5 h-5" />
                              <span className="font-semibold">{t("why.wispFiberExperts")}</span>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-red-500">
                              <X className="w-5 h-5" />
                              <span>{t("why.genericApproach")}</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-6 font-medium">{t("why.termsTransparency")}</td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                              <Check className="w-5 h-5" />
                              <span className="font-semibold">{t("why.crystalClear")}</span>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-red-500">
                              <X className="w-5 h-5" />
                              <span>{t("why.hiddenFees")}</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-6 font-medium">{t("why.paperwork")}</td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-green-600">
                              <Check className="w-5 h-5" />
                              <span className="font-semibold">{t("why.minimal")}</span>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-red-500">
                              <X className="w-5 h-5" />
                              <span>{t("why.extensive")}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-8">{t("why.comparisonDisclaimer")}</p>
        </section>

        {/* Mini Case Study */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("why.successStory")}</h2>
                <h3 className="text-2xl font-semibold mb-4 text-primary">{t("why.caseStudyTitle")}</h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t("why.caseStudyDesc")}</p>
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">40%</div>
                    <div className="text-sm text-muted-foreground">{t("why.coverageIncrease")}</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">850+</div>
                    <div className="text-sm text-muted-foreground">{t("why.newCustomers")}</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">$2M</div>
                    <div className="text-sm text-muted-foreground">{t("why.annualRevenueBoost")}</div>
                  </div>
                </div>
                <blockquote className="border-l-4 border-primary pl-6 italic text-lg">
                  "{t("why.testimonialQuote")}"
                </blockquote>
                <div className="mt-4 text-sm text-muted-foreground">{t("why.testimonialAuthor")}</div>
              </div>
              <div>
                <img
                  src={handshakeImg}
                  alt="Business partnership handshake representing successful funding deal"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <img
              src={customerServiceImg}
              alt="Dedicated customer service team ready to help with funding"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/90" />
          </div>
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{t("why.ctaTitle")}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("why.ctaSubtitle")}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
              onClick={() => setOpen(true)}
            >
              {t("cta.checkMyEligibility")}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">{t("why.ctaNote")}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <PrequalModal open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Why;
