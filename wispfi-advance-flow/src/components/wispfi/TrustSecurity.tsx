import React from "react";
import bbb from "@/assets/trust/bbb.svg";
import { ShieldCheck, Lock, BadgeCheck, Clock } from "lucide-react";
import { TrustpilotBadge } from "@/components/integrations/TrustpilotWidget";
import { useTranslation } from "react-i18next";

export const TrustSecurity: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section data-section="security" className="border-t border-b bg-muted/50">
      <div className="container py-10">
        <div className="rounded-2xl border bg-card/70 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">

            {/* Left: Trust badges */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="rounded-lg border bg-card px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{t('components.trustSecurity.sslSecure')}</span>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-border" aria-hidden />
              <div className="rounded-lg border bg-card px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{t('components.trustSecurity.bbbAccredited')}</span>
                </div>
              </div>
            </div>

            {/* Middle: Security claims */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" aria-hidden />
                <div>
                  <p className="font-semibold">{t('components.trustSecurity.encryption')}</p>
                  <p className="text-xs text-muted-foreground">{t('components.trustSecurity.bankLevel')}</p>
                </div>
              </div>
              <div className="hidden md:block h-8 w-px bg-border" aria-hidden />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
                <p className="font-semibold">{t('components.trustSecurity.verifiedBusiness')}</p>
              </div>
            </div>

            {/* Right: Speed + credit policy */}
            <div className="flex items-center justify-center md:justify-end gap-3 text-sm">
              <Clock className="h-5 w-5 text-primary" aria-hidden />
              <div>
                <p className="font-semibold">{t('components.trustSecurity.fundingSpeed')}</p>
                <p className="text-xs text-muted-foreground">{t('components.trustSecurity.noHardPull')}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;
