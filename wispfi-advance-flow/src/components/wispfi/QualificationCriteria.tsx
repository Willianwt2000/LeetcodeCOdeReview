import { CheckCircle, AlertCircle, Clock, DollarSign, FileText, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export const QualificationCriteria = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12  bg-gradient-to-r from-green-50 via-white to-blue-50 border-y border-green-100">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3 text-slate-900">{t("components.qualificationCriteria.title")}</h2>
            <p className="text-muted-foreground">{t("components.qualificationCriteria.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Minimum Requirements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-lg">{t("components.qualificationCriteria.minimumRequirements")}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.minTimeInBusiness")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.minTimeInBusinessDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.minRevenue")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.minRevenueDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.minFico")}</p>
                    <p className="text-sm text-muted-foreground">{t("components.qualificationCriteria.minFicoDesc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.minDocuments")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.minDocumentsDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ideal Candidates */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold text-lg">{t("components.qualificationCriteria.idealCandidates")}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.idealTimeInBusiness")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.idealTimeInBusinessDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.idealRevenue")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.idealRevenueDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.idealFico")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.idealFicoDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{t("components.qualificationCriteria.idealProfitable")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("components.qualificationCriteria.idealProfitableDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-orange-200 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="font-medium">{t("components.qualificationCriteria.approvalRateValue")}</p>
                <p className="text-sm text-muted-foreground">{t("components.qualificationCriteria.approvalRate")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {t("components.qualificationCriteria.avgDecisionValue")}
                </p>
                <p className="text-sm text-muted-foreground">{t("components.qualificationCriteria.avgDecision")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {t("components.qualificationCriteria.fundingRangeValue")}
                </p>
                <p className="text-sm text-muted-foreground">{t("components.qualificationCriteria.fundingRange")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {t("components.qualificationCriteria.ratesFromValue")}
                </p>
                <p className="text-sm text-muted-foreground">{t("components.qualificationCriteria.ratesFrom")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationCriteria;
