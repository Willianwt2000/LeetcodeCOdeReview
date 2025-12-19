import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { canonical } from "@/lib/seo";
import { ENV } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { ExitIntentOffer } from "@/components/wispfi/ExitIntentOffer";
import {
  Check,
  Upload,
  Phone,
  Clock,
  CheckCircle,
  MessageCircle,
  DollarSign,
  Calendar,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useConversionTracking } from "@/hooks/useConversionTracking";
import welcomingProfessionalHero from "@/assets/funding/welcoming-professional-hero.jpg";

const ThankYou2 = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    // Ensure the user lands at the top when arriving from the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { eligible, source, formType } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      eligible: params.get("eligible"),
      source: params.get("source"),
      formType: params.get("form_type") || "unknown",
    };
  }, []);

  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({
    bankStatements: false,
    id: false,
    voidedCheck: false,
  });

  const { trackDocumentUpload } = useConversionTracking({
    source: source || undefined,
    eligible: eligible || undefined,
    formType,
  });

  const handleFileUpload = async (docType: string, file: File) => {
    setUploading(true);
    trackDocumentUpload(docType);

    setTimeout(() => {
      setUploadedDocs((prev) => ({ ...prev, [docType]: true }));
      setUploading(false);
      toast({
        title: t("thankYou2.docUploaded"),
        description: t("thankYou2.docUploadedDesc"),
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Thank You - Your Funding Application | WispFi</title>
        <meta
          name="description"
          content="Thank you for applying! A funding specialist will contact you within 1 business day. Upload documents now for faster business funding approval."
        />
        <meta
          name="keywords"
          content="merchant cash advance approval, business funding process, WISP financing, fiber network loans, fast business funding"
        />
        <link rel="canonical" href={canonical("/thank-you2")} />
      </Helmet>

      <SiteHeader />

      <ExitIntentOffer />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-28 lg:py-60 overflow-hidden">
          {" "}
          {/* Aumento de altura: De py-16 lg:py-24 a py-28 lg:py-40 */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${welcomingProfessionalHero})`,
              backgroundPosition: "50% 30%", // Ajustado de '65% center' a 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/55 via-gray-800/35 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-left lg:text-center text-white">
              <div className="flex justify-center mb-6"></div>

              <h1
                className="text-4xl lg:text-6xl font-bold mb-6 text-white"
                style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
              >
                {t("thankYou.title")}
              </h1>
              <p
                className="text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed mb-8"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}
              >
                {t("thankYou.subtitle")}
              </p>

              {/* Progress Indicator */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between text-white/90 text-sm mb-2">
                  <span>{t("thankYou.progress")}</span>
                  <span>{t("thankYou.complete")}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full shadow-lg"
                    style={{ width: "75%" }}
                  ></div>
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
                          <p className="text-lg font-semibold text-green-800 mb-2">{t("thankYou.eligibleTrue")}</p>
                          <p className="text-green-700">{t("thankYou.eligibleTrueDesc")}</p>
                        </>
                      ) : eligible === "false" ? (
                        <>
                          <p className="text-lg font-semibold text-green-800 mb-2">{t("thankYou.eligibleFalse")}</p>
                          <p className="text-green-700">{t("thankYou.eligibleFalseDesc")}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-green-800 mb-2">{t("thankYou.eligibleDefault")}</p>
                          <p className="text-green-700">{t("thankYou.eligibleDefaultDesc")}</p>
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
                        <span>{t("thankYou.socialProof")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{t("thankYou.deployedThisWeek")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Document Upload Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("thankYou2.uploadTitle")}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("thankYou2.uploadSubtitle")}</p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3 mb-8">
                {/* Bank Statements */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Upload className="h-5 w-5 text-primary" />
                      {t("thankYou2.bankStatements")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t("thankYou2.bankStatementsDesc")}</p>
                    <div className="space-y-2">
                      <Label htmlFor="bank-statements" className="text-sm font-medium">
                        {t("thankYou2.uploadLabel")}
                      </Label>
                      <Input
                        id="bankStatements"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload("bankStatements", file);
                        }}
                        disabled={uploading || uploadedDocs.bankStatements}
                        className="cursor-pointer"
                      />
                      <input id="bankStatementsUrl" type="hidden" />
                      {uploadedDocs.bankStatements && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <Check className="h-4 w-4" />
                          {t("thankYou2.uploadedSuccess")}
                        </div>
                      )}
                      <small id="bankStatus"></small>
                    </div>
                  </CardContent>
                </Card>

                {/* Driver's License */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Upload className="h-5 w-5 text-primary" />
                      {t("thankYou2.driversLicense")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t("thankYou2.driversLicenseDesc")}</p>
                    <div className="space-y-2">
                      <Label htmlFor="drivers-license" className="text-sm font-medium">
                        {t("thankYou2.uploadLabelJpg")}
                      </Label>
                      <Input
                        id="driversLicense"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload("id", file);
                        }}
                        disabled={uploading || uploadedDocs.id}
                        className="cursor-pointer"
                      />
                      <input id="driversLicenseUrl" type="hidden" />
                      {uploadedDocs.id && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <Check className="h-4 w-4" />
                          {t("thankYou2.uploadedSuccess")}
                        </div>
                      )}
                      <small id="dlStatus"></small>
                    </div>
                  </CardContent>
                </Card>

                {/* Voided Check */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Upload className="h-5 w-5 text-primary" />
                      {t("thankYou2.voidedCheck")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t("thankYou2.voidedCheckDesc")}</p>
                    <div className="space-y-2">
                      <Label htmlFor="voided-check" className="text-sm font-medium">
                        {t("thankYou2.uploadLabelJpg")}
                      </Label>
                      <Input
                        id="voidedCheck"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload("voidedCheck", file);
                        }}
                        disabled={uploading || uploadedDocs.voidedCheck}
                        className="cursor-pointer"
                      />
                      <input id="voidedCheckUrl" type="hidden" />
                      {uploadedDocs.voidedCheck && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <Check className="h-4 w-4" />
                          {t("thankYou2.uploadedSuccess")}
                        </div>
                      )}
                      <small id="checkStatus"></small>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button variant="outline" className="text-muted-foreground">
                  {t("thankYou2.sendDocsLater")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call Prep Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t("thankYou.whatToExpect")}</h2>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("thankYou.reviewNeeds")}</h3>
                      <p className="text-muted-foreground">{t("thankYou.reviewNeedsDesc")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("thankYou.discussOptions")}</h3>
                      <p className="text-muted-foreground">{t("thankYou.discussOptionsDesc")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("thankYou.answerQuestions")}</h3>
                      <p className="text-muted-foreground">{t("thankYou.answerQuestionsDesc")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t("thankYou.quickDecisions")}</h3>
                      <p className="text-muted-foreground">{t("thankYou.quickDecisionsDesc")}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Card */}
                <Card className="bg-gradient-to-br from-primary/5 to-orange-500/5 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-6 text-center">{t("thankYou.next48Hours")}</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary rounded-full text-white text-xs w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                          1
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t("thankYou2.within4Hours")}</p>
                          <p className="text-xs text-muted-foreground">{t("thankYou2.within4HoursDesc")}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary rounded-full text-white text-xs w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                          2
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t("thankYou2.within24Hours")}</p>
                          <p className="text-xs text-muted-foreground">{t("thankYou2.within24HoursDesc")}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary rounded-full text-white text-xs w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                          3
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t("thankYou2.within48Hours")}</p>
                          <p className="text-xs text-muted-foreground">{t("thankYou2.within48HoursDesc")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>{t("thankYou2.avgFundingTime")}</strong>
                      </p>
                      <p className="text-2xl font-bold text-primary">24-48 hours</p>
                    </div>
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
              <h2 className="text-3xl font-bold text-center mb-12">{t("thankYou2.faqTitle")}</h2>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <h3 className="font-semibold">{t("thankYou2.faq1Q")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("thankYou2.faq1A")}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <h3 className="font-semibold">{t("thankYou2.faq2Q")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("thankYou2.faq2A")}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <h3 className="font-semibold">{t("thankYou2.faq3Q")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("thankYou2.faq3A")}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <h3 className="font-semibold">{t("thankYou2.faq4Q")}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("thankYou2.faq4A")}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info & Emergency */}
        <section className="py-16 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">{t("thankYou2.contactTitle")}</h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-gray-50 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{t("thankYou2.callUsDirect")}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{t("thankYou2.speakSpecialist")}</p>
                    <a
                      href={`tel:${t("thankYou2.phoneNumber")}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      {t("thankYou2.phoneNumber")}
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{t("thankYou2.emailSupport")}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{t("thankYou2.questionsApplication")}</p>
                    <a
                      href={`mailto:${t("thankYou2.emailAddress")}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      {t("thankYou2.emailAddress")}
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{t("thankYou2.businessHours")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("thankYou2.businessHoursLine1")}
                      <br />
                      {t("thankYou2.businessHoursLine2")}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <p className="text-sm text-orange-800">
                  <strong>{t("thankYou2.urgentFunding")}</strong> {t("thankYou2.urgentFundingDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ThankYou2;
