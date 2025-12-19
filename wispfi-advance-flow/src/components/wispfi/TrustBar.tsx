import { Card } from "@/components/ui/card";
import { Star, Users, DollarSign, Clock, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TrustBar = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 border-y bg-muted/50">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Metrics */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="font-bold text-lg">2,137+</div>
                <div className="text-xs text-muted-foreground">{t("components.trustBar.businessesFunded")}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <div className="font-bold text-lg">$48M+</div>
                <div className="text-xs text-muted-foreground">{t("components.trustBar.equipmentFunded")}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#FFC107] fill-[#FFC107]" />
              <div>
                <div className="font-bold text-lg">4.8★</div>
                <div className="text-xs text-muted-foreground">{t("components.trustBar.averageRating")}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <div className="font-bold text-lg">{t("components.trustBar.typicalFundingValue")}</div>
                <div className="text-xs text-muted-foreground">{t("components.trustBar.typicalFunding")}</div>
              </div>
            </div>
          </div>

          {/* Trust Logos */}
          <div className="flex items-center gap-4 opacity-80">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="h-4 w-4" />
              <span>{t("components.trustBar.googleReviews")}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>{t("components.trustBar.trustpilot")}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">{t("components.trustBar.disclaimer")}</p>
        </div>
      </div>
    </section>
  );
};
