import React from "react";
import { Zap, Shield, Award, Users, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "mca" | "ef" | "mca-ef" | "mca-b";
};

export default function FormShellMCA({ children, className, variant = "mca" }: Props) {
  const { t } = useTranslation();

  const baseVariantKey = variant === "ef" ? "ef" : "mca";
  const finalVariantKey = variant === "mca-b" ? "mca-b" : baseVariantKey;
  const keyRoot = `formShell.${finalVariantKey}`; // Ejemplo: 'formShell.mca'

  return (
    <div className={`relative max-w-[580px] mx-auto overflow-hidden ${className}`} style={{ borderRadius: "18px" }}>
      <div className="relative bg-white border border-orange-200/50 shadow-2xl overflow-hidden">
        <div className="relative p-5">
          {/* Power Badge with Urgency */}
          {variant !== "mca-b" ? (
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                <Zap className="h-3 w-3" />
                {/* Uso de la función t() */}
                {t(`${keyRoot}.pillBanner`)}
              </div>
            </div>
          ) : null}

          {/* Compelling Headline with Social Proof */}
          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 leading-tight">
              {/* Uso de la función t() */}
              {t(`${keyRoot}.headline`)}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                {/* Uso de la función t() */}
                {t(`${keyRoot}.headlineAccent`)}
              </span>
            </h1>
            {variant !== "mca-b" ? (
              <p className="text-sm text-gray-700 font-semibold mb-1">
                {/* Uso de la función t() */}
                {t(`${keyRoot}.subhead`)}
              </p>
            ) : null}
            <p className="text-xs text-orange-600 font-bold mb-3">
              {/* Uso de la función t() */}
              {t(`${keyRoot}.proofLine`)}
            </p>

            {/* Simplified Trust Indicators (mobile-optimized) */}
            <div className="flex justify-center items-center gap-2 mb-3 flex-wrap">
              {/* ... Shield (bankLevelSecurity is already t()) */}
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                <Shield className="h-3 w-3 text-green-600" />
                {/* Nota: Aquí ya se usa t('thankYou.bankLevelSecurity') */}
                <span className="text-xs font-bold text-green-800">{t("thankYou.bankLevelSecurity")}</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                <Award className="h-3 w-3 text-blue-600" />
                {/* Uso de la función t() */}
                <span className="text-xs font-bold text-blue-800">{t("formShell.trust.bbbRating")}</span>
              </div>
              <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full border border-purple-200">
                <Users className="h-3 w-3 text-purple-600" />
                {/* Uso de la función t() */}
                <span className="text-xs font-bold text-purple-800">{t("formShell.trust.fundedCount")}</span>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-1.5 sm:p-2.5">
                <DollarSign className="h-3 w-3 text-green-600" />
                <div className="text-center">
                  {/* Uso de la función t() */}
                  <div className="font-bold text-green-800 text-xs">{t(`${keyRoot}.greenTileTitle`)}</div>
                  {/* Uso de la función t() */}
                  <div className="text-green-600 font-medium text-xs">{t(`${keyRoot}.greenTileSubtitle`)}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-1.5 sm:p-2.5">
                <Clock className="h-3 w-3 text-blue-600" />
                <div className="text-center">
                  {/* Uso de la función t() */}
                  <div className="font-bold text-blue-800 text-xs">{t(`${keyRoot}.blueTileTitle`)}</div>
                  {/* Uso de la función t() */}
                  <div className="text-blue-600 font-medium text-xs">{t(`${keyRoot}.blueTileSubtitle`)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* HubSpot form goes here with proper spacing */}
          <div className="relative mb-4 space-y-4">{children}</div>

          {/* Trust signals at bottom */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Shield className="h-3 w-3 text-green-600" />
                {/* Uso de la función t() */}
                <span className="text-xs font-semibold">{t("formShell.trust.sslEncrypted")}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <CheckCircle2 className="h-3 w-3 text-blue-600" />
                {/* Uso de la función t() */}
                <span className="text-xs font-semibold">{t("formShell.trust.ccpaCompliant")}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {/* Uso de la función t() */}
              {t("formShell.trust.infoNeverShared")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
